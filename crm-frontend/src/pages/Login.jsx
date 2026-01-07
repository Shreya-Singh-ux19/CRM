import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading,setloading]= useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    
    try {
      const res = await fetch("http://localhost:8081/api/auth/login",{
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(form)

      });
      if(!res.ok) throw new Error("Login Failed");
      const response = await res.json();

       localStorage.setItem("role", response.role);
       localStorage.setItem("email", response.email);
       localStorage.setItem("id", response.id);
       localStorage.setItem("username", response.username);
           

     


      alert(response.message);
      

      // 🔥 ROLE BASED REDIRECT
      if (response.role === "ADMIN") {
        navigate("/admin");
      } else if (response.role === "EMPLOYEE") {
        navigate(`/employee/${response.id}`);
      } else {
        navigate("/customer");
      }

    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl w-96 shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

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

        <button className="btn-primary">Login</button>

        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600">Signup</Link>
        </p>

      </form>
    </div>
  );
}
