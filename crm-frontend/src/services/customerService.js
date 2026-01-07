const BASE = "http://localhost:8081/api/customer";

/* ===== OVERVIEW ===== */
export const getOverview = (email) =>
  fetch(`${BASE}/overview/${email}`)
    .then(res => {
      if (!res.ok) throw new Error("Overview fetch failed");
      return res.json();
    });

/* ===== RAISE ISSUE ===== */
export const raiseIssue = (issue) =>
  fetch(`${BASE}/issue`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(issue),
  }).then(res => res.text());

/* ===== MY ISSUES ===== */
export const getMyIssues = (email) =>
  fetch(`${BASE}/issues/${email}`)
    .then(res => {
      if (!res.ok) throw new Error("MyIssues fetch failed");
      return res.json();
    });

/* ===== ISSUE HISTORY ===== */
export const getHistory = (email) =>
  fetch(`${BASE}/history/${email}`)
    .then(res => {
      if (!res.ok) throw new Error("History fetch failed");
      return res.json();
    });

/* ===== PROFILE (FIXED) ===== */
export const getProfile = async (email) => {
  const  res= await fetch(`${BASE}/profile/${email}`);
      if (!res.ok) throw new Error("Profile fetch failed");
      return res.json();
    };