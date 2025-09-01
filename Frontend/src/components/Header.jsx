import React from "react";
import "./Header.css";
import logoImage from "../assets/logoElder.png";

const Header = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openAdminPanel = () => {
    window.open('/admin.html', '_blank');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <img src={logoImage} alt="AgeWell Logo" className="logo-image" />
          <span>AgeWell</span>
        </div>
        <nav className="nav">
          <a
            href="#features"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("features");
            }}
          >
            Features
          </a>
          <a
            href="#plans"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("plans");
            }}
          >
            Plans
          </a>
          <a
            href="#why-agewell"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("why-agewell");
            }}
          >
            Why AgeWell
          </a>
          <a
            href="#faq"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("faq");
            }}
          >
            FAQ
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              openAdminPanel();
            }}
            className="admin-link"
          >
            Admin
          </a>
        </nav>
        <div className="header-buttons">
          <button className="btn-outline">Coming Soon</button>
          <button
            className="btn-primary"
            onClick={() => scrollToSection("join-us")}
          >
            Join Us
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
