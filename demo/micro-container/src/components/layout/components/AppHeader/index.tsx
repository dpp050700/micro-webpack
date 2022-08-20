import React from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '../../../antd'
import style from './index.module.less'
import UserAvatar from '../UserAvatar'

interface IAppHeader {
  collapsed: boolean
  setCollapsed: () => void
}

function AppHeader({ collapsed, setCollapsed }: IAppHeader) {
  return (
    <div className={style['header-wrap']}>
      <div className={style.collapsed} onClick={setCollapsed}>
        {collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
      </div>
      <UserAvatar />
    </div>
  )
}

export default AppHeader
