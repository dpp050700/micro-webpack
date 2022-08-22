import React, { lazy, Suspense } from 'react'
import { AppLayout } from 'MicroContainer/components/layout'

const PageOne = lazy(() => import('../pages/pageOne'))
const PageTwo = lazy(() => import('../pages/pageTwo'))

export default [
  {
    path: '/template',
    element: <AppLayout />,
    name: 'projectTemplate',
    children: [
      {
        path: 'page-1',
        element: (
          <Suspense>
            <PageOne />
          </Suspense>
        ),
        name: 'page-1'
      },
      {
        path: 'page-2',
        element: (
          <Suspense>
            <PageTwo />
          </Suspense>
        ),
        name: 'page-2'
      }
    ]
  }
]
