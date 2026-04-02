import { useState } from "react";
import "./secure.css";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Dashboard from "./components/Dashboard";
import CallDialog from "./components/CallDialog";
import LiveBackground from "./components/LiveBackground";

const SecureApp = () => {
  const [currentView, setCurrentView] = useState("home");
  const [userRole, setUserRole] = useState(null);
  const [showCallDialog, setShowCallDialog] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "Victim" });

  const quickExit = () => window.location.replace("https://www.google.com");
  const callEmergency = () => setShowCallDialog(true);
  const confirmCall = () => { setShowCallDialog(false); window.location.href = "tel:112"; };
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleLogin = (e) => { e.preventDefault(); setUserRole(formData.role); setCurrentView("dashboard"); };
  const handleRegister = (e) => { e.preventDefault(); setCurrentView("login"); };
  const logout = () => { setUserRole(null); setCurrentView("home"); setFormData({ name: "", email: "", password: "", role: "Victim" }); };

  if (currentView === "home") return (
    <>
      <LiveBackground page="home" />
      <HomePage onNavigate={setCurrentView} onEmergency={callEmergency} onQuickExit={quickExit} />
      {showCallDialog && <CallDialog onConfirm={confirmCall} onCancel={() => setShowCallDialog(false)} />}
    </>
  );

  if (currentView === "login") return (
    <>
      <LiveBackground page="login" />
      <LoginPage onNavigate={setCurrentView} onQuickExit={quickExit} formData={formData} onChange={handleChange} onSubmit={handleLogin} />
    </>
  );

  if (currentView === "register") return (
    <>
      <LiveBackground page="register" />
      <RegisterPage onNavigate={setCurrentView} onQuickExit={quickExit} formData={formData} onChange={handleChange} onSubmit={handleRegister} />
    </>
  );

  if (currentView === "dashboard") return (
    <>
      <LiveBackground page="dashboard" userRole={userRole} />
      <Dashboard
        userRole={userRole}
        onNavigate={setCurrentView}
        onQuickExit={quickExit}
        onLogout={logout}
        showCallDialog={showCallDialog}
        onEmergency={callEmergency}
        onConfirmCall={confirmCall}
        onCancelCall={() => setShowCallDialog(false)}
      />
    </>
  );
};

export default SecureApp;
