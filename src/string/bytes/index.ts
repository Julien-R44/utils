import bytesPkg from 'bytes'

type Unit = 'b' | 'gb' | 'kb' | 'mb' | 'pb' | 'tb' | 'B' | 'GB' | 'KB' | 'MB' | 'PB' | 'TB'

export interface BytesFormatOptions {
  decimalPlaces?: number | undefined
  fixedDecimals?: boolean | undefined
  thousandsSeparator?: string | undefined
  unit?: Unit | undefined
  unitSeparator?: string | undefined
}

/**
 * Bytes formatter and parser
 */
export const bytes = {
  format(bytes: number, options?: BytesFormatOptions): string {
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
