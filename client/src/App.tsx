import { useEffect, useState } from "react";
import NoticeCard from "./components/NoticeCard";
import { Notice } from "./types";

const API_URL = "/api/notices";
const REQUIRED_MESSAGE = "Title and message are required";

function App() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Load notices from MongoDB (through the Express GET API) when the page opens
  useEffect(() => {
    const loadNotices = async () => {
      try {
        const response = await fetch(API_URL);
        const data: Notice[] = await response.json();
        setNotices(data);
      } catch {
        setError("Could not load notices. Is the server running?");
      }
    };

    loadNotices();
  }, []);

  // Add a new notice (through the Express POST API)
  const handleAdd = async () => {
    if (title.trim() === "" || message.trim() === "") {
      setError(REQUIRED_MESSAGE);
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, message }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || REQUIRED_MESSAGE);
        return;
      }

      setNotices([...notices, data as Notice]);
      setTitle("");
      setMessage("");
      setError("");
    } catch {
      setError("Could not save the notice. Is the server running?");
    }
  };

  return (
    <div className="container">
      <h1>Department Notice Board</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Notice title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Notice message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button onClick={handleAdd}>Add</button>

        {error && <p className="error">{error}</p>}
      </div>

      <div className="notice-list">
        {notices.length === 0 ? (
          <p className="empty">No notices yet.</p>
        ) : (
          notices.map((notice) => (
            <NoticeCard
              key={notice._id}
              title={notice.title}
              message={notice.message}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
