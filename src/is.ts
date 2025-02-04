/**
 * Simplified version of https://github.com/sindresorhus/is since
 * I generally only use a few of the functions.
 */

import type { Class } from './types/index.js'

type Falsy = false | 0 | 0n | '' | null | undefined

export function isBoolean(val: any): val is boolean {
  return typeof val === 'boolean'
}

export function isNumber(val: any): val is number {
  return typeof val === 'number'
}
export function isString(val: unknown): val is string {
  return typeof val === 'string'
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function isFunction(value: unknown): value is Function {
  return typeof value === 'function'
}

/**
 * Keep in mind arrays and functions are objects.
 * So maybe you want to use isPlainObject instead.
 */
export function isObject(value: unknown): value is object {
  return !isNull(value) && (typeof value === 'object' || isFunction(value))
}

/**
 * Returns true if the value was creating using `{}`, `new Object()`, or `Object.create(null)`.
 */
export function isPlainObject<Value = unknown>(
  value: unknown,
): value is Record<PropertyKey, Value> {
  if (typeof value !== 'object' || value === null) return false
  const prototype = Object.getPrototypeOf(value)

  return (
    (prototype === null ||
      prototype === Object.prototype ||
      Object.getPrototypeOf(prototype) === null) &&
    !(Symbol.toStringTag in value) &&
    !(Symbol.iterator in value)
  )
}

export function isUndefined(value: unknown): value is undefined {
  return value === undefined
}

export function isNull(value: unknown): value is null {
  return value === null
}

export function isNullOrUndefined(value: unknown): value is null | undefined {
  return isNull(value) || isUndefined(value)
}

/**
 * Returns false if the value is false, 0, '', null, or undefined.
 */
export function isTruthy<T>(value: T | Falsy): value is T {
  return Boolean(value)
}

function isArray<T = unknown>(value: unknown, assertion?: (value: T) => value is T): value is T[] {
  if (!Array.isArray(value)) return false
  if (!isFunction(assertion)) return true

  return value.every((element) => assertion(element))
}

function isClass<T = unknown>(value: unknown): value is Class<T> {
  return isFunction(value) && value.toString().startsWith('class ')
}

export function isPositiveNumber(value: unknown): value is number {
  return isNumber(value) && value > 0
}

/**
 * Returns true if the value is false, 0, '', null, or undefined.
 */
export function isFalsy(value: unknown): value is Falsy {
  return !value
}

export const is = {
  boolean: isBoolean,
  number: isNumber,
  string: isString,
  function: isFunction,
  object: isObject,
  plainObject: isPlainObject,
  undefined: isUndefined,
  null: isNull,
  nullOrUndefined: isNullOrUndefined,
  truthy: isTruthy,
  array: isArray,
  class: isClass,
  positiveNumber: isPositiveNumber,
  falsy: isFalsy,
}
