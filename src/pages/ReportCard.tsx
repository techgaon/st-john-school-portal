import React, { useState } from 'react';
import { SchoolStore } from '../store/schoolStore';
import { Student } from '../types';

interface ReportCardProps {
  studentId: string;
  onNavigate: (view: string) => void;
  onSuccessToast: (msg: string) => void;
}

export const ReportCard: React.FC<ReportCardProps> = ({
  studentId,
  onNavigate,
  onSuccessToast
}) => {
  const student: Student | undefined = SchoolStore.getStudentById(studentId);
  const [selectedTerm, setSelectedTerm] = useState('Term 2 (Pre-Board / Final)');

  if (!student) {
    return (
      <div className="min-h-screen pt-24 px-4 text-center">
        <p className="text-sm text-on-surface-variant">Please log in to view report card ledger.</p>
        <button
          onClick={() => onNavigate('login')}
          className="mt-4 px-4 py-2 rounded-xl bg-primary text-on-primary font-bold text-sm"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const marksheet = student.marksheet || {
    term: selectedTerm,
    session: '2024-2025',
    overallPercentage: 92.4,
    result: 'PASS',
    rank: '1st Division with Distinction',
    subjects: [
      { subject: 'Physics (Theory + Practical)', theory: 65, practical: 29, maxTheory: 70, maxPractical: 30, grade: 'A1' },
      { subject: 'Chemistry (Theory + Practical)', theory: 63, practical: 28, maxTheory: 70, maxPractical: 30, grade: 'A1' },
      { subject: 'Mathematics', theory: 94, practical: 0, maxTheory: 100, maxPractical: 0, grade: 'A1' },
      { subject: 'Computer Science (Python Lab)', theory: 68, practical: 29, maxTheory: 70, maxPractical: 30, grade: 'A1' },
      { subject: 'English Core', theory: 91, practical: 0, maxTheory: 100, maxPractical: 0, grade: 'A1' }
    ],
    teacherRemarks: 'Exemplary academic discipline and outstanding analytical performance.'
  };

  const handlePrint = () => {
    window.print();
    onSuccessToast('Preparing official CBSE Marksheet Ledger for print/PDF save.');
  };

  return (
    <div className="min-h-screen pt-20 pb-20 px-4 sm:px-6 max-w-4xl mx-auto space-y-6">
      {/* Sub-Navigation & Institutional Credentials */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <button
          onClick={() => onNavigate('student-dashboard')}
          className="inline-flex items-center gap-1.5 text-primary hover:text-primary-container font-label-md text-sm font-semibold"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Back to Student Portal</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-surface-container-high px-3 py-1 rounded-full text-on-surface-variant font-label-sm text-xs">
            <span className="material-symbols-outlined text-secondary text-[14px]">verified</span>
            <span>CBSE #2133890 • Code: 71204</span>
          </div>

          <button
            onClick={handlePrint}
            className="px-3.5 py-1.5 rounded-xl bg-primary text-on-primary font-label-md text-xs font-bold shadow-sm hover:bg-primary-container flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">print</span>
            <span>Print Ledger</span>
          </button>
        </div>
      </div>

      {/* Academic Session Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {['Term 2 (Pre-Board / Final)', 'Term 1 (Half Yearly)', 'Class 10th (CBSE Archived)'].map((term) => (
          <button
            key={term}
            onClick={() => setSelectedTerm(term)}
            className={`px-3.5 py-1.5 rounded-full font-label-md text-xs whitespace-nowrap transition-all ${
              selectedTerm === term
                ? 'bg-primary text-on-primary font-bold shadow-sm'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            {term}
          </button>
        ))}
      </div>

      {/* Hero Summary Card */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container-high p-6 relative overflow-hidden">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-primary-container text-on-primary flex items-center justify-center font-headline-md text-xl font-bold shadow-sm shrink-0">
            {student.fullName.slice(0, 2).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-headline-md text-lg sm:text-xl font-bold text-on-surface truncate">
                {student.fullName}
              </h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-xs font-bold">
                <span className="material-symbols-outlined text-[12px]">star</span>
                <span>Merit Standing</span>
              </span>
            </div>
            <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
              {student.grade} • Sec {student.section} • {student.stream} Stream • English Medium
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-on-surface-variant font-data-mono text-xs">
              <span className="bg-surface-container px-2 py-0.5 rounded">Roll: #{student.rollNo}</span>
              <span className="bg-surface-container px-2 py-0.5 rounded">Scholar: {student.scholarNo}</span>
              <span className="bg-surface-container px-2 py-0.5 rounded">ID: {student.id}</span>
            </div>
          </div>
        </div>

        {/* Bento Strip */}
        <div className="grid grid-cols-3 gap-3 mt-6 pt-4 border-t border-surface-container-high text-center">
          <div className="bg-surface-container-low rounded-xl p-3">
            <span className="font-label-sm text-[11px] text-on-surface-variant uppercase font-semibold">Aggregate</span>
            <div className="font-headline-md text-xl sm:text-2xl font-bold text-primary mt-0.5">
              {marksheet.overallPercentage}%
            </div>
          </div>
          <div className="bg-surface-container-low rounded-xl p-3">
            <span className="font-label-sm text-[11px] text-on-surface-variant uppercase font-semibold">Division</span>
            <div className="font-headline-md text-xs sm:text-sm font-bold text-secondary mt-1 line-clamp-1">
              {marksheet.rank}
            </div>
          </div>
          <div className="bg-surface-container-low rounded-xl p-3">
            <span className="font-label-sm text-[11px] text-on-surface-variant uppercase font-semibold">Result</span>
            <div className="font-headline-md text-xl font-bold text-primary mt-0.5">
              {marksheet.result}
            </div>
          </div>
        </div>
      </div>

      {/* Marksheet Subjects Table */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container-high overflow-hidden">
        <div className="px-6 py-4 bg-surface-container border-b border-surface-container-high flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">table_chart</span>
            <h3 className="font-title-md text-sm font-bold text-primary uppercase tracking-wider">
              Subject Score Ledger • {selectedTerm}
            </h3>
          </div>
          <span className="font-data-mono text-xs text-on-surface-variant">CBSE 2024-25</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm font-body-md">
            <thead>
              <tr className="bg-surface-container-low/60 text-on-surface-variant border-b border-surface-container-high">
                <th className="py-3 px-4 font-semibold">Subject</th>
                <th className="py-3 px-3 font-semibold text-center">Theory</th>
                <th className="py-3 px-3 font-semibold text-center">Practical</th>
                <th className="py-3 px-3 font-semibold text-center">Total</th>
                <th className="py-3 px-3 font-semibold text-center">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high">
              {marksheet.subjects.map((sub, idx) => {
                const totalObtained = sub.theory + sub.practical;
                const totalMax = sub.maxTheory + sub.maxPractical;
                return (
                  <tr key={idx} className="hover:bg-surface-container-low/30 transition-colors">
                    <td className="py-3 px-4 font-medium text-on-surface">{sub.subject}</td>
                    <td className="py-3 px-3 text-center font-data-mono">
                      {sub.theory} / {sub.maxTheory}
                    </td>
                    <td className="py-3 px-3 text-center font-data-mono">
                      {sub.maxPractical > 0 ? `${sub.practical} / ${sub.maxPractical}` : '—'}
                    </td>
                    <td className="py-3 px-3 text-center font-data-mono font-bold text-primary">
                      {totalObtained} / {totalMax}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="px-2 py-0.5 rounded bg-primary-fixed text-primary font-bold font-data-mono text-xs">
                        {sub.grade}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Teacher Remarks */}
        <div className="p-4 bg-surface-container-low border-t border-surface-container-high text-xs text-on-surface-variant">
          <strong className="text-on-surface">Class Teacher Remarks:</strong> {marksheet.teacherRemarks}
        </div>
      </div>
    </div>
  );
};
