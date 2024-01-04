import { Layout, theme } from 'antd'
import React, { FC } from 'react'

import { LeftMenu } from '../../components/LeftMenu/LeftMenu'
import { TMainLayoutProps } from './MainLayout.typed'

const { Header, Content, Footer, Sider } = Layout
export const MainLayout: FC<TMainLayoutProps> = ({ children = null }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken)
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type)
        }}
      >
        <div className="demo-logo-vertical" />
        <LeftMenu />
      </Sider>
      <Layout>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>{children}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>KarateYola ©2023 Created by Egor</Footer>
      </Layout>
    </Layout>
  )
}
