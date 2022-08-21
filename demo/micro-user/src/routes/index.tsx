import React, { lazy, Suspense } from 'react'
import { AppLayout } from 'MicroContainer/components/layout'
import User from '../pages/userList'

const Admin = lazy(() => import('../pages/adminList'))

export default [
  {
    path: '/user',
    element: <AppLayout />,
    name: 'microUser',
    children: [
      {
        path: 'list',
        element: <User />,
        name: 'user'
      },
      {
        path: 'admin',
        element: (
          <Suspense>
            <Admin />
          </Suspense>
        ),
        name: 'admin'
      }
    ]
  }
]
