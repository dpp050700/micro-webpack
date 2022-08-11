import React from 'react'
import { createRoot } from 'react-dom/client'

import './index.less'

// import Button from 'container/component/button'
const Button = React.lazy(() => import('container/button'))

interface IProps {
  name?: String
}

function App(props: IProps) {
  return (
    <div className='test'>
      {props.name}
      <Button />
    </div>
  )
}

const container = document.getElementById('root')
const root = createRoot(container!) // createRoot(container!) if you use TypeScript

root.render(<App name='home' />)

// ReactDom.render(<App name='1232' />, document.getElementById('root'))
