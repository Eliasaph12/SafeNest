import { useState } from "react";
import "../secure.css";

const resources = [
  { title: "Domestic Violence Act 2021", desc: "Full text of the protection law", link: "#" },
  { title: "How to Get a Protection Order", desc: "Step-by-step legal guide", link: "#" },
  { title: "Your Rights as a Survivor", desc: "Know your legal entitlements", link: "#" },
];

const VictimDashboard = ({ onEmergency, activeTab, setActiveTab }) => {
  activeTab = activeTab || "overview";
  setActiveTab = setActiveTab || (() => {});
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { from: "support", text: "Hello! How can we help you today?" },
  ]);
  const [safetyPlan, setSafetyPlan] = useState({ safePlace: "", trustedPerson: "", emergencyItems: "" });
  const [planSaved, setPlanSaved] = useState(false);

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages([...messages, { from: "user", text: message }]);
    setMessage("");
    setTimeout(() => {
      setMessages(prev => [...prev, { from: "support", text: "Thank you for reaching out. A counsellor will respond shortly." }]);
    }, 1000);
  };

  const savePlan = (e) => {
    e.preventDefault();
    setPlanSaved(true);
    setTimeout(() => setPlanSaved(false), 3000);
  };

  return (
    <div>
      <div className="dash-welcome">
        <h1>Welcome to Your Safe Space 💜</h1>
        <p>You are not alone. We are here to support you every step of the way.</p>
      </div>

      <div className="alert-box">
        <div>
          <h3>🚨 In Immediate Danger?</h3>
          <p>Call emergency services right now</p>
        </div>
        <button className="btn-emergency-dash" onClick={onEmergency}>Call 112 Now</button>
      </div>

      <div className="tab-bar">
        {["overview", "resources", "chat", "safety"].map(tab => (
          <button key={tab} className={`tab-btn ${activeTab === tab ? "active" : ""}`} onClick={() => setActiveTab(tab)}>
            {tab === "overview" && "📊 Overview"}
            {tab === "resources" && "📚 Resources & Legal Info"}
            {tab === "chat" && "🆘 Get Help / Chat Support"}
            {tab === "safety" && "🛡️ Safety Plan"}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="dash-grid">
          <div className="dash-card"><div className="dc-icon">📚</div><h3>Resources & Legal Info</h3><p>Access legal guides, protection orders, and your full legal rights as a survivor</p><button className="btn-card" onClick={() => setActiveTab("resources")}>View Resources</button></div>
          <div className="dash-card"><div className="dc-icon">🆘</div><h3>Get Help / Chat Support</h3><p>Connect with trained counsellors for emotional support and immediate help</p><button className="btn-card" onClick={() => setActiveTab("chat")}>Chat Now</button></div>
          <div className="dash-card"><div className="dc-icon">🏥</div><h3>Health Support</h3><p>Access health resources and trauma recovery guidance</p><button className="btn-card">Get Help</button></div>
          <div className="dash-card"><div className="dc-icon">🛡️</div><h3>Safety Planning</h3><p>Create a personalized safety plan for you and your family</p><button className="btn-card" onClick={() => setActiveTab("safety")}>Create Plan</button></div>
        </div>
      )}

      {activeTab === "resources" && (
        <div>
          <h3 className="section-heading">📚 Resources & Legal Info</h3>
          <div className="dash-grid">
            {resources.map((r, i) => (
              <div key={i} className="dash-card">
                <div className="dc-icon">📄</div>
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
                <a href={r.link} className="btn-card" style={{ display: "inline-block", textDecoration: "none" }}>Read More</a>
              </div>
            ))}
            <div className="dash-card">
              <div className="dc-icon">⚖️</div>
              <h3>Legal Rights Overview</h3>
              <p>Understand your full legal rights as a survivor including protection orders and court procedures.</p>
              <a className="btn-card" style={{ display: "inline-block", textDecoration: "none" }}>View Guide</a>
            </div>
            <div className="dash-card">
              <div className="dc-icon">🏛️</div>
              <h3>Find Legal Aid</h3>
              <p>Connect with free legal aid services and certified legal advisors in your area.</p>
              <a className="btn-card" style={{ display: "inline-block", textDecoration: "none" }}>Find Help</a>
            </div>
          </div>
        </div>
      )}

      {activeTab === "chat" && (
        <div className="chat-container">
          <h3 className="section-heading">Live Support Chat</h3>
          <div className="chat-box">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.from === "user" ? "chat-user" : "chat-support"}`}>
                <span>{msg.text}</span>
              </div>
            ))}
          </div>
          <div className="chat-input-row">
            <input className="chat-input" placeholder="Type your message..." value={message} onChange={e => setMessage(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()} />
            <button className="btn-submit" onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}

      {activeTab === "safety" && (
        <div className="dash-card">
          <h3 className="section-heading">🛡️ My Safety Plan</h3>
          <p style={{ marginBottom: "20px", color: "#718096" }}>Fill in your personal safety plan. This is stored only on your device.</p>
          <form onSubmit={savePlan} className="auth-form">
            <div className="form-group">
              <label>Safe Place to Go</label>
              <input type="text" placeholder="e.g. Friend's house, shelter address" value={safetyPlan.safePlace} onChange={e => setSafetyPlan({ ...safetyPlan, safePlace: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Trusted Person to Contact</label>
              <input type="text" placeholder="Name and phone number" value={safetyPlan.trustedPerson} onChange={e => setSafetyPlan({ ...safetyPlan, trustedPerson: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Emergency Items to Pack</label>
              <input type="text" placeholder="e.g. ID, cash, medications, phone charger" value={safetyPlan.emergencyItems} onChange={e => setSafetyPlan({ ...safetyPlan, emergencyItems: e.target.value })} />
            </div>
            <button type="submit" className="btn-submit">Save Safety Plan</button>
            {planSaved && <p style={{ color: "green", marginTop: "10px", fontWeight: "600" }}>✅ Safety plan saved!</p>}
          </form>
        </div>
      )}
    </div>
  );
};

export default VictimDashboard;
