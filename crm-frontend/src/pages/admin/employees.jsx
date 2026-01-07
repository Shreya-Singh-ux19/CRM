import DashboardCards from "../../components/DashboardCards";

export default function Employees({ data, compact = false }) {

  if (!data || !data.employees) {
    return <p>Loading employees...</p>;
  }

  if (data.employees.length === 0) {
    return <p>No employees available</p>;
  }

  return (
    <>
      <h3>{compact ? "Employee Snapshot" : "Employee Management"}</h3>

      {!compact && <DashboardCards data={data} />}

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Issues Solved</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.username}</td>
              <td>{emp.issuesSolved}</td>
              <td>{emp.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
