import React from 'react';
import { AlertTriangle, MapPin, Shield, CheckCircle } from 'lucide-react';

const HazardMapPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-red-900 to-red-800 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <AlertTriangle className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-6">Eastern Ontario Hazard Map</h1>
          <p className="text-xl text-red-100 mb-8">
            Check for asbestos, lead paint, radon, and mold before you start any renovation
          </p>
          
          {/* BIG BUTTON TO OPEN MAP */}
          <a 
            href="/hazard-map/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-5 bg-white hover:bg-blue-50 text-red-900 rounded-lg font-bold text-xl transition-colors shadow-xl"
          >
            🗺️ Open Interactive Map
          </a>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-blue-50 border-2 border-blue-400 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">ℹ️ How to Use the Map</h2>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span><strong>Click regions</strong> to see detailed hazard information</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span><strong>Toggle hazard types</strong> (asbestos, lead, radon, mold)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span><strong>Color-coded regions</strong> show risk levels based on building era</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span><strong>Privacy-protected:</strong> No exact addresses stored</span>
              </li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Why Check for Hazards?</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-slate-50 p-8 rounded-xl">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Asbestos</h3>
              <p className="text-slate-700 mb-4">
                Common in homes built before 2000. Found in:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span className="text-slate-600">Floor tiles & adhesive</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span className="text-slate-600">Drywall joint compound</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span className="text-slate-600">Popcorn ceilings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span className="text-slate-600">Pipe insulation</span>
                </li>
              </ul>
              <p className="mt-4 text-sm text-red-600 font-semibold">
                Removal cost: $3,000-10,000+
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-xl">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Lead Paint</h3>
              <p className="text-slate-700 mb-4">
                Used in homes built before 1978. Especially dangerous during:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span className="text-slate-600">Sanding or scraping</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span className="text-slate-600">Demolition work</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span className="text-slate-600">Window replacement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span className="text-slate-600">Renovation projects</span>
                </li>
              </ul>
              <p className="mt-4 text-sm text-red-600 font-semibold">
                Abatement cost: $2,000-8,000+
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-xl">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Radon</h3>
              <p className="text-slate-700 mb-4">
                Radioactive gas that seeps from ground. Ottawa has higher radon levels than national average.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600">Test during basement work</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600">Mitigation system required if high</span>
                </li>
              </ul>
              <p className="mt-4 text-sm text-red-600 font-semibold">
                Mitigation cost: $1,500-3,500
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-xl">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Mold</h3>
              <p className="text-slate-700 mb-4">
                Common in bathrooms, basements, and areas with water damage.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600">Check behind tiles/walls</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600">Professional remediation needed</span>
                </li>
              </ul>
              <p className="mt-4 text-sm text-red-600 font-semibold">
                Remediation cost: $500-6,000+
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl p-8 border-2 border-blue-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-4 text-center">
              Need Professional Testing?
            </h3>
            <p className="text-slate-700 text-center mb-6">
              Contact us for a free hazard risk assessment and contractor referrals.
            </p>
            <div className="text-center space-x-4">
              <a 
                href="/hazard-map/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-lg transition-colors"
              >
                View Map
              </a>
              <a 
                href="/contact" 
                className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-lg transition-colors"
              >
                Request Assessment
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HazardMapPage;
