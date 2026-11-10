import React, { useState } from 'react';
import { SchoolStore } from '../store/schoolStore';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessToast: (msg: string) => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose, onSuccessToast }) => {
  const [studentName, setStudentName] = useState('');
  const [grade, setGrade] = useState('Class 11th (Science)');
  const [parentName, setParentName] = useState('');
  const [mobile, setMobile] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !mobile.trim()) {
      alert('Please provide student name and mobile number');
      return;
    }

    setIsSubmitting(true);
    SchoolStore.submitInquiry({
      studentName,
      grade,
      parentName: parentName || 'Parent',
      mobile,
      message: message || 'Inquiry regarding admissions 2025-26'
    });

    setIsSubmitting(false);
    onSuccessToast('Admission Inquiry submitted! The school office will contact you shortly.');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-2xl overflow-hidden border border-surface-container-high">
        {/* Header */}
        <div className="px-6 py-4 bg-primary text-on-primary flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px]">school</span>
            <div>
              <h3 className="font-headline-sm text-base sm:text-lg font-bold">Apply for Admission 2025-26</h3>
              <p className="text-xs text-primary-fixed opacity-90">St. John Public School • Shukul Bazar, Amethi</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">
              Student Full Name *
            </label>
            <input
              type="text"
              required
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="e.g. Ankit Singh"
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                Applying For Grade *
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Nursery / KG">Nursery / KG</option>
                <option value="Class 1st to 5th">Class 1st to 5th</option>
                <option value="Class 6th to 8th">Class 6th to 8th</option>
                <option value="Class 9th">Class 9th</option>
                <option value="Class 10th">Class 10th</option>
                <option value="Class 11th (Science)">Class 11th (Science)</option>
                <option value="Class 11th (Arts)">Class 11th (Arts)</option>
                <option value="Class 12th (Science)">Class 12th (Science)</option>
                <option value="Class 12th (Arts)">Class 12th (Arts)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                Parent / Guardian Contact Mobile *
              </label>
              <input
                type="tel"
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="e.g. 94520XXXXX"
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">
              Father's / Mother's Name
            </label>
            <input
              type="text"
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              placeholder="e.g. Rajesh Singh"
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">
              Message or Specific Requirements (Bus route, hostel, scholarship)
            </label>
            <textarea
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g. Interested in bus pickup from Jagdishpur / Shukul Bazar market."
              className="w-full px-3.5 py-2 rounded-xl bg-surface-container-low border border-outline-variant text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            ></textarea>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-outline-variant text-on-surface font-label-md text-sm hover:bg-surface-container"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-secondary text-on-secondary font-label-md text-sm font-bold shadow-md hover:bg-secondary-container transition-all active:scale-95 flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
              <span>Submit Admission Inquiry</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
