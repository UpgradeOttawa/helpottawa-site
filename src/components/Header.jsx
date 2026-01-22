import React, { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-slate-900 text-white py-2 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <a href="tel:613-314-7926" className="hover:text-red-400">613-314-7926</a>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <a href="mailto:helpottawa@gmail.com" className="hover:text-red-400">helpottawa@gmail.com</a>
            </div>
          </div>
          <div className="text-xs text-slate-400">
            🇨🇦 Proudly serving Ottawa & Eastern Ontario
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <div className="text-3xl">🏠</div>
            <div>
              <div className="text-2xl font-bold text-slate-900">HelpOttawa</div>
              <div className="text-xs text-slate-500">Renovation Planning Made Easy</div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="relative group">
              <button className="text-slate-700 hover:text-red-600 font-medium flex items-center gap-1">
                Calculators
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="p-2">
                  <a href="/bathroom-calculator" className="block px-4 py-3 hover:bg-slate-50 rounded-lg">
                    <div className="font-semibold text-slate-900">🚿 Bathroom Renovation</div>
                    <div className="text-sm text-slate-500">Full bathroom cost calculator</div>
                  </a>
                  <a href="/bathroom-designer" className="block px-4 py-3 hover:bg-slate-50 rounded-lg">
                    <div className="font-semibold text-slate-900">📐 Bathroom Designer</div>
                    <div className="text-sm text-slate-500">Visual floor planner</div>
                  </a>
                  <div className="px-4 py-3 opacity-50">
                    <div className="font-semibold text-slate-900">🍳 Kitchen (Coming Soon)</div>
                    <div className="text-sm text-slate-500">Full kitchen calculator</div>
                  </div>
                </div>
              </div>
            </div>
            
            <a href="/hazard-map" className="text-slate-700 hover:text-red-600 font-medium">
              Hazard Map
            </a>
            
            <a href="/contractors" className="text-slate-700 hover:text-red-600 font-medium">
              Find Contractors
            </a>
            
            <a href="/about" className="text-slate-700 hover:text-red-600 font-medium">
              About
            </a>

            <a 
              href="/bathroom-calculator" 
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
            >
              Get Started Free
            </a>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-slate-900" />
            ) : (
              <Menu className="w-6 h-6 text-slate-900" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-slate-200 pt-4">
            <div className="space-y-2">
              <a href="/bathroom-calculator" className="block px-4 py-3 hover:bg-slate-50 rounded-lg font-medium">
                🚿 Bathroom Calculator
              </a>
              <a href="/bathroom-designer" className="block px-4 py-3 hover:bg-slate-50 rounded-lg font-medium">
                📐 Bathroom Designer
              </a>
              <a href="/hazard-map" className="block px-4 py-3 hover:bg-slate-50 rounded-lg font-medium">
                Hazard Map
              </a>
              <a href="/contractors" className="block px-4 py-3 hover:bg-slate-50 rounded-lg font-medium">
                Find Contractors
              </a>
              <a href="/about" className="block px-4 py-3 hover:bg-slate-50 rounded-lg font-medium">
                About
              </a>
              <a 
                href="/bathroom-calculator" 
                className="block px-4 py-3 bg-red-600 text-white rounded-lg font-semibold text-center"
              >
                Get Started Free
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
