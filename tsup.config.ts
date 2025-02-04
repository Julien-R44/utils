import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    './src/is.ts',
    './src/misc.ts',
    './src/types.ts',
    './src/object.ts',
    './src/functions.ts',
    './src/string/ms.ts',
    './src/string/case.ts',
    './src/array/index.ts',
    './src/logger/index.ts',
    './src/string/bytes.ts',
    './src/string/index.ts',
    './src/array/chunkify.ts',
  ],
  outDir: './build/src',
  clean: true,
  format: 'esm',
  dts: false,
  sourcemap: false,
  target: 'esnext',
})
