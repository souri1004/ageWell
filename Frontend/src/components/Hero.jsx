import React, { useEffect, useRef, useState } from "react";
import "./Hero.css";
import eldercareImage from "../assets/eldercare2.png";

const Hero = () => {
  const imageRef = useRef(null);
  const [imageVisible, setImageVisible] = useState(false);

  useEffect(() => {
    // Reveal hero image on scroll (primarily for mobile)
    const target = imageRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageVisible(true);
            observer.disconnect();
          }
        });
      },
      { root: null, threshold: 0.15 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigateToPlans = () => {
    window.location.href = "/plans.html";
  };

  return (
    <section className="hero">
      <div>
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              <div>
                Caring for
                <span className="highlight-text"> Seniors,</span>
              </div>
              <div>
                <span className="highlight-text">Powered</span> by{" "}
                <span className="highlight-text">AI</span> &{" "}
              </div>
              <div>
                <span className="highlight-text">Compassion</span>
              </div>
            </h1>
            <p>
              Comprehensive eldercare starting at just{" "}
              <span className="price-highlight">₹4,999/month</span>. Give your
              loved ones the care they deserve with our blend of technology and
              human touch.
            </p>

            {/* Statistics Section - Replacing the bullet points */}
            <div className="hero-stats">
              <div className="stat-block">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Support Available</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-block">
                <div className="stat-number">15+</div>
                <div className="stat-label">Languages</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-block">
                <div className="stat-number">HIPAA</div>
                <div className="stat-label">Grade Security</div>
              </div>
            </div>

            <div className="hero-buttons">
              <button className="btn-gradient" onClick={navigateToPlans}>
                Get Started
              </button>
              <button className="btn-outline">
                <span className="play-icon">▶</span>
                Watch Demo
              </button>
            </div>
          </div>
          <div className="hero-image" ref={imageRef}>
            <div className={`tilted-frame ${imageVisible ? "visible" : ""}`}>
              <div className="tilted-badge top-left">
                <span>24/7 Support</span>
              </div>
              <div className="tilted-badge bottom-right">
                <span>AI Powered Care</span>
              </div>
              <div className="tilted-inner">
                <img
                  src={eldercareImage}
                  alt="Eldercare"
                  className="tilted-img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
