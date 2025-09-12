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
  const [resume, setResume] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      if (!allowedTypes.includes(file.type)) {
        setMessage({ type: 'error', text: 'Please select a valid file type (PDF, DOC, DOCX, or TXT)' });
        return;
      }
      
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'File size must be less than 5MB' });
        return;
      }
      
      setResume(file);
      setMessage({ type: 'success', text: 'Resume uploaded successfully!' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      const formDataToSend = new FormData();
      
      // Add form fields
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      
      // Add resume file if selected
      if (resume) {
        formDataToSend.append('resume', resume);
      }

      const response = await fetch('http://localhost:5000/api/team-applications/submit', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ 
          type: 'success', 
          text: 'Application submitted successfully! We\'ll contact you soon to discuss joining our team.' 
        });
        
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          mobile: "",
          profession: "",
          experience: "",
          location: "",
        });
        setResume(null);
        
        // Clear file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';
        
      } else {
        setMessage({ 
          type: 'error', 
          text: result.message || 'Failed to submit application. Please try again.' 
        });
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      setMessage({ 
        type: 'error', 
        text: 'Network error. Please check your connection and try again.' 
      });
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
          
          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
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
              <div className="file-upload-container">
                <label htmlFor="resume" className="file-upload-label">
                  📄 Upload Resume (Optional)
                  <span className="file-info">PDF, DOC, DOCX, or TXT (Max 5MB)</span>
                </label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileChange}
                  className="file-input"
                />
                {resume && (
                  <div className="file-selected">
                    ✓ {resume.name}
                  </div>
                )}
              </div>
            </div>
            
            <button 
              type="submit" 
              className="btn-gradient"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Apply Now'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default JoinUs;
