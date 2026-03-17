import { describe, it, expect } from 'vitest';
import { findAllStrings } from '../findAllStrings';

describe('findAllStrings', () => {
  it('should find strings in a simple object', () => {
    const obj = { name: 'John', age: 30 };
    const result = findAllStrings(obj);
    expect(result).toEqual([{ value: 'John', path: 'name' }]);
  });

  it('should find strings in nested objects', () => {
    const obj = {
      user: {
        name: 'John',
        address: {
          city: 'NYC'
        }
      }
    };
    const result = findAllStrings(obj);
    expect(result).toEqual([
      { value: 'John', path: 'user.name' },
      { value: 'NYC', path: 'user.address.city' }
    ]);
  });

  it('should find strings in arrays', () => {
    const obj = {
      items: ['apple', 'banana']
    };
    const result = findAllStrings(obj);
    expect(result).toEqual([
      { value: 'apple', path: 'items[0]' },
      { value: 'banana', path: 'items[1]' }
    ]);
  });

  it('should handle mixed arrays', () => {
    const obj = {
      data: [1, 'text', true, null, { key: 'value' }]
    };
    const result = findAllStrings(obj);
    expect(result).toEqual([
      { value: 'text', path: 'data[1]' },
      { value: 'value', path: 'data[4].key' }
    ]);
  });

  it('should return empty array for null/undefined', () => {
    expect(findAllStrings(null)).toEqual([]);
    expect(findAllStrings(undefined)).toEqual([]);
  });

  it('should return empty array for primitives', () => {
    expect(findAllStrings('hello')).toEqual([{ value: 'hello', path: '' }]);
    expect(findAllStrings(42)).toEqual([]);
    expect(findAllStrings(true)).toEqual([]);
  });

  it('should handle deeply nested structures', () => {
    const obj = {
      level1: {
        level2: {
          level3: {
            text: 'deep'
          }
        }
      }
    };
    const result = findAllStrings(obj);
    expect(result).toEqual([{ value: 'deep', path: 'level1.level2.level3.text' }]);
  });
});
