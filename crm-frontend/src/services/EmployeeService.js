const API = "http://localhost:8081/api/employee";

export const getEmployeeDashboard = (email) =>
  fetch(`${API}/dashboard/${email}`).then(res => res.json());

export const updateIssueStatus = (id, status) =>
  fetch(`${API}/update-status/${id}/${status}`, { method: "POST" });