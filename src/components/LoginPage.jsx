import "../secure.css";
import ThemeToggle from "./ThemeToggle";

const LoginPage = ({
  onNavigate,
  onQuickExit,
  formData,
  onChange,
  onSubmit,
  error,
  loading,
  otpPending,
  otpMeta,
  onResetOtp,
}) => (
  <div className="auth-page">
    <div className="auth-left">
      <div className="auth-brand">SafeSupport</div>
      <h2>Welcome Back</h2>
      <p>Your safe space is just a login away. We're here for you.</p>
      <div className="auth-features">
        <div className="af-item">Secure OTP verification</div>
        <div className="af-item">Phone-based second factor</div>
        <div className="af-item">Confidential support access</div>
      </div>
    </div>
    <div className="auth-right">
      <div className="auth-header-bar">
        <button className="btn-back" onClick={() => onNavigate("home")}>Back</button>
        <ThemeToggle />
        <button className="btn-danger-sm" onClick={onQuickExit}>Quick Exit</button>
      </div>
      <div className="auth-form-wrap">
        <h2>{otpPending ? "Verify Login OTP" : "Login to Your Account"}</h2>
        <p className="auth-sub">
          Don't have an account?{" "}
          <span className="auth-link" onClick={() => onNavigate("register")}>Register here</span>
        </p>
        {error && <div className="error-message" style={{ color: "#e53e3e", marginBottom: "16px", padding: "12px", backgroundColor: "#fed7d7", borderRadius: "8px", border: "1px solid #feb2b2" }}>{error}</div>}
        {otpMeta?.message && (
          <div style={{ color: "#22543d", marginBottom: "16px", padding: "12px", backgroundColor: "#c6f6d5", borderRadius: "8px", border: "1px solid #9ae6b4" }}>
            {otpMeta.message}
            {otpMeta.phoneNumberHint ? ` OTP sent to ${otpMeta.phoneNumberHint}.` : ""}
            {otpMeta.otpPreview ? ` Test OTP: ${otpMeta.otpPreview}` : ""}
          </div>
        )}
        <form onSubmit={onSubmit} className="auth-form">
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={onChange} required disabled={loading || otpPending} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={onChange} required disabled={loading || otpPending} />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" name="phoneNumber" placeholder="Required if your account has no saved number yet" value={formData.phoneNumber} onChange={onChange} disabled={loading || otpPending} />
          </div>
          <div className="form-group">
            <label>Login As</label>
            <select name="role" value={formData.role} onChange={onChange} disabled={loading || otpPending}>
              <option value="Victim">Victim / Survivor</option>
              <option value="Counsellor">Counsellor</option>
              <option value="LegalAdvisor">Legal Advisor</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          {otpPending && (
            <div className="form-group">
              <label>OTP Code</label>
              <input type="text" name="otp" placeholder="Enter 6-digit OTP" value={formData.otp} onChange={onChange} required disabled={loading} maxLength={6} />
            </div>
          )}
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Please wait..." : otpPending ? "Verify OTP" : "Send OTP"}
          </button>
          {otpPending && (
            <button type="button" className="btn-outline" style={{ marginTop: "12px" }} onClick={onResetOtp} disabled={loading}>
              Use different login details
            </button>
          )}
        </form>
      </div>
    </div>
  </div>
);

export default LoginPage;
