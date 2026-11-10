import {
  Student,
  Notice,
  Topper,
  Alumni,
  GalleryItem,
  FeeReceipt,
  DeletionRequest,
  AdmissionInquiry,
  UserSession
} from '../types';

export const MASTER_ADMIN = {
  id: 'ADMIN227811',
  password: 'StJohn@2026',
  name: 'Principal Office / Admin Console'
};

const STORAGE_KEYS = {
  STUDENTS: 'stjohn_students_v1',
  NOTICES: 'stjohn_notices_v1',
  TOPPERS: 'stjohn_toppers_v1',
  ALUMNI: 'stjohn_alumni_v1',
  GALLERY: 'stjohn_gallery_v1',
  RECEIPTS: 'stjohn_receipts_v1',
  DELETION_REQUESTS: 'stjohn_deletion_requests_v1',
  INQUIRIES: 'stjohn_inquiries_v1',
  CURRENT_USER: 'stjohn_current_user_v1'
};

// Initial High-Quality Seed Data
const DEFAULT_STUDENTS: Student[] = [
  {
    id: 'PRI082010',
    fullName: 'Priyanshu Tiwari',
    dob: '2010-08-24',
    grade: 'Class 11th',
    stream: 'Science',
    section: 'B',
    rollNo: '24',
    scholarNo: '2023-SJ-408',
    cbseRegNo: '2132890',
    fatherName: 'Manoj Kumar Tiwari',
    guardianMobile: '9452098765',
    pin: '4821',
    photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    feeStatus: 'Pending',
    pendingFeeAmount: 4850,
    attendanceRate: 94.2,
    attendedDays: 158,
    totalDays: 168,
    classRank: 'Rank #1 in Sec B',
    marksheet: {
      term: 'Term 2 (Pre-Board)',
      session: '2024-2025',
      overallPercentage: 92.4,
      result: 'PASS',
      rank: '1st Division with Distinction',
      subjects: [
        { subject: 'Physics (Theory + Lab)', theory: 65, practical: 29, maxTheory: 70, maxPractical: 30, grade: 'A1' },
        { subject: 'Chemistry (Theory + Lab)', theory: 63, practical: 28, maxTheory: 70, maxPractical: 30, grade: 'A1' },
        { subject: 'Mathematics', theory: 94, practical: 0, maxTheory: 100, maxPractical: 0, grade: 'A1' },
        { subject: 'Computer Science (Python)', theory: 68, practical: 29, maxTheory: 70, maxPractical: 30, grade: 'A1' },
        { subject: 'English Core', theory: 91, practical: 0, maxTheory: 100, maxPractical: 0, grade: 'A1' }
      ],
      teacherRemarks: 'Exceptional analytical aptitude. Consistently leads science project demonstrations and peer study circles.'
    },
    registeredAt: '2023-04-10'
  },
  {
    id: 'RAH052012',
    fullName: 'Rahul Verma',
    dob: '2012-05-14',
    grade: 'Class 9th',
    stream: 'General',
    section: 'A',
    rollNo: '12',
    scholarNo: '2024-SJ-119',
    cbseRegNo: '2132904',
    fatherName: 'Devendra Verma',
    guardianMobile: '9415123456',
    pin: 'RAH052012',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    feeStatus: 'Paid',
    pendingFeeAmount: 0,
    attendanceRate: 96.0,
    attendedDays: 161,
    totalDays: 168,
    classRank: 'Rank #3 in Sec A',
    marksheet: {
      term: 'Term 1 (Half Yearly)',
      session: '2024-2025',
      overallPercentage: 88.6,
      result: 'PASS',
      rank: '1st Division',
      subjects: [
        { subject: 'Science', theory: 72, practical: 18, maxTheory: 80, maxPractical: 20, grade: 'A2' },
        { subject: 'Mathematics', theory: 74, practical: 19, maxTheory: 80, maxPractical: 20, grade: 'A1' },
        { subject: 'Social Science', theory: 69, practical: 18, maxTheory: 80, maxPractical: 20, grade: 'B1' },
        { subject: 'English Language', theory: 73, practical: 19, maxTheory: 80, maxPractical: 20, grade: 'A2' },
        { subject: 'Hindi Course A', theory: 75, practical: 19, maxTheory: 80, maxPractical: 20, grade: 'A1' }
      ],
      teacherRemarks: 'Very attentive and disciplined. Shows keen interest in mathematics competitions.'
    },
    registeredAt: '2024-04-05'
  },
  {
    id: 'ANA032009',
    fullName: 'Ananya Mishra',
    dob: '2009-03-12',
    grade: 'Class 12th',
    stream: 'Arts',
    section: 'A',
    rollNo: '05',
    scholarNo: '2022-SJ-311',
    cbseRegNo: '2132712',
    fatherName: 'Suresh Chandra Mishra',
    guardianMobile: '9789012345',
    pin: '1234',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    feeStatus: 'Paid',
    pendingFeeAmount: 0,
    attendanceRate: 98.1,
    attendedDays: 165,
    totalDays: 168,
    classRank: 'Rank #1 in Arts',
    marksheet: {
      term: 'Pre-Board Final',
      session: '2024-2025',
      overallPercentage: 95.8,
      result: 'PASS',
      rank: 'School Topper (Arts)',
      subjects: [
        { subject: 'History', theory: 96, practical: 0, maxTheory: 100, maxPractical: 0, grade: 'A1' },
        { subject: 'Political Science', theory: 94, practical: 0, maxTheory: 100, maxPractical: 0, grade: 'A1' },
        { subject: 'Economics', theory: 97, practical: 0, maxTheory: 100, maxPractical: 0, grade: 'A1' },
        { subject: 'Geography', theory: 68, practical: 29, maxTheory: 70, maxPractical: 30, grade: 'A1' },
        { subject: 'English Core', theory: 93, practical: 0, maxTheory: 100, maxPractical: 0, grade: 'A1' }
      ],
      teacherRemarks: 'Brilliant mastery of Humanities and state debate team captain.'
    },
    registeredAt: '2022-04-01'
  }
];

const DEFAULT_NOTICES: Notice[] = [
  {
    id: 'not-1',
    title: 'Admissions Open for Session 2025-26 (Nursery to 12th)',
    category: 'Admissions',
    date: '10 Nov 2026',
    description: 'Registration forms are now available at the School Administrative Office or online via our Public Portal. Special scholarship concessions available for meritorious rural students of Amethi district.',
    attachmentName: 'Admission_Brochure_2025_26.pdf',
    isUrgent: true
  },
  {
    id: 'not-2',
    title: 'Pre-Board Examination Schedule Published',
    category: 'Examination',
    date: '08 Nov 2026',
    description: 'Pre-Board theoretical and practical examination dates for Classes 10th and 12th (Science & Arts) have been uploaded to the student portal ledger. Regular attendance is mandatory.',
    attachmentName: 'Date_Sheet_PreBoard_2026.pdf',
    isUrgent: false
  },
  {
    id: 'not-3',
    title: 'Annual Sports & Athletics Meet 2026 Announcement',
    category: 'General',
    date: '04 Nov 2026',
    description: 'The Annual Inter-House Track & Field Athletics Meet will be conducted at the Main Campus Sports Ground from Dec 15-17. Interested athletes can register with House Captains.',
    attachmentName: 'Sports_Events_Schedule.pdf',
    isUrgent: false
  },
  {
    id: 'not-4',
    title: 'National Talent Search & Science Olympiad Coaching',
    category: 'Circular',
    date: '28 Oct 2026',
    description: 'Free weekend foundation coaching for NTSE and Olympiad aspirants of Classes 9th and 11th begins this Saturday in the Smart Computer Lab.',
    isUrgent: false
  }
];

const DEFAULT_TOPPERS: Topper[] = [
  {
    id: 'top-1',
    name: 'Priyanshu Tiwari',
    percentage: 98.4,
    category: '12th Science',
    year: '2025',
    stream: 'Science (PCM)',
    photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    achievement: 'District Rank #1 (Amethi) • 100/100 in Mathematics'
  },
  {
    id: 'top-2',
    name: 'Ananya Mishra',
    percentage: 96.8,
    category: '12th Arts',
    year: '2025',
    stream: 'Arts (Humanities)',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    achievement: 'School Topper Arts • 98% in Economics & History'
  },
  {
    id: 'top-3',
    name: 'Aarav Pratap Singh',
    percentage: 97.6,
    category: '10th',
    year: '2025',
    stream: 'General',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    achievement: 'CBSE 10th Board • A1 in all 5 subjects'
  },
  {
    id: 'top-4',
    name: 'Sneha Pandey',
    percentage: 98.2,
    category: 'Home Exams',
    year: '2025',
    stream: 'Class 9th',
    photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    achievement: 'Junior Academic Star Trophy winner'
  }
];

const DEFAULT_ALUMNI: Alumni[] = [
  {
    id: 'alm-1',
    name: 'Dr. Vivek R. Shukla',
    passoutYear: 'Batch of 2017',
    currentDesignation: 'Resident Doctor (Cardiology)',
    companyOrCollege: 'AIIMS New Delhi',
    photoUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    quote: 'The rigorous science lab experiments at St. John gave me the foundation to crack NEET with AIR 314.'
  },
  {
    id: 'alm-2',
    name: 'Pooja Vishwakarma',
    passoutYear: 'Batch of 2019',
    currentDesignation: 'Aerospace Systems Engineer',
    companyOrCollege: 'ISRO Satellite Center',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    quote: 'Teachers at St. John Shukul Bazar nurtured my curiosity and taught us that dreams have no postal code limits.'
  },
  {
    id: 'alm-3',
    name: 'Capt. Aman Pratap',
    passoutYear: 'Batch of 2018',
    currentDesignation: 'Flight Lieutenant',
    companyOrCollege: 'Indian Air Force (NDA 141st)',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    quote: 'Discipline, physical drills, and morning assemblies at St. John instilled the core military ethos early in my life.'
  }
];

const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Main Academic Building & Landscaped Lawns',
    category: 'Campus',
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=80',
    description: 'Expansive CBSE-compliant campus located in Shukul Bazar, Amethi with peaceful green surroundings.'
  },
  {
    id: 'gal-2',
    title: 'Senior Physics & Chemistry Research Laboratory',
    category: 'Labs',
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1000&q=80',
    description: 'Fully equipped experimental setups, optical benches, and fume hoods for CBSE practical curriculums.'
  },
  {
    id: 'gal-3',
    title: 'Interactive Smart Classroom with Digital Displays',
    category: 'Classrooms',
    imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1000&q=80',
    description: 'High-speed audio-visual smart board classrooms bringing modern multimedia learning to rural UP.'
  },
  {
    id: 'gal-4',
    title: 'School Sports Complex & Cricket Ground',
    category: 'Sports',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80',
    description: 'Dedicated cricket pitch, basketball court, badminton nets, and athletics tracks.'
  },
  {
    id: 'gal-5',
    title: 'Annual Cultural Day Celebrations & Folk Dances',
    category: 'Events',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80',
    description: 'Students presenting cultural dance, patriotic plays, and literary presentations.'
  },
  {
    id: 'gal-6',
    title: 'Modern High-Speed Computer Lab with Coding Stations',
    category: 'Labs',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80',
    description: '40 networked terminals running Python, SQL, and educational programming suites.'
  }
];

const DEFAULT_RECEIPTS: FeeReceipt[] = [
  {
    id: 'rcpt-101',
    studentId: 'PRI082010',
    studentName: 'Priyanshu Tiwari',
    term: 'Term 1 Tuition & Lab Fees',
    amount: 4850,
    paidAt: '2024-05-10 11:20 AM',
    transactionId: 'SJ-UPI-20240510-4081',
    paymentMode: 'UPI',
    status: 'SUCCESS'
  },
  {
    id: 'rcpt-102',
    studentId: 'PRI082010',
    studentName: 'Priyanshu Tiwari',
    term: 'Term 2 Tuition & Exam Fees',
    amount: 4850,
    paidAt: '2024-08-14 02:45 PM',
    transactionId: 'SJ-UPI-20240814-9124',
    paymentMode: 'UPI',
    status: 'SUCCESS'
  },
  {
    id: 'rcpt-103',
    studentId: 'PRI082010',
    studentName: 'Priyanshu Tiwari',
    term: 'Term 3 Computer & Sports Dues',
    amount: 4850,
    paidAt: '2024-11-02 10:15 AM',
    transactionId: 'SJ-NB-20241102-1876',
    paymentMode: 'NetBanking',
    status: 'SUCCESS'
  }
];

// Helper functions for LocalStorage
function getLocal<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
}

function setLocal<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('LocalStorage write error', e);
  }
}

// Main Store Service
export const SchoolStore = {
  getStudents: (): Student[] => getLocal(STORAGE_KEYS.STUDENTS, DEFAULT_STUDENTS),

  getStudentById: (id: string): Student | undefined => {
    const list = SchoolStore.getStudents();
    return list.find((s) => s.id.toUpperCase() === id.trim().toUpperCase());
  },

  saveStudent: (student: Student) => {
    const list = SchoolStore.getStudents();
    const idx = list.findIndex((s) => s.id.toUpperCase() === student.id.toUpperCase());
    if (idx >= 0) {
      list[idx] = student;
    } else {
      list.unshift(student);
    }
    setLocal(STORAGE_KEYS.STUDENTS, list);
    return student;
  },

  deleteStudent: (id: string) => {
    const list = SchoolStore.getStudents().filter((s) => s.id.toUpperCase() !== id.toUpperCase());
    setLocal(STORAGE_KEYS.STUDENTS, list);
  },

  updateStudentPin: (id: string, newPin: string) => {
    const student = SchoolStore.getStudentById(id);
    if (student) {
      student.pin = newPin;
      SchoolStore.saveStudent(student);
      return true;
    }
    return false;
  },

  bulkAddStudents: (newStudents: Partial<Student>[]): number => {
    const list = SchoolStore.getStudents();
    let addedCount = 0;

    for (const partial of newStudents) {
      if (!partial.id) continue;
      const existingIdx = list.findIndex((s) => s.id.toUpperCase() === partial.id!.toUpperCase());
      const fullRecord: Student = {
        id: partial.id,
        fullName: partial.fullName || 'Student',
        dob: partial.dob || '2012-05-14',
        grade: partial.grade || 'Class 11th',
        stream: partial.stream || 'Science',
        section: partial.section || 'A',
        rollNo: partial.rollNo || String(list.length + addedCount + 1),
        scholarNo: partial.scholarNo || `2025-SJ-${100 + list.length + addedCount}`,
        fatherName: partial.fatherName || 'Guardian',
        guardianMobile: partial.guardianMobile || '9452000000',
        pin: partial.pin || partial.id,
        photoUrl: partial.photoUrl || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
        feeStatus: partial.feeStatus || 'Paid',
        pendingFeeAmount: partial.pendingFeeAmount ?? (partial.feeStatus === 'Pending' ? 4850 : 0),
        attendanceRate: partial.attendanceRate ?? 95.0,
        attendedDays: partial.attendedDays ?? 160,
        totalDays: partial.totalDays ?? 168,
        classRank: partial.classRank || 'Good Standing',
        marksheet: partial.marksheet || {
          term: 'Term 1',
          session: '2024-2025',
          overallPercentage: 86.5,
          result: 'PASS',
          rank: '1st Division',
          subjects: [
            { subject: 'English', theory: 78, practical: 0, maxTheory: 100, maxPractical: 0, grade: 'A2' },
            { subject: 'Science/Maths', theory: 74, practical: 18, maxTheory: 80, maxPractical: 20, grade: 'A2' }
          ],
          teacherRemarks: 'Good academic progression.'
        },
        registeredAt: new Date().toISOString().split('T')[0]
      };

      if (existingIdx >= 0) {
        list[existingIdx] = { ...list[existingIdx], ...fullRecord };
      } else {
        list.push(fullRecord);
        addedCount++;
      }
    }

    setLocal(STORAGE_KEYS.STUDENTS, list);
    return addedCount;
  },

  // Notices
  getNotices: (): Notice[] => getLocal(STORAGE_KEYS.NOTICES, DEFAULT_NOTICES),

  addNotice: (notice: Notice) => {
    const list = SchoolStore.getNotices();
    list.unshift(notice);
    setLocal(STORAGE_KEYS.NOTICES, list);
  },

  deleteNotice: (id: string) => {
    const list = SchoolStore.getNotices().filter((n) => n.id !== id);
    setLocal(STORAGE_KEYS.NOTICES, list);
  },

  // Toppers
  getToppers: (): Topper[] => getLocal(STORAGE_KEYS.TOPPERS, DEFAULT_TOPPERS),

  addTopper: (topper: Topper) => {
    const list = SchoolStore.getToppers();
    list.unshift(topper);
    setLocal(STORAGE_KEYS.TOPPERS, list);
  },

  deleteTopper: (id: string) => {
    const list = SchoolStore.getToppers().filter((t) => t.id !== id);
    setLocal(STORAGE_KEYS.TOPPERS, list);
  },

  // Alumni
  getAlumni: (): Alumni[] => getLocal(STORAGE_KEYS.ALUMNI, DEFAULT_ALUMNI),

  addAlumni: (alumni: Alumni) => {
    const list = SchoolStore.getAlumni();
    list.unshift(alumni);
    setLocal(STORAGE_KEYS.ALUMNI, list);
  },

  deleteAlumni: (id: string) => {
    const list = SchoolStore.getAlumni().filter((a) => a.id !== id);
    setLocal(STORAGE_KEYS.ALUMNI, list);
  },

  // Gallery
  getGallery: (): GalleryItem[] => getLocal(STORAGE_KEYS.GALLERY, DEFAULT_GALLERY),

  addGalleryItem: (item: GalleryItem) => {
    const list = SchoolStore.getGallery();
    list.unshift(item);
    setLocal(STORAGE_KEYS.GALLERY, list);
  },

  deleteGalleryItem: (id: string) => {
    const list = SchoolStore.getGallery().filter((g) => g.id !== id);
    setLocal(STORAGE_KEYS.GALLERY, list);
  },

  // Fee Receipts
  getReceipts: (studentId?: string): FeeReceipt[] => {
    const list: FeeReceipt[] = getLocal(STORAGE_KEYS.RECEIPTS, DEFAULT_RECEIPTS);
    if (studentId) {
      return list.filter((r) => r.studentId.toUpperCase() === studentId.toUpperCase());
    }
    return list;
  },

  addReceipt: (receipt: FeeReceipt) => {
    const list = SchoolStore.getReceipts();
    list.unshift(receipt);
    setLocal(STORAGE_KEYS.RECEIPTS, list);

    // Also update student feeStatus to Paid
    const student = SchoolStore.getStudentById(receipt.studentId);
    if (student) {
      student.feeStatus = 'Paid';
      student.pendingFeeAmount = 0;
      SchoolStore.saveStudent(student);
    }
  },

  // Deletion Requests (Google Play Policy Compliance)
  getDeletionRequests: (): DeletionRequest[] => getLocal(STORAGE_KEYS.DELETION_REQUESTS, [
    {
      id: 'del-demo-1',
      studentId: 'PRI082010',
      studentName: 'Priyanshu Tiwari',
      reason: 'Passout transfer certificate request; remove biometric archive.',
      requestedAt: '2026-11-09 14:30',
      status: 'PENDING'
    }
  ]),

  submitDeletionRequest: (req: Omit<DeletionRequest, 'id' | 'requestedAt' | 'status'>) => {
    const list = SchoolStore.getDeletionRequests();
    const newReq: DeletionRequest = {
      ...req,
      id: `del-${Date.now()}`,
      requestedAt: new Date().toLocaleString(),
      status: 'PENDING'
    };
    list.unshift(newReq);
    setLocal(STORAGE_KEYS.DELETION_REQUESTS, list);
    return newReq;
  },

  updateDeletionStatus: (id: string, status: 'RESOLVED' | 'REJECTED') => {
    const list = SchoolStore.getDeletionRequests();
    const item = list.find((d) => d.id === id);
    if (item) {
      item.status = status;
      if (status === 'RESOLVED') {
        SchoolStore.deleteStudent(item.studentId);
      }
      setLocal(STORAGE_KEYS.DELETION_REQUESTS, list);
    }
  },

  // Admission Inquiries
  getInquiries: (): AdmissionInquiry[] => getLocal(STORAGE_KEYS.INQUIRIES, [
    {
      id: 'inq-1',
      studentName: 'Adarsh Shukla',
      grade: 'Class 11th (Science)',
      parentName: 'Rameshwar Shukla',
      mobile: '9452901122',
      message: 'Inquiring about hostel bus facility from Musafirkhana route.',
      submittedAt: '2026-11-10 10:15 AM'
    }
  ]),

  submitInquiry: (inquiry: Omit<AdmissionInquiry, 'id' | 'submittedAt'>) => {
    const list = SchoolStore.getInquiries();
    const record: AdmissionInquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      submittedAt: new Date().toLocaleString()
    };
    list.unshift(record);
    setLocal(STORAGE_KEYS.INQUIRIES, list);
    return record;
  },

  // Auth Session
  getCurrentSession: (): UserSession => {
    return getLocal(STORAGE_KEYS.CURRENT_USER, { role: 'guest' });
  },

  setCurrentSession: (session: UserSession) => {
    setLocal(STORAGE_KEYS.CURRENT_USER, session);
  },

  clearSession: () => {
    setLocal(STORAGE_KEYS.CURRENT_USER, { role: 'guest' });
  }
};
