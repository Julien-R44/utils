/**
 * Capitalize the first letter of a string and lowercase the rest
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Generate a random string
 */
const urlAlphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'
export function randomStr(size = 16, dict = urlAlphabet) {
  let id = ''
  let i = size
  const len = dict.length
  while (i--) {
    id += dict[(Math.random() * len) | 0]
  }

  return id
}

/**
 * Ensures the given string starts with the given prefix.
 */
export function ensureStartsWith(prefix: string, str: string) {
  if (str.startsWith(prefix)) return str
  return prefix + str
}
