import api, { handleApiError } from './api';

// Authentication API service
export const authService = {
  // User login
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      
      // Store token in localStorage - fixed to match actual API response structure
      if (response.data.data && response.data.data.token) {
        localStorage.setItem('authToken', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data));
      }
      
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // User logout
  logout: async () => {
    try {
      // Clear local storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      
      // Optional: Call backend logout endpoint if available
      // await api.post('/auth/logout');
      
      return { success: true };
    } catch (error) {
      // Still clear local storage even if API call fails
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      throw handleApiError(error);
    }
  },

  // Get current user profile
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Refresh token
  refreshToken: async () => {
    try {
      const response = await api.post('/auth/refresh');
      
      if (response.data.data && response.data.data.token) {
        localStorage.setItem('authToken', response.data.data.token);
      }
      
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('authToken');
    return !!token;
  },

  // Get stored user data
  getStoredUser: () => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  // Update user profile
  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/auth/profile', profileData);
      
      // Update stored user data
      if (response.data.data) {
        localStorage.setItem('user', JSON.stringify(response.data.data));
      }
      
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Change password
  changePassword: async (passwordData) => {
    try {
      const response = await api.put('/auth/password', passwordData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
};

export default authService;
