import React, { useState } from 'react';
import { Modal, Button, Table, Radio, Space } from 'antd';
import { CalendarOutlined, TruckOutlined } from '@ant-design/icons';

const CourierModal = ({ open, onCancel, onConfirm }) => {
  const [selectedCourier, setSelectedCourier] = useState('fedex');

  const couriers = [
    { id: 'delhivery', name: 'Delhivery', cost: 85.00, delivery: '2-3 Business Days', pickup: 'Available Tomorrow' },
    { id: 'fedex', name: 'FedEx', cost: 92.50, delivery: '1-2 Business Days', pickup: 'Available Today' },
    { id: 'bluedart', name: 'Blue Dart', cost: 88.00, delivery: '2-3 Business Days', pickup: 'Available Tomorrow' },
    { id: 'xpressbees', name: 'XpressBees', cost: 82.00, delivery: '3-4 Business Days', pickup: 'Available Today' }
  ];

  const columns = [
    {
      title: '',
      dataIndex: 'select',
      width: 60,
      render: (_, record) => (
        <Radio checked={selectedCourier === record.id} onChange={() => setSelectedCourier(record.id)} />
      )
    },
    {
      title: 'Courier Service',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span className="font-semibold">{text}</span>
    },
    {
      title: 'Total Cost',
      dataIndex: 'cost',
      key: 'cost',
      render: (cost) => `₹${cost.toFixed(2)}`
    },
    {
      title: 'Estimated Delivery',
      dataIndex: 'delivery',
      key: 'delivery',
      render: (text) => (
        <Space>
          <CalendarOutlined />
          {text}
        </Space>
      )
    },
    {
      title: 'Pickup',
      dataIndex: 'pickup',
      key: 'pickup',
      render: (text) => (
        <Space>
          <TruckOutlined />
          {text}
        </Space>
      )
    }
  ];

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Modal
      title="Courier Recommendations"
      open={open}
      onCancel={onCancel}
      width={900}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleConfirm}>
          Choose Courier & Confirm
        </Button>
      ]}
    >
      <p className="text-gray-500 mb-4">Select a courier for your shipment based on cost and delivery estimates.</p>
      <Table
        dataSource={couriers.map(c => ({ ...c, key: c.id }))}
        columns={columns}
        pagination={false}
        rowClassName={(record) => selectedCourier === record.id ? 'bg-blue-50' : ''}
        onRow={(record) => ({
          onClick: () => setSelectedCourier(record.id),
          className: 'cursor-pointer hover:bg-gray-50'
        })}
      />
    </Modal>
  );
};

export default CourierModal;
