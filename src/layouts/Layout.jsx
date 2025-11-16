import React, { useContext } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";
import "../styles/Layout.css";

export default function Layout() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // clears token + context
    navigate("/login"); // redirect to login
  };

  return (
    <div className="layout-container">
      <aside className="sidebar">
        <h2 className="logo">Pet Manager</h2>

        <nav>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/mypets">My Pets</Link>
          <Link to="/settings">Settings</Link>

          {/* 🔥 Logout Button */}
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </nav>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
