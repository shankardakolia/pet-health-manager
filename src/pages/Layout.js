import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaHeart,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { resetAllState } from "../features/resetAll";
import { useDispatch } from "react-redux";

const SIDEBAR_WIDTH = 260;
const MOBILE_BREAKPOINT = 768;

// unified warm background color
const UI_BG = "#fafafa";

export default function Layout() {
  const navigate = useNavigate();

  const isMobileInitial =
    typeof window !== "undefined"
      ? window.innerWidth <= MOBILE_BREAKPOINT
      : false;

  const [isMobile, setIsMobile] = useState(isMobileInitial);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobileInitial);

  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth <= MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(resetAllState ());
    navigate("/login");
  };

  const navItems = [
    { title: "Dashboard", to: "/dashboard", icon: FaHome },
    { title: "My Pets", to: "/mypets", icon: FaHeart },
    { title: "Settings", to: "/settings", icon: FaCog },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* ─────────── SIDEBAR ─────────── */}
      <aside
        aria-hidden={!sidebarOpen && isMobile}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: SIDEBAR_WIDTH,
          height: "100vh",
          background: UI_BG,
          padding: "20px",
          boxSizing: "border-box",
          transform: isMobile
            ? sidebarOpen
              ? "translateX(0)"
              : `translateX(-${SIDEBAR_WIDTH}px)`
            : "translateX(0)",
          transition: "transform 0.25s ease",
          zIndex: 1100,
          boxShadow: "2px 0 20px rgba(0,0,0,0.12)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Logo + mobile close */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 20 }}>Pet Health</div>

          {isMobile && (
            <button
              onClick={() => setSidebarOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                fontSize: 22,
                cursor: "pointer",
              }}
            >
              <FaTimes />
            </button>
          )}
        </div>

        {/* Separator under title */}
        <div
          style={{
            height: 1,
            background: "rgba(0,0,0,0.15)",
            margin: "15px 0",
          }}
        />

        {/* Navigation */}
        <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {navItems.map((n) => {
            const Icon = n.icon;
            return (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => isMobile && setSidebarOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 12px",
                  borderRadius: 10,
                  textDecoration: "none",

                  // Selected state
                  background:
                    window.location.pathname === n.to
                      ? "#FF7043"
                      : "transparent",
                  color: window.location.pathname === n.to ? "#fff" : "#333",

                  fontWeight: 600,
                  transition: "0.15s background, 0.15s color",
                }}
                onMouseEnter={(e) => {
                  if (window.location.pathname !== n.to) {
                    e.currentTarget.style.background = "#FFE8CC"; // hover
                  }
                }}
                onMouseLeave={(e) => {
                  if (window.location.pathname !== n.to) {
                    e.currentTarget.style.background = "transparent"; // return to normal
                  }
                }}
              >
                <Icon />
                {n.title}
              </Link>
            );
          })}
        </nav>

        <div style={{ flex: 1 }} />

        {/* Logout */}
        <button
          onClick={logout}
          style={{
            width: "100%",
            padding: "12px",
            border: "none",
            borderRadius: 10,
            background: "#ef4444",
            color: "#fff",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          <FaSignOutAlt style={{ marginRight: 8 }} /> Logout
        </button>
      </aside>

      {/* ─────────── Overlay (Mobile) ─────────── */}
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
            zIndex: 1050,
          }}
        />
      )}

      {/* ─────────── MAIN CONTENT ─────────── */}
      <div
        style={{
          flex: 1,
          marginLeft: isMobile ? 0 : SIDEBAR_WIDTH,
          background: "#f7f8fa",
          minHeight: "100vh",
          padding: 0,
        }}
      >
        {/* Mobile hamburger inside content */}
        {isMobile && (
          <div
            style={{
              padding: "12px 12px 0 12px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <button
              onClick={() => setSidebarOpen(true)}
              style={{
                background: "#ffffff",
                border: "1px solid #ccc",
                width: 44,
                height: 44,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <FaBars />
            </button>
            {/* Title */}
            <div style={{ fontSize: 20, fontWeight: 700 }}>
              Pet Health Manager
            </div>
          </div>
        )}

        <main style={{ padding: 0, paddingBottom: 0 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
