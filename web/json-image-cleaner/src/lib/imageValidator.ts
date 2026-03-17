export type ValidationResult = 'valid' | 'broken';

export async function validateImage(
  url: string,
  timeoutMs = 8000
): Promise<ValidationResult> {
  return new Promise((resolve) => {
    const img = new Image();
    let done = false;

    const timer = setTimeout(() => {
      if (!done) {
        done = true;
        resolve('broken');
      }
    }, timeoutMs);

    img.onload = () => {
      if (!done) {
        done = true;
        clearTimeout(timer);
        resolve('valid');
      }
    };

    img.onerror = () => {
      if (!done) {
        done = true;
        clearTimeout(timer);
        resolve('broken');
      }
    };

    img.src = url;
  });
}

export class Semaphore {
  private queue: Array<() => void> = [];
  private running = 0;

  constructor(private readonly maxConcurrent: number) {}

  async acquire(): Promise<void> {
    if (this.running < this.maxConcurrent) {
      this.running++;
      return Promise.resolve();
    }

    return new Promise<void>((resolve) => {
      this.queue.push(() => {
        this.running++;
        resolve();
      });
    });
  }

  release(): void {
    this.running--;
    const next = this.queue.shift();
    if (next) {
      next();
    }
  }

  async run<T>(fn: () => Promise<T>): Promise<T> {
    await this.acquire();
    try {
      return await fn();
    } finally {
      this.release();
    }
  }
}

export async function validateImagesWithConcurrency(
  urls: string[],
  cache: Map<string, 'valid' | 'broken'>,
  concurrency = 8,
  onProgress?: (completed: number, total: number) => void
): Promise<Map<string, 'valid' | 'broken'>> {
  const semaphore = new Semaphore(concurrency);
  const uncachedUrls = urls.filter((url) => !cache.has(url));
  let completed = 0;
  const total = uncachedUrls.length;

  const promises = uncachedUrls.map((url) =>
    semaphore.run(async () => {
      const result = await validateImage(url);
      cache.set(url, result);
      completed++;
      onProgress?.(completed, total);
      return result;
    })
  );

  await Promise.all(promises);
  return cache;
}
