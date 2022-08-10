import React from 'react'
import ReactDom from 'react-dom'

interface IProps {
  name?: String
}

function App(props: IProps) {
  return <div>{props.name}</div>
}

ReactDom.render(<App name='1232' />, document.getElementById('root'))
