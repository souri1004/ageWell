import React from "react";
import "./Hero.css";
import eldercareImage from "../assets/eldercare2.png";

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              Caring for{" "}
              <span className="highlight-text">Seniors, Powered</span> by{" "}
              <span className="highlight-text">AI</span> &{" "}
              <span className="highlight-text">Compassion</span>
            </h1>
            <p>
              Comprehensive eldercare starting at just{" "}
              <span className="price-highlight">₹4,999/month</span>. Give your
              loved ones the care they deserve with our blend of technology and
              human touch.
            </p>
            <div className="hero-features">
              <div className="feature-item">
                <div className="feature-bullet">•</div>
                <span>24/7 Support</span>
              </div>
              <div className="feature-item">
                <div className="feature-bullet">•</div>
                <span>HIPAA-grade Privacy</span>
              </div>
              <div className="feature-item">
                <div className="feature-bullet">•</div>
                <span>Multilingual</span>
              </div>
            </div>
            <div className="hero-buttons">
              <button
                className="btn-gradient"
                onClick={() => scrollToSection("beta-program")}
              >
                Get Started
              </button>
              <button className="btn-outline">
                <span className="play-icon">▶</span>
                Watch Demo
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="image-container">
              <div className="eldercare-image">
                <img
                  src={eldercareImage}
                  alt="Eldercare"
                  className="eldercare-img"
                />
                <div className="image-overlay-top">
                  <span>AI-Powered Care</span>
                </div>
                <div className="image-overlay-bottom">
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
