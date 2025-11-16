import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import MyPets from "./pages/MyPets";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PetDetails from "./pages/PetDetails";

// ------------------------------------------------------
// Proper Protected Route (NO BLANK FLASH, NO RACE ISSUE)
// ------------------------------------------------------
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // If no token → go to login immediately
  if (!token) return <Navigate to="/login" replace />;

  return children;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* -------- PUBLIC ROUTES -------- */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* -------- PRIVATE LAYOUT WRAPPER -------- */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* DEFAULT redirect */}
          <Route index element={<Navigate to="/dashboard" replace />} />

          {/* APP ROUTES */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="mypets" element={<MyPets />} />
          <Route path="settings" element={<Settings />} />
          <Route path="mypets/:id" element={<PetDetails />} />
        </Route>

        {/* -------- CATCH-ALL -------- */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}
