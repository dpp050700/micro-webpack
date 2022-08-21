import React from 'react'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import AppLayout from './components/AppLayout'

const Router = ({ routes }: any) => {
  return useRoutes(routes)
}

export default function RenderRoutes({ routes }: any) {
  const appRoutes = [{ path: '/login', element: <div>login</div> }, ...routes, { path: '*', element: <div>404</div> }]
  return (
    <BrowserRouter>
      <Router routes={appRoutes} />
    </BrowserRouter>
  )
}

export { AppLayout }
