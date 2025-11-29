import React from 'react';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  ShoppingOutlined,
  InboxOutlined,
  CarOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';



const { Sider, Content } = Layout;

const AppLayout = ({ children, currentPage, onPageChange, collapsed, onCollapse }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} theme="light">
        <div className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            3PL
          </div>
          {!collapsed && (
            <div>
              <div className="font-semibold">3PL Logistics</div>
              <div className="text-xs text-gray-500">Shiprocket POC</div>
            </div>
          )}
        </div>
        <Menu
          mode="inline"
          selectedKeys={[currentPage]}
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
        <Content style={{ background: '#f0f2f5' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
