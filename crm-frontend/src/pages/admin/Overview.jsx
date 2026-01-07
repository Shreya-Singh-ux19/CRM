import DashboardCards from "../../components/DashboardCards";

export default function Overview({ data }) {
  const recentIssues = data.issues.slice(0, 5);
  const employees = data.employees.filter(e => e.role === "EMPLOYEE").slice(0, 5);

  return (
    <>
      <h2>Admin Overview</h2>
      <DashboardCards data={data} />

      {/* RECENT ISSUES */}
      <h3 style={{ marginTop: "30px" }}>Recent Issues</h3>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          {recentIssues.map(i => (
            <tr key={i.id}>
              <td>{i.id}</td>
              <td>{i.customerEmail}</td>
              <td><span className={`status-badge status-${i.status.toLowerCase().replace("_", "-")}`}>
                    {i.status}
                  </span></td>
              <td>{i.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>

            <h3>Employee Snapshot</h3>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Issues Solved</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.employees && data.employees.length > 0 ? (
            data.employees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.username}</td>
                <td>{emp.issuesSolved}</td>
                <td>{emp.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>

    </>
  );
}
