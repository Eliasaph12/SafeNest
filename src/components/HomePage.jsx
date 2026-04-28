import "../secure.css";
import ThemeToggle from "./ThemeToggle";

const HomePage = ({ onNavigate, onEmergency, onQuickExit }) => (
  <div className="page-home">
    <header className="home-header">
      <div className="home-header-inner">
        <span className="logo">SafeSupport</span>
        <nav className="home-nav">
          <button type="button" className="home-nav-link" onClick={() => onNavigate("services")}>
            Services
          </button>
          <button type="button" className="home-nav-link" onClick={() => onNavigate("about")}>
            About
          </button>
          <button type="button" className="home-nav-link" onClick={() => onNavigate("contact")}>
            Contact
          </button>
          <ThemeToggle />
          <button className="btn-outline" onClick={() => onNavigate("login")}>Login</button>
        </nav>
        <button className="btn-danger-sm" onClick={onQuickExit}>Quick Exit</button>
      </div>
    </header>

    <section className="hero-section">
      <div className="hero-content">
        <span className="hero-badge">Confidential and Secure</span>
        <h1>You Are Not Alone.<br />Help Is Here.</h1>
        <p>
          A safe, confidential platform providing legal guidance, counselling, and
          support for individuals facing domestic violence regardless of gender.
        </p>
        <div className="hero-actions">
          <button className="btn-emergency" onClick={onEmergency}>Emergency Help</button>
          <button className="btn-primary" onClick={() => onNavigate("login")}>Get Started</button>
        </div>
        <div className="hero-trust">
          <span>100% Confidential</span>
          <span>24/7 Available</span>
          <span>Gender Inclusive</span>
        </div>
      </div>
      <div className="hero-image">
        <div className="hero-card-float">
          <div className="hcf-icon">Care</div>
          <strong>10,000+</strong>
          <p>people supported</p>
        </div>
      </div>
    </section>

    <section className="services-section" id="services">
      <div className="section-label">Our Services</div>
      <h2>How We Can Help You</h2>
      <p className="section-sub">Comprehensive support tailored to your needs</p>
      <div className="services-grid">
        <div className="service-card">
          <div className="sc-icon">Law</div>
          <h3>Legal Rights</h3>
          <p>Protection orders, restraining orders, and full legal guidance from certified advisors.</p>
          <button type="button" className="sc-link" onClick={() => onNavigate("services")}>Learn More</button>
        </div>
        <div className="service-card">
          <div className="sc-icon">Care</div>
          <h3>Counselling</h3>
          <p>Connect with trained counsellors for emotional, psychological, and trauma support.</p>
          <button type="button" className="sc-link" onClick={() => onNavigate("services")}>Learn More</button>
        </div>
        <div className="service-card">
          <div className="sc-icon">Health</div>
          <h3>Health and Safety</h3>
          <p>Health risk assessments, trauma recovery plans, and personalized safety planning.</p>
          <button type="button" className="sc-link" onClick={() => onNavigate("services")}>Learn More</button>
        </div>
        <div className="service-card">
          <div className="sc-icon">Plan</div>
          <h3>Safety Planning</h3>
          <p>Create a personalized safety plan to protect yourself and your loved ones.</p>
          <button type="button" className="sc-link" onClick={() => onNavigate("services")}>Learn More</button>
        </div>
      </div>
    </section>

    <section className="roles-section">
      <div className="section-label">Who We Serve</div>
      <h2>A Platform For Everyone</h2>
      <div className="roles-grid">
        <div className="role-card rc-victim">
          <div className="rc-icon">Victim</div>
          <h3>Victim / Survivor</h3>
          <p>Access resources, seek help, and connect with support services confidentially.</p>
        </div>
        <div className="role-card rc-counsellor">
          <div className="rc-icon">Counsellor</div>
          <h3>Counsellor</h3>
          <p>Provide support, guidance, and monitor client progress effectively.</p>
        </div>
        <div className="role-card rc-legal">
          <div className="rc-icon">Legal</div>
          <h3>Legal Advisor</h3>
          <p>Offer legal advice, update resources, and assist with legal actions.</p>
        </div>
        <div className="role-card rc-admin">
          <div className="rc-icon">Admin</div>
          <h3>Admin</h3>
          <p>Manage content, user roles, and ensure platform data security.</p>
        </div>
      </div>
    </section>

    <section className="cta-section">
      <div className="cta-inner">
        <h2>Ready to Take the First Step?</h2>
        <p>Confidential. Secure. Gender-inclusive. Your safety comes first.</p>
        <button className="btn-primary-lg" onClick={() => onNavigate("register")}>Create Free Account</button>
      </div>
    </section>

    <footer className="home-footer">
      <div className="footer-inner">
        <div className="footer-logo">SafeSupport</div>
        <p>© 2026 SafeSupport | Confidential Help Platform | All Rights Reserved</p>
        <div className="footer-links">
          <button type="button" className="footer-link-btn">Privacy Policy</button>
          <button type="button" className="footer-link-btn">Terms of Service</button>
          <button type="button" className="footer-link-btn" onClick={() => onNavigate("contact")}>Contact Us</button>
        </div>
      </div>
    </footer>
  </div>
);

export default HomePage;
