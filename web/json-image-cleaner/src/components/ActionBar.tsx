'use client';

import { useStore } from '@/store/useStore';

export function ActionBar() {
  const selectAllOnTab = useStore((state) => state.selectAllOnTab);
  const selectAllWithValidImages = useStore((state) => state.selectAllWithValidImages);
  const selectAllWithOnlyValidImages = useStore((state) => state.selectAllWithOnlyValidImages);
  const deselectAll = useStore((state) => state.deselectAll);
  const invertSelection = useStore((state) => state.invertSelection);
  const exportSelected = useStore((state) => state.exportSelected);
  const exportFiltered = useStore((state) => state.exportFiltered);
  const selectedIds = useStore((state) => state.selectedIds);
  const rescanImages = useStore((state) => state.rescanImages);
  const isValidating = useStore((state) => state.isValidating);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={selectAllOnTab}
              className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
            >
              Select all on tab
            </button>
            <button
              onClick={selectAllWithValidImages}
              className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
            >
              Select with valid images
            </button>
            <button
              onClick={selectAllWithOnlyValidImages}
              className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
            >
              Select only valid
            </button>
            <button
              onClick={deselectAll}
              className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
            >
              Deselect all
            </button>
            <button
              onClick={invertSelection}
              className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
            >
              Invert selection
            </button>
            <button
              onClick={rescanImages}
              disabled={isValidating}
              className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              Re-scan images
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={exportSelected}
              disabled={selectedIds.size === 0}
              className="px-4 py-1.5 text-sm bg-teal-600 text-white rounded font-medium hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Download Selected ({selectedIds.size})
            </button>
            <button
              onClick={exportFiltered}
              className="px-4 py-1.5 text-sm bg-teal-600 text-white rounded font-medium hover:bg-teal-700 transition-colors"
            >
              Download Filtered
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
