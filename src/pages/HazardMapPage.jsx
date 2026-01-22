import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import BathroomCalculator from './BathroomCalculator';
import BathroomVisualDesigner from './BathroomVisualDesigner';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ContractorsPage from './pages/ContractorsPage';
import HazardMapPage from './pages/HazardMapPage';
import HazardMapLive from './pages/HazardMapLive'; // ← NEW: Added this line

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/bathroom-calculator" element={<BathroomCalculator />} />
            <Route path="/bathroom-designer" element={<BathroomVisualDesigner />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/contractors" element={<ContractorsPage />} />
            <Route path="/hazard-map" element={<HazardMapPage />} />
            <Route path="/hazard-map-live" element={<HazardMapLive />} /> {/* ← NEW: Added this line */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
