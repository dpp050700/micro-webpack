import React from 'react'
import { useNavigate } from 'react-router'
import { Menu, UserOutlined } from '@/components/antd'

export default function AppMenu() {
  const navigate = useNavigate()
  const items = [
    {
      key: 'use-list',
      label: '用户列表',
      icon: <UserOutlined />
    },
    {
      key: 'book/list',
      label: '图书列表',
      icon: <UserOutlined />
    },
    {
      key: 'admin-list',
      label: '管理员列表',
      icon: <UserOutlined />
    }
  ]

  const handleMenuClick = (data: any) => {
    console.log(data)
    const path = data.key === 'use-list' ? '' : data.key
    navigate(path)
  }
  return <Menu mode='inline' theme='dark' items={items} onClick={handleMenuClick} />
}
