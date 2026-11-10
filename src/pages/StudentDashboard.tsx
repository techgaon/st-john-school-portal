import React, { useState } from 'react';
import { SchoolStore } from '../store/schoolStore';
import { Student } from '../types';

interface StudentDashboardProps {
  studentId: string;
  onNavigate: (view: string) => void;
  onOpenPrivacy: () => void;
  onSuccessToast: (msg: string) => void;
  onErrorToast: (msg: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  studentId,
  onNavigate,
  onOpenPrivacy,
  onSuccessToast,
  onErrorToast
}) => {
  const [student, setStudent] = useState<Student | undefined>(
    SchoolStore.getStudentById(studentId)
  );

  const [isCopied, setIsCopied] = useState(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  // Deletion Request Modal State (Play Store Policy)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletionReason, setDeletionReason] = useState('');
  const [isSubmittingDeletion, setIsSubmittingDeletion] = useState(false);

  if (!student) {
    return (
      <div className="min-h-screen pt-24 px-4 flex flex-col items-center justify-center text-center">
        <h2 className="text-xl font-bold text-primary">Student Record Not Found</h2>
        <p className="text-sm text-on-surface-variant mt-1">Please log in again with a valid Student ID.</p>
        <button
          onClick={() => onNavigate('login')}
          className="mt-4 px-4 py-2 rounded-xl bg-primary text-on-primary font-bold text-sm"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const handleCopyId = () => {
    navigator.clipboard.writeText(student.id);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    onSuccessToast(`Student ID "${student.id}" copied to clipboard!`);
  };

  const handleSavePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length < 4) {
      onErrorToast('PIN must be at least 4 digits');
      return;
    }
    if (newPin !== confirmPin) {
      onErrorToast('PINs do not match');
      return;
    }

    SchoolStore.updateStudentPin(student.id, newPin);
    setStudent(SchoolStore.getStudentById(student.id));
    setIsPinModalOpen(false);
    setNewPin('');
    setConfirmPin('');
    onSuccessToast('Access PIN updated successfully!');
  };

  const handleSubmitDeletion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deletionReason.trim()) {
      onErrorToast('Please specify a reason for deletion');
      return;
    }

    setIsSubmittingDeletion(true);
    SchoolStore.submitDeletionRequest({
      studentId: student.id,
      studentName: student.fullName,
      reason: deletionReason
    });

    setIsSubmittingDeletion(false);
    setIsDeleteModalOpen(false);
    setDeletionReason('');
    onSuccessToast('Account & Data Deletion request submitted to School Principal. Reference ticket logged.');
  };

  return (
    <div className="min-h-screen pt-20 pb-20 px-4 sm:px-6 max-w-5xl mx-auto space-y-6">
      {/* Top Academic Notification Pill */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-surface-container-high text-on-surface border border-outline-variant/30">
        <div className="flex items-center gap-2 min-w-0">
          <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">campaign</span>
          <span className="font-label-md text-xs sm:text-sm text-on-surface truncate">
            Pre-Board practical exams schedule announced! Verify marksheet ledger.
          </span>
        </div>
        <button
          onClick={() => onNavigate('report-card')}
          className="font-label-sm text-xs text-secondary font-bold shrink-0 hover:underline ml-2"
        >
          View Ledger
        </button>
      </div>

      {/* 1. Student Profile Header Card */}
      <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-6 shadow-sm border border-surface-container-high">
        <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
          {/* Avatar with Verified Badge */}
          <div className="relative shrink-0">
            <img
              src={student.photoUrl}
              alt={student.fullName}
              className="w-20 h-20 rounded-2xl object-cover shadow-sm border-2 border-primary/20"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[14px]">verified</span>
            </div>
          </div>

          {/* Identity Details */}
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-headline-lg text-xl sm:text-2xl font-bold text-primary truncate">
                {student.fullName}
              </h1>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-xs font-semibold">
                Roll #{student.rollNo}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-xs font-bold">
                Sec {student.section}
              </span>
            </div>

            <p className="font-body-md text-xs sm:text-sm text-on-surface-variant">
              {student.grade} • {student.stream} Stream • English Medium
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 font-data-mono text-xs text-on-surface-variant">
              <span>Scholar No: <strong className="text-on-surface">{student.scholarNo}</strong></span>
              <span>•</span>
              <span>Father: <strong className="text-on-surface">{student.fatherName}</strong></span>
              <span>•</span>
              <span>Mobile: <strong className="text-on-surface">{student.guardianMobile}</strong></span>
            </div>

            {/* Copyable Login ID & PIN Action */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <button
                onClick={handleCopyId}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-xs font-bold transition-all active:scale-95 border border-outline-variant/30"
              >
                <span className="material-symbols-outlined text-[16px] text-primary">badge</span>
                <span>ID: <strong className="font-data-mono text-primary">{student.id}</strong></span>
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                  {isCopied ? 'check' : 'content_copy'}
                </span>
              </button>

              <button
                onClick={() => setIsPinModalOpen(true)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-xs transition-all border border-outline-variant/30"
              >
                <span className="material-symbols-outlined text-[16px] text-secondary">key</span>
                <span>Set Custom PIN</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Quick Metrics Bento Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Attendance Ring */}
        <div className="flex items-center gap-4 p-5 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs">
          <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
            <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-surface-container"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
              />
              <path
                className="text-secondary"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray={`${student.attendanceRate}, 100`}
                strokeLinecap="round"
                strokeWidth="3.5"
              />
            </svg>
            <span className="absolute font-data-mono text-xs font-bold text-on-surface">
              {Math.round(student.attendanceRate)}%
            </span>
          </div>
          <div>
            <div className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider font-bold">
              Attendance
            </div>
            <div className="font-title-md text-sm font-bold text-on-surface">
              {student.attendanceRate}% Overall
            </div>
            <div className="font-label-sm text-xs text-secondary font-medium">
              {student.attendedDays}/{student.totalDays} Days Present
            </div>
          </div>
        </div>

        {/* Academic Rank */}
        <div className="flex items-center gap-4 p-5 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px]">military_tech</span>
          </div>
          <div>
            <div className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider font-bold">
              Class Standing
            </div>
            <div className="font-title-md text-sm font-bold text-on-surface">
              {student.classRank}
            </div>
            <div className="font-label-sm text-xs text-on-surface-variant">
              Aggregate: {student.marksheet?.overallPercentage || 90}%
            </div>
          </div>
        </div>

        {/* Pending Assignments */}
        <div className="flex items-center gap-4 p-5 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px]">assignment</span>
          </div>
          <div>
            <div className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider font-bold">
              Academic Ledger
            </div>
            <div className="font-title-md text-sm font-bold text-on-surface">
              Term 2 Marksheet
            </div>
            <button
              onClick={() => onNavigate('report-card')}
              className="font-label-sm text-xs text-primary font-bold hover:underline"
            >
              Inspect Marks & Grades →
            </button>
          </div>
        </div>
      </div>

      {/* 3. Fee Status Banner & Action */}
      <div className="rounded-2xl bg-surface-container-lowest border border-surface-container-high p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
              student.feeStatus === 'Paid'
                ? 'bg-secondary-fixed text-on-secondary-fixed'
                : 'bg-error-container text-on-error-container'
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">
              {student.feeStatus === 'Paid' ? 'check_circle' : 'account_balance_wallet'}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-title-md text-base font-bold text-on-surface">
                Tuition & Term Fees
              </h3>
              <span
                className={`px-2 py-0.5 rounded-full font-label-sm text-xs font-bold uppercase ${
                  student.feeStatus === 'Paid'
                    ? 'bg-secondary text-on-secondary'
                    : 'bg-error text-on-error'
                }`}
              >
                {student.feeStatus}
              </span>
            </div>
            <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
              {student.feeStatus === 'Paid'
                ? 'All quarterly dues cleared for the current academic session.'
                : `Pending Dues: ₹${student.pendingFeeAmount.toLocaleString()} • Q4 Term Fees`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {student.feeStatus !== 'Paid' && (
            <button
              onClick={() => onNavigate('fee-payment')}
              className="px-5 py-2.5 rounded-xl bg-secondary text-on-secondary font-label-md text-sm font-bold shadow-md hover:bg-secondary-container active:scale-95 transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">payments</span>
              <span>Pay ₹{student.pendingFeeAmount}</span>
            </button>
          )}

          <button
            onClick={() => onNavigate('fee-history')}
            className="px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-sm transition-all"
          >
            Past Receipts
          </button>
        </div>
      </div>

      {/* 4. Action Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          onClick={() => onNavigate('report-card')}
          className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container-high hover:border-primary/50 shadow-xs cursor-pointer transition-all flex items-center gap-4 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-primary-fixed text-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[24px]">grade</span>
          </div>
          <div className="flex-1">
            <h4 className="font-title-md text-base font-bold text-primary">
              Digital Report Card Marksheet
            </h4>
            <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
              Subject scores, practical grades, CBSE code #2133890, & printable marksheet.
            </p>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-1 transition-transform">
            chevron_right
          </span>
        </div>

        <div
          onClick={() => onNavigate('public')}
          className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container-high hover:border-primary/50 shadow-xs cursor-pointer transition-all flex items-center gap-4 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-secondary-fixed text-secondary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[24px]">campaign</span>
          </div>
          <div className="flex-1">
            <h4 className="font-title-md text-base font-bold text-primary">
              Public School Circulars & Board
            </h4>
            <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
              Read sports meet notices, holiday declarations, and academic circulars.
            </p>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-1 transition-transform">
            chevron_right
          </span>
        </div>
      </div>

      {/* 5. Google Play Compliance Section */}
      <div className="p-5 rounded-2xl bg-surface-container border border-outline-variant/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 font-title-md text-sm font-bold text-primary">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            <span>Google Play User Data & Privacy Safety</span>
          </div>
          <p className="font-body-sm text-xs text-on-surface-variant mt-0.5 max-w-xl">
            You have full control over your stored academic data. In accordance with Google Play policies, you can inspect our Privacy Policy or request permanent deletion of your profile.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenPrivacy}
            className="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/40 font-label-sm text-xs font-semibold text-primary hover:bg-surface-container-high transition-colors"
          >
            Privacy Policy
          </button>

          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-error/10 hover:bg-error/20 text-error font-label-sm text-xs font-bold transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">delete_forever</span>
            <span>Request Account Deletion</span>
          </button>
        </div>
      </div>

      {/* Modal: Set Custom PIN */}
      {isPinModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-sm bg-surface-container-lowest rounded-2xl p-6 shadow-2xl border border-surface-container-high">
            <h3 className="font-headline-sm text-lg font-bold text-primary mb-1">Set Custom Access PIN</h3>
            <p className="font-body-sm text-xs text-on-surface-variant mb-4">
              Create a personalized 4-digit PIN for faster zero-OTP sign-in.
            </p>
            <form onSubmit={handleSavePin} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">New 4-Digit PIN</label>
                <input
                  type="password"
                  required
                  maxLength={6}
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  placeholder="e.g. 4821"
                  className="w-full px-3 py-2 rounded-xl bg-surface-container-low border border-outline-variant text-sm font-data-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Confirm PIN</label>
                <input
                  type="password"
                  required
                  maxLength={6}
                  value={confirmPin}
                  onChange={(e) => setConfirmPin(e.target.value)}
                  placeholder="Re-enter PIN"
                  className="w-full px-3 py-2 rounded-xl bg-surface-container-low border border-outline-variant text-sm font-data-mono"
                />
              </div>
              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPinModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-on-surface-variant hover:bg-surface-container"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold shadow-sm"
                >
                  Save PIN
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Request Account & Data Deletion (Play Store Mandatory Requirement) */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-surface-container-lowest rounded-2xl p-6 shadow-2xl border border-surface-container-high">
            <div className="flex items-center gap-2 text-error mb-2">
              <span className="material-symbols-outlined text-[24px]">warning</span>
              <h3 className="font-headline-sm text-lg font-bold">Request Account & Data Deletion</h3>
            </div>
            <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed mb-4">
              Under Google Play Store policies and institutional guidelines, submitting this request will log an official data erasure ticket with the St. John Administrative Console.
            </p>
            <form onSubmit={handleSubmitDeletion} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Student Record</label>
                <div className="p-2.5 rounded-xl bg-surface-container text-xs font-data-mono font-semibold text-primary">
                  {student.fullName} ({student.id}) • {student.grade}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Reason for Deletion *</label>
                <textarea
                  rows={3}
                  required
                  value={deletionReason}
                  onChange={(e) => setDeletionReason(e.target.value)}
                  placeholder="e.g. School transfer / graduation complete. Please archive student profile and biometrics."
                  className="w-full p-2.5 rounded-xl bg-surface-container-low border border-outline-variant text-xs focus:outline-none focus:ring-2 focus:ring-error"
                ></textarea>
              </div>
              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-on-surface-variant hover:bg-surface-container"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingDeletion}
                  className="px-4 py-2 rounded-xl bg-error text-on-error text-xs font-bold shadow-sm hover:opacity-90 active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">send</span>
                  <span>Submit Deletion Ticket</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
