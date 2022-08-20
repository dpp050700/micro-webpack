import React from 'react'
import { createRoot } from 'react-dom/client'

import RenderRouter from '@/components/layout'
// import routes from './routes/index'

// import 'MicroContainer/styles/base'

function App() {
  return <RenderRouter routes={[]} />
}

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(<App />)
