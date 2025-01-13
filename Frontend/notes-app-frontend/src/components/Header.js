import React from "react";
import "./Header.css";

const Header = ({ onLogout }) => {
  return (
    <header>
      <h1>Note Taking App</h1>
      <p>Securely manage your notes and audio recordings</p>
      <button onClick={onLogout}>Logout</button>
    </header>
  );
};

export default Header;
