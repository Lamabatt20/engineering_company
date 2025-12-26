import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

import logo from "../assets/images/logo-placeholder.jpg";
import globeIcon from "../assets/icons/icons8-global-language-50.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState("en");

  return (
    <>
      <nav className="navbar">
       
        <div className="menu-icon" onClick={() => setMenuOpen(true)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        
        <div className="navbar-logo">
          <img src={logo} alt="Company Logo" />
        </div>

       
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/mechanical">Mechanical Designs</Link></li>
          <li><Link to="/embedded">Embedded Designs</Link></li>
          <li><Link to="/careers">Careers</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
        </ul>

        {/* Language */}
        <div className="language-selector">
          <img src={globeIcon} alt="Language" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">EN</option>
            <option value="ar">AR</option>
          </select>
        </div>
      </nav>

     
      <div
        className={`overlay ${menuOpen ? "show" : ""}`}
        onClick={() => setMenuOpen(false)}
      ></div>

      
      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
        <span className="close-btn" onClick={() => setMenuOpen(false)}>×</span>
        <ul>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link></li>
          <li><Link to="/mechanical" onClick={() => setMenuOpen(false)}>Mechanical Designs</Link></li>
          <li><Link to="/embedded" onClick={() => setMenuOpen(false)}>Embedded Designs</Link></li>
          <li><Link to="/careers" onClick={() => setMenuOpen(false)}>Careers</Link></li>
          <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link></li>
        </ul>
      </aside>
    </>
  );
}

export default Navbar;
