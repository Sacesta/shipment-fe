import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Button, 
  Space, 
  Input, 
  Card, 
  Tag, 
  Pagination, 
  message,
  Modal,
  Form,
  InputNumber,
  Typography
} from 'antd';
import { 
  EditOutlined, 
  DeleteOutlined, 
  PlusOutlined,
  SearchOutlined,
  TagOutlined,
  BarcodeOutlined,
  InboxOutlined
} from '@ant-design/icons';
import { productService } from '../services/productService';

const { Search } = Input;
const { Title, Text } = Typography;

const ProductsPage = ({ onCreateProduct }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm] = Form.useForm();
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (page = 1, pageSize = 10, search = '') => {
    setLoading(true);
    try {
      const response = await productService.getProducts(page, pageSize, search);
      setProducts(response.data || []);
      setPagination({
        current: response.pagination?.current || page,
        pageSize: pageSize,
        total: response.pagination?.total || 0
      });
    } catch (error) {
      message.error('Failed to fetch products');
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page, pageSize) => {
    fetchProducts(page, pageSize, searchTerm);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    fetchProducts(1, pagination.pageSize, value);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    editForm.setFieldsValue({
      name: product.name,
      sku: product.sku,
      weight: product.weight,
      length: product.dimensions?.length,
      width: product.dimensions?.width,
      height: product.dimensions?.height,
      stock: product.stock
    });
    setEditModalVisible(true);
  };

  const handleEditSubmit = async (values) => {
    setEditLoading(true);
    try {
      const productData = {
        name: values.name,
        sku: values.sku,
        weight: values.weight,
        dimensions: {
          length: values.length,
          width: values.width,
          height: values.height
        },
        stock: values.stock
      };

      await productService.updateProduct(editingProduct.id, productData);
      message.success('Product updated successfully!');
      setEditModalVisible(false);
      fetchProducts(pagination.current, pagination.pageSize, searchTerm);
    } catch (error) {
      console.error('Error updating product:', error);
      message.error(error.message || 'Failed to update product. Please try again.');
    } finally {
      setEditLoading(false);
    }
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
    setEditingProduct(null);
    editForm.resetFields();
  };

  const handleDelete = async (productId) => {
    Modal.confirm({
      title: 'Delete Product',
      content: 'Are you sure you want to delete this product? This action cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await productService.deleteProduct(productId);
          message.success('Product deleted successfully!');
          fetchProducts(pagination.current, pagination.pageSize, searchTerm);
        } catch (error) {
          message.error('Failed to delete product');
          console.error('Error deleting product:', error);
        }
      }
    });
  };

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (text, record) => (
        <div>
          <div className="font-medium">{text}</div>
          <div className="text-xs text-gray-500">{record.sku}</div>
        </div>
      )
    },
    {
      title: 'Dimensions',
      dataIndex: 'dimensions',
      key: 'dimensions',
      width: 150,
      render: (dimensions) => 
        dimensions ? `${dimensions.length}×${dimensions.width}×${dimensions.height} cm` : '-'
    },
    {
      title: 'Weight',
      dataIndex: 'weight',
      key: 'weight',
      width: 100,
      render: (weight) => weight ? `${weight} kg` : '-'
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      width: 100,
      render: (stock) => (
        <Tag color={stock > 10 ? 'green' : stock > 0 ? 'orange' : 'red'}>
          {stock} units
        </Tag>
      )
    },
    {
      title: 'Status',
      key: 'status',
      width: 120,
      render: (_, record) => (
        <Tag color={record.stock > 0 ? 'success' : 'error'}>
          {record.stock > 0 ? 'In Stock' : 'Out of Stock'}
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="link" 
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button 
            type="link" 
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      )
    }
  ];

  return (
    <div className="p-6">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div>
          <Title level={2} className="!mb-2">Product Inventory</Title>
          <Text type="secondary">Add, manage, and track your product stock levels.</Text>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={onCreateProduct}
        >
          Add New Product
        </Button>
      </div>

      <Card>
        <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
          <Search
            placeholder="Search products by name or SKU..."
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            style={{ width: 400 }}
            onSearch={handleSearch}
          />
          <div className="text-sm text-gray-500">
            {pagination.total} products found
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={products}
          rowKey="id"
          loading={loading}
          pagination={false}
          scroll={{ x: 800 }}
        />

        <div style={{ marginTop: 16, textAlign: 'right' }}>
          <Pagination
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={pagination.total}
            showSizeChanger
            showQuickJumper
            showTotal={(total, range) => 
              `Showing ${range[0]}-${range[1]} of ${total} items`
            }
            onChange={handlePageChange}
            onShowSizeChange={handlePageChange}
          />
        </div>
      </Card>

      {/* Edit Product Modal */}
      <Modal
        title="Edit Product"
        open={editModalVisible}
        onCancel={handleEditCancel}
        footer={null}
        width={700}
      >
        <Form
          form={editForm}
          layout="vertical"
          onFinish={handleEditSubmit}
          className="mt-4"
        >
          <div className="space-y-4">
            {/* Product Name */}
            <Form.Item
              label="Product Name"
              name="name"
              rules={[
                { required: true, message: 'Please enter product name' },
                { min: 3, message: 'Product name must be at least 3 characters' }
              ]}
            >
              <Input 
                size="large"
                prefix={<TagOutlined />}
                placeholder="e.g., Premium Cotton T-Shirt"
              />
            </Form.Item>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* SKU */}
              <Form.Item
                label="SKU (Stock Keeping Unit)"
                name="sku"
                rules={[
                  { required: true, message: 'Please enter SKU' },
                  { pattern: /^[A-Z0-9-]+$/i, message: 'SKU should contain only letters, numbers, and hyphens' }
                ]}
              >
                <Input 
                  size="large"
                  prefix={<BarcodeOutlined />}
                  placeholder="e.g., PCT-BLK-L"
                />
              </Form.Item>

              {/* Weight */}
              <Form.Item
                label="Weight (kg)"
                name="weight"
                rules={[
                  { required: true, message: 'Please enter weight' },
                  { type: 'number', min: 0.01, message: 'Weight must be greater than 0' }
                ]}
              >
                <InputNumber
                  size="large"
                  placeholder="0.00"
                  step={0.01}
                  min={0.01}
                  className="w-full"
                  addonAfter="kg"
                />
              </Form.Item>
            </div>

            {/* Dimensions */}
            <Form.Item
              label="Dimensions (cm)"
              required
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Form.Item
                  name="length"
                  rules={[
                    { required: true, message: 'Length is required' },
                    { type: 'number', min: 0.1, message: 'Length must be greater than 0' }
                  ]}
                >
                  <InputNumber
                    size="large"
                    placeholder="Length"
                    min={0.1}
                    className="w-full"
                    addonAfter="cm"
                  />
                </Form.Item>

                <Form.Item
                  name="width"
                  rules={[
                    { required: true, message: 'Width is required' },
                    { type: 'number', min: 0.1, message: 'Width must be greater than 0' }
                  ]}
                >
                  <InputNumber
                    size="large"
                    placeholder="Width"
                    min={0.1}
                    className="w-full"
                    addonAfter="cm"
                  />
                </Form.Item>

                <Form.Item
                  name="height"
                  rules={[
                    { required: true, message: 'Height is required' },
                    { type: 'number', min: 0.1, message: 'Height must be greater than 0' }
                  ]}
                >
                  <InputNumber
                    size="large"
                    placeholder="Height"
                    min={0.1}
                    className="w-full"
                    addonAfter="cm"
                  />
                </Form.Item>
              </div>
            </Form.Item>

            {/* Stock Level */}
            <Form.Item
              label="Stock Level"
              name="stock"
              rules={[
                { required: true, message: 'Please enter stock level' },
                { type: 'number', min: 0, message: 'Stock level must be 0 or greater' }
              ]}
            >
              <InputNumber
                size="large"
                prefix={<InboxOutlined />}
                placeholder="e.g., 100"
                min={0}
                className="w-full"
              />
            </Form.Item>

            {/* Form Actions */}
            <div className="pt-4 border-t flex justify-end">
              <Space size="middle">
                <Button 
                  size="large"
                  onClick={handleEditCancel}
                >
                  Cancel
                </Button>
                <Button 
                  type="primary" 
                  size="large"
                  loading={editLoading}
                  htmlType="submit"
                >
                  Update Product
                </Button>
              </Space>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductsPage;
