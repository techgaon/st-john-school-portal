import React, { useState, useEffect } from 'react';
import { SchoolStore } from './store/schoolStore';
import { UserSession } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PrivacyModal } from './components/PrivacyModal';
import { PublicPortal } from './pages/PublicPortal';
import { LoginPortal } from './pages/LoginPortal';
import { StudentDashboard } from './pages/StudentDashboard';
import { ReportCard } from './pages/ReportCard';
import { FeePayment } from './pages/FeePayment';
import { FeeHistory } from './pages/FeeHistory';
import { AdminDashboard } from './pages/AdminDashboard';

export const App: React.FC = () => {
  const [session, setSession] = useState<UserSession>(SchoolStore.getCurrentSession());
  const [currentView, setCurrentView] = useState<string>(() => {
    // If student is logged in, default to student-dashboard, if admin default to admin-dashboard, else public
    const current = SchoolStore.getCurrentSession();
    if (current.role === 'student') return 'student-dashboard';
    if (current.role === 'admin') return 'admin-dashboard';
    return 'public';
  });

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const showSuccessToast = (msg: string) => {
    setToast({ message: msg, type: 'success' });
    setTimeout(() => setToast(null), 3500);
  };

  const showErrorToast = (msg: string) => {
    setToast({ message: msg, type: 'error' });
    setTimeout(() => setToast(null), 4000);
  };

  const handleLoginSuccess = (role: 'student' | 'admin', studentId?: string, name?: string) => {
    const updated: UserSession = { role, studentId, studentName: name };
    setSession(updated);
    SchoolStore.setCurrentSession(updated);
    if (role === 'admin') {
      setCurrentView('admin-dashboard');
    } else {
      setCurrentView('student-dashboard');
    }
  };

  const handleLogout = () => {
    SchoolStore.clearSession();
    setSession({ role: 'guest' });
    setCurrentView('public');
    showSuccessToast('Logged out securely.');
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface text-on-surface antialiased selection:bg-primary-container selection:text-on-primary">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md animate-bounce">
          <div
            className={`px-4 py-3 rounded-2xl shadow-xl border flex items-center gap-3 text-xs sm:text-sm font-semibold ${
              toast.type === 'success'
                ? 'bg-primary text-on-primary border-primary-container'
                : 'bg-error text-on-error border-error-container'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {toast.type === 'success' ? 'check_circle' : 'error'}
            </span>
            <span>{toast.message}</span>
            <button
              onClick={() => setToast(null)}
              className="ml-auto p-1 rounded-full hover:bg-white/20 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        session={session}
        onLogout={handleLogout}
      />

      {/* Main View Router */}
      <main className="flex-1 w-full">
        {currentView === 'public' && (
          <PublicPortal
            onNavigate={handleNavigate}
            onSuccessToast={showSuccessToast}
          />
        )}

        {currentView === 'login' && (
          <LoginPortal
            onLoginSuccess={handleLoginSuccess}
            onErrorToast={showErrorToast}
            onSuccessToast={showSuccessToast}
          />
        )}

        {currentView === 'student-dashboard' && session.studentId && (
          <StudentDashboard
            studentId={session.studentId}
            onNavigate={handleNavigate}
            onOpenPrivacy={() => setIsPrivacyOpen(true)}
            onSuccessToast={showSuccessToast}
            onErrorToast={showErrorToast}
          />
        )}

        {currentView === 'report-card' && session.studentId && (
          <ReportCard
            studentId={session.studentId}
            onNavigate={handleNavigate}
            onSuccessToast={showSuccessToast}
          />
        )}

        {currentView === 'fee-payment' && session.studentId && (
          <FeePayment
            studentId={session.studentId}
            onNavigate={handleNavigate}
            onSuccessToast={showSuccessToast}
          />
        )}

        {currentView === 'fee-history' && session.studentId && (
          <FeeHistory
            studentId={session.studentId}
            onNavigate={handleNavigate}
            onSuccessToast={showSuccessToast}
          />
        )}

        {currentView === 'admin-dashboard' && (
          <AdminDashboard
            onNavigate={handleNavigate}
            onSuccessToast={showSuccessToast}
            onErrorToast={showErrorToast}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Privacy Policy Modal */}
      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
        onRequestDeletion={() => {
          if (session.role === 'student') {
            setCurrentView('student-dashboard');
          }
        }}
      />
    </div>
  );
};
