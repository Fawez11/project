import api from "./axiosConfig";

export const apiEndpoints = {
  // Fetch data (GET request)
  getData: async (endpoint, params = null) => {
    try {
      let url = endpoint;
      if (params) {
        const queryString = new URLSearchParams(params).toString();
        url = `${endpoint}${queryString ? "?" + queryString : ""}`;
      }
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message; // Return error details
    }
  },

  // Post data (POST request)
  postData: async (endpoint, data) => {
    try {
      const response = await api.post(endpoint, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update data (PUT request)
  updateData: async (endpoint, data) => {
    try {
      const response = await api.put(endpoint, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update data (PUT request)
  patchData: async (endpoint, data) => {
    try {
      const response = await api.patch(endpoint, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete data (DELETE request)
  deleteData: async (endpoint) => {
    try {
      const response = await api.delete(endpoint);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default apiEndpoints;
