import React, { useState, useRef, useEffect } from 'react';
import { Move, RotateCw, Trash2, Plus, Download, Calculator, Eye } from 'lucide-react';

/**
 * BATHROOM VISUAL DESIGNER V2
 * Interactive 2D floor plan with drag-drop fixtures
 * Dynamic room sizing
 * Cost integration
 * Export to PDF/image
 */

const BathroomVisualDesigner = () => {
  // Room dimensions (in feet)
  const [roomWidth, setRoomWidth] = useState(9);
  const [roomHeight, setRoomHeight] = useState(5);
  
  // Fixtures in the room
  const [fixtures, setFixtures] = useState([
    { id: 'toilet-1', type: 'toilet', x: 1, y: 0.5, width: 1.5, depth: 2.5, rotation: 0, cost: 400 },
    { id: 'vanity-1', type: 'vanity', x: 6, y: 0, width: 3, depth: 1.75, rotation: 0, cost: 900 },
    { id: 'shower-1', type: 'shower', x: 0, y: 2, width: 3, depth: 3, rotation: 0, cost: 1200 },
  ]);
  
  // Available fixtures library
  const fixtureLibrary = [
    { type: 'toilet', name: 'Toilet', width: 1.5, depth: 2.5, color: '#e8f4f8', icon: '🚽', cost: 400 },
    { type: 'vanity', name: 'Vanity 36"', width: 3, depth: 1.75, color: '#fff4e6', icon: '🚰', cost: 900 },
    { type: 'vanity-48', name: 'Vanity 48"', width: 4, depth: 1.75, color: '#fff4e6', icon: '🚰', cost: 1300 },
    { type: 'shower', name: 'Shower 36x36', width: 3, depth: 3, color: '#e3f2fd', icon: '🚿', cost: 1200 },
    { type: 'tub', name: 'Bathtub 60"', width: 5, depth: 2.5, color: '#e8f5e9', icon: '🛁', cost: 1400 },
    { type: 'sink', name: 'Sink', width: 1.5, depth: 1.5, color: '#f3e5f5', icon: '🚰', cost: 250 },
    { type: 'washer', name: 'Washer/Dryer', width: 2.5, depth: 2.5, color: '#fce4ec', icon: '🧺', cost: 0 },
  ];
  
  // View state
  const [selectedFixture, setSelectedFixture] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showCosts, setShowCosts] = useState(true);
  const [view3D, setView3D] = useState(false);
  
  // Canvas ref
  const canvasRef = useRef(null);
  
  // Scale factor (pixels per foot)
  const scale = 50;
  
  // Add fixture to room
  const addFixture = (fixtureType) => {
    const fixture = fixtureLibrary.find(f => f.type === fixtureType);
    const newFixture = {
      id: `${fixtureType}-${Date.now()}`,
      type: fixtureType,
      x: roomWidth / 2 - fixture.width / 2,
      y: roomHeight / 2 - fixture.depth / 2,
      width: fixture.width,
      depth: fixture.depth,
      rotation: 0,
      cost: fixture.cost,
    };
    setFixtures([...fixtures, newFixture]);
  };
  
  // Remove fixture
  const removeFixture = (id) => {
    setFixtures(fixtures.filter(f => f.id !== id));
    if (selectedFixture === id) setSelectedFixture(null);
  };
  
  // Rotate fixture
  const rotateFixture = (id) => {
    setFixtures(fixtures.map(f => 
      f.id === id ? { ...f, rotation: (f.rotation + 90) % 360 } : f
    ));
  };
  
  // Handle drag
  const handleMouseDown = (id, e) => {
    setSelectedFixture(id);
    setIsDragging(true);
  };
  
  const handleMouseMove = (e) => {
    if (!isDragging || !selectedFixture) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;
    
    setFixtures(fixtures.map(f => 
      f.id === selectedFixture ? { 
        ...f, 
        x: Math.max(0, Math.min(roomWidth - f.width, x - f.width / 2)),
        y: Math.max(0, Math.min(roomHeight - f.depth, y - f.depth / 2))
      } : f
    ));
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  // Calculate total cost
  const totalCost = fixtures.reduce((sum, f) => sum + f.cost, 0);
  
  // Get fixture info
  const getFixtureInfo = (type) => {
    return fixtureLibrary.find(f => f.type === type) || {};
  };
  
  // Export design
  const exportDesign = () => {
    const designData = {
      roomWidth,
      roomHeight,
      fixtures: fixtures.map(f => ({
        type: f.type,
        position: { x: f.x, y: f.y },
        rotation: f.rotation,
      })),
      totalCost,
      squareFeet: roomWidth * roomHeight,
    };
    
    const blob = new Blob([JSON.stringify(designData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bathroom-design.json';
    a.click();
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">Bathroom Visual Designer</h1>
              <p className="text-slate-600">Design your bathroom layout • See costs in real-time</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-500 mb-1">Total Fixtures Cost</div>
              <div className="text-4xl font-bold text-indigo-600">${totalCost.toLocaleString()}</div>
              <div className="text-sm text-slate-500 mt-1">{roomWidth}' × {roomHeight}' = {(roomWidth * roomHeight).toFixed(0)} sq ft</div>
            </div>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Controls */}
          <div className="lg:col-span-1 space-y-4">
            {/* Room Dimensions */}
            <div className="bg-white rounded-xl shadow-lg p-5">
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Move className="w-5 h-5" />
                Room Size
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-2">
                    Width: {roomWidth}'
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="15"
                    step="0.5"
                    value={roomWidth}
                    onChange={(e) => setRoomWidth(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-2">
                    Depth: {roomHeight}'
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="15"
                    step="0.5"
                    value={roomHeight}
                    onChange={(e) => setRoomHeight(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
                
                <div className="pt-2 border-t border-slate-200">
                  <div className="text-sm text-slate-600">
                    <div>Square Feet: <span className="font-semibold">{(roomWidth * roomHeight).toFixed(1)}</span></div>
                    <div className="text-xs text-slate-500 mt-1">
                      {roomWidth * roomHeight < 35 ? 'Small bathroom' : 
                       roomWidth * roomHeight < 75 ? 'Medium bathroom' : 
                       roomWidth * roomHeight < 120 ? 'Large bathroom' : 'Extra large bathroom'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Fixture Library */}
            <div className="bg-white rounded-xl shadow-lg p-5">
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add Fixtures
              </h3>
              
              <div className="grid grid-cols-1 gap-2">
                {fixtureLibrary.map((fixture) => (
                  <button
                    key={fixture.type}
                    onClick={() => addFixture(fixture.type)}
                    className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-indigo-50 rounded-lg transition-colors text-left group"
                  >
                    <span className="text-2xl">{fixture.icon}</span>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-800">{fixture.name}</div>
                      <div className="text-xs text-slate-500">{fixture.width}' × {fixture.depth}'</div>
                    </div>
                    <div className="text-sm font-semibold text-indigo-600 group-hover:text-indigo-700">
                      ${fixture.cost}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Actions */}
            <div className="bg-white rounded-xl shadow-lg p-5">
              <h3 className="font-semibold text-slate-800 mb-4">Actions</h3>
              
              <div className="space-y-2">
                <button
                  onClick={exportDesign}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Export Design
                </button>
                
                <button
                  onClick={() => setShowCosts(!showCosts)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                >
                  <Calculator className="w-4 h-4" />
                  {showCosts ? 'Hide' : 'Show'} Costs
                </button>
                
                <button
                  onClick={() => setFixtures([])}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All
                </button>
              </div>
            </div>
          </div>
          
          {/* Center - Canvas */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-800">Floor Plan View</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setView3D(!view3D)}
                    className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                      view3D ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    <Eye className="w-4 h-4" />
                    {view3D ? '3D View' : '2D View'}
                  </button>
                </div>
              </div>
              
              {/* Canvas */}
              <div className="relative bg-slate-50 rounded-lg overflow-hidden border-2 border-slate-200">
                <svg
                  ref={canvasRef}
                  width={roomWidth * scale}
                  height={roomHeight * scale}
                  className="cursor-move"
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  {/* Grid */}
                  <defs>
                    <pattern id="grid" width={scale} height={scale} patternUnits="userSpaceOnUse">
                      <path d={`M ${scale} 0 L 0 0 0 ${scale}`} fill="none" stroke="#e2e8f0" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  
                  {/* Room outline */}
                  <rect
                    x="0"
                    y="0"
                    width={roomWidth * scale}
                    height={roomHeight * scale}
                    fill="white"
                    stroke="#64748b"
                    strokeWidth="3"
                  />
                  
                  {/* Fixtures */}
                  {fixtures.map((fixture) => {
                    const info = getFixtureInfo(fixture.type);
                    const isSelected = selectedFixture === fixture.id;
                    
                    return (
                      <g key={fixture.id}>
                        {/* Fixture rectangle */}
                        <rect
                          x={fixture.x * scale}
                          y={fixture.y * scale}
                          width={fixture.width * scale}
                          height={fixture.depth * scale}
                          fill={info.color || '#e0e0e0'}
                          stroke={isSelected ? '#4f46e5' : '#94a3b8'}
                          strokeWidth={isSelected ? 3 : 2}
                          className="cursor-pointer hover:opacity-80 transition-opacity"
                          onMouseDown={(e) => handleMouseDown(fixture.id, e)}
                          transform={`rotate(${fixture.rotation} ${(fixture.x + fixture.width/2) * scale} ${(fixture.y + fixture.depth/2) * scale})`}
                        />
                        
                        {/* Fixture icon */}
                        <text
                          x={(fixture.x + fixture.width/2) * scale}
                          y={(fixture.y + fixture.depth/2) * scale}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="24"
                          className="pointer-events-none"
                        >
                          {info.icon}
                        </text>
                        
                        {/* Fixture label */}
                        <text
                          x={(fixture.x + fixture.width/2) * scale}
                          y={(fixture.y + fixture.depth + 0.3) * scale}
                          textAnchor="middle"
                          fontSize="10"
                          fill="#475569"
                          className="pointer-events-none"
                        >
                          {info.name}
                        </text>
                        
                        {/* Cost label */}
                        {showCosts && (
                          <text
                            x={(fixture.x + fixture.width/2) * scale}
                            y={(fixture.y - 0.3) * scale}
                            textAnchor="middle"
                            fontSize="10"
                            fill="#4f46e5"
                            fontWeight="600"
                            className="pointer-events-none"
                          >
                            ${fixture.cost}
                          </text>
                        )}
                        
                        {/* Control buttons (when selected) */}
                        {isSelected && (
                          <>
                            {/* Rotate button */}
                            <circle
                              cx={(fixture.x + fixture.width) * scale}
                              cy={fixture.y * scale}
                              r="12"
                              fill="#4f46e5"
                              className="cursor-pointer hover:fill-indigo-700"
                              onClick={() => rotateFixture(fixture.id)}
                            />
                            <text
                              x={(fixture.x + fixture.width) * scale}
                              y={fixture.y * scale}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              fontSize="10"
                              fill="white"
                              className="pointer-events-none"
                            >
                              ↻
                            </text>
                            
                            {/* Delete button */}
                            <circle
                              cx={fixture.x * scale}
                              cy={fixture.y * scale}
                              r="12"
                              fill="#ef4444"
                              className="cursor-pointer hover:fill-red-600"
                              onClick={() => removeFixture(fixture.id)}
                            />
                            <text
                              x={fixture.x * scale}
                              y={fixture.y * scale}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              fontSize="10"
                              fill="white"
                              className="pointer-events-none"
                            >
                              ×
                            </text>
                          </>
                        )}
                      </g>
                    );
                  })}
                  
                  {/* Dimensions */}
                  <text x={roomWidth * scale / 2} y={roomHeight * scale + 20} textAnchor="middle" fontSize="12" fill="#64748b">
                    {roomWidth}'
                  </text>
                  <text x={-10} y={roomHeight * scale / 2} textAnchor="end" fontSize="12" fill="#64748b" transform={`rotate(-90 -10 ${roomHeight * scale / 2})`}>
                    {roomHeight}'
                  </text>
                </svg>
              </div>
              
              {/* Instructions */}
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-sm text-blue-800">
                  <div className="font-semibold mb-2">💡 How to use:</div>
                  <ul className="space-y-1 text-xs">
                    <li>• Click fixtures in the library to add them to your bathroom</li>
                    <li>• Drag fixtures to move them around</li>
                    <li>• Click a fixture to select it, then use the ↻ button to rotate or × to delete</li>
                    <li>• Adjust room size with the sliders on the left</li>
                    <li>• Export your design when you're happy with the layout</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Cost Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
              <h3 className="font-semibold text-slate-800 mb-4">Cost Summary</h3>
              
              <div className="space-y-3">
                {fixtures.map((fixture) => {
                  const info = getFixtureInfo(fixture.type);
                  return (
                    <div key={fixture.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{info.icon}</span>
                        <div>
                          <div className="font-medium text-slate-800">{info.name}</div>
                          <div className="text-xs text-slate-500">{fixture.width}' × {fixture.depth}'</div>
                        </div>
                      </div>
                      <div className="font-semibold text-slate-800">${fixture.cost.toLocaleString()}</div>
                    </div>
                  );
                })}
                
                {fixtures.length === 0 && (
                  <div className="text-center py-8 text-slate-400">
                    No fixtures added yet. Add some from the library!
                  </div>
                )}
                
                <div className="pt-3 border-t-2 border-slate-200">
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-bold text-slate-800">Fixtures Total</span>
                    <span className="text-2xl font-bold text-indigo-600">${totalCost.toLocaleString()}</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-2">
                    + Installation labor, flooring, wall tile, paint, etc.
                  </div>
                  <button className="w-full mt-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors">
                    Calculate Full Project Cost →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BathroomVisualDesigner;