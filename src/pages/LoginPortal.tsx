import React, { useState } from 'react';
import { SchoolStore, MASTER_ADMIN } from '../store/schoolStore';
import { isValidStudentId } from '../utils/studentId';

interface LoginPortalProps {
  onLoginSuccess: (role: 'student' | 'admin', studentId?: string, name?: string) => void;
  onErrorToast: (msg: string) => void;
  onSuccessToast: (msg: string) => void;
}

export const LoginPortal: React.FC<LoginPortalProps> = ({
  onLoginSuccess,
  onErrorToast,
  onSuccessToast
}) => {
  const [activeTab, setActiveTab] = useState<'student' | 'staff'>('student');
  const [loginId, setLoginId] = useState('');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [idValidationMessage, setIdValidationMessage] = useState('');

  // Handle Input with live validation
  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    setLoginId(val);

    if (activeTab === 'student') {
      if (val.length === 0) {
        setIdValidationMessage('Must be 3 uppercase letters followed by 6 digits (MMYYYY).');
      } else if (isValidStudentId(val)) {
        setIdValidationMessage('✓ Valid Student ID format.');
      } else {
        setIdValidationMessage('Format: 3 Letters + MM + YYYY (e.g. RAH052012 or PRI082010)');
      }
    } else {
      setIdValidationMessage('');
    }
  };

  // Demo Fill buttons for Google Play reviewer
  const handleDemoStudentFill = (demoId = 'RAH052012', demoPin = 'RAH052012') => {
    setActiveTab('student');
    setLoginId(demoId);
    setPin(demoPin);
    setIdValidationMessage('✓ Demo student credentials loaded.');
    onSuccessToast(`Loaded demo reviewer pass: ${demoId}`);
  };

  const handleDemoAdminFill = () => {
    setActiveTab('staff');
    setLoginId(MASTER_ADMIN.id);
    setPin(MASTER_ADMIN.password);
    setIdValidationMessage('✓ Master Admin credentials loaded.');
    onSuccessToast('Loaded Master Admin reviewer pass.');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanId = loginId.trim().toUpperCase();
    const cleanPin = pin.trim();

    if (!cleanId) {
      onErrorToast('Please enter your Login ID');
      return;
    }

    if (activeTab === 'staff') {
      // Admin Authentication
      if (cleanId === MASTER_ADMIN.id && cleanPin === MASTER_ADMIN.password) {
        SchoolStore.setCurrentSession({
          role: 'admin',
          studentName: 'Principal Office / Admin'
        });
        onSuccessToast('Welcome, Administrator. Access granted.');
        onLoginSuccess('admin', undefined, 'Principal Office / Admin');
      } else {
        onErrorToast('Invalid Staff ID or Password. Check credentials.');
      }
      return;
    }

    // Student Authentication
    const student = SchoolStore.getStudentById(cleanId);
    if (!student) {
      onErrorToast(`Student ID "${cleanId}" not found in school database.`);
      return;
    }

    // Password matches if PIN equals student's custom PIN or default ID or guardian phone
    const isValidPass =
      cleanPin === student.pin ||
      cleanPin === student.id ||
      cleanPin === student.guardianMobile.slice(-4);

    if (isValidPass) {
      SchoolStore.setCurrentSession({
        role: 'student',
        studentId: student.id,
        studentName: student.fullName
      });
      onSuccessToast(`Welcome back, ${student.fullName}!`);
      onLoginSuccess('student', student.id, student.fullName);
    } else {
      onErrorToast('Incorrect PIN / Password. Default password is your Student ID.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-20 pb-16 px-4 bg-surface">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-2xl p-6 sm:p-8 shadow-md border border-surface-container-high">
        {/* Institutional Branding */}
        <div className="flex flex-col items-center text-center pb-5">
          <div className="relative w-16 h-16 mb-2 bg-primary-container text-on-primary rounded-2xl p-2 shadow-sm flex items-center justify-center">
            <span className="material-symbols-outlined text-[36px]">school</span>
            <span className="absolute -bottom-1 -right-1 bg-secondary text-on-secondary rounded-full p-1 shadow-sm flex items-center justify-center">
              <span className="material-symbols-outlined text-[12px]">verified</span>
            </span>
          </div>
          <h1 className="font-headline-md text-xl font-bold text-primary">St. John Public School</h1>
          <p className="font-body-sm text-xs text-on-surface-variant font-medium mt-0.5">
            Shukul Bazar, Amethi (PIN 227811)
          </p>
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container-high rounded-full">
            <span className="material-symbols-outlined text-[14px] text-primary">lock</span>
            <span className="font-label-sm text-[11px] text-primary uppercase font-bold tracking-wider">
              Secure Zero-OTP Access Portal
            </span>
          </div>
        </div>

        {/* Segmented Role Selector */}
        <div className="bg-surface-container p-1 rounded-xl flex items-center mb-4">
          <button
            type="button"
            onClick={() => {
              setActiveTab('student');
              setLoginId('');
              setPin('');
              setIdValidationMessage('');
            }}
            className={`flex-1 py-2 rounded-lg font-label-md text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'student'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">school</span>
            <span>Student / Parent</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('staff');
              setLoginId('');
              setPin('');
              setIdValidationMessage('');
            }}
            className={`flex-1 py-2 rounded-lg font-label-md text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'staff'
                ? 'bg-secondary text-on-secondary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">badge</span>
            <span>Staff / Admin</span>
          </button>
        </div>

        {/* Demo Auto-Fill Assist Chips for Play Store Reviewers */}
        <div className="mb-4 space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-secondary">bolt</span>
            <span>Play Store Reviewer Quick Passes</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoStudentFill('RAH052012', 'RAH052012')}
              className="p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container border border-outline-variant/40 text-left transition-all active:scale-95"
            >
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-xs font-bold text-primary">Student Demo</span>
                <span className="px-1.5 py-0.5 rounded bg-primary-fixed text-on-primary-fixed text-[10px] font-bold">1-Click</span>
              </div>
              <p className="font-data-mono text-[11px] text-on-surface-variant mt-1 font-semibold truncate">
                ID: RAH052012
              </p>
            </button>

            <button
              type="button"
              onClick={handleDemoAdminFill}
              className="p-2.5 rounded-xl bg-secondary-fixed/40 hover:bg-secondary-fixed/60 border border-secondary-fixed text-left transition-all active:scale-95"
            >
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-xs font-bold text-secondary">Admin Demo</span>
                <span className="px-1.5 py-0.5 rounded bg-secondary text-on-secondary text-[10px] font-bold">1-Click</span>
              </div>
              <p className="font-data-mono text-[11px] text-on-surface-variant mt-1 font-semibold truncate">
                ID: ADMIN227811
              </p>
            </button>
          </div>
        </div>

        {/* Format Explainer Banner (Student Tab) */}
        {activeTab === 'student' && (
          <div className="bg-surface-container-low rounded-xl p-3.5 mb-4 border border-outline-variant/30 text-xs text-on-surface-variant space-y-2">
            <div className="flex items-center gap-1.5 font-title-md text-primary font-bold">
              <span className="material-symbols-outlined text-[18px] text-secondary">info</span>
              <span>Deterministic Zero-OTP ID Formula</span>
            </div>
            <div className="bg-surface-container-lowest p-2 rounded-lg font-data-mono text-primary font-bold border border-outline-variant/20 text-center">
              [3 Name Letters in CAPS] + [MM] + [YYYY]
            </div>
            <p className="leading-relaxed">
              <strong>Example:</strong> Student <span className="text-primary font-bold">RAHUL</span> born 14 May 2012 → Login ID: <span className="text-secondary font-bold font-data-mono">RAH052012</span>
            </p>
            <p className="text-[11px] text-on-surface-variant/80">
              * Default password is your Student ID or last 4 digits of guardian phone.
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-label-md text-xs font-bold text-on-surface flex items-center gap-1">
                {activeTab === 'student' ? 'Student Login ID' : 'Master Staff ID'}
                <span className="text-error">*</span>
              </label>
              <span className="font-label-sm text-[11px] text-on-surface-variant">
                {activeTab === 'student' ? 'e.g. RAH052012' : 'ADMIN227811'}
              </span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px]">person</span>
              </span>
              <input
                type="text"
                required
                value={loginId}
                onChange={handleIdChange}
                maxLength={activeTab === 'student' ? 9 : 20}
                placeholder={activeTab === 'student' ? 'e.g. RAH052012' : 'e.g. ADMIN227811'}
                className="w-full h-11 pl-10 pr-4 bg-surface-container-lowest text-on-background font-data-mono text-sm rounded-xl border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary uppercase tracking-wider"
              />
            </div>
            {idValidationMessage && (
              <p
                className={`font-body-sm text-[11px] mt-1 px-1 ${
                  idValidationMessage.startsWith('✓') ? 'text-primary font-bold' : 'text-on-surface-variant'
                }`}
              >
                {idValidationMessage}
              </p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-label-md text-xs font-bold text-on-surface flex items-center gap-1">
                {activeTab === 'student' ? 'Access PIN / Password' : 'Admin Master Password'}
                <span className="text-error">*</span>
              </label>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px]">password</span>
              </span>
              <input
                type={showPin ? 'text' : 'password'}
                required
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder={activeTab === 'student' ? 'PIN or Student ID' : 'Master Password'}
                className="w-full h-11 pl-10 pr-10 bg-surface-container-lowest text-on-background font-data-mono text-sm rounded-xl border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showPin ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-11 rounded-xl bg-primary text-on-primary font-label-lg text-sm font-bold shadow-md hover:bg-primary-container active:scale-95 transition-all flex items-center justify-center gap-2 mt-2"
          >
            <span className="material-symbols-outlined text-[18px]">login</span>
            <span>Authenticate & Access Portal</span>
          </button>
        </form>
      </div>
    </div>
  );
};
