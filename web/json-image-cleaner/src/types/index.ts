export type ImageStatus = 'valid' | 'broken' | 'loading' | 'pending';

export interface ImageCandidate {
  url: string;
  status: ImageStatus;
}

export type ItemStatus = 'all_valid' | 'any_valid' | 'all_broken' | 'some_broken' | 'no_images';

export interface ParsedItem {
  id: string;
  index: number;
  original: Record<string, unknown>;
  imageCandidates: string[];
  images: ImageCandidate[];
  status: ItemStatus;
  title: string;
}

export type FilterTab = 'all' | 'all_valid' | 'any_valid' | 'some_broken' | 'all_broken' | 'no_images' | 'selected';

export interface ValidationCache {
  [url: string]: 'valid' | 'broken';
}
