// HELPOTTAWA.CA - OTTAWA BATHROOM CALCULATOR CONFIGURATION
// Ready to deploy - just update YOUR_LOGO_URL

const helpOttawaConfig = {
  // ============================================
  // BUSINESS BRANDING
  // ============================================
  businessName: "HelpOttawa.ca",
  logo: "YOUR_LOGO_URL_HERE", // Upload your logo and add URL
  primaryColor: "#1e293b",  // Slate gray - professional
  accentColor: "#C8102E",   // Canadian red
  tagline: "Supporting Ottawa Homeowners & Canadian Businesses",
  
  // ============================================
  // CONTACT INFORMATION
  // ============================================
  phone: "613-314-7926",
  email: "helpottawa@gmail.com",
  website: "https://homeupgraders.wixsite.com/helpottawa",
  
  // ============================================
  // SERVICE AREA
  // ============================================
  serviceArea: "Ottawa, Gatineau & National Capital Region",
  credentials: {
    mission: "Connecting Ottawa homeowners with Canadian manufacturers and local suppliers",
    established: "2024",
    focus: "Community-driven renovation planning"
  },
  
  // ============================================
  // OTTAWA-SPECIFIC PRICING (2026 Rates)
  // ============================================
  pricing: {
    region: "ottawa",
    costMultiplier: 1.15, // Ottawa is 15% above baseline Canadian pricing
    contingency: 0.15,    // 15% contingency for Ottawa projects
    
    // Ottawa Labor Rates
    labor: {
      plumber: {
        toilet: 180,
        sink: 240,
        shower: 420,
        pipeRelocation: 100,
        hourlyRate: 100  // $85-125/hr typical in Ottawa
      },
      electrician: {
        light: 150,
        fan: 240,
        outlet: 120,
        heatedFloor: 10,
        rewiring: 105,
        hourlyRate: 105  // $90-120/hr in Ottawa
      },
      tiler: {
        floor: 14,
        wall: 18,
        mosaic: 30,
        waterproofing: 7
      },
      carpenter: {
        vanity: 240,
        cabinet: 180,
        shelving: 50,
        framing: 85,
        hourlyRate: 85  // $70-100/hr
      },
      drywaller: {
        install: 4.0,
        finish: 3.0,
        texture: 1.8
      },
      painter: {
        primer: 1.4,
        paint: 3.0
      },
      general: {
        demo: 4.5,
        removal: 300,
        cleanup: 45
      }
    },
    
    // Ottawa Material Costs (sourced from local suppliers)
    materials: {
      toilet: { 
        budget: 175,   // Home Hardware
        mid: 400,      // Emco
        premium: 900   // Specialty showrooms
      },
      vanity: {
        24: { budget: 350, mid: 700, premium: 1700 },
        36: { budget: 525, mid: 1050, premium: 2500 },
        48: { budget: 750, mid: 1500, premium: 4000 }
      },
      sink: { 
        budget: 120, 
        mid: 300, 
        premium: 700 
      },
      faucet: { 
        budget: 95, 
        mid: 240, 
        premium: 600 
      },
      shower: {
        combo: { budget: 700, mid: 1400, premium: 3500 },
        pan: { budget: 300, mid: 550, premium: 1400 }
      },
      showerDoor: { 
        budget: 350, 
        mid: 700, 
        premium: 1700 
      },
      floor: {
        ceramic: { budget: 3.5, mid: 8, premium: 18 },
        vinyl: { budget: 3.0, mid: 5.5, premium: 9.5 }
      },
      wallTile: { 
        budget: 3.0, 
        mid: 7, 
        premium: 20 
      },
      accentTile: { 
        budget: 9, 
        mid: 18, 
        premium: 40 
      },
      light: { 
        budget: 50, 
        mid: 140, 
        premium: 400 
      },
      fan: { 
        budget: 70, 
        mid: 175, 
        premium: 450 
      },
      paint: { 
        budget: 0.5, 
        mid: 0.85, 
        premium: 1.4 
      }
    }
  },
  
  // ============================================
  // OTTAWA SUPPLIER DIRECTORY
  // ============================================
  suppliers: [
    {
      name: "Home Hardware Ottawa",
      category: "General Hardware & Materials",
      discount: "Member pricing available",
      url: "https://www.homehardware.ca/store-finder",
      locations: "Multiple Ottawa locations",
      canadianOwned: true,
      logo: null,
      featured: true
    },
    {
      name: "Emco Corporation - Ottawa",
      category: "Plumbing & Fixtures",
      discount: "Trade & contractor pricing",
      url: "https://www.emcocorp.com/",
      locations: "1735 St. Laurent Blvd, Ottawa",
      canadianOwned: true,
      logo: null,
      featured: true
    },
    {
      name: "Tile Warehouse Ottawa",
      category: "Tile & Stone",
      discount: "Ask for contractor rates",
      url: "https://tilewarehouse.ca/",
      locations: "Ottawa location",
      canadianOwned: true,
      logo: null,
      featured: true
    },
    {
      name: "Stone Tile International",
      category: "Natural Stone & Tile",
      discount: "Trade pricing available",
      url: "https://stonetileottawa.com/",
      locations: "Ottawa showroom",
      canadianOwned: true,
      logo: null,
      featured: true
    },
    {
      name: "RONA Ottawa",
      category: "Building Materials",
      discount: "RONA Pro rewards program",
      url: "https://www.rona.ca/",
      locations: "Multiple Ottawa locations",
      canadianOwned: true,
      logo: null,
      featured: false
    },
    {
      name: "Ciot Ottawa",
      category: "Italian Tile & Stone",
      discount: "Designer pricing",
      url: "https://www.ciot.com/",
      locations: "1125 Lola St, Ottawa",
      canadianOwned: false, // Italian brand, but Canadian operations
      logo: null,
      featured: false
    },
    {
      name: "Noble Trade",
      category: "Plumbing Supplies",
      discount: "Trade accounts available",
      url: "https://nobletrade.com/",
      locations: "Ottawa wholesale",
      canadianOwned: true,
      logo: null,
      featured: false
    },
    {
      name: "Benjamin Moore Ottawa",
      category: "Paint & Coatings",
      discount: "Pro painter discount",
      url: "https://www.benjaminmoore.com/",
      locations: "Multiple dealers",
      canadianOwned: false, // US brand
      logo: null,
      featured: false
    }
  ],
  
  // ============================================
  // CANADIAN MANUFACTURER HIGHLIGHTS
  // ============================================
  canadianManufacturers: [
    {
      name: "American Standard Canada",
      category: "Toilets & Fixtures",
      location: "Lachine, Quebec",
      ccmcCertified: true,
      availableAt: ["Home Hardware", "RONA", "Emco"]
    },
    {
      name: "Delta Faucet Canada",
      category: "Faucets & Fixtures",
      location: "London, Ontario",
      ccmcCertified: true,
      availableAt: ["Home Hardware", "RONA", "Emco", "Lowe's"]
    },
    {
      name: "Kohler Canada",
      category: "Fixtures & Bathing",
      location: "Multiple Canadian facilities",
      ccmcCertified: true,
      availableAt: ["Emco", "Specialized showrooms"]
    },
    {
      name: "Crane Canada",
      category: "Plumbing Fixtures",
      location: "Winnipeg, Manitoba",
      ccmcCertified: true,
      availableAt: ["Emco", "Noble Trade"]
    }
  ],
  
  // ============================================
  // FEATURES ENABLED
  // ============================================
  features: {
    aiVisualization: true,
    leadCapture: true,
    supplierLinks: true,
    canadianProductFilter: true,
    projectGallery: false,  // Phase 2
    contractorReferrals: true,
    financingCalculator: false  // Phase 2
  },
  
  // ============================================
  // ADVERTISING CONFIGURATION
  // ============================================
  ads: {
    enabled: true,
    
    slots: [
      // Slot 1: Top Sidebar Banner
      {
        id: "sidebar-top",
        type: "banner",
        advertiser: "Home Hardware Ottawa",
        imageUrl: null,  // Add banner creative
        linkUrl: "https://www.homehardware.ca/store-finder",
        ctaText: "🇨🇦 Shop Home Hardware Ottawa - Member Pricing",
        active: true
      },
      
      // Slot 2: Post-Calculation Banner
      {
        id: "result-banner",
        type: "banner",
        advertiser: "Emco Corporation",
        imageUrl: null,
        linkUrl: "https://www.emcocorp.com/",
        ctaText: "🚰 Quality Fixtures at Emco Ottawa - Trade Pricing Available",
        active: true
      },
      
      // Slot 3: Footer Sponsor
      {
        id: "footer-sponsor",
        type: "text",
        advertiser: "Tile Warehouse Ottawa",
        text: "Tile materials featured in partnership with Tile Warehouse Ottawa",
        linkUrl: "https://tilewarehouse.ca/",
        active: true
      }
    ],
    
    // Future advertisers to approach
    targetAdvertisers: [
      "Costco Ottawa (bathroom vanities)",
      "Lighting by Design Ottawa",
      "GreenSky Canada (financing)",
      "Local Ottawa contractors"
    ]
  },
  
  // ============================================
  // LEAD CAPTURE & CRM
  // ============================================
  integration: {
    type: "wix-embed",
    domain: "homeupgraders.wixsite.com/helpottawa",
    leadWebhook: null,  // Add if you set up email automation
    analyticsId: null,   // Add Google Analytics ID
    facebookPixel: null  // Add for retargeting
  },
  
  // ============================================
  // SEASONAL ADJUSTMENTS (Ottawa-specific)
  // ============================================
  seasonalNotes: {
    spring: "Peak renovation season in Ottawa. Book contractors early!",
    summer: "Best time for bathroom renos - no heating concerns during construction.",
    fall: "Good pricing as season winds down. Complete before holidays.",
    winter: "Slowest season - potentially better contractor rates, but plan for heating during construction."
  },
  
  // ============================================
  // OTTAWA PERMIT INFORMATION
  // ============================================
  permitInfo: {
    required: "Most bathroom renovations in Ottawa require a building permit if plumbing or electrical work is involved.",
    cost: "$200-500 depending on scope",
    timeline: "2-4 weeks for approval",
    contactUrl: "https://ottawa.ca/en/living-ottawa/laws-licences-and-permits/building-and-renovating",
    notes: "Always check with City of Ottawa before starting major work."
  },
  
  // ============================================
  // CUSTOM MESSAGES
  // ============================================
  customMessages: {
    welcome: "🇨🇦 Welcome to HelpOttawa.ca's Bathroom Renovation Calculator!\n\nWe've calibrated this calculator specifically for Ottawa pricing and connected you with trusted local suppliers and Canadian manufacturers.",
    
    afterCalculation: "Your estimate is based on current Ottawa market rates.\n\n💡 Want to support Canadian manufacturers? We've highlighted Canadian-made options.\n\n📍 Ready to shop locally? Check out our Ottawa supplier directory below.\n\n💬 Need a contractor referral? Contact us and we'll connect you with trusted Ottawa professionals.",
    
    canadianFocus: "🇨🇦 This calculator prioritizes CCMC-certified Canadian manufacturers.\n\nBy choosing Canadian products, you're supporting:\n✓ Local jobs\n✓ Higher quality standards\n✓ Reduced environmental impact\n✓ Canadian economy",
    
    contactCTA: "Have questions? Email helpottawa@gmail.com or call 613-314-7926"
  }
};

// ============================================
// EXPORT FOR USE IN CALCULATOR
// ============================================
export default helpOttawaConfig;

// ============================================
// USAGE INSTRUCTIONS
// ============================================
/*
To use this configuration:

1. Copy this file to your project
2. Update YOUR_LOGO_URL_HERE with your actual logo URL
3. Import into the white-label calculator:

   import helpOttawaConfig from './helpOttawaConfig.js';
   
4. Pass to calculator component:

   <BathroomCalculatorWhiteLabel config={helpOttawaConfig} />

5. Deploy to Vercel/Netlify

6. Embed in Wix site:

   <iframe 
     src="YOUR_DEPLOYED_URL" 
     width="100%" 
     height="1500px"
     frameborder="0"
   ></iframe>

*/