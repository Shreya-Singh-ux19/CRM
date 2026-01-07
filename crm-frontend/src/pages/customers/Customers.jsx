import { Link } from "react-router-dom";

export default function Customers() {
  const customers = [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "9876543210",
      company: "TechSoft",
      status: "Active",
    },
    {
      id: 2,
      name: "Anjali Verma",
      email: "anjali@gmail.com",
      phone: "9123456789",
      company: "InnoWorks",
      status: "Lead",
    },
    {
      id: 3,
      name: "Amit Patel",
      email: "amit@gmail.com",
      phone: "9988776655",
      company: "CloudNet",
      status: "Inactive",
    },
  ];

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Customers
        </h1>

        <Link
          to="/customers/add"
          className="mt-4 sm:mt-0 bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700"
        >
          + Add Customer
        </Link>
      </div>

      {/* SEARCH */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search customers..."
          className="w-full sm:w-80 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Phone</th>
              <th className="px-6 py-4 text-left">Company</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">
                  {c.name}
                </td>
                <td className="px-6 py-4">{c.email}</td>
                <td className="px-6 py-4">{c.phone}</td>
                <td className="px-6 py-4">{c.company}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={c.status} />
                </td>
                <td className="px-6 py-4 text-center space-x-2">
                  <Link
                    to={`/customers/view/${c.id}`}
                    className="text-indigo-600 hover:underline"
                  >
                    View
                  </Link>
                  <Link
                    to={`/customers/edit/${c.id}`}
                    className="text-green-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* STATUS BADGE */
function StatusBadge({ status }) {
  const styles = {
    Active: "bg-green-100 text-green-700",
    Lead: "bg-yellow-100 text-yellow-700",
    Inactive: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}
