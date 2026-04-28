// Mock API Service - Frontend Only
// Redirects to mock data (uses same store as apiService conceptually)

import { apiService } from './apiService.js';  // Reuse main mock service

const API_BASE_URL = 'mock://localhost:8080/demo';  // Demo URL

export const api = {
  // Auth endpoints - delegate to apiService
  auth: {
    signup: apiService.register.bind(apiService),
    login: apiService.login.bind(apiService),
    logout: () => {
      localStorage.removeItem('mockUser');
      localStorage.removeItem('mockToken');
    },
  },

  // Safety Resources endpoints - delegate to apiService
  resources: {
    getAll: apiService.getAllResources.bind(apiService),
    getById: apiService.getResourceById.bind(apiService),
    create: apiService.createResource.bind(apiService),
    update: apiService.updateResource.bind(apiService),
    delete: apiService.deleteResource.bind(apiService),
  },
};

export default api;

