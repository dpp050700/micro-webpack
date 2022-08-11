export const add = (a: number, b: number) => {
  return a + b
}

export const consoleFn = (content: string, type: 'log' | 'warn' = 'log') => {
  const fn = console[type]
  fn(content)
}
