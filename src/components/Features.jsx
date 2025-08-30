import React from "react";
import "./Features.css";

const Features = () => {
  const features = [
    {
      icon: "💬",
      title: "Daily AI Check-ins",
      description:
        "Personalized daily conversations to monitor health, mood, and well-being with our AI companion.",
    },
    {
      icon: "💊",
      title: "Medication Reminders",
      description:
        "Smart medication tracking with voice and visual reminders, ensuring no doses are missed.",
    },
    {
      icon: "👨‍⚕️",
      title: "Professional Visits",
      description:
        "Scheduled nurse, physio, and doctor visits at home based on individual care plans.",
    },
    {
      icon: "🚨",
      title: "24/7 SOS Support",
      description:
        "Instant emergency response system with one-touch access to medical professionals.",
    },
    {
      icon: "📊",
      title: "Family Dashboard",
      description:
        "Real-time insights for family members to stay connected with their loved one's care.",
    },
    {
      icon: "🤖",
      title: "AI Companion",
      description:
        "Engaging conversations, health monitoring, and emotional support through advanced AI.",
    },
  ];

  return (
    <section className="features-grid" id="features">
      <div className="container">
        <div className="features-wrapper">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
