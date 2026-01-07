export default function Settings({ data }) {
  if (!data) return <p>Loading settings...</p>;

  // Combine employees + customers
  const users = [
    ...data.employees.map(e => ({ ...e, role: "EMPLOYEE" })),
    ...data.customers.map(c => ({ ...c, role: "CUSTOMER" }))
  ];

  return (
    <>
      <h2>Settings</h2>
      {/* ================= ADMIN PROFILE ================= */}
      <div className="card" style={{ maxWidth: "400px", marginBottom: "30px" }}>
        <h3>Admin Profile</h3>

        <p>
          <strong>Username:</strong> {data.admin?.username || "-"}
        </p>

        <p>
          <strong>Email:</strong> {data.admin?.email || "-"}
        </p>
      </div>
     
      {/* ================= USER MANAGEMENT ================= */}
      <h3>User Management</h3>

      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map(u => (
              <tr key={u.id}>
                <td>{u.username}</td>
                <td>{u.role}</td>
                <td>{u.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
