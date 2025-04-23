/**
 * Map over all the keys to create a new object.
 *
 * @example
 * ```ts
 * const products = { banana: 1.2, apple: 2.3, orange: 3.4 }
 * mapEntries(products, (key, value) => [key.toUpperCase(), value * 2])
 * // => { BANANA: 2.4, APPLE: 4.6, ORANGE: 6.8 }
 * ```
 */
export function mapEntries<
  TKey extends string | number | symbol,
  TValue,
  TNewKey extends string | number | symbol,
  TNewValue,
>(
  obj: Record<TKey, TValue>,
  toEntry: (key: TKey, value: TValue) => [TNewKey, TNewValue],
): Record<TNewKey, TNewValue> {
  if (!obj) return {} as Record<TNewKey, TNewValue>

  return Object.entries(obj).reduce(
    (acc, [key, value]) => {
      const [newKey, newValue] = toEntry(key as TKey, value as TValue)
      acc[newKey] = newValue

      return acc
    },
    {} as Record<TNewKey, TNewValue>,
  )
}

/**
 * Map over all the keys of an object to return a new object.
 *
 * @example
 * ```ts
 * const a = { a: 1, b: 2, c: 3 }
 * mapKeys(a, (key, value) => key + value)
 * ```
 */
export function mapKeys<
  TValue,
  TKey extends string | number | symbol,
  TNewKey extends string | number | symbol,
>(
  obj: Record<TKey, TValue>,
  mapFunc: (key: TKey, value: TValue) => TNewKey,
): Record<TNewKey, TValue> {
  const keys = Object.keys(obj) as TKey[]
  return keys.reduce(
    (acc, key) => {
      acc[mapFunc(key as TKey, obj[key])] = obj[key]
      return acc
    },
    {} as Record<TNewKey, TValue>,
  )
}

/**
 * Map over all the keys to create a new object.
 *
 * @example
 * ```ts
 * const a = { a: 1, b: 2, c: 3 }
 * mapValues(a, (value, key) => value * 2)
 * ```
 */
export function mapValues<T extends object, U>(
  obj: T,
  mapFunc: (value: Required<T>[keyof T], key: keyof T) => U,
): { [K in keyof T]: U } {
  return (Object.keys(obj) as (keyof T)[]).reduce(
    (acc, key) => {
      acc[key] = mapFunc(obj[key], key)
      return acc
    },
    {} as { [K in keyof T]: U },
  )
}

/**
 * Creates a new object composed of the picked object properties.
 *
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * const result = pick(obj, ['a', 'c']);
 * // result will be { a: 1, c: 3 }
 */
export function pick<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: readonly K[],
): Pick<T, K> {
  const result = {} as Pick<T, K>

  for (const key of keys) {
    if (Object.hasOwn(obj, key)) {
      result[key] = obj[key]
    }
  }

  return result
}

/**
 * Creates a new object composed of the properties that satisfy the predicate function
 *
 * @example
 * const obj = { a: 1, b: 'pick', c: 3 };
 * const result = pickBy(obj, (value) => typeof value === 'string');
 * // result will be { b: 'pick' }
 */
export function pickBy<T extends Record<string, any>>(
  obj: T,
  shouldPick: (value: T[keyof T], key: keyof T) => boolean,
): Partial<T> {
  const result: Partial<T> = {}

  const keys = Object.keys(obj) as Array<keyof T>
  for (const key of keys) {
    const value = obj[key]

    if (shouldPick(value, key)) {
      result[key] = value
    }
  }

  return result
}

/**
 * Creates a new object with specified keys omitted.
 */
export function omit<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: readonly K[],
): Omit<T, K> {
  const result = { ...obj }

  for (const key of keys) {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete result[key]
  }

  return result as Omit<T, K>
}

/**
 * Creates a new object composed of the properties that do not satisfy the predicate function
 */
export function omitBy<T extends Record<string, any>>(
  obj: T,
  shouldOmit: (value: T[keyof T], key: keyof T) => boolean,
): Partial<T> {
  const result: Partial<T> = {}

  const keys = Object.keys(obj) as Array<keyof T>

  for (const key of keys) {
    const value = obj[key]
    if (!shouldOmit(value, key)) result[key] = value
  }

  return result
}


/**
 * Dynamically get a nested value from an array or object with a
 * string.
 *
 * @example
 * ```ts
 * const person = {
 *   name: 'John',
 *   friends: [{ name: 'Jane' }]
 * }
 *
 * get(person, 'friends[0].name')
 * // => 'Jane'
 * ```
 */
export function get<TDefault = unknown>(
  value: any,
  path: string,
  defaultValue?: TDefault,
): TDefault {
  const segments = path.split(/[\.\[\]]/g)
  let current: any = value

  for (const key of segments) {
    if (current === null) return defaultValue as TDefault
    if (current === undefined) return defaultValue as TDefault

    const unquotedKey = key.replace(/['"]/g, '')
    if (unquotedKey.trim() === '') continue

    current = current[unquotedKey]
  }

  if (current === undefined) return defaultValue as TDefault

  return current
}
