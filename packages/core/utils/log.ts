import { isString } from 'lodash-es'

class VueCreatePrintError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'vue-create-print'
  }
}

export function throwError(scope: string, msg: string) {
  throw new VueCreatePrintError(`[${scope}] ${msg}`)
}

export function debugWarn(error: Error): void
export function debugWarn(scope: string, msg: string): void
export function debugWarn(scope: string | Error, msg?: string) {
  const err = isString(scope) ? new VueCreatePrintError(`[${scope}] ${msg}`) : scope
  console.warn(err)
  // if (process.env.NODE_ENV !== 'production') {
  //   const err = isString(scope) ? new VueCreatePrintError(`[${scope}] ${msg}`) : scope
  //   console.warn(err)
  // }
}
