import { useState } from "react";
import "./SFnest.css";

const SFnest = () => {
  const [currentView, setCurrentView] = useState("home"); // home, landing, login
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Victim",
  });

  const quickExit = () => {
    window.location.replace("https://www.google.com");
  };

  const callEmergency = () => {
    window.location.href = "tel:112";
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      email: formData.email,
      password: formData.password,
      role: formData.role,
      ...(isLogin ? {} : { name: formData.name }),
    };
    console.log(isLogin ? "Login Data:" : "Register Data:", payload);
    // TODO: Connect with backend API
  };

  // Home Page View
  if (currentView === "home") {
    return (
      <div style={homeStyles.container}>
        <header style={homeStyles.header}>
          <h1>SafeSupport</h1>
          <p>Gender-Responsive Support Against Domestic Violence</p>
          <button onClick={quickExit} style={homeStyles.exitBtn}>
            ⚠️ Quick Exit
          </button>
        </header>

        <section style={homeStyles.hero}>
          <h2>You Are Not Alone</h2>
          <p>
            This platform provides confidential support, legal guidance, and
            counselling for individuals facing domestic violence — regardless of
            gender.
          </p>
          <button style={homeStyles.sosButton} onClick={callEmergency}>
            🚨 Emergency Help
          </button>
        </section>

        <section style={homeStyles.services}>
          <div style={homeStyles.card}>
            <h3>Legal Rights</h3>
            <p>
              Learn about protection laws, restraining orders, and your legal
              options.
            </p>
          </div>

          <div style={homeStyles.card}>
            <h3>Counselling Support</h3>
            <p>
              Connect with trained counsellors for emotional and psychological
              support.
            </p>
          </div>

          <div style={homeStyles.card}>
            <h3>Health & Safety</h3>
            <p>
              Get guidance on health risks, trauma recovery, and safety
              planning.
            </p>
          </div>
        </section>

        <section style={homeStyles.cta}>
          <h2>Reach Out for Help</h2>
          <p>
            Confidential. Secure. Gender-inclusive. Your safety comes first.
          </p>
          <button
            style={homeStyles.ctaButton}
            onClick={() => setCurrentView("landing")}
          >
            Get Started
          </button>
        </section>

        <footer style={homeStyles.footer}>
          <p>© 2026 SafeSupport | Confidential Help Platform</p>
        </footer>
      </div>
    );
  }

  // Login View
  if (currentView === "login") {
    return (
      <div className="sfnest-container">
        <header className="sfnest-header">
          <h1 className="sfnest-title">SafeNest</h1>
          <button onClick={quickExit} className="quick-exit-btn">
            Quick Exit
          </button>
        </header>

        <div className="main-content">
          <form onSubmit={handleSubmit} style={styles.form}>
            <h2>{isLogin ? "Login" : "Register"}</h2>

            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                style={styles.input}
              />
            )}

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="Victim">Victim / Survivor</option>
              <option value="Counsellor">Counsellor</option>
              <option value="LegalAdvisor">Legal Advisor</option>
              <option value="Admin">Admin</option>
            </select>

            <button type="submit" style={styles.button}>
              {isLogin ? "Login" : "Register"}
            </button>

            <p style={styles.toggleText}>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <span
                style={styles.toggleLink}
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? " Register" : " Login"}
              </span>
            </p>

            <button
              type="button"
              onClick={() => setCurrentView("landing")}
              style={styles.backButton}
            >
              Back
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Landing Page View
  return (
    <div className="sfnest-container">
      <header className="sfnest-header">
        <h1 className="sfnest-title">SafeNest</h1>
        <button onClick={quickExit} className="quick-exit-btn">
          Quick Exit
        </button>
      </header>

      <div className="main-content">
        <h2 className="main-heading">Are you safe right now?</h2>

        <button onClick={callEmergency} className="emergency-btn">
          🚨 Emergency Call 112
        </button>

        <button onClick={() => setCurrentView("login")} className="help-btn">
          Get Help Now
        </button>

        <div className="info-card">
          <h3>Know Your Rights</h3>
          <p>Legal protection and support resources available for survivors.</p>
        </div>

        <button
          onClick={() => setCurrentView("home")}
          style={styles.backButton}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

const homeStyles = {
  container: {
    fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    margin: 0,
    padding: 0,
  },
  header: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    padding: "30px 20px",
    textAlign: "center",
    position: "relative",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  exitBtn: {
    position: "absolute",
    top: "20px",
    right: "20px",
    padding: "10px 20px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
  },
  hero: {
    padding: "60px 20px",
    textAlign: "center",
    background: "linear-gradient(to bottom, #f8f9fa, #e9ecef)",
  },
  sosButton: {
    marginTop: "30px",
    padding: "15px 40px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    borderRadius: "50px",
    fontWeight: "700",
    boxShadow: "0 8px 15px rgba(220, 53, 69, 0.3)",
    transition: "all 0.3s ease",
  },
  services: {
    display: "flex",
    justifyContent: "space-around",
    padding: "60px 40px",
    flexWrap: "wrap",
    gap: "20px",
    backgroundColor: "#fff",
  },
  card: {
    width: "30%",
    minWidth: "280px",
    padding: "30px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    borderRadius: "12px",
    textAlign: "center",
    marginBottom: "20px",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    backgroundColor: "#fff",
    border: "1px solid #e9ecef",
  },
  cta: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "60px 40px",
    textAlign: "center",
    color: "#fff",
  },
  ctaButton: {
    padding: "15px 40px",
    backgroundColor: "#fff",
    color: "#667eea",
    border: "none",
    cursor: "pointer",
    borderRadius: "50px",
    fontSize: "18px",
    fontWeight: "700",
    marginTop: "20px",
    boxShadow: "0 8px 15px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease",
  },
  footer: {
    backgroundColor: "#212529",
    color: "#fff",
    textAlign: "center",
    padding: "20px",
    fontSize: "14px",
  },
};

const styles = {
  form: {
    width: "400px",
    maxWidth: "90%",
    padding: "40px",
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "14px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "2px solid #e9ecef",
    fontSize: "15px",
    transition: "border 0.3s ease",
    boxSizing: "border-box",
  },
  select: {
    width: "100%",
    padding: "14px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "2px solid #e9ecef",
    fontSize: "15px",
    backgroundColor: "#fff",
    cursor: "pointer",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    marginTop: "15px",
    borderRadius: "8px",
    fontWeight: "700",
    fontSize: "16px",
    transition: "transform 0.2s ease",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
  },
  toggleText: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#6c757d",
  },
  toggleLink: {
    color: "#667eea",
    cursor: "pointer",
    marginLeft: "5px",
    fontWeight: "700",
    textDecoration: "underline",
  },
  backButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#6c757d",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    marginTop: "15px",
    borderRadius: "8px",
    fontWeight: "600",
    transition: "background 0.3s ease",
  },
};

export default SFnest;
