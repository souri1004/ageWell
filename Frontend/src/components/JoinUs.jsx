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
    resume: "", // backend expects 'resume'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleProfessionSelect = (professionValue) => {
    setFormData((prev) => ({ ...prev, profession: professionValue }));
    const selectEl = document.querySelector('select[name="profession"]');
    if (selectEl) {
      selectEl.focus();
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch(
        "http://localhost:5000/api/team-applications/submit",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text: "Application submitted successfully! We'll contact you soon.",
        });
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          mobile: "",
          profession: "",
          experience: "",
          location: "",
          resume: "",
        });
      } else {
        // Display validation errors if present
        if (result.errors) {
          const errorText = result.errors
            .map((err) => `${err.field}: ${err.msg}`)
            .join(" | ");
          setMessage({ type: "error", text: errorText });
        } else {
          setMessage({
            type: "error",
            text: result.message || "Failed to submit application.",
          });
        }
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      setMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="join-us-section" id="join-us">
      <div className="">
        <h2>Join Our Healthcare Team</h2>
        <p className="join-subtitle">
          Be part of a revolutionary eldercare platform that combines technology
          with human compassion.
        </p>

        <div className="professions-grid">
          <div
            className="profession-card"
            onClick={() => handleProfessionSelect("doctor")}
            role="button"
            tabIndex={0}
          >
            <div className="profession-icon">👨‍⚕️</div>
            <h3>Doctors</h3>
            <p>
              Provide expert medical consultations and care plans for seniors
            </p>
          </div>
          <div
            className="profession-card"
            onClick={() => handleProfessionSelect("nurse")}
            role="button"
            tabIndex={0}
          >
            <div className="profession-icon">👩‍⚕️</div>
            <h3>Nurses</h3>
            <p>Deliver compassionate nursing care and health monitoring</p>
          </div>
          <div
            className="profession-card"
            onClick={() => handleProfessionSelect("physiotherapist")}
            role="button"
            tabIndex={0}
          >
            <div className="profession-icon">🏃‍♂️</div>
            <h3>Physiotherapists</h3>
            <p>Help seniors maintain mobility and physical well-being</p>
          </div>
          <div
            className="profession-card"
            onClick={() => handleProfessionSelect("psychologist")}
            role="button"
            tabIndex={0}
          >
            <div className="profession-icon">🧠</div>
            <h3>Psychologists</h3>
            <p>Provide mental health support and emotional well-being</p>
          </div>
        </div>

        <div className="join-form-container">
          <h3>Apply to Join Our Team</h3>

          {message.text && (
            <div className={`message ${message.type}`}>{message.text}</div>
          )}

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

            <div className="form-row">
              <input
                type="url"
                name="resume"
                placeholder="Resume Link (Google Drive, OneDrive, etc.)"
                value={formData.resume}
                onChange={handleInputChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn-gradient"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Apply Now"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default JoinUs;
