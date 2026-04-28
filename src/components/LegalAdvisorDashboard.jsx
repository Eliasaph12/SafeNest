import { useState, useEffect } from "react";
import "../secure.css";
import { apiService } from "../services/apiService.js";

const LegalAdvisorDashboard = ({ activeTab, setActiveTab, user }) => {
  activeTab = activeTab || "overview";
  setActiveTab = setActiveTab || (() => {});
  
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  
  const [newCase, setNewCase] = useState({
    victimId: "",
    caseTitle: "",
    description: "",
    caseType: "DOMESTIC_VIOLENCE"
  });

  const advisorId = user?.id || 1;

  useEffect(() => {
    loadCases();
  }, [activeTab, statusFilter]);

  const loadCases = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getLegalAdvisorCases(advisorId);
      setCases(data);
    } catch (err) {
      setError("Failed to load cases: " + err.message);
      setCases([]);
    } finally {
      setLoading(false);
    }
  };

  const createCase = async (e) => {
    e.preventDefault();
    try {
      await apiService.createLegalCase({
        victimId: Number(newCase.victimId),
        advisorId,
        title: newCase.caseTitle,
        summary: newCase.description,
        caseType: newCase.caseType,
      });
      setSuccessMessage("Case created successfully!");
      setNewCase({ victimId: "", caseTitle: "", description: "", caseType: "DOMESTIC_VIOLENCE" });
      setTimeout(() => setSuccessMessage(""), 2000);
      loadCases();
    } catch (err) {
      setError("Failed to create case: " + err.message);
    }
  };

  const deleteCase = async (id) => {
    if (!window.confirm("Delete this case?")) return;
    try {
      await apiService.deleteLegalCase(id);
      setSuccessMessage("Case deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 2000);
      loadCases();
    } catch (err) {
      setError("Failed to delete case: " + err.message);
    }
  };

  const filteredCases = statusFilter === "All" 
    ? cases 
    : cases.filter(c => c.status === statusFilter);

  const activeCases = cases.filter(c => c.status === "OPEN").length;
  const resolvedCases = cases.filter(c => c.status === "RESOLVED").length;
  const pendingCases = cases.filter(c => c.status === "UNDER_REVIEW").length;

  const caseTypeColors = {
    "DOMESTIC_VIOLENCE": "red",
    "HARASSMENT": "orange",
    "ABUSE": "red",
    "CUSTODY": "blue",
    "OTHER": "gray"
  };

  return (
    <div>
      <div className="dash-welcome">
        <h1>⚖️ Legal Advisor Dashboard</h1>
        <p>Manage cases, provide legal guidance, and track resolutions.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-num">{activeCases}</div>
          <p>Open Cases</p>
        </div>
        <div className="stat-card">
          <div className="stat-num">{pendingCases}</div>
          <p>Under Review</p>
        </div>
        <div className="stat-card">
          <div className="stat-num">{resolvedCases}</div>
          <p>Resolved Cases</p>
        </div>
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

      {error && <div style={{ color: '#e53e3e', backgroundColor: '#fed7d7', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>{error}</div>}
      {successMessage && <div style={{ color: '#22543d', backgroundColor: '#c6f6d5', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>{successMessage}</div>}
      {loading && <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>}

      {activeTab === "overview" && !loading && (
        <div>
          <div className="dash-card">
            <h3>⚖️ Recent Cases</h3>
            {cases.length === 0 ? (
              <p style={{ color: '#718096' }}>No cases</p>
            ) : (
              cases.slice(0, 3).map(c => (
                <div key={c.id} className="list-item">
                  <span className={`li-dot ${caseTypeColors[c.caseType] || "blue"}`}></span>
                  <div style={{ flex: 1 }}>
                    <strong>{c.title || c.caseTitle}</strong> — {c.caseType}<br/>
                    <small>Victim {c.victimId} • Status: {c.status}</small>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === "cases" && !loading && (
        <div>
          <div className="dash-card" style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
              <h3>⚖️ All Cases</h3>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: "8px 12px", borderRadius: "8px", border: "2px solid #e2e8f0", fontSize: "14px" }}>
                <option value="All">All Status</option>
                <option value="OPEN">Open</option>
                <option value="UNDER_REVIEW">Under Review</option>
                <option value="RESOLVED">Resolved</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>
            {filteredCases.length === 0 ? (
              <p style={{ color: '#718096' }}>No cases</p>
            ) : (
              filteredCases.map(c => (
                <div key={c.id} className="list-item" style={{ justifyContent: "space-between", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1, minWidth: "250px" }}>
                    <span className={`li-dot ${caseTypeColors[c.caseType] || "blue"}`}></span>
                    <div style={{ flex: 1 }}>
                      <strong>{c.caseTitle || c.title}</strong><br/>
                      <small>Case: {c.caseNumber} • Victim {c.victimId} • {c.caseType}</small><br/>
                      <small style={{ color: c.status === "RESOLVED" ? "#22543d" : "#744210" }}>Status: <strong>{c.status}</strong></small>
                    </div>
                  </div>
                  <button onClick={() => deleteCase(c.id)} style={{ background: "none", border: "none", color: "#e53e3e", cursor: "pointer", fontWeight: "700" }}>✕</button>
                </div>
              ))
            )}
          </div>

          <div className="dash-card">
            <h3>➕ Create New Case</h3>
            <form onSubmit={createCase} className="auth-form" style={{ marginTop: "16px" }}>
              <div className="form-group">
                <label>Victim ID</label>
                <input type="number" placeholder="Enter victim ID" value={newCase.victimId} onChange={e => setNewCase({ ...newCase, victimId: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Case Title</label>
                <input type="text" placeholder="Enter case title" value={newCase.caseTitle} onChange={e => setNewCase({ ...newCase, caseTitle: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Case Type</label>
                <select value={newCase.caseType} onChange={e => setNewCase({ ...newCase, caseType: e.target.value })}>
                  <option value="DOMESTIC_VIOLENCE">Domestic Violence</option>
                  <option value="HARASSMENT">Harassment</option>
                  <option value="ABUSE">Abuse</option>
                  <option value="CUSTODY">Custody</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea placeholder="Describe the case..." value={newCase.description} onChange={e => setNewCase({ ...newCase, description: e.target.value })} rows="5" required />
              </div>
              <button type="submit" className="btn-submit" disabled={loading}>Create Case</button>
            </form>
          </div>
        </div>
      )}

      {activeTab === "resources" && (
        <div className="dash-card">
          <h3>📚 Legal Resources</h3>
          <div style={{ marginTop: "16px" }}>
            <div style={{ marginBottom: "16px", padding: "12px", backgroundColor: "#edf2f7", borderRadius: "8px", borderLeft: "4px solid #2d3748" }}>
              <strong>Domestic Violence Act 2021</strong>
              <p style={{ margin: "8px 0", fontSize: "14px", color: "#4a5568" }}>Comprehensive legislation covering protection orders and victim rights.</p>
            </div>
            <div style={{ marginBottom: "16px", padding: "12px", backgroundColor: "#edf2f7", borderRadius: "8px", borderLeft: "4px solid #2d3748" }}>
              <strong>Protection Order Application Guide</strong>
              <p style={{ margin: "8px 0", fontSize: "14px", color: "#4a5568" }}>Step-by-step guide for applying for protection orders.</p>
            </div>
            <div style={{ marginBottom: "16px", padding: "12px", backgroundColor: "#edf2f7", borderRadius: "8px", borderLeft: "4px solid #2d3748" }}>
              <strong>Restraining Order Template</strong>
              <p style={{ margin: "8px 0", fontSize: "14px", color: "#4a5568" }}>Customizable template for restraining orders.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LegalAdvisorDashboard;
