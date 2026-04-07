// API service for SafeNest backend integration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Network error' }));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error);
      throw error;
    }
  }

  // Authentication endpoints
  async register(userData) {
    return this.request('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(email, password) {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  // Product/Resources endpoints (mapped to safety resources)
  async getAllResources() {
    return this.request('/api/products');
  }

  async getResourceById(id) {
    return this.request(`/api/products/${id}`);
  }

  async createResource(resourceData) {
    return this.request('/api/products', {
      method: 'POST',
      body: JSON.stringify(resourceData),
    });
  }

  async updateResource(id, resourceData) {
    return this.request(`/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(resourceData),
    });
  }

  async deleteResource(id) {
    return this.request(`/api/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Health check
  async healthCheck() {
    try {
      const response = await fetch(`${this.baseURL}/actuator/health`);
      return response.ok;
    } catch {
      return false;
    }
  }
}

export const apiService = new ApiService();
export default apiService;