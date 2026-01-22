import React, { useState, useEffect } from 'react';
import { Calculator, Home, Wrench, Sparkles, DollarSign, Image as ImageIcon, Download, RotateCcw, Package, ExternalLink, Store } from 'lucide-react';

/**
 * WHITE-LABEL BATHROOM RENOVATION CALCULATOR
 * 
 * Customizable for multiple contractors with built-in advertising
 * License: See LICENSE.md for white-label usage terms
 */

const BathroomCalculatorWhiteLabel = () => {
  // CONTRACTOR CONFIGURATION - Set these for each installation
  const [contractorConfig, setContractorConfig] = useState({
    businessName: "Your Renovation Company", // CUSTOMIZE
    logo: null, // URL to contractor's logo
    primaryColor: "#1e293b", // slate-800
    accentColor: "#f59e0b", // amber-500
    phone: "(555) 123-4567", // CUSTOMIZE
    email: "contact@yourcompany.com", // CUSTOMIZE
    website: "https://yourcompany.com", // CUSTOMIZE
    licenseNumber: "LIC #12345", // CUSTOMIZE
    serviceArea: "Greater Metro Area", // CUSTOMIZE
    
    // Material supplier partnerships
    suppliers: [
      { name: "Tile Warehouse", category: "Tile", discount: "10%", url: "#" },
      { name: "Fixture Pro", category: "Fixtures", discount: "15%", url: "#" },
      { name: "Lighting Direct", category: "Lighting", discount: "20%", url: "#" },
    ],
    
    // Advertising slots - YOUR REVENUE STREAM
    ads: {
      enabled: true,
      slots: [
        {
          id: "sidebar-top",
          type: "banner",
          advertiser: "Premium Tile Co",
          imageUrl: null, // Ad creative
          linkUrl: "https://example.com",
          ctaText: "Shop Premium Tiles - 20% Off",
        },
        {
          id: "result-banner",
          type: "banner",
          advertiser: "Smart Home Systems",
          imageUrl: null,
          linkUrl: "https://example.com",
          ctaText: "Upgrade to Smart Bathroom",
        },
        {
          id: "footer-sponsor",
          type: "text",
          advertiser: "Local Plumbing Supply",
          text: "Materials provided in partnership with Local Plumbing Supply",
          linkUrl: "https://example.com",
        }
      ]
    }
  });

  // Core state (same as original)
  const [activeTab, setActiveTab] = useState('basics');
  const [generating, setGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [showSuppliers, setShowSuppliers] = useState(false);
  
  // Project basics
  const [projectData, setProjectData] = useState({
    size: 'medium',
    complexity: 'standard',
    ceilingHeight: 'standard',
    fixtureRelocation: 'none',
    permitNeeded: false,
  });
  
  // Fixtures & quality
  const [fixtures, setFixtures] = useState({
    toilet: { include: true, quality: 'mid', supplierLink: null },
    vanitySize: '36',
    vanity: { include: true, quality: 'mid', supplierLink: null },
    sink: { include: true, quality: 'mid', supplierLink: null },
    faucet: { include: true, quality: 'mid', supplierLink: null },
    shower: { include: true, type: 'combo', quality: 'mid', supplierLink: null },
    showerDoor: { include: false, quality: 'mid', supplierLink: null },
  });
  
  // Surfaces & materials
  const [surfaces, setSurfaces] = useState({
    floorType: 'ceramic',
    floorQuality: 'mid',
    wallTile: { include: true, quality: 'mid' },
    accentTile: { include: false, quality: 'mid' },
    paint: { include: true, quality: 'mid' },
  });
  
  // Lighting & electrical
  const [electrical, setElectrical] = useState({
    lightFixtures: { count: 2, quality: 'mid' },
    exhaustFan: { include: true, quality: 'mid' },
    outlets: { count: 2 },
    heatedFloor: false,
  });
  
  // Premium features
  const [premiumFeatures, setPremiumFeatures] = useState({
    steamShower: false,
    bidet: false,
    smartMirror: false,
    rainShowerHead: false,
    bodySpray: false,
    towelWarmer: false,
    skylight: false,
    freestandingTub: false,
    makeupVanity: false,
    soundSystem: false,
  });

  // Pricing database
  const [pricing, setPricing] = useState(null);

  // Initialize pricing
  useEffect(() => {
    const loadPricing = async () => {
      try {
        // Try to load contractor-specific pricing first
        const stored = await window.storage.get(`pricing-${contractorConfig.businessName}`);
        if (stored && stored.value) {
          setPricing(JSON.parse(stored.value));
        } else {
          const defaultPricing = getDefaultPricing();
          await window.storage.set(`pricing-${contractorConfig.businessName}`, JSON.stringify(defaultPricing));
          setPricing(defaultPricing);
        }
      } catch (error) {
        setPricing(getDefaultPricing());
      }
    };
    loadPricing();
  }, [contractorConfig.businessName]);

  // Track ad clicks for analytics
  const trackAdClick = (adId, advertiser) => {
    console.log(`Ad clicked: ${adId} - ${advertiser}`);
    // Send to analytics endpoint
    // gtag('event', 'ad_click', { ad_id: adId, advertiser: advertiser });
  };

  const getDefaultPricing = () => ({
    labor: {
      plumber: { toilet: 150, sink: 200, shower: 350, pipeRelocation: 85 },
      electrician: { light: 125, fan: 200, outlet: 100, heatedFloor: 8, rewiring: 90 },
      tiler: { floor: 12, wall: 15, mosaic: 25, waterproofing: 6 },
      carpenter: { vanity: 200, cabinet: 150, shelving: 45, framing: 75 },
      drywaller: { install: 3.5, finish: 2.5, texture: 1.5 },
      painter: { primer: 1.2, paint: 2.5 },
      general: { demo: 4, removal: 250, cleanup: 40 },
    },
    materials: {
      toilet: { budget: 150, mid: 350, premium: 800 },
      vanity: {
        24: { budget: 300, mid: 600, premium: 1500 },
        36: { budget: 450, mid: 900, premium: 2200 },
        48: { budget: 650, mid: 1300, premium: 3500 },
      },
      sink: { budget: 100, mid: 250, premium: 600 },
      faucet: { budget: 80, mid: 200, premium: 500 },
      shower: {
        combo: { budget: 600, mid: 1200, premium: 3000 },
        pan: { budget: 250, mid: 450, premium: 1200 },
      },
      showerDoor: { budget: 300, mid: 600, premium: 1500 },
      floor: {
        ceramic: { budget: 3, mid: 7, premium: 15 },
        vinyl: { budget: 2.5, mid: 4.5, premium: 8 },
      },
      wallTile: { budget: 2.5, mid: 6, premium: 18 },
      accentTile: { budget: 8, mid: 15, premium: 35 },
      light: { budget: 40, mid: 120, premium: 350 },
      fan: { budget: 60, mid: 150, premium: 400 },
      mirror: { budget: 50, mid: 150, premium: 400 },
      paint: { budget: 0.4, mid: 0.75, premium: 1.2 },
      materials: { grout: 0.5, thinset: 0.75, waterproofing: 2, backer: 2.5, drywall: 1.5 },
    },
    premiumFeatures: {
      heatedFloor: 2000,
      steamShower: 5500,
      bidet: 1500,
      smartMirror: 1900,
      rainShowerHead: 750,
      bodySpray: 2750,
      towelWarmer: 800,
      skylight: 2750,
      freestandingTub: 4750,
      makeupVanity: 2500,
      soundSystem: 1500,
    },
    multipliers: {
      size: { small: 1.0, medium: 1.3, large: 1.7, xlarge: 2.2 },
      complexity: { basic: 1.0, standard: 1.5, major: 2.2, rebuild: 3.0 },
      relocation: { none: 1.0, minor: 1.3, major: 1.8 },
      ceiling: { standard: 1.0, high: 1.15, veryHigh: 1.3 },
      permit: { none: 1.0, standard: 1.08, complex: 1.15 },
    },
  });

  const getSizeDetails = () => {
    const sizes = {
      small: { sqft: 35, name: 'Small (< 40 sq ft)', desc: 'Powder room or half bath' },
      medium: { sqft: 70, name: 'Medium (40-100 sq ft)', desc: 'Standard full bathroom' },
      large: { sqft: 130, name: 'Large (100-160 sq ft)', desc: 'Master bathroom' },
      xlarge: { sqft: 180, name: 'Extra Large (> 160 sq ft)', desc: 'Luxury master suite' },
    };
    return sizes[projectData.size];
  };

  // Calculate cost (same logic as original)
  const calculateCost = () => {
    if (!pricing) return { total: 0, breakdown: {} };

    const sizeDetails = getSizeDetails();
    const sqft = sizeDetails.sqft;
    
    let laborCost = 0;
    let materialCost = 0;
    let premiumCost = 0;

    // Fixtures
    if (fixtures.toilet.include) {
      laborCost += pricing.labor.plumber.toilet;
      materialCost += pricing.materials.toilet[fixtures.toilet.quality];
    }
    
    if (fixtures.vanity.include) {
      laborCost += pricing.labor.carpenter.vanity;
      materialCost += pricing.materials.vanity[fixtures.vanitySize][fixtures.vanity.quality];
    }
    
    if (fixtures.sink.include) {
      laborCost += pricing.labor.plumber.sink;
      materialCost += pricing.materials.sink[fixtures.sink.quality];
    }
    
    if (fixtures.faucet.include) {
      materialCost += pricing.materials.faucet[fixtures.faucet.quality];
    }
    
    if (fixtures.shower.include) {
      laborCost += pricing.labor.plumber.shower;
      materialCost += pricing.materials.shower[fixtures.shower.type][fixtures.shower.quality];
    }
    
    if (fixtures.showerDoor.include) {
      materialCost += pricing.materials.showerDoor[fixtures.showerDoor.quality];
    }

    // Flooring
    laborCost += sqft * pricing.labor.tiler.floor;
    materialCost += sqft * (
      pricing.materials.floor[surfaces.floorType][surfaces.floorQuality] +
      pricing.materials.materials.thinset +
      pricing.materials.materials.grout
    );

    // Wall tile
    if (surfaces.wallTile.include) {
      const wallSqft = sqft * 0.5;
      laborCost += wallSqft * pricing.labor.tiler.wall;
      materialCost += wallSqft * (
        pricing.materials.wallTile[surfaces.wallTile.quality] +
        pricing.materials.materials.thinset +
        pricing.materials.materials.grout +
        pricing.materials.materials.waterproofing +
        pricing.materials.materials.backer
      );
    }

    // Accent tile
    if (surfaces.accentTile.include) {
      const accentSqft = sqft * 0.15;
      laborCost += accentSqft * pricing.labor.tiler.mosaic;
      materialCost += accentSqft * pricing.materials.accentTile[surfaces.accentTile.quality];
    }

    // Paint
    if (surfaces.paint.include) {
      const paintSqft = sqft * 0.8;
      laborCost += paintSqft * (pricing.labor.painter.primer + pricing.labor.painter.paint);
      materialCost += paintSqft * pricing.materials.paint[surfaces.paint.quality];
    }

    // Electrical
    laborCost += electrical.lightFixtures.count * pricing.labor.electrician.light;
    materialCost += electrical.lightFixtures.count * pricing.materials.light[electrical.lightFixtures.quality];
    
    if (electrical.exhaustFan.include) {
      laborCost += pricing.labor.electrician.fan;
      materialCost += pricing.materials.fan[electrical.exhaustFan.quality];
    }
    
    laborCost += electrical.outlets.count * pricing.labor.electrician.outlet;

    if (electrical.heatedFloor) {
      premiumCost += pricing.premiumFeatures.heatedFloor;
    }

    // Premium features
    Object.keys(premiumFeatures).forEach(feature => {
      if (premiumFeatures[feature]) {
        premiumCost += pricing.premiumFeatures[feature];
      }
    });

    // Demo and prep
    laborCost += sqft * pricing.labor.general.demo;
    laborCost += pricing.labor.general.removal * 2;
    laborCost += pricing.labor.general.cleanup * 4;

    // Apply multipliers
    const sizeMultiplier = pricing.multipliers.size[projectData.size];
    const complexityMultiplier = pricing.multipliers.complexity[projectData.complexity];
    const relocationMultiplier = pricing.multipliers.relocation[projectData.fixtureRelocation];
    const ceilingMultiplier = pricing.multipliers.ceiling[projectData.ceilingHeight];
    const permitMultiplier = projectData.permitNeeded ? pricing.multipliers.permit.standard : 1.0;

    const totalMultiplier = complexityMultiplier * relocationMultiplier * ceilingMultiplier * permitMultiplier;

    const subtotal = (laborCost + materialCost) * totalMultiplier + premiumCost;
    const contingency = subtotal * 0.15;
    const total = subtotal + contingency;

    return {
      total,
      breakdown: {
        labor: laborCost * totalMultiplier,
        materials: materialCost * totalMultiplier,
        premium: premiumCost,
        contingency,
      },
      multipliers: {
        size: sizeMultiplier,
        complexity: complexityMultiplier,
        relocation: relocationMultiplier,
        ceiling: ceilingMultiplier,
        permit: permitMultiplier,
        total: totalMultiplier,
      },
    };
  };

  const cost = calculateCost();

  const generateVisualization = async () => {
    setGenerating(true);
    try {
      const prompt = buildVisualizationPrompt();
      
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
        }),
      });

      const data = await response.json();
      const imageBlock = data.content.find(block => block.type === 'image');
      if (imageBlock) {
        setGeneratedImage(`data:image/jpeg;base64,${imageBlock.source.data}`);
      }
    } catch (error) {
      console.error('Failed to generate image:', error);
      alert('Unable to generate visualization. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const buildVisualizationPrompt = () => {
    const sizeDesc = getSizeDetails().desc;
    const fixtureList = [];
    
    if (fixtures.toilet.include) fixtureList.push(`${fixtures.toilet.quality}-range toilet`);
    if (fixtures.vanity.include) fixtureList.push(`${fixtures.vanitySize}" ${fixtures.vanity.quality}-range vanity`);
    if (fixtures.shower.include) fixtureList.push(`${fixtures.shower.quality}-range ${fixtures.shower.type === 'combo' ? 'tub/shower combo' : 'walk-in shower'}`);
    
    const features = [];
    if (electrical.heatedFloor) features.push('heated flooring');
    if (premiumFeatures.rainShowerHead) features.push('rain shower head');
    if (premiumFeatures.freestandingTub) features.push('freestanding tub');
    if (premiumFeatures.smartMirror) features.push('smart mirror');

    return `Create a photorealistic interior design rendering of a ${sizeDesc} bathroom with the following specifications:

Fixtures: ${fixtureList.join(', ')}
Flooring: ${surfaces.floorQuality}-range ${surfaces.floorType} tile
Wall Treatment: ${surfaces.wallTile.include ? `${surfaces.wallTile.quality}-range tile` : 'painted walls'}
${surfaces.accentTile.include ? `With decorative accent tile` : ''}
Special Features: ${features.length > 0 ? features.join(', ') : 'Standard features'}

Style: Modern, clean, well-lit bathroom with natural lighting. Show the space from a corner angle to capture the overall layout. Professional interior design photography style with attention to materials and finishes.`;
  };

  const exportResults = () => {
    const results = `
${contractorConfig.businessName.toUpperCase()}
BATHROOM RENOVATION COST ESTIMATE
${contractorConfig.licenseNumber}
Generated: ${new Date().toLocaleDateString()}

Contact: ${contractorConfig.phone}
Email: ${contractorConfig.email}
Website: ${contractorConfig.website}

PROJECT DETAILS
--------------
Size: ${getSizeDetails().name}
Complexity: ${projectData.complexity}
Fixture Relocation: ${projectData.fixtureRelocation}

COST BREAKDOWN
--------------
Labor: $${cost.breakdown.labor.toLocaleString('en-US', { maximumFractionDigits: 0 })}
Materials: $${cost.breakdown.materials.toLocaleString('en-US', { maximumFractionDigits: 0 })}
Premium Features: $${cost.breakdown.premium.toLocaleString('en-US', { maximumFractionDigits: 0 })}
Contingency (15%): $${cost.breakdown.contingency.toLocaleString('en-US', { maximumFractionDigits: 0 })}

TOTAL ESTIMATE: $${cost.total.toLocaleString('en-US', { maximumFractionDigits: 0 })}

This estimate is valid for 30 days. Final costs may vary based on specific 
material selections, unforeseen conditions, and local permit requirements.

Schedule your free consultation today!
Call: ${contractorConfig.phone}
    `.trim();

    const blob = new Blob([results], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bathroom-estimate-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const requestQuote = () => {
    // Open contact form or send to CRM
    window.location.href = `mailto:${contractorConfig.email}?subject=Bathroom Renovation Quote Request&body=Estimated Cost: $${cost.total.toLocaleString()}`;
  };

  if (!pricing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100 flex items-center justify-center">
        <div className="text-slate-600">Loading pricing data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-stone-50 to-amber-50 font-sans">
      {/* Header with Contractor Branding */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-stone-800 text-white shadow-2xl" style={{ backgroundColor: contractorConfig.primaryColor }}>
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-4">
              {contractorConfig.logo && (
                <img src={contractorConfig.logo} alt="Logo" className="h-12 w-auto" />
              )}
              <div>
                <h1 className="text-4xl font-light tracking-tight">{contractorConfig.businessName}</h1>
                <p className="text-slate-300 text-sm">{contractorConfig.licenseNumber} • {contractorConfig.serviceArea}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-light mb-1">{contractorConfig.phone}</div>
              <a href={contractorConfig.website} className="text-sm text-amber-400 hover:text-amber-300">
                Visit Website →
              </a>
            </div>
          </div>
          <p className="text-slate-300 text-lg font-light">Free Bathroom Renovation Cost Calculator</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Configuration */}
          <div className="lg:col-span-2 space-y-6">
            {/* Navigation Tabs */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-stone-200">
              <div className="flex border-b border-stone-200">
                {[
                  { id: 'basics', icon: Home, label: 'Project Basics' },
                  { id: 'fixtures', icon: Wrench, label: 'Fixtures' },
                  { id: 'surfaces', icon: DollarSign, label: 'Surfaces' },
                  { id: 'features', icon: Sparkles, label: 'Premium' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 px-6 py-4 flex items-center justify-center gap-2 transition-all ${
                      activeTab === tab.id
                        ? 'text-white'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                    style={{ backgroundColor: activeTab === tab.id ? contractorConfig.primaryColor : 'transparent' }}
                  >
                    <tab.icon className="w-5 h-5" strokeWidth={1.5} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>

              <div className="p-8">
                {/* Same tab content as original calculator */}
                {activeTab === 'basics' && (
                  <div className="space-y-6">
                    {/* Basics content - same as original */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">Bathroom Size</label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { value: 'small', label: 'Small', desc: '< 40 sq ft' },
                          { value: 'medium', label: 'Medium', desc: '40-100 sq ft' },
                          { value: 'large', label: 'Large', desc: '100-160 sq ft' },
                          { value: 'xlarge', label: 'Extra Large', desc: '> 160 sq ft' },
                        ].map(option => (
                          <button
                            key={option.value}
                            onClick={() => setProjectData({ ...projectData, size: option.value })}
                            className={`p-4 rounded-xl border-2 transition-all text-left ${
                              projectData.size === option.value
                                ? 'shadow-md'
                                : 'border-stone-200 hover:border-slate-400'
                            }`}
                            style={{
                              borderColor: projectData.size === option.value ? contractorConfig.primaryColor : undefined,
                              backgroundColor: projectData.size === option.value ? `${contractorConfig.primaryColor}10` : undefined
                            }}
                          >
                            <div className="font-semibold text-slate-800">{option.label}</div>
                            <div className="text-sm text-slate-500">{option.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Rest of basics tab... */}
                  </div>
                )}
                
                {/* Other tabs would go here - same structure as original */}
              </div>
            </div>

            {/* NEW: Supplier Partnership Section */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-stone-200">
              <button
                onClick={() => setShowSuppliers(!showSuppliers)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-slate-600" strokeWidth={1.5} />
                  <span className="font-semibold text-slate-800">Our Material Suppliers</span>
                </div>
                <span className="text-slate-400">{showSuppliers ? '−' : '+'}</span>
              </button>
              
              {showSuppliers && (
                <div className="px-6 pb-6 space-y-3">
                  {contractorConfig.suppliers.map((supplier, idx) => (
                    <a
                      key={idx}
                      href={supplier.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-stone-50 rounded-lg hover:bg-amber-50 transition-colors group"
                    >
                      <div>
                        <div className="font-semibold text-slate-800">{supplier.name}</div>
                        <div className="text-sm text-slate-500">{supplier.category} • {supplier.discount} contractor discount</div>
                      </div>
                      <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-amber-600" strokeWidth={1.5} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Cost Summary with Ads */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* AD SLOT 1: Top Banner */}
              {contractorConfig.ads.enabled && contractorConfig.ads.slots[0] && (
                <a
                  href={contractorConfig.ads.slots[0].linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAdClick(contractorConfig.ads.slots[0].id, contractorConfig.ads.slots[0].advertiser)}
                  className="block bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-4 hover:shadow-lg transition-all"
                >
                  <div className="text-xs uppercase tracking-wide mb-1 opacity-75">Partner Offer</div>
                  <div className="font-semibold">{contractorConfig.ads.slots[0].ctaText}</div>
                  {contractorConfig.ads.slots[0].imageUrl && (
                    <img src={contractorConfig.ads.slots[0].imageUrl} alt="Ad" className="mt-2 rounded" />
                  )}
                </a>
              )}

              {/* Cost Summary */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-5" style={{ background: `linear-gradient(to right, ${contractorConfig.accentColor}, ${contractorConfig.primaryColor})` }}>
                  <h2 className="text-2xl font-light">Estimated Cost</h2>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-slate-600">Labor</span>
                    <span className="font-semibold text-slate-800">${cost.breakdown.labor.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-slate-600">Materials</span>
                    <span className="font-semibold text-slate-800">${cost.breakdown.materials.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-slate-600">Premium Features</span>
                    <span className="font-semibold text-slate-800">${cost.breakdown.premium.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-3 border-t border-stone-200">
                    <span className="text-slate-600">Contingency (15%)</span>
                    <span className="font-semibold text-slate-800">${cost.breakdown.contingency.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-4 border-t-2" style={{ borderColor: contractorConfig.primaryColor }}>
                    <span className="text-xl font-bold text-slate-800">Total</span>
                    <span className="text-3xl font-bold" style={{ color: contractorConfig.accentColor }}>${cost.total.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                  </div>
                  
                  <div className="pt-4 text-xs text-slate-500 border-t border-stone-200 space-y-1">
                    <div className="flex justify-between">
                      <span>Size multiplier:</span>
                      <span>{cost.multipliers.size.toFixed(1)}x</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Complexity multiplier:</span>
                      <span>{cost.multipliers.complexity.toFixed(1)}x</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* AD SLOT 2: After Cost */}
              {contractorConfig.ads.enabled && contractorConfig.ads.slots[1] && (
                <a
                  href={contractorConfig.ads.slots[1].linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAdClick(contractorConfig.ads.slots[1].id, contractorConfig.ads.slots[1].advertiser)}
                  className="block bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-4 hover:shadow-lg transition-all"
                >
                  <div className="text-xs uppercase tracking-wide mb-1 opacity-75">Upgrade Option</div>
                  <div className="font-semibold">{contractorConfig.ads.slots[1].ctaText}</div>
                </a>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={requestQuote}
                  className="w-full px-6 py-4 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
                  style={{ backgroundColor: contractorConfig.accentColor }}
                >
                  <Store className="w-5 h-5" strokeWidth={1.5} />
                  Request Official Quote
                </button>

                <button
                  onClick={generateVisualization}
                  disabled={generating}
                  className="w-full px-6 py-4 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg disabled:opacity-50"
                  style={{ backgroundColor: contractorConfig.primaryColor }}
                >
                  {generating ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-5 h-5" strokeWidth={1.5} />
                      Visualize Design
                    </>
                  )}
                </button>

                <button
                  onClick={exportResults}
                  className="w-full px-6 py-4 bg-white hover:bg-stone-50 text-slate-800 border-2 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
                  style={{ borderColor: contractorConfig.primaryColor }}
                >
                  <Download className="w-5 h-5" strokeWidth={1.5} />
                  Download Estimate
                </button>
              </div>

              {/* Generated Image */}
              {generatedImage && (
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-stone-200">
                  <div className="p-4 text-white" style={{ backgroundColor: contractorConfig.primaryColor }}>
                    <h3 className="font-semibold">Your Bathroom Preview</h3>
                  </div>
                  <img src={generatedImage} alt="Bathroom visualization" className="w-full" />
                </div>
              )}

              {/* Disclaimer */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-slate-600">
                <p className="font-semibold text-amber-800 mb-2">Estimate Disclaimer</p>
                <p>This is a preliminary estimate. Final costs determined after on-site inspection. Valid for 30 days. {contractorConfig.licenseNumber}</p>
              </div>

              {/* AD SLOT 3: Footer Sponsor */}
              {contractorConfig.ads.enabled && contractorConfig.ads.slots[2] && (
                <div className="text-center text-xs text-slate-500">
                  <a 
                    href={contractorConfig.ads.slots[2].linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackAdClick(contractorConfig.ads.slots[2].id, contractorConfig.ads.slots[2].advertiser)}
                    className="hover:text-slate-700"
                  >
                    {contractorConfig.ads.slots[2].text}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BathroomCalculatorWhiteLabel;