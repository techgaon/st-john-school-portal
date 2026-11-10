import React, { useState } from 'react';
import { SchoolStore } from '../store/schoolStore';
import { FeeReceipt, Student } from '../types';

interface FeeHistoryProps {
  studentId: string;
  onNavigate: (view: string) => void;
  onSuccessToast: (msg: string) => void;
}

export const FeeHistory: React.FC<FeeHistoryProps> = ({
  studentId,
  onNavigate,
  onSuccessToast
}) => {
  const student: Student | undefined = SchoolStore.getStudentById(studentId);
  const [receipts] = useState<FeeReceipt[]>(SchoolStore.getReceipts(studentId));

  if (!student) {
    return (
      <div className="min-h-screen pt-24 px-4 text-center">
        <p className="text-sm text-on-surface-variant">Please log in to view fee payment history.</p>
        <button
          onClick={() => onNavigate('login')}
          className="mt-4 px-4 py-2 rounded-xl bg-primary text-on-primary font-bold text-sm"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const totalPaid = receipts.reduce((acc, curr) => acc + (curr.status === 'SUCCESS' ? curr.amount : 0), 0);

  return (
    <div className="min-h-screen pt-20 pb-20 px-4 sm:px-6 max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <button
          onClick={() => onNavigate('student-dashboard')}
          className="inline-flex items-center gap-1.5 text-primary hover:text-primary-container font-label-md text-sm font-semibold"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Back to Dashboard</span>
        </button>

        <span className="font-label-sm text-xs bg-surface-container-high px-3 py-1 rounded-full text-on-surface-variant font-semibold">
          Financial Ledger • Session 2024-2025
        </span>
      </div>

      {/* Summary Bento */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container-high p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <span className="font-label-sm text-xs text-on-surface-variant uppercase font-semibold">Total Paid to Date</span>
          <div className="font-display-lg text-2xl font-black text-primary mt-0.5">
            ₹{totalPaid.toLocaleString()}
          </div>
          <span className="text-[11px] text-on-surface-variant">Tuition, Labs & Exam fees</span>
        </div>

        <div>
          <span className="font-label-sm text-xs text-on-surface-variant uppercase font-semibold">Current Fee Status</span>
          <div className="mt-1">
            <span
              className={`px-3 py-1 rounded-full font-label-sm text-xs font-bold uppercase ${
                student.feeStatus === 'Paid'
                  ? 'bg-secondary text-on-secondary'
                  : 'bg-error text-on-error'
              }`}
            >
              {student.feeStatus}
            </span>
          </div>
          <p className="text-[11px] text-on-surface-variant mt-1">
            {student.feeStatus === 'Paid' ? 'All dues cleared' : `Pending: ₹${student.pendingFeeAmount}`}
          </p>
        </div>

        <div>
          <span className="font-label-sm text-xs text-on-surface-variant uppercase font-semibold">Receipts Issued</span>
          <div className="font-display-lg text-2xl font-black text-secondary mt-0.5">
            {receipts.length}
          </div>
          <span className="text-[11px] text-on-surface-variant">Verified by Accounts Office</span>
        </div>
      </div>

      {/* Receipts Table */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container-high overflow-hidden">
        <div className="px-6 py-4 bg-surface-container border-b border-surface-container-high flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">receipt_long</span>
            <h3 className="font-title-md text-sm font-bold text-primary uppercase tracking-wider">
              Issued Fee Receipts & Transaction Records
            </h3>
          </div>
        </div>

        {receipts.length === 0 ? (
          <div className="p-8 text-center text-on-surface-variant text-sm">
            No fee receipts found on record for this student.
          </div>
        ) : (
          <div className="divide-y divide-surface-container-high">
            {receipts.map((rcpt) => (
              <div
                key={rcpt.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-surface-container-low/40 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-title-md text-sm font-bold text-on-surface">{rcpt.term}</span>
                    <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold">
                      {rcpt.paymentMode}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-surface-container text-primary text-[10px] font-bold">
                      {rcpt.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 text-xs text-on-surface-variant font-data-mono">
                    <span>Txn: {rcpt.transactionId}</span>
                    <span>•</span>
                    <span>Date: {rcpt.paidAt}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <span className="font-headline-md text-lg font-extrabold text-primary">
                    ₹{rcpt.amount.toLocaleString()}
                  </span>
                  <button
                    onClick={() => {
                      window.print();
                      onSuccessToast(`Downloading receipt ${rcpt.transactionId}`);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-label-sm text-xs font-semibold transition-all flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">download</span>
                    <span>Receipt</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
