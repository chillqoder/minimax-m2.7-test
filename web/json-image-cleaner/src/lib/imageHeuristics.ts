const IMAGE_EXTENSIONS = /\.(jpe?g|png|gif|webp|avif|bmp)(\?.*)?$/i;

export function isLikelyImageUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;

  const hasHttp = /^https?:\/\//i.test(url);
  if (!hasHttp) return false;

  const hasImageExt = IMAGE_EXTENSIONS.test(url);
  if (hasImageExt) return true;

  return url.length < 200;
}
