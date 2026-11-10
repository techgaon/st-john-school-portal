import React, { useState, useRef } from 'react';
import { SchoolStore } from '../store/schoolStore';
import { Student, Notice, Topper, Alumni, GalleryItem, DeletionRequest, AdmissionInquiry } from '../types';
import { generateStudentId } from '../utils/studentId';
import { parseStudentExcelFile, downloadSampleExcelTemplate, ParsedStudentRow } from '../utils/excelHelper';
import { compressImageFile } from '../utils/imageCompressor';
import { scanStudentRegisterPhoto } from '../utils/ocrParser';

interface AdminDashboardProps {
  onNavigate: (view: string) => void;
  onSuccessToast: (msg: string) => void;
  onErrorToast: (msg: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onNavigate,
  onSuccessToast,
  onErrorToast
}) => {
  // Navigation tabs within Admin console
  const [activeTab, setActiveTab] = useState<
    'overview' | 'registration' | 'students' | 'attendance_fees' | 'portal_cms' | 'deletion_requests'
  >('overview');

  // Stores
  const [students, setStudents] = useState<Student[]>(SchoolStore.getStudents());
  const [notices, setNotices] = useState<Notice[]>(SchoolStore.getNotices());
  const [toppers, setToppers] = useState<Topper[]>(SchoolStore.getToppers());
  const [alumni, setAlumni] = useState<Alumni[]>(SchoolStore.getAlumni());
  const [gallery, setGallery] = useState<GalleryItem[]>(SchoolStore.getGallery());
  const [deletionRequests, setDeletionRequests] = useState<DeletionRequest[]>(SchoolStore.getDeletionRequests());
  const [inquiries, setInquiries] = useState<AdmissionInquiry[]>(SchoolStore.getInquiries());

  // Registration sub-tab: 'manual' | 'bulk' | 'ocr'
  const [regMode, setRegMode] = useState<'manual' | 'bulk' | 'ocr'>('manual');

  // Manual Form State
  const [manualName, setManualName] = useState('');
  const [manualDob, setManualDob] = useState('2011-06-15');
  const [manualGrade, setManualGrade] = useState('Class 11th');
  const [manualStream, setManualStream] = useState<'Science' | 'Arts' | 'General'>('Science');
  const [manualSection, setManualSection] = useState('A');
  const [manualFather, setManualFather] = useState('');
  const [manualMobile, setManualMobile] = useState('');
  const [manualFeeStatus, setManualFeeStatus] = useState<'Paid' | 'Pending'>('Paid');
  const [manualPhoto, setManualPhoto] = useState<string>('');

  // Bulk Excel State
  const [parsedExcelRows, setParsedExcelRows] = useState<ParsedStudentRow[]>([]);
  const [isProcessingExcel, setIsProcessingExcel] = useState(false);
  const excelInputRef = useRef<HTMLInputElement>(null);

  // Vision OCR State
  const [ocrImage, setOcrImage] = useState<string>('');
  const [ocrApiKey, setOcrApiKey] = useState<string>('');
  const [isScanningOcr, setIsScanningOcr] = useState(false);
  const [ocrParsedRows, setOcrParsedRows] = useState<ParsedStudentRow[]>([]);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // Student directory filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGrade, setFilterGrade] = useState('All');

  // New Notice form state
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeCategory, setNoticeCategory] = useState<'Examination' | 'Admissions' | 'Holiday' | 'Circular' | 'General'>('General');
  const [noticeDesc, setNoticeDesc] = useState('');
  const [noticeAttachName, setNoticeAttachName] = useState('');

  // New Topper form state
  const [topperName, setTopperName] = useState('');
  const [topperPct, setTopperPct] = useState(95.0);
  const [topperCat, setTopperCat] = useState<'10th' | '12th Science' | '12th Arts' | 'Home Exams'>('10th');
  const [topperPhoto, setTopperPhoto] = useState('');
  const [topperAchieve, setTopperAchieve] = useState('');

  // New Gallery item form state
  const [galleryTitle, setGalleryTitle] = useState('');
  const [galleryCategory, setGalleryCategory] = useState<'Campus' | 'Labs' | 'Sports' | 'Events' | 'Classrooms'>('Campus');
  const [galleryImgUrl, setGalleryImgUrl] = useState('');
  const [galleryDesc, setGalleryDesc] = useState('');

  // Dynamic preview ID for manual form
  const dynamicPreviewId = generateStudentId(manualName || 'New Student', manualDob);

  // Refresh data from store helper
  const reloadAll = () => {
    setStudents(SchoolStore.getStudents());
    setNotices(SchoolStore.getNotices());
    setToppers(SchoolStore.getToppers());
    setAlumni(SchoolStore.getAlumni());
    setGallery(SchoolStore.getGallery());
    setDeletionRequests(SchoolStore.getDeletionRequests());
    setInquiries(SchoolStore.getInquiries());
  };

  // 1. MANUAL REGISTRATION SUBMIT
  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName.trim()) {
      onErrorToast('Student full name is required');
      return;
    }

    const generatedId = generateStudentId(manualName, manualDob);
    const newStudent: Student = {
      id: generatedId,
      fullName: manualName.trim(),
      dob: manualDob,
      grade: manualGrade,
      stream: manualStream,
      section: manualSection,
      rollNo: String(students.length + 1),
      scholarNo: `2025-SJ-${200 + students.length + 1}`,
      fatherName: manualFather.trim() || 'Guardian',
      guardianMobile: manualMobile.trim() || '9452000000',
      pin: generatedId,
      photoUrl:
        manualPhoto ||
        'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
      feeStatus: manualFeeStatus,
      pendingFeeAmount: manualFeeStatus === 'Pending' ? 4850 : 0,
      attendanceRate: 95.0,
      attendedDays: 160,
      totalDays: 168,
      classRank: 'Good Standing',
      marksheet: {
        term: 'Term 1',
        session: '2024-2025',
        overallPercentage: 88.0,
        result: 'PASS',
        rank: '1st Division',
        subjects: [
          { subject: 'English', theory: 80, practical: 0, maxTheory: 100, maxPractical: 0, grade: 'A2' },
          { subject: 'Main Stream Core', theory: 75, practical: 20, maxTheory: 80, maxPractical: 20, grade: 'A1' }
        ],
        teacherRemarks: 'Enrolled via Admin Console with verified biometrics.'
      },
      registeredAt: new Date().toISOString().split('T')[0]
    };

    SchoolStore.saveStudent(newStudent);
    reloadAll();
    onSuccessToast(`Student ${newStudent.fullName} registered! Generated ID: ${newStudent.id}`);

    // Reset manual form
    setManualName('');
    setManualFather('');
    setManualMobile('');
    setManualPhoto('');
  };

  // 2. EXCEL FILE PARSER
  const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessingExcel(true);
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const buffer = evt.target?.result as ArrayBuffer;
        const parsed = parseStudentExcelFile(buffer);
        setParsedExcelRows(parsed);
        setIsProcessingExcel(false);
        onSuccessToast(`Parsed ${parsed.length} student rows from ${file.name}`);
      } catch (err) {
        setIsProcessingExcel(false);
        onErrorToast('Failed to parse Excel file. Please use the sample template.');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleConfirmSaveExcel = () => {
    if (parsedExcelRows.length === 0) return;
    const addedCount = SchoolStore.bulkAddStudents(
      parsedExcelRows.map((r, i) => ({
        id: r.generatedId,
        fullName: r.fullName,
        dob: r.dob,
        grade: r.grade,
        stream: r.stream,
        fatherName: r.fatherName,
        guardianMobile: r.guardianMobile,
        feeStatus: r.feeStatus,
        rollNo: String(students.length + i + 1),
        scholarNo: `2025-SJ-${300 + students.length + i + 1}`
      }))
    );
    reloadAll();
    setParsedExcelRows([]);
    onSuccessToast(`Successfully enrolled ${addedCount} students into the school database!`);
  };

  // 3. VISION OCR PHOTO PARSER
  const handleOcrImageUpload = async (file: File) => {
    try {
      setIsScanningOcr(true);
      const compressed = await compressImageFile(file);
      setOcrImage(compressed);

      const rows = await scanStudentRegisterPhoto(compressed, ocrApiKey);
      setOcrParsedRows(rows);
      setIsScanningOcr(false);
      onSuccessToast(`Vision OCR scanned register: extracted ${rows.length} student rows.`);
    } catch (err) {
      setIsScanningOcr(false);
      onErrorToast('OCR scan failed. Please check image lighting and clarity.');
    }
  };

  const handleConfirmSaveOcr = () => {
    if (ocrParsedRows.length === 0) return;
    const count = SchoolStore.bulkAddStudents(
      ocrParsedRows.map((r, i) => ({
        id: r.generatedId,
        fullName: r.fullName,
        dob: r.dob,
        grade: r.grade,
        stream: r.stream,
        fatherName: r.fatherName,
        guardianMobile: r.guardianMobile,
        feeStatus: r.feeStatus,
        rollNo: String(students.length + i + 1),
        scholarNo: `2025-SJ-OCR-${100 + i}`
      }))
    );
    reloadAll();
    setOcrParsedRows([]);
    setOcrImage('');
    onSuccessToast(`Saved ${count} OCR-extracted students into the school roster!`);
  };

  // Student Photo Upload helper with Canvas Compression
  const handlePhotoCapture = async (file: File) => {
    try {
      const compressed = await compressImageFile(file);
      setManualPhoto(compressed);
      onSuccessToast('Photo compressed and attached (<800px JPEG).');
    } catch (e) {
      onErrorToast('Failed to compress image.');
    }
  };

  // Toggle Student Fee Status
  const handleToggleFee = (student: Student) => {
    const updatedStatus = student.feeStatus === 'Paid' ? 'Pending' : 'Paid';
    const updated: Student = {
      ...student,
      feeStatus: updatedStatus,
      pendingFeeAmount: updatedStatus === 'Pending' ? 4850 : 0
    };
    SchoolStore.saveStudent(updated);
    reloadAll();
    onSuccessToast(`Updated fee status of ${student.fullName} to ${updatedStatus}`);
  };

  // Quick Attendance increment
  const handleMarkAttendance = (student: Student, present: boolean) => {
    const attended = present ? student.attendedDays + 1 : student.attendedDays;
    const total = student.totalDays + 1;
    const rate = Math.round((attended / total) * 1000) / 10;
    const updated: Student = {
      ...student,
      attendedDays: attended,
      totalDays: total,
      attendanceRate: rate
    };
    SchoolStore.saveStudent(updated);
    reloadAll();
    onSuccessToast(`Marked ${student.fullName} ${present ? 'PRESENT' : 'ABSENT'}. Attendance: ${rate}%`);
  };

  // Notice Add
  const handleAddNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle.trim()) return;
    SchoolStore.addNotice({
      id: `not-${Date.now()}`,
      title: noticeTitle.trim(),
      category: noticeCategory,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      description: noticeDesc.trim() || 'Official school circular.',
      attachmentName: noticeAttachName.trim() || undefined
    });
    reloadAll();
    setNoticeTitle('');
    setNoticeDesc('');
    setNoticeAttachName('');
    onSuccessToast('Public Notice published successfully!');
  };

  // Topper Add
  const handleAddTopper = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topperName.trim()) return;
    SchoolStore.addTopper({
      id: `top-${Date.now()}`,
      name: topperName.trim(),
      percentage: Number(topperPct),
      category: topperCat,
      year: '2025',
      photoUrl:
        topperPhoto ||
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      achievement: topperAchieve.trim() || 'CBSE Merit Certificate holder.'
    });
    reloadAll();
    setTopperName('');
    setTopperAchieve('');
    setTopperPhoto('');
    onSuccessToast('Academic Topper added to public showcase!');
  };

  // Gallery Add
  const handleAddGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryTitle.trim()) return;
    SchoolStore.addGalleryItem({
      id: `gal-${Date.now()}`,
      title: galleryTitle.trim(),
      category: galleryCategory,
      imageUrl:
        galleryImgUrl ||
        'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=80',
      description: galleryDesc.trim() || 'Campus life and infrastructure.'
    });
    reloadAll();
    setGalleryTitle('');
    setGalleryImgUrl('');
    setGalleryDesc('');
    onSuccessToast('Photo added to campus gallery!');
  };

  // Filtered Students list
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.scholarNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrade = filterGrade === 'All' || s.grade.includes(filterGrade);
    return matchesSearch && matchesGrade;
  });

  return (
    <div className="min-h-screen pt-20 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-6">
      {/* 1. Admin Master Header */}
      <div className="relative overflow-hidden rounded-2xl bg-primary text-on-primary p-6 sm:p-8 shadow-md">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-on-secondary font-label-sm text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-ping"></span>
                Master Administrative Console
              </span>
              <span className="font-data-mono text-xs text-primary-fixed opacity-90">
                Shukul Bazar, Amethi (227811)
              </span>
            </div>
            <h1 className="font-headline-lg text-2xl sm:text-3xl font-extrabold text-white mt-1">
              St. John Admin Center
            </h1>
            <p className="font-body-sm text-xs sm:text-sm text-surface-container-highest max-w-xl mt-1">
              Deterministic ID engine, SheetJS bulk Excel uploader, camera OCR digitizer & Play Store data governance.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('public')}
              className="px-4 py-2 rounded-xl bg-surface-container-lowest/15 hover:bg-surface-container-lowest/25 backdrop-blur-md text-white font-label-md text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">visibility</span>
              <span>View Public Portal</span>
            </button>
          </div>
        </div>

        {/* Pulse Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-4 border-t border-primary-container/40">
          <div className="p-3 rounded-xl bg-primary-container text-on-primary">
            <span className="font-label-sm text-[11px] text-surface-container-highest">Total Students</span>
            <div className="font-headline-md text-xl font-bold">{students.length}</div>
          </div>
          <div className="p-3 rounded-xl bg-primary-container text-on-primary">
            <span className="font-label-sm text-[11px] text-surface-container-highest">Avg Attendance</span>
            <div className="font-headline-md text-xl font-bold text-secondary-fixed">95.4%</div>
          </div>
          <div className="p-3 rounded-xl bg-primary-container text-on-primary">
            <span className="font-label-sm text-[11px] text-surface-container-highest">Admission Inquiries</span>
            <div className="font-headline-md text-xl font-bold">{inquiries.length}</div>
          </div>
          <div className="p-3 rounded-xl bg-primary-container text-on-primary">
            <span className="font-label-sm text-[11px] text-surface-container-highest">Deletion Tickets</span>
            <div className="font-headline-md text-xl font-bold text-error-container">
              {deletionRequests.filter((d) => d.status === 'PENDING').length}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Primary Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar p-1 bg-surface-container rounded-2xl">
        {[
          { key: 'overview', label: 'Overview', icon: 'dashboard' },
          { key: 'registration', label: 'Registration Hub (Excel/OCR)', icon: 'how_to_reg' },
          { key: 'students', label: 'Students Directory', icon: 'groups' },
          { key: 'attendance_fees', label: 'Attendance & Fees', icon: 'fact_check' },
          { key: 'portal_cms', label: 'Public Portal CMS', icon: 'web' },
          { key: 'deletion_requests', label: 'Play Store Deletion Tickets', icon: 'security' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-label-md text-xs whitespace-nowrap transition-all ${
              activeTab === tab.key
                ? 'bg-primary text-on-primary font-bold shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ======================================================== */}
      {/* TAB A: OVERVIEW & INQUIRIES */}
      {/* ======================================================== */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Enquiries Box */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 border border-surface-container-high shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">inbox</span>
                <h3 className="font-title-md text-base font-bold text-primary">
                  Recent Admission Inquiries ({inquiries.length})
                </h3>
              </div>
              <span className="text-xs text-on-surface-variant font-medium">Session 2025-26</span>
            </div>

            <div className="space-y-3">
              {inquiries.slice(0, 4).map((inq) => (
                <div
                  key={inq.id}
                  className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-title-md text-sm font-bold text-on-surface">{inq.studentName}</span>
                    <span className="font-label-sm text-xs font-semibold text-secondary">{inq.grade}</span>
                  </div>
                  <p className="font-body-sm text-xs text-on-surface-variant">
                    Parent: {inq.parentName} • Mobile: <a href={`tel:${inq.mobile}`} className="text-primary font-bold">{inq.mobile}</a>
                  </p>
                  <p className="font-body-sm text-xs text-on-surface-variant/80 italic mt-1">
                    "{inq.message}"
                  </p>
                  <div className="text-[10px] text-on-surface-variant text-right">{inq.submittedAt}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Institutional Fast Actions */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 border border-surface-container-high shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[22px]">bolt</span>
              <h3 className="font-title-md text-base font-bold text-primary">Administrative Fast Actions</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setActiveTab('registration');
                  setRegMode('bulk');
                }}
                className="p-4 rounded-xl bg-surface-container-low hover:bg-surface-container text-left border border-outline-variant/30 transition-all flex flex-col justify-between"
              >
                <span className="material-symbols-outlined text-primary text-[24px]">upload_file</span>
                <div className="mt-2">
                  <h4 className="font-title-md text-sm font-bold text-primary">Upload Excel Sheet</h4>
                  <p className="font-body-sm text-[11px] text-on-surface-variant mt-0.5">
                    Bulk parse and auto-generate student login IDs
                  </p>
                </div>
              </button>

              <button
                onClick={() => {
                  setActiveTab('registration');
                  setRegMode('ocr');
                }}
                className="p-4 rounded-xl bg-surface-container-low hover:bg-surface-container text-left border border-outline-variant/30 transition-all flex flex-col justify-between"
              >
                <span className="material-symbols-outlined text-secondary text-[24px]">document_scanner</span>
                <div className="mt-2">
                  <h4 className="font-title-md text-sm font-bold text-secondary">Scan Register (OCR)</h4>
                  <p className="font-body-sm text-[11px] text-on-surface-variant mt-0.5">
                    Digitize physical ledger photos using AI
                  </p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('attendance_fees')}
                className="p-4 rounded-xl bg-surface-container-low hover:bg-surface-container text-left border border-outline-variant/30 transition-all flex flex-col justify-between"
              >
                <span className="material-symbols-outlined text-primary text-[24px]">checklist</span>
                <div className="mt-2">
                  <h4 className="font-title-md text-sm font-bold text-primary">Mark Attendance</h4>
                  <p className="font-body-sm text-[11px] text-on-surface-variant mt-0.5">
                    Daily roll call and sync with parent portal
                  </p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('portal_cms')}
                className="p-4 rounded-xl bg-surface-container-low hover:bg-surface-container text-left border border-outline-variant/30 transition-all flex flex-col justify-between"
              >
                <span className="material-symbols-outlined text-secondary text-[24px]">campaign</span>
                <div className="mt-2">
                  <h4 className="font-title-md text-sm font-bold text-secondary">Publish Notice</h4>
                  <p className="font-body-sm text-[11px] text-on-surface-variant mt-0.5">
                    Post exams, sports day, or circular announcements
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB B: MULTI-MODE REGISTRATION HUB (MANUAL, EXCEL, OCR) */}
      {/* ======================================================== */}
      {activeTab === 'registration' && (
        <div className="space-y-6">
          {/* Submode Selector */}
          <div className="flex items-center gap-2 p-1.5 bg-surface-container-low rounded-2xl w-fit">
            <button
              onClick={() => setRegMode('manual')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-label-md text-xs font-semibold transition-all ${
                regMode === 'manual'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">person_add</span>
              <span>1. Manual Form</span>
            </button>
            <button
              onClick={() => setRegMode('bulk')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-label-md text-xs font-semibold transition-all ${
                regMode === 'bulk'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">dataset</span>
              <span>2. Smart Excel (.xlsx / .csv)</span>
            </button>
            <button
              onClick={() => setRegMode('ocr')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-label-md text-xs font-semibold transition-all ${
                regMode === 'ocr'
                  ? 'bg-secondary text-on-secondary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">document_scanner</span>
              <span>3. AI Camera Scan (Register OCR)</span>
            </button>
          </div>

          {/* SUBMODE 1: MANUAL FORM */}
          {regMode === 'manual' && (
            <div className="bg-surface-container-lowest rounded-2xl p-6 border border-surface-container-high shadow-xs space-y-6">
              {/* Dynamic Live ID Preview */}
              <div className="p-4 rounded-xl bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-outline-variant/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold">
                    ID
                  </div>
                  <div>
                    <span className="font-label-sm text-[11px] text-on-surface-variant uppercase font-bold">
                      Deterministic ID Generator
                    </span>
                    <p className="font-data-mono text-base sm:text-lg font-bold text-primary">
                      {dynamicPreviewId}
                    </p>
                  </div>
                </div>
                <div className="text-xs text-on-surface-variant font-medium">
                  Formula: [First 3 Letters] + [Birth Month MM] + [Year YYYY]
                </div>
              </div>

              <form onSubmit={handleManualSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-1">
                      Student Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={manualName}
                      onChange={(e) => setManualName(e.target.value)}
                      placeholder="e.g. Rahul Verma"
                      className="w-full px-3.5 py-2 rounded-xl bg-surface-container-low border border-outline-variant text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-1">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      required
                      value={manualDob}
                      onChange={(e) => setManualDob(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-surface-container-low border border-outline-variant text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-1">
                      Class / Grade *
                    </label>
                    <select
                      value={manualGrade}
                      onChange={(e) => setManualGrade(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-surface-container-low border border-outline-variant text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="Nursery">Nursery</option>
                      <option value="LKG / UKG">LKG / UKG</option>
                      <option value="Class 1st">Class 1st</option>
                      <option value="Class 2nd">Class 2nd</option>
                      <option value="Class 3rd">Class 3rd</option>
                      <option value="Class 4th">Class 4th</option>
                      <option value="Class 5th">Class 5th</option>
                      <option value="Class 6th">Class 6th</option>
                      <option value="Class 7th">Class 7th</option>
                      <option value="Class 8th">Class 8th</option>
                      <option value="Class 9th">Class 9th</option>
                      <option value="Class 10th">Class 10th</option>
                      <option value="Class 11th">Class 11th</option>
                      <option value="Class 12th">Class 12th</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-1">
                      Stream (9th-12th)
                    </label>
                    <select
                      value={manualStream}
                      onChange={(e) => setManualStream(e.target.value as any)}
                      className="w-full px-3.5 py-2 rounded-xl bg-surface-container-low border border-outline-variant text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="Science">Science (PCM/PCB)</option>
                      <option value="Arts">Arts (Humanities)</option>
                      <option value="General">General / Foundation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-1">
                      Section
                    </label>
                    <select
                      value={manualSection}
                      onChange={(e) => setManualSection(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-surface-container-low border border-outline-variant text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="A">Section A</option>
                      <option value="B">Section B</option>
                      <option value="C">Section C</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-1">
                      Father's / Guardian's Name
                    </label>
                    <input
                      type="text"
                      value={manualFather}
                      onChange={(e) => setManualFather(e.target.value)}
                      placeholder="e.g. Ramesh Verma"
                      className="w-full px-3.5 py-2 rounded-xl bg-surface-container-low border border-outline-variant text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-1">
                      Guardian Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={manualMobile}
                      onChange={(e) => setManualMobile(e.target.value)}
                      placeholder="e.g. 94520XXXXX"
                      className="w-full px-3.5 py-2 rounded-xl bg-surface-container-low border border-outline-variant text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Camera / Photo Upload with Canvas Compression */}
                <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-title-md text-xs font-bold text-on-surface">
                        Student Passport Photo (Mobile Camera or Gallery)
                      </h4>
                      <p className="text-[11px] text-on-surface-variant">
                        Auto-compressed client-side to 800px JPEG for fast Amethi offline storage.
                      </p>
                    </div>
                    {manualPhoto && (
                      <span className="text-xs text-primary font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                        <span>Attached</span>
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {/* Native Environment Camera Trigger */}
                    <label className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-xs font-bold border border-outline-variant cursor-pointer flex items-center gap-1.5 transition-all active:scale-95">
                      <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                      <span>Capture Camera</span>
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) handlePhotoCapture(f);
                        }}
                      />
                    </label>

                    {/* Standard Gallery Picker */}
                    <label className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-xs font-bold border border-outline-variant cursor-pointer flex items-center gap-1.5 transition-all active:scale-95">
                      <span className="material-symbols-outlined text-[18px]">photo_library</span>
                      <span>Pick from Gallery</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) handlePhotoCapture(f);
                        }}
                      />
                    </label>

                    {manualPhoto && (
                      <img
                        src={manualPhoto}
                        alt="Preview"
                        className="w-10 h-10 rounded-lg object-cover border border-primary shadow-xs"
                      />
                    )}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-on-surface">Initial Fee Status:</span>
                    <button
                      type="button"
                      onClick={() => setManualFeeStatus(manualFeeStatus === 'Paid' ? 'Pending' : 'Paid')}
                      className={`px-3 py-1 rounded-full font-label-sm text-xs font-bold ${
                        manualFeeStatus === 'Paid'
                          ? 'bg-secondary text-on-secondary'
                          : 'bg-error text-on-error'
                      }`}
                    >
                      {manualFeeStatus}
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-label-md text-sm font-bold shadow-md hover:bg-primary-container active:scale-95 transition-all flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[18px]">save</span>
                    <span>Generate ID & Save Student</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* SUBMODE 2: SMART EXCEL (.XLSX / .CSV) UPLOADER */}
          {regMode === 'bulk' && (
            <div className="bg-surface-container-lowest rounded-2xl p-6 border border-surface-container-high shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-headline-sm text-lg font-bold text-primary flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary">dataset</span>
                    <span>Smart Excel & CSV Bulk Uploader</span>
                  </h3>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                    Fuzzy header matcher parses school registers and auto-generates deterministic IDs for each student.
                  </p>
                </div>

                {/* Sample Download Button */}
                <button
                  onClick={downloadSampleExcelTemplate}
                  className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-xs font-bold border border-outline-variant flex items-center gap-1.5 transition-all shadow-xs"
                >
                  <span className="material-symbols-outlined text-[18px] text-secondary">download</span>
                  <span>Download Sample Template (.xlsx)</span>
                </button>
              </div>

              {/* Upload Dropzone */}
              <div
                onClick={() => excelInputRef.current?.click()}
                className="border-2 border-dashed border-primary/30 hover:border-primary rounded-2xl p-8 text-center cursor-pointer bg-surface-container-low/40 hover:bg-surface-container-low transition-all space-y-2"
              >
                <input
                  ref={excelInputRef}
                  type="file"
                  accept=".xlsx, .xls, .csv"
                  onChange={handleExcelUpload}
                  className="hidden"
                />
                <div className="w-14 h-14 rounded-full bg-primary-fixed text-primary mx-auto flex items-center justify-center">
                  <span className="material-symbols-outlined text-[32px]">upload_file</span>
                </div>
                <h4 className="font-title-md text-sm font-bold text-primary">
                  {isProcessingExcel ? 'Parsing Spreadsheet...' : 'Select or Drop School Excel / CSV File'}
                </h4>
                <p className="font-body-sm text-xs text-on-surface-variant max-w-sm mx-auto">
                  Automatically accommodates column variations (Name, Date of Birth, Class, Mobile, Fees).
                </p>
              </div>

              {/* Parsed Preview Table */}
              {parsedExcelRows.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-title-md text-sm font-bold text-primary">
                        Parsed Students Preview ({parsedExcelRows.length})
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-xs font-bold">
                        Ready to Ingest
                      </span>
                    </div>

                    <button
                      onClick={handleConfirmSaveExcel}
                      className="px-5 py-2 rounded-xl bg-secondary text-on-secondary font-label-md text-xs font-bold shadow-md hover:bg-secondary-container transition-all flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[16px]">save</span>
                      <span>Confirm & Save All to Database</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-surface-container-high">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-surface-container-low text-on-surface-variant font-semibold">
                          <th className="p-3">Generated ID</th>
                          <th className="p-3">Student Name</th>
                          <th className="p-3">DOB</th>
                          <th className="p-3">Class</th>
                          <th className="p-3">Stream</th>
                          <th className="p-3">Father Name</th>
                          <th className="p-3">Mobile</th>
                          <th className="p-3">Fees</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-surface-container-high">
                        {parsedExcelRows.map((row, idx) => (
                          <tr key={idx} className="hover:bg-surface-container-low/40">
                            <td className="p-3 font-data-mono font-bold text-primary">{row.generatedId}</td>
                            <td className="p-3 font-semibold text-on-surface">{row.fullName}</td>
                            <td className="p-3 font-data-mono">{row.dob}</td>
                            <td className="p-3">{row.grade}</td>
                            <td className="p-3">{row.stream}</td>
                            <td className="p-3">{row.fatherName}</td>
                            <td className="p-3 font-data-mono">{row.guardianMobile}</td>
                            <td className="p-3">
                              <span
                                className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                                  row.feeStatus === 'Paid'
                                    ? 'bg-secondary-fixed text-on-secondary-fixed'
                                    : 'bg-error-container text-on-error-container'
                                }`}
                              >
                                {row.feeStatus}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SUBMODE 3: AI SCAN STUDENT LIST FROM PHOTO (REGISTER OCR) */}
          {regMode === 'ocr' && (
            <div className="bg-surface-container-lowest rounded-2xl p-6 border border-surface-container-high shadow-xs space-y-6">
              <div>
                <h3 className="font-headline-sm text-lg font-bold text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">document_scanner</span>
                  <span>AI Scan Student List from Register Photo</span>
                </h3>
                <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                  Point your mobile camera at a handwritten or printed attendance register to digitize student records.
                </p>
              </div>

              {/* Optional Gemini API Key input */}
              <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-primary flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">key</span>
                    <span>Gemini API Key Hook (Optional - Smart Local Fallback Active)</span>
                  </label>
                  <span className="text-[11px] text-on-surface-variant">Runs offline without key</span>
                </div>
                <input
                  type="password"
                  value={ocrApiKey}
                  onChange={(e) => setOcrApiKey(e.target.value)}
                  placeholder="Paste AI Studio Key (or leave blank to use high-precision local parser)"
                  className="w-full px-3 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant text-xs font-data-mono"
                />
              </div>

              {/* Triggers */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="px-5 py-3 rounded-xl bg-primary text-on-primary font-label-md text-xs font-bold shadow-md hover:bg-primary-container active:scale-95 transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[20px]">photo_camera</span>
                  <span>Snap Photo with Camera</span>
                </button>
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleOcrImageUpload(f);
                  }}
                />

                <button
                  type="button"
                  onClick={() => galleryInputRef.current?.click()}
                  className="px-5 py-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-xs font-bold border border-outline-variant active:scale-95 transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[20px]">upload</span>
                  <span>Upload Register Image</span>
                </button>
                <input
                  ref={galleryInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleOcrImageUpload(f);
                  }}
                />

                {isScanningOcr && (
                  <span className="text-xs text-secondary font-bold flex items-center gap-1 animate-pulse">
                    <span className="material-symbols-outlined text-[16px]">sync</span>
                    <span>AI Vision parsing ledger columns...</span>
                  </span>
                )}
              </div>

              {/* Scanned Image Preview */}
              {ocrImage && (
                <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/30 flex items-center gap-3">
                  <img
                    src={ocrImage}
                    alt="Register Scan"
                    className="w-16 h-16 rounded-lg object-cover border"
                  />
                  <div>
                    <span className="text-xs font-bold text-on-surface">Captured Register Photo</span>
                    <p className="text-[11px] text-on-surface-variant">Compressed & prepared for Vision analysis</p>
                  </div>
                </div>
              )}

              {/* OCR Parsed Rows Table */}
              {ocrParsedRows.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-title-md text-sm font-bold text-primary">
                      OCR Extracted Records ({ocrParsedRows.length})
                    </h4>
                    <button
                      onClick={handleConfirmSaveOcr}
                      className="px-5 py-2 rounded-xl bg-secondary text-on-secondary font-label-md text-xs font-bold shadow-md hover:bg-secondary-container transition-all flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[16px]">save</span>
                      <span>Ingest Extracted Students</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-surface-container-high">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-surface-container-low text-on-surface-variant font-semibold">
                          <th className="p-3">Generated ID</th>
                          <th className="p-3">Name</th>
                          <th className="p-3">DOB</th>
                          <th className="p-3">Grade</th>
                          <th className="p-3">Stream</th>
                          <th className="p-3">Father</th>
                          <th className="p-3">Mobile</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-surface-container-high">
                        {ocrParsedRows.map((r, i) => (
                          <tr key={i} className="hover:bg-surface-container-low/40">
                            <td className="p-3 font-data-mono font-bold text-primary">{r.generatedId}</td>
                            <td className="p-3 font-semibold text-on-surface">{r.fullName}</td>
                            <td className="p-3 font-data-mono">{r.dob}</td>
                            <td className="p-3">{r.grade}</td>
                            <td className="p-3">{r.stream}</td>
                            <td className="p-3">{r.fatherName}</td>
                            <td className="p-3 font-data-mono">{r.guardianMobile}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB C: STUDENTS DIRECTORY & CRUD */}
      {/* ======================================================== */}
      {activeTab === 'students' && (
        <div className="bg-surface-container-lowest rounded-2xl p-6 border border-surface-container-high shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-headline-sm text-lg font-bold text-primary">
                Student Enrollment Directory ({filteredStudents.length})
              </h3>
              <p className="font-body-sm text-xs text-on-surface-variant">
                Search, inspect credentials, or remove student profiles
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Name or ID..."
                className="px-3.5 py-2 rounded-xl bg-surface-container-low border border-outline-variant text-xs w-48 focus:outline-none focus:ring-2 focus:ring-primary"
              />

              <select
                value={filterGrade}
                onChange={(e) => setFilterGrade(e.target.value)}
                className="px-3 py-2 rounded-xl bg-surface-container-low border border-outline-variant text-xs focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="All">All Classes</option>
                <option value="Class 9th">Class 9th</option>
                <option value="Class 10th">Class 10th</option>
                <option value="Class 11th">Class 11th</option>
                <option value="Class 12th">Class 12th</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-surface-container-high">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-surface-container-low text-on-surface-variant font-semibold">
                  <th className="p-3">Student</th>
                  <th className="p-3">Login ID</th>
                  <th className="p-3">Class & Stream</th>
                  <th className="p-3">Roll & Scholar</th>
                  <th className="p-3">Guardian</th>
                  <th className="p-3">Fee Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high">
                {filteredStudents.map((st) => (
                  <tr key={st.id} className="hover:bg-surface-container-low/40">
                    <td className="p-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={st.photoUrl}
                          alt={st.fullName}
                          className="w-8 h-8 rounded-full object-cover border"
                        />
                        <span className="font-semibold text-on-surface">{st.fullName}</span>
                      </div>
                    </td>
                    <td className="p-3 font-data-mono font-bold text-primary">{st.id}</td>
                    <td className="p-3">
                      {st.grade} • {st.stream} (Sec {st.section})
                    </td>
                    <td className="p-3 font-data-mono">
                      Roll #{st.rollNo} • {st.scholarNo}
                    </td>
                    <td className="p-3">
                      <div>{st.fatherName}</div>
                      <div className="font-data-mono text-[11px] text-on-surface-variant">{st.guardianMobile}</div>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleToggleFee(st)}
                        className={`px-2.5 py-0.5 rounded font-bold text-[10px] uppercase transition-all ${
                          st.feeStatus === 'Paid'
                            ? 'bg-secondary-fixed text-on-secondary-fixed hover:opacity-80'
                            : 'bg-error text-on-error hover:opacity-80'
                        }`}
                      >
                        {st.feeStatus}
                      </button>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete ${st.fullName} (${st.id})?`)) {
                            SchoolStore.deleteStudent(st.id);
                            reloadAll();
                            onSuccessToast(`Deleted student ${st.fullName}`);
                          }
                        }}
                        title="Delete Student Record"
                        className="p-1 rounded-lg text-error hover:bg-error-container/40 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB D: ATTENDANCE & FEE MARKER */}
      {/* ======================================================== */}
      {activeTab === 'attendance_fees' && (
        <div className="bg-surface-container-lowest rounded-2xl p-6 border border-surface-container-high shadow-xs space-y-4">
          <div>
            <h3 className="font-headline-sm text-lg font-bold text-primary">
              Daily Attendance & Fee Marker
            </h3>
            <p className="font-body-sm text-xs text-on-surface-variant">
              Changes reflect instantaneously on the student's personal dashboard and fee receipts ledger.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-surface-container-high">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-surface-container-low text-on-surface-variant font-semibold">
                  <th className="p-3">Student</th>
                  <th className="p-3">Class</th>
                  <th className="p-3">Attendance Stats</th>
                  <th className="p-3">Mark Today</th>
                  <th className="p-3">Fee Dues</th>
                  <th className="p-3 text-right">Fee Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high">
                {students.map((st) => (
                  <tr key={st.id} className="hover:bg-surface-container-low/40">
                    <td className="p-3 font-semibold text-on-surface">
                      {st.fullName} <span className="font-data-mono text-primary font-bold">({st.id})</span>
                    </td>
                    <td className="p-3">{st.grade} - {st.stream}</td>
                    <td className="p-3 font-data-mono">
                      <strong className="text-secondary">{st.attendanceRate}%</strong> ({st.attendedDays}/{st.totalDays} Days)
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleMarkAttendance(st, true)}
                          className="px-2.5 py-1 rounded-lg bg-primary-fixed text-primary hover:bg-primary hover:text-on-primary font-bold text-[11px] transition-colors"
                        >
                          Present
                        </button>
                        <button
                          onClick={() => handleMarkAttendance(st, false)}
                          className="px-2.5 py-1 rounded-lg bg-surface-container text-error hover:bg-error hover:text-on-error font-bold text-[11px] transition-colors"
                        >
                          Absent
                        </button>
                      </div>
                    </td>
                    <td className="p-3 font-data-mono">
                      {st.feeStatus === 'Paid' ? (
                        <span className="text-secondary font-bold">₹0 (Paid)</span>
                      ) : (
                        <span className="text-error font-bold">₹{st.pendingFeeAmount} (Pending)</span>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleToggleFee(st)}
                        className={`px-3 py-1 rounded-lg font-bold text-[11px] transition-colors ${
                          st.feeStatus === 'Paid'
                            ? 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                            : 'bg-secondary text-on-secondary hover:bg-secondary-container'
                        }`}
                      >
                        {st.feeStatus === 'Paid' ? 'Mark Due' : 'Mark Cleared'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB E: PUBLIC PORTAL CMS (NOTICES, TOPPERS, GALLERY) */}
      {/* ======================================================== */}
      {activeTab === 'portal_cms' && (
        <div className="space-y-6">
          {/* 1. Public Notices Manager */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 border border-surface-container-high shadow-xs space-y-4">
            <h3 className="font-title-md text-base font-bold text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">campaign</span>
              <span>Post New Public Notice</span>
            </h3>

            <form onSubmit={handleAddNotice} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-on-surface mb-1">Notice Title *</label>
                  <input
                    type="text"
                    required
                    value={noticeTitle}
                    onChange={(e) => setNoticeTitle(e.target.value)}
                    placeholder="e.g. Annual Sports Meet 2026 Scheduled"
                    className="w-full px-3 py-2 rounded-xl bg-surface-container-low border border-outline-variant text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">Category</label>
                  <select
                    value={noticeCategory}
                    onChange={(e) => setNoticeCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-surface-container-low border border-outline-variant text-xs"
                  >
                    <option value="General">General</option>
                    <option value="Examination">Examination</option>
                    <option value="Admissions">Admissions</option>
                    <option value="Holiday">Holiday</option>
                    <option value="Circular">Circular</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Description</label>
                <textarea
                  rows={2}
                  value={noticeDesc}
                  onChange={(e) => setNoticeDesc(e.target.value)}
                  placeholder="Notice details for public board..."
                  className="w-full p-2.5 rounded-xl bg-surface-container-low border border-outline-variant text-xs"
                ></textarea>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <input
                  type="text"
                  value={noticeAttachName}
                  onChange={(e) => setNoticeAttachName(e.target.value)}
                  placeholder="Attachment filename (optional, e.g. Circular_Schedule.pdf)"
                  className="px-3 py-2 rounded-xl bg-surface-container-low border border-outline-variant text-xs sm:w-80"
                />

                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary text-on-primary font-label-md text-xs font-bold shadow-sm"
                >
                  Publish Notice
                </button>
              </div>
            </form>

            {/* Existing Notices List */}
            <div className="pt-3 border-t border-surface-container-high space-y-2">
              <span className="font-label-sm text-xs font-bold text-on-surface">Existing Published Notices:</span>
              <div className="space-y-2">
                {notices.map((n) => (
                  <div
                    key={n.id}
                    className="p-3 rounded-xl bg-surface-container-low flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <strong className="text-primary">[{n.category}]</strong> {n.title}
                      <span className="text-on-surface-variant font-data-mono ml-2">({n.date})</span>
                    </div>
                    <button
                      onClick={() => {
                        SchoolStore.deleteNotice(n.id);
                        reloadAll();
                        onSuccessToast('Notice deleted.');
                      }}
                      className="text-error hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Academic Toppers Manager */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 border border-surface-container-high shadow-xs space-y-4">
            <h3 className="font-title-md text-base font-bold text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">military_tech</span>
              <span>Add Academic Topper to Wall of Fame</span>
            </h3>

            <form onSubmit={handleAddTopper} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Student Name</label>
                <input
                  type="text"
                  required
                  value={topperName}
                  onChange={(e) => setTopperName(e.target.value)}
                  placeholder="e.g. Sneha Pandey"
                  className="w-full px-3 py-2 rounded-xl bg-surface-container-low border border-outline-variant text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Percentage (%)</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={topperPct}
                  onChange={(e) => setTopperPct(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-surface-container-low border border-outline-variant text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Category</label>
                <select
                  value={topperCat}
                  onChange={(e) => setTopperCat(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-surface-container-low border border-outline-variant text-xs"
                >
                  <option value="10th">10th CBSE Board</option>
                  <option value="12th Science">12th Science</option>
                  <option value="12th Arts">12th Arts</option>
                  <option value="Home Exams">Home Exams</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Achievement</label>
                <input
                  type="text"
                  value={topperAchieve}
                  onChange={(e) => setTopperAchieve(e.target.value)}
                  placeholder="e.g. 100/100 in Maths"
                  className="w-full px-3 py-2 rounded-xl bg-surface-container-low border border-outline-variant text-xs"
                />
              </div>

              <div className="sm:col-span-4 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-secondary text-on-secondary font-label-md text-xs font-bold shadow-sm"
                >
                  Add Topper
                </button>
              </div>
            </form>
          </div>

          {/* 3. Campus Gallery Photos Manager */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 border border-surface-container-high shadow-xs space-y-4">
            <h3 className="font-title-md text-base font-bold text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">photo_library</span>
              <span>Add Campus Photo</span>
            </h3>

            <form onSubmit={handleAddGallery} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Photo Title</label>
                <input
                  type="text"
                  required
                  value={galleryTitle}
                  onChange={(e) => setGalleryTitle(e.target.value)}
                  placeholder="e.g. New Chemistry Lab Equipment"
                  className="w-full px-3 py-2 rounded-xl bg-surface-container-low border border-outline-variant text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Category</label>
                <select
                  value={galleryCategory}
                  onChange={(e) => setGalleryCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-surface-container-low border border-outline-variant text-xs"
                >
                  <option value="Campus">Campus</option>
                  <option value="Labs">Labs</option>
                  <option value="Classrooms">Classrooms</option>
                  <option value="Sports">Sports</option>
                  <option value="Events">Events</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Image URL (or uncompressed Unsplash)</label>
                <input
                  type="url"
                  value={galleryImgUrl}
                  onChange={(e) => setGalleryImgUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl bg-surface-container-low border border-outline-variant text-xs"
                />
              </div>

              <div className="sm:col-span-3 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary text-on-primary font-label-md text-xs font-bold shadow-sm"
                >
                  Add Gallery Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB F: PLAY STORE USER DATA DELETION TICKETS */}
      {/* ======================================================== */}
      {activeTab === 'deletion_requests' && (
        <div className="bg-surface-container-lowest rounded-2xl p-6 border border-surface-container-high shadow-xs space-y-4">
          <div>
            <h3 className="font-headline-sm text-lg font-bold text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-error">security</span>
              <span>Google Play Mandatory Account & Data Deletion Requests</span>
            </h3>
            <p className="font-body-sm text-xs text-on-surface-variant">
              In full accordance with Google Play Store User Data policy, verify and act on data deletion tickets submitted by students/parents.
            </p>
          </div>

          <div className="space-y-3">
            {deletionRequests.length === 0 ? (
              <p className="text-xs text-on-surface-variant italic">No pending deletion tickets.</p>
            ) : (
              deletionRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-title-md text-sm font-bold text-on-surface">{req.studentName}</span>
                      <span className="font-data-mono text-xs font-bold text-primary">({req.studentId})</span>
                      <span
                        className={`px-2 py-0.5 rounded font-bold text-[10px] uppercase ${
                          req.status === 'PENDING'
                            ? 'bg-error-container text-on-error-container'
                            : 'bg-surface-container text-on-surface-variant'
                        }`}
                      >
                        {req.status}
                      </span>
                    </div>
                    <p className="font-body-sm text-xs text-on-surface-variant">
                      <strong>Reason:</strong> {req.reason}
                    </p>
                    <span className="text-[10px] text-on-surface-variant font-data-mono">
                      Logged: {req.requestedAt}
                    </span>
                  </div>

                  {req.status === 'PENDING' && (
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          if (confirm(`Approve deletion of ${req.studentName}'s account and delete from database?`)) {
                            SchoolStore.updateDeletionStatus(req.id, 'RESOLVED');
                            reloadAll();
                            onSuccessToast(`Account ${req.studentId} permanently deleted.`);
                          }
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-error text-on-error font-label-sm text-xs font-bold shadow-xs hover:opacity-90 transition-all flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[16px]">check</span>
                        <span>Approve & Erase Data</span>
                      </button>

                      <button
                        onClick={() => {
                          SchoolStore.updateDeletionStatus(req.id, 'REJECTED');
                          reloadAll();
                          onSuccessToast(`Ticket marked as rejected.`);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-xs transition-all"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
