import React from "react";
import "./PricingPlans.css";

const PricingPlans = () => {
  const plans = [
    {
      name: "Basic Plan",
      price: "₹4,999",
      features: [
        { text: "Doctor Consultations", value: "2/month (1 home + 1 tele)" },
        { text: "Nurse Visits", value: "4/month (weekly)" },
        { text: "Physiotherapy Sessions", value: "4/month (weekly)" },
        {
          text: "Psychology Sessions + Tele-support",
          value: "2/month + on-demand",
        },
        { text: "AI Daily Monitoring", value: "Basic monitoring + alerts" },
        { text: "Emergency Assistance", value: "24/7 AI-powered" },
        { text: "Social Engagement", value: "Daily AI + weekly group" },
        { text: "Family Dashboard & Medication Management", value: "Included" },
        { text: "Personalized Wellness Coaching", value: "Yes" },
        { text: "Health Outcome Reporting", value: "Monthly" },
      ],
    },
    {
      name: "Advanced Plan",
      price: "₹7,999",
      features: [
        { text: "Doctor Consultations", value: "3/month (2 home + 1 tele)" },
        { text: "Nurse Visits", value: "6/month (1.5 per week)" },
        { text: "Physiotherapy Sessions", value: "8/month (2 per week)" },
        {
          text: "Psychology Sessions + Tele-support",
          value: "4/month + on-demand",
        },
        {
          text: "AI Daily Monitoring",
          value: "Enhanced monitoring + predictive",
        },
        { text: "Emergency Assistance", value: "24/7 + priority response" },
        {
          text: "Social Engagement",
          value: "Daily AI + weekly + fortnightly community events",
        },
        { text: "Family Dashboard & Medication Management", value: "Included" },
        { text: "Personalized Wellness Coaching", value: "Yes" },
        {
          text: "Health Outcome Reporting",
          value: "Monthly + quarterly care reviews",
        },
      ],
    },
    {
      name: "Premium Plus Plan",
      price: "₹12,999",
      features: [
        { text: "Doctor Consultations", value: "5/month (3 home + 2 tele)" },
        { text: "Nurse Visits", value: "10/month (3 per week)" },
        { text: "Physiotherapy Sessions", value: "15/month (5 per week)" },
        {
          text: "Psychology Sessions + Tele-support",
          value: "8/month + on-demand",
        },
        {
          text: "AI Daily Monitoring",
          value: "Advanced personalized risk plans",
        },
        { text: "Emergency Assistance", value: "24/7 VIP priority access" },
        {
          text: "Social Engagement",
          value: "Daily AI + weekly + social outings",
        },
        { text: "Family Dashboard & Medication Management", value: "Included" },
        {
          text: "Personalized Wellness Coaching",
          value: "Yes + customized fitness/nutrition",
        },
        {
          text: "Health Outcome Reporting",
          value: "Monthly + monthly care plan revisions",
        },
      ],
    },
  ];

  return (
    <section className="pricing-section" id="plans">
      <div className="container">
        <h2>Choose Your Care Plan</h2>
        <p className="pricing-subtitle">
          Our comprehensive platform combines AI technology with human
          compassion to provide complete eldercare solutions under one roof.
        </p>
        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card ${index === 1 ? "featured" : ""}`}
            >
              <div className="plan-header">
                <h3>{plan.name}</h3>
                <div className="plan-price">{plan.price}</div>
                <div className="plan-period">/month</div>
              </div>
              <div className="plan-features">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="feature-row">
                    <div className="feature-text">{feature.text}</div>
                    <div className="feature-value">{feature.value}</div>
                  </div>
                ))}
              </div>
              <button className="btn-primary">Coming Soon</button>
              <p className="plan-note">
                Monthly available with 1-year commitment.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
