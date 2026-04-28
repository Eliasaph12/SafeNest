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

const AgentSupportChat = ({ agent }) => {
  const [threads, setThreads] = useState([]);
  const [selectedVictimId, setSelectedVictimId] = useState(null);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const mapAgentMessages = (data) =>
    (data || []).map((msg) => ({
      id: msg.id,
      from: Number(msg.senderId) === Number(agent.id) ? "agent" : "victim",
      text: msg.message,
      timestamp: msg.timestamp,
    }));

  const victimGroups = Object.values(
    threads.reduce((accumulator, thread) => {
      const key = Number(thread.victimId);
      if (!accumulator[key]) {
        accumulator[key] = {
          victimId: key,
          victimName: thread.victimName,
          victimEmail: thread.victimEmail,
          latestStatus: thread.status,
          latestMessage: thread.lastMessage,
          latestMessageAt: thread.lastMessageAt || thread.updatedAt,
          sessions: [],
        };
      }

      accumulator[key].sessions.push(thread);

      const existingLatest = new Date(accumulator[key].latestMessageAt || 0).getTime();
      const candidateLatest = new Date(thread.lastMessageAt || thread.updatedAt || 0).getTime();

      if (candidateLatest >= existingLatest) {
        accumulator[key].latestStatus = thread.status;
        accumulator[key].latestMessage = thread.lastMessage;
        accumulator[key].latestMessageAt = thread.lastMessageAt || thread.updatedAt;
      }

      return accumulator;
    }, {})
  )
    .map((group) => ({
      ...group,
      sessions: [...group.sessions].sort(
        (left, right) => new Date(right.lastMessageAt || right.updatedAt || 0) - new Date(left.lastMessageAt || left.updatedAt || 0)
      ),
    }))
    .sort((left, right) => new Date(right.latestMessageAt || 0) - new Date(left.latestMessageAt || 0));

  const selectedVictimGroup = victimGroups.find((group) => Number(group.victimId) === Number(selectedVictimId)) || null;
  const selectedThread =
    selectedVictimGroup?.sessions.find((thread) => Number(thread.sessionId) === Number(selectedSessionId))
    || selectedVictimGroup?.sessions[0]
    || null;

  useEffect(() => {
    if (!agent?.id) {
      return;
    }

    const loadThreads = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getAgentChatThreads(agent.id);
        setThreads(data || []);
        setSelectedVictimId((currentVictimId) => currentVictimId ?? data?.[0]?.victimId ?? null);
        setSelectedSessionId((currentSessionId) => currentSessionId ?? data?.[0]?.sessionId ?? null);
      } catch (err) {
        setError("Failed to load support conversations: " + err.message);
        setThreads([]);
        setSelectedVictimId(null);
        setSelectedSessionId(null);
      } finally {
        setLoading(false);
      }
    };

    loadThreads();
  }, [agent]);

  useEffect(() => {
    if (!agent?.id) {
      return;
    }

    const refreshThreads = async () => {
      try {
        const data = await apiService.getAgentChatThreads(agent.id);
        const nextThreads = data || [];
        setThreads((prev) => (JSON.stringify(prev) === JSON.stringify(nextThreads) ? prev : nextThreads));
        setSelectedVictimId((currentVictimId) => {
          const stillExists = nextThreads.some((thread) => Number(thread.victimId) === Number(currentVictimId));
          return stillExists ? currentVictimId : nextThreads[0]?.victimId ?? null;
        });
        setSelectedSessionId((currentSessionId) => {
          const stillExists = nextThreads.some((thread) => Number(thread.sessionId) === Number(currentSessionId));
          return stillExists ? currentSessionId : nextThreads[0]?.sessionId ?? null;
        });
      } catch (err) {
        setError((current) => current || "Live chat update failed: " + err.message);
      }
    };

    const intervalId = window.setInterval(refreshThreads, CHAT_POLL_INTERVAL_MS);
    return () => window.clearInterval(intervalId);
  }, [agent]);

  useEffect(() => {
    if (!selectedVictimGroup) {
      return;
    }

    const sessionStillExists = selectedVictimGroup.sessions.some(
      (thread) => Number(thread.sessionId) === Number(selectedSessionId)
    );

    if (!sessionStillExists) {
      setSelectedSessionId(selectedVictimGroup.sessions[0]?.sessionId ?? null);
    }
  }, [selectedVictimGroup, selectedSessionId]);

  useEffect(() => {
    if (!agent?.id || !selectedThread?.victimId || !selectedSessionId) {
      return;
    }

    const loadMessages = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getChatMessages(agent.id, selectedThread.victimId, selectedSessionId);
        setMessages(mapAgentMessages(data));
      } catch (err) {
        setError("Failed to load chat messages: " + err.message);
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, [agent, selectedSessionId, selectedThread?.victimId]);

  useEffect(() => {
    if (!agent?.id || !selectedThread?.victimId || !selectedSessionId) {
      return;
    }

    const refreshMessages = async () => {
      try {
        const data = await apiService.getChatMessages(agent.id, selectedThread.victimId, selectedSessionId);
        const normalized = mapAgentMessages(data);
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
  }, [agent, selectedSessionId, selectedThread?.victimId]);

  const sendReply = async () => {
    if (!message.trim() || !selectedThread) {
      return;
    }

    try {
      setError(null);
      const createdMessage = await apiService.sendChatMessage({
        senderId: agent.id,
        receiverId: selectedThread.victimId,
        sessionId: selectedSessionId,
        message: message.trim(),
      });
      setMessages((prev) => [
        ...prev,
        {
          id: createdMessage.id,
          from: "agent",
          text: createdMessage.message,
          timestamp: createdMessage.timestamp,
        },
      ]);
      setThreads((prev) =>
        prev.map((thread) =>
          Number(thread.victimId) === Number(selectedThread.victimId)
            && Number(thread.sessionId) === Number(selectedThread.sessionId)
            ? {
                ...thread,
                lastMessage: createdMessage.message,
                lastMessageAt: createdMessage.timestamp,
                updatedAt: createdMessage.timestamp,
              }
            : thread
        )
      );
      setMessage("");
      setSuccessMessage("Reply sent to the user.");
      setTimeout(() => setSuccessMessage(""), 2000);
    } catch (err) {
      setError("Failed to send reply: " + err.message);
    }
  };

  const closeCurrentSession = async () => {
    if (!selectedSessionId) {
      return;
    }
    try {
      setError(null);
      const closed = await apiService.closeChatSession(selectedSessionId);
      setThreads((prev) =>
        prev.map((thread) =>
          thread.sessionId === closed.id
            ? {
                ...thread,
                status: closed.status,
                updatedAt: closed.updatedAt || thread.updatedAt,
                lastMessageAt: closed.lastMessageAt || thread.lastMessageAt,
              }
            : thread
        )
      );
    } catch (err) {
      setError("Failed to close support session: " + err.message);
    }
  };

  const deleteCurrentSession = async () => {
    if (!selectedSessionId) {
      return;
    }

    try {
      setError(null);
      const deleted = await apiService.deleteChatSession(selectedSessionId);
      const remainingThreads = threads.filter((thread) => Number(thread.sessionId) !== Number(deleted.id));
      setThreads(remainingThreads);
      setMessages([]);

      const nextVictimGroup = Object.values(
        remainingThreads.reduce((accumulator, thread) => {
          const key = Number(thread.victimId);
          if (!accumulator[key]) {
            accumulator[key] = [];
          }
          accumulator[key].push(thread);
          return accumulator;
        }, {})
      );

      const nextThread = nextVictimGroup[0]?.[0] || null;
      setSelectedVictimId(nextThread?.victimId ?? null);
      setSelectedSessionId(nextThread?.sessionId ?? null);
      setSuccessMessage("Chat session deleted.");
      setTimeout(() => setSuccessMessage(""), 2000);
    } catch (err) {
      setError("Failed to delete support session: " + err.message);
    }
  };

  return (
    <div>
      <div className="dash-card" style={{ marginBottom: "20px" }}>
        <h3>Support Inbox</h3>
        <p style={{ color: "#718096", marginTop: "8px" }}>
          Reply to victim chats routed to your authorized account.
        </p>
        <div style={{ marginTop: "14px" }}>
          <button className="btn-outline" onClick={closeCurrentSession} disabled={!selectedSessionId}>
            Close Current Chat
          </button>
          <button className="btn-danger-sm" onClick={deleteCurrentSession} disabled={!selectedSessionId} style={{ marginLeft: "10px" }}>
            Delete Chat
          </button>
        </div>
      </div>

      {error && <div style={{ color: "#e53e3e", backgroundColor: "#fed7d7", padding: "12px", borderRadius: "8px", marginBottom: "16px" }}>{error}</div>}
      {successMessage && <div style={{ color: "#22543d", backgroundColor: "#c6f6d5", padding: "12px", borderRadius: "8px", marginBottom: "16px" }}>{successMessage}</div>}

      <div style={{ display: "grid", gridTemplateColumns: "minmax(260px, 320px) minmax(0, 1fr)", gap: "20px" }}>
        <div className="dash-card">
          <h4 style={{ marginBottom: "14px" }}>Incoming Users</h4>
          {loading && threads.length === 0 ? (
            <p style={{ color: "#718096" }}>Loading conversations...</p>
          ) : victimGroups.length === 0 ? (
            <p style={{ color: "#718096" }}>No victim messages yet.</p>
          ) : (
            victimGroups.map((group) => {
              const isSelected = Number(group.victimId) === Number(selectedVictimId);
              const activeCount = group.sessions.filter((session) => session.status === "ACTIVE").length;
              return (
                <button
                  key={group.victimId}
                  type="button"
                  onClick={() => {
                    setSelectedVictimId(group.victimId);
                    setSelectedSessionId(group.sessions[0]?.sessionId ?? null);
                  }}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "14px",
                    marginBottom: "12px",
                    borderRadius: "14px",
                    border: isSelected ? "2px solid #6c63ff" : "1px solid #334155",
                    background: isSelected ? "rgba(108, 99, 255, 0.08)" : "rgba(15, 23, 42, 0.55)",
                    color: "#e2e8f0",
                    cursor: "pointer",
                  }}
                >
                  <strong style={{ display: "block", marginBottom: "6px" }}>{group.victimName}</strong>
                  <span style={{ display: "block", fontSize: "12px", color: "#94a3b8", marginBottom: "8px" }}>{group.victimEmail}</span>
                  <span style={{ display: "block", fontSize: "12px", color: "#94a3b8", marginBottom: "6px" }}>
                    {group.sessions.length} session{group.sessions.length === 1 ? "" : "s"} | {activeCount} active
                  </span>
                  <span style={{ display: "block", fontSize: "12px", color: "#94a3b8", marginBottom: "6px" }}>
                    Latest update: {formatSessionDateTime(group.latestMessageAt)}
                  </span>
                  <span style={{ display: "block", fontSize: "13px", color: "#cbd5e1" }}>{group.latestMessage || "No messages yet."}</span>
                </button>
              );
            })
          )}
        </div>

        <div className="dash-card">
          <h4 style={{ marginBottom: "10px" }}>
            {selectedThread ? `Chat with ${selectedThread.victimName}` : "Select a conversation"}
          </h4>
          {selectedThread && (
            <p style={{ color: "#94a3b8", marginBottom: "14px" }}>
              Victim email: {selectedThread.victimEmail}
            </p>
          )}
          {selectedVictimGroup && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "16px" }}>
              {selectedVictimGroup.sessions.map((session) => {
                const isSelected = Number(session.sessionId) === Number(selectedSessionId);
                return (
                  <button
                    key={session.sessionId}
                    type="button"
                    onClick={() => setSelectedSessionId(session.sessionId)}
                    style={{
                      minWidth: "180px",
                      padding: "12px 14px",
                      borderRadius: "14px",
                      border: isSelected ? "2px solid #6c63ff" : "1px solid #334155",
                      background: isSelected ? "rgba(108, 99, 255, 0.08)" : "rgba(15, 23, 42, 0.45)",
                      color: "#e2e8f0",
                      textAlign: "left",
                      cursor: "pointer",
                    }}
                  >
                    <strong style={{ display: "block", marginBottom: "6px" }}>Session #{session.sessionId}</strong>
                    <span style={{ display: "block", fontSize: "12px", color: "#94a3b8", marginBottom: "4px" }}>
                      {session.status}
                    </span>
                    <span style={{ display: "block", fontSize: "12px", color: "#94a3b8", marginBottom: "4px" }}>
                      Started: {formatSessionDateTime(session.createdAt)}
                    </span>
                    <span style={{ display: "block", fontSize: "12px", color: "#94a3b8", marginBottom: "8px" }}>
                      Updated: {formatSessionDateTime(session.lastMessageAt || session.updatedAt)}
                    </span>
                    <span style={{ display: "block", fontSize: "13px", color: "#cbd5e1" }}>{session.lastMessage || "No messages yet."}</span>
                  </button>
                );
              })}
            </div>
          )}
          <div className="chat-box" style={{ minHeight: "320px", marginBottom: "16px" }}>
            {messages.length === 0 ? (
              <p style={{ color: "#718096" }}>No messages in this conversation yet.</p>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className={`chat-msg ${msg.from === "agent" ? "chat-user" : "chat-support"}`}>
                  <span>{msg.text}</span>
                </div>
              ))
            )}
          </div>
          <p style={{ color: "#718096", fontSize: "13px", marginBottom: "12px" }}>
            Live updates every few seconds while this conversation is open.
          </p>
          <div className="chat-input-row">
            <input
              className="chat-input"
              placeholder={selectedThread ? `Reply to ${selectedThread.victimName}...` : "Select a conversation first"}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && sendReply()}
              disabled={!selectedThread}
            />
            <button className="btn-submit" onClick={sendReply} disabled={!selectedThread || !message.trim()}>
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentSupportChat;
