export type StreamType = 'Science' | 'Arts' | 'General';

export interface SubjectMarks {
  subject: string;
  theory: number;
  practical: number;
  maxTheory: number;
  maxPractical: number;
  grade: string;
}

export interface MarksheetRecord {
  term: string;
  session: string;
  overallPercentage: number;
  result: 'PASS' | 'FAIL' | 'COMPARTMENT';
  rank: string;
  subjects: SubjectMarks[];
  teacherRemarks: string;
}

export interface Student {
  id: string; // Deterministic: e.g. PRI082010
  fullName: string;
  dob: string; // YYYY-MM-DD
  grade: string; // e.g. "Class 11th"
  stream: StreamType;
  section: string;
  rollNo: string;
  scholarNo: string;
  cbseRegNo?: string;
  fatherName: string;
  motherName?: string;
  guardianMobile: string;
  pin: string; // 4-digit custom PIN or ID
  photoUrl: string;
  feeStatus: 'Paid' | 'Pending' | 'Overdue';
  pendingFeeAmount: number;
  attendanceRate: number; // e.g. 94.2
  attendedDays: number;
  totalDays: number;
  classRank: string;
  marksheet: MarksheetRecord;
  registeredAt: string;
}

export interface Notice {
  id: string;
  title: string;
  category: 'Examination' | 'Admissions' | 'Holiday' | 'Circular' | 'General';
  date: string;
  description: string;
  attachmentName?: string;
  attachmentUrl?: string;
  isUrgent?: boolean;
}

export interface Topper {
  id: string;
  name: string;
  percentage: number;
  category: '10th' | '12th Science' | '12th Arts' | 'Home Exams';
  year: string;
  stream?: string;
  photoUrl: string;
  achievement: string;
}

export interface Alumni {
  id: string;
  name: string;
  passoutYear: string;
  currentDesignation: string;
  companyOrCollege: string;
  photoUrl: string;
  quote: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Campus' | 'Labs' | 'Sports' | 'Events' | 'Classrooms';
  imageUrl: string;
  description: string;
}

export interface FeeReceipt {
  id: string;
  studentId: string;
  studentName: string;
  term: string;
  amount: number;
  paidAt: string;
  transactionId: string;
  paymentMode: 'UPI' | 'NetBanking' | 'Card' | 'Cash';
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
}

export interface DeletionRequest {
  id: string;
  studentId: string;
  studentName: string;
  reason: string;
  requestedAt: string;
  status: 'PENDING' | 'RESOLVED' | 'REJECTED';
}

export interface AdmissionInquiry {
  id: string;
  studentName: string;
  grade: string;
  parentName: string;
  mobile: string;
  message: string;
  submittedAt: string;
}

export interface UserSession {
  role: 'guest' | 'student' | 'admin';
  studentId?: string;
  studentName?: string;
}
