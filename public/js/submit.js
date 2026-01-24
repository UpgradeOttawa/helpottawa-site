// Submit hazard observations with privacy protection
// Phase 1: Basic functionality (matches original behavior)

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
    
    // Call the submitPoint function from app.js
    if (window.HAZARD_APP && window.HAZARD_APP.submitPoint) {
      window.HAZARD_APP.submitPoint(parseFloat(lat), parseFloat(lon), hazardType, strength);
      alert(`✓ ${hazardType} observation added to map (privacy-protected)`);
      document.getElementById('addrInput').value = '';
    } else {
      throw new Error('Map API not ready');
    }
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
