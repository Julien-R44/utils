import {
  camelCase as camelCaseBase,
  snakeCase as snakeCaseBase,
  kebabCase as kebabCaseBase,
  pascalCase as pascalCaseBase,
  capitalCase as capitalCaseBase,
} from 'case-anything'

/**
 * Convert string to camelcase
 */
export function camelCase(value: string): string {
  return camelCaseBase(value)
}

/**
 * Convert string to snakecase
 */
export function snakeCase(value: string): string {
  return snakeCaseBase(value)
}

/**
 * Convert string to kebabcase
 */
export function kebabCase(value: string): string {
  return kebabCaseBase(value)
}

/**
 * Convert string to pascalcase
 */
export function pascalCase(value: string): string {
  return pascalCaseBase(value)
}

/**
 * Convert string to capitalcase
 */
export function capitalCase(value: string): string {
  return capitalCaseBase(value)
}
