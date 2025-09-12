// src/pages/PlansPage.jsx
import "./PricingPlans.css";
import BetaProgram from "../components/BetaProgram";

function PricingPlans() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for joining our beta program! We'll be in touch soon.");
  };

  return (
    <div className="plans-page">
      {/* Hero Section */}
      <section className="plans-hero">
        <div className="container">
          <div className="plans-hero-content">
            <h1>Choose Your Care Plan</h1>
            <p className="plans-subtitle">
              Our comprehensive platform combines AI technology with human
              compassion to provide complete eldercare solutions under one roof.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section">
        <div className="container">
          <div className="pricing-grid">
            {/* Basic Plan */}
            <div className="pricing-card">
              <div className="plan-header">
                <h3>Basic Plan</h3>
                <div className="plan-price">₹4,999</div>
                <div className="plan-period">/month</div>
              </div>
              <div className="plan-features">
                <div className="feature-row">
                  <div className="feature-text">Doctor Consultations</div>
                  <div className="feature-value">2/month (1 home + 1 tele)</div>
                </div>
                <div className="feature-row">
                  <div className="feature-text">Nurse Visits</div>
                  <div className="feature-value">4/month (weekly)</div>
                </div>
                <div className="feature-row">
                  <div className="feature-text">Physiotherapy Sessions</div>
                  <div className="feature-value">4/month (weekly)</div>
                </div>
                <div className="feature-row">
                  <div className="feature-text">
                    Psychology Sessions + Tele-support
                  </div>
                  <div className="feature-value">2/month + on-demand</div>
                </div>
                <div className="feature-row">
                  <div className="feature-text">AI Daily Monitoring</div>
                  <div className="feature-value">Basic monitoring + alerts</div>
                </div>
                <div className="feature-row">
                  <div className="feature-text">Emergency Assistance</div>
                  <div className="feature-value">24/7 AI-powered</div>
                </div>
                <div className="feature-row">
                  <div className="feature-text">Social Engagement</div>
                  <div className="feature-value">Daily AI + weekly group</div>
                </div>
                <div className="feature-row">
                  <div className="feature-text">
                    Family Dashboard & Medication Management
                  </div>
                  <div className="feature-value">Included</div>
                </div>
                <div className="feature-row">
                  <div className="feature-text">Personalized Wellness Coaching</div>
                  <div className="feature-value">Yes</div>
                </div>
                <div className="feature-row">
                  <div className="feature-text">Health Outcome Reporting</div>
                  <div className="feature-value">Monthly</div>
                </div>
              </div>
              <button className="btn-primary">Coming Soon</button>
              <p className="plan-note">
                Monthly available with 1-year commitment.
              </p>
            </div>

            {/* Advanced Plan */}
            <div className="pricing-card featured">
              <div className="plan-header">
                <h3>Advanced Plan</h3>
                <div className="plan-price">₹7,999</div>
                <div className="plan-period">/month</div>
              </div>
              <div className="plan-features">
                <div className="feature-row">
                  <div className="feature-text">Doctor Consultations</div>
                  <div className="feature-value">3/month (2 home + 1 tele)</div>
                </div>
                <div className="feature-row">
                  <div className="feature-text">Nurse Visits</div>
                  <div className="feature-value">6/month (1.5 per week)</div>
                </div>
                <div className="feature-row">
                  <div className="feature-text">Physiotherapy Sessions</div>
                  <div className="feature-value">8/month (2 per week)</div>
                </div>
                <div className="feature-row">
                  <div className="feature-text">
                    Psychology Sessions + Tele-support
                  </div>
                  <div className="feature-value">4/month + on-demand</div>
                </div>
                <div className="feature-row">
                  <div className="feature-text">AI Daily Monitoring</div>
                  <div className="feature-value">
                    Enhanced monitoring + predictive
                  </div>
                </div>
                <div className="feature-row">
                  <div className="feature-text">Emergency Assistance</div>
                  <div className="feature-value">24/7 + priority response</div>
                </div>
                <div className="feature-row">
                  <div className="feature-text">Social Engagement</div>
                  <div className="feature-value">
                    Daily AI + weekly + fortnightly community events
                  </div>
                </div>
                <div className="feature-row">
                  <div className="feature-text">
                    Family Dashboard & Medication Management
                  </div>
                  <div className="feature-value">Included</div>
                </div>
                <div className="feature-row">
                  <div className="feature-text">Personalized Wellness Coaching</div>
                  <div className="feature-value">Yes</div>
                </div>
                <div className="feature-row">
                  <div className="feature-text">Health Outcome Reporting</div>
                  <div className="feature-value">
                    Monthly + quarterly care reviews
                  </div>
                </div>
              </div>
              <button className="btn-primary">Coming Soon</button>
              <p className="plan-note">
                Monthly available with 1-year commitment.
              </p>
            </div>

            {/* Premium Plus Plan */}
            <div className="pricing-card">
              <div className="plan-header">
                <h3>Premium Plus Plan</h3>
                <div className="plan-price">₹12,999</div>
                <div className="plan-period">/month</div>
              </div>
              <div className="plan-features">
                <div className="feature-row">
                  <div className="feature-text">Doctor Consultations</div>
                  <div className="feature-value">5/month (3 home + 2 tele)</div>
                </div>
                <div className="feature-row">
                  <div className="feature-text">Nurse Visits</div>
                  <div className="feature-value">10/month (3 per week)</div>
                </div>
                <div className="feature-row">
                  <div className="feature-text">Physiotherapy Sessions</div>
                  <div className="feature-value">15/month (5 per week)</div>
                </div>
                <div className="feature-row">
                  <div className="feature-text">
                    Psychology Sessions + Tele-support
                  </div>
                  <div className="feature-value">8/month + on-demand</div>
                </div>
                <div className="feature-row">
                  <div className="feature-text">AI Daily Monitoring</div>
                  <div className="feature-value">
                    Advanced personalized risk plans
                  </div>
                </div>
                <div className="feature-row">
                  <div className="feature-text">Emergency Assistance</div>
                  <div className="feature-value">24/7 VIP priority access</div>
                </div>
                <div className="feature-row">
                  <div className="feature-text">Social Engagement</div>
                  <div className="feature-value">
                    Daily AI + weekly + social outings
                  </div>
                </div>
                <div className="feature-row">
                  <div className="feature-text">
                    Family Dashboard & Medication Management
                  </div>
                  <div className="feature-value">Included</div>
                </div>
                <div className="feature-row">
                  <div className="feature-text">Personalized Wellness Coaching</div>
                  <div className="feature-value">
                    Yes + customized fitness/nutrition
                  </div>
                </div>
                <div className="feature-row">
                  <div className="feature-text">Health Outcome Reporting</div>
                  <div className="feature-value">
                    Monthly + monthly care plan revisions
                  </div>
                </div>
              </div>
              <button className="btn-primary">Coming Soon</button>
              <p className="plan-note">
                Monthly available with 1-year commitment.
              </p>
            </div>
          </div>
        </div>
      </section>
      <BetaProgram />
    </div>

    
    
  );
}

export default PricingPlans;
