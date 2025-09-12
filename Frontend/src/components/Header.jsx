import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import logoImage from "../assets/logoElder.png";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll helper
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle navigation + scroll
  const handleScroll = (e, sectionId) => {
    e.preventDefault();
    if (location.pathname === "/") {
      scrollToSection(sectionId);
    } else {
      navigate("/");
      // Use a longer timeout and check if element exists
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          scrollToSection(sectionId);
        }
      }, 300);
    }
  };

  // Handle logo click
  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-container ">
        {/* Logo */}
        <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <img 
            src={logoImage} 
            alt="AgeWell Logo" 
            className="logo-image"
            onError={(e) => {
              // Fallback if image fails to load
              e.target.style.display = 'none';
            }}
          />
          <span>Peepal</span>
        </div>

        {/* Navigation */}
        <nav className="nav">
          <button 
            onClick={(e) => handleScroll(e, "features")}
          >
            Features
          </button>

          {/* Separate Page for Plans */}
          <NavLink
            to="/plans"
            className={({ isActive }) => (isActive ? "active-link" : "nav-link")}
          >
            Plans
          </NavLink>

          <button 
            className="nav-button"
            onClick={(e) => handleScroll(e, "why-agewell")}
          >
            Why AgeWell
          </button>

          <button 
            className="nav-button"
            onClick={(e) => handleScroll(e, "faq")}
          >
            FAQ
          </button>

          {/* Admin Separate Page */}
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              isActive ? "admin-link" : "nav-link admin-link"
            }
          >
            Admin
          </NavLink>
        </nav>

        {/* Buttons */}
        <div className="header-buttons">
          <button className="btn-outline">Coming Soon</button>
          <button 
            className="btn-primary"
            onClick={(e) => handleScroll(e, "join-us")}
          >
            Join Us
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;