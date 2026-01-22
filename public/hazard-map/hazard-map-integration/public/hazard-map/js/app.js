// app.js - Main hazard map application
(function () {
  const DEFAULT_CENTER = [45.4765, -75.5316]; // Orléans
  const DEFAULT_ZOOM = 12;

  // Initialize map
  const map = L.map("map").setView(DEFAULT_CENTER, DEFAULT_ZOOM);

  // Base tile layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  // State
  let currentHazard = 'asbestos';
  let heatLayer = null;
  let regionsLayer = null;
  let companiesLayer = null;
  let submissionsLayer = null;
  let eraCoefficients = [];
  let seedData = {};
  let submissions = [];

  // Load data files
  async function loadData() {
    try {
      // Load era coefficients
      const eraRes = await fetch('./data/era_coefficients.json');
      eraCoefficients = await eraRes.json();
      
      // Populate era select
      const eraSelect = document.getElementById('eraSelect');
      eraSelect.innerHTML = '<option value="">All eras</option>';
      eraCoefficients.forEach(era => {
        const opt = document.createElement('option');
        opt.value = era.era_id;
        opt.textContent = era.label;
        eraSelect.appendChild(opt);
      });

      // Load seed data
      const seedRes = await fetch('./data/seed_pre1986.json');
      seedData = await seedRes.json();

      // Load regions
      const regionsRes = await fetch('./data/orleans_regions.geojson');
      const regionsData = await regionsRes.json();
      
      regionsLayer = L.geoJSON(regionsData, {
        style: styleRegion,
        onEachFeature: onEachRegion
      }).addTo(map);

      // Fit to regions
      if (regionsLayer.getBounds) {
        map.fitBounds(regionsLayer.getBounds(), { padding: [20, 20] });
      }

      // Initialize heatmap
      updateHeatmap();

      // Demo companies
      loadDemoCompanies();

    } catch (err) {
      console.error('Error loading data:', err);
    }
  }

  function styleRegion(feature) {
    const fsa = feature.properties?.fsa || '';
    const coeff = seedData[fsa] || 0.3;
    
    return {
      fillColor: getColorForCoeff(coeff),
      weight: 2,
      opacity: 0.6,
      color: 'white',
      fillOpacity: 0.4
    };
  }

  function getColorForCoeff(coeff) {
    // Color scale: green (low) -> yellow -> orange -> red (high)
    if (coeff < 0.3) return '#22c55e'; // green
    if (coeff < 0.5) return '#eab308'; // yellow
    if (coeff < 0.7) return '#f97316'; // orange
    return '#dc2626'; // red
  }

  function onEachRegion(feature, layer) {
    const props = feature.properties || {};
    const fsa = props.fsa || 'Unknown';
    const coeff = seedData[fsa] || 0.3;
    
    const popup = `
      <div style="color: #111;">
        <b>${fsa}</b><br/>
        Risk Coefficient: ${(coeff * 100).toFixed(0)}%<br/>
        <small>Based on era and community data</small>
      </div>
    `;
    
    layer.bindPopup(popup);
  }

  function updateHeatmap() {
    // Remove existing heat layer
    if (heatLayer) {
      map.removeLayer(heatLayer);
    }

    // Generate heat points from seed data
    const heatPoints = [];
    
    Object.entries(seedData).forEach(([fsa, coeff]) => {
      // Find region centroid
      if (regionsLayer) {
        regionsLayer.eachLayer(layer => {
          if (layer.feature?.properties?.fsa === fsa) {
            try {
              const center = layer.getBounds().getCenter();
              // Add multiple points with intensity based on coefficient
              for (let i = 0; i < coeff * 10; i++) {
                const offsetLat = (Math.random() - 0.5) * 0.01;
                const offsetLng = (Math.random() - 0.5) * 0.01;
                heatPoints.push([
                  center.lat + offsetLat,
                  center.lng + offsetLng,
                  coeff
                ]);
              }
            } catch (e) {}
          }
        });
      }
    });

    // Add submission points
    submissions.forEach(sub => {
      if (sub.hazard === currentHazard) {
        heatPoints.push([sub.lat, sub.lng, parseFloat(sub.strength) || 0.6]);
      }
    });

    if (heatPoints.length > 0) {
      heatLayer = L.heatLayer(heatPoints, {
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
    }
  }

  function loadDemoCompanies() {
    // Demo abatement companies
    const demoCompanies = [
      { name: 'Ottawa Asbestos Removal', lat: 45.47, lng: -75.53, type: 'abatement' },
      { name: 'Safe Home Testing', lat: 45.48, lng: -75.52, type: 'testing' },
      { name: 'Clean Air Specialists', lat: 45.46, lng: -75.54, type: 'both' }
    ];

    const companyIcon = L.icon({
      iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjMzk4OGZmIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI4Ii8+PC9zdmc+',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    companiesLayer = L.layerGroup();
    
    demoCompanies.forEach(company => {
      const marker = L.marker([company.lat, company.lng], { icon: companyIcon });
      marker.bindPopup(`
        <div style="color: #111;">
          <b>${company.name}</b><br/>
          <small>${company.type}</small>
        </div>
      `);
      marker.addTo(companiesLayer);
    });

    companiesLayer.addTo(map);
  }

  // Event listeners
  document.querySelectorAll('.hazard-pill').forEach(pill => {
    pill.addEventListener('click', function() {
      document.querySelectorAll('.hazard-pill').forEach(p => p.classList.remove('active'));
      this.classList.add('active');
      currentHazard = this.dataset.hazard;
      updateHeatmap();
    });
  });

  document.getElementById('toggleHeat')?.addEventListener('change', function(e) {
    if (e.target.checked) {
      if (heatLayer) heatLayer.addTo(map);
    } else {
      if (heatLayer) map.removeLayer(heatLayer);
    }
  });

  document.getElementById('toggleRegions')?.addEventListener('change', function(e) {
    if (e.target.checked) {
      if (regionsLayer) regionsLayer.addTo(map);
    } else {
      if (regionsLayer) map.removeLayer(regionsLayer);
    }
  });

  document.getElementById('toggleCompanies')?.addEventListener('change', function(e) {
    if (e.target.checked) {
      if (companiesLayer) companiesLayer.addTo(map);
    } else {
      if (companiesLayer) map.removeLayer(companiesLayer);
    }
  });

  document.getElementById('toggleSubmissions')?.addEventListener('change', function(e) {
    if (e.target.checked) {
      if (submissionsLayer) submissionsLayer.addTo(map);
    } else {
      if (submissionsLayer) map.removeLayer(submissionsLayer);
    }
  });

  document.getElementById('minCoeff')?.addEventListener('input', function(e) {
    // Could filter regions by coefficient
    console.log('Min coefficient:', e.target.value);
  });

  // Map click handler for demo submissions
  map.on('click', function(e) {
    // Add demo submission at click location
    const submission = {
      lat: e.latlng.lat,
      lng: e.latlng.lng,
      hazard: currentHazard,
      strength: 0.7,
      timestamp: Date.now()
    };
    
    submissions.push(submission);
    updateHeatmap();
    
    // Show toast notification
    console.log('Added demo submission at', e.latlng);
  });

  // Initialize
  loadData();

  // Export for submit.js
  window.hazardMapState = {
    map,
    currentHazard,
    submissions,
    updateHeatmap
  };
})();
