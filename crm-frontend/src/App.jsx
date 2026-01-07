import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

// dashboards
import AdminDashboard from "./pages/admin/AdminDashboard";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import CustomerDashboard from "./pages/customers/CustomerDashboard";

// customers
import Customers from "./pages/customers/Customers";

// protected route
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default redirect */}
        <Route path="/" element={<LandingPage/>} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* EMPLOYEE */}
        <Route
          path="/employee/:id"
          element={
            <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

        {/* CUSTOMER */}
        <Route
          path="/customer"
          element={
            <ProtectedRoute allowedRoles={["CUSTOMER"]}>
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Example protected page */}
        <Route
          path="/customers"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "EMPLOYEE"]}>
              <Customers />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}