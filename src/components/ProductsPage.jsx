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
  Modal 
} from 'antd';
import { 
  EditOutlined, 
  DeleteOutlined, 
  PlusOutlined,
  SearchOutlined 
} from '@ant-design/icons';
import { productService } from '../services/productService';

const { Search } = Input;

const ProductsPage = ({ onCreateProduct }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });

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
    message.info(`Edit product: ${product.name}`);
    // TODO: Implement edit functionality
  };

  const handleDelete = (productId) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this product?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await productService.deleteProduct(productId);
          message.success('Product deleted successfully');
          fetchProducts(pagination.current, pagination.pageSize, searchTerm);
        } catch {
          message.error('Failed to delete product');
        }
      },
    });
  };



  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
      width: 150,
    },
    {
      title: 'Weight (kg)',
      dataIndex: 'weight',
      key: 'weight',
      width: 100,
      render: (weight) => weight || '0',
    },
    {
      title: 'Dimensions (cm)',
      key: 'dimensions',
      width: 120,
      render: (_, record) => {
        const dims = record.dimensions;
        if (dims && dims.length && dims.width && dims.height) {
          return `${dims.length}x${dims.width}x${dims.height}`;
        }
        return 'N/A';
      },
    },
    {
      title: 'Stock Level',
      dataIndex: 'stock',
      key: 'stock',
      width: 120,
      render: (stock) => {
        let color = 'green';
        if (stock < 20) color = 'red';
        else if (stock < 50) color = 'orange';
        return <Tag color={color}>{stock}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 100,
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="link" 
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button 
            type="link" 
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Product Inventory</h1>
          <p className="text-gray-500">Add, manage, and track your product stock levels.</p>
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
        <div className="mb-4">
          <Search
            placeholder="Search by product name or SKU..."
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            onSearch={handleSearch}
            style={{ width: 400 }}
          />
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
    </div>
  );
};

export default ProductsPage;
