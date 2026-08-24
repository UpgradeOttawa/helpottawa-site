import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MaterialPicker from './MaterialPicker';
import BathroomCalculator from './BathroomCalculator';
import BathroomVisualDesigner from './BathroomVisualDesigner';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ContractorsPage from './pages/ContractorsPage';

function LegacyPage({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MaterialPicker />} />
        <Route path="/materials" element={<MaterialPicker />} />
        <Route path="/bathroom-calculator" element={<LegacyPage><BathroomCalculator /></LegacyPage>} />
        <Route path="/bathroom-designer" element={<LegacyPage><BathroomVisualDesigner /></LegacyPage>} />
        <Route path="/about" element={<LegacyPage><AboutPage /></LegacyPage>} />
        <Route path="/contact" element={<LegacyPage><ContactPage /></LegacyPage>} />
        <Route path="/contractors" element={<LegacyPage><ContractorsPage /></LegacyPage>} />
      </Routes>
    </Router>
  );
}

export default App;
