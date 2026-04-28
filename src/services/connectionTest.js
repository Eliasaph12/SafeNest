import apiService from './apiService';

// Static connection test for demo mode
export const testConnection = async () => ({
  status: 'connected (demo mode)',
  backendUrl: 'mock://localhost:8080/demo',
  timestamp: new Date().toISOString(),
  note: 'Fully frontend - no backend required'
});

export const testAuthEndpoints = async () => ({
  signup: { status: 'ok (mock)', message: 'Demo auth works' },
  login: { status: 'ok (mock)', message: 'Demo auth works' },
});

export const testResourcesEndpoints = async () => ({
  status: 'ok (mock)',
  message: 'Demo resources loaded',
  count: 2,
});

