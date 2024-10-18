import React from 'react';
import "../style/navbar.css";
import '../photos/images.jpeg'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo"><img src='images.jpeg' alt='HotelLogo'></img></div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About Us</a></li>
        <li><a href="/login" >Login</a></li>
        <li><a href="/signup">Sign Up</a></li>

      </ul>
    </nav>
  );
};

export default Navbar;