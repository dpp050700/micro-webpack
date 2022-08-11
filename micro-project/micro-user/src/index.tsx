import React from 'react'
import ReactDom from 'react-dom'
import './index.less'

interface IProps {
  name?: String
}

function App(props: IProps) {
  return <div className='test'>{props.name}</div>
}

ReactDom.render(<App name='1232' />, document.getElementById('root'))
