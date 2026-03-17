'use client';

import { useStore } from '@/store/useStore';

export function ValidationProgress() {
  const isValidating = useStore((state) => state.isValidating);
  const progress = useStore((state) => state.validationProgress);

  if (!isValidating) return null;

  const percentage = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;

  return (
    <div className="mb-6 p-4 bg-teal-50 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-teal-700">
          Validating images...
        </span>
        <span className="text-sm text-teal-600">
          {progress.completed} / {progress.total}
        </span>
      </div>
      <div className="w-full bg-teal-100 rounded-full h-2">
        <div
          className="bg-teal-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
