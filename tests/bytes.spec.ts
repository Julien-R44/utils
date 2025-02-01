import { test } from '@japa/runner'

import { bytes } from '../src/string/bytes/index.js'

test.group('Bytes', () => {
  test('throws when incorrect bytes value', ({ assert }) => {
    // @ts-expect-error expected
    assert.throws(() => bytes.format('incorrect'), 'Received invalid bytes value: incorrect')
    assert.throws(() => bytes.parse('incorrect'), 'Received invalid bytes value: incorrect')
  })
})
