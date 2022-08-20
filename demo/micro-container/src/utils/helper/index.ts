import { APPID } from '../constant'

export const add = (a: number, b: number) => {
  return a + b + APPID
}

export const consoleFn = (content: string, type: 'log' | 'warn' = 'log') => {
  const fn = console[type]
  fn(content)
}
