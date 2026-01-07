import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";

import Overview from "./Overview";
import IssueManagement from "./issueManagement";
import Employees from "./employees";
import Customers from "./customers";
import Reports from "./reports";
import Settings from "./settings";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [active, setActive] = useState("overview");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8081/api/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Admin dashboard error:", err);
    }
  };

  const assignIssue = async (issueId, username) => {
    await fetch(
      `http://localhost:8081/api/admin/assign/${issueId}/${username}`,
      { method: "POST" }
    );
    alert("Issue assigned");
    loadDashboard();
  };

  if (!data) return <h3 style={{ textAlign: "center" }}>Loading...</h3>;

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h3>Admin Panel</h3>

        <button onClick={() => setActive("overview")} className={active==="overview"?"active":""}>Overview</button>
        <button onClick={() => setActive("issues")} className={active==="issues"?"active":""}>Issue Management</button>
        <button onClick={() => setActive("employees")} className={active==="employees"?"active":""}>Employees</button>
        <button onClick={() => setActive("customers")} className={active==="customers"?"active":""}>Customers</button>
        <button onClick={() => setActive("reports")} className={active==="reports"?"active":""}>Reports</button>
        <button onClick={() => setActive("settings")} className={active==="settings"?"active":""}>Settings</button>

        <div className="sidebar-logout">
          <button className="logout-btn" onClick={() => logout(navigate)}>
            ⏻ Logout
          </button>
        </div>
      </aside>

      <main className="content">
        {active === "overview" && <Overview data={data} onAssign={assignIssue} />}
        {active === "issues" && <IssueManagement data={data} onAssign={assignIssue} />}
        {active === "employees" && <Employees data={data} />}
        {active === "customers" && <Customers data={data} />}
        {active === "reports" && <Reports data={data} />}
        {active === "settings" && <Settings data= {data} />}
      </main>
    </div>
  );
}
