'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useStore } from '@/store/useStore';

export function UploadPanel() {
  const loadJson = useStore((state) => state.loadJson);
  const error = useStore((state) => state.error);
  const items = useStore((state) => state.items);
  const validateImages = useStore((state) => state.validateImages);
  const isValidating = useStore((state) => state.isValidating);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        loadJson(content);
      };
      reader.readAsText(file);
    },
    [loadJson]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/json': ['.json'] },
    multiple: false,
  });

  const handleValidate = async () => {
    await validateImages();
  };

  return (
    <div className="mb-8">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-teal-500 bg-teal-50'
            : 'border-gray-300 hover:border-teal-400 hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-teal-600 font-medium">Drop the JSON file here...</p>
        ) : (
          <>
            <p className="text-gray-600 mb-2">
              Drag & drop a JSON file here, or click to select
            </p>
            <p className="text-sm text-gray-400">Only .json files are accepted</p>
          </>
        )}
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {items.length > 0 && !isValidating && (
        <button
          onClick={handleValidate}
          className="mt-4 px-6 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors"
        >
          Validate Images
        </button>
      )}
    </div>
  );
}
