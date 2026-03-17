'use client';

import { useMemo } from 'react';
import { useStore } from '@/store/useStore';
import { FilterTab, ParsedItem } from '@/types';
import { clsx } from 'clsx';

const TABS: { id: FilterTab; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'all_valid', label: 'All Valid' },
  { id: 'any_valid', label: 'Any Valid' },
  { id: 'some_broken', label: 'Some Broken' },
  { id: 'all_broken', label: 'All Broken' },
  { id: 'no_images', label: 'No Images' },
  { id: 'selected', label: 'Selected' },
];

function getFilteredCount(items: ParsedItem[], selectedIds: Set<string>, tabId: FilterTab): number {
  switch (tabId) {
    case 'all':
      return items.length;
    case 'all_valid':
      return items.filter((item) => item.status === 'all_valid').length;
    case 'any_valid':
      return items.filter((item) => item.status === 'any_valid').length;
    case 'some_broken':
      return items.filter((item) => item.status === 'some_broken').length;
    case 'all_broken':
      return items.filter((item) => item.status === 'all_broken').length;
    case 'no_images':
      return items.filter((item) => item.status === 'no_images').length;
    case 'selected':
      return selectedIds.size;
    default:
      return items.length;
  }
}

export function TabsBar() {
  const activeTab = useStore((state) => state.activeTab);
  const setActiveTab = useStore((state) => state.setActiveTab);
  const items = useStore((state) => state.items);
  const selectedIds = useStore((state) => state.selectedIds);

  const counts = useMemo(() => {
    return TABS.reduce(
      (acc, tab) => {
        acc[tab.id] = getFilteredCount(items, selectedIds, tab.id);
        return acc;
      },
      {} as Record<FilterTab, number>
    );
  }, [items, selectedIds]);

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={clsx(
            'px-4 py-2 rounded-lg font-medium text-sm transition-colors',
            activeTab === tab.id
              ? 'bg-teal-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          )}
        >
          {tab.label}
          <span className="ml-2 text-xs opacity-75">({counts[tab.id]})</span>
        </button>
      ))}
    </div>
  );
}
