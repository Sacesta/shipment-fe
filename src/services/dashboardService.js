import api, { handleApiError } from './api';

// Dashboard API service
export const dashboardService = {
  // Get dashboard overview statistics
  getDashboardStats: async (period = '7days') => {
    try {
      const response = await api.get('/dashboard/stats', {
        params: { period }
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Get shipment activity chart data
  getShipmentActivity: async (period = '7days') => {
    try {
      const response = await api.get('/dashboard/activity', {
        params: { period }
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Get recent shipments
  getRecentShipments: async (limit = 5) => {
    try {
      const response = await api.get('/dashboard/recent-shipments', {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Get performance metrics
  getPerformanceMetrics: async () => {
    try {
      const response = await api.get('/dashboard/performance');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Get courier performance
  getCourierPerformance: async () => {
    try {
      const response = await api.get('/dashboard/courier-performance');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Get revenue metrics
  getRevenueMetrics: async (period = 'month') => {
    try {
      const response = await api.get('/dashboard/revenue', {
        params: { period }
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
};

export default dashboardService;
