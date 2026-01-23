// Submit hazard observations with privacy protection
async function submitHazard() {
  const address = document.getElementById('addrInput').value.trim();
  const hazardType = document.getElementById('hazardSelect').value;
  const strength = parseFloat(document.getElementById('strengthSelect').value);

  if (!address) {
    alert('Please enter an address');
    return;
  }

  // Geocode address using Nominatim
  const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address + ', Ottawa, Ontario')}`;
  
  try {
    const response = await fetch(geocodeUrl);
    const results = await response.json();
    
    if (results.length === 0) {
      alert('Address not found. Please try a different address.');
      return;
    }

    const { lat, lon } = results[0];
    
    // Add scattered points for privacy (±200m radius)
    const points = [];
    for (let i = 0; i < 5; i++) {
      const offsetLat = (Math.random() - 0.5) * 0.002; // ~200m
      const offsetLon = (Math.random() - 0.5) * 0.002;
      points.push([
        parseFloat(lat) + offsetLat,
        parseFloat(lon) + offsetLon,
        strength
      ]);
    }

    // Add to heatmap
    if (window.heatLayer) {
      points.forEach(point => {
        window.heatLayer.addLatLng(L.latLng(point[0], point[1]));
      });
    }

    alert(`✓ Thank you! ${hazardType} observation added to map (privacy-protected)`);
    document.getElementById('addrInput').value = '';
  } catch (error) {
    console.error('Submission error:', error);
    alert('Error submitting observation. Please try again.');
  }
}

// Setup submit button
document.addEventListener('DOMContentLoaded', () => {
  const submitBtn = document.getElementById('btnSubmitAddr');
  if (submitBtn) {
    submitBtn.addEventListener('click', submitHazard);
  }

  // Allow Enter key in address field
  const addrInput = document.getElementById('addrInput');
  if (addrInput) {
    addrInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        submitHazard();
      }
    });
  }
});
