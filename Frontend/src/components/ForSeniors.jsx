import React, { useState } from "react";
import "./ForSeniors.css";

const ForSeniors = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState("seniors");
  const tabMeta = {
    seniors: {
      icon: "👤",
      title: "For Seniors",
      subtitle: "Simple, caring, always available",
    },
    family: {
      icon: "👥",
      title: "For Family",
      subtitle: "Stay connected, stay informed",
    },
    staff: {
      icon: "🩺",
      title: "For Care Staff",
      subtitle: "Tools to deliver better care",
    },
  };

  const renderCards = () => {
    if (activeTab === "seniors") {
      return (
        <>
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
        </>
      );
    }
    if (activeTab === "family") {
      return (
        <>
          <div className="interface-card">
            <div className="interface-icon">📊</div>
            <div className="interface-content">
              <h4>Health Dashboard</h4>
              <p>Real-time metrics and trends</p>
            </div>
          </div>
          <div className="interface-card">
            <div className="interface-icon">🗓️</div>
            <div className="interface-content">
              <h4>Care Schedule</h4>
              <p>Upcoming visits and appointments</p>
            </div>
          </div>
          <div className="interface-card">
            <div className="interface-icon">🔔</div>
            <div className="interface-content">
              <h4>Instant Alerts</h4>
              <p>Notifications for any concerns</p>
            </div>
          </div>
        </>
      );
    }
    return (
      <>
        <div className="interface-card">
          <div className="interface-icon">📝</div>
          <div className="interface-content">
            <h4>Patient Notes</h4>
            <p>Detailed care history and preferences</p>
          </div>
        </div>
        <div className="interface-card">
          <div className="interface-icon">📅</div>
          <div className="interface-content">
            <h4>Vitals Tracking</h4>
            <p>Monitor health metrics over time</p>
          </div>
        </div>
        <div className="interface-card">
          <div className="interface-icon">🤝</div>
          <div className="interface-content">
            <h4>Visit Tracker</h4>
            <p>Schedule and log care visits</p>
          </div>
        </div>
      </>
    );
  };

  return (
    <section className="for-seniors">
      <div className="tabs tabs-outside">
        <button
          className={`tab ${activeTab === "seniors" ? "active" : ""}`}
          onClick={() => setActiveTab("seniors")}
        >
          <span className="tab-icon">👤</span>
          <span>For Seniors</span>
        </button>
        <button
          className={`tab ${activeTab === "family" ? "active" : ""}`}
          onClick={() => setActiveTab("family")}
        >
          <span className="tab-icon">👥</span>
          <span>For Family</span>
        </button>
        <button
          className={`tab ${activeTab === "staff" ? "active" : ""}`}
          onClick={() => setActiveTab("staff")}
        >
          <span className="tab-icon">🩺</span>
          <span>For Care Staff</span>
        </button>
      </div>

      <div className="container">
        <div className="content-surface">
          <div className="section-header surface">
            <div className="header-icon">{tabMeta[activeTab].icon}</div>
            <h2>{tabMeta[activeTab].title}</h2>
            <p className="section-subtitle">{tabMeta[activeTab].subtitle}</p>
          </div>
          <div className="senior-interface">
            <div className="interface-cards">{renderCards()}</div>
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
      </div>
    </section>
  );
};

export default ForSeniors;
