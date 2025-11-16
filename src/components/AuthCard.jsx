import React from "react";
import "../styles/auth.css";

const AuthCard = ({ children, title, subtitle }) => {
  return (
    <div className="auth-card">
      <div className="auth-logo">
        <img src="/logo192.png" alt="logo" width="45" />
      </div>

      <h2>{title}</h2>
      <p>{subtitle}</p>

      {children}
    </div>
  );
};

export default AuthCard;
