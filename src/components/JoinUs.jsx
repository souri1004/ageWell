import React, { useState } from "react";
import "./JoinUs.css";

const JoinUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    profession: "",
    experience: "",
    location: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Professional form submitted:", formData);
    alert(
      "Thank you for your interest! We'll contact you soon to discuss joining our team."
    );
  };

  return (
    <section className="join-us-section" id="join-us">
      <div className="container">
        <h2>Join Our Healthcare Team</h2>
        <p className="join-subtitle">
          Be part of a revolutionary eldercare platform that combines technology
          with human compassion.
        </p>

        <div className="professions-grid">
          <div className="profession-card">
            <div className="profession-icon">👨‍⚕️</div>
            <h3>Doctors</h3>
            <p>
              Provide expert medical consultations and care plans for seniors
            </p>
          </div>
          <div className="profession-card">
            <div className="profession-icon">👩‍⚕️</div>
            <h3>Nurses</h3>
            <p>Deliver compassionate nursing care and health monitoring</p>
          </div>
          <div className="profession-card">
            <div className="profession-icon">🏃‍♂️</div>
            <h3>Physiotherapists</h3>
            <p>Help seniors maintain mobility and physical well-being</p>
          </div>
          <div className="profession-card">
            <div className="profession-icon">🧠</div>
            <h3>Psychologists</h3>
            <p>Provide mental health support and emotional well-being</p>
          </div>
        </div>

        <div className="join-form-container">
          <h3>Apply to Join Our Team</h3>
          <form onSubmit={handleSubmit} className="join-form">
            <div className="form-row">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleInputChange}
                required
              />
              <select
                name="profession"
                value={formData.profession}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Your Profession</option>
                <option value="doctor">Doctor</option>
                <option value="nurse">Nurse</option>
                <option value="physiotherapist">Physiotherapist</option>
                <option value="psychologist">Psychologist</option>
              </select>
            </div>
            <div className="form-row">
              <input
                type="text"
                name="experience"
                placeholder="Years of Experience"
                value={formData.experience}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="location"
                placeholder="City/Location"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="btn-gradient">
              Apply Now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default JoinUs;
