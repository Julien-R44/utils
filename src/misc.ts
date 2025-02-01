import { setTimeout } from 'node:timers/promises'
/**
 * Useful for creating a return value that can be destructured
 * or iterated over.
 *
 * See : https://antfu.me/posts/destructuring-with-object-or-array
 */
export function hybridReturn<T extends Record<string, unknown>, A extends readonly any[]>(
  obj: T,
  arr: A,
): T & A {
  const clone = { ...obj }

  Object.defineProperty(clone, Symbol.iterator, {
    enumerable: false,
    value() {
      let index = 0
      return { next: () => ({ value: arr[index++], done: index > arr.length }) }
    },
  })

  return clone as T & A
}

/**
 * Just a simple sleep function. Allows to be more
 * easily auto-imported through the VSCode suggestions
 * since `setTimeout` import the non-awaitable version
 */
export async function sleep(ms: number) {
  return await setTimeout(ms)
}
