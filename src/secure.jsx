import { useState } from "react";
import "./SFnest.css";

const SecureApp = () => {
  const [currentView, setCurrentView] = useState("home"); // home, login, register, dashboard
  const [userRole, setUserRole] = useState(null);
  const [showCallDialog, setShowCallDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Victim",
  });

  const quickExit = () => window.location.replace("https://www.google.com");
  const callEmergency = () => setShowCallDialog(true);
  const confirmCall = () => {
    setShowCallDialog(false);
    window.location.href = "tel:112";
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserRole(formData.role);
    setCurrentView("dashboard");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Register Data:", formData);
    setCurrentView("login");
  };

  const logout = () => {
    setUserRole(null);
    setCurrentView("home");
    setFormData({ name: "", email: "", password: "", role: "Victim" });
  };

  // Home Page
  if (currentView === "home") {
    return (
      <>
        <div className="sfnest-container">
          <header className="sfnest-header">
            <h1 className="sfnest-title">SafeSupport</h1>
            <p>Gender-Responsive Support Against Domestic Violence</p>
            <button onClick={quickExit} className="quick-exit-btn">
              ⚠️ Quick Exit
            </button>
          </header>

          <section className="hero">
            <h2>You Are Not Alone</h2>
            <p>
              Confidential support, legal guidance, and counselling for
              individuals facing domestic violence
            </p>
            <button className="sosButton" onClick={callEmergency}>
              🚨 Emergency Help
            </button>
          </section>

          <section className="services">
            <div className="service-card">
              <span className="service-icon">⚖️</span>
              <h3>Legal Rights</h3>
              <p>Protection laws, restraining orders, and legal options</p>
            </div>
            <div className="service-card">
              <span className="service-icon">💬</span>
              <h3>Counselling Support</h3>
              <p>Trained counsellors for emotional and psychological support</p>
            </div>
            <div className="service-card">
              <span className="service-icon">🏥</span>
              <h3>Health & Safety</h3>
              <p>Health risks, trauma recovery, and safety planning</p>
            </div>
          </section>

          <section className="cta">
            <h2>Reach Out for Help</h2>
            <p>
              Confidential. Secure. Gender-inclusive. Your safety comes first.
            </p>
            <button
              className="cta-button"
              onClick={() => setCurrentView("login")}
            >
              Get Started
            </button>
          </section>

          <footer className="footer">
            © 2026 SafeSupport | Confidential Help Platform
          </footer>
        </div>
        {showCallDialog && (
          <div className="overlay">
            <div className="call-dialog">
              <h2 className="call-title">Emergency Call</h2>
              <div className="call-number">112</div>
              <p className="call-text">
                Do you want to call emergency services?
              </p>
              <div className="call-buttons">
                <button onClick={confirmCall} className="call-btn">
                  📞 Call Now
                </button>
                <button
                  onClick={() => setShowCallDialog(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Login Page
  if (currentView === "login") {
    return (
      <div className="sfnest-container">
        <header className="sfnest-header">
          <button onClick={() => setCurrentView("home")} className="back-arrow">
            ← Back
          </button>
          <h1 className="sfnest-title">SafeSupport</h1>
          <button onClick={quickExit} className="quick-exit-btn">
            Quick Exit
          </button>
        </header>
        <div className="main-content">
          <form onSubmit={handleSubmit} className="form">
            <h2>Login</h2>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="Victim">Victim / Survivor</option>
              <option value="Counsellor">Counsellor</option>
              <option value="LegalAdvisor">Legal Advisor</option>
              <option value="Admin">Admin</option>
            </select>
            <button type="submit">Login</button>
            <p className="toggle-text">
              Don't have an account?
              <span
                className="toggle-link"
                onClick={() => setCurrentView("register")}
              >
                Register
              </span>
            </p>
          </form>
        </div>
      </div>
    );
  }

  // Register Page
  if (currentView === "register") {
    return (
      <div className="sfnest-container">
        <header className="sfnest-header">
          <button
            onClick={() => setCurrentView("login")}
            className="back-arrow"
          >
            ← Back
          </button>
          <h1 className="sfnest-title">SafeSupport</h1>
          <button onClick={quickExit} className="quick-exit-btn">
            Quick Exit
          </button>
        </header>
        <div className="main-content">
          <form onSubmit={handleRegister} className="form">
            <h2>Register</h2>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="Victim">Victim / Survivor</option>
              <option value="Counsellor">Counsellor</option>
              <option value="LegalAdvisor">Legal Advisor</option>
              <option value="Admin">Admin</option>
            </select>
            <button type="submit">Register</button>
            <p className="toggle-text">
              Already have an account?
              <span
                className="toggle-link"
                onClick={() => setCurrentView("login")}
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard - Role-based
  if (currentView === "dashboard") {
    return (
      <div className="dashboard-container">
        <nav className="navbar">
          <button
            onClick={() => setCurrentView("login")}
            className="back-arrow"
          >
            ← Back
          </button>
          <h1 className="nav-title">SafeSupport</h1>
          <div className="nav-right">
            <span className="user-badge">{userRole}</span>
            <button onClick={quickExit} className="nav-exit-btn">
              ⚠️ Quick Exit
            </button>
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </div>
        </nav>

        <div className="dashboard-layout">
          <aside className="sidebar">
            <div className="sidebar-item">📊 Dashboard</div>
            {userRole === "Victim" && (
              <>
                <div className="sidebar-item">🆘 Get Help</div>
                <div className="sidebar-item">📚 Resources</div>
                <div className="sidebar-item">💬 Chat Support</div>
                <div className="sidebar-item">⚖️ Legal Info</div>
              </>
            )}
            {userRole === "Counsellor" && (
              <>
                <div className="sidebar-item">👥 My Clients</div>
                <div className="sidebar-item">📅 Appointments</div>
                <div className="sidebar-item">📝 Case Notes</div>
                <div className="sidebar-item">📊 Progress Reports</div>
              </>
            )}
            {userRole === "LegalAdvisor" && (
              <>
                <div className="sidebar-item">⚖️ Cases</div>
                <div className="sidebar-item">📄 Legal Documents</div>
                <div className="sidebar-item">📚 Law Resources</div>
                <div className="sidebar-item">👥 Consultations</div>
              </>
            )}
            {userRole === "Admin" && (
              <>
                <div className="sidebar-item">👥 User Management</div>
                <div className="sidebar-item">📊 Analytics</div>
                <div className="sidebar-item">🔒 Security</div>
                <div className="sidebar-item">⚙️ Settings</div>
              </>
            )}
          </aside>

          <main className="main-content-area">
            {userRole === "Victim" && (
              <VictimDashboard callEmergency={callEmergency} />
            )}
            {userRole === "Counsellor" && <CounsellorDashboard />}
            {userRole === "LegalAdvisor" && <LegalAdvisorDashboard />}
            {userRole === "Admin" && <AdminDashboard />}
          </main>
        </div>
      </div>
    );
  }
};

// Victim Dashboard
const VictimDashboard = ({ callEmergency }) => (
  <div>
    <h1 className="dash-title">Welcome to Your Safe Space</h1>
    <div className="alert-box">
      <h3>🚨 Emergency Support</h3>
      <p>If you're in immediate danger, call emergency services</p>
      <button onClick={callEmergency} className="emergency-btn">
        Call 112 Now
      </button>
    </div>
    <div className="grid">
      <div className="dash-card">
        <h3>📚 Legal Rights</h3>
        <p>
          Learn about protection orders, restraining orders, and your legal
          options
        </p>
        <button className="card-btn">View Resources</button>
      </div>
      <div className="dash-card">
        <h3>💬 Counselling</h3>
        <p>Connect with trained counsellors for emotional support</p>
        <button className="card-btn">Book Session</button>
      </div>
      <div className="dash-card">
        <h3>🏥 Health Support</h3>
        <p>Access health resources and trauma recovery guidance</p>
        <button className="card-btn">Get Help</button>
      </div>
      <div className="dash-card">
        <h3>🛡️ Safety Planning</h3>
        <p>Create a personalized safety plan for you and your family</p>
        <button className="card-btn">Create Plan</button>
      </div>
    </div>
  </div>
);

// Counsellor Dashboard
const CounsellorDashboard = () => (
  <div>
    <h1 className="dash-title">Counsellor Dashboard</h1>
    <div className="stats-grid">
      <div className="stat-card">
        <h2>24</h2>
        <p>Active Clients</p>
      </div>
      <div className="stat-card">
        <h2>8</h2>
        <p>Appointments Today</p>
      </div>
      <div className="stat-card">
        <h2>156</h2>
        <p>Total Sessions</p>
      </div>
    </div>
    <div className="dash-card">
      <h3>📅 Upcoming Appointments</h3>
      <div className="list-item">
        Client A - 10:00 AM - Initial Consultation
      </div>
      <div className="list-item">Client B - 2:00 PM - Follow-up Session</div>
      <div className="list-item">Client C - 4:30 PM - Crisis Intervention</div>
    </div>
  </div>
);

// Legal Advisor Dashboard
const LegalAdvisorDashboard = () => (
  <div>
    <h1 className="dash-title">Legal Advisor Dashboard</h1>
    <div className="stats-grid">
      <div className="stat-card">
        <h2>15</h2>
        <p>Active Cases</p>
      </div>
      <div className="stat-card">
        <h2>6</h2>
        <p>Pending Reviews</p>
      </div>
      <div className="stat-card">
        <h2>42</h2>
        <p>Completed Cases</p>
      </div>
    </div>
    <div className="dash-card">
      <h3>⚖️ Recent Cases</h3>
      <div className="list-item">
        Case #2024-001 - Protection Order - In Progress
      </div>
      <div className="list-item">
        Case #2024-002 - Restraining Order - Approved
      </div>
      <div className="list-item">
        Case #2024-003 - Legal Consultation - Scheduled
      </div>
    </div>
  </div>
);

// Admin Dashboard
const AdminDashboard = () => (
  <div>
    <h1 className="dash-title">Admin Dashboard</h1>
    <div className="stats-grid">
      <div className="stat-card">
        <h2>342</h2>
        <p>Total Users</p>
      </div>
      <div className="stat-card">
        <h2>28</h2>
        <p>Active Cases</p>
      </div>
      <div className="stat-card">
        <h2>15</h2>
        <p>Staff Members</p>
      </div>
    </div>
    <div className="grid">
      <div className="dash-card">
        <h3>👥 User Management</h3>
        <p>Manage user accounts, roles, and permissions</p>
        <button className="card-btn">Manage Users</button>
      </div>
      <div className="dash-card">
        <h3>🔒 Security</h3>
        <p>Monitor security logs and data protection</p>
        <button className="card-btn">View Logs</button>
      </div>
    </div>
  </div>
);

const styles = {
  // All styles are now handled in SFnest.css using CSS classes
};

export default SecureApp;
