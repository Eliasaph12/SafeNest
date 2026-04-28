import { useState, useEffect } from "react";
import "../secure.css";
import { apiService } from "../services/apiService.js";

const CounsellorDashboard = ({ activeTab, setActiveTab, user }) => {
  activeTab = activeTab || "overview";
  setActiveTab = setActiveTab || (() => {});
  
  const [appointments, setAppointments] = useState([]);
  const [caseNotes, setCaseNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  
  const [newAppointment, setNewAppointment] = useState({
    victimId: "",
    appointmentDateTime: "",
    type: "VIDEO_CALL",
    notes: ""
  });
  
  const [newNote, setNewNote] = useState({
    victimId: "",
    noteContent: "",
    category: "SESSION_NOTES"
  });

  const counsellorId = user?.id || 1; // Use actual user id

  useEffect(() => {
    loadAppointmentsAndNotes();
  }, [activeTab]);

  const loadAppointmentsAndNotes = async () => {
    try {
      setLoading(true);
      setError(null);
      const [appointmentsData, caseNotesData] = await Promise.all([
        apiService.getCounsellorAppointments(counsellorId),
        apiService.getCounsellorCaseNotes(counsellorId)
      ]);
      setAppointments(appointmentsData);
      setCaseNotes(caseNotesData);
    } catch (err) {
      setError("Failed to load counsellor data: " + err.message);
      setAppointments([]);
      setCaseNotes([]);
    } finally {
      setLoading(false);
    }
  };

  const createAppointment = async (e) => {
    e.preventDefault();
    try {
      await apiService.createAppointment({
        ...newAppointment,
        counsellorId
      });
      setSuccessMessage("Appointment created successfully!");
      setNewAppointment({ victimId: "", appointmentDateTime: "", type: "VIDEO_CALL", notes: "" });
      setTimeout(() => setSuccessMessage(""), 2000);
      loadAppointmentsAndNotes();
    } catch (err) {
      setError("Failed to create appointment: " + err.message);
    }
  };

  const createCaseNote = async (e) => {
    e.preventDefault();
    try {
      await apiService.createCaseNote({
        ...newNote,
        counsellorId
      });
      setSuccessMessage("Case note created successfully!");
      setNewNote({ victimId: "", noteContent: "", category: "SESSION_NOTES" });
      setTimeout(() => setSuccessMessage(""), 2000);
      loadAppointmentsAndNotes();
    } catch (err) {
      setError("Failed to create case note: " + err.message);
    }
  };

  const deleteAppointment = async (id) => {
    if (!window.confirm("Delete this appointment?")) return;
    try {
      await apiService.deleteAppointment(id);
      setSuccessMessage("Appointment deleted!");
      loadAppointmentsAndNotes();
    } catch (err) {
      setError("Failed to delete appointment: " + err.message);
    }
  };

  const deleteCaseNote = async (id) => {
    if (!window.confirm("Delete this case note?")) return;
    try {
      await apiService.deleteCaseNote(id);
      setSuccessMessage("Case note deleted!");
      loadAppointmentsAndNotes();
    } catch (err) {
      setError("Failed to delete case note: " + err.message);
    }
  };

  const activeAppointments = (appointments || []).filter(a => a.status === "SCHEDULED")?.length || 0;
  const totalSessions = appointments.length;

  return (
    <div>
      <div className="dash-welcome">
        <h1>👥 Counsellor Dashboard</h1>
        <p>Manage your clients, appointments, and case notes efficiently.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-num">{activeAppointments}</div>
          <p>Scheduled Appointments</p>
        </div>
        <div className="stat-card">
          <div className="stat-num">{totalSessions}</div>
          <p>Total Sessions</p>
        </div>
        <div className="stat-card">
          <div className="stat-num">{caseNotes.length}</div>
          <p>Case Notes</p>
        </div>
      </div>

      <div className="tab-bar">
        {["overview", "appointments", "notes"].map(tab => (
          <button key={tab} className={`tab-btn ${activeTab === tab ? "active" : ""}`} onClick={() => setActiveTab(tab)}>
            {tab === "overview" && "📊 Overview"}
            {tab === "appointments" && "📅 Appointments"}
            {tab === "notes" && "📝 Case Notes"}
          </button>
        ))}
      </div>

      {error && <div style={{ color: '#e53e3e', backgroundColor: '#fed7d7', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>{error}</div>}
      {successMessage && <div style={{ color: '#22543d', backgroundColor: '#c6f6d5', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>{successMessage}</div>}
      {loading && <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>}

      {activeTab === "overview" && !loading && (
        <div>
          <div className="dash-card" style={{ marginBottom: "20px" }}>
            <h3>📅 Upcoming Appointments</h3>
            {appointments.length === 0 ? (
              <p style={{ color: '#718096' }}>No appointments scheduled</p>
            ) : (
            (appointments || []).slice(0, 5).map(a => (
                <div key={a.id} className="list-item">
                  <span className="li-dot blue"></span>
                  <div style={{ flex: 1 }}>
                    <strong>Victim ID: {a.victimId}</strong> — {a.type}<br/>
                    <small>{new Date(a.appointmentDateTime).toLocaleString()}</small>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="dash-card">
            <h3>📝 Recent Notes</h3>
            {caseNotes.length === 0 ? (
              <p style={{ color: '#718096' }}>No case notes</p>
            ) : (
              (caseNotes || []).slice(0, 3).map(n => (
                <div key={n.id} className="list-item">
                  <span className="li-dot yellow"></span>
                  <div style={{ flex: 1 }}>
                    <strong>Victim ID: {n.victimId}</strong> — {n.category}<br/>
                    <small>{(n.noteContent || '').substring(0, 60)}...</small>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === "appointments" && !loading && (
        <div>
          <div className="dash-card" style={{ marginBottom: "20px" }}>
            <h3>📅 All Appointments</h3>
            {appointments.length === 0 ? (
              <p style={{ color: '#718096' }}>No appointments</p>
            ) : (
              (appointments || []).map(a => (
                <div key={a.id} className="list-item" style={{ justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
                    <span className={`li-dot ${a.status === "SCHEDULED" ? "green" : "gray"}`}></span>
                    <div>
                      <strong>Victim {a.victimId}</strong> — {a.type}<br/>
                      <small>{new Date(a.appointmentDateTime).toLocaleString()} • {a.status}</small>
                    </div>
                  </div>
                  <button onClick={() => deleteAppointment(a.id)} style={{ background: "none", border: "none", color: "#e53e3e", cursor: "pointer", fontWeight: "700" }}>✕</button>
                </div>
              ))
            )}
          </div>

          <div className="dash-card">
            <h3>➕ Schedule New Appointment</h3>
            <form onSubmit={createAppointment} className="auth-form" style={{ marginTop: "16px" }}>
              <div className="form-group">
                <label>Victim ID</label>
                <input type="number" placeholder="Enter victim ID" value={newAppointment.victimId} onChange={e => setNewAppointment({ ...newAppointment, victimId: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Date & Time</label>
                <input type="datetime-local" value={newAppointment.appointmentDateTime} onChange={e => setNewAppointment({ ...newAppointment, appointmentDateTime: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Session Type</label>
                <select value={newAppointment.type} onChange={e => setNewAppointment({ ...newAppointment, type: e.target.value })}>
                  <option value="VIDEO_CALL">Video Call</option>
                  <option value="VOICE_CALL">Voice Call</option>
                  <option value="IN_PERSON">In Person</option>
                  <option value="CHAT">Chat</option>
                </select>
              </div>
              <div className="form-group">
                <label>Notes</label>
                <textarea placeholder="Any additional notes..." value={newAppointment.notes} onChange={e => setNewAppointment({ ...newAppointment, notes: e.target.value })} rows="3" />
              </div>
              <button type="submit" className="btn-submit" disabled={loading}>Create Appointment</button>
            </form>
          </div>
        </div>
      )}

      {activeTab === "notes" && !loading && (
        <div>
          <div className="dash-card" style={{ marginBottom: "20px" }}>
            <h3>📝 All Case Notes</h3>
            {caseNotes.length === 0 ? (
              <p style={{ color: '#718096' }}>No case notes</p>
            ) : (
              (caseNotes || []).map(n => (
                <div key={n.id} className="list-item" style={{ justifyContent: "space-between", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
                    <span className={`li-dot ${n.isConfidential ? "red" : "blue"}`}></span>
                    <div style={{ flex: 1 }}>
                      <strong>Victim {n.victimId}</strong> — {n.category}<br/>
                      <p style={{ margin: "8px 0", color: "#4a5568" }}>{n.noteContent}</p>
                      <small>{new Date(n.createdAt).toLocaleString()}</small>
                    </div>
                  </div>
                  <button onClick={() => deleteCaseNote(n.id)} style={{ background: "none", border: "none", color: "#e53e3e", cursor: "pointer", fontWeight: "700", marginTop: "8px" }}>✕</button>
                </div>
              ))
            )}
          </div>

          <div className="dash-card">
            <h3>➕ Add Case Note</h3>
            <form onSubmit={createCaseNote} className="auth-form" style={{ marginTop: "16px" }}>
              <div className="form-group">
                <label>Victim ID</label>
                <input type="number" placeholder="Enter victim ID" value={newNote.victimId} onChange={e => setNewNote({ ...newNote, victimId: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select value={newNote.category} onChange={e => setNewNote({ ...newNote, category: e.target.value })}>
                  <option value="SESSION_NOTES">Session Notes</option>
                  <option value="ASSESSMENT">Assessment</option>
                  <option value="PROGRESS">Progress</option>
                  <option value="FOLLOW_UP">Follow Up</option>
                </select>
              </div>
              <div className="form-group">
                <label>Note Content</label>
                <textarea placeholder="Write your case note..." value={newNote.noteContent} onChange={e => setNewNote({ ...newNote, noteContent: e.target.value })} rows="5" required />
              </div>
              <button type="submit" className="btn-submit" disabled={loading}>Save Case Note</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CounsellorDashboard;
