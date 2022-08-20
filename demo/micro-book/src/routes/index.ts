import { lazy } from 'react'

export default [
  {
    path: '/book/list',
    component: lazy(() => import('../pages/bookList')),
    name: 'bookList'
  },
  {
    path: '/book-category',
    component: lazy(() => import('../pages/categoryList')),
    name: 'bookCategory'
  }
]
