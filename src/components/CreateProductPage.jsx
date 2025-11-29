import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, Card, Typography, Space, Breadcrumb, message } from 'antd';
import { 
  TagOutlined, 
  BarcodeOutlined, 
   
  InboxOutlined,
  HomeOutlined,
  AppstoreOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import productService from '../services/productService';

const { Title, Text } = Typography;


const CreateProductPage = ({ onBackToProducts = () => console.log('Back to products') }) => {
  const [formValues, setFormValues] = useState({
    name: '',
    sku: '',
    weight: undefined,
    length: undefined,
    width: undefined,
    height: undefined,
    stock: undefined
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formValues.name || formValues.name.length < 3) {
      newErrors.name = 'Product name must be at least 3 characters';
    }
    
    if (!formValues.sku) {
      newErrors.sku = 'Please enter SKU';
    } else if (!/^[A-Z0-9-]+$/i.test(formValues.sku)) {
      newErrors.sku = 'SKU should contain only letters, numbers, and hyphens';
    }
    
    if (!formValues.weight || formValues.weight < 0.01) {
      newErrors.weight = 'Weight must be greater than 0';
    }
    
    if (!formValues.length || formValues.length < 0.1) {
      newErrors.length = 'Length is required';
    }
    
    if (!formValues.width || formValues.width < 0.1) {
      newErrors.width = 'Width is required';
    }
    
    if (!formValues.height || formValues.height < 0.1) {
      newErrors.height = 'Height is required';
    }
    
    if (formValues.stock === undefined || formValues.stock < 0) {
      newErrors.stock = 'Stock level must be 0 or greater';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      message.error('Please fix the form errors');
      return;
    }
    
    setLoading(true);
    
    try {
      const productData = {
        name: formValues.name,
        sku: formValues.sku,
        weight: formValues.weight,
        dimensions: {
          length: formValues.length,
          width: formValues.width,
          height: formValues.height
        },
        stock: formValues.stock
      };

      await productService.createProduct(productData);
      
      message.success('Product created successfully!');
      
      setFormValues({
        name: '',
        sku: '',
        weight: undefined,
        length: undefined,
        width: undefined,
        height: undefined,
        stock: undefined
      });
      setErrors({});
      
      setTimeout(() => {
        onBackToProducts();
      }, 1000);
      
    } catch (error) {
      console.error('Error creating product:', error);
      message.error(error.message || 'Failed to create product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (field, value) => {
    setFormValues(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Breadcrumbs */}
      <Breadcrumb 
        className="mb-6"
        items={[
          {
            title: (
              <a onClick={onBackToProducts}>
                <HomeOutlined className="mr-1" />
                Dashboard
              </a>
            ),
          },
          {
            title: (
              <a onClick={onBackToProducts}>
                <AppstoreOutlined className="mr-1" />
                Products
              </a>
            ),
          },
          {
            title: 'Add New',
          },
        ]}
      />

      {/* Page Heading */}
      <div className="mb-8">
        <Title level={2} className="!mb-2">Create New Product</Title>
        <Text type="secondary" className="text-base">
          Fill in the details below to add a new product to your inventory.
        </Text>
      </div>

      {/* Form Card */}
      <Card 
        title={<span className="text-lg font-semibold">Product Details</span>}
        className="shadow-sm"
      >
        <div className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block mb-2">
              <Text strong>Product Name <span className="text-red-500">*</span></Text>
            </label>
            <Input 
              size="large"
              prefix={<TagOutlined />}
              placeholder="e.g., Premium Cotton T-Shirt"
              value={formValues.name}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              status={errors.name ? 'error' : ''}
            />
            {errors.name && <Text type="danger" className="text-sm">{errors.name}</Text>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* SKU */}
            <div>
              <label className="block mb-2">
                <Text strong>SKU (Stock Keeping Unit) <span className="text-red-500">*</span></Text>
              </label>
              <Input 
                size="large"
                prefix={<BarcodeOutlined />}
                placeholder="e.g., PCT-BLK-L"
                value={formValues.sku}
                onChange={(e) => handleFieldChange('sku', e.target.value)}
                status={errors.sku ? 'error' : ''}
              />
              {errors.sku && <Text type="danger" className="text-sm block mt-1">{errors.sku}</Text>}
            </div>

            {/* Weight */}
            <div>
              <label className="block mb-2">
                <Text strong>Weight (kg) <span className="text-red-500">*</span></Text>
              </label>
              <InputNumber
                size="large"
                // prefix={<ScaleOutlined />}
                placeholder="0.00"
                step={0.01}
                min={0.01}
                className="w-full"
                addonAfter="kg"
                value={formValues.weight}
                onChange={(value) => handleFieldChange('weight', value)}
                status={errors.weight ? 'error' : ''}
              />
              <Text type="secondary" className="text-xs block mt-1">Units in kilograms (kg)</Text>
              {errors.weight && <Text type="danger" className="text-sm block">{errors.weight}</Text>}
            </div>
          </div>

          {/* Dimensions */}
          <div>
            <label className="block mb-2">
              <Text strong>Dimensions (cm) <span className="text-red-500">*</span></Text>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <InputNumber
                  size="large"
                  placeholder="Length"
                  min={0.1}
                  className="w-full"
                  addonAfter="cm"
                  value={formValues.length}
                  onChange={(value) => handleFieldChange('length', value)}
                  status={errors.length ? 'error' : ''}
                />
                {errors.length && <Text type="danger" className="text-sm block mt-1">{errors.length}</Text>}
              </div>

              <div>
                <InputNumber
                  size="large"
                  placeholder="Width"
                  min={0.1}
                  className="w-full"
                  addonAfter="cm"
                  value={formValues.width}
                  onChange={(value) => handleFieldChange('width', value)}
                  status={errors.width ? 'error' : ''}
                />
                {errors.width && <Text type="danger" className="text-sm block mt-1">{errors.width}</Text>}
              </div>

              <div>
                <InputNumber
                  size="large"
                  placeholder="Height"
                  min={0.1}
                  className="w-full"
                  addonAfter="cm"
                  value={formValues.height}
                  onChange={(value) => handleFieldChange('height', value)}
                  status={errors.height ? 'error' : ''}
                />
                {errors.height && <Text type="danger" className="text-sm block mt-1">{errors.height}</Text>}
              </div>
            </div>
          </div>

          {/* Initial Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2">
                <Text strong>Initial Stock Level <span className="text-red-500">*</span></Text>
              </label>
              <InputNumber
                size="large"
                prefix={<InboxOutlined />}
                placeholder="e.g., 100"
                min={0}
                className="w-full"
                value={formValues.stock}
                onChange={(value) => handleFieldChange('stock', value)}
                status={errors.stock ? 'error' : ''}
              />
              {errors.stock && <Text type="danger" className="text-sm block mt-1">{errors.stock}</Text>}
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-6 border-t flex justify-end">
            <Space size="middle">
              <Button 
                size="large"
                onClick={onBackToProducts}
              >
                Cancel
              </Button>
              <Button 
                type="primary" 
                size="large"
                loading={loading}
                icon={loading ? <LoadingOutlined /> : null}
                onClick={handleSubmit}
              >
                {loading ? 'Creating...' : 'Add Product'}
              </Button>
            </Space>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CreateProductPage;