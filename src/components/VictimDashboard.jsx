import { useEffect, useState } from "react";
import "../secure.css";
import { apiService } from "../services/apiService.js";

const CHAT_POLL_INTERVAL_MS = 3000;

const formatSessionDateTime = (value) => {
  if (!value) {
    return "Just now";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return "Just now";
  }

  return parsed.toLocaleString([], {
    day: "2-digit",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
};

const VictimDashboard = ({ onEmergency, activeTab, setActiveTab, user }) => {
  activeTab = activeTab || "overview";
  setActiveTab = setActiveTab || (() => {});

  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [assignedAgent, setAssignedAgent] = useState(null);
  const [chatReady, setChatReady] = useState(false);
  const [chatNotice, setChatNotice] = useState("");
  const [safetyPlan, setSafetyPlan] = useState({ safePlace: "", trustedPerson: "", emergencyItems: "" });
  const [planSaved, setPlanSaved] = useState(false);
  const victimId = user?.id != null ? Number(user.id) : null;
  const activeSession = sessions.find((session) => session.id === activeSessionId) || null;
  const hasActiveSession = sessions.some((session) => session.status === "ACTIVE");

  const mapVictimChatMessages = (data) =>
    (data || []).map((msg) => ({
      id: msg.id,
      from: Number(msg.senderId) === victimId ? "user" : "support",
      text: msg.message,
      timestamp: msg.timestamp,
    }));

  useEffect(() => {
    if (activeTab !== "resources") {
      return;
    }

    const loadResources = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getAllResources();
        setResources(data);
      } catch (err) {
        setError("Failed to load resources: " + err.message);
        setResources([]);
      } finally {
        setLoading(false);
      }
    };

    loadResources();
  }, [activeTab]);

  useEffect(() => {
    if (activeTab !== "chat") {
      return;
    }

    if (!victimId) {
      setError("Your session is outdated. Please log out and log in again to start support chat.");
      setAssignedAgent(null);
      setSessions([]);
      setActiveSessionId(null);
      setMessages([]);
      setChatReady(false);
      return;
    }

    const loadChat = async () => {
      try {
        setLoading(true);
        setError(null);

        const agent = await apiService.getPrimarySupportAgent();
        setAssignedAgent(agent || null);

        if (!agent?.id) {
          setMessages([]);
          setSessions([]);
          setActiveSessionId(null);
          setChatReady(false);
          return;
        }

        const sessionData = await apiService.getVictimChatSessions(victimId);
        let nextSessions = sessionData || [];

        if (nextSessions.length === 0) {
          const createdSession = await apiService.createChatSession(victimId, Number(agent.id));
          nextSessions = [createdSession];
        }

        setSessions(nextSessions);
        const selectedSessionId = nextSessions.find((session) => session.status === "ACTIVE")?.id ?? nextSessions[0]?.id ?? null;
        setActiveSessionId(selectedSessionId);

        const data = selectedSessionId
          ? await apiService.getChatMessages(victimId, Number(agent.id), selectedSessionId)
          : [];
        const normalized = mapVictimChatMessages(data);

        setMessages(
          normalized.length > 0
            ? normalized
            : [
                {
                  id: "welcome",
                  from: "support",
                  text: `Hello, I'm ${agent.name}. You have been connected to authorized ${agent.role} support. Send your message and the agent will be notified by email to continue the chat.`,
                },
              ]
        );
        setChatReady(true);
        setChatNotice("");
      } catch (err) {
        setError("Failed to connect to an authorized support agent: " + err.message);
        setAssignedAgent(null);
        setSessions([]);
        setActiveSessionId(null);
        setMessages([]);
        setChatReady(false);
      } finally {
        setLoading(false);
      }
    };

    loadChat();
  }, [activeTab, victimId]);

  useEffect(() => {
    if (activeTab !== "chat" || !assignedAgent?.id || !activeSessionId || !victimId) {
      return;
    }

    const refreshMessages = async () => {
      try {
        const sessionData = await apiService.getVictimChatSessions(victimId);
        setSessions((prev) => {
          const nextSessions = sessionData || [];
          return JSON.stringify(prev) === JSON.stringify(nextSessions) ? prev : nextSessions;
        });
        const data = await apiService.getChatMessages(victimId, Number(assignedAgent.id), activeSessionId);
        const normalized = mapVictimChatMessages(data);
        setMessages((prev) => {
          const prevSerialized = JSON.stringify(prev);
          const nextSerialized = JSON.stringify(normalized);
          return prevSerialized === nextSerialized ? prev : normalized;
        });
      } catch (err) {
        setError((current) => current || "Live chat update failed: " + err.message);
      }
    };

    const intervalId = window.setInterval(refreshMessages, CHAT_POLL_INTERVAL_MS);
    return () => window.clearInterval(intervalId);
  }, [activeTab, assignedAgent, victimId, activeSessionId]);

  const startNewChatSession = async () => {
    if (!assignedAgent?.id || !victimId) {
      return;
    }

    try {
      setError(null);
      const createdSession = await apiService.createChatSession(victimId, Number(assignedAgent.id));
      setSessions((prev) => {
        const withoutDuplicate = prev.filter((session) => session.id !== createdSession.id);
        return [createdSession, ...withoutDuplicate];
      });
      setActiveSessionId(createdSession.id);
      if (createdSession.reusedExisting) {
        setChatNotice("You already have an active chat with support. We reopened that session for you.");
      } else {
        setChatNotice("A new support chat session has started.");
      }
      setMessages([
        {
          id: `welcome-${createdSession.id}`,
          from: "support",
          text: `This is a support session with ${assignedAgent.name}. You can start sharing what you need help with here.`,
        },
      ]);
    } catch (err) {
      setError("Failed to start a new chat session: " + err.message);
    }
  };

  const closeCurrentSession = async () => {
    if (!activeSessionId) {
      return;
    }

    try {
      setError(null);
      const closedSession = await apiService.closeChatSession(activeSessionId);
      setSessions((prev) => prev.map((session) => (session.id === closedSession.id ? closedSession : session)));
      setChatNotice("This chat session has been closed. Start a new chat whenever you are ready.");
    } catch (err) {
      setError("Failed to close this chat session: " + err.message);
    }
  };

  const deleteCurrentSession = async () => {
    if (!activeSessionId) {
      return;
    }

    try {
      setError(null);
      const deletedSession = await apiService.deleteChatSession(activeSessionId);
      const remainingSessions = sessions.filter((session) => session.id !== deletedSession.id);
      setSessions(remainingSessions);

      const nextSessionId = remainingSessions.find((session) => session.status === "ACTIVE")?.id ?? remainingSessions[0]?.id ?? null;
      setActiveSessionId(nextSessionId);

      if (nextSessionId && assignedAgent?.id) {
        const data = await apiService.getChatMessages(victimId, Number(assignedAgent.id), nextSessionId);
        const normalized = mapVictimChatMessages(data);
        setMessages(normalized);
      } else {
        setMessages([]);
      }

      setChatNotice("This chat session has been deleted.");
    } catch (err) {
      setError("Failed to delete this chat session: " + err.message);
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || !assignedAgent?.id || !activeSessionId || !victimId) return;

    try {
      setError(null);
      const outgoing = message.trim();
      const tempId = `local-${Date.now()}`;

      setMessages((prev) => [
        ...prev,
        {
          id: tempId,
          from: "user",
          text: outgoing,
        },
      ]);
      setMessage("");

      const createdMessage = await apiService.sendChatMessage({
        senderId: victimId,
        receiverId: Number(assignedAgent.id),
        sessionId: activeSessionId,
        message: outgoing,
      });

      setMessages((prev) => [
        ...prev.filter((item) => item.id !== tempId),
        {
          id: createdMessage.id,
          from: "user",
          text: createdMessage.message,
          timestamp: createdMessage.timestamp,
        },
      ]);
      setSessions((prev) =>
        prev.map((session) =>
          session.id === activeSessionId
            ? { ...session, lastMessage: createdMessage.message, lastMessageAt: createdMessage.timestamp, updatedAt: createdMessage.timestamp }
            : session
        )
      );
      setChatReady(true);
    } catch (err) {
      setError("Failed to send message: " + err.message);
    }
  };

  const savePlan = (event) => {
    event.preventDefault();
    setPlanSaved(true);
    setTimeout(() => setPlanSaved(false), 3000);
  };

  return (
    <div>
      <div className="dash-welcome">
        <h1>Welcome to Your Safe Space</h1>
        <p>You are not alone. We are here to support you every step of the way.</p>
      </div>

      <div className="alert-box">
        <div>
          <h3>In Immediate Danger?</h3>
          <p>Call emergency services right now</p>
        </div>
        <button className="btn-emergency-dash" onClick={onEmergency}>Call 112 Now</button>
      </div>

      <div className="tab-bar">
        {["overview", "resources", "chat", "safety"].map((tab) => (
          <button key={tab} className={`tab-btn ${activeTab === tab ? "active" : ""}`} onClick={() => setActiveTab(tab)}>
            {tab === "overview" && "Overview"}
            {tab === "resources" && "Resources & Legal Info"}
            {tab === "chat" && "Get Help / Chat Support"}
            {tab === "safety" && "Safety Plan"}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="dash-grid">
          <div className="dash-card"><div className="dc-icon">Resources</div><h3>Resources & Legal Info</h3><p>Access legal guides, protection orders, and your rights as a survivor.</p><button className="btn-card" onClick={() => setActiveTab("resources")}>View Resources</button></div>
          <div className="dash-card"><div className="dc-icon">SOS</div><h3>Get Help / Chat Support</h3><p>Connect with an authorized support agent for practical guidance and follow-up help.</p><button className="btn-card" onClick={() => setActiveTab("chat")}>Open Chat</button></div>
          <div className="dash-card"><div className="dc-icon">Health</div><h3>Health Support</h3><p>Access health resources and trauma recovery guidance.</p><button className="btn-card">Get Help</button></div>
          <div className="dash-card"><div className="dc-icon">Safety</div><h3>Safety Planning</h3><p>Create a personalized safety plan for you and your family.</p><button className="btn-card" onClick={() => setActiveTab("safety")}>Create Plan</button></div>
        </div>
      )}

      {activeTab === "resources" && (
        <div>
          <h3 className="section-heading">Resources & Legal Info</h3>
          {error && <div className="error-message" style={{ color: "#e53e3e", marginBottom: "16px", padding: "12px", backgroundColor: "#fed7d7", borderRadius: "8px", border: "1px solid #feb2b2" }}>{error}</div>}
          <div className="dash-grid">
            {loading ? (
              <div style={{ textAlign: "center", padding: "20px", gridColumn: "1 / -1" }}>Loading resources...</div>
            ) : (
              <>
                {resources.map((resource) => (
                  <div key={resource.id} className="dash-card">
                    <div className="dc-icon">Info</div>
                    <h3>{resource.title || resource.name}</h3>
                    <p>{resource.description}</p>
                    {resource.contactInfo && <p style={{ fontSize: "14px", color: "#6c63ff", margin: "8px 0" }}>Contact: {resource.contactInfo}</p>}
                    {resource.emergencyHotline && <p style={{ fontSize: "14px", color: "#e53e3e", fontWeight: "600", margin: "8px 0" }}>Emergency: {resource.emergencyHotline}</p>}
                    <span style={{ fontSize: "12px", color: "#718096", background: "#f7fafc", padding: "4px 8px", borderRadius: "12px" }}>
                      {resource.category || resource.resourceType}
                    </span>
                  </div>
                ))}
                {resources.length === 0 && !loading && (
                  <div style={{ textAlign: "center", padding: "20px", gridColumn: "1 / -1" }}>
                    No resources available at the moment. Please check back later.
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {activeTab === "chat" && (
        <div className="chat-container">
          <h3 className="section-heading">Live Support Chat</h3>
          {error && <div className="error-message" style={{ color: "#e53e3e", marginBottom: "16px", padding: "12px", backgroundColor: "#fed7d7", borderRadius: "8px", border: "1px solid #feb2b2" }}>{error}</div>}
          <div className="dash-card" style={{ marginBottom: "20px" }}>
            <h4 style={{ marginBottom: "10px" }}>Assigned Support Agent</h4>
            {assignedAgent ? (
              <>
                <p style={{ color: "#718096", marginBottom: "6px" }}>
                  Connected automatically to: <strong>{assignedAgent.name}</strong> ({assignedAgent.role})
                </p>
                <p style={{ color: "#718096", marginBottom: "6px" }}>{assignedAgent.email}</p>
                <p style={{ color: "#718096", margin: 0 }}>{assignedAgent.specialty}</p>
              </>
            ) : (
              <p style={{ color: "#718096", margin: 0 }}>No authorized support agent is currently available.</p>
            )}
          </div>
          {chatReady && assignedAgent && (
            <p style={{ color: "#2f855a", marginBottom: "8px", fontWeight: "600" }}>
              Your assigned support agent has been notified by email to continue this chat.
            </p>
          )}
          {chatNotice && (
            <p style={{ color: "#94a3b8", marginBottom: "12px" }}>
              {chatNotice}
            </p>
          )}
          <div className="dash-card" style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", alignItems: "center", flexWrap: "wrap", marginBottom: "14px" }}>
              <h4 style={{ margin: 0 }}>Chat Sessions</h4>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button className="btn-card" onClick={startNewChatSession} disabled={hasActiveSession}>
                  Start New Chat
                </button>
                <button className="btn-outline" onClick={closeCurrentSession} disabled={!activeSessionId}>Close Current Chat</button>
                <button className="btn-danger-sm" onClick={deleteCurrentSession} disabled={!activeSessionId}>Delete Chat</button>
              </div>
            </div>
            <p style={{ color: "#94a3b8", marginBottom: "14px", fontSize: "13px" }}>
              Only one active chat can stay open at a time. Close the current session before starting another.
            </p>
            {sessions.length === 0 ? (
              <p style={{ color: "#718096", margin: 0 }}>No chat sessions yet.</p>
            ) : (
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {sessions.map((session) => {
                  const isActive = session.id === activeSessionId;
                  return (
                    <button
                      key={session.id}
                      type="button"
                      onClick={async () => {
                        setActiveSessionId(session.id);
                        const data = await apiService.getChatMessages(victimId, Number(assignedAgent.id), session.id);
                        setMessages(mapVictimChatMessages(data));
                      }}
                      style={{
                        padding: "10px 14px",
                        borderRadius: "12px",
                        border: isActive ? "2px solid #6c63ff" : "1px solid #334155",
                        background: isActive ? "rgba(108, 99, 255, 0.12)" : "rgba(15, 23, 42, 0.35)",
                        color: isActive ? "#1f2937" : "#718096",
                        cursor: "pointer",
                        minWidth: "210px",
                        textAlign: "left",
                      }}
                    >
                      <strong style={{ display: "block" }}>Session #{session.id}</strong>
                      <span style={{ display: "block", fontSize: "12px", marginTop: "4px" }}>{session.status}</span>
                      <span style={{ display: "block", fontSize: "12px", marginTop: "4px" }}>
                        Started: {formatSessionDateTime(session.createdAt)}
                      </span>
                      <span style={{ display: "block", fontSize: "12px", marginTop: "4px" }}>
                        Updated: {formatSessionDateTime(session.lastMessageAt || session.updatedAt)}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          {activeSession && (
            <p style={{ color: "#94a3b8", marginBottom: "12px" }}>
              Current session: <strong>Session #{activeSession.id}</strong> | {activeSession.status} | Last update {formatSessionDateTime(activeSession.lastMessageAt || activeSession.updatedAt)}
            </p>
          )}
          <div className="chat-box">
            {messages.map((msg, index) => (
              <div key={msg.id || index} className={`chat-msg ${msg.from === "user" ? "chat-user" : "chat-support"}`}>
                <span>{msg.text}</span>
              </div>
            ))}
          </div>
          <p style={{ color: "#718096", fontSize: "13px", marginTop: "-4px" }}>
            Live updates every few seconds while this chat is open.
          </p>
          <div className="chat-input-row">
            <input
              className="chat-input"
              placeholder={assignedAgent ? `Message ${assignedAgent.name}...` : "Connecting to support..."}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && sendMessage()}
              disabled={!assignedAgent || !activeSessionId}
            />
            <button className="btn-submit" onClick={sendMessage} disabled={!assignedAgent || !activeSessionId || !message.trim()}>
              Send
            </button>
          </div>
        </div>
      )}

      {activeTab === "safety" && (
        <div className="dash-card">
          <h3 className="section-heading">My Safety Plan</h3>
          <p style={{ marginBottom: "20px", color: "#718096" }}>Fill in your personal safety plan. This is stored only on your device.</p>
          <form onSubmit={savePlan} className="auth-form">
            <div className="form-group">
              <label>Safe Place to Go</label>
              <input type="text" placeholder="e.g. Friend's house, shelter address" value={safetyPlan.safePlace} onChange={(event) => setSafetyPlan({ ...safetyPlan, safePlace: event.target.value })} />
            </div>
            <div className="form-group">
              <label>Trusted Person to Contact</label>
              <input type="text" placeholder="Name and phone number" value={safetyPlan.trustedPerson} onChange={(event) => setSafetyPlan({ ...safetyPlan, trustedPerson: event.target.value })} />
            </div>
            <div className="form-group">
              <label>Emergency Items to Pack</label>
              <input type="text" placeholder="e.g. ID, cash, medications, phone charger" value={safetyPlan.emergencyItems} onChange={(event) => setSafetyPlan({ ...safetyPlan, emergencyItems: event.target.value })} />
            </div>
            <button type="submit" className="btn-submit">Save Safety Plan</button>
            {planSaved && <p style={{ color: "green", marginTop: "10px", fontWeight: "600" }}>Safety plan saved.</p>}
          </form>
        </div>
      )}
    </div>
  );
};

export default VictimDashboard;
