'use client';

import { useState } from 'react';
import { ImageCandidate } from '@/types';
import { clsx } from 'clsx';

interface ImageThumbnailProps {
  image: ImageCandidate;
}

export function ImageThumbnail({ image }: ImageThumbnailProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const getStatusIcon = () => {
    switch (image.status) {
      case 'valid':
        return (
          <span className="absolute top-1 right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </span>
        );
      case 'broken':
        return (
          <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
        );
      case 'loading':
      case 'pending':
        return (
          <span className="absolute top-1 right-1 w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center animate-pulse">
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </span>
        );
    }
  };

  return (
    <div className="relative w-16 h-16 rounded overflow-hidden bg-gray-100">
      {image.status === 'valid' || image.status === 'broken' || image.status === 'loading' ? (
        <>
          {(image.status === 'valid' || image.status === 'loading') && !error ? (
            <img
              src={image.url}
              alt=""
              className={clsx('w-full h-full object-cover', loaded ? 'opacity-100' : 'opacity-0')}
              onLoad={() => setLoaded(true)}
              onError={() => setError(true)}
            />
          ) : null}
          {(!loaded || error) && image.status !== 'broken' && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
              {error ? (
                <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              ) : (
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              )}
            </div>
          )}
          {getStatusIcon()}
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
