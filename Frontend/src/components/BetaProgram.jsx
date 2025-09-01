import React, { useState } from "react";
import "./BetaProgram.css";

const BetaProgram = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('http://localhost:5000/api/beta-users/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ 
          type: 'success', 
          text: 'Successfully joined our beta program! We\'ll be in touch soon with exclusive updates and early access.' 
        });
        
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          mobile: "",
        });
        
      } else {
        setMessage({ 
          type: 'error', 
          text: result.message || 'Failed to join beta program. Please try again.' 
        });
      }
    } catch (error) {
      console.error('Error joining beta program:', error);
      setMessage({ 
        type: 'error', 
        text: 'Network error. Please check your connection and try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="beta-program" id="beta-program">
      <div className="container">
        <h2>Join Our Beta Program</h2>
        <p>
          Sign up today and be the first to experience revolutionary elderly
          care powered by AI.
        </p>
        
        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}
        
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
          <button 
            type="submit" 
            className="btn-purple"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Joining...' : 'NOTIFY ME'}
          </button>
        </form>
        
        <div className="beta-benefits">
          <h3>Beta Program Benefits</h3>
          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon">🚀</div>
              <h4>Early Access</h4>
              <p>Be among the first to try our revolutionary features</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">💬</div>
              <h4>Direct Feedback</h4>
              <p>Help shape the future of eldercare technology</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🎁</div>
              <h4>Exclusive Perks</h4>
              <p>Special discounts and premium features</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BetaProgram;
