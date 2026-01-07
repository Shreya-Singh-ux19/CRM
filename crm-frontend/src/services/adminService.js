

const BASE = "http://localhost:8081/api/admin";

export const fetchAdminSummary = () =>
  fetch(`${BASE}/dashboard`).then((res) => res.json());

export const fetchAdminIssues = () =>
  fetch(`${BASE}/issues`).then((res) => res.json());

export const fetchAdminEmployees = () =>
  fetch(`${BASE}/employees`).then((res) => res.json());

export const fetchAdminCustomers = () =>
  fetch(`${BASE}/customers`).then((res) => res.json());



export const assignIssue = async (id, email) => {
  return fetch(`${BASE}/assign?issueId=${id}&employeeEmail=${email}`, {
    method: "POST",
  }).then(res => res.text());
};