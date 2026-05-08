'use client';
import type { Profile, Role } from './types';
import { createClient } from '@supabase/supabase-js';
import type {
  AnnouncementItem,
  ApplicationItem,
  ApplicationStatus,
  ChildView,
  ClassRecord,
  GradeRow,
  StudentRecord,
} from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function listApplications(): Promise<ApplicationItem[]> {
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error loading applications:', error.message);
    return [];
  }

  return (data ?? []) as ApplicationItem[];
}

export async function createApplication(
  payload: Omit<ApplicationItem, 'id'>
): Promise<ApplicationItem | null> {
  const { data, error } = await supabase
    .from('applications')
    .insert([payload])
    .select()
    .single();

  if (error) {
    console.error('Error creating application:', error.message);
    return null;
  }

  return data as ApplicationItem;
}

export async function updateApplicationStatus(
  id: string,
  status: ApplicationStatus
): Promise<boolean> {
  const { error } = await supabase
    .from('applications')
    .update({ status })
    .eq('id', id);

  if (error) {
    console.error('Error updating application status:', error.message);
    return false;
  }

  return true;
}

export async function listAnnouncements(): Promise<AnnouncementItem[]> {
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error loading announcements:', error.message);
    return [];
  }

  return (data ?? []) as AnnouncementItem[];
}

export async function createAnnouncement(
  payload: Omit<AnnouncementItem, 'id'>
): Promise<AnnouncementItem | null> {
  const { data, error } = await supabase
    .from('announcements')
    .insert([payload])
    .select()
    .single();

  if (error) {
    console.error('Error creating announcement:', error.message);
    return null;
  }

  return data as AnnouncementItem;
}

export async function listStudents(): Promise<StudentRecord[]> {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error loading students:', error.message);
    return [];
  }

  return (data ?? []) as StudentRecord[];
}

type GradeDbRow = {
  id: string;
  student_id: string;
  subject: string;
  score: number;
  grade: string;
};

type FeeDbRow = {
  id: string;
  student_id: string;
  amount_due: number;
  amount_paid: number;
};

type AttendanceRow = {
  id: string;
  student_id: string;
  attendance_percent: number;
  updated_at?: string;
};
export async function listClasses(): Promise<ClassRecord[]> {
  const { data, error } = await supabase
    .from('classes')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error loading classes:', error.message);
    return [];
  }

  return (data ?? []) as ClassRecord[];
}
export async function getParentPortalData(): Promise<ChildView | null> {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const { data: studentRows, error: studentError } = await supabase
    .from('students')
    .select('*')
    .eq('parent_user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1);

  if (studentError) {
    console.error('Error loading student:', studentError.message);
    return null;
  }

  const student = studentRows?.[0];

  if (!student) {
    return null;
  }

  const [
    { data: gradesData, error: gradesError },
    { data: feesData, error: feesError },
    { data: noticesData, error: noticesError },
    { data: attendanceData, error: attendanceError },
  ] = await Promise.all([
    supabase
      .from('grades')
      .select('*')
      .eq('student_id', student.id)
      .order('subject', { ascending: true }),

    supabase
      .from('fees')
      .select('*')
      .eq('student_id', student.id)
      .limit(1),

    supabase
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5),

    supabase
      .from('attendance')
      .select('*')
      .eq('student_id', student.id)
      .limit(1),
  ]);

  if (gradesError) {
    console.error('Error loading grades:', gradesError.message);
  }

  if (feesError) {
    console.error('Error loading fees:', feesError.message);
  }

  if (noticesError) {
    console.error('Error loading announcements:', noticesError.message);
  }

  if (attendanceError) {
    console.error('Error loading attendance:', attendanceError.message);
  }

  const grades = ((gradesData ?? []) as GradeDbRow[]).map(
    (item): GradeRow => ({
      subject: item.subject,
      score: item.score,
      grade: item.grade,
    })
  );

  const fee = ((feesData ?? []) as FeeDbRow[])[0];
  const attendance = ((attendanceData ?? []) as AttendanceRow[])[0];

  const notices = ((noticesData ?? []) as AnnouncementItem[]).map(
    (item) => item.title
  );

  const childView: ChildView = {
    name: student.name,
    class_name: student.class_name,
    admission_no: student.admission_no,
    gender: student.gender,
    attendance: attendance?.attendance_percent ?? 0,
    fee_status: student.fee_status,
    amount_due: fee?.amount_due ?? 0,
    amount_paid: fee?.amount_paid ?? 0,
    grades,
    notices,
  };

  return childView;
}
export async function findStudentByApplication(application: ApplicationItem) {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('name', application.student_name)
    .eq('parent_name', application.parent_name)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error(error.message);
    return null;
  }

  return data;
}

function generateAdmissionNo() {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `FIS-${year}-${random}`;
}

export async function createStudentFromApplication(application: ApplicationItem) {
  const existing = await findStudentByApplication(application);

  if (existing) return existing;

  const payload = {
  name: application.student_name,
  class_name: application.track,
  admission_no: generateAdmissionNo(),
  gender: 'Not Set',
  parent_name: application.parent_name,
  fee_status: 'Outstanding',
  parent_user_id: application.parent_user_id ?? null,
};
  const { data, error } = await supabase
    .from('students')
    .insert([payload])
    .select()
    .single();

  if (error) {
    console.error(error.message);
    return null;
  }

  return data;
}

export async function createDefaultFeeForStudent(studentId: string) {
  const { data: existing } = await supabase
    .from('fees')
    .select('id')
    .eq('student_id', studentId)
    .limit(1);

  if (existing && existing.length > 0) return true;

  const { error } = await supabase.from('fees').insert([
    {
      student_id: studentId,
      amount_due: 180000,
      amount_paid: 0,
    },
  ]);

  if (error) {
    console.error(error.message);
    return false;
  }

  return true;
}

export async function createDefaultAttendanceForStudent(studentId: string) {
  const { data: existing } = await supabase
    .from('attendance')
    .select('id')
    .eq('student_id', studentId)
    .limit(1);

  if (existing && existing.length > 0) return true;

  const { error } = await supabase.from('attendance').insert([
    {
      student_id: studentId,
      attendance_percent: 0,
    },
  ]);

  if (error) {
    console.error(error.message);
    return false;
  }

  return true;
}
export async function addGrade(
  studentId: string,
  subject: string,
  score: number
): Promise<boolean> {
  const normalizedSubject = subject.trim();
  const clampedScore = Math.max(0, Math.min(100, score));

  let grade = 'F';
  if (clampedScore >= 70) grade = 'A';
  else if (clampedScore >= 60) grade = 'B';
  else if (clampedScore >= 50) grade = 'C';
  else if (clampedScore >= 45) grade = 'D';
  else if (clampedScore >= 40) grade = 'E';

  const { error } = await supabase.from('grades').insert([
    {
      student_id: studentId,
      subject: normalizedSubject,
      score: clampedScore,
      grade,
    },
  ]);

  if (error) {
    console.error('Error adding grade:', error.message);
    return false;
  }

  return true;
}

export async function listGradesByStudent(studentId: string): Promise<GradeRow[]> {
  const { data, error } = await supabase
    .from('grades')
    .select('*')
    .eq('student_id', studentId)
    .order('subject', { ascending: true });

  if (error) {
    console.error('Error loading grades by student:', error.message);
    return [];
  }

  return ((data ?? []) as GradeDbRow[]).map((item) => ({
    subject: item.subject,
    score: item.score,
    grade: item.grade,
  }));
}

export async function deleteGradeByStudentAndSubject(
  studentId: string,
  subject: string
): Promise<boolean> {
  const { error } = await supabase
    .from('grades')
    .delete()
    .eq('student_id', studentId)
    .eq('subject', subject);

  if (error) {
    console.error('Error deleting grade:', error.message);
    return false;
  }

  return true;
}

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Error signing in:', error.message);
    return null;
  }

  return data;
}

export async function signOutUser() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Error signing out:', error.message);
    return false;
  }

  return true;
}

export async function getCurrentUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return null;
  }

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error('Error getting user:', error.message);
    return null;
  }

  return data.user ?? null;
}
export async function getCurrentProfile(): Promise<Profile | null> {
  const user = await getCurrentUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();

  if (error) {
    console.error('Error getting profile:', error.message);
    return null;
  }

  return (data as Profile | null) ?? null;
}

export async function createProfileForUser(payload: {
  id: string;
  full_name: string;
  email: string;
  role: Exclude<Role, null>;
}) {
  const { data, error } = await supabase
    .from('profiles')
    .upsert([payload])
    .select()
    .single();

  if (error) {
    console.error('Error creating profile:', error.message);
    return null;
  }

  return data as Profile;
}

export async function updateStudentFee(
  studentId: string,
  amountDue: number,
  amountPaid: number
): Promise<boolean> {
  const { data: existing, error: checkError } = await supabase
    .from('fees')
    .select('id')
    .eq('student_id', studentId)
    .limit(1);

  if (checkError) {
    console.error('Error checking fee:', checkError.message);
    return false;
  }

  if (existing && existing.length > 0) {
    const { error } = await supabase
      .from('fees')
      .update({
        amount_due: amountDue,
        amount_paid: amountPaid,
      })
      .eq('student_id', studentId);

    if (error) {
      console.error('Error updating fee:', error.message);
      return false;
    }

    return true;
  }

  const { error } = await supabase.from('fees').insert([
    {
      student_id: studentId,
      amount_due: amountDue,
      amount_paid: amountPaid,
    },
  ]);

  if (error) {
    console.error('Error creating fee:', error.message);
    return false;
  }

  return true;
}

export async function updateStudentFeeStatus(
  studentId: string,
  feeStatus: 'Paid' | 'Partially Paid' | 'Outstanding'
): Promise<boolean> {
  const { error } = await supabase
    .from('students')
    .update({ fee_status: feeStatus })
    .eq('id', studentId);

  if (error) {
    console.error('Error updating fee status:', error.message);
    return false;
  }

  return true;
}
export async function updateStudentAttendance(
  studentId: string,
  attendancePercent: number
): Promise<boolean> {
  const clampedAttendance = Math.max(0, Math.min(100, attendancePercent));

  const { data: existing, error: checkError } = await supabase
    .from('attendance')
    .select('id')
    .eq('student_id', studentId)
    .limit(1);

  if (checkError) {
    console.error('Error checking attendance:', checkError.message);
    return false;
  }

  if (existing && existing.length > 0) {
    const { error } = await supabase
      .from('attendance')
      .update({
        attendance_percent: clampedAttendance,
        updated_at: new Date().toISOString(),
      })
      .eq('student_id', studentId);

    if (error) {
      console.error('Error updating attendance:', error.message);
      return false;
    }

    return true;
  }

  const { error } = await supabase.from('attendance').insert([
    {
      student_id: studentId,
      attendance_percent: clampedAttendance,
      updated_at: new Date().toISOString(),
    },
  ]);

  if (error) {
    console.error('Error creating attendance:', error.message);
    return false;
  }

  return true;
}