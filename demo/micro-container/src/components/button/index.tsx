import React from 'react'

import { ITheme } from './type'

interface IButton {
  children?: React.ReactElement
  theme?: ITheme
}

export default function Button({ children, theme }: IButton) {
  return <div>{children || theme?.theme || '按钮'}</div>
}
