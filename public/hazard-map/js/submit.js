// submit.js - Handle address submissions
(function() {
  const submitBtn = document.getElementById('btnSubmitAddr');
  const addrInput = document.getElementById('addrInput');
  const hazardSelect = document.getElementById('hazardSelect');
  const strengthSelect = document.getElementById('strengthSelect');

  if (!submitBtn) return;

  submitBtn.addEventListener('click', async function() {
    const address = addrInput.value.trim();
    
    if (!address) {
      alert('Please enter an address');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Geocoding...';

    try {
      // Geocode using Nominatim (OpenStreetMap)
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address + ', Ottawa, Ontario, Canada')}&limit=1`;
      
      const response = await fetch(url);
      const data = await response.json();

      if (data && data.length > 0) {
        const result = data[0];
        const lat = parseFloat(result.lat);
        const lng = parseFloat(result.lon);

        const hazard = hazardSelect.value;
        const strength = parseFloat(strengthSelect.value);

        // Use the exposed API from app.js
        if (window.HAZARD_APP && window.HAZARD_APP.submitPoint) {
          window.HAZARD_APP.submitPoint(lat, lng, hazard, strength);
        }

        // Clear input
        addrInput.value = '';

        // Show success
        submitBtn.textContent = '✓ Added!';
        submitBtn.classList.add('btn-success');
        submitBtn.classList.remove('btn-info');

        setTimeout(() => {
          submitBtn.textContent = 'Add area heat';
          submitBtn.classList.remove('btn-success');
          submitBtn.classList.add('btn-info');
          submitBtn.disabled = false;
        }, 2000);

      } else {
        alert('Address not found. Please try a different address.');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Add area heat';
      }

    } catch (error) {
      console.error('Geocoding error:', error);
      alert('Error geocoding address. Please try again.');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Add area heat';
    }
  });

  // Enter key support
  addrInput?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      submitBtn.click();
    }
  });
})();
