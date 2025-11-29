import api, { handleApiError } from './api';

// Shipment API service
export const shipmentService = {
  // Get all shipments with pagination
  getShipments: async (page = 1, limit = 10, search = '') => {
    try {
      const response = await api.get('/shipments', {
        params: { page, limit, search }
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Get shipment by ID
  getShipmentById: async (id) => {
    try {
      const response = await api.get(`/shipments/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Create new shipment
  createShipment: async (shipmentData) => {
    try {
      const response = await api.post('/shipments', shipmentData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Update shipment
  updateShipment: async (id, shipmentData) => {
    try {
      const response = await api.put(`/shipments/${id}`, shipmentData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Delete shipment
  deleteShipment: async (id) => {
    try {
      const response = await api.delete(`/shipments/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Get shipment tracking information
  trackShipment: async (awbNumber) => {
    try {
      const response = await api.get(`/shipments/track/${awbNumber}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Download shipment label
  downloadLabel: async (id) => {
    try {
      const response = await api.get(`/shipments/${id}/label`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Get shipment statistics
  getShipmentStats: async () => {
    try {
      const response = await api.get('/shipments/stats');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
};

export default shipmentService;
