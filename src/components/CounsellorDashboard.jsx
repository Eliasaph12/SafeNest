import { useState } from "react";
import "../secure.css";

const initialAppointments = [
  { id: 1, client: "Client A", time: "10:00 AM", type: "Initial Consultation", status: "green" },
  { id: 2, client: "Client B", time: "2:00 PM", type: "Follow-up Session", status: "blue" },
  { id: 3, client: "Client C", time: "4:30 PM", type: "Crisis Intervention", status: "red" },
];

const CounsellorDashboard = ({ activeTab, setActiveTab }) => {
  activeTab = activeTab || "overview";
  setActiveTab = setActiveTab || (() => {});
  const [appointments, setAppointments] = useState(initialAppointments);
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [newAppt, setNewAppt] = useState({ client: "", time: "", type: "" });
  const [apptSaved, setApptSaved] = useState(false);

  const addNote = () => {
    if (!note.trim()) return;
    setNotes([{ text: note, date: new Date().toLocaleString() }, ...notes]);
    setNote("");
  };

  const addAppointment = (e) => {
    e.preventDefault();
    setAppointments([...appointments, { id: Date.now(), ...newAppt, status: "green" }]);
    setNewAppt({ client: "", time: "", type: "" });
    setApptSaved(true);
    setTimeout(() => setApptSaved(false), 2000);
  };

  const removeAppointment = (id) => setAppointments(appointments.filter(a => a.id !== id));

  return (
    <div>
      <div className="dash-welcome">
        <h1>Counsellor Dashboard</h1>
        <p>Manage your clients and appointments efficiently.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card"><div className="stat-num">24</div><p>Active Clients</p></div>
        <div className="stat-card"><div className="stat-num">{appointments.length}</div><p>Appointments Today</p></div>
        <div className="stat-card"><div className="stat-num">156</div><p>Total Sessions</p></div>
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

      {activeTab === "overview" && (
        <div className="dash-card">
          <h3>📅 Today's Appointments</h3>
          {appointments.map(a => (
            <div key={a.id} className="list-item">
              <span className={`li-dot ${a.status}`}></span>
              {a.client} — {a.time} — {a.type}
            </div>
          ))}
        </div>
      )}

      {activeTab === "appointments" && (
        <div>
          <div className="dash-card" style={{ marginBottom: "20px" }}>
            <h3>📅 All Appointments</h3>
            {appointments.map(a => (
              <div key={a.id} className="list-item" style={{ justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span className={`li-dot ${a.status}`}></span>
                  {a.client} — {a.time} — {a.type}
                </div>
                <button onClick={() => removeAppointment(a.id)} style={{ background: "none", border: "none", color: "#e53e3e", cursor: "pointer", fontWeight: "700" }}>✕</button>
              </div>
            ))}
          </div>
          <div className="dash-card">
            <h3>➕ Add Appointment</h3>
            <form onSubmit={addAppointment} className="auth-form" style={{ marginTop: "16px" }}>
              <div className="form-group">
                <label>Client Name</label>
                <input type="text" placeholder="Client name" value={newAppt.client} onChange={e => setNewAppt({ ...newAppt, client: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Time</label>
                <input type="time" value={newAppt.time} onChange={e => setNewAppt({ ...newAppt, time: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Session Type</label>
                <select value={newAppt.type} onChange={e => setNewAppt({ ...newAppt, type: e.target.value })} required>
                  <option value="">Select type</option>
                  <option>Initial Consultation</option>
                  <option>Follow-up Session</option>
                  <option>Crisis Intervention</option>
                  <option>Group Session</option>
                </select>
              </div>
              <button type="submit" className="btn-submit">Add Appointment</button>
              {apptSaved && <p style={{ color: "green", marginTop: "10px", fontWeight: "600" }}>✅ Appointment added!</p>}
            </form>
          </div>
        </div>
      )}

      {activeTab === "notes" && (
        <div className="dash-card">
          <h3>📝 Case Notes</h3>
          <div className="chat-input-row" style={{ marginTop: "16px" }}>
            <input className="chat-input" placeholder="Write a case note..." value={note} onChange={e => setNote(e.target.value)} onKeyDown={e => e.key === "Enter" && addNote()} />
            <button className="btn-submit" onClick={addNote}>Add</button>
          </div>
          <div style={{ marginTop: "16px" }}>
            {notes.length === 0 && <p style={{ color: "#718096" }}>No notes yet. Add your first case note above.</p>}
            {notes.map((n, i) => (
              <div key={i} className="list-item" style={{ flexDirection: "column", alignItems: "flex-start" }}>
                <p style={{ fontWeight: "600" }}>{n.text}</p>
                <small style={{ color: "#718096" }}>{n.date}</small>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CounsellorDashboard;
