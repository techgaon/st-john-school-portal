import React from 'react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestDeletion?: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose, onRequestDeletion }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-surface-container-lowest rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-surface-container-high">
        {/* Header */}
        <div className="px-6 py-4 bg-primary text-on-primary flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px]">verified_user</span>
            <h2 className="font-headline-sm text-lg font-bold">Privacy Policy & Student Data Safety</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Policy Content */}
        <div className="p-6 overflow-y-auto space-y-4 font-body-sm text-sm text-on-surface leading-relaxed">
          <div className="p-3 bg-secondary-fixed/30 rounded-xl border border-secondary-fixed text-on-secondary-fixed-variant text-xs">
            <strong>Google Play Store Compliance Notice:</strong> St. John Public School, Shukul Bazar, Amethi (227811) strictly adheres to the Google Play Families Policy, COPPA, and Indian Digital Personal Data Protection (DPDP) Act.
          </div>

          <section className="space-y-1">
            <h3 className="font-title-md text-primary font-bold">1. Information Collection & Purpose</h3>
            <p className="text-on-surface-variant">
              This mobile application collects educational records including student full name, date of birth, class/grade, attendance marks, academic results, and guardian emergency contact numbers solely for institutional administration and parental notifications.
            </p>
          </section>

          <section className="space-y-1">
            <h3 className="font-title-md text-primary font-bold">2. Zero Third-Party Advertising or Selling</h3>
            <p className="text-on-surface-variant">
              We do NOT sell, lease, or monetize student or parent personal data under any circumstances. No behavioral tracking, profiling, or third-party advertising SDKs are embedded in this application.
            </p>
          </section>

          <section className="space-y-1">
            <h3 className="font-title-md text-primary font-bold">3. Camera & Storage Permissions</h3>
            <p className="text-on-surface-variant">
              Camera and photo gallery access is requested strictly when an administrator scans physical student registers (OCR) or when students/parents upload official passport photographs for digital ID cards. All image processing is compressed client-side.
            </p>
          </section>

          <section className="space-y-1">
            <h3 className="font-title-md text-primary font-bold">4. Right to Erasure & Account Deletion (Google Play Mandate)</h3>
            <p className="text-on-surface-variant">
              In full compliance with Google Play Store User Data & Data Safety policies, students and guardians have the absolute right to request the permanent deletion of their account, biometrics, and associated academic records.
            </p>
            {onRequestDeletion && (
              <div className="pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onRequestDeletion();
                  }}
                  className="px-4 py-2 rounded-xl bg-error text-on-error font-label-md text-xs font-bold shadow-sm hover:opacity-90 active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">delete_forever</span>
                  <span>Request Account & Data Deletion</span>
                </button>
              </div>
            )}
          </section>

          <section className="space-y-1">
            <h3 className="font-title-md text-primary font-bold">5. Grievance Officer & Contact</h3>
            <p className="text-on-surface-variant">
              The Principal, St. John Public School, Shukul Bazar, District Amethi, Uttar Pradesh - 227811. Email: privacy@stjohnschoolamethi.edu.in
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-surface-container flex items-center justify-end border-t border-surface-container-high">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-primary text-on-primary font-label-md text-sm font-semibold hover:bg-primary-container transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
