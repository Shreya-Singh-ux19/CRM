import DashboardCards from "../../components/DashboardCards";

export default function IssueManagement({ data, onAssign, compact = false }) {
    return (
      <>
        <h3>{compact ? "Recent Issues" : "Issue Management"}</h3>
        <DashboardCards data={data} />
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Assigned To</th>
              {!compact && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {data.issues.map((i) => (
              <tr key={i.id}>
                <td>{i.id}</td>
                <td>{i.customerEmail}</td>
                <td>{i.priority || "MEDIUM"}</td>
                <td><span className={`status-badge status-${i.status.toLowerCase().replace("_", "-")}`}>
                      {i.status}
                    </span></td>
                <td>{i.assignedEmployee || "—"}</td>
                {!compact && (
                  <td>
                    { i.status === "OPEN" && !i.assignedEmployee ? (
                    <select
                      defaultValue=""
                      onChange={(e) => onAssign(i.id, e.target.value)}
                    >
                      <option value="" disabled>
                        Assign
                      </option>

                      {data.employees.map(e => (
                        <option key={e.id} value={e.username}>
                          {e.username}
                        </option>
                      ))}
                    </select>
                  ) : i.status === "RESOLVED" ? (
                    <span className="status-badge status-resolved">
                      Completed
                    </span>
                  ) : (
                    <span>—</span>
                  )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
  