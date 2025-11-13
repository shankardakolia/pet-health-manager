import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import { FaBars, FaHome, FaHeart, FaCog, FaSignOutAlt } from "react-icons/fa";

const SIDEBAR_WIDTH = 240;
const MOBILE_BREAKPOINT = 850;

/* ──────────────────────  ROOT  ────────────────────── */
const AppShell = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(to bottom right, #fff7ed, #fff1e6, #ffeef0);
`;

/* ──────────────────────  SIDEBAR (desktop)  ────────────────────── */
const Sidebar = styled.aside`
  width: ${SIDEBAR_WIDTH}px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  border-right: 1px solid rgba(251, 146, 60, 0.5);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  box-shadow: 2px 0 14px rgba(250, 218, 202, 0.14);
  z-index: 1020;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    display: none;
  }
`;

/* Header inside sidebar */
const SidebarHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid rgba(251, 146, 60, 0.5);
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const LogoBox = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(to bottom right, #fb923c, #f43f5e);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(251, 146, 60, 0.3);
`;

const LogoTitle = styled.div`
  h2 {
    font-weight: 700;
    font-size: 1.125rem;
    color: #1f2937;
    margin: 0;
  }
  p {
    font-size: 0.75rem;
    color: #6b7280;
    margin: 0;
  }
`;

/* Navigation */
const NavList = styled.ul`
  list-style: none;
  padding: 0.75rem;
  margin: 0;
  flex: 1;
`;

const NavItem = styled.li`
  margin-bottom: 0.25rem;
`;

// Fixed: No TypeScript boolean type
const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  font-weight: 500;
  color: ${({ $active }) => ($active ? "#ea580c" : "#4b5563")};
  border-radius: 0.75rem;
  transition: all 0.2s;

  ${({ $active }) =>
    $active &&
    `
    background: linear-gradient(to right, #fff7ed, #fce7f3);
    box-shadow: 0 1px 4px rgba(251, 146, 60, 0.2);
  `}

  &:hover {
    background: #fed7aa;
    color: #ea580c;
  }
`;

/* Footer (Logout) */
const SidebarFooter = styled.div`
  padding: 1rem;
  border-top: 1px solid rgba(251, 146, 60, 0.5);
`;

const LogoutBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  font-weight: 500;
  color: #6b7280;
  background: none;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #fee2e2;
    color: #dc2626;
  }
`;

/* ──────────────────────  MOBILE HAMBURGER  ────────────────────── */
const Hamburger = styled.button`
  display: none;
  position: fixed;
  left: 1.125rem;
  top: 1.125rem;
  background: #fff7f0;
  border: none;
  width: 3rem;
  height: 3rem;
  border-radius: 1.125rem;
  font-size: 2.1rem;
  color: #ff7c23;
  box-shadow: 0 1px 8px rgba(255, 213, 182, 0.32);
  z-index: 1300;
  cursor: pointer;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

/* ──────────────────────  DRAWER (mobile)  ────────────────────── */
// Fixed: No boolean type
const DrawerOverlay = styled.div`
  display: ${({ $show }) => ($show ? "block" : "none")};
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.15);
  z-index: 1100;
`;

const Drawer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 82vw;
  max-width: 290px;
  height: 100vh;
  background: #fff;
  box-shadow: 2px 0 38px rgba(253, 151, 24, 0.17);
  z-index: 1200;
  transform: ${({ $show }) => ($show ? "translateX(0)" : "translateX(-120%)")};
  transition: transform 0.22s ease-in-out;
  display: flex;
  flex-direction: column;

  @media (min-width: ${MOBILE_BREAKPOINT + 1}px) {
    display: none;
  }
`;

/* ──────────────────────  MAIN CONTENT  ────────────────────── */
const Main = styled.main`
  flex: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: transparent;
`;

/* Mobile header */
const MobileHeader = styled.header`
  display: none;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(251, 146, 60, 0.5);
  padding: 1rem 1.5rem;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

const MobileLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  h1 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1f2937;
  }
`;

/* ──────────────────────  NAVIGATION DATA  ────────────────────── */
const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: FaHome },
  { title: "My Pets", url: "/pets", icon: FaHeart },
  { title: "Settings", url: "/settings", icon: FaCog },
];

/* ──────────────────────  LAYOUT COMPONENT  ────────────────────── */
export default function Layout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  const isActive = (path) => location.pathname === path;

  return (
    <AppShell>
      {/* Hamburger */}
      <Hamburger onClick={openDrawer} aria-label="Open menu">
        <FaBars />
      </Hamburger>

      {/* Desktop Sidebar */}
      <Sidebar>
        <SidebarHeader>
          <LogoBox>
            <FaHeart style={{ color: "white", fill: "white" }} />
          </LogoBox>
          <LogoTitle>
            <h2>Pet Health</h2>
            <p>Manager</p>
          </LogoTitle>
        </SidebarHeader>

        <NavList>
          {navItems.map((item) => (
            <NavItem key={item.title}>
              <NavLink to={item.url} $active={isActive(item.url)}>
                <item.icon />
                {item.title}
              </NavLink>
            </NavItem>
          ))}
        </NavList>

        <SidebarFooter>
          <LogoutBtn onClick={() => alert("Logout clicked")}>
            <FaSignOutAlt />
            Logout
          </LogoutBtn>
        </SidebarFooter>
      </Sidebar>

      {/* Mobile Drawer */}
      <DrawerOverlay $show={drawerOpen} onClick={closeDrawer} />
      <Drawer $show={drawerOpen}>
        <SidebarHeader>
          <LogoBox>
            <FaHeart style={{ color: "white", fill: "white" }} />
          </LogoBox>
          <LogoTitle>
            <h2>Pet Health</h2>
            <p>Manager</p>
          </LogoTitle>
        </SidebarHeader>

        <NavList>
          {navItems.map((item) => (
            <NavItem key={item.title}>
              <NavLink
                to={item.url}
                $active={isActive(item.url)}
                onClick={closeDrawer}
              >
                <item.icon />
                {item.title}
              </NavLink>
            </NavItem>
          ))}
        </NavList>

        <SidebarFooter>
          <LogoutBtn onClick={closeDrawer}>
            <FaSignOutAlt />
            Logout
          </LogoutBtn>
        </SidebarFooter>
      </Drawer>

      {/* Main Content */}
      <Main>
        <MobileHeader>
          <Hamburger onClick={openDrawer}>
            <FaBars />
          </Hamburger>
          <MobileLogo>
            <FaHeart style={{ color: "#fb923c", fill: "#fb923c" }} />
            <h1>Pet Health Manager</h1>
          </MobileLogo>
        </MobileHeader>

        <div style={{ flex: 1, overflow: "auto" }}>
          <Outlet />
        </div>
      </Main>
    </AppShell>
  );
}