import React, { useState } from 'react';
import { 
  Card, 
  Table, 
  Tag, 
  Button, 
  Space, 
  Typography,
  Row,
  Col,
  Input,
  Select,
  message
} from 'antd';
import { 
  FilterOutlined, 
  SwapOutlined,
  EyeOutlined
} from '@ant-design/icons';


const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

const ErrorsPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchText, setSearchText] = useState('');

  const handleViewDetails = (record) => {
    message.info(`Viewing details for: ${record.orderId}`);
    // TODO: Implement detailed view functionality
  };

  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'missing-weight', label: 'Missing Weight' },
    { value: 'wrong-pincode', label: 'Wrong Pincode' },
    { value: 'shiprocket-error', label: 'Shiprocket Error' },
    { value: 'api-failure', label: 'API Failure' },
  ];

        
  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
      width: 120,
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
      render: (_, record) => (
        <div>
          <Text strong>{record.customer}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {record.errorDescription}
          </Text>
        </div>
      ),
    },
    {
      title: 'Error',
      dataIndex: 'errorType',
      key: 'errorType',
      width: 150,
      render: (errorType) => {
        const colorMap = {
          'Missing Weight': 'red',
          'Invalid Pincode': 'orange',
          'Shiprocket Error': 'volcano',
          'API Failure': 'purple',
        };
        return <Tag color={colorMap[errorType] || 'default'}>{errorType}</Tag>;
      },
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: 120,
      render: (text) => <Text type="secondary">{text}</Text>,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 100,
      render: (_, record) => (
        <Button 
          type="link" 
          icon={<EyeOutlined />}
          onClick={() => handleViewDetails(record)}
        >
          View Details
        </Button>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      orderId: '#OD786543',
      customer: 'Anshuman Singh, New Delhi',
      errorDescription: 'Shipment weight is required but not provided.',
      errorType: 'Missing Weight',
      timestamp: '2 min ago',
    },
    {
      key: '2',
      orderId: '#OD786512',
      customer: 'Riya Sharma, Mumbai',
      errorDescription: 'The provided pincode 400001 is not serviceable.',
      errorType: 'Invalid Pincode',
      timestamp: '1 hour ago',
    },
    {
      key: '3',
      orderId: '#OD786499',
      customer: 'Prakash Kumar, Bengaluru',
      errorDescription: 'Courier partner API returned a 500 server error.',
      errorType: 'Shiprocket Error',
      timestamp: 'Yesterday',
    },
    {
      key: '4',
      orderId: '#OD786488',
      customer: 'Meera Iyer, Chennai',
      errorDescription: 'Authentication token expired. Please re-authenticate.',
      errorType: 'API Failure',
      timestamp: 'Oct 26, 2023',
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: '24px' }}>
        <Col>
          <Title level={2} style={{ margin: 0 }}>API & Shipping Errors</Title>
        </Col>
      </Row>
      
      <Card>
        <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
          <Col xs={24} sm={12} md={8}>
            <Select
              value={selectedFilter}
              onChange={setSelectedFilter}
              style={{ width: '100%' }}
              placeholder="Filter by error type"
            >
              {filterOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Search
              placeholder="Search errors..."
              allowClear
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Space style={{ float: 'right' }}>
              <Button icon={<FilterOutlined />}>Filter</Button>
              <Button icon={<SwapOutlined />}>Sort</Button>
            </Space>
          </Col>
        </Row>

          
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `Showing ${range[0]}-${range[1]} of ${total} items`
          }}
          scroll={{ x: 800 }}
        />
      </Card>
    </div>

  );
};

export default ErrorsPage;
