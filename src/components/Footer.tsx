import React from 'react';

interface FooterProps {
  onOpenPrivacy: () => void;
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onNavigate }) => {
  return (
    <footer className="w-full bg-surface-container border-t border-surface-container-highest mt-auto pb-safe">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Institutional Bio */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary">
                <span className="material-symbols-outlined text-[20px]">school</span>
              </div>
              <span className="font-headline-sm text-lg font-bold text-primary">
                St. John Public School
              </span>
            </div>
            <p className="font-body-md text-sm text-on-surface-variant max-w-md leading-relaxed">
              Empowering rural scholars of Shukul Bazar, Amethi with high-standard English medium CBSE education from Nursery through 12th standard (Science and Arts streams).
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-full bg-surface-container-highest font-label-sm text-xs text-primary font-semibold">
                CBSE Affiliated #2133890
              </span>
              <span className="px-2.5 py-1 rounded-full bg-surface-container-highest font-label-sm text-xs text-on-surface-variant font-semibold">
                School Code: 71204
              </span>
              <span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-xs font-bold">
                PWA Android Ready
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="font-title-md text-sm font-bold text-primary uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-1.5 font-body-sm text-sm text-on-surface-variant">
              <li>
                <button onClick={() => onNavigate('public')} className="hover:text-primary transition-colors">
                  Public Notice Board
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('public')} className="hover:text-primary transition-colors">
                  Academic Toppers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('public')} className="hover:text-primary transition-colors">
                  Campus Photo Gallery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('login')} className="hover:text-primary transition-colors">
                  Zero-OTP Student Login
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('login')} className="hover:text-primary transition-colors">
                  Staff & Admin Console
                </button>
              </li>
            </ul>
          </div>

          {/* Campus Location & Compliance */}
          <div className="space-y-2">
            <h4 className="font-title-md text-sm font-bold text-primary uppercase tracking-wider">
              Campus & Compliance
            </h4>
            <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
              Main Campus Road, Near Block Development Office, Shukul Bazar, District Amethi, Uttar Pradesh - 227811.
            </p>
            <p className="font-body-sm text-xs text-on-surface-variant">
              Helpline: +91 94520 XXXXX / 05361-XXXXXX
            </p>
            <div className="pt-2 flex flex-col gap-1 text-xs">
              <button
                onClick={onOpenPrivacy}
                className="text-primary hover:underline text-left font-medium flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">policy</span>
                <span>Google Play Privacy Policy & Data Safety</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between text-xs text-on-surface-variant gap-2">
          <p>© 2026 St. John Public School, Shukul Bazar, Amethi. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-secondary">verified</span>
            <span>Progressive Web App • Built for Play Store Submission</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
