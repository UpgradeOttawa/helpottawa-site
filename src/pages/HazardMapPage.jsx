import React from 'react';
import { AlertTriangle, MapPin, Shield, CheckCircle } from 'lucide-react';

const HazardMapPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-red-900 to-red-800 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <AlertTriangle className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-6">Eastern Ontario Hazard Map</h1>
          <p className="text-xl text-red-100">
            Check for asbestos, lead paint, radon, and mold before you start any renovation
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">⚠️ Important Notice</h2>
            <p className="text-slate-700">
              The hazard map integration is currently being finalized. In the meantime, please contact us to check your specific address for hazard risks.
            </p>
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
              Want to Check Your Address?
            </h3>
            <p className="text-slate-700 text-center mb-6">
              Contact us with your postal code and we'll provide a hazard risk assessment for free.
            </p>
            <div className="text-center">
              <a 
                href="/contact" 
                className="inline-block px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-lg transition-colors"
              >
                Request Hazard Check
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HazardMapPage;
