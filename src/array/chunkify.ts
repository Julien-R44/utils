// Code tweaked from https://github.com/sindresorhus/chunkify/blob/main/index.d.ts MIT License

/**
Split an iterable into evenly sized chunks. The last chunk could be smaller.
 
@param iterable - The iterable to chunkify.
@param chunkSize - The size of the chunks. Integer. Minimum 1.
@returns An iterable with the chunks.
 
@example
```
import chunkify from 'chunkify';
 
console.log([...chunkify([1, 2, 3, 4], 2)]);
//=> [[1, 2], [3, 4]]
 
console.log([...chunkify([1, 2, 3, 4], 3)]);
//=> [[1, 2, 3], [4]]
```
 */
export function chunkify<T>(iterable: Iterable<T>, chunkSize: number) {
  if (typeof iterable[Symbol.iterator] !== 'function') {
    throw new TypeError('Expected an `Iterable` in the first argument')
  }

  if (!(Number.isSafeInteger(chunkSize) && chunkSize > 0)) {
    throw new TypeError(
      `Expected \`chunkSize\` to be an integer from 1 and up, got \`${chunkSize}\``,
    )
  }

  return {
    *[Symbol.iterator]() {
      if (Array.isArray(iterable)) {
        for (let index = 0; index < iterable.length; index += chunkSize) {
          yield iterable.slice(index, index + chunkSize)
        }

        return
      }

      let chunk = []
      for (const value of iterable) {
        chunk.push(value)
        if (chunk.length === chunkSize) {
          yield chunk
          chunk = []
        }
      }

      if (chunk.length > 0) yield chunk
    },
  }
}
