const mockUsers = [
  { id: 1, name: 'Demo Victim', email: 'victim@example.com', password: 'demo123', role: 'Victim' },
  { id: 2, name: 'Demo Counsellor', email: 'counsellor@example.com', password: 'demo123', role: 'Counsellor' },
  { id: 3, name: 'Demo Legal Advisor', email: 'legal@example.com', password: 'demo123', role: 'LegalAdvisor' },
  { id: 4, name: 'Admin User', email: 'admin@example.com', password: 'demo123', role: 'Admin' },
];

const generateToken = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

const mockLogin = async (email, password) => {
  const user = mockUsers.find(u => u.email === email && u.password === password);
  if (!user) throw new Error('Invalid email or password');
  const token = generateToken();
  localStorage.setItem('user', JSON.stringify({ ...user, token }));
  localStorage.setItem('token', token);
  return { user, token };
};

const mockRegister = async (userData) => {
  const existing = mockUsers.find(u => u.email === userData.email);
  if (existing) throw new Error('Email already registered');
  const newUser = { ...userData, id: mockUsers.length + 1 };
  mockUsers.push(newUser);
  const token = generateToken();
  localStorage.setItem('user', JSON.stringify({ ...newUser, token }));
  localStorage.setItem('token', token);
  return { user: newUser, token };
};

export { mockLogin, mockRegister };

