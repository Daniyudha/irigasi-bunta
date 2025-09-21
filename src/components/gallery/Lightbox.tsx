'use client';

import { useEffect } from 'react';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl?: string;
  title: string;
  description: string;
  type: 'image' | 'video';
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export default function Lightbox({
  isOpen,
  onClose,
  imageUrl,
  title,
  description,
  type,
  onNext,
  onPrev,
  hasNext = false,
  hasPrev = false
}: LightboxProps) {
  const extractYoutubeId = (url: string): string | null => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const getEmbedUrl = (url: string): string => {
    const youtubeId = extractYoutubeId(url);
    if (youtubeId) {
      return `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;
    }
    return url;
  };
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && hasNext && onNext) {
        onNext();
      } else if (e.key === 'ArrowLeft' && hasPrev && onPrev) {
        onPrev();
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
  }, [isOpen, onClose, onNext, onPrev, hasNext, hasPrev]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800/70 backdrop-blur-sm p-4">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-3xl hover:text-gray-200 cursor-pointer transition-colors z-10"
      >
        ✕
      </button>

      {/* Navigation Arrows - Fixed to viewport edges */}
      {onNext && onPrev && (
        <>
          {/* Previous Arrow */}
          {hasPrev && (
            <button
              onClick={onPrev}
              className="fixed left-4 top-1/2 transform -translate-y-1/2 hover:text-gray-300 text-white cursor-pointer p-4 rounded-full transition-all z-10"
              aria-label="Previous image"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          
          {/* Next Arrow */}
          {hasNext && (
            <button
              onClick={onNext}
              className="fixed right-4 top-1/2 transform -translate-y-1/2 hover:text-gray-300 text-white cursor-pointer p-4 rounded-full transition-all z-10"
              aria-label="Next image"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </>
      )}

      {/* Media Content Container */}
      <div className="relative w-full max-w-6xl h-full max-h-[90vh]">
        <div className="bg-white rounded-lg overflow-hidden h-full flex flex-col">
          <div className="flex-1 bg-gray-200 flex items-center justify-center min-h-0">
            {type === 'image' ? (
              imageUrl ? (
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-gray-500">No Image</span>
              )
            ) : (
              // Video: YouTube embed
              imageUrl ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={getEmbedUrl(imageUrl)}
                  title={title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  onError={(e) => {
                    console.error('Failed to load video:', imageUrl);
                    const iframe = e.currentTarget as HTMLIFrameElement;
                    iframe.style.display = 'none';
                    // Show error message
                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'flex items-center justify-center h-full text-red-500';
                    errorDiv.innerHTML = 'Failed to load video';
                    iframe.parentNode?.appendChild(errorDiv);
                  }}
                ></iframe>
              ) : (
                <span className="text-gray-500">No Video URL</span>
              )
            )}
          </div>
          
          {/* Caption */}
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}