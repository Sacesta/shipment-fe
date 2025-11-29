import React from 'react';
import { Card, Statistic, Button, Select, Space } from 'antd';
import { 
  InboxOutlined, 
  CheckCircleOutlined, 
  CarOutlined, 
  ClockCircleOutlined, 
  UndoOutlined,
  PlusOutlined 
} from '@ant-design/icons';


const { Option } = Select;

const DashboardPage = ({ onCreateShipment }) => {
  const stats = [
    { title: 'Total Shipments', value: 1482, icon: <InboxOutlined />, color: '#1890ff' },
    { title: 'Delivered', value: 1205, icon: <CheckCircleOutlined />, color: '#52c41a' },
    { title: 'In Transit', value: 150, icon: <CarOutlined />, color: '#722ed1' },
    { title: 'Pending Pickup', value: 85, icon: <ClockCircleOutlined />, color: '#fa8c16' },
    { title: 'RTO', value: 42, icon: <UndoOutlined />, color: '#f5222d' }
  ];

  const chartData = [
    { day: 'Mon', value: 150 },
    { day: 'Tue', value: 210 },
    { day: 'Wed', value: 180 },
    { day: 'Thu', value: 240 },
    { day: 'Fri', value: 225 },
    { day: 'Sat', value: 195 },
    { day: 'Sun', value: 270 }
  ];

  const maxValue = Math.max(...chartData.map(d => d.value));

  return (
    <div className="p-6">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <Space>
          <Select defaultValue="7days" style={{ width: 150 }}>
            <Option value="7days">Last 7 Days</Option>
            <Option value="30days">Last 30 Days</Option>
            <Option value="90days">Last 90 Days</Option>
          </Select>
          <Button type="primary" icon={<PlusOutlined />} onClick={onCreateShipment}>
            Create Shipment
          </Button>
        </Space>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <Statistic
              title={stat.title}
              value={stat.value}
              prefix={<span style={{ color: stat.color, fontSize: '24px' }}>{stat.icon}</span>}
              valueStyle={{ color: stat.color, fontWeight: 'bold' }}
            />
          </Card>
        ))}
      </div>

      <Card title="Recent Shipment Activity" className="shadow-sm">
        <div className="h-80 flex items-end justify-around px-4">
          {chartData.map((item, index) => (
            <div key={index} className="flex flex-col items-center flex-1 mx-1">
              <div 
                className="w-full bg-blue-100 hover:bg-blue-200 rounded-t-lg transition-colors relative group" 
                style={{ height: `${(item.value / maxValue) * 100}%`, minHeight: '20px' }}
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {item.value}
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-2">{item.day}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default DashboardPage;
