import React from "react";
import Hero from "../components/Hero";
import WhyAgeWell from "../components/WhyAgeWell";
import Features from "../components/Features";
import AIHumanSection from "../components/AIHumanSection";
import ForSeniors from "../components/ForSeniors";
import JoinUs from "../components/JoinUs";
import FAQ from "../components/FAQ";



const LandingPage = () => {
  return (
    <main>
      <section id="hero">
        <Hero />
      </section>

      <section id="why-agewell">
        <WhyAgeWell />
      </section>

      <section id="for-seniors">
        <ForSeniors />
      </section>

      <section id="features">
        <Features />
      </section>

      <section id="ai-human">
        <AIHumanSection />
      </section>

      

      <section id="join-us">
        <JoinUs />
      </section>

      <section id="faq">
        <FAQ />
      </section>

    </main>
  );
};

export default LandingPage;
