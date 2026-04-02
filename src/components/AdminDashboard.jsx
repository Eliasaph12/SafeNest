import { useState } from "react";
import "../secure.css";

const initialUsers = [
  { id: 1, name: "Sarah M.", email: "sarah@example.com", role: "Victim", status: "Active" },
  { id: 2, name: "Dr. James K.", email: "james@example.com", role: "Counsellor", status: "Active" },
  { id: 3, name: "Adv. Priya S.", email: "priya@example.com", role: "LegalAdvisor", status: "Active" },
  { id: 4, name: "Maria L.", email: "maria@example.com", role: "Victim", status: "Inactive" },
];

const logs = [
  { time: "09:12 AM", event: "User login — Counsellor", level: "info" },
  { time: "09:45 AM", event: "New case created — Protection Order", level: "info" },
  { time: "10:30 AM", event: "Failed login attempt", level: "warning" },
  { time: "11:00 AM", event: "User role updated — Admin", level: "info" },
  { time: "11:45 AM", event: "Unauthorized access attempt blocked", level: "danger" },
];

const AdminDashboard = ({ activeTab, setActiveTab }) => {
  activeTab = activeTab || "overview";
  setActiveTab = setActiveTab || (() => {});
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "Victim" });
  const [userSaved, setUserSaved] = useState(false);

  const addUser = (e) => {
    e.preventDefault();
    setUsers([...users, { id: Date.now(), ...newUser, status: "Active" }]);
    setNewUser({ name: "", email: "", role: "Victim" });
    setUserSaved(true);
    setTimeout(() => setUserSaved(false), 2000);
  };

  const toggleStatus = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u));
  };

  const removeUser = (id) => setUsers(users.filter(u => u.id !== id));

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="dash-welcome">
        <h1>Admin Dashboard</h1>
        <p>Manage users, monitor security, and oversee platform activity.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card"><div className="stat-num">{users.length}</div><p>Total Users</p></div>
        <div className="stat-card"><div className="stat-num">{users.filter(u => u.status === "Active").length}</div><p>Active Users</p></div>
        <div className="stat-card"><div className="stat-num">{users.filter(u => u.role === "Victim").length}</div><p>Survivors</p></div>
        <div className="stat-card"><div className="stat-num">{logs.filter(l => l.level === "danger" || l.level === "warning").length}</div><p>Security Alerts</p></div>
      </div>

      <div className="tab-bar">
        {["overview", "users", "security", "settings"].map(tab => (
          <button key={tab} className={`tab-btn ${activeTab === tab ? "active" : ""}`} onClick={() => setActiveTab(tab)}>
            {tab === "overview" && "📊 Dashboard & Analytics"}
            {tab === "users" && "👥 Users"}
            {tab === "security" && "🔒 Security"}
            {tab === "settings" && "⚙️ Settings"}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="dash-grid">
          <div className="dash-card"><div className="dc-icon">👥</div><h3>User Management</h3><p>Manage user accounts, roles, and permissions</p><button className="btn-card" onClick={() => setActiveTab("users")}>Manage Users</button></div>
          <div className="dash-card"><div className="dc-icon">🔒</div><h3>Security</h3><p>Monitor security logs and data protection</p><button className="btn-card" onClick={() => setActiveTab("security")}>View Logs</button></div>
          <div className="dash-card"><div className="dc-icon">📊</div><h3>Analytics</h3><p>{users.length} total users, {users.filter(u => u.status === "Active").length} active, {users.filter(u => u.role === "Victim").length} survivors</p><button className="btn-card">View Report</button></div>
          <div className="dash-card"><div className="dc-icon">⚙️</div><h3>Settings</h3><p>Configure platform settings and preferences</p><button className="btn-card" onClick={() => setActiveTab("settings")}>Open Settings</button></div>
        </div>
      )}

      {activeTab === "users" && (
        <div>
          <div className="dash-card" style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3>👥 All Users</h3>
              <input placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} style={{ padding: "10px 14px", borderRadius: "8px", border: "2px solid #e2e8f0", fontSize: "14px", width: "220px" }} />
            </div>
            {filtered.map(u => (
              <div key={u.id} className="list-item" style={{ justifyContent: "space-between" }}>
                <div>
                  <strong>{u.name}</strong> — {u.email} — <span style={{ color: "#6c63ff", fontWeight: "600" }}>{u.role}</span>
                </div>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <span style={{ fontSize: "12px", padding: "4px 10px", borderRadius: "20px", background: u.status === "Active" ? "#f0fff4" : "#fff5f5", color: u.status === "Active" ? "#38a169" : "#e53e3e", fontWeight: "700" }}>{u.status}</span>
                  <button onClick={() => toggleStatus(u.id)} className="btn-card" style={{ padding: "6px 12px", fontSize: "12px" }}>Toggle</button>
                  <button onClick={() => removeUser(u.id)} style={{ background: "none", border: "none", color: "#e53e3e", cursor: "pointer", fontWeight: "700" }}>✕</button>
                </div>
              </div>
            ))}
          </div>
          <div className="dash-card">
            <h3>➕ Add New User</h3>
            <form onSubmit={addUser} className="auth-form" style={{ marginTop: "16px" }}>
              <div className="form-group"><label>Full Name</label><input type="text" placeholder="Full name" value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} required /></div>
              <div className="form-group"><label>Email</label><input type="email" placeholder="Email address" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} required /></div>
              <div className="form-group">
                <label>Role</label>
                <select value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })}>
                  <option value="Victim">Victim / Survivor</option>
                  <option value="Counsellor">Counsellor</option>
                  <option value="LegalAdvisor">Legal Advisor</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <button type="submit" className="btn-submit">Add User</button>
              {userSaved && <p style={{ color: "green", marginTop: "10px", fontWeight: "600" }}>✅ User added!</p>}
            </form>
          </div>
        </div>
      )}

      {activeTab === "security" && (
        <div className="dash-card">
          <h3>🔒 Security Logs</h3>
          <div style={{ marginTop: "16px" }}>
            {logs.map((l, i) => (
              <div key={i} className="list-item">
                <span className={`li-dot ${l.level === "danger" ? "red" : l.level === "warning" ? "yellow" : "green"}`}></span>
                <span style={{ color: "#718096", fontSize: "13px", minWidth: "80px" }}>{l.time}</span>
                <span>{l.event}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "settings" && (
        <div className="dash-card">
          <h3>⚙️ Platform Settings</h3>
          <div className="auth-form" style={{ marginTop: "20px" }}>
            <div className="form-group"><label>Platform Name</label><input type="text" defaultValue="SafeSupport" /></div>
            <div className="form-group"><label>Support Email</label><input type="email" defaultValue="support@safesupport.org" /></div>
            <div className="form-group"><label>Emergency Number</label><input type="text" defaultValue="112" /></div>
            <div className="form-group">
              <label>Maintenance Mode</label>
              <select defaultValue="off"><option value="off">Off</option><option value="on">On</option></select>
            </div>
            <button className="btn-submit">Save Settings</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
