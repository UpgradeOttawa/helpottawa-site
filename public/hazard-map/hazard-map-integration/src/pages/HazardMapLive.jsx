import React from 'react';
import { AlertTriangle, MapPin, Shield, Info } from 'lucide-react';

const HazardMapLive = () => {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-900 via-red-800 to-orange-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-10 h-10" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">
                Eastern Ontario Hazard Map
              </h1>
              <p className="text-xl text-red-100 mt-2">
                Interactive heat map showing regional hazard risk levels
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mt-8">
            <div className="bg-red-950/50 backdrop-blur-sm rounded-lg p-4 border border-red-700/30">
              <div className="text-3xl mb-2">🏗️</div>
              <div className="font-bold">Asbestos</div>
              <div className="text-sm text-red-200">Pre-1986 buildings</div>
            </div>
            <div className="bg-red-950/50 backdrop-blur-sm rounded-lg p-4 border border-red-700/30">
              <div className="text-3xl mb-2">🎨</div>
              <div className="font-bold">Lead Paint</div>
              <div className="text-sm text-red-200">Pre-1978 homes</div>
            </div>
            <div className="bg-red-950/50 backdrop-blur-sm rounded-lg p-4 border border-red-700/30">
              <div className="text-3xl mb-2">☢️</div>
              <div className="font-bold">Radon</div>
              <div className="text-sm text-red-200">Ground seepage</div>
            </div>
            <div className="bg-red-950/50 backdrop-blur-sm rounded-lg p-4 border border-red-700/30">
              <div className="text-3xl mb-2">🦠</div>
              <div className="font-bold">Mold</div>
              <div className="text-sm text-red-200">Water damage areas</div>
            </div>
          </div>
        </div>
      </div>

      {/* Important Notice */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start gap-3">
            <Info className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-yellow-900 mb-2">
                Important: This Map Shows Risk Coefficients, Not Diagnoses
              </h3>
              <ul className="space-y-1 text-sm text-yellow-800">
                <li>• <strong>Higher intensity = higher caution</strong> - Always confirm with professional testing</li>
                <li>• <strong>Privacy-first design</strong> - No exact addresses stored, FSA-level aggregation only</li>
                <li>• <strong>Based on era and community data</strong> - Coefficients derived from building age and verified reports</li>
                <li>• <strong>Even new homes can have hazards</strong> - One-off materials, renovations, or legacy components</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Map */}
      <div className="relative">
        <iframe
          src="/hazard-map/index.html"
          className="w-full border-0"
          style={{ height: 'calc(100vh - 100px)' }}
          title="Eastern Ontario Hazard Map"
          allow="geolocation"
        />
      </div>

      {/* How to Use */}
      <div className="bg-slate-800 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            How to Use This Map
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-700 rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">1. Explore Regions</h3>
              <p className="text-slate-300">
                Click on map regions to see hazard coefficients. Higher values = higher caution needed.
              </p>
            </div>

            <div className="bg-slate-700 rounded-xl p-6">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">2. Check Your Area</h3>
              <p className="text-slate-300">
                Enter your postal code or address to see specific risk levels for your neighborhood.
              </p>
            </div>

            <div className="bg-slate-700 rounded-xl p-6">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">3. Get Professional Testing</h3>
              <p className="text-slate-300">
                High-risk areas? Contact verified abatement companies before starting any renovation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Color Legend */}
      <div className="bg-slate-900 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Risk Level Guide
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-full h-16 bg-green-500 rounded-lg mb-2"></div>
              <div className="font-bold text-white">Low Risk</div>
              <div className="text-sm text-slate-400">0-30%</div>
              <div className="text-xs text-slate-500 mt-1">Post-2000 construction</div>
            </div>

            <div className="text-center">
              <div className="w-full h-16 bg-yellow-500 rounded-lg mb-2"></div>
              <div className="font-bold text-white">Medium Risk</div>
              <div className="text-sm text-slate-400">30-50%</div>
              <div className="text-xs text-slate-500 mt-1">1980-2000 era</div>
            </div>

            <div className="text-center">
              <div className="w-full h-16 bg-orange-500 rounded-lg mb-2"></div>
              <div className="font-bold text-white">High Risk</div>
              <div className="text-sm text-slate-400">50-70%</div>
              <div className="text-xs text-slate-500 mt-1">1960-1980 era</div>
            </div>

            <div className="text-center">
              <div className="w-full h-16 bg-red-600 rounded-lg mb-2"></div>
              <div className="font-bold text-white">Very High Risk</div>
              <div className="text-sm text-slate-400">70-100%</div>
              <div className="text-xs text-slate-500 mt-1">Pre-1960 buildings</div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-slate-800 rounded-xl border border-slate-700">
            <h4 className="font-bold text-white mb-3">Understanding Risk Coefficients:</h4>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>• <strong>Coefficients are NOT predictions</strong> - They indicate likelihood based on building era and community data</li>
              <li>• <strong>Always test before disturbing materials</strong> - Even low-risk areas can have isolated hazards</li>
              <li>• <strong>Era-based baseline</strong> - Older buildings have higher baseline risk due to historical material usage</li>
              <li>• <strong>Community-verified data</strong> - Risk levels increase with verified hazard reports in the area</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-800 py-16 px-6">
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
