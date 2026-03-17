export interface StringResult {
  value: string;
  path: string;
}

export function findAllStrings(obj: unknown, path = ''): StringResult[] {
  const results: StringResult[] = [];

  if (obj === null || obj === undefined) {
    return results;
  }

  if (typeof obj === 'string') {
    results.push({ value: obj, path });
    return results;
  }

  if (typeof obj === 'number' || typeof obj === 'boolean') {
    return results;
  }

  if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      results.push(...findAllStrings(item, `${path}[${index}]`));
    });
    return results;
  }

  if (typeof obj === 'object') {
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      const newPath = path ? `${path}.${key}` : key;
      results.push(...findAllStrings(value, newPath));
    }
    return results;
  }

  return results;
}
