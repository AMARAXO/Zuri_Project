"use client"

import React, { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <nav className="navbar">
        <div className="navbar-logo">
          <div className="navbar-logo-container">
           <img src='/images/starlogo.jpg' alt='logo' height={'50px'} width={'50px'} className="img"></img>
           <a href="/">BarbStarShow</a>
          </div>
        </div>
        <div className={`navbar-menu ${isOpen ? 'open' : ''}`} style={{
          zIndex: '999px'
        }}>
        <a href="/">Home</a>
          <a href="/cart">Cart</a>
          <a href="/auth/signin">Sign In</a>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </nav>
    );
  };
  
export default Navbar;
