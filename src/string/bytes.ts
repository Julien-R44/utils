import bytesPkg from 'bytes'
import type { BytesOptions } from 'bytes'

/**
 * Bytes formatter and parser
 */
export const bytes = {
  format(bytes: number, options?: BytesOptions): string {
    const result = bytesPkg.format(bytes, options)

    if (result === null) {
      throw new Error(`Received invalid bytes value: ${bytes}`)
    }

    return result
  },

  parse(value: string | number): number {
    const result = bytesPkg.parse(value)

    if (result === null) {
      throw new Error(`Received invalid bytes value: ${value}`)
    }

    return result
  },
}
