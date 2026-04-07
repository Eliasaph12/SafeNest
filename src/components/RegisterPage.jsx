import "../secure.css";
import ThemeToggle from "./ThemeToggle";

const RegisterPage = ({ onNavigate, onQuickExit, formData, onChange, onSubmit, error, loading }) => (
  <div className="auth-page">
    <div className="auth-left">
      <div className="auth-brand">🛡️ SafeSupport</div>
      <h2>Join SafeSupport</h2>
      <p>Create a free account and access confidential support, legal guidance, and counselling.</p>
      <div className="auth-features">
        <div className="af-item">🔒 End-to-end encrypted</div>
        <div className="af-item">👁️ Anonymous browsing</div>
        <div className="af-item">💜 Judgment-free support</div>
      </div>
    </div>
    <div className="auth-right">
      <div className="auth-header-bar">
        <button className="btn-back" onClick={() => onNavigate("login")}>← Back</button>
        <ThemeToggle />
        <button className="btn-danger-sm" onClick={onQuickExit}>⚠️ Quick Exit</button>
      </div>
      <div className="auth-form-wrap">
        <h2>Create Your Account</h2>
        <p className="auth-sub">
          Already have an account?{" "}
          <span className="auth-link" onClick={() => onNavigate("login")}>Login here</span>
        </p>
        {error && <div className="error-message" style={{ color: '#e53e3e', marginBottom: '16px', padding: '12px', backgroundColor: '#fed7d7', borderRadius: '8px', border: '1px solid #feb2b2' }}>{error}</div>}
        <form onSubmit={onSubmit} className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="name" placeholder="Your full name" value={formData.name} onChange={onChange} required disabled={loading} />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={onChange} required disabled={loading} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" placeholder="••••••••" value={formData.password} onChange={onChange} required disabled={loading} />
          </div>
          <div className="form-group">
            <label>Register As</label>
            <select name="role" value={formData.role} onChange={onChange} disabled={loading}>
              <option value="Victim">Victim / Survivor</option>
              <option value="Counsellor">Counsellor</option>
              <option value="LegalAdvisor">Legal Advisor</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account →"}
          </button>
        </form>
      </div>
    </div>
  </div>
);

export default RegisterPage;
