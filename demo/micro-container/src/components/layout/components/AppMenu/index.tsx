import React from 'react'
import { useNavigate } from 'react-router'
import { Menu, UserOutlined } from '@/components/antd'

export default function AppMenu() {
  const navigate = useNavigate()
  const items = [
    {
      key: '/user/list',
      label: '用户列表',
      icon: <UserOutlined />
    },
    {
      key: '/book/list',
      label: '图书列表',
      icon: <UserOutlined />
    },
    {
      key: '/user/admin',
      label: '管理员列表',
      icon: <UserOutlined />
    }
  ]

  const handleMenuClick = (data: any) => {
    // const path = data.key === '/user/list' ? '' : data.key
    navigate(data.key)
  }
  return <Menu mode='inline' theme='dark' items={items} onClick={handleMenuClick} />
}
