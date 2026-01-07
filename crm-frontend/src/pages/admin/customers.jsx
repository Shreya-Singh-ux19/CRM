
export default function Customers({ data }) {
  if (!data.customers) return null;

  return (
    <>
      <h3>Customers</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.customers.map(c => (
            <tr key={c.id}>
              <td>{c.username}</td>
              <td>{c.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
