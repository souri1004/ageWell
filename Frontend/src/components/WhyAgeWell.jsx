import React from "react";
import "./WhyAgeWell.css";

const WhyAgeWell = () => {
  return (
    <section className="why-peepal" id="why-peepal">
      <div className="why-peepal-container">
        <h2>Why Peepal ?</h2>
        <p className="problem-statement">
          India faces an eldercare crisis. Traditional solutions are expensive,
          unreliable, and don't address the growing needs of our aging
          population.
        </p>
        <div className="challenges">
          <div className="challenge-card">
            <div className="challenge-icon">👥</div>
            <h3>Family Stress</h3>
            <p>Balancing work and caregiving is tough.</p>
          </div>
          <div className="challenge-card">
            <div className="challenge-icon">✈️</div>
            <h3>Distance</h3>
            <p>Families are often far from their loved ones.</p>
          </div>
          <div className="challenge-card">
            <div className="challenge-icon">🏥</div>
            <h3>Medical Needs</h3>
            <p>Seniors need comprehensive medical support.</p>
          </div>
        </div>
        <div className="solution-banner">
          <div className="heart-icon">❤️</div>
          <span>AgeWell addresses these challenges with AI + Human care.</span>
        </div>
      </div>
    </section>
  );
};

export default WhyAgeWell;
