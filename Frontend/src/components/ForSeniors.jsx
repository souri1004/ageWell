import React, { useState } from "react";
import "./ForSeniors.css";

const ForSeniors = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="for-seniors">
      <div className="container">
        <h2>👤 For Seniors</h2>
        <p className="subtitle">Simple, caring, always available</p>
        <div className="senior-interface">
          <div className="interface-cards">
            <div className="interface-card">
              <div className="interface-icon">✅</div>
              <div className="interface-content">
                <h4>Daily Check-in</h4>
                <p>Simple daily health monitoring</p>
              </div>
            </div>
            <div className="interface-card">
              <div className="interface-icon">💊</div>
              <div className="interface-content">
                <h4>Medicine Reminder</h4>
                <p>Never miss your medications</p>
              </div>
            </div>
            <div className="interface-card">
              <div className="interface-icon">🚨</div>
              <div className="interface-content">
                <h4>SOS Button</h4>
                <p>Emergency help at your fingertips</p>
              </div>
            </div>
          </div>
          <div
            className="interface-preview"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="preview-icon">📱</div>
            <p>{isHovered ? "Coming Soon" : "Virtual App Preview"}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForSeniors;
