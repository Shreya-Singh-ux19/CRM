import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-card">
        <h1 className="landing-title">
          Client<span>X</span>
        </h1>

        <p className="landing-subtitle">
          Customer Relationship Management System
        </p>

        <p className="landing-desc">
          Manage customers, track issues, and streamline communication
          across Admin, Employee, and Customer portals.
        </p>

        <button
          className="landing-btn"
          onClick={() => navigate("/login")}
        >
          Login to Dashboard
        </button>

        <div className="landing-footer">
          Admin • Employee • Customer
        </div>
      </div>
    </div>
  );
}
