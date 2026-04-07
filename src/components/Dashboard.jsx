import { useState } from "react";
import "../secure.css";
import VictimDashboard from "./VictimDashboard";
import CounsellorDashboard from "./CounsellorDashboard";
import LegalAdvisorDashboard from "./LegalAdvisorDashboard";
import AdminDashboard from "./AdminDashboard";
import CallDialog from "./CallDialog";
import ThemeToggle from "./ThemeToggle";

const sidebarMenus = {
  Victim: [
    { label: "📊 Dashboard", tab: "overview" },
    { label: "🆘 Get Help / Chat Support", tab: "chat" },
    { label: "📚 Resources & Legal Info", tab: "resources" },
    { label: "🛡️ Safety Plan", tab: "safety" },
  ],
  Counsellor: [
    { label: "📊 Dashboard", tab: "overview" },
    { label: "👥 My Clients", tab: "overview" },
    { label: "📅 Appointments", tab: "appointments" },
    { label: "📝 Case Notes", tab: "notes" },
    { label: "📊 Progress Reports", tab: "overview" },
  ],
  LegalAdvisor: [
    { label: "📊 Dashboard", tab: "overview" },
    { label: "⚖️ Cases", tab: "cases" },
    { label: "📄 Legal Documents", tab: "resources" },
    { label: "📚 Law Resources", tab: "resources" },
    { label: "👥 Consultations", tab: "cases" },
  ],
  Admin: [
    { label: "📊 Dashboard & Analytics", tab: "overview" },
    { label: "👥 User Management", tab: "users" },
    { label: "🔒 Security", tab: "security" },
    { label: "⚙️ Settings", tab: "settings" },
  ],
};

const Dashboard = ({ user, onNavigate, onQuickExit, onLogout, showCallDialog, onEmergency, onConfirmCall, onCancelCall }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeSidebarItem, setActiveSidebarItem] = useState(0);

  const handleSidebarClick = (tab, index) => {
    setActiveTab(tab);
    setActiveSidebarItem(index);
  };

  const menu = sidebarMenus[user?.role] || [];
  const userRole = user?.role;

  return (
    <div className="dashboard-page">
      <nav className="dash-navbar">
        <button className="btn-back" onClick={() => onNavigate("login")}>← Back</button>
        <div className="dash-logo">🛡️ SafeSupport</div>
        <div className="dash-nav-right">
          <ThemeToggle />
          <span className="role-badge">{userRole}</span>
          <button className="btn-danger-sm" onClick={onQuickExit}>⚠️ Quick Exit</button>
          <button className="btn-logout" onClick={onLogout}>Logout</button>
        </div>
      </nav>

      <div className="dash-layout">
        <aside className="dash-sidebar">
          <div className="sidebar-section">
            <p className="sidebar-label">MENU</p>
            {menu.map((item, i) => (
              <div
                key={i}
                className={`sidebar-item ${activeSidebarItem === i ? "active" : ""}`}
                onClick={() => handleSidebarClick(item.tab, i)}
              >
                {item.label}
              </div>
            ))}
          </div>
        </aside>

        <main className="dash-main">
          {userRole === "Victim" && <VictimDashboard onEmergency={onEmergency} activeTab={activeTab} setActiveTab={setActiveTab} />}
          {userRole === "Counsellor" && <CounsellorDashboard activeTab={activeTab} setActiveTab={setActiveTab} />}
          {userRole === "LegalAdvisor" && <LegalAdvisorDashboard activeTab={activeTab} setActiveTab={setActiveTab} />}
          {userRole === "Admin" && <AdminDashboard activeTab={activeTab} setActiveTab={setActiveTab} />}
        </main>
      </div>

      {showCallDialog && <CallDialog onConfirm={onConfirmCall} onCancel={onCancelCall} />}
    </div>
  );
};

export default Dashboard;
