/**
 * Promise or maybe not
 */
export type Awaitable<T> = T | Promise<T>

/**
 * Array or maybe not
 */
export type Arrayable<T> = T | Array<T>

/**
 * Function. I personally prefer this syntax over the native `Function` type.
 */
export type Fn<Args extends unknown[] = any[], Result = void> = (...args: Args) => Result

/**
 * Constructor type.
 */
export type Constructor<T = any, Arguments extends unknown[] = any[]> = new (
  ...args: Arguments
) => T

/**
 * A class type.
 */
export type Class<T, Arguments extends unknown[] = any[]> = {
  prototype: Pick<T, keyof T>
  new (...args: Arguments): T
}

/**
 * Prettify a type.
 *
 * See https://www.totaltypescript.com/concepts/the-prettify-helper
 */
export type Prettify<T> = { [K in keyof T]: T[K] } & {}
