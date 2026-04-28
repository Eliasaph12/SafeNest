import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  async request(config) {
    try {
      const response = await this.client(config);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw new Error("Cannot connect to backend. Make sure the Spring Boot server is running on http://localhost:8080.");
      }
      const message = error.response?.data?.error || error.message || 'Request failed';
      throw new Error(message);
    }
  }

  // Auth disabled - use mockApi.js
  async login(email, password) {
    return this.request({
      method: 'POST',
      url: '/api/auth/login',
      data: { email, password }
    });
  }
  async requestLoginOtp(email, password, phoneNumber) {
    return this.request({
      method: 'POST',
      url: '/api/auth/login',
      data: { email, password, phoneNumber }
    });
  }
  async verifyLoginOtp(verificationId, otp) {
    return this.request({
      method: 'POST',
      url: '/api/auth/login/verify-otp',
      data: { verificationId, otp }
    });
  }
  async register(userData) {
    return this.request({
      method: 'POST',
      url: '/api/auth/signup',
      data: userData
    });
  }
  async requestRegistrationOtp(userData) {
    return this.request({
      method: 'POST',
      url: '/api/auth/signup',
      data: userData
    });
  }
  async verifyRegistrationOtp(verificationId, otp) {
    return this.request({
      method: 'POST',
      url: '/api/auth/signup/verify-otp',
      data: { verificationId, otp }
    });
  }

  async getAllResources() {
    return this.request({
      method: 'GET',
      url: '/api/products',
    });
  }

  async getResourceById(id) {
    return this.request({
      method: 'GET',
      url: `/api/products/${id}`,
    });
  }

  async createResource(resource) {
    return this.request({
      method: 'POST',
      url: '/api/products',
      data: resource,
    });
  }

  async updateResource(id, resource) {
    return this.request({
      method: 'PUT',
      url: `/api/products/${id}`,
      data: resource,
    });
  }

  async deleteResource(id) {
    return this.request({
      method: 'DELETE',
      url: `/api/products/${id}`,
    });
  }

  async getCounsellorAppointments(counsellorId) {
    return this.request({
      method: 'GET',
      url: `/api/appointments/counsellor/${counsellorId}`,
    });
  }

  async getAppointmentsByVictim(victimId) {
    return this.request({
      method: 'GET',
      url: `/api/appointments/victim/${victimId}`,
    });
  }

  async createAppointment(appointment) {
    return this.request({
      method: 'POST',
      url: '/api/appointments',
      data: appointment,
    });
  }

  async deleteAppointment(id) {
    return this.request({
      method: 'DELETE',
      url: `/api/appointments/${id}`,
    });
  }

  async getCounsellorCaseNotes(counsellorId) {
    return this.request({
      method: 'GET',
      url: `/api/casenotes/counsellor/${counsellorId}`,
    });
  }

  async getCaseNotesByVictim(victimId) {
    return this.request({
      method: 'GET',
      url: `/api/casenotes/victim/${victimId}`,
    });
  }

  async createCaseNote(note) {
    return this.request({
      method: 'POST',
      url: '/api/casenotes',
      data: note,
    });
  }

  async deleteCaseNote(id) {
    return this.request({
      method: 'DELETE',
      url: `/api/casenotes/${id}`,
    });
  }

  async getLegalAdvisorCases(advisorId) {
    return this.request({
      method: 'GET',
      url: `/api/legalcases/advisor/${advisorId}`,
    });
  }

  async getLegalCasesByVictim(victimId) {
    return this.request({
      method: 'GET',
      url: `/api/legalcases/victim/${victimId}`,
    });
  }

  async createLegalCase(legalCase) {
    return this.request({
      method: 'POST',
      url: '/api/legalcases',
      data: legalCase,
    });
  }

  async deleteLegalCase(id) {
    return this.request({
      method: 'DELETE',
      url: `/api/legalcases/${id}`,
    });
  }

  async getChatMessages(senderId, receiverId, sessionId) {
    return this.request({
      method: 'GET',
      url: `/api/chat/messages?senderId=${senderId}&receiverId=${receiverId}${sessionId ? `&sessionId=${sessionId}` : ''}`,
    });
  }

  async getAuthorizedAgents() {
    return this.request({
      method: 'GET',
      url: '/api/chat/agents',
    });
  }

  async getPrimarySupportAgent() {
    return this.request({
      method: 'GET',
      url: '/api/chat/agent',
    });
  }

  async getAgentChatThreads(agentId) {
    return this.request({
      method: 'GET',
      url: `/api/chat/threads?agentId=${agentId}`,
    });
  }

  async getVictimChatSessions(victimId) {
    return this.request({
      method: 'GET',
      url: `/api/chat/sessions?victimId=${victimId}`,
    });
  }

  async createChatSession(victimId, agentId) {
    return this.request({
      method: 'POST',
      url: '/api/chat/sessions',
      data: { victimId, agentId },
    });
  }

  async closeChatSession(sessionId) {
    return this.request({
      method: 'POST',
      url: '/api/chat/sessions/close',
      data: { sessionId },
    });
  }

  async deleteChatSession(sessionId) {
    return this.request({
      method: 'POST',
      url: '/api/chat/sessions/delete',
      data: { sessionId },
    });
  }

  async sendChatMessage(messageData) {
    return this.request({
      method: 'POST',
      url: '/api/chat/messages',
      data: messageData,
    });
  }

  async getAllUsers() {
    return this.request({
      method: 'GET',
      url: '/api/admin/users',
    });
  }

  async getUserById(id) {
    return this.request({
      method: 'GET',
      url: `/api/admin/users/${id}`,
    });
  }

  async deleteUser(id) {
    return this.request({
      method: 'DELETE',
      url: `/api/admin/users/${id}`,
    });
  }

  async getSystemStats() {
    return this.request({
      method: 'GET',
      url: '/api/admin/stats',
    });
  }

  async getRecentActivities() {
    return this.request({
      method: 'GET',
      url: '/api/admin/activities',
    });
  }

  async healthCheck() {
    return this.request({
      method: 'GET',
      url: '/api/auth/health',
    });
  }

  getUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
}

export const apiService = new ApiService();
export default apiService;

