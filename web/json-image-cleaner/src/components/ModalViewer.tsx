'use client';

import { useState } from 'react';
import { clsx } from 'clsx';

interface ModalViewerProps {
  title: string;
  content: string;
  onClose: () => void;
}

export function ModalViewer({ title, content, onClose }: ModalViewerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900 truncate max-w-[300px]" title={title}>
            {title}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className={clsx(
                'px-3 py-1 text-sm rounded transition-colors',
                copied
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <pre className="text-sm font-mono text-gray-700 whitespace-pre-wrap break-all">
            {content}
          </pre>
        </div>
      </div>
    </div>
  );
}
