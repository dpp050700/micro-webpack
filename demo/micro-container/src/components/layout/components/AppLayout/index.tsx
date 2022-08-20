import React, { useState } from 'react'
import { Layout } from '@/components/antd'
import Logo from '@/assets/images/logo.png'
import LogoCollapsed from '@/assets/images/logo-collapsed.png'
import { useNavigate } from 'react-router'
import AppHeader from '../AppHeader'
import style from './index.module.less'
import AppMenu from '../AppMenu'

const { Header, Sider, Content, Footer } = Layout

interface IAppLayout {
  children: React.ReactNode
}

export default function AppLayout({ children }: IAppLayout) {
  const [collapsed, setCollapsed] = useState(false)
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }
  const nv = useNavigate()
  return (
    <Layout className={style['app-layout']}>
      <Sider trigger={null} collapsible collapsed={collapsed} className={style['app-sider']}>
        <div className={style['logo-wrap']}>
          <img
            src={collapsed ? LogoCollapsed : Logo}
            alt=''
            className={`${style['logo-img']} ${collapsed ? style['logo-collapsed'] : ''}`}
            onClick={() => {
              nv('/')
            }}
          />
        </div>
        <AppMenu />
      </Sider>
      <Layout>
        <Header className={style['app-header']}>
          <AppHeader collapsed={collapsed} setCollapsed={toggleCollapsed} />
        </Header>
        <Content className={style['app-content']}>{children}</Content>
        <Footer className={style['app-footer']}>Micro Admin By Webpack</Footer>
      </Layout>
    </Layout>
  )
}
