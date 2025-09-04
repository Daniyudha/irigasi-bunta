'use client';

import { useEffect } from 'react';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl?: string;
  title: string;
  description: string;
}

export default function Lightbox({ isOpen, onClose, title, description }: LightboxProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <div className="relative max-w-4xl max-h-full mx-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white text-2xl hover:text-gray-300 transition-colors z-10"
        >
          ✕
        </button>

        {/* Image */}
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="h-96 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Gallery Image</span>
          </div>
          
          {/* Caption */}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>

        {/* Navigation would go here for multiple images */}
      </div>
    </div>
  );
}