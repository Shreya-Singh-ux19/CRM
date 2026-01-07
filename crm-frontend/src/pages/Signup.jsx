import { useState } from "react";
import { signup } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "CUSTOMER"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form);
      alert("Signup successful");
      navigate("/login");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl w-96 shadow"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>

        <input
          name="username"
          placeholder="Username"
          className="input"
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input"
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input"
          onChange={handleChange}
          required
        />

        <select
          name="role"
          className="input"
          onChange={handleChange}
        >
          <option value="CUSTOMER">Customer</option>
          <option value="EMPLOYEE">Employee</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button className="btn-primary">Signup</button>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">Login</Link>
        </p>
      </form>
    </div>
  );
}



