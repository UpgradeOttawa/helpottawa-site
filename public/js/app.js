/* Eastern Ontario Hazard Map - client/js/app.js */
(() => {
  const DEFAULT_CENTER = [45.428, -75.59];
  const DEFAULT_ZOOM = 11;

  const DATA = {
    regions: "/hazard-map/data/orleans_regions.geojson",     // 84 features (your current file)
    companies: "/hazard-map/data/companies_demo.json",
    eras: "/hazard-map/data/era_coefficients.json"
  };

  // ---------- Map ----------
  const map = L.map("map", { preferCanvas: true }).setView(DEFAULT_CENTER, DEFAULT_ZOOM);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // ---------- Layer containers ----------
  const layers = {
    heat: null,
    regions: L.layerGroup().addTo(map),
    companies: L.layerGroup().addTo(map),
    submissions: L.layerGroup().addTo(map)
  };

  // heat points are [lat, lng, intensity]
  let heatPoints = [];

  // region geojson cache
  let regionsGeo = null;
  let eras = [];
  let activeEraId = "all";
  let minCoeff = 0;

  // Hazard selection (top bar + panel)
  let activeHazard = "asbestos";

  // ---------- Utilities ----------
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  function readJson(url) {
    return fetch(url, { cache: "no-store" }).then(r => {
      if (!r.ok) throw new Error(url + " -> HTTP " + r.status);
      return r.json();
    });
  }

  // Approx centroid for polygon (good enough for heat seeding)
  function polygonCentroid(coords) {
    // coords: [ [lng,lat], ... ] for a ring OR multipolygon handling elsewhere
    let x = 0, y = 0, n = 0;
    for (const p of coords) { x += p[0]; y += p[1]; n++; }
    if (!n) return null;
    return [y / n, x / n];
  }

  function featureCentroid(feature) {
    const g = feature.geometry;
    if (!g) return null;

    if (g.type === "Polygon") {
      const ring = (g.coordinates && g.coordinates[0]) || [];
      return polygonCentroid(ring);
    }
    if (g.type === "MultiPolygon") {
      const poly0 = (g.coordinates && g.coordinates[0] && g.coordinates[0][0]) || [];
      return polygonCentroid(poly0);
    }
    return null;
  }

  // meters -> lat/lng offset (approx, good for small jitter distances)
  function metersToLat(m) { return m / 111320; }
  function metersToLng(m, lat) { return m / (111320 * Math.cos(lat * Math.PI / 180)); }

  function jitterAround(lat, lng, count, radiusMeters) {
    const pts = [];
    for (let i = 0; i < count; i++) {
      const r = Math.random() * radiusMeters;
      const a = Math.random() * Math.PI * 2;
      const dx = Math.cos(a) * r;
      const dy = Math.sin(a) * r;
      const jLat = lat + metersToLat(dy);
      const jLng = lng + metersToLng(dx, lat);
      pts.push([jLat, jLng]);
    }
    return pts;
  }

  // ---------- Heat control ----------
  function rebuildHeatLayer() {
    if (layers.heat) { map.removeLayer(layers.heat); layers.heat = null; }

    const filtered = heatPoints.filter(p => p[2] >= minCoeff);
    layers.heat = L.heatLayer(filtered, {
      radius: 36,
      blur: 26,
      maxZoom: 17,
      // gradient is default; keep it simple for now
    });

    // only add if toggleHeat is ON
    const t = document.getElementById("toggleHeat");
    if (t && t.checked) layers.heat.addTo(map);
  }

  // ---------- Regions rendering ----------
  function styleFeature(feature) {
    const base = Number(feature?.properties?.risk_coefficient ?? 0);
    // show outlines even when base is low
    const w = base > 0.25 ? 2.5 : 1.4;
    const o = base > 0.25 ? 0.9 : 0.55;
    return {
      color: "rgba(200,220,255," + o + ")",
      weight: w,
      fillOpacity: 0.06
    };
  }

  function drawRegions(geo) {
    layers.regions.clearLayers();

    const layer = L.geoJSON(geo, {
      style: styleFeature,
      onEachFeature: (f, l) => {
        const fsa = f?.properties?.fsa || "";
        const label = f?.properties?.name || fsa || "Region";
        const coeff = Number(f?.properties?.risk_coefficient ?? 0).toFixed(2);
        l.bindPopup("<b>" + label + "</b><br/>Coeff: " + coeff);
      }
    }).addTo(layers.regions);

    try { map.fitBounds(layer.getBounds(), { padding: [20, 20] }); } catch (e) {}
  }

  // ---------- Companies (demo markers) ----------
  function drawCompanies(companies) {
    layers.companies.clearLayers();
    for (const c of companies || []) {
      if (!c.lat || !c.lng) continue;
      const m = L.circleMarker([c.lat, c.lng], { radius: 6, weight: 2, fillOpacity: 0.7 });
      m.bindPopup("<b>" + (c.name || "Company") + "</b><br/>" + (c.category || ""));
      m.addTo(layers.companies);
    }
  }

  // ---------- Submissions (local only, privacy scatter) ----------
  function loadLocalSubmissions() {
    try {
      const raw = localStorage.getItem("hazard_submissions_v1");
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  }

  function saveLocalSubmissions(rows) {
    try { localStorage.setItem("hazard_submissions_v1", JSON.stringify(rows)); } catch {}
  }

  function addScatteredSubmission(lat, lng, strength) {
    const pts = jitterAround(lat, lng, 24, 180); // 24 points within 180m
    for (const [a, b] of pts) {
      heatPoints.push([a, b, clamp(strength * (0.55 + Math.random() * 0.6), 0, 1)]);
    }
    rebuildHeatLayer();
  }

  function drawSubmissionMarkers(lat, lng) {
    // we still show a SINGLE marker for you (optional), but NOT used for heat intensity
    const marker = L.circleMarker([lat, lng], { radius: 5, weight: 2, fillOpacity: 0.8 });
    marker.bindPopup("<b>Added (privacy-scattered)</b><br/>Heat was scattered around this area.");
    marker.addTo(layers.submissions);
  }

  function submitPoint(lat, lng, hazard, strength) {
    const rows = loadLocalSubmissions();
    rows.push({
      ts: new Date().toISOString(),
      hazard,
      strength,
      lat,
      lng
    });
    saveLocalSubmissions(rows);

    // Apply neighborhood heat
    addScatteredSubmission(lat, lng, strength);

    // Visual marker (optional)
    drawSubmissionMarkers(lat, lng);
  }

  // ---------- Era baseline seeding (kept simple / non-invasive) ----------
  // NOTE: You asked for "homes older than 1986" seeding. We don't have house-age data yet.
  // This seeds a LIGHT baseline so the map isn't dead, but submissions will dominate.
  function seedBaselineFromRegions() {
    if (!regionsGeo?.features?.length) return;
    // clear previous region-based baseline points
    heatPoints = heatPoints.filter(p => p._tag !== "baseline");

    // era coeff multiplier (if present)
    let eraMult = 1.0;
    if (activeEraId !== "all") {
      const e = eras.find(x => x.era_id === activeEraId);
      if (e && typeof e.baseline_coeff === "number") eraMult = e.baseline_coeff;
    }

    for (const f of regionsGeo.features) {
      const c = featureCentroid(f);
      if (!c) continue;

      const base = Number(f?.properties?.risk_coefficient ?? 0);
      const intensity = clamp((0.08 + base) * eraMult, 0, 1);

      const p = [c[0], c[1], intensity];
      // tag it so we can remove/replace later
      p._tag = "baseline";
      heatPoints.push(p);
    }
  }

  // ---------- UI wiring ----------
  function safeGet(id) { return document.getElementById(id); }

  function wireToggle(id, layerKey) {
    const el = safeGet(id);
    if (!el) return;
    el.addEventListener("change", () => {
      const on = el.checked;
      const layer = layers[layerKey];
      if (!layer) return;

      if (layerKey === "heat") {
        if (on) layers.heat && layers.heat.addTo(map);
        else layers.heat && map.removeLayer(layers.heat);
        return;
      }

      if (on) layer.addTo(map);
      else map.removeLayer(layer);
    });
  }

  function wireHazardBar() {
    const pills = Array.from(document.querySelectorAll(".hazard-pill"));
    for (const p of pills) {
      p.addEventListener("click", () => {
        pills.forEach(x => x.classList.remove("active"));
        p.classList.add("active");
        activeHazard = p.getAttribute("data-hazard") || "asbestos";
        const s = safeGet("hazardSelect");
        if (s) s.value = activeHazard;
        // for now hazard changes only affects how we label submissions
      });
    }
  }

  function wireFilters() {
    const eraSel = safeGet("eraSelect");
    const min = safeGet("minCoeff");
    if (eraSel) {
      eraSel.addEventListener("change", () => {
        activeEraId = eraSel.value || "all";
        seedBaselineFromRegions();
        rebuildHeatLayer();
      });
    }
    if (min) {
      min.addEventListener("input", () => {
        minCoeff = Number(min.value || 0);
        rebuildHeatLayer();
      });
    }
  }

  function restoreLocalMarkers() {
    layers.submissions.clearLayers();
    const rows = loadLocalSubmissions().filter(r => r && r.lat && r.lng);
    for (const r of rows) {
      // show marker, but we don't re-add heat here (baseline + new entries will show)
      drawSubmissionMarkers(r.lat, r.lng);
    }
  }

  // map click test mode -> add scattered heat
  map.on("click", (e) => {
    const strength = Number(safeGet("strengthSelect")?.value || 0.85);
    submitPoint(e.latlng.lat, e.latlng.lng, activeHazard, strength);
  });

  // expose a small API for submit.js
  window.HAZARD_APP = {
    submitPoint
  };

  // ---------- Boot ----------
  Promise.all([
    readJson(DATA.regions),
    readJson(DATA.companies).catch(() => []),
    readJson(DATA.eras).catch(() => [])
  ]).then(([geo, companies, erasJson]) => {
    regionsGeo = geo;
    eras = Array.isArray(erasJson) ? erasJson : [];

    // Populate era select
    const eraSel = safeGet("eraSelect");
    if (eraSel) {
      eraSel.innerHTML = "";
      const optAll = document.createElement("option");
      optAll.value = "all";
      optAll.textContent = "All eras";
      eraSel.appendChild(optAll);

      for (const e of eras.sort((a,b) => (a.sort_order||0)-(b.sort_order||0))) {
        const o = document.createElement("option");
        o.value = e.era_id;
        o.textContent = e.label || e.era_id;
        eraSel.appendChild(o);
      }
      eraSel.value = "all";
    }

    drawRegions(geo);
    drawCompanies(companies);

    seedBaselineFromRegions();
    rebuildHeatLayer();

    // wire toggles
    wireToggle("toggleHeat", "heat");
    wireToggle("toggleRegions", "regions");
    wireToggle("toggleCompanies", "companies");
    wireToggle("toggleSubmissions", "submissions");

    wireHazardBar();
    wireFilters();
    restoreLocalMarkers();
  }).catch(err => {
    console.error("BOOT ERROR:", err);
    alert("Boot error: " + err.message);
  });
})();
