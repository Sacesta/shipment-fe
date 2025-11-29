import React, { useState } from 'react';
import { Card, Button, Input, Select, InputNumber, Radio, Breadcrumb, Space } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

const CreateShipmentPage = ({ onBackToShipments, onShowCourierModal }) => {

  const [paymentMode, setPaymentMode] = useState('cod');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = () => {
    onShowCourierModal();
  };

  return (
    <div className="p-6">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>
          <a onClick={onBackToShipments}>Shipments</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Create Shipment</Breadcrumb.Item>
      </Breadcrumb>



      <div className="mb-6">
        <h1 className="text-3xl font-bold">Create New Shipment</h1>
        <p className="text-gray-500">Fill in the details below to create a new shipment.</p>
      </div>

      <Card className="max-w-4xl shadow-sm">
        {/* Customer Details */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4 pb-2 border-b">Customer Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Customer Name</label>
              <Input placeholder="Enter full name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <Input placeholder="Enter 10-digit mobile number" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Address Line 1</label>
              <Input placeholder="House No., Building, Street, Area" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Address Line 2</label>
              <Input placeholder="Landmark, Locality" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">City</label>
              <Input placeholder="Enter city" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">State</label>
              <Input placeholder="Enter state" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Pincode</label>
              <Input 
                placeholder="Enter 6-digit pincode" 
                suffix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                defaultValue="400072"
              />
              <div className="text-xs text-green-600 mt-1">
                <CheckCircleOutlined /> Pincode is serviceable.
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4 pb-2 border-b">Order Items</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Select Product</label>
              <Select placeholder="Select a product" style={{ width: '100%' }} defaultValue="headphones">
                <Option value="headphones">Wireless Bluetooth Headphones</Option>
                <Option value="watch">Smart Fitness Tracker Watch</Option>
                <Option value="powerbank">Portable Power Bank 10000mAh</Option>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <InputNumber 
                min={1} 
                max={100} 
                value={quantity} 
                onChange={setQuantity}
                style={{ width: '100%' }} 
              />
            </div>
          </div>
        </div>

        {/* Package & Payment */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4 pb-2 border-b">Package & Payment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Weight (kg)</label>
              <Input disabled value="0.5" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Dimensions (cm)</label>
              <Input disabled value="20 x 15 x 8" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Payment Mode</label>
              <Radio.Group value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}>
                <Radio value="prepaid">Prepaid</Radio>
                <Radio value="cod">Cash on Delivery (COD)</Radio>
              </Radio.Group>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button 
            type="primary" 
            size="large" 
            onClick={handleSubmit}
            className="bg-gradient-to-r from-blue-500 to-purple-500 border-0 px-8"
          >
            Create Shipment
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CreateShipmentPage;
