const MESSAGE_PREFIX = '[vue-create-print]:'
class VueCreatePrintError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'vue-create-print'
  }
}

export function throwError(msg: string) {
  throw new VueCreatePrintError(`${MESSAGE_PREFIX} ${msg}`)
}
export function createLogMessages(suppressErrors: boolean = false) {
  return suppressErrors ? () => {} : logMessages
}
export function logMessages(messages: unknown[], level: 'error' | 'warning' | 'debug' = 'error') {
  if (process.env.NODE_ENV === 'development') {
    const logMessages = messages.map(msg => `${MESSAGE_PREFIX} ${msg}`).join('\n')
    if (level === 'error') {
      console.error(logMessages)
    }
    else if (level === 'warning') {
      console.warn(logMessages)
    }
    else if (level === 'debug') {
      // eslint-disable-next-line no-console
      console.debug(logMessages)
    }
  }
}
