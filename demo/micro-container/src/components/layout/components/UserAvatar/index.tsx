import React from 'react'
import { Avatar, Dropdown, Menu } from '../../../antd'
import style from './index.module.less'

export default function UserAvatar() {
  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: '退出'
        }
      ]}
    />
  )
  return (
    <Dropdown overlay={menu}>
      <div className={style['user-avatar-wrap']}>
        <Avatar src='https://joeschmoe.io/api/v1/random' />
        <span className={style['user-name']}>admin</span>
      </div>
    </Dropdown>
  )
}
