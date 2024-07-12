export const isString = (value: any): value is string => typeof value === 'string'
export const isObject = (value: any): value is object => typeof value === 'object' && value !== null
// eslint-disable-next-line ts/no-unsafe-function-type
export const isFunction = (value: any): value is Function => typeof value === 'function'
