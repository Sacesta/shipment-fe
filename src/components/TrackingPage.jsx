import React from 'react';
import { Card, Timeline, Progress, Row, Col, Typography, Button, Space, Tag, Divider, Descriptions } from 'antd';
import { 
  CheckCircleOutlined, 
  TruckOutlined, 
  ShopOutlined, 
  CarOutlined, 
  CalendarOutlined,
  ArrowLeftOutlined,
 
  UserOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined
} from '@ant-design/icons';


const { Title, Text } = Typography;
const { Item } = Descriptions;

const TrackingPage = ({ onBackToShipments }) => {



  const timelineItems = [
    {
      color: 'green',
      dot: <CheckCircleOutlined />,
      children: (
        <Card 
          size="small" 
          style={{ border: '2px solid #52c41a', backgroundColor: '#f6ffed' }}
        >
          <Space direction="vertical" size={0}>
            <Text strong style={{ color: '#52c41a' }}>Delivered</Text>
            <Text type="secondary">Oct 26, 2023, 02:45 PM | Los Angeles, USA</Text>
          </Space>
        </Card>
      ),
    },
    {
      color: 'blue',
      dot: <TruckOutlined />,
      children: (
        <Card size="small">
          <Space direction="vertical" size={0}>
            <Text strong>Out for Delivery</Text>
            <Text type="secondary">Oct 26, 2023, 09:15 AM | Los Angeles, USA</Text>
          </Space>
        </Card>
      ),
    },
    {
      color: 'blue',
      dot: <ShopOutlined />,
      children: (
        <Card size="small">
          <Space direction="vertical" size={0}>
            <Text strong>Arrived at Hub</Text>
            <Text type="secondary">Oct 25, 2023, 11:30 PM | Chicago, USA</Text>
          </Space>
        </Card>
      ),
    },
    {
      color: 'blue',
      dot: <CarOutlined />,
      children: (
        <Card size="small">
          <Space direction="vertical" size={0}>
            <Text strong>In Transit</Text>
            <Text type="secondary">Oct 24, 2023, 08:00 AM | New York, USA</Text>
          </Space>
        </Card>
      ),
    },
    {
      color: 'blue',
   
      children: (
        <Card size="small">
          <Space direction="vertical" size={0}>
            <Text strong>Picked Up</Text>
            <Text type="secondary">Oct 23, 2023, 04:20 PM | New York, USA</Text>
          </Space>
        </Card>
      ),
    },
    {
      color: 'blue',
      dot: <CalendarOutlined />,
      children: (
        <Card size="small">
          <Space direction="vertical" size={0}>
            <Text strong>Pickup Scheduled</Text>
            <Text type="secondary">Oct 23, 2023, 10:00 AM | New York, USA</Text>
          </Space>
        </Card>
      ),
    },
  ];


  return (
    <div style={{ padding: '0' }}>
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={24}>
          <Card>
            <Row justify="space-between" align="middle">
              <Col>
                <Space>
                  <Button 
                    type="text" 
                    icon={<ArrowLeftOutlined />} 
                    onClick={onBackToShipments}
                  >
                    Back to Shipments
                  </Button>
                  <Divider type="vertical" />
                  <Space direction="vertical" size={0}>
                    <Title level={2} style={{ margin: 0 }}>Shipment Tracking</Title>
                    <Text type="secondary">Track your shipment status in real-time</Text>
                  </Space>
                </Space>
              </Col>
              <Col>
                <Tag color="success" style={{ fontSize: '14px', padding: '4px 12px' }}>
                  <CheckCircleOutlined /> Delivered
                </Tag>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={16}>
          <Card 
            title="Shipment Timeline" 
            extra={<Text strong>Order #SR123456789</Text>}
          >
            <Timeline items={timelineItems} />
          </Card>
        </Col>
        
        <Col xs={24} lg={8}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card title="Shipment Details" size="small">
                <Descriptions column={1} size="small">
                  <Item label="Order ID">#SR123456789</Item>
                  <Item label="AWB Number">1234567890</Item>
                  <Item label="Carrier">Shiprocket X</Item>
                  <Item label="Status">
                    <Tag color="success">Delivered</Tag>
                  </Item>
                  <Item label="Estimated Delivery">
                    <Text type="success">October 26, 2023</Text>
                  </Item>
                  <Item label="Actual Delivery">
                    <Text strong>October 26, 2023, 02:45 PM</Text>
                  </Item>
                </Descriptions>
              </Card>
            </Col>
            
            <Col span={24}>
              <Card title="Shipment Progress" size="small">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Progress 
                    percent={100} 
                    status="success"
                    strokeColor={{
                      '0%': '#108ee9',
                      '100%': '#87d068',
                    }}
                  />
                  <Row justify="space-between">
                    <Col>
                      <Text type="secondary">Progress</Text>
                    </Col>
                    <Col>
                      <Text strong type="success">100% Complete</Text>
                    </Col>
                  </Row>
                </Space>
              </Card>
            </Col>
            
            <Col span={24}>
              <Card title="Recipient Information" size="small">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Space>
                    <UserOutlined style={{ color: '#1890ff' }} />
                    <Text strong>Anshuman Singh</Text>
                  </Space>
                  <Space>
                    <EnvironmentOutlined style={{ color: '#52c41a' }} />
                    <Text>123 Main Street, Los Angeles, CA 90001, USA</Text>
                  </Space>
                  <Space>
                    <PhoneOutlined style={{ color: '#fa8c16' }} />
                    <Text>+1 (555) 123-4567</Text>
                  </Space>
                  <Space>
                    <MailOutlined style={{ color: '#722ed1' }} />
                    <Text>anshuman.singh@example.com</Text>
                  </Space>
                </Space>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );

};

export default TrackingPage;
