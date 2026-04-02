import "../secure.css";
import ThemeToggle from "./ThemeToggle";

const LoginPage = ({ onNavigate, onQuickExit, formData, onChange, onSubmit }) => (
  <div className="auth-page">
    <div className="auth-left">
      <div className="auth-brand">🛡️ SafeSupport</div>
      <h2>Welcome Back</h2>
      <p>Your safe space is just a login away. We're here for you.</p>
      <div className="auth-features">
        <div className="af-item">🔒 End-to-end encrypted</div>
        <div className="af-item">👁️ Anonymous browsing</div>
        <div className="af-item">💜 Judgment-free support</div>
      </div>
    </div>
    <div className="auth-right">
      <div className="auth-header-bar">
        <button className="btn-back" onClick={() => onNavigate("home")}>← Back</button>
        <ThemeToggle />
        <button className="btn-danger-sm" onClick={onQuickExit}>⚠️ Quick Exit</button>
      </div>
      <div className="auth-form-wrap">
        <h2>Login to Your Account</h2>
        <p className="auth-sub">
          Don't have an account?{" "}
          <span className="auth-link" onClick={() => onNavigate("register")}>Register here</span>
        </p>
        <form onSubmit={onSubmit} className="auth-form">
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={onChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" placeholder="••••••••" value={formData.password} onChange={onChange} required />
          </div>
          <div className="form-group">
            <label>Login As</label>
            <select name="role" value={formData.role} onChange={onChange}>
              <option value="Victim">Victim / Survivor</option>
              <option value="Counsellor">Counsellor</option>
              <option value="LegalAdvisor">Legal Advisor</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn-submit">Login →</button>
        </form>
      </div>
    </div>
  </div>
);

export default LoginPage;
