import React from "react";
import "./Footer.css";
import logoImage from "../assets/logoElder.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="brand-left">
            <img className="brand-logo" src={logoImage} alt="Peepal Logo" />
            <span className="brand-name">Peepal</span>
          </div>
          <p className="brand-desc">
            Connecting families, empowering seniors, and providing peace of mind
            through compassionate technology solutions.
          </p>
          <div className="social-row">
            <a href="#" aria-label="Facebook" className="social-btn">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22.675 0h-21.35C.595 0 0 .595 0 1.325v21.351C0 23.405.595 24 1.325 24h11.494v-9.294H9.847V11.06h2.972V8.414c0-2.943 1.796-4.549 4.422-4.549 1.257 0 2.339.093 2.654.135v3.076h-1.821c-1.429 0-1.705.679-1.705 1.675v2.309h3.409l-.444 3.646h-2.965V24h5.813C23.405 24 24 23.405 24 22.676V1.325C24 .595 23.405 0 22.675 0z" />
              </svg>
            </a>
            <a href="#" aria-label="Twitter" className="social-btn">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M24 4.557a9.83 9.83 0 01-2.828.775A4.932 4.932 0 0023.337 3.1a9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-8.384 4.482A13.94 13.94 0 011.671 3.149a4.916 4.916 0 001.523 6.573 4.897 4.897 0 01-2.228-.616v.062a4.918 4.918 0 003.946 4.827 4.902 4.902 0 01-2.224.084 4.919 4.919 0 004.588 3.417A9.867 9.867 0 010 19.54 13.94 13.94 0 007.548 21.9c9.142 0 14.307-7.721 13.995-14.646A9.936 9.936 0 0024 4.557z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="social-btn">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.35 3.608 1.325.975.975 1.263 2.242 1.325 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.35 2.633-1.325 3.608-.975.975-2.242 1.263-3.608 1.325-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.35-3.608-1.325-.975-.975-1.263-2.242-1.325-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.35-2.633 1.325-3.608.975-.975 2.242-1.263 3.608-1.325C8.416 2.175 8.796 2.163 12 2.163zm0 1.837c-3.17 0-3.548.012-4.796.069-1.027.047-1.586.216-1.956.385-.492.191-.844.418-1.215.789-.371.371-.598.723-.789 1.215-.169.37-.338.929-.385 1.956-.057 1.248-.069 1.626-.069 4.796s.012 3.548.069 4.796c.047 1.027.216 1.586.385 1.956.191.492.418.844.789 1.215.371.371.723.598 1.215.789.37.169.929.338 1.956.385 1.248.057 1.626.069 4.796.069s3.548-.012 4.796-.069c1.027-.047 1.586-.216 1.956-.385.492-.191.844-.418 1.215-.789.371-.371.598-.723.789-1.215.169-.37.338-.929.385-1.956.057-1.248.069-1.626.069-4.796s-.012-3.548-.069-4.796c-.047-1.027-.216-1.586-.385-1.956-.191-.492-.418-.844-.789-1.215-.371-.371-.723-.598-1.215-.789-.37-.169-.929-.338-1.956-.385-1.248-.057-1.626-.069-4.796-.069zm0 3.89a5.946 5.946 0 110 11.892 5.946 5.946 0 010-11.892zm7.2-1.631a1.386 1.386 0 110 2.772 1.386 1.386 0 010-2.772z" />
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="social-btn">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.447 20.452H17.2v-5.569c0-1.328-.027-3.047-1.856-3.047-1.858 0-2.142 1.45-2.142 2.948v5.668H9.055V9h3.111v1.561h.044c.434-.822 1.494-1.69 3.074-1.69 3.291 0 3.897 2.167 3.897 4.989v6.592zM5.337 7.433a1.806 1.806 0 110-3.612 1.806 1.806 0 010 3.612zM6.956 20.452H3.716V9h3.24v11.452z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-grid">
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#Services">Services</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li>
                <a href="#terms">Terms & Conditions</a>
              </li>
              <li>
                <a href="#privacy">Privacy Policy</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Programs</h4>
            <ul>
              <li>
                <a href="#partner">Partner With Us</a>
              </li>
              <li>
                <a href="#join-us">Join Us</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>support@agewell.com</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
