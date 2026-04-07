import { useState, useEffect } from "react";
import "../secure.css";
import { apiService } from "../services/apiService";

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
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [newResource, setNewResource] = useState({
    name: "",
    description: "",
    resourceType: "SafetyTip",
    targetAudience: "Victim",
    contactInfo: "",
    emergencyHotline: "",
    priorityLevel: 1,
    imageUrl: ""
  });
  const [resourceSaved, setResourceSaved] = useState(false);

  useEffect(() => {
    if (activeTab === "users" || activeTab === "overview") {
      fetchResources();
    }
  }, [activeTab]);

  const fetchResources = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getAllResources();
      setResources(data);
    } catch (err) {
      setError("Failed to load resources: " + err.message);
      console.error("Error fetching resources:", err);
    } finally {
      setLoading(false);
    }
  };

  const addResource = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await apiService.createResource(newResource);
      setNewResource({
        name: "",
        description: "",
        resourceType: "SafetyTip",
        targetAudience: "Victim",
        contactInfo: "",
        emergencyHotline: "",
        priorityLevel: 1,
        imageUrl: ""
      });
      setResourceSaved(true);
      setTimeout(() => setResourceSaved(false), 2000);
      fetchResources(); // Refresh the list
    } catch (err) {
      setError("Failed to create resource: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteResource = async (id) => {
    if (!window.confirm("Are you sure you want to delete this resource?")) return;

    try {
      await apiService.deleteResource(id);
      fetchResources(); // Refresh the list
    } catch (err) {
      setError("Failed to delete resource: " + err.message);
    }
  };

  const filtered = resources.filter(r =>
    r.name?.toLowerCase().includes(search.toLowerCase()) ||
    r.description?.toLowerCase().includes(search.toLowerCase()) ||
    r.resourceType?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="dash-welcome">
        <h1>Admin Dashboard</h1>
        <p>Manage users, monitor security, and oversee platform activity.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card"><div className="stat-num">{resources.length}</div><p>Total Resources</p></div>
        <div className="stat-card"><div className="stat-num">{resources.filter(r => r.isActive).length}</div><p>Active Resources</p></div>
        <div className="stat-card"><div className="stat-num">{resources.filter(r => r.resourceType === "SafetyTip").length}</div><p>Safety Tips</p></div>
        <div className="stat-card"><div className="stat-num">{logs.filter(l => l.level === "danger" || l.level === "warning").length}</div><p>Security Alerts</p></div>
      </div>

      <div className="tab-bar">
        {["overview", "users", "security", "settings"].map(tab => (
          <button key={tab} className={`tab-btn ${activeTab === tab ? "active" : ""}`} onClick={() => setActiveTab(tab)}>
            {tab === "overview" && "📊 Dashboard & Analytics"}
            {tab === "users" && "📚 Resources"}
            {tab === "security" && "🔒 Security"}
            {tab === "settings" && "⚙️ Settings"}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="dash-grid">
          <div className="dash-card"><div className="dc-icon">📚</div><h3>Resource Management</h3><p>Manage safety resources, legal info, and support materials</p><button className="btn-card" onClick={() => setActiveTab("users")}>Manage Resources</button></div>
          <div className="dash-card"><div className="dc-icon">🔒</div><h3>Security</h3><p>Monitor security logs and data protection</p><button className="btn-card" onClick={() => setActiveTab("security")}>View Logs</button></div>
          <div className="dash-card"><div className="dc-icon">📊</div><h3>Analytics</h3><p>{resources.length} total resources, {resources.filter(r => r.isActive).length} active, {resources.filter(r => r.resourceType === "SafetyTip").length} safety tips</p><button className="btn-card">View Report</button></div>
          <div className="dash-card"><div className="dc-icon">⚙️</div><h3>Settings</h3><p>Configure platform settings and preferences</p><button className="btn-card" onClick={() => setActiveTab("settings")}>Open Settings</button></div>
        </div>
      )}

      {activeTab === "users" && (
        <div>
          {error && <div className="error-message" style={{ color: '#e53e3e', marginBottom: '16px', padding: '12px', backgroundColor: '#fed7d7', borderRadius: '8px', border: '1px solid #feb2b2' }}>{error}</div>}
          <div className="dash-card" style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3>📚 All Resources</h3>
              <input placeholder="Search resources..." value={search} onChange={e => setSearch(e.target.value)} style={{ padding: "10px 14px", borderRadius: "8px", border: "2px solid #e2e8f0", fontSize: "14px", width: "220px" }} />
            </div>
            {loading ? (
              <div style={{ textAlign: "center", padding: "20px" }}>Loading resources...</div>
            ) : (
              filtered.map(r => (
                <div key={r.id} className="list-item" style={{ justifyContent: "space-between" }}>
                  <div>
                    <strong>{r.name}</strong> — {r.resourceType} — <span style={{ color: "#6c63ff", fontWeight: "600" }}>{r.targetAudience}</span>
                    <br />
                    <small style={{ color: "#718096" }}>{r.description?.substring(0, 100)}...</small>
                  </div>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <span style={{ fontSize: "12px", padding: "4px 10px", borderRadius: "20px", background: r.isActive ? "#f0fff4" : "#fff5f5", color: r.isActive ? "#38a169" : "#e53e3e", fontWeight: "700" }}>{r.isActive ? "Active" : "Inactive"}</span>
                    <button onClick={() => deleteResource(r.id)} style={{ background: "none", border: "none", color: "#e53e3e", cursor: "pointer", fontWeight: "700" }}>✕</button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="dash-card">
            <h3>➕ Add New Resource</h3>
            <form onSubmit={addResource} className="auth-form" style={{ marginTop: "16px" }}>
              <div className="form-group"><label>Resource Name</label><input type="text" placeholder="Resource title" value={newResource.name} onChange={e => setNewResource({ ...newResource, name: e.target.value })} required disabled={loading} /></div>
              <div className="form-group"><label>Description</label><textarea placeholder="Detailed description" value={newResource.description} onChange={e => setNewResource({ ...newResource, description: e.target.value })} required disabled={loading} rows="3" /></div>
              <div className="form-group">
                <label>Resource Type</label>
                <select value={newResource.resourceType} onChange={e => setNewResource({ ...newResource, resourceType: e.target.value })} disabled={loading}>
                  <option value="SafetyTip">Safety Tip</option>
                  <option value="SupportService">Support Service</option>
                  <option value="LegalResource">Legal Resource</option>
                  <option value="CounselingTip">Counseling Tip</option>
                </select>
              </div>
              <div className="form-group">
                <label>Target Audience</label>
                <select value={newResource.targetAudience} onChange={e => setNewResource({ ...newResource, targetAudience: e.target.value })} disabled={loading}>
                  <option value="Victim">Victim / Survivor</option>
                  <option value="Counsellor">Counsellor</option>
                  <option value="LegalAdvisor">Legal Advisor</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div className="form-group"><label>Contact Info</label><input type="text" placeholder="Contact information or link" value={newResource.contactInfo} onChange={e => setNewResource({ ...newResource, contactInfo: e.target.value })} disabled={loading} /></div>
              <div className="form-group"><label>Emergency Hotline</label><input type="text" placeholder="Emergency contact number" value={newResource.emergencyHotline} onChange={e => setNewResource({ ...newResource, emergencyHotline: e.target.value })} disabled={loading} /></div>
              <div className="form-group"><label>Priority Level (1-10)</label><input type="number" min="1" max="10" value={newResource.priorityLevel} onChange={e => setNewResource({ ...newResource, priorityLevel: parseInt(e.target.value) })} disabled={loading} /></div>
              <div className="form-group"><label>Image URL</label><input type="url" placeholder="Image URL (optional)" value={newResource.imageUrl} onChange={e => setNewResource({ ...newResource, imageUrl: e.target.value })} disabled={loading} /></div>
              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? "Adding Resource..." : "Add Resource"}
              </button>
              {resourceSaved && <p style={{ color: "green", marginTop: "10px", fontWeight: "600" }}>✅ Resource added!</p>}
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
