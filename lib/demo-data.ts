import type {
  AnnouncementItem,
  ApplicationItem,
  ChildView,
  ClassRecord,
  MessageThread,
  PageKey,
  StudentRecord,
} from './types';

export const schoolName = 'Fauzam International School';
export const schoolTagline = 'Empowering Young Minds for a Brighter Future';

export const navItems: { key: PageKey; label: string }[] = [
  { key: 'home', label: 'Home' },
  { key: 'about', label: 'About' },
  { key: 'programs', label: 'Programs' },
  { key: 'admissions', label: 'Admissions' },
  { key: 'gallery', label: 'Gallery' },
  { key: 'portal', label: 'Portal' },
  { key: 'admin', label: 'Admin' },
  { key: 'teacher', label: 'Teacher' },
  { key: 'contact', label: 'Contact' },
];

export const timetable = [
  { day: 'Monday', items: ['Math', 'English', 'Science'] },
  { day: 'Tuesday', items: ['English', 'ICT', 'Civic Education'] },
  { day: 'Wednesday', items: ['Science', 'Math', 'Creative Arts'] },
];

export const demoPrograms = [
  'Pre-Nursery',
  'Nursery',
  'Primary',
  'Junior Secondary',
  'Senior Secondary',
];
export const demoFeatures = [
  'Strong academic foundation',
  'Digital literacy and coding',
  'Skills-based learning',
  'Safe and supportive environment',
  'Moral discipline and leadership',
];

export const demoApplications: ApplicationItem[] = [
  {
    id: 'APP-001',
    parent_name: 'Fatima Bello',
    student_name: 'Zainab Bello',
    email: 'fatima@example.com',
    track: 'Primary',
    status: 'Pending Review',
    type: 'application',
  },
  {
    id: 'APP-002',
    parent_name: 'Usman Musa',
    student_name: 'Maryam Musa',
    email: 'usman@example.com',
    track: 'Nursery',
    status: 'Waitlisted',
    type: 'waitlist',
  },
  {
    id: 'APP-003',
    parent_name: 'Aisha Ibrahim',
    student_name: 'Ahmad Ibrahim',
    email: 'aisha@example.com',
    track: 'Pre-Nursery',
    status: 'Accepted',
    type: 'application',
  },
];

export const demoStudents: StudentRecord[] = [
  {
    id: 'STU-001',
    name: 'Amina Musa',
    class_name: 'Primary 4',
    admission_no: 'FIS-2026-0142',
    gender: 'Female',
    parent_name: 'Musa Abdullahi',
    fee_status: 'Partially Paid',
  },
  {
    id: 'STU-002',
    name: 'Maryam Bello',
    class_name: 'Nursery 2',
    admission_no: 'FIS-2026-0108',
    gender: 'Female',
    parent_name: 'Fatima Bello',
    fee_status: 'Paid',
  },
  {
    id: 'STU-003',
    name: 'Yusuf Ibrahim',
    class_name: 'Primary 2',
    admission_no: 'FIS-2026-0119',
    gender: 'Male',
    parent_name: 'Aisha Ibrahim',
    fee_status: 'Outstanding',
  },
];

export const demoClasses: ClassRecord[] = [
  { id: 'CLS-001', name: 'Pre-Nursery A', teacher: 'Mrs. Hauwa', capacity: 20 },
  { id: 'CLS-002', name: 'Nursery 2', teacher: 'Mrs. Fatima', capacity: 25 },
  { id: 'CLS-003', name: 'Primary 4', teacher: 'Mr. Sani', capacity: 30 },
];

export const demoAnnouncements: AnnouncementItem[] = [
  {
    id: 'ANN-001',
    title: 'School Resumption',
    audience: 'All',
    body: 'School resumes next Monday by 8:00 AM.',
  },
  {
    id: 'ANN-002',
    title: 'Primary Test Week',
    audience: 'Primary',
    body: 'Mid-term tests begin next week for all primary classes.',
  },
];

export const demoThreads: MessageThread[] = [
  {
    id: 'MSG-001',
    parent: 'Fatima Bello',
    teacher: 'Mr. Sani',
    subject: 'Mathematics progress',
    last_message: 'Thank you for the update. We will support practice at home.',
    time: '1 hour ago',
  },
  {
    id: 'MSG-002',
    parent: 'Aisha Ibrahim',
    teacher: 'Mrs. Fatima',
    subject: 'Absence notification',
    last_message: 'Yusuf will return tomorrow, In sha Allah.',
    time: 'Yesterday',
  },
];

export const demoChild: ChildView = {
  name: 'Amina Musa',
  class_name: 'Primary 4',
  admission_no: 'FIS-2026-0142',
  gender: 'Female',
  attendance: 94,
  fee_status: 'Partially Paid',
  amount_due: 180000,
  amount_paid: 120000,
  grades: [
    { subject: 'Math', score: 90, grade: 'A' },
    { subject: 'English', score: 85, grade: 'A' },
    { subject: 'Science', score: 88, grade: 'A' },
  ],
  notices: ['Mid-term test starts next week.', 'Parents meeting on Thursday.'],
};