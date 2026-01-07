import { useEffect, useState } from "react";
import { getHistory } from "../../services/customerService";
import "./IssueHistory.css";

export default function IssueHistory() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    getHistory(localStorage.getItem("email")).then(setIssues);
  }, []);

  return (
    <div className="history-wrapper">
    <h2 className="history-title">Resolved Issues</h2>

    {issues.length === 0 ? (
      <div className="empty-history">
        <p>No resolved issues yet</p>
      </div>
    ) : (
      <div className="history-grid">
        {issues.map((i) => (
          <div key={i.id} className="history-card">
            <div className="history-top">
              <h4>{i.title}</h4>
              <span className="resolved-badge">Resolved</span>
            </div>

            {i.description && (
              <p className="history-desc">{i.description}</p>
            )}
            <div className="history-bottom">
              <span> 
              <b>Priority:</b> {i.priority || "N/A"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}