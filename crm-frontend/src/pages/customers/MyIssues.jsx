import { useEffect, useState } from "react";
import { getMyIssues } from "../../services/customerService";
import "./MyIssues.css";

export default function MyIssues() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    getMyIssues(localStorage.getItem("email")).then(setIssues);
  }, []);

  return (
    <div className="myissues-wrapper">
      <h2 className="myissues-title">📌 My Issues</h2>

      {issues.length === 0 ? (
        <div className="empty-box">
          <p>No issues raised yet</p>
        </div>
      ) : (
        <div className="issues-grid">
          {issues.map((i) => (
            <div key={i.id} className="issue-box">
              <div className="issue-top">
                <h4>{i.title}</h4>
                <span
                  className={`status-pill ${i.status
                    .toLowerCase()
                    .replace("_", "")}`}
                >
                  {i.status}
                </span>
              </div>
              <p className="issue-desc">{i.description}</p>

              <div className="issue-bottom">
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