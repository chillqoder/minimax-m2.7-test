'use client';

import { useStore } from '@/store/useStore';
import { UploadPanel } from '@/components/UploadPanel';
import { TabsBar } from '@/components/TabsBar';
import { MetricsPanel } from '@/components/MetricsPanel';
import { ValidationProgress } from '@/components/ValidationProgress';
import { CardsGrid } from '@/components/CardsGrid';
import { ActionBar } from '@/components/ActionBar';

export default function Home() {
  const items = useStore((state) => state.items);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold text-gray-900">JSON Image Cleaner</h1>
          <p className="text-sm text-gray-500">Validate and clean image URLs in your JSON files</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 pb-24">
        <UploadPanel />

        {items.length > 0 && (
          <>
            <MetricsPanel />
            <ValidationProgress />
            <TabsBar />
            <CardsGrid />
          </>
        )}
      </main>

      {items.length > 0 && <ActionBar />}
    </div>
  );
}
