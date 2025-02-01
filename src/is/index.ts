import type { Falsy, Class } from './types.js'

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

export function isObject(value: unknown): value is object {
  return !isNull(value) && (typeof value === 'object' || isFunction(value))
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
  undefined: isUndefined,
  null: isNull,
  nullOrUndefined: isNullOrUndefined,
  truthy: isTruthy,
  array: isArray,
  class: isClass,
  positiveNumber: isPositiveNumber,
  falsy: isFalsy,
}
