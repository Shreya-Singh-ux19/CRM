

import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  
  const role = localStorage.getItem("role");

  

  // ❌ Not logged in
  if (!role) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Role mismatch (only check when role exists)
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Allow render
  return children;
}