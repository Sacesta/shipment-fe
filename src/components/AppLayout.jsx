import React from 'react';
import { Layout, Menu, Avatar, Typography, Dropdown, Space } from 'antd';
import {
  DashboardOutlined,
  ShoppingOutlined,
  InboxOutlined,
  CarOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
  LogoutOutlined,
  BellOutlined,
  SearchOutlined
} from '@ant-design/icons';




const { Sider, Content, Header } = Layout;
const { Text } = Typography;


const AppLayout = ({ children, currentPage, onPageChange, collapsed, onCollapse }) => {
  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      danger: true,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={onCollapse} 
        theme="light"
        width={250}
        style={{
          boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
        }}
      >
        <div style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar 
            size="large" 
            style={{ 
              backgroundColor: '#1890ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            3PL
          </Avatar>
          {!collapsed && (
            <div>
              <Text strong style={{ display: 'block', fontSize: '16px' }}>3PL Logistics</Text>
              <Text type="secondary" style={{ fontSize: '12px' }}>Shiprocket POC</Text>
            </div>
          )}
        </div>

        <Menu
          mode="inline"
          selectedKeys={[currentPage]}
          style={{ border: 'none' }}
          items={[
            {
              key: 'dashboard',
              icon: <DashboardOutlined />,
              label: 'Dashboard',
              onClick: () => onPageChange('dashboard')
            },
            {
              key: 'products',
              icon: <InboxOutlined />,
              label: 'Products',
              onClick: () => onPageChange('products')
            },
            {
              key: 'shipments',
              icon: <CarOutlined />,
              label: 'Shipments',
              onClick: () => onPageChange('shipments')
            },
            {
              key: 'errors',
              icon: <ExclamationCircleOutlined />,
              label: 'API & Shipping Errors',
              onClick: () => onPageChange('errors')
            },
            {
              key: 'orders',
              icon: <ShoppingOutlined />,
              label: 'Orders'
            },
            {
              type: 'divider'
            },
            {
              key: 'settings',
              icon: <SettingOutlined />,
              label: 'Settings'
            },
            {
              key: 'support',
              icon: <QuestionCircleOutlined />,
              label: 'Support'
            }
          ]}
        />
      </Sider>
      <Layout>
        <Header 
          style={{ 
            background: '#fff', 
            padding: '0 24px',
            boxShadow: '0 1px 4px rgba(0,21,41,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ flex: 1, maxWidth: 400 }}>
            {/* Search placeholder for future implementation */}
          </div>
          <Space size="middle">
            <BellOutlined style={{ fontSize: '16px', color: '#595959', cursor: 'pointer' }} />
            <Dropdown
              menu={{
                items: userMenuItems,
              }}
              placement="bottomRight"
              arrow
            >
              <Space style={{ cursor: 'pointer' }}>
                <Avatar size="small" icon={<UserOutlined />} />
                <Text>Admin User</Text>
              </Space>
            </Dropdown>
          </Space>
        </Header>
        <Content style={{ 
          background: '#f0f2f5', 
          padding: '24px',
          minHeight: 'calc(100vh - 64px)'
        }}>
          {children}
        </Content>
      </Layout>

    </Layout>
  );
};

export default AppLayout;
