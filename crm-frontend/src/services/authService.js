const API_URL = "http://localhost:8081/api/auth";

export const signup = async (data) => {
  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Signup failed");
  }

  return res.text();
};


export const login = async (data) => {
  const response = await fetch("http://localhost:8081/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
};


export const logout = (navigate) => {
  localStorage.clear();
  navigate("/login");
};
