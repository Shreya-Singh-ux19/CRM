export default function DashboardCards({ data }) {
  return (
    <div className="cards">
      <div className="card">
        Total Customers <br />
        <b>{data.totalCustomers}</b>
      </div>

      <div className="card">
        Total Employees <br />
        <b>{data.totalEmployees}</b>
      </div>

      <div className="card">
        Total Issues <br />
        <b>{data.totalIssues}</b>
      </div>

      <div className="card">
        Resolved Issues <br />
        <b>{data.resolvedIssues}</b>
      </div>

      <div className="card">
        Unresolved Issues <br />
        <b>{data.unresolvedIssues}</b>
      </div>
    </div>
  );
}
