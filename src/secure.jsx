import { useState, useEffect } from "react";
import apiService from "./services/apiService";
import "./secure.css";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Dashboard from "./components/Dashboard";
import CallDialog from "./components/CallDialog";
import LiveBackground from "./components/LiveBackground";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";

const initialFormState = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  otp: "",
  role: "Victim",
};

const SecureApp = () => {
  const [currentView, setCurrentView] = useState("home");
  const [user, setUser] = useState(null);
  const [showCallDialog, setShowCallDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loginOtpMeta, setLoginOtpMeta] = useState(null);
  const [registerOtpMeta, setRegisterOtpMeta] = useState(null);

  const quickExit = () => window.location.replace("https://www.google.com");
  const callEmergency = () => setShowCallDialog(true);
  const confirmCall = () => { setShowCallDialog(false); window.location.href = "tel:112"; };

  const resetAuthFlow = () => {
    setFormData(initialFormState);
    setError(null);
    setLoginOtpMeta(null);
    setRegisterOtpMeta(null);
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
    if (view === "login" || view === "register" || view === "home") {
      resetAuthFlow();
    }
  };

  const handleChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });

  const completeAuth = (authResponse) => {
    if (!authResponse?.user || !authResponse?.token) {
      throw new Error("Invalid authentication response from server");
    }
    localStorage.setItem("user", JSON.stringify(authResponse.user));
    localStorage.setItem("token", authResponse.token);
    setUser(authResponse.user);
    setCurrentView("dashboard");
    resetAuthFlow();
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (loginOtpMeta?.verificationId) {
        const verifiedUser = await apiService.verifyLoginOtp(loginOtpMeta.verificationId, formData.otp);
        completeAuth(verifiedUser);
      } else {
        const otpResponse = await apiService.requestLoginOtp(formData.email, formData.password, formData.phoneNumber);
        setLoginOtpMeta(otpResponse);
        setFormData((current) => ({ ...current, otp: "" }));
      }
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (registerOtpMeta?.verificationId) {
        const verifiedUser = await apiService.verifyRegistrationOtp(registerOtpMeta.verificationId, formData.otp);
        completeAuth(verifiedUser);
      } else {
        const otpResponse = await apiService.requestRegistrationOtp(formData);
        setRegisterOtpMeta(otpResponse);
        setFormData((current) => ({ ...current, otp: "" }));
      }
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentView("dashboard");
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    apiService.logout?.();
    setUser(null);
    setCurrentView("home");
    resetAuthFlow();
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner">Loading</div>
        <p>Please wait...</p>
      </div>
    );
  }

  return (
    <>
      <LiveBackground page={currentView} userRole={user?.role} />
      {currentView === "home" && (
        <>
          <HomePage onNavigate={handleNavigate} onEmergency={callEmergency} onQuickExit={quickExit} />
          {showCallDialog && <CallDialog onConfirm={confirmCall} onCancel={() => setShowCallDialog(false)} />}
        </>
      )}
      {currentView === "about" && <About onNavigate={handleNavigate} />}
      {currentView === "services" && <Services onNavigate={handleNavigate} />}
      {currentView === "contact" && <Contact onNavigate={handleNavigate} />}
      {currentView === "login" && (
        <LoginPage
          onNavigate={handleNavigate}
          onQuickExit={quickExit}
          formData={formData}
          onChange={handleChange}
          onSubmit={handleLogin}
          error={error}
          loading={loading}
          otpPending={Boolean(loginOtpMeta?.verificationId)}
          otpMeta={loginOtpMeta}
          onResetOtp={() => {
            setLoginOtpMeta(null);
            setFormData((current) => ({ ...current, otp: "" }));
            setError(null);
          }}
        />
      )}
      {currentView === "register" && (
        <RegisterPage
          onNavigate={handleNavigate}
          onQuickExit={quickExit}
          formData={formData}
          onChange={handleChange}
          onSubmit={handleRegister}
          error={error}
          loading={loading}
          otpPending={Boolean(registerOtpMeta?.verificationId)}
          otpMeta={registerOtpMeta}
          onResetOtp={() => {
            setRegisterOtpMeta(null);
            setFormData((current) => ({ ...current, otp: "" }));
            setError(null);
          }}
        />
      )}
      {currentView === "dashboard" && user && (
        <Dashboard
          user={user}
          onNavigate={handleNavigate}
          onQuickExit={quickExit}
          onLogout={logout}
          showCallDialog={showCallDialog}
          onEmergency={callEmergency}
          onConfirmCall={confirmCall}
          onCancelCall={() => setShowCallDialog(false)}
        />
      )}
    </>
  );
};

export default SecureApp;
