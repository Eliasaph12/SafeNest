import { useState, useEffect } from "react";
import "../secure.css";
import { apiService } from "../services/apiService.js";
import AgentSupportChat from "./AgentSupportChat";

const AdminDashboard = ({ activeTab, setActiveTab, user }) => {
  const ACTIVITY_POLL_INTERVAL_MS = 5000;
  activeTab = activeTab || "overview";
  setActiveTab = setActiveTab || (() => {});

  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (activeTab === "support") {
      return;
    }
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [usersData, statsData, activityData] = await Promise.all([
        apiService.getAllUsers(),
        apiService.getSystemStats(),
        apiService.getRecentActivities(),
      ]);
      setUsers(usersData);
      setStats(statsData);
      setActivities(Array.isArray(activityData) ? activityData : []);
    } catch (err) {
      setError("Failed to load data: " + err.message);
      setUsers([]);
      setStats({});
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "support") {
      return;
    }

    const refreshActivities = async () => {
      try {
        const activityData = await apiService.getRecentActivities();
        setActivities(activityData || []);
      } catch (err) {
        setError((current) => current || "Failed to load activity feed: " + err.message);
      }
    };

    const intervalId = window.setInterval(refreshActivities, ACTIVITY_POLL_INTERVAL_MS);
    return () => window.clearInterval(intervalId);
  }, [activeTab]);

  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await apiService.deleteUser(userId);
      setSuccessMessage("User deleted successfully");
      setTimeout(() => setSuccessMessage(""), 2000);
      loadData();
    } catch (err) {
      setError("Failed to delete user: " + err.message);
    }
  };

  const filteredUsers = users.filter((userItem) =>
    userItem.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    userItem.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    userItem.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleColor = (role) => {
    const colors = {
      Victim: "red",
      Counsellor: "blue",
      LegalAdvisor: "purple",
      Admin: "green",
    };
    return colors[role] || "gray";
  };

  const getLogLevel = (actionType) => {
    if (!actionType) {
      return "blue";
    }
    if (actionType.includes("DELETED")) {
      return "red";
    }
    if (actionType.includes("CLOSED")) {
      return "yellow";
    }
    return "blue";
  };

  return (
    <div>
      <div className="dash-welcome">
        <h1>Admin Dashboard</h1>
        <p>Manage users, monitor system health, and oversee platform activity.</p>
      </div>

      {activeTab !== "support" && (
        <>
          {loading ? (
            <div style={{ textAlign: "center", padding: "40px" }}>Loading dashboard data...</div>
          ) : (
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-num">{stats.totalUsers || 0}</div>
                <p>Total Users</p>
              </div>
              <div className="stat-card">
                <div className="stat-num">{stats.victimCount || 0}</div>
                <p>Victims</p>
              </div>
              <div className="stat-card">
                <div className="stat-num">{stats.counsellorCount || 0}</div>
                <p>Counsellors</p>
              </div>
              <div className="stat-card">
                <div className="stat-num">{stats.legalAdvisorCount || 0}</div>
                <p>Legal Advisors</p>
              </div>
            </div>
          )}

          <div className="tab-bar">
            {["overview", "users", "support", "security", "settings"].map((tab) => (
              <button key={tab} className={`tab-btn ${activeTab === tab ? "active" : ""}`} onClick={() => setActiveTab(tab)}>
                {tab === "overview" && "Overview"}
                {tab === "users" && "Users"}
                {tab === "support" && "Support Inbox"}
                {tab === "security" && "Security"}
                {tab === "settings" && "Settings"}
              </button>
            ))}
          </div>
        </>
      )}

      {error && <div style={{ color: "#e53e3e", backgroundColor: "#fed7d7", padding: "12px", borderRadius: "8px", marginBottom: "16px" }}>{error}</div>}
      {successMessage && <div style={{ color: "#22543d", backgroundColor: "#c6f6d5", padding: "12px", borderRadius: "8px", marginBottom: "16px" }}>{successMessage}</div>}

      {activeTab === "overview" && !loading && (
        <div>
          <div className="dash-card" style={{ marginBottom: "20px" }}>
            <h3>System Overview</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginTop: "16px" }}>
              <div style={{ padding: "12px", backgroundColor: "#edf2f7", borderRadius: "8px", borderLeft: "4px solid #2d3748" }}>
                <p style={{ margin: 0, fontSize: "12px", color: "#718096", fontWeight: "600" }}>TOTAL USERS</p>
                <p style={{ margin: "8px 0 0 0", fontSize: "24px", fontWeight: "700" }}>{stats.totalUsers || 0}</p>
              </div>
              <div style={{ padding: "12px", backgroundColor: "#fed7d7", borderRadius: "8px", borderLeft: "4px solid #e53e3e" }}>
                <p style={{ margin: 0, fontSize: "12px", color: "#742a2a", fontWeight: "600" }}>VICTIMS</p>
                <p style={{ margin: "8px 0 0 0", fontSize: "24px", fontWeight: "700" }}>{stats.victimCount || 0}</p>
              </div>
              <div style={{ padding: "12px", backgroundColor: "#c6f6d5", borderRadius: "8px", borderLeft: "4px solid #22543d" }}>
                <p style={{ margin: 0, fontSize: "12px", color: "#22543d", fontWeight: "600" }}>COUNSELLORS</p>
                <p style={{ margin: "8px 0 0 0", fontSize: "24px", fontWeight: "700" }}>{stats.counsellorCount || 0}</p>
              </div>
              <div style={{ padding: "12px", backgroundColor: "#bee3f8", borderRadius: "8px", borderLeft: "4px solid #2c5282" }}>
                <p style={{ margin: 0, fontSize: "12px", color: "#2c5282", fontWeight: "600" }}>LEGAL ADVISORS</p>
                <p style={{ margin: "8px 0 0 0", fontSize: "24px", fontWeight: "700" }}>{stats.legalAdvisorCount || 0}</p>
              </div>
            </div>
          </div>

          <div className="dash-card">
            <h3>Recent Activity Logs</h3>
            {activities.length === 0 ? (
              <p style={{ color: "#718096" }}>No recent activity recorded yet.</p>
            ) : (
              activities.map((log) => (
              <div key={log.id} className="list-item">
                <span className={`li-dot ${getLogLevel(log.actionType)}`}></span>
                <div style={{ flex: 1 }}>
                  <strong>{log.description}</strong>
                  <small style={{ display: "block", color: "#718096", marginTop: "4px" }}>
                    {log.actorName} ({log.actorRole}) • {new Date(log.createdAt).toLocaleString()}
                  </small>
                  {log.details && (
                    <small style={{ display: "block", color: "#94a3b8", marginTop: "4px" }}>{log.details}</small>
                  )}
                </div>
              </div>
            )))}
          </div>
        </div>
      )}

      {activeTab === "users" && (
        <div className="dash-card">
          <div style={{ marginBottom: "16px" }}>
            <input
              type="text"
              placeholder="Search users by name, email, or role..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "2px solid #e2e8f0", fontSize: "14px", fontFamily: "inherit" }}
            />
          </div>
          <h3>All Users ({filteredUsers.length})</h3>
          {filteredUsers.length === 0 ? (
            <p style={{ color: "#718096" }}>No users found</p>
          ) : (
            filteredUsers.map((userItem) => (
              <div key={userItem.id} className="list-item" style={{ justifyContent: "space-between", flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1, minWidth: "250px" }}>
                  <span className={`li-dot ${getRoleColor(userItem.role)}`}></span>
                  <div style={{ flex: 1 }}>
                    <strong>{userItem.name}</strong>
                    <br />
                    <small>{userItem.email}</small>
                    <br />
                    <small style={{ color: "#718096", marginTop: "4px" }}>Role: <strong>{userItem.role}</strong></small>
                  </div>
                </div>
                <button onClick={() => deleteUser(userItem.id)} style={{ background: "none", border: "none", color: "#e53e3e", cursor: "pointer", fontWeight: "700", padding: "4px 8px" }}>
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "support" && <AgentSupportChat agent={user} />}

      {activeTab === "security" && (
        <div className="dash-card">
          <h3>Security Settings</h3>
          <div style={{ marginTop: "16px" }}>
            <div style={{ marginBottom: "16px", padding: "12px", backgroundColor: "#edf2f7", borderRadius: "8px" }}>
              <h4 style={{ margin: "0 0 8px 0" }}>Two-Factor Authentication</h4>
              <p style={{ margin: 0, fontSize: "14px", color: "#4a5568" }}>2FA is enabled for all admin accounts</p>
            </div>
            <div style={{ marginBottom: "16px", padding: "12px", backgroundColor: "#edf2f7", borderRadius: "8px" }}>
              <h4 style={{ margin: "0 0 8px 0" }}>SSL/TLS Encryption</h4>
              <p style={{ margin: 0, fontSize: "14px", color: "#4a5568" }}>All data is encrypted in transit</p>
            </div>
            <div style={{ marginBottom: "16px", padding: "12px", backgroundColor: "#edf2f7", borderRadius: "8px" }}>
              <h4 style={{ margin: "0 0 8px 0" }}>Password Policy</h4>
              <p style={{ margin: 0, fontSize: "14px", color: "#4a5568" }}>Minimum 6 characters with strong encryption</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "settings" && (
        <div className="dash-card">
          <h3>Platform Settings</h3>
          <div style={{ marginTop: "16px" }}>
            <div style={{ marginBottom: "16px", padding: "12px", backgroundColor: "#edf2f7", borderRadius: "8px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
                <input type="checkbox" defaultChecked />
                <span><strong>Enable Email Notifications</strong></span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
