import { useEffect, useState } from "react";
import "./EmployeeDashboard.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function EmployeeDashboard() {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("issues");
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(navigate);
  };

  const loadData = async () => {
    const userEmail = localStorage.getItem("email");
    const res = await fetch(
      `http://localhost:8081/api/employee/dashboard/${userEmail}`
    );
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    loadData();
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(
      `http://localhost:8081/api/employee/update-status/${id}/${status}`,
      { method: "POST" }
    );
    loadData();
  };

  if (!data) return <h3 style={{ textAlign: "center" }}>Loading...</h3>;

  const chartData = [
    { name: "Assigned", count: data.assigned },
    { name: "Completed", count: data.completed },
    { name: "Pending", count: data.pending },
  ];
  
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h3>Employee Panel</h3>

        <button
          className={activeTab === "issues" ? "active" : ""}
          onClick={() => setActiveTab("issues")}
        >
          Assigned Issues
        </button>

        <button
          className={activeTab === "summary" ? "active" : ""}
          onClick={() => setActiveTab("summary")}
        >
          Work Summary
        </button>

        <button
          className={activeTab === "notifications" ? "active" : ""}
          onClick={() => setActiveTab("notifications")}
        >
          Notifications
        </button>

        <button
          className={activeTab === "profile" ? "active" : ""}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>

        <button className="logout-btn" onClick={handleLogout}>
          ⏻ Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="content">
        

        {/* Assigned Issues */}
        {activeTab === "issues" && (
          <>
          <h2>Employee Dashboard</h2>
            <div className="cards">
              <div className="card">
                Assigned Issues <br /> {data.assigned}
              </div>
              <div className="card">
                Completed <br /> {data.completed}
              </div>
              <div className="card">
                Pending <br /> {data.pending}
              </div>
            </div>

            <h3>Assigned Issues</h3>

            <table>
              <thead>
                <tr>
                  <th>Issue ID</th>
                  <th>Customer</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {data.issues.map((i) => (
                  <tr key={i.id}>
                    <td>{i.id}</td>
                    <td>{i.customerEmail}</td>
                    <td>{i.priority}</td>

                    <td
                      className={
                        i.status === "ASSIGNED"
                          ? "status assigned"
                          : i.status === "IN_PROGRESS"
                          ? "status progress"
                          : "status resolved"
                      }
                    >
                      {i.status.replace("_", " ")}
                    </td>

                    <td>
                      {i.status === "ASSIGNED" && (
                        <button
                          onClick={() =>
                            updateStatus(i.id, "IN_PROGRESS")
                          }
                        >
                          Start
                        </button>
                      )}

                      {i.status === "IN_PROGRESS" && (
                        <button
                          className="resolve"
                          onClick={() =>
                            updateStatus(i.id, "RESOLVED")
                          }
                        >
                          Resolve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* Work Summary */}
        {activeTab === "summary" && (
          <>
            <h3>Work Summary</h3>

            <div className="summary-wrapper">
              {/* Summary Cards */}
              <div className="summary-cards">
                <div className="summary-card assigned">
                  <span>Total Assigned</span>
                  <strong>{data.assigned}</strong>
                </div>

                <div className="summary-card completed">
                  <span>Completed</span>
                  <strong>{data.completed}</strong>
                </div>

                <div className="summary-card pending">
                  <span>Pending</span>
                  <strong>{data.pending}</strong>
                </div>
              </div>

              {/* Chart */}
              <div className="summary-chart">
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#1d4ed8" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}


        {/* Notifications */}
          {activeTab === "notifications" && (
          <>
            <h3>Notifications</h3>
            <div className="notification-box">
              {data.notifications.length === 0 ? (
                <p className="no-notification">
                  No new notifications
                </p>
              ) : (
                data.notifications.map((n, i) => (
                  <div key={i} className="notification-item">
                    {n}
                  </div>
                ))
              )}
            </div>
          </>
        )}


        {/* Profile */}
        {activeTab === "profile" && (
          <>
            <h3>Profile</h3>
            <div className="profile-card">
              <p>
                <b>Name:</b> {data.profile.name}
              </p>
              <p>
                <b>Email:</b> {data.profile.email}
              </p>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
