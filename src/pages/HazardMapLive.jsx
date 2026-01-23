import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';

const HazardMapLive = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-900 via-red-800 to-orange-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <AlertTriangle className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-4">Eastern Ontario Hazard Map</h1>
          <p className="text-xl text-red-100">
            Interactive regional risk assessment for Ottawa & surrounding areas
          </p>
        </div>
      </div>

      {/* Important Notice */}
      <div className="bg-yellow-50 border-b-4 border-yellow-400 p-6">
        <div className="max-w-6xl mx-auto flex items-start gap-3">
          <Info className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-bold text-yellow-900 mb-2">
              Important: This Map Shows Risk Coefficients, Not Diagnoses
            </h3>
            <ul className="space-y-1 text-sm text-yellow-800">
              <li>• <strong>Higher intensity = higher caution</strong> - Always confirm with professional testing</li>
              <li>• <strong>Privacy-first design</strong> - No exact addresses stored, FSA-level aggregation only</li>
              <li>• <strong>Based on era and community data</strong> - Coefficients from building age and verified reports</li>
              <li>• <strong>Even new homes can have hazards</strong> - One-off materials or legacy components possible</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Map iframe */}
      <div className="flex-1">
        <iframe
          src="/hazard-map/index.html"
          className="w-full border-0"
          style={{ height: 'calc(100vh - 200px)', minHeight: '600px' }}
          title="Eastern Ontario Hazard Map"
          allow="geolocation"
        />
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-800 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need Professional Hazard Assessment?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Connect with verified abatement and testing companies in Ottawa
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="/contractors"
              className="px-8 py-4 bg-white hover:bg-blue-50 text-blue-900 rounded-lg font-bold text-lg transition-colors"
            >
              Find Verified Contractors
            </a>
            <a 
              href="/contact"
              className="px-8 py-4 bg-blue-700 hover:bg-blue-600 text-white rounded-lg font-bold text-lg transition-colors"
            >
              Request Hazard Check
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HazardMapLive;
