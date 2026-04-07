import { useState } from "react";
import "./secure.css";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Dashboard from "./components/Dashboard";
import CallDialog from "./components/CallDialog";
import LiveBackground from "./components/LiveBackground";
import { apiService } from "./services/apiService";

const SecureApp = () => {
  const [currentView, setCurrentView] = useState("home");
  const [user, setUser] = useState(null);
  const [showCallDialog, setShowCallDialog] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "Victim" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const quickExit = () => window.location.replace("https://www.google.com");
  const callEmergency = () => setShowCallDialog(true);
  const confirmCall = () => { setShowCallDialog(false); window.location.href = "tel:112"; };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userData = await apiService.login(formData.email, formData.password);
      setUser(userData);
      setCurrentView("dashboard");
      setFormData({ name: "", email: "", password: "", role: "Victim" });
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userData = await apiService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        // Note: Backend doesn't have role field yet, so we'll store it locally for now
        role: formData.role
      });
      setUser({ ...userData, role: formData.role });
      setCurrentView("dashboard");
      setFormData({ name: "", email: "", password: "", role: "Victim" });
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setCurrentView("home");
    setFormData({ name: "", email: "", password: "", role: "Victim" });
    setError(null);
  };

  // Show loading state during API calls
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner">🔄</div>
        <p>Please wait...</p>
      </div>
    );
  }

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
      <LoginPage
        onNavigate={setCurrentView}
        onQuickExit={quickExit}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleLogin}
        error={error}
        loading={loading}
      />
    </>
  );

  if (currentView === "register") return (
    <>
      <LiveBackground page="register" />
      <RegisterPage
        onNavigate={setCurrentView}
        onQuickExit={quickExit}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleRegister}
        error={error}
        loading={loading}
      />
    </>
  );

  if (currentView === "dashboard") return (
    <>
      <LiveBackground page="dashboard" userRole={user?.role} />
      <Dashboard
        user={user}
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
