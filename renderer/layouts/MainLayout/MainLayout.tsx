import { Layout, theme } from 'antd'
import React, { FC, useState } from 'react'

import { LeftMenu } from '../../components/LeftMenu/LeftMenu'
import { TMainLayoutProps } from './MainLayout.typed'

const { Header, Content, Footer, Sider } = Layout
export const MainLayout: FC<TMainLayoutProps> = ({ children = null }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <LeftMenu />
      </Sider>
      <Layout>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>{children}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>KarateYola ©2023-{(new Date()).getFullYear()} Created by Egor</Footer>
      </Layout>
    </Layout>
  )
}
