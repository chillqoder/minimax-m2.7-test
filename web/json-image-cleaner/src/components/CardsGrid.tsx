'use client';

import { useStore } from '@/store/useStore';
import { filterItemsByTab } from '@/store/useStore';
import { CardItem } from './CardItem';

export function CardsGrid() {
  const items = useStore((state) => state.items);
  const activeTab = useStore((state) => state.activeTab);
  const selectedIds = useStore((state) => state.selectedIds);

  const filteredItems = filterItemsByTab(items, activeTab, selectedIds);

  if (filteredItems.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No items to display</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredItems.map((item) => (
        <CardItem key={item.id} item={item} />
      ))}
    </div>
  );
}
