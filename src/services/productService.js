import api, { handleApiError } from './api';

// Product API service
export const productService = {
  // Get all products with pagination and search
  getProducts: async (page = 1, limit = 10, search = '') => {
    try {
      const response = await api.get('/products', {
        params: { page, limit, search }
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Get product by ID
  getProductById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Create new product
  createProduct: async (productData) => {
    try {
      const response = await api.post('/products', productData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Update product
  updateProduct: async (id, productData) => {
    try {
      const response = await api.put(`/products/${id}`, productData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Delete product
  deleteProduct: async (id) => {
    try {
      const response = await api.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Update product stock
  updateStock: async (id, stockData) => {
    try {
      const response = await api.patch(`/products/${id}/stock`, stockData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Get low stock products
  getLowStockProducts: async (threshold = 10) => {
    try {
      const response = await api.get('/products/low-stock', {
        params: { threshold }
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Bulk update products
  bulkUpdateProducts: async (productsData) => {
    try {
      const response = await api.patch('/products/bulk-update', productsData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
};

export default productService;
