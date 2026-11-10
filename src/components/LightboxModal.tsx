import React from 'react';
import { GalleryItem } from '../types';

interface LightboxModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full bg-surface-container-lowest rounded-2xl overflow-hidden shadow-2xl flex flex-col"
      >
        <div className="relative aspect-video w-full bg-black flex items-center justify-center">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-contain"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        <div className="p-5 flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-xs font-bold uppercase tracking-wider">
              {item.category}
            </span>
          </div>
          <h3 className="font-headline-sm text-lg font-bold text-primary">{item.title}</h3>
          <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
};
