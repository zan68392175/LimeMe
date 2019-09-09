import React from 'react';
import { connect } from 'dva';
import { Layout, Menu, Icon } from 'antd';
import Link from 'umi/link';
import styles from './SimpleLayout.scss';

const { Header, Sider, Content } = Layout;

class SimpleLayout extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render() {
    return (
      <Layout className={styles.normal}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className={styles.logo} />
          <Menu theme="dark" mode="inline">
            {this.props.menus.map(item => {
              return (
                <Menu.Item
                  key={item.id}
                  className={this.props.match.path === item.href ? 'ant-menu-item-selected' : ''}
                >
                  <Link to={item.href}>
                    <Icon type={item.icon} />
                    <span>{ item.name }</span>
                  </Link>
                </Menu.Item>
              )
            })}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className={styles.trigger}
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default connect(
  ({global}) => ({
    menus: global.menus
  }),
  null
)(SimpleLayout)
