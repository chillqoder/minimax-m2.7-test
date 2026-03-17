import { describe, it, expect } from 'vitest';
import { isLikelyImageUrl } from '../imageHeuristics';

describe('isLikelyImageUrl', () => {
  it('should return true for http URLs with image extensions', () => {
    expect(isLikelyImageUrl('http://example.com/image.jpg')).toBe(true);
    expect(isLikelyImageUrl('https://example.com/image.png')).toBe(true);
    expect(isLikelyImageUrl('http://example.com/image.jpeg')).toBe(true);
    expect(isLikelyImageUrl('https://example.com/image.gif')).toBe(true);
    expect(isLikelyImageUrl('http://example.com/image.webp')).toBe(true);
    expect(isLikelyImageUrl('https://example.com/image.avif')).toBe(true);
    expect(isLikelyImageUrl('http://example.com/image.bmp')).toBe(true);
  });

  it('should return true for URLs with query strings', () => {
    expect(isLikelyImageUrl('http://example.com/image.jpg?v=1')).toBe(true);
    expect(isLikelyImageUrl('https://example.com/image.png?size=large')).toBe(true);
  });

  it('should return true for http URLs without extension but short length', () => {
    expect(isLikelyImageUrl('http://example.com/img')).toBe(true);
  });

  it('should return false for http URLs without extension and long length', () => {
    const longUrl = 'http://example.com/some/very/long/path/that/is/longer/than/200/characters/which/makes/it/unlikely/to/be/an/image/and/this/one/is/definitely/more/than/200/characters/long/to/ensure/it/fails/the/length/check';
    expect(longUrl.length).toBeGreaterThan(200);
    expect(isLikelyImageUrl(longUrl)).toBe(false);
  });

  it('should return false for non-http URLs', () => {
    expect(isLikelyImageUrl('ftp://example.com/image.jpg')).toBe(false);
    expect(isLikelyImageUrl('file:///path/to/image.jpg')).toBe(false);
    expect(isLikelyImageUrl('/path/to/image.jpg')).toBe(false);
  });

  it('should return false for non-URL strings', () => {
    expect(isLikelyImageUrl('not a url')).toBe(false);
    expect(isLikelyImageUrl('')).toBe(false);
    expect(isLikelyImageUrl('image.jpg')).toBe(false);
  });

  it('should handle null/undefined', () => {
    expect(isLikelyImageUrl(null as unknown as string)).toBe(false);
    expect(isLikelyImageUrl(undefined as unknown as string)).toBe(false);
  });
});
