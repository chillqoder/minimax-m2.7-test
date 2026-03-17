import { findAllStrings } from './findAllStrings';
import { isLikelyImageUrl } from './imageHeuristics';
import { ParsedItem, ImageCandidate, ItemStatus } from '@/types';

export interface ParseResult {
  items: ParsedItem[];
  error?: string;
}

function getTitle(obj: Record<string, unknown>, index: number): string {
  if (obj.title && typeof obj.title === 'string') return obj.title;
  if (obj.name && typeof obj.name === 'string') return obj.name;
  if (obj.id !== undefined) return String(obj.id);
  return `#${index + 1}`;
}

function calculateStatus(images: ImageCandidate[]): ItemStatus {
  if (images.length === 0) return 'no_images';

  const validCount = images.filter((img) => img.status === 'valid').length;
  const brokenCount = images.filter((img) => img.status === 'broken').length;

  if (brokenCount === 0 && validCount > 0) return 'all_valid';
  if (brokenCount === images.length) return 'all_broken';
  if (validCount > 0 && brokenCount > 0) return 'some_broken';
  if (validCount > 0) return 'any_valid';

  return 'no_images';
}

export function parseJSON(content: string): ParseResult {
  let parsed: unknown;

  try {
    parsed = JSON.parse(content);
  } catch {
    return { items: [], error: 'Invalid JSON format' };
  }

  let arrayData: Record<string, unknown>[] = [];

  if (Array.isArray(parsed)) {
    arrayData = parsed;
  } else if (typeof parsed === 'object' && parsed !== null) {
    const entries = Object.entries(parsed as Record<string, unknown>);
    const arrayEntries = entries.filter(([, value]) => Array.isArray(value));

    if (arrayEntries.length === 1) {
      arrayData = arrayEntries[0][1] as Record<string, unknown>[];
    } else if (arrayEntries.length > 1) {
      return {
        items: [],
        error: `Multiple arrays found. Please specify path. Arrays: ${arrayEntries.map(([k]) => k).join(', ')}`,
      };
    } else {
      return { items: [], error: 'No array found in JSON' };
    }
  } else {
    return { items: [], error: 'JSON must be an array or object' };
  }

  if (!arrayData.every((item) => typeof item === 'object' && item !== null && !Array.isArray(item))) {
    return { items: [], error: 'All array items must be objects' };
  }

  const items: ParsedItem[] = arrayData.map((obj, index) => {
    const strings = findAllStrings(obj);
    const imageCandidates = strings
      .map((s) => s.value)
      .filter(isLikelyImageUrl);

    const images: ImageCandidate[] = imageCandidates.map((url) => ({
      url,
      status: 'pending',
    }));

    return {
      id: `item-${index}`,
      index,
      original: obj,
      imageCandidates,
      images,
      status: calculateStatus(images),
      title: getTitle(obj, index),
    };
  });

  return { items };
}
