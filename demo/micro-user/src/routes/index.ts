import { lazy } from 'react'
import User from '../pages/userList'
// import Admin from '../pages/adminList'

export default [
  {
    path: '/',
    // component: lazy(() => import('../pages/userList')),
    component: User,
    name: 'user'
  },
  {
    path: '/admin-list',
    // component: Admin,
    component: lazy(() => import('../pages/adminList')),
    name: 'admin'
  }
]
