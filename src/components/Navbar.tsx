import React from 'react';
import { UserSession } from '../types';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  session: UserSession;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, session, onLogout }) => {
  return (
    <header className="fixed top-0 w-full z-40 pt-safe bg-surface/95 backdrop-blur-xl border-b border-surface-container-high shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 px-4 sm:px-6 max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand & Logo */}
        <div
          onClick={() => onNavigate('public')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative w-10 h-10 rounded-xl bg-primary-container p-1.5 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[24px] text-on-primary">school</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-base sm:text-lg font-bold text-primary leading-tight line-clamp-1">
              St. John Public School
            </span>
            <span className="font-label-sm text-xs text-on-surface-variant truncate">
              Shukul Bazar, Amethi (227811) • CBSE Affiliated
            </span>
          </div>
        </div>

        {/* Center / Navigation Links for Desktop */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            onClick={() => onNavigate('public')}
            className={`px-3 py-1.5 rounded-lg font-label-md text-sm transition-colors ${
              currentView === 'public'
                ? 'bg-primary-container text-on-primary font-bold'
                : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
            }`}
          >
            Public Portal
          </button>

          {session.role === 'student' && (
            <>
              <button
                onClick={() => onNavigate('student-dashboard')}
                className={`px-3 py-1.5 rounded-lg font-label-md text-sm transition-colors ${
                  currentView === 'student-dashboard'
                    ? 'bg-primary-container text-on-primary font-bold'
                    : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => onNavigate('report-card')}
                className={`px-3 py-1.5 rounded-lg font-label-md text-sm transition-colors ${
                  currentView === 'report-card'
                    ? 'bg-primary-container text-on-primary font-bold'
                    : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
                }`}
              >
                Marksheet
              </button>
              <button
                onClick={() => onNavigate('fee-payment')}
                className={`px-3 py-1.5 rounded-lg font-label-md text-sm transition-colors ${
                  currentView === 'fee-payment'
                    ? 'bg-primary-container text-on-primary font-bold'
                    : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
                }`}
              >
                Fee Receipt
              </button>
            </>
          )}

          {session.role === 'admin' && (
            <button
              onClick={() => onNavigate('admin-dashboard')}
              className={`px-3 py-1.5 rounded-lg font-label-md text-sm transition-colors ${
                currentView === 'admin-dashboard'
                  ? 'bg-secondary text-on-secondary font-bold'
                  : 'text-secondary hover:bg-secondary-fixed/30'
              }`}
            >
              Master Console
            </button>
          )}
        </nav>

        {/* Auth CTA Actions */}
        <div className="flex items-center gap-2">
          {session.role === 'guest' ? (
            <button
              onClick={() => onNavigate('login')}
              className="inline-flex items-center justify-center gap-1.5 h-10 px-4 rounded-xl bg-primary text-on-primary font-label-md text-sm shadow-sm hover:bg-primary-container active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">lock</span>
              <span>Portal Login</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/30">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: session.role === 'admin' ? '#fe932c' : '#1e3a8a' }}
                ></span>
                <span className="font-label-sm text-xs font-semibold text-on-surface capitalize">
                  {session.role === 'admin' ? 'Principal / Admin' : session.studentName || 'Student'}
                </span>
              </div>
              <button
                onClick={onLogout}
                title="Logout Session"
                className="p-2 rounded-xl text-error hover:bg-error-container/40 active:scale-95 transition-all flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[20px]">logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
