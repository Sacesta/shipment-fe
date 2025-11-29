import React from 'react';
import { Card, Statistic, Button, Select, Space, Row, Col, Typography, Progress, List, Avatar, Tag } from 'antd';
import { 
  InboxOutlined, 
  CheckCircleOutlined, 
  CarOutlined, 
  ClockCircleOutlined, 
  UndoOutlined,
  PlusOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  UserOutlined,
  ShoppingOutlined
} from '@ant-design/icons';



const { Option } = Select;
const { Title, Text } = Typography;


const DashboardPage = ({ onCreateShipment }) => {
  const stats = [
    { 
      title: 'Total Shipments', 
      value: 1482, 
      icon: <InboxOutlined />, 
      color: '#1890ff',
      trend: 'up',
      trendValue: 12.5
    },
    { 
      title: 'Delivered', 
      value: 1205, 
      icon: <CheckCircleOutlined />, 
      color: '#52c41a',
      trend: 'up',
      trendValue: 8.2
    },
    { 
      title: 'In Transit', 
      value: 150, 
      icon: <CarOutlined />, 
      color: '#722ed1',
      trend: 'down',
      trendValue: 3.1
    },
    { 
      title: 'Pending Pickup', 
      value: 85, 
      icon: <ClockCircleOutlined />, 
      color: '#fa8c16',
      trend: 'up',
      trendValue: 5.7
    },
    { 
      title: 'RTO', 
      value: 42, 
      icon: <UndoOutlined />, 
      color: '#f5222d',
      trend: 'down',
      trendValue: 2.4
    }
  ];


  const recentShipments = [
    {
      id: '#SH786543',
      customer: 'Anshuman Singh',
      destination: 'New Delhi',
      status: 'delivered',
      date: '2 hours ago'
    },
    {
      id: '#SH786512',
      customer: 'Riya Sharma',
      destination: 'Mumbai',
      status: 'in_transit',
      date: '4 hours ago'
    },
    {
      id: '#SH786499',
      customer: 'Prakash Kumar',
      destination: 'Bengaluru',
      status: 'pending',
      date: '1 day ago'
    },
    {
      id: '#SH786488',
      customer: 'Meera Iyer',
      destination: 'Chennai',
      status: 'delivered',
      date: '1 day ago'
    }
  ];

  const performanceData = [
    { courier: 'Delhivery', deliveries: 450, successRate: 98 },
    { courier: 'Blue Dart', deliveries: 320, successRate: 96 },
    { courier: 'DTDC', deliveries: 280, successRate: 94 },
    { courier: 'XpressBees', deliveries: 210, successRate: 92 }
  ];


  const getStatusTag = (status) => {
    const statusConfig = {
      delivered: { color: 'success', text: 'Delivered' },
      in_transit: { color: 'processing', text: 'In Transit' },
      pending: { color: 'warning', text: 'Pending' }
    };
    return <Tag color={statusConfig[status]?.color}>{statusConfig[status]?.text}</Tag>;
  };

  return (
    <div style={{ padding: '0' }}>
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={24}>
          <Card>
            <Row justify="space-between" align="middle">
              <Col>
                <Title level={2} style={{ margin: 0 }}>Dashboard Overview</Title>
                <Text type="secondary">Welcome back! Here's what's happening with your shipments today.</Text>
              </Col>
              <Col>
                <Space>
                  <Select defaultValue="7days" style={{ width: 150 }}>
                    <Option value="7days">Last 7 Days</Option>
                    <Option value="30days">Last 30 Days</Option>
                    <Option value="90days">Last 90 Days</Option>
                  </Select>
                  <Button type="primary" icon={<PlusOutlined />} size="large" onClick={onCreateShipment}>
                    Create Shipment
                  </Button>
                </Space>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} xl={4.8} key={index}>
            <Card>
              <Statistic
                title={
                  <Space>
                    <span>{stat.title}</span>
                    {stat.trend === 'up' ? (
                      <ArrowUpOutlined style={{ color: '#52c41a', fontSize: '12px' }} />
                    ) : (
                      <ArrowDownOutlined style={{ color: '#f5222d', fontSize: '12px' }} />
                    )}
                    <Text type={stat.trend === 'up' ? 'success' : 'danger'} style={{ fontSize: '12px' }}>
                      {stat.trendValue}%
                    </Text>
                  </Space>
                }
                value={stat.value}
                prefix={<span style={{ color: stat.color, fontSize: '24px', marginRight: 8 }}>{stat.icon}</span>}
                valueStyle={{ color: stat.color, fontWeight: 'bold' }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card 
            title="Recent Shipments" 
            extra={<Button type="link">View All</Button>}
          >
            <List
              dataSource={recentShipments}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={
                      <Space>
                        <Text strong>{item.id}</Text>
                        {getStatusTag(item.status)}
                      </Space>
                    }
                    description={
                      <Space direction="vertical" size={0}>
                        <Text>{item.customer}</Text>
                        <Text type="secondary">{item.destination}</Text>
                        <Text type="secondary" style={{ fontSize: '12px' }}>{item.date}</Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        
        <Col xs={24} lg={12}>
          <Card 
            title="Courier Performance" 
            extra={<Button type="link">View Details</Button>}
          >
            <List
              dataSource={performanceData}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<ShoppingOutlined />} />}
                    title={item.courier}
                    description={
                      <Space direction="vertical" size={2} style={{ width: '100%' }}>
                        <Text>{item.deliveries} deliveries</Text>
                        <Progress 
                          percent={item.successRate} 
                          size="small" 
                          status={item.successRate >= 95 ? 'success' : 'normal'}
                          strokeColor={item.successRate >= 95 ? '#52c41a' : '#1890ff'}
                        />
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          Success Rate: {item.successRate}%
                        </Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );

};

export default DashboardPage;
