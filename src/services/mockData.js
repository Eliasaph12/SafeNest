// Mock data for all API calls
export const mockData = {
  products: [
    { id: 1, title: 'Emergency Contacts', description: 'Local helplines and support numbers', category: 'emergency' },
    { id: 2, title: 'Legal Rights Guide', description: 'Know your rights as a survivor', category: 'legal' },
    { id: 3, title: 'Safety Planning', description: 'Create your personal safety plan', category: 'safety' },
    { id: 4, title: 'Counselling Resources', description: 'Free counselling services', category: 'counselling' }
  ],
  appointments: [
    { id: 1, victimId: 'V001', type: 'VIDEO_CALL', appointmentDateTime: '2024-04-10T14:00:00', status: 'SCHEDULED', notes: 'Initial assessment' },
    { id: 2, victimId: 'V002', type: 'PHONE_CALL', appointmentDateTime: '2024-04-12T10:30:00', status: 'COMPLETED', notes: 'Follow-up session' }
  ],
  casenotes: [
    { id: 1, victimId: 'V001', content: 'Victim reports ongoing harassment. Recommended safety plan and legal consultation.', date: '2024-04-08' },
    { id: 2, victimId: 'V002', content: 'Good progress in session. Victim feeling more empowered.', date: '2024-04-07' }
  ],
  legalcases: [
    { id: 1, victimId: 'V001', title: 'Protection Order Request', status: 'PENDING', description: 'Harassment case' },
    { id: 2, victimId: 'V002', title: 'Divorce Proceedings', status: 'ACTIVE', description: 'Domestic violence survivor' }
  ],
  users: [
    { id: 1, name: 'Demo Victim', email: 'victim@example.com', role: 'Victim' },
    { id: 2, name: 'Demo Counsellor', email: 'counsellor@example.com', role: 'Counsellor' },
    { id: 3, name: 'Demo Legal Advisor', email: 'legal@example.com', role: 'LegalAdvisor' },
    { id: 4, name: 'Admin User', email: 'admin@example.com', role: 'Admin' }
  ],
  stats: {
    totalUsers: 24,
    activeSessions: 3,
    totalCases: 12,
    newRegistrationsToday: 2
  }
};

