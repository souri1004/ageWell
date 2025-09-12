import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import PricingPlans from "./Pages/PricingPlans";
import Admin from "./Pages/AdminLogin";
import AdminDashboard from "./Pages/AdminDashboard";
import ProtectedRoute from "./Pages/ProtectedRoute";
import LandingPage from "./Pages/LandingPage";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/plans" element={<PricingPlans />} />
          <Route path="/admin" element={<Admin />} />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
