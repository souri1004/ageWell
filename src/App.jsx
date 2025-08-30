import React from "react";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import WhyAgeWell from "./components/WhyAgeWell";
import PricingPlans from "./components/PricingPlans";
import Features from "./components/Features";
import AIHumanSection from "./components/AIHumanSection";
import ForSeniors from "./components/ForSeniors";
import JoinUs from "./components/JoinUs";
import FAQ from "./components/FAQ";
import BetaProgram from "./components/BetaProgram";

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <WhyAgeWell />
      <ForSeniors />
      <PricingPlans />
      <Features />
      <AIHumanSection />
      
      <JoinUs />
      <FAQ />
      <BetaProgram />
    </div>
  );
}

export default App;
