
import { useState, useEffect } from "react";
import RaiseIssue from "./RaiseIssue";
import MyIssues from "./MyIssues";
import IssueHistory from "./IssueHistory";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";
import { getOverview} from "../../services/customerService";

export default function CustomerDashboard() {
  console.log("CustomerDashboard mounted");
  const email = localStorage.getItem("email");
  const [active, setActive] = useState("my");
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    resolved: 0,
  });
  const handleLogout = () => {
    logout(navigate);
  };
  
  useEffect(() => {
    if (!email) return;

    getOverview(email)
      .then(setStats)
      .catch(err => console.error("Dashboard error:", err));
  }, [email]);

  return (
    <div className="dashboard-container">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <h3>Customer Panel</h3>

        <button onClick={() => setActive("raise")}>Raise Issue</button>
        <button onClick={() => setActive("my")}>My Issues</button>
        <button onClick={() => setActive("history")}>Issue History</button>
        <button onClick={() => setActive("profile")}>Profile</button>
        <button className="logout-btn" onClick={handleLogout}> ⏻ Logout </button>
      </aside>

      {/* CONTENT */}
      <main className="content">

        {/* OVERVIEW (DEFAULT — NOT IN NAV) */}
        {active === "overview" && (
          <>
            <h2>Dashboard Overview</h2>
            <div className="cards">
              <div className="card">Total Issues: {stats.total}</div>
              <div className="card">Open: {stats.open}</div>
              <div className="card">Resolved: {stats.resolved}</div>
            </div>
          </>
        )}

        {active === "raise" && <RaiseIssue />}
        {active === "my" && <MyIssues />}
        {active === "history" && <IssueHistory />}
        {active === "profile" && <Profile />}

      </main>
      </div>
  );
}

       