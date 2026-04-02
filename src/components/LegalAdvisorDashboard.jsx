import { useState } from "react";
import "../secure.css";

const initialCases = [
  { id: 1, ref: "2024-001", type: "Protection Order", status: "In Progress", dot: "yellow" },
  { id: 2, ref: "2024-002", type: "Restraining Order", status: "Approved", dot: "green" },
  { id: 3, ref: "2024-003", type: "Legal Consultation", status: "Scheduled", dot: "blue" },
];

const legalResources = [
  { title: "Domestic Violence Act 2021", category: "Legislation" },
  { title: "Protection Order Application Guide", category: "Guide" },
  { title: "Restraining Order Template", category: "Template" },
  { title: "Victim Rights Handbook", category: "Handbook" },
];

const LegalAdvisorDashboard = ({ activeTab, setActiveTab }) => {
  activeTab = activeTab || "overview";
  setActiveTab = setActiveTab || (() => {});
  const [cases, setCases] = useState(initialCases);
  const [newCase, setNewCase] = useState({ type: "", status: "Scheduled" });
  const [caseSaved, setCaseSaved] = useState(false);
  const [filter, setFilter] = useState("All");

  const addCase = (e) => {
    e.preventDefault();
    const ref = `2024-00${cases.length + 4}`;
    setCases([...cases, { id: Date.now(), ref, ...newCase, dot: "blue" }]);
    setNewCase({ type: "", status: "Scheduled" });
    setCaseSaved(true);
    setTimeout(() => setCaseSaved(false), 2000);
  };

  const removeCase = (id) => setCases(cases.filter(c => c.id !== id));

  const filtered = filter === "All" ? cases : cases.filter(c => c.status === filter);

  return (
    <div>
      <div className="dash-welcome">
        <h1>Legal Advisor Dashboard</h1>
        <p>Manage your cases and provide legal guidance.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card"><div className="stat-num">{cases.filter(c => c.status === "In Progress").length}</div><p>Active Cases</p></div>
        <div className="stat-card"><div className="stat-num">{cases.filter(c => c.status === "Scheduled").length}</div><p>Pending Reviews</p></div>
        <div className="stat-card"><div className="stat-num">{cases.filter(c => c.status === "Approved").length}</div><p>Completed Cases</p></div>
      </div>

      <div className="tab-bar">
        {["overview", "cases", "resources"].map(tab => (
          <button key={tab} className={`tab-btn ${activeTab === tab ? "active" : ""}`} onClick={() => setActiveTab(tab)}>
            {tab === "overview" && "📊 Overview"}
            {tab === "cases" && "⚖️ Cases"}
            {tab === "resources" && "📚 Resources"}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="dash-card">
          <h3>⚖️ Recent Cases</h3>
          {cases.slice(0, 3).map(c => (
            <div key={c.id} className="list-item">
              <span className={`li-dot ${c.dot}`}></span>
              Case #{c.ref} — {c.type} — {c.status}
            </div>
          ))}
        </div>
      )}

      {activeTab === "cases" && (
        <div>
          <div className="dash-card" style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3>⚖️ All Cases</h3>
              <select value={filter} onChange={e => setFilter(e.target.value)} style={{ padding: "8px 12px", borderRadius: "8px", border: "2px solid #e2e8f0", fontSize: "14px" }}>
                <option>All</option>
                <option>In Progress</option>
                <option>Approved</option>
                <option>Scheduled</option>
              </select>
            </div>
            {filtered.map(c => (
              <div key={c.id} className="list-item" style={{ justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span className={`li-dot ${c.dot}`}></span>
                  Case #{c.ref} — {c.type} — <strong>{c.status}</strong>
                </div>
                <button onClick={() => removeCase(c.id)} style={{ background: "none", border: "none", color: "#e53e3e", cursor: "pointer", fontWeight: "700" }}>✕</button>
              </div>
            ))}
          </div>
          <div className="dash-card">
            <h3>➕ Add New Case</h3>
            <form onSubmit={addCase} className="auth-form" style={{ marginTop: "16px" }}>
              <div className="form-group">
                <label>Case Type</label>
                <select value={newCase.type} onChange={e => setNewCase({ ...newCase, type: e.target.value })} required>
                  <option value="">Select type</option>
                  <option>Protection Order</option>
                  <option>Restraining Order</option>
                  <option>Legal Consultation</option>
                  <option>Custody Case</option>
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select value={newCase.status} onChange={e => setNewCase({ ...newCase, status: e.target.value })}>
                  <option>Scheduled</option>
                  <option>In Progress</option>
                  <option>Approved</option>
                </select>
              </div>
              <button type="submit" className="btn-submit">Add Case</button>
              {caseSaved && <p style={{ color: "green", marginTop: "10px", fontWeight: "600" }}>✅ Case added!</p>}
            </form>
          </div>
        </div>
      )}

      {activeTab === "resources" && (
        <div className="dash-grid">
          {legalResources.map((r, i) => (
            <div key={i} className="dash-card">
              <div className="dc-icon">📄</div>
              <span style={{ fontSize: "12px", background: "#ede9ff", color: "#6c63ff", padding: "4px 10px", borderRadius: "20px", fontWeight: "600" }}>{r.category}</span>
              <h3 style={{ marginTop: "10px" }}>{r.title}</h3>
              <button className="btn-card" style={{ marginTop: "12px" }}>Download</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LegalAdvisorDashboard;
