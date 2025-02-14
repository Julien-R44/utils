import type { Awaitable, Fn, Nullable } from './types/index.js'

/**
 * Creates a function that is restricted to invoking the provided function `func` once.
 * Repeated calls to the function will return the value from the first invocation.
 */
export function once<F extends () => any>(func: F): F
export function once<F extends (...args: any[]) => void>(func: F): F
export function once<F extends (() => any) | ((...args: any[]) => void)>(func: F): F {
  let called = false
  let cache: ReturnType<F>

  return function (...args: Parameters<F>): ReturnType<F> {
    if (!called) {
      called = true
      cache = func(...args)
    }

    return cache
  } as F
}

/**
 * A no-operation function that does nothing.
 * This can be used as a placeholder or default function.
 */
export function noop(): void {}

/**
 * An asynchronous no-operation function that does nothing.
 * This can be used as a placeholder or default function.
 */
export async function asyncNoop(): Promise<void> {}

/**
 * Just call the function.
 */
export function invoke(fn: undefined): undefined
export function invoke<T>(fn: Fn<T>): T
export function invoke<T>(fn?: Fn<T>): T {
  return fn?.() as T
}

/**
 * Call every function in an array
 */
export function batchInvoke(functions: Nullable<Fn>[]) {
  functions.forEach((fn) => fn && fn())
}

/**
 * Asynchronously tries the specified promise.
 */
export async function tryAsync<T>(fn: Fn<Awaitable<T>>): Promise<[T, null] | [null, Error]> {
  try {
    return [await fn?.(), null]
  } catch (throwable) {
    if (throwable instanceof Error) return [null, throwable]
    throw throwable
  }
}
