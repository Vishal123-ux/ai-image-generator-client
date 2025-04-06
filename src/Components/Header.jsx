import React from 'react';
import logo from '../../public/logo.png'; // Adjust if needed

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="AI Generator Logo" className="logo" />
      <h1 className="title">AI Image Generator</h1>
    </header>
  );
}

export default Header;
