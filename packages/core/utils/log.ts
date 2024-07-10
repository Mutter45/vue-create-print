import { isString } from './index'

class VueToPrintError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'vue-to-print'
  }
}

export function throwError(scope: string, msg: string) {
  throw new VueToPrintError(`[${scope}] ${msg}`)
}

export function debugWarn(error: Error): void
export function debugWarn(scope: string, msg: string): void
export function debugWarn(scope: string | Error, msg?: string) {
  const err = isString(scope) ? new VueToPrintError(`[${scope}] ${msg}`) : scope
  console.warn(err)
  // if (process.env.NODE_ENV !== 'production') {
  //   const err = isString(scope) ? new VueToPrintError(`[${scope}] ${msg}`) : scope
  //   console.warn(err)
  // }
}
