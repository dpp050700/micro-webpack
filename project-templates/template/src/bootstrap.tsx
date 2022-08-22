import React from 'react'
import { createRoot } from 'react-dom/client'
import 'MicroContainer/styles/base'

import RenderRouter from 'MicroContainer/components/layout'
import routes from './routes/index'

function App() {
  return <RenderRouter routes={routes} />
}

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(<App />)
