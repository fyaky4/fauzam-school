export type PageKey =
  | 'home'
  | 'about'
  | 'admissions'
  | 'portal'
  | 'admin'
  | 'teacher'
  | 'contact'
  | 'gallery'
  | 'programs';

export type Role = 'parent' | 'admin' | 'teacher' | null;

export type ApplicationStatus = 'Pending Review' | 'Waitlisted' | 'Accepted' | 'Rejected';

export type FeeStatus = 'Paid' | 'Partially Paid' | 'Outstanding';

export type Profile = {
  id: string;
  full_name: string;
  email: string;
  role: Exclude<Role, null>;
};

export type ApplicationItem = {
  id: string;
  parent_name: string;
  student_name: string;
  email: string;
  track: string;
  status: ApplicationStatus;
  type: 'application' | 'waitlist';
  notes?: string;
  parent_user_id?: string | null;
  created_at?: string;
};

export type StudentRecord = {
  id: string;
  name: string;
  class_name: string;
  admission_no: string;
  gender: string;
  parent_name: string;
  fee_status: FeeStatus;
  parent_user_id?: string | null;
};

export type ClassRecord = {
  id: string;
  name: string;
  teacher: string;
  capacity: number;
};

export type AnnouncementItem = {
  id: string;
  title: string;
  audience: string;
  body: string;
  created_at?: string;
};

export type MessageThread = {
  id: string;
  parent: string;
  teacher: string;
  subject: string;
  last_message: string;
  time: string;
};

export type GradeRow = {
  subject: string;
  score: number;
  grade: string;
};

export type ChildView = {
  name: string;
  class_name: string;
  admission_no: string;
  gender: string;
  attendance: number;
  fee_status: FeeStatus;
  amount_due: number;
  amount_paid: number;
  grades: GradeRow[];
  notices: string[];
};