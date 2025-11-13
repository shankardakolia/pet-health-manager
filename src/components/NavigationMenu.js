import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { FaHome, FaHeart, FaCog, FaSignOutAlt } from 'react-icons/fa';

const SideBar = styled.nav`
  width: 100%;
  background: #fff;
  padding: 2rem 0 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 100vh;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.35rem;
  font-weight: bold;
  color: #ff7550;
  margin: 0 0 2rem 28px;
  letter-spacing: 1.5px;
`;

const NavList = styled.div`
  flex: 1 1 auto;
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 13px 30px 13px 28px;
  color: #414141;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.09rem;
  gap: 16px;
  border-left: 4px solid transparent;
  transition: all 0.2s;
  border-radius: 8px 0 0 8px;
  margin-bottom: 6px;

  &:hover {
    background: #ffe2d4;
    color: #ff4901;
  }
  &.active {
    background: #ffefea;
    color: #ff4901;
    border-left: 4px solid #ff4901;
  }
`;

const LogoutBtn = styled.button`
  display: flex;
  align-items: center;
  background: #ffeee5;
  color: #e2560c;
  border: 2px solid #ffd9be;
  border-radius: 9px;
  font-size: 1.11rem;
  font-weight: 500;
  padding: 12px 0 12px 27px;
  margin: 18px 26px 2px 28px;
  gap: 17px;
  cursor: pointer;
  transition: background 0.13s, color 0.13s;
  &:hover {
    background: #ffb599;
    color: #872700;
  }
`;

export default function NavigationMenu({ onSelect }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login');
    if (onSelect) onSelect();
  };

  // Call onSelect on every navigation for mobile-drawer close
  const handleNav = () => { if (onSelect) onSelect(); };

  return (
    <SideBar>
      <Logo>
        <span style={{fontSize: '1.7em', marginRight: 10}}>💗</span>
        Pet Health
      </Logo>
      <NavList>
        <NavItem to="/dashboard" end onClick={handleNav}>
          <FaHome /> Dashboard
        </NavItem>
        <NavItem to="/mypets" onClick={handleNav}>
          <FaHeart /> My Pets
        </NavItem>
        <NavItem to="/settings" onClick={handleNav}>
          <FaCog /> Settings
        </NavItem>
      </NavList>
      <LogoutBtn onClick={handleLogout}>
        <FaSignOutAlt /> Logout
      </LogoutBtn>
    </SideBar>
  );
}
