'use client';

import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { ImageThumbnail } from './ImageThumbnail';
import { ModalViewer } from './ModalViewer';
import { ParsedItem } from '@/types';
import { clsx } from 'clsx';

const STATUS_LABELS: Record<ParsedItem['status'], string> = {
  all_valid: 'All Valid',
  any_valid: 'Any Valid',
  some_broken: 'Some Broken',
  all_broken: 'All Broken',
  no_images: 'No Images',
};

const STATUS_COLORS: Record<ParsedItem['status'], string> = {
  all_valid: 'bg-green-100 text-green-700 border-green-200',
  any_valid: 'bg-blue-100 text-blue-700 border-blue-200',
  some_broken: 'bg-amber-100 text-amber-700 border-amber-200',
  all_broken: 'bg-red-100 text-red-700 border-red-200',
  no_images: 'bg-gray-100 text-gray-600 border-gray-200',
};

interface CardItemProps {
  item: ParsedItem;
}

export function CardItem({ item }: CardItemProps) {
  const [showFullJson, setShowFullJson] = useState(false);
  const [showAllImages, setShowAllImages] = useState(false);
  const [jsonExpanded, setJsonExpanded] = useState(false);
  const selectedIds = useStore((state) => state.selectedIds);
  const toggleSelection = useStore((state) => state.toggleSelection);

  const isSelected = selectedIds.has(item.id);
  const displayedImages = showAllImages ? item.images : item.images.slice(0, 4);
  const extraCount = item.images.length - 4;

  const jsonPreview = JSON.stringify(item.original, null, 2).slice(0, 150);

  return (
    <>
      <div
        className={clsx(
          'bg-white rounded-lg shadow-sm border transition-all',
          isSelected ? 'border-teal-500 ring-2 ring-teal-100' : 'border-gray-100'
        )}
      >
        <div className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleSelection(item.id)}
                className="w-4 h-4 text-teal-600 rounded border-gray-300 focus:ring-teal-500"
              />
              <h3 className="font-medium text-gray-900 truncate max-w-[180px]" title={item.title}>
                {item.title}
              </h3>
            </div>
            <span
              className={clsx(
                'px-2 py-1 text-xs font-medium rounded border',
                STATUS_COLORS[item.status]
              )}
            >
              {STATUS_LABELS[item.status]}
            </span>
          </div>

          <div className="mb-3">
            {item.images.length > 0 ? (
              <div className="flex gap-2 flex-wrap">
                {displayedImages.map((img, idx) => (
                  <ImageThumbnail key={idx} image={img} />
                ))}
                {!showAllImages && extraCount > 0 && (
                  <button
                    onClick={() => setShowAllImages(true)}
                    className="w-16 h-16 rounded bg-gray-100 flex items-center justify-center text-sm text-gray-500 hover:bg-gray-200 transition-colors"
                  >
                    +{extraCount}
                  </button>
                )}
              </div>
            ) : (
              <div className="h-16 bg-gray-50 rounded flex items-center justify-center text-sm text-gray-400">
                No images found
              </div>
            )}
          </div>

          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-1">Images: {item.images.length}</p>
            <div className="flex gap-2 text-xs">
              <span className="text-green-600">
                ✓ {item.images.filter((i) => i.status === 'valid').length}
              </span>
              <span className="text-red-600">
                ✗ {item.images.filter((i) => i.status === 'broken').length}
              </span>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-3">
            <div className={clsx('text-xs text-gray-600 font-mono', !jsonExpanded && 'line-clamp-2')}>
              {jsonPreview}
              {jsonPreview.length >= 150 && (
                <button
                  onClick={() => setJsonExpanded(!jsonExpanded)}
                  className="text-teal-600 hover:text-teal-700 ml-1"
                >
                  {jsonExpanded ? 'show less' : '...'}
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFullJson(true)}
              className="mt-2 text-xs text-teal-600 hover:text-teal-700 font-medium"
            >
              View Full JSON
            </button>
          </div>
        </div>
      </div>

      {showFullJson && (
        <ModalViewer
          title={item.title}
          content={JSON.stringify(item.original, null, 2)}
          onClose={() => setShowFullJson(false)}
        />
      )}
    </>
  );
}
