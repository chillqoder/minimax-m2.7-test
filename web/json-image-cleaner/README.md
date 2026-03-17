# JSON Image Cleaner

A single-page Next.js application that validates image URLs in JSON files entirely in the browser (client-side only, no backend, no external APIs).

## Features

- **JSON Upload**: Drag & drop or file input with automatic array detection
- **Image URL Detection**: Recursive traversal with heuristics for image URLs
- **Image Validation**: Client-side validation with 8s timeout and concurrency control
- **Card Rendering**: Visual previews with status indicators
- **Filtering**: Tabs for All, All Valid, Any Valid, Some Broken, All Broken, No Images, Selected
- **Bulk Selection**: Select/deselect with various criteria
- **Export**: Download filtered/selected items as JSON

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run unit tests

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Zustand (state management)
- react-dropzone (file upload)
- date-fns (date formatting)

## Project Structure

```
src/
├── app/               # Next.js app router pages
├── components/        # React components
├── lib/              # Core utilities
│   ├── findAllStrings.ts
│   ├── imageHeuristics.ts
│   ├── imageValidator.ts
│   └── jsonParser.ts
├── store/            # Zustand store
└── types/            # TypeScript types
```

## Usage

1. Upload a JSON file (drag & drop or click to select)
2. Click "Validate Images" to check all image URLs
3. Use tabs to filter by validation status
4. Select items and download filtered results
