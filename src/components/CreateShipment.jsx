import React, { useState, useEffect } from 'react';
import { Card, Button, Input, Select, InputNumber, Radio, Breadcrumb, message } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { shipmentService } from '../services/shipmentService';
import { productService } from '../services/productService';



const { Option } = Select;

const CreateShipmentPage = ({ onBackToShipments }) => {

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [showCourierModal, setShowCourierModal] = useState(false);
  const [selectedCourier, setSelectedCourier] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '400072',
    productId: '',
    quantity: 1,
    weight: '0.5',
    dimensions: '20 x 15 x 8',
    paymentMode: 'cod'
  });





  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setProductsLoading(true);
    try {
      const response = await productService.getProducts(1, 100);
      setProducts(response.data || []);
    } catch (error) {
      message.error('Failed to load products');
      console.error('Error fetching products:', error);
    } finally {
      setProductsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const requiredFields = ['customerName', 'phone', 'addressLine1', 'city', 'state', 'pincode', 'productId'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      message.error('Please fill in all required fields');
      return false;
    }

    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      message.error('Please enter a valid 10-digit phone number');
      return false;
    }

    if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
      message.error('Please enter a valid 6-digit pincode');
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    setShowCourierModal(true);
  };

  const handleCourierConfirm = async (courierData) => {
    setSelectedCourier(courierData);
    setShowCourierModal(false);
    setLoading(true);
    
    try {
      const shipmentData = {
        customer: {
          name: formData.customerName,
          phone: formData.phone,
          address: {
            line1: formData.addressLine1,
            line2: formData.addressLine2,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode
          }
        },
        items: [{
          productId: formData.productId,
          quantity: formData.quantity
        }],
        package: {
          weight: formData.weight,
          dimensions: formData.dimensions
        },
        payment: {
          mode: formData.paymentMode
        },
        courier: {
          service: courierData.name,
          cost: courierData.cost,
          delivery: courierData.delivery,
          pickup: courierData.pickup
        }
      };

      await shipmentService.createShipment(shipmentData);

      message.success('Shipment created successfully!');
      
      // Reset form
      setFormData({
        customerName: '',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        pincode: '400072',
        productId: '',
        quantity: 1,
        weight: '0.5',
        dimensions: '20 x 15 x 8',
        paymentMode: 'cod'
      });
      
      setSelectedCourier(null);
    } catch (error) {
      console.error('Error creating shipment:', error);
      message.error(error.message || 'Failed to create shipment. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  const handleCourierCancel = () => {
    setShowCourierModal(false);
    setSelectedCourier(null);
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
              <label className="block text-sm font-medium mb-2">Customer Name *</label>
              <Input 
                placeholder="Enter full name" 
                value={formData.customerName}
                onChange={(e) => handleInputChange('customerName', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone *</label>
              <Input 
                placeholder="Enter 10-digit mobile number" 
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Address Line 1 *</label>
              <Input 
                placeholder="House No., Building, Street, Area" 
                value={formData.addressLine1}
                onChange={(e) => handleInputChange('addressLine1', e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Address Line 2</label>
              <Input 
                placeholder="Landmark, Locality" 
                value={formData.addressLine2}
                onChange={(e) => handleInputChange('addressLine2', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">City *</label>
              <Input 
                placeholder="Enter city" 
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">State *</label>
              <Input 
                placeholder="Enter state" 
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Pincode *</label>
              <Input 
                placeholder="Enter 6-digit pincode" 
                value={formData.pincode}
                onChange={(e) => handleInputChange('pincode', e.target.value)}
                suffix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
              />
              
            </div>

          </div>
        </div>

        {/* Order Items */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4 pb-2 border-b">Order Items</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Select Product *</label>
              <Select 
                placeholder={productsLoading ? "Loading products..." : "Select a product"} 
                style={{ width: '100%' }} 
                value={formData.productId}
                onChange={(value) => handleInputChange('productId', value)}
                loading={productsLoading}
                disabled={productsLoading}
              >
                {products.map(product => (
                  <Option key={product._id || product.id} value={product._id || product.id}>
                    {product.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <InputNumber 
                min={1} 
                max={100} 
                value={formData.quantity} 
                onChange={(value) => handleInputChange('quantity', value)}
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
              <Input 
                 
                value={formData.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Dimensions (cm)</label>
              <Input 
                 
                value={formData.dimensions}
                onChange={(e) => handleInputChange('dimensions', e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Payment Mode</label>
              <Radio.Group 
                value={formData.paymentMode} 
                onChange={(e) => handleInputChange('paymentMode', e.target.value)}
              >
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
            loading={loading}
            disabled={loading || productsLoading}
          >
            {loading ? 'Creating Shipment...' : 'Create Shipment'}
          </Button>
        </div>

        {/* Courier Modal */}
        {showCourierModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">Courier Recommendations</h2>
              <p className="text-gray-500 mb-6">Select a courier for your shipment based on cost and delivery estimates.</p>
              
              <div className="space-y-4">
                {[
                  { id: 'delhivery', name: 'Delhivery', cost: 85.00, delivery: '2-3 Business Days', pickup: 'Available Tomorrow' },
                  { id: 'fedex', name: 'FedEx', cost: 92.50, delivery: '1-2 Business Days', pickup: 'Available Today' },
                  { id: 'bluedart', name: 'Blue Dart', cost: 88.00, delivery: '2-3 Business Days', pickup: 'Available Tomorrow' },
                  { id: 'xpressbees', name: 'XpressBees', cost: 82.00, delivery: '3-4 Business Days', pickup: 'Available Today' }
                ].map(courier => (
                  <div 
                    key={courier.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedCourier?.id === courier.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedCourier(courier)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <input 
                          type="radio" 
                          checked={selectedCourier?.id === courier.id}
                          onChange={() => setSelectedCourier(courier)}
                          className="h-4 w-4 text-blue-600"
                        />
                        <div>
                          <h3 className="font-semibold text-lg">{courier.name}</h3>
                          <p className="text-gray-600">Delivery: {courier.delivery}</p>
                          <p className="text-gray-600">Pickup: {courier.pickup}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">₹{courier.cost.toFixed(2)}</p>
                        <p className="text-gray-500 text-sm">Total Cost</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <Button onClick={handleCourierCancel}>
                  Cancel
                </Button>
                <Button 
                  type="primary" 
                  onClick={() => handleCourierConfirm(selectedCourier)}
                  disabled={!selectedCourier}
                >
                  Choose Courier & Create Shipment
                </Button>
              </div>
            </div>
          </div>
        )}


      </Card>
    </div>
  );
};

export default CreateShipmentPage;
