/**
 * Converts a value to an array. If the value is already an array, it is returned as is
 */
export function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value]
}
