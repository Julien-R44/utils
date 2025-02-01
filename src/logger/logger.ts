import type { Logger, Levels, LogObject } from './types.js'

class TestLogger implements Logger {
  logs: {
    level: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal'
    msg: any
    obj: any
  }[] = []

  child(): Logger {
    return this
  }

  trace(obj: unknown, msg?: unknown): void {
    this.logs.push({ level: 'trace', msg, obj })
  }

  debug(obj: unknown, msg?: unknown): void {
    this.logs.push({ level: 'debug', msg, obj })
  }

  info(obj: unknown, msg?: unknown): void {
    this.logs.push({ level: 'info', msg, obj })
  }

  warn(obj: unknown, msg?: unknown): void {
    this.logs.push({ level: 'warn', msg, obj })
  }

  error(obj: unknown, msg?: unknown): void {
    this.logs.push({ level: 'error', msg, obj })
  }

  fatal(obj: unknown, msg?: unknown): void {
    this.logs.push({ level: 'fatal', msg, obj })
  }
}

/**
 * A logger that stores all logs in an array.
 * Useful for testing purposes.
 */
export function testLogger() {
  return new TestLogger()
}

/**
 * A logger that does nothing.
 */
export function noopLogger() {
  return {
    trace: () => {},
    debug: () => {},
    info: () => {},
    warn: () => {},
    error: () => {},
    fatal: () => {},
    child: () => noopLogger(),
  }
}

const levelNumber: { [level in Levels]: number } = {
  trace: 0,
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
  fatal: 5,
}

/**
 * A logger that logs to the console.
 */
export function consoleLogger(level: Levels = 'warn', context?: LogObject): Logger {
  const log = (lvl: Levels, ...rest: any[]) => {
    if (levelNumber[level] > levelNumber[lvl]) return
    if (context) return console.log(lvl.toUpperCase(), context, ...rest)

    console.log(lvl.toUpperCase(), ...rest)
  }

  return {
    trace: (...rest: any[]) => log('trace', ...rest),
    debug: (...rest: any[]) => log('debug', ...rest),
    info: (...rest: any[]) => log('info', ...rest),
    warn: (...rest: any[]) => log('warn', ...rest),
    error: (...rest: any[]) => log('error', ...rest),
    fatal: (...rest: any[]) => log('fatal', ...rest),
    child: (childObj: LogObject) =>
      consoleLogger(level, context ? { ...context, ...childObj } : { ...childObj }),
  }
}
