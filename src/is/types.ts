export type Constructor<T, Arguments extends unknown[] = any[]> = new (
  ...arguments_: Arguments
) => T

export type Class<T, Arguments extends unknown[] = any[]> = Constructor<T, Arguments> & {
  prototype: T
}

export type Falsy = false | 0 | 0n | '' | null | undefined
