import React, { useState } from "react";
import "./BetaProgram.css";

const BetaProgram = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for joining our beta program! We'll be in touch soon.");
  };

  return (
    <section className="beta-program" id="beta-program">
      <div className="container">
        <h2>Join Our Beta Program</h2>
        <p>
          Sign up today and be the first to experience revolutionary elderly
          care powered by AI.
        </p>
        <form onSubmit={handleSubmit} className="signup-form">
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
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleInputChange}
            required
          />
          <button type="submit" className="btn-purple">
            NOTIFY ME
          </button>
        </form>
      </div>
    </section>
  );
};

export default BetaProgram;
