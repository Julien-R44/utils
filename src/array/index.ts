/**
 * Converts a value to an array. If the value is already an array, it is returned as is
 */
export function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value]
}

/**
 * Returns a new array containing only the unique elements from the original array,
 * based on the values returned by the mapper function.
 */
export function uniqBy<T, U>(arr: readonly T[], mapper: (item: T) => U): T[] {
  const map = new Map<U, T>()
  for (const item of arr) {
    const key = mapper(item)
    if (!map.has(key)) map.set(key, item)
  }

  return Array.from(map.values())
}

/**
 * Creates a duplicate-free version of an array.
 */
export function uniq<T>(arr: readonly T[]): T[] {
  return Array.from(new Set(arr))
}
