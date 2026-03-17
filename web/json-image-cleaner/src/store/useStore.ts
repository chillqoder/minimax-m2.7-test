import { create } from 'zustand';
import { ParsedItem, FilterTab, ValidationCache, ImageStatus } from '@/types';
import { parseJSON } from '@/lib/jsonParser';
import { validateImagesWithConcurrency } from '@/lib/imageValidator';
import { format } from 'date-fns';

interface StoreState {
  items: ParsedItem[];
  validationCache: ValidationCache;
  selectedIds: Set<string>;
  activeTab: FilterTab;
  isValidating: boolean;
  validationProgress: { completed: number; total: number };
  error: string | null;

  loadJson: (content: string) => void;
  validateImages: () => Promise<void>;
  setActiveTab: (tab: FilterTab) => void;
  toggleSelection: (id: string) => void;
  selectAllOnTab: () => void;
  selectAllWithValidImages: () => void;
  selectAllWithOnlyValidImages: () => void;
  deselectAll: () => void;
  invertSelection: () => void;
  rescanImages: () => Promise<void>;
  getFilteredItems: () => ParsedItem[];
  getMetrics: () => {
    total: number;
    noImages: number;
    atLeastOneValid: number;
    allValid: number;
    anyBroken: number;
    selected: number;
  };
  exportSelected: () => void;
  exportFiltered: () => void;
}

function updateItemStatuses(items: ParsedItem[], cache: ValidationCache): ParsedItem[] {
  return items.map((item) => {
    const images = item.imageCandidates.map((url) => {
      const status = cache[url];
      return {
        url,
        status: status ? (status as ImageStatus) : 'pending',
      };
    });

    const validCount = images.filter((img) => img.status === 'valid').length;
    const brokenCount = images.filter((img) => img.status === 'broken').length;
    const total = images.length;

    let status: ParsedItem['status'] = 'no_images';
    if (total > 0) {
      if (brokenCount === 0 && validCount > 0) status = 'all_valid';
      else if (brokenCount === total) status = 'all_broken';
      else if (validCount > 0 && brokenCount > 0) status = 'some_broken';
      else if (validCount > 0) status = 'any_valid';
    }

    return { ...item, images, status };
  });
}

export function filterItemsByTab(items: ParsedItem[], activeTab: FilterTab, selectedIds: Set<string>): ParsedItem[] {
  switch (activeTab) {
    case 'all':
      return items;
    case 'all_valid':
      return items.filter((item) => item.status === 'all_valid');
    case 'any_valid':
      return items.filter((item) => item.status === 'any_valid');
    case 'some_broken':
      return items.filter((item) => item.status === 'some_broken');
    case 'all_broken':
      return items.filter((item) => item.status === 'all_broken');
    case 'no_images':
      return items.filter((item) => item.status === 'no_images');
    case 'selected':
      return items.filter((item) => selectedIds.has(item.id));
    default:
      return items;
  }
}

export const useStore = create<StoreState>((set, get) => ({
  items: [],
  validationCache: {},
  selectedIds: new Set(),
  activeTab: 'all',
  isValidating: false,
  validationProgress: { completed: 0, total: 0 },
  error: null,

  loadJson: (content: string) => {
    const result = parseJSON(content);
    if (result.error) {
      set({ error: result.error, items: [] });
      return;
    }
    set({ items: result.items, error: null, selectedIds: new Set() });
  },

  validateImages: async () => {
    const { items, validationCache } = get();
    const allUrls = [...new Set(items.flatMap((item) => item.imageCandidates))];
    
    set({ isValidating: true, validationProgress: { completed: 0, total: allUrls.length } });

    const updatedCache = await validateImagesWithConcurrency(
      allUrls,
      new Map(Object.entries(validationCache)),
      8,
      (completed, total) => {
        set({ validationProgress: { completed, total } });
      }
    );

    const newCache: ValidationCache = Object.fromEntries(updatedCache);
    const updatedItems = updateItemStatuses(items, newCache);

    set({
      items: updatedItems,
      validationCache: newCache,
      isValidating: false,
    });
  },

  setActiveTab: (tab: FilterTab) => set({ activeTab: tab }),

  toggleSelection: (id: string) => {
    const { selectedIds } = get();
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    set({ selectedIds: newSelected });
  },

  selectAllOnTab: () => {
    const filtered = get().getFilteredItems();
    const newSelected = new Set(filtered.map((item) => item.id));
    set({ selectedIds: newSelected });
  },

  selectAllWithValidImages: () => {
    const { items } = get();
    const newSelected = new Set(
      items.filter((item) => item.status === 'any_valid' || item.status === 'all_valid').map((item) => item.id)
    );
    set({ selectedIds: newSelected });
  },

  selectAllWithOnlyValidImages: () => {
    const { items } = get();
    const newSelected = new Set(
      items.filter((item) => item.status === 'all_valid').map((item) => item.id)
    );
    set({ selectedIds: newSelected });
  },

  deselectAll: () => set({ selectedIds: new Set() }),

  invertSelection: () => {
    const { items, selectedIds } = get();
    const newSelected = new Set(
      items.filter((item) => !selectedIds.has(item.id)).map((item) => item.id)
    );
    set({ selectedIds: newSelected });
  },

  rescanImages: async () => {
    const { items } = get();
    const itemsWithResetImages = items.map((item) => ({
      ...item,
      images: item.images.map((img) => ({ ...img, status: 'pending' as ImageStatus })),
    }));
    set({ items: itemsWithResetImages, validationCache: {} });
    await get().validateImages();
  },

  getFilteredItems: () => {
    const { items, activeTab, selectedIds } = get();
    return filterItemsByTab(items, activeTab, selectedIds);
  },

  getMetrics: () => {
    const { items, selectedIds } = get();
    return {
      total: items.length,
      noImages: items.filter((item) => item.status === 'no_images').length,
      atLeastOneValid: items.filter((item) => item.status === 'any_valid' || item.status === 'all_valid').length,
      allValid: items.filter((item) => item.status === 'all_valid').length,
      anyBroken: items.filter((item) => item.status === 'some_broken' || item.status === 'all_broken').length,
      selected: selectedIds.size,
    };
  },

  exportSelected: () => {
    const { items, selectedIds } = get();
    const selectedItems = items.filter((item) => selectedIds.has(item.id));
    downloadJSON(selectedItems.map((item) => item.original));
  },

  exportFiltered: () => {
    const filtered = get().getFilteredItems();
    downloadJSON(filtered.map((item) => item.original));
  },
}));

function downloadJSON(data: Record<string, unknown>[]) {
  const content = JSON.stringify(data, null, 2);
  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const date = format(new Date(), 'yyyyMMdd');
  a.href = url;
  a.download = `json-image-cleaner-${date}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
