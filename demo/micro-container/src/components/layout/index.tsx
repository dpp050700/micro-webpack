import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './components/AppLayout'

export default function RenderRoutes({ routes }: any) {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          {routes.map((item: any) => (
            <Route
              path={item.path}
              element={
                <React.Suspense>
                  <item.component />
                </React.Suspense>
              }
              key={item.path}
            />
          ))}
        </Routes>
      </AppLayout>
    </BrowserRouter>
  )
}
