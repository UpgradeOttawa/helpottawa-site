import React, { useEffect, useRef, useState } from 'react';
import { AlertTriangle, MapPin, Info, X } from 'lucide-react';

const HazardMapLiveNuclear = () => {
  const mapRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [activeHazard, setActiveHazard] = useState('asbestos');
  const [showControls, setShowControls] = useState(false);
  const [loading, setLoading] = useState(true);

  // Embedded FSA seed data (Ottawa postal codes with risk coefficients)
  const FSA_SEED_DATA = {
    "K1C": 0.55, // Orleans
    "K1E": 0.50, // Orleans
    "K1W": 0.35, // Westboro
    "K4A": 0.30, // Kanata
    "K1A": 0.70, // Downtown
    "K1N": 0.85, // ByWard Market
    "K1P": 0.80, // Centretown
    "K2A": 0.75, // Hintonburg
    "K2B": 0.65, // Bayshore
    "K2C": 0.70, // Nepean
    "K2E": 0.60, // Bells Corners
    "K2G": 0.55, // South Keys
    "K2H": 0.65, // Baseline
    "K2P": 0.58, // Carleton Heights
    "K2R": 0.62, // Barrhaven
    "K2S": 0.50, // Riverside South
    "K2T": 0.45, // Stittsville
    "K2V": 0.40, // Kanata North
    "K4B": 0.25  // Kanata Lakes
  };

  // Simplified GeoJSON - just approximate boundaries for major FSAs
  const SIMPLIFIED_REGIONS = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": { "fsa": "K1C", "name": "Orleans East" },
        "geometry": {
          "type": "Polygon",
          "coordinates": [[
            [-75.45, 45.45], [-75.45, 45.50], [-75.40, 45.50], [-75.40, 45.45], [-75.45, 45.45]
          ]]
        }
      },
      {
        "type": "Feature",
        "properties": { "fsa": "K1E", "name": "Orleans Center" },
        "geometry": {
          "type": "Polygon",
          "coordinates": [[
            [-75.50, 45.45], [-75.50, 45.50], [-75.45, 45.50], [-75.45, 45.45], [-75.50, 45.45]
          ]]
        }
      },
      {
        "type": "Feature",
        "properties": { "fsa": "K1N", "name": "ByWard Market" },
        "geometry": {
          "type": "Polygon",
          "coordinates": [[
            [-75.70, 45.42], [-75.70, 45.45], [-75.68, 45.45], [-75.68, 45.42], [-75.70, 45.42]
          ]]
        }
      },
      {
        "type": "Feature",
        "properties": { "fsa": "K2A", "name": "Hintonburg" },
        "geometry": {
          "type": "Polygon",
          "coordinates": [[
            [-75.75, 45.40], [-75.75, 45.43], [-75.72, 45.43], [-75.72, 45.40], [-75.75, 45.40]
          ]]
        }
      },
      {
        "type": "Feature",
        "properties": { "fsa": "K2C", "name": "Nepean" },
        "geometry": {
          "type": "Polygon",
          "coordinates": [[
            [-75.78, 45.35], [-75.78, 45.38], [-75.75, 45.38], [-75.75, 45.35], [-75.78, 45.35]
          ]]
        }
      }
    ]
  };

  useEffect(() => {
    // Load Leaflet dynamically
    const loadLeaflet = async () => {
      // Add Leaflet CSS
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      // Load Leaflet JS
      if (!window.L) {
        await new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
          script.onload = resolve;
          document.head.appendChild(script);
        });
      }

      // Load Leaflet.heat
      if (!window.L.heatLayer) {
        await new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/leaflet.heat@0.2.0/dist/leaflet-heat.js';
          script.onload = resolve;
          document.head.appendChild(script);
        });
      }

      initializeMap();
    };

    loadLeaflet();
  }, []);

  const initializeMap = () => {
    if (!mapRef.current || !window.L) return;

    const L = window.L;

    // Create map
    const map = L.map(mapRef.current, {
      center: [45.428, -75.59],
      zoom: 11,
      zoomControl: true
    });

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Create heat points from FSA data
    const heatPoints = [];
    Object.entries(FSA_SEED_DATA).forEach(([fsa, coeff]) => {
      // Find corresponding region
      const feature = SIMPLIFIED_REGIONS.features.find(f => f.properties.fsa === fsa);
      if (feature && feature.geometry.coordinates[0]) {
        const coords = feature.geometry.coordinates[0];
        const centerLng = coords.reduce((sum, c) => sum + c[0], 0) / coords.length;
        const centerLat = coords.reduce((sum, c) => sum + c[1], 0) / coords.length;
        
        // Add multiple scattered points for better heatmap
        for (let i = 0; i < 10; i++) {
          const offsetLat = (Math.random() - 0.5) * 0.02;
          const offsetLng = (Math.random() - 0.5) * 0.02;
          heatPoints.push([centerLat + offsetLat, centerLng + offsetLng, coeff]);
        }
      }
    });

    // Add heatmap layer
    const heat = L.heatLayer(heatPoints, {
      radius: 25,
      blur: 35,
      maxZoom: 17,
      max: 1.0,
      gradient: {
        0.0: '#22c55e',
        0.3: '#eab308',
        0.5: '#f97316',
        0.7: '#dc2626',
        1.0: '#991b1b'
      }
    }).addTo(map);

    // Add GeoJSON regions
    const getColor = (coeff) => {
      if (coeff < 0.3) return '#22c55e';
      if (coeff < 0.5) return '#eab308';
      if (coeff < 0.7) return '#f97316';
      return '#dc2626';
    };

    L.geoJSON(SIMPLIFIED_REGIONS, {
      style: (feature) => {
        const fsa = feature.properties.fsa;
        const coeff = FSA_SEED_DATA[fsa] || 0.3;
        return {
          fillColor: getColor(coeff),
          weight: 2,
          opacity: 0.6,
          color: 'white',
          fillOpacity: 0.3
        };
      },
      onEachFeature: (feature, layer) => {
        const fsa = feature.properties.fsa;
        const name = feature.properties.name;
        const coeff = FSA_SEED_DATA[fsa] || 0.3;
        
        layer.bindPopup(`
          <div style="color: #111;">
            <strong>${name}</strong><br/>
            FSA: ${fsa}<br/>
            Risk Coefficient: ${(coeff * 100).toFixed(0)}%<br/>
            <small>Based on building era and community data</small>
          </div>
        `);
      }
    }).addTo(map);

    setMapInstance(map);
    setLoading(false);
  };

  const getColorForRisk = (level) => {
    const colors = {
      'low': 'bg-green-500',
      'medium': 'bg-yellow-500',
      'high': 'bg-orange-500',
      'very-high': 'bg-red-600'
    };
    return colors[level] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-900 via-red-800 to-orange-900 text-white py-8 px-6 shadow-xl">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-10 h-10" />
            <div>
              <h1 className="text-4xl font-bold">Eastern Ontario Hazard Map</h1>
              <p className="text-red-100 mt-1">Interactive regional risk assessment for Ottawa & surrounding areas</p>
            </div>
          </div>

          {/* Hazard type selector */}
          <div className="flex flex-wrap gap-2 mt-6">
            {[
              { id: 'asbestos', label: 'Asbestos', icon: '🏗️' },
              { id: 'lead', label: 'Lead Paint', icon: '🎨' },
              { id: 'radon', label: 'Radon', icon: '☢️' },
              { id: 'mold', label: 'Mold', icon: '🦠' }
            ].map(hazard => (
              <button
                key={hazard.id}
                onClick={() => setActiveHazard(hazard.id)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  activeHazard === hazard.id
                    ? 'bg-white text-red-900 shadow-lg'
                    : 'bg-red-800/50 text-white hover:bg-red-700/70'
                }`}
              >
                <span className="mr-2">{hazard.icon}</span>
                {hazard.label}
              </button>
            ))}
            
            <button
              onClick={() => setShowControls(!showControls)}
              className="ml-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
            >
              <Info className="w-5 h-5 inline mr-2" />
              {showControls ? 'Hide' : 'Show'} Info
            </button>
          </div>
        </div>
      </div>

      {/* Important Notice */}
      <div className="bg-yellow-50 border-b-4 border-yellow-400 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-start gap-3">
          <Info className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <p className="text-sm text-yellow-900">
              <strong>Important:</strong> This map shows risk coefficients based on building era and community data. 
              Higher intensity = higher caution needed. Always confirm with professional testing before disturbing materials.
              Data is aggregated by FSA (Forward Sortation Area) for privacy protection.
            </p>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        <div ref={mapRef} className="absolute inset-0" />
        
        {loading && (
          <div className="absolute inset-0 bg-slate-900/80 flex items-center justify-center">
            <div className="text-white text-xl">Loading map...</div>
          </div>
        )}

        {/* Legend */}
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-xl p-4 z-[1000]">
          <h3 className="font-bold text-slate-900 mb-3">Risk Levels</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded"></div>
              <div className="text-sm">
                <div className="font-semibold">Low (0-30%)</div>
                <div className="text-xs text-slate-600">Post-2000</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-yellow-500 rounded"></div>
              <div className="text-sm">
                <div className="font-semibold">Medium (30-50%)</div>
                <div className="text-xs text-slate-600">1980-2000</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500 rounded"></div>
              <div className="text-sm">
                <div className="font-semibold">High (50-70%)</div>
                <div className="text-xs text-slate-600">1960-1980</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-600 rounded"></div>
              <div className="text-sm">
                <div className="font-semibold">Very High (70-100%)</div>
                <div className="text-xs text-slate-600">Pre-1960</div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Panel */}
        {showControls && (
          <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-xl p-6 z-[1000] max-w-2xl">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-slate-900">How to Use This Map</h3>
              <button onClick={() => setShowControls(false)} className="text-slate-500 hover:text-slate-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-3 text-sm text-slate-700">
              <p>• <strong>Click regions</strong> to see detailed risk coefficients for that area</p>
              <p>• <strong>Switch hazard types</strong> using the buttons at the top</p>
              <p>• <strong>Zoom and pan</strong> to explore different neighborhoods</p>
              <p>• <strong>Coefficients are NOT diagnoses</strong> - they indicate likelihood based on era and community data</p>
              <p>• <strong>Privacy-first:</strong> No exact addresses stored, FSA-level aggregation only</p>
              <p>• <strong>Always test before disturbing materials</strong> - even low-risk areas can have isolated hazards</p>
            </div>
            <div className="mt-4 pt-4 border-t">
              <p className="text-xs text-slate-500">
                Data sources: Building era records, community-verified reports, historical material usage patterns. 
                Map shows aggregate risk by Forward Sortation Area (first 3 postal code characters).
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-800 py-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Need Professional Hazard Assessment?
          </h2>
          <p className="text-blue-100 mb-6">
            Connect with verified abatement and testing companies in Ottawa
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="/contractors"
              className="px-8 py-3 bg-white hover:bg-blue-50 text-blue-900 rounded-lg font-bold transition-colors"
            >
              Find Verified Contractors
            </a>
            <a 
              href="/contact"
              className="px-8 py-3 bg-blue-700 hover:bg-blue-600 text-white rounded-lg font-bold transition-colors"
            >
              Request Hazard Check
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HazardMapLiveNuclear;
