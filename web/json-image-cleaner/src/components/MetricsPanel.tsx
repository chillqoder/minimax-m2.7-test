'use client';

import { useStore } from '@/store/useStore';

export function MetricsPanel() {
  const getMetrics = useStore((state) => state.getMetrics);
  const setActiveTab = useStore((state) => state.setActiveTab);
  const metrics = getMetrics();

  const metricsConfig = [
    { label: 'Total Items', value: metrics.total, tab: 'all' as const },
    { label: 'No Images', value: metrics.noImages, tab: 'no_images' as const },
    { label: 'At Least One Valid', value: metrics.atLeastOneValid, tab: 'any_valid' as const },
    { label: 'All Valid', value: metrics.allValid, tab: 'all_valid' as const },
    { label: 'Any Broken', value: metrics.anyBroken, tab: 'some_broken' as const },
    { label: 'Selected', value: metrics.selected, tab: 'selected' as const },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      {metricsConfig.map(({ label, value, tab }) => (
        <button
          key={label}
          onClick={() => setActiveTab(tab)}
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-left hover:border-teal-300 transition-colors"
        >
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-sm text-gray-500">{label}</p>
        </button>
      ))}
    </div>
  );
}
