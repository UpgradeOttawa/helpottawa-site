// submit.js - Handle hazard submissions
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

        // Get selected values
        const hazard = hazardSelect.value;
        const strength = parseFloat(strengthSelect.value);

        // Add submission with scattered points for privacy
        const numPoints = 5; // Scatter 5 points around the area
        
        for (let i = 0; i < numPoints; i++) {
          // Random offset within ~200m radius
          const offsetLat = (Math.random() - 0.5) * 0.002;
          const offsetLng = (Math.random() - 0.5) * 0.002;
          
          const submission = {
            lat: lat + offsetLat,
            lng: lng + offsetLng,
            hazard: hazard,
            strength: strength,
            timestamp: Date.now(),
            address_partial: result.display_name.split(',').slice(-3).join(','), // Last 3 parts only
            privacy_scattered: true
          };

          window.hazardMapState.submissions.push(submission);
        }

        // Update heatmap
        window.hazardMapState.updateHeatmap();

        // Pan map to location
        window.hazardMapState.map.setView([lat, lng], 14);

        // Clear input
        addrInput.value = '';

        // Show success message
        const originalText = submitBtn.textContent;
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
