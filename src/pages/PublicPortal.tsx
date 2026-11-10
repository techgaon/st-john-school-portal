import React, { useState } from 'react';
import { SchoolStore } from '../store/schoolStore';
import { Notice, Topper, Alumni, GalleryItem } from '../types';
import { LightboxModal } from '../components/LightboxModal';
import { InquiryModal } from '../components/InquiryModal';

interface PublicPortalProps {
  onNavigate: (view: string) => void;
  onSuccessToast: (msg: string) => void;
}

export const PublicPortal: React.FC<PublicPortalProps> = ({ onNavigate, onSuccessToast }) => {
  const [notices] = useState<Notice[]>(SchoolStore.getNotices());
  const [toppers] = useState<Topper[]>(SchoolStore.getToppers());
  const [alumni] = useState<Alumni[]>(SchoolStore.getAlumni());
  const [gallery] = useState<GalleryItem[]>(SchoolStore.getGallery());

  // Notice Board Filter
  const [noticeFilter, setNoticeFilter] = useState<string>('All');
  // Toppers Filter
  const [topperFilter, setTopperFilter] = useState<'All' | '10th' | '12th Science' | '12th Arts' | 'Home Exams'>('All');
  // Gallery Filter
  const [galleryFilter, setGalleryFilter] = useState<string>('All');
  // Selected gallery image for lightbox
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);
  // Inquiry Modal state
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  const filteredNotices = noticeFilter === 'All'
    ? notices
    : notices.filter((n) => n.category.toLowerCase() === noticeFilter.toLowerCase());

  const filteredToppers = topperFilter === 'All'
    ? toppers
    : toppers.filter((t) => t.category === topperFilter);

  const filteredGallery = galleryFilter === 'All'
    ? gallery
    : gallery.filter((g) => g.category.toLowerCase() === galleryFilter.toLowerCase());

  return (
    <div className="flex flex-col w-full min-h-screen pt-16 pb-20">
      {/* 1. Hero Announcement Banner */}
      <section className="relative w-full overflow-hidden bg-primary text-on-primary">
        <div
          className="relative min-h-[420px] sm:min-h-[480px] bg-cover bg-center flex flex-col justify-end p-6 sm:p-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80')`
          }}
        >
          {/* Oxford Blue Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/85 to-primary/40"></div>

          <div className="relative z-10 max-w-4xl flex flex-col gap-3">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary text-on-secondary font-label-sm text-xs font-bold uppercase tracking-wider shadow-sm">
                <span className="material-symbols-outlined text-[14px]">school</span>
                Admissions Open 2025-26
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container-lowest/20 backdrop-blur-md text-white font-label-sm text-xs">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                CBSE Affiliation #2133890
              </span>
              <a
                href="tel:+919452098765"
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container-lowest/20 backdrop-blur-md text-white font-label-sm text-xs hover:bg-surface-container-lowest/30 transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">call</span>
                +91 94520 XXXXX
              </a>
            </div>

            {/* Main Headline */}
            <h1 className="font-display-lg text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              St. John Public School
            </h1>
            <p className="font-headline-sm text-base sm:text-xl text-primary-fixed-dim font-medium">
              Excellence in English Medium Education • Nursery to 12th (Science & Arts)
            </p>
            <p className="font-body-md text-xs sm:text-sm text-white/80 max-w-2xl leading-relaxed">
              Main Campus, Shukul Bazar, District Amethi, Uttar Pradesh - 227811. Cultivating intellectual curiosity, national pride, and character since inception.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 mt-3 pt-1">
              <button
                onClick={() => setIsInquiryOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-secondary text-on-secondary font-label-lg text-sm sm:text-base font-bold shadow-lg hover:bg-secondary-container active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[20px]">assignment_turned_in</span>
                <span>Apply for Admission</span>
              </button>

              <button
                onClick={() => onNavigate('login')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary-container text-on-primary font-label-lg text-sm sm:text-base font-bold shadow-lg hover:bg-primary-container/90 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[20px]">lock</span>
                <span>Student / Staff Login</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Live Notice Ticker */}
      <div className="w-full bg-surface-container-high border-y border-outline-variant/30 py-2.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary text-on-secondary shrink-0 font-label-sm text-xs font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[16px] animate-pulse">campaign</span>
            <span>Latest Circular</span>
          </div>
          <div className="overflow-hidden whitespace-nowrap w-full">
            <p className="font-label-md text-sm text-on-surface truncate">
              {notices[0]?.title} • {notices[0]?.description}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        {/* 3. Quick Stats Bar */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container-high flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary mb-2">
              <span className="material-symbols-outlined text-[24px]">groups</span>
            </div>
            <span className="font-headline-lg text-2xl sm:text-3xl font-extrabold text-primary">1,450+</span>
            <span className="font-label-sm text-xs text-on-surface-variant font-medium">Active Students</span>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container-high flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary mb-2">
              <span className="material-symbols-outlined text-[24px]">workspace_premium</span>
            </div>
            <span className="font-headline-lg text-2xl sm:text-3xl font-extrabold text-secondary">100%</span>
            <span className="font-label-sm text-xs text-on-surface-variant font-medium">Board Pass Rate</span>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container-high flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary mb-2">
              <span className="material-symbols-outlined text-[24px]">co_present</span>
            </div>
            <span className="font-headline-lg text-2xl sm:text-3xl font-extrabold text-primary">35+</span>
            <span className="font-label-sm text-xs text-on-surface-variant font-medium">CBSE Faculty</span>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container-high flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-tertiary mb-2">
              <span className="material-symbols-outlined text-[24px]">biotech</span>
            </div>
            <span className="font-headline-lg text-2xl sm:text-3xl font-extrabold text-tertiary">15+</span>
            <span className="font-label-sm text-xs text-on-surface-variant font-medium">Smart Tech Labs</span>
          </div>
        </section>

        {/* 4. Public Notice Board (Live Sync) */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-6 rounded-full bg-primary inline-block"></span>
                <h2 className="font-headline-lg text-xl sm:text-2xl font-bold text-on-surface">
                  Public Notice & Circulars
                </h2>
              </div>
              <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant mt-0.5">
                Official notices synced directly from the Principal Office console
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {['All', 'Examination', 'Admissions', 'General', 'Circular'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setNoticeFilter(cat)}
                  className={`px-3 py-1.5 rounded-full font-label-md text-xs whitespace-nowrap transition-all ${
                    noticeFilter === cat
                      ? 'bg-primary text-on-primary font-bold shadow-xs'
                      : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredNotices.map((n) => (
              <div
                key={n.id}
                className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-label-sm text-[11px] font-bold uppercase tracking-wider ${
                        n.category === 'Admissions'
                          ? 'bg-secondary-fixed text-on-secondary-fixed'
                          : n.category === 'Examination'
                          ? 'bg-error-container text-on-error-container'
                          : 'bg-surface-container-high text-primary'
                      }`}
                    >
                      {n.category}
                    </span>
                    <span className="font-data-mono text-xs text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                      {n.date}
                    </span>
                  </div>
                  <h3 className="font-title-md text-base font-bold text-primary mb-1">
                    {n.title}
                  </h3>
                  <p className="font-body-md text-xs sm:text-sm text-on-surface-variant leading-relaxed line-clamp-3">
                    {n.description}
                  </p>
                </div>

                {n.attachmentName && (
                  <div className="mt-4 pt-3 border-t border-surface-container-high flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
                      <span className="material-symbols-outlined text-[18px] text-error">picture_as_pdf</span>
                      <span className="truncate max-w-[200px]">{n.attachmentName}</span>
                    </div>
                    <button
                      onClick={() => onSuccessToast(`Downloaded attachment: ${n.attachmentName}`)}
                      className="px-3 py-1 rounded-lg bg-surface-container text-primary font-label-sm text-xs font-semibold hover:bg-primary hover:text-on-primary transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[16px]">download</span>
                      <span>Download</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 5. Academic Toppers Carousel / Grid */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-6 rounded-full bg-secondary inline-block"></span>
                <h2 className="font-headline-lg text-xl sm:text-2xl font-bold text-on-surface">
                  Academic Excellence & Board Toppers
                </h2>
              </div>
              <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant mt-0.5">
                Honoring outstanding scholars in CBSE Board & Home Examinations
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {(['All', '10th', '12th Science', '12th Arts', 'Home Exams'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setTopperFilter(cat)}
                  className={`px-3 py-1.5 rounded-full font-label-md text-xs whitespace-nowrap transition-all ${
                    topperFilter === cat
                      ? 'bg-secondary text-on-secondary font-bold shadow-xs'
                      : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredToppers.map((top) => (
              <div
                key={top.id}
                className="rounded-2xl bg-surface-container-lowest border border-surface-container-high p-4 flex flex-col items-center text-center shadow-xs hover:shadow-md transition-all group"
              >
                <div className="relative mb-3">
                  <img
                    src={top.photoUrl}
                    alt={top.name}
                    className="w-24 h-24 rounded-full object-cover shadow-md border-2 border-secondary group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute bottom-0 right-0 bg-secondary text-on-secondary rounded-full p-1 shadow-sm flex items-center justify-center">
                    <span className="material-symbols-outlined text-[16px]">military_tech</span>
                  </span>
                </div>
                <h4 className="font-headline-sm text-base font-bold text-primary">{top.name}</h4>
                <div className="flex items-center gap-1 mt-1">
                  <span className="font-headline-lg text-2xl font-black text-secondary">{top.percentage}%</span>
                  <span className="text-xs font-semibold text-on-surface-variant uppercase">({top.category})</span>
                </div>
                <p className="font-body-sm text-xs text-on-surface-variant mt-2 px-2 leading-relaxed">
                  {top.achievement}
                </p>
                <div className="mt-3 pt-2 w-full border-t border-surface-container flex items-center justify-between text-[11px] text-on-surface-variant">
                  <span>Session: {top.year}</span>
                  <span className="font-bold text-primary">{top.stream || 'CBSE'}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Famous Alumni / Star Students Showcase */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-6 rounded-full bg-tertiary inline-block"></span>
            <div>
              <h2 className="font-headline-lg text-xl sm:text-2xl font-bold text-on-surface">
                Wall of Fame • Distinguished Alumni
              </h2>
              <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant mt-0.5">
                St. John graduates making Amethi proud across prestigious national institutes & services
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {alumni.map((alm) => (
              <div
                key={alm.id}
                className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs flex flex-col justify-between"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={alm.photoUrl}
                    alt={alm.name}
                    className="w-14 h-14 rounded-full object-cover shadow-sm border border-outline-variant"
                  />
                  <div>
                    <h4 className="font-title-md text-base font-bold text-primary">{alm.name}</h4>
                    <p className="text-xs font-semibold text-secondary">{alm.currentDesignation}</p>
                    <p className="font-label-sm text-[11px] text-on-surface-variant">
                      {alm.companyOrCollege} • {alm.passoutYear}
                    </p>
                  </div>
                </div>
                <blockquote className="italic font-body-sm text-xs text-on-surface-variant bg-surface-container-low p-3 rounded-xl border-l-2 border-primary">
                  "{alm.quote}"
                </blockquote>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Campus Photo Gallery with Lightbox Zoom */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-6 rounded-full bg-primary inline-block"></span>
                <h2 className="font-headline-lg text-xl sm:text-2xl font-bold text-on-surface">
                  Campus Facilities & Life
                </h2>
              </div>
              <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant mt-0.5">
                Explore our science labs, smart classrooms, cricket ground, and cultural functions
              </p>
            </div>

            {/* Gallery Category Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {['All', 'Campus', 'Labs', 'Classrooms', 'Sports', 'Events'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGalleryFilter(cat)}
                  className={`px-3 py-1.5 rounded-full font-label-md text-xs whitespace-nowrap transition-all ${
                    galleryFilter === cat
                      ? 'bg-primary text-on-primary font-bold shadow-xs'
                      : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveLightbox(item)}
                className="group relative rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all cursor-pointer aspect-4/3 bg-surface-container-high"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity flex flex-col justify-end p-4 text-white">
                  <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-[10px] font-bold uppercase w-fit mb-1">
                    {item.category}
                  </span>
                  <h4 className="font-title-md text-sm sm:text-base font-bold text-white line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="font-body-sm text-xs text-white/80 line-clamp-1 mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        item={activeLightbox}
        onClose={() => setActiveLightbox(null)}
      />

      {/* Inquiry Form Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        onSuccessToast={onSuccessToast}
      />
    </div>
  );
};
