import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import logoImage from "../assets/logoElder.png";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  // Scroll helper
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle navigation + scroll (for anchors)
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
        <div
          className="logo"
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
        >
          <img
            src={logoImage}
            alt="AgeWell Logo"
            className="logo-image"
            onError={(e) => {
              // Fallback if image fails to load
              e.target.style.display = "none";
            }}
          />
          <span className="logoName">Peepal</span>
        </div>

        {/* Hamburger (visible on mobile) */}
        <button
          className="hamburger"
          aria-label={isDrawerOpen ? "Close menu" : "Open menu"}
          aria-expanded={isDrawerOpen}
          onClick={toggleDrawer}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation */}
        <nav className="nav">
          <a
            href="#features"
            className="nav-link"
            onClick={(e) => handleScroll(e, "features")}
          >
            Features
          </a>

          {/* Separate Page for Plans */}
          <NavLink
            to="/plans"
            className={({ isActive }) =>
              isActive ? "active-link" : "nav-link"
            }
          >
            Plans
          </NavLink>

          <a
            href="#why-agewell"
            className="nav-link"
            onClick={(e) => handleScroll(e, "why-agewell")}
          >
            Why Peepal
          </a>

          <a
            href="#faq"
            className="nav-link"
            onClick={(e) => handleScroll(e, "faq")}
          >
            FAQ
          </a>

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
          <a
            className="btn-outline"
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            Coming Soon
          </a>
          <a
            className="btn-primary"
            href="#join-us"
            onClick={(e) => handleScroll(e, "join-us")}
          >
            Join Us
          </a>
        </div>
      </div>

      {/* Backdrop */}
      <div
        className={`backdrop ${isDrawerOpen ? "show" : ""}`}
        onClick={closeDrawer}
      ></div>

      {/* Side Drawer */}
      <aside
        className={`side-drawer ${isDrawerOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="drawer-header">
          <div className="drawer-logo">
            <img src={logoImage} alt="AgeWell Logo" />
            <span>Peepal</span>
          </div>
          <button
            className="drawer-close"
            aria-label="Close menu"
            onClick={closeDrawer}
          >
            ×
          </button>
        </div>

        <div className="drawer-links">
          <a
            href="#features"
            className="nav-link"
            onClick={(e) => {
              handleScroll(e, "features");
              closeDrawer();
            }}
          >
            Features
          </a>
          <NavLink
            to="/plans"
            className={({ isActive }) =>
              isActive ? "active-link" : "nav-link"
            }
            onClick={closeDrawer}
          >
            Plans
          </NavLink>
          <a
            href="#why-agewell"
            className="nav-link"
            onClick={(e) => {
              handleScroll(e, "why-agewell");
              closeDrawer();
            }}
          >
            Why Peepal
          </a>
          <a
            href="#faq"
            className="nav-link"
            onClick={(e) => {
              handleScroll(e, "faq");
              closeDrawer();
            }}
          >
            FAQ
          </a>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              isActive ? "admin-link" : "nav-link admin-link"
            }
            onClick={closeDrawer}
          >
            Admin
          </NavLink>
        </div>

        <div className="drawer-actions">
          <a
            className="btn-outline"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              closeDrawer();
            }}
          >
            Coming Soon
          </a>
          <a
            className="btn-primary"
            href="#join-us"
            onClick={(e) => {
              handleScroll(e, "join-us");
              closeDrawer();
            }}
          >
            Join Us
          </a>
        </div>
      </aside>
    </header>
  );
};

export default Header;
