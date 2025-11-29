import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Pagination, Tag, Space, Card, message } from 'antd';
import { SearchOutlined, DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import shipmentService from '../services/shipmentService';

const ShipmentsPage = ({ onCreateShipment, onTrackShipment }) => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const [searchText, setSearchText] = useState('');

  // Fetch shipments from API
  const fetchShipments = async (page = 1, search = '') => {
    setLoading(true);
    try {
      const response = await shipmentService.getShipments(page, pagination.pageSize, search);
      
      // Handle the new API response structure
      if (response.success && response.data) {
        setShipments(response.data);
        setPagination(prev => ({
          ...prev,
          current: response.pagination?.current || page,
          total: response.pagination?.total || 0
        }));
      } else {
        setShipments([]);
        setPagination(prev => ({ ...prev, total: 0 }));
      }
    } catch (error) {
      message.error('Failed to fetch shipments');
      console.error('Error fetching shipments:', error);
      setShipments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  // Handle search
  const handleSearch = (value) => {
    setSearchText(value);
    fetchShipments(1, value);
  };

  // Handle pagination change
  const handlePaginationChange = (page) => {
    fetchShipments(page, searchText);
  };

  // Handle download label
  const handleDownloadLabel = async (id) => {
    try {
      await shipmentService.downloadLabel(id);
      message.success('Label downloaded successfully');
    } catch (error) {
      message.error('Failed to download label');
      console.error('Error downloading label:', error);
    }
  };

  // Status tag colors
  const getStatusColor = (status) => {
    const normalizedStatus = status?.toLowerCase();
    const statusColors = {
      'pending': 'blue',
      'pending pickup': 'blue',
      'scheduled': 'cyan',
      'picked up': 'green',
      'in transit': 'orange',
      'delivered': 'success',
      'rto initiated': 'red',
      'failed': 'error'
    };
    return statusColors[normalizedStatus] || 'default';
  };

  // Format status for display
  const formatStatus = (status) => {
    if (!status) return 'N/A';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  // Table columns configuration
  const columns = [
    {
      title: 'Tracking Number',
      dataIndex: 'trackingNumber',
      key: 'trackingNumber',
      width: 180,
      render: (text) => <span className="font-mono">{text || 'N/A'}</span>
    },
    {
      title: 'Customer',
      dataIndex: ['customer', 'name'],
      key: 'customerName',
      width: 150,
    },
    {
      title: 'Phone',
      dataIndex: ['customer', 'phone'],
      key: 'customerPhone',
      width: 120,
    },
    {
      title: 'Courier',
      dataIndex: ['courier', 'service'],
      key: 'courier',
      width: 120,
    },
    {
      title: 'Delivery Time',
      dataIndex: ['courier', 'delivery'],
      key: 'delivery',
      width: 150,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {formatStatus(status)}
        </Tag>
      ),
      width: 120,
    },
    {
      title: 'Payment',
      dataIndex: ['payment', 'mode'],
      key: 'payment',
      render: (mode) => (
        <Tag color={mode === 'prepaid' ? 'green' : 'orange'}>
          {mode?.toUpperCase()}
        </Tag>
      ),
      width: 100,
    },
    {
      title: 'Cost',
      dataIndex: ['courier', 'cost'],
      key: 'cost',
      render: (cost) => `₹${cost?.toFixed(2) || '0.00'}`,
      width: 100,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 100,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<DownloadOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              handleDownloadLabel(record.id || record._id);
            }}
            title="Download Label"
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">All Shipments</h1>
          <p className="text-gray-500">Manage, track, and download labels for all your shipments.</p>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={onCreateShipment}
          className="bg-gradient-to-r from-blue-500 to-purple-500 border-0"
        >
          Create Shipment
        </Button>
      </div>

      <Card>
        <div className="mb-4 flex justify-between items-center">
          <Input.Search
            placeholder="Search by tracking number, customer name..."
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onSearch={handleSearch}
            style={{ width: 400 }}
          />
          <div className="text-gray-500">
            Total Shipments: <span className="font-semibold">{pagination.total}</span>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={shipments}
          rowKey={(record) => record.id || record._id}
          loading={loading}
          pagination={false}
          onRow={(record) => ({
            onClick: () => onTrackShipment && onTrackShipment(record),
            style: { cursor: 'pointer' },
            className: 'hover:bg-gray-50'
          })}
          scroll={{ x: 1200 }}
        />

        <div className="mt-4 flex justify-end">
          <Pagination
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={pagination.total}
            onChange={handlePaginationChange}
            showSizeChanger={false}
            showQuickJumper
            showTotal={(total, range) => 
              `Showing ${range[0]}-${range[1]} of ${total} items`
            }
          />
        </div>
      </Card>
    </div>
  );
};

export default ShipmentsPage;