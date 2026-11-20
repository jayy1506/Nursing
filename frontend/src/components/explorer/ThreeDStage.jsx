import React, { useEffect, useRef, useState } from 'react';
import { 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Scissors, 
  Layers, 
  Split, 
  Eye, 
  RefreshCw,
  X
} from 'lucide-react';

const COLOR_MAP = {
  red: '#DC2626',
  blue: '#2563EB',
  orange: '#D97706',
  purple: '#159A91', // Mapped to MedPulse Teal
  teal: '#159A91',
  green: '#16A34A'
};

export const ThreeDStage = ({
  specimen,
  activePartId,
  onSelectPart,
  hoveredPartId,
  onHoverPart,
  onOpenCompare,
  isAnimatePlaying = false
}) => {
  const [autoRotate, setAutoRotate] = useState(true);
  const [rotationY, setRotationY] = useState(0);
  const [rotationX, setRotationX] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [tipDismissed, setTipDismissed] = useState(false);
  const [activeTool, setActiveTool] = useState(null);

  // Auto-rotation effect
  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setRotationY((prev) => (prev + 0.4) % 360);
    }, 45);
    return () => clearInterval(interval);
  }, [autoRotate]);

  // Handle Drag to Rotate
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setAutoRotate(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    setRotationY((prev) => (prev + deltaX * 0.5) % 360);
    setRotationX((prev) => Math.min(Math.max(prev - deltaY * 0.3, -25), 25));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle Wheel to Zoom
  const handleWheel = (e) => {
    e.preventDefault();
    setZoomLevel((prev) => {
      const next = prev - e.deltaY * 0.001;
      return Math.min(Math.max(next, 0.8), 1.5);
    });
  };

  const handleReset = () => {
    setZoomLevel(1);
    setRotationY(0);
    setRotationX(0);
    setAutoRotate(true);
    setActiveTool(null);
    onSelectPart(null);
  };

  // Specimen image
  const specimenImg = `/images/explorer/${specimen.id}_model.png`;
  const fallbackImg = `/images/explorer/${specimen.id}_specimen.jpg`;

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      className="relative w-full h-[520px] rounded-3xl bg-white border border-neutral-200/90 shadow-sm overflow-hidden select-none flex flex-col justify-between p-4 cursor-grab active:cursor-grabbing"
      style={{
        backgroundImage: 'radial-gradient(circle at 50% 48%, #E9F5F3 0%, #FFFFFF 68%)'
      }}
    >
      {/* 1. Floating Vertical Toolbar on Left */}
      <div
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-neutral-200/90 p-1.5 shadow-sm space-y-1 flex flex-col items-center">
          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            className={`w-9 h-9 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer ${
              autoRotate ? 'bg-[#E9F5F3] text-[#159A91]' : 'hover:bg-neutral-50 text-[#123B50]'
            }`}
            title="Auto Rotate"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span className="text-[7px] font-bold mt-0.5">Rotate</span>
          </button>

          <button
            type="button"
            onClick={() => setZoomLevel((prev) => Math.min(prev + 0.15, 1.5))}
            className="w-9 h-9 rounded-xl hover:bg-neutral-50 text-[#123B50] hover:text-[#159A91] flex flex-col items-center justify-center transition-all cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
            <span className="text-[7px] font-bold mt-0.5">Zoom</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTool(activeTool === 'isolate' ? null : 'isolate')}
            className={`w-9 h-9 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer ${
              activeTool === 'isolate' ? 'bg-[#E9F5F3] text-[#159A91]' : 'hover:bg-neutral-50 text-[#123B50]'
            }`}
            title="Isolate Part"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="text-[7px] font-bold mt-0.5">Isolate</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTool(activeTool === 'cross-sec' ? null : 'cross-sec')}
            className={`w-9 h-9 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer ${
              activeTool === 'cross-sec' ? 'bg-[#E9F5F3] text-[#159A91]' : 'hover:bg-neutral-50 text-[#123B50]'
            }`}
            title="Cross Section"
          >
            <Scissors className="w-3.5 h-3.5" />
            <span className="text-[7px] font-bold mt-0.5">Cross-sec</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTool(activeTool === 'layers' ? null : 'layers')}
            className={`w-9 h-9 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer ${
              activeTool === 'layers' ? 'bg-[#E9F5F3] text-[#159A91]' : 'hover:bg-neutral-50 text-[#123B50]'
            }`}
            title="Tissue Layers"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="text-[7px] font-bold mt-0.5">Layers</span>
          </button>

          <button
            type="button"
            onClick={onOpenCompare}
            className="w-9 h-9 rounded-xl hover:bg-neutral-50 text-[#123B50] hover:text-[#159A91] flex flex-col items-center justify-center transition-all cursor-pointer"
            title="Compare Organs"
          >
            <Split className="w-3.5 h-3.5" />
            <span className="text-[7px] font-bold mt-0.5">Compare</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="w-9 h-9 rounded-xl hover:bg-neutral-50 text-[#123B50] hover:text-[#159A91] flex flex-col items-center justify-center transition-all cursor-pointer"
            title="Reset View"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="text-[7px] font-bold mt-0.5">Reset</span>
          </button>
        </div>
      </div>

      {/* 2. Yellow Sticky-Note Tip (Top Right) */}
      {!tipDismissed && (
        <div className="absolute top-4 right-4 z-20 max-w-[210px] bg-[#FFFBEB] border border-[#F2B66D] rounded-2xl p-3 shadow-sm transform rotate-1 hover:rotate-0 transition-transform">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[9px] font-black text-[#78350F] uppercase tracking-wider flex items-center gap-1 font-sans">
              <span>✦</span> CLINICAL GUIDE
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setTipDismissed(true);
              }}
              className="text-[#78350F]/70 hover:text-[#78350F] text-xs cursor-pointer p-0.5"
            >
              ✕
            </button>
          </div>
          <p className="text-[11px] text-[#78350F] font-medium leading-tight">
            Drag to rotate, Scroll to zoom. Click any hotspot to explore clinical anatomy.
          </p>
        </div>
      )}

      {/* 3. Center 3D Specimen Stage */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden">
        
        {/* MedPulse Clinical Pedestal Plinth with Soft Contact Shadow */}
        <div
          className="absolute bottom-5 w-[300px] h-[52px] rounded-[50%] bg-[#E9F5F3] border border-[#159A91]/30 shadow-inner transition-transform"
          style={{
            boxShadow: '0 16px 32px rgba(18, 59, 80, 0.12), inset 0 2px 4px rgba(255, 255, 255, 0.8)'
          }}
        >
          {/* Radial contact shadow beneath specimen */}
          <div className="absolute inset-x-8 -top-3 h-5 rounded-[50%] bg-[#123B50]/15 blur-sm" />
        </div>

        {/* 3D Specimen Container with Rotation, Zoom & Pulse */}
        <div
          className={`relative z-10 transition-transform duration-75 ease-out ${
            isAnimatePlaying ? 'animate-pulse' : ''
          }`}
          style={{
            transform: `scale(${zoomLevel}) rotateX(${rotationX}deg) rotateY(${rotationY * 0.4}deg)`,
            transformStyle: 'preserve-3d'
          }}
        >
          <img
            src={specimenImg}
            alt={specimen.name}
            className="max-h-[320px] w-auto object-contain drop-shadow-2xl pointer-events-none select-none transition-all"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = fallbackImg;
            }}
          />

          {/* Interactive Glowing Hotspot Dots */}
          {specimen.parts && specimen.parts.map((part, idx) => {
            const posX = 50 + (part.position ? part.position[0] * 68 : 0);
            const posY = 45 - (part.position ? part.position[1] * 68 : 0);
            const isSelected = activePartId === part.id;
            const isHovered = hoveredPartId === part.id;
            const dotColor = COLOR_MAP[part.color] || '#159A91';

            return (
              <div
                key={part.id || idx}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30 group cursor-pointer"
                style={{
                  left: `${Math.min(Math.max(posX, 15), 85)}%`,
                  top: `${Math.min(Math.max(posY, 15), 82)}%`
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectPart(part.id);
                }}
                onMouseEnter={() => onHoverPart && onHoverPart(part.id)}
                onMouseLeave={() => onHoverPart && onHoverPart(null)}
              >
                {/* Glowing Outer Ring with White Center */}
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center transition-all duration-200 ${
                    isSelected
                      ? 'ring-4 ring-white bg-[#159A91] scale-125 shadow-lg'
                      : isHovered
                      ? 'ring-2 ring-white scale-110 shadow-md'
                      : 'ring-2 ring-white/95 shadow-sm'
                  }`}
                  style={{ backgroundColor: dotColor }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white shadow-2xs" />
                </div>

                {/* Hotspot Tooltip */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 px-2.5 py-1 rounded-xl bg-[#123B50]/95 text-white text-[11px] font-sans font-bold whitespace-nowrap shadow-lg pointer-events-none transition-all ${
                    isSelected || isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                >
                  <span>• {part.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Bottom Controls: Specimen Latin Caption (Left) & Auto Rotate Toggle (Right) */}
      <div className="relative z-20 flex items-center justify-between pt-2 border-t border-neutral-100 px-1 pointer-events-auto">
        {/* Bottom Left: Nomenclature */}
        <div>
          <span className="text-[9px] font-black uppercase tracking-widest text-[#159A91] block">
            3D SPECIMEN · CLICK A HOTSPOT TO EXPLORE
          </span>
          <span className="font-serif italic text-lg font-black text-[#123B50]">
            {specimen.latinName || specimen.tag || 'Organum'}
          </span>
        </div>

        {/* Bottom Right: Auto Rotate Toggle Switch */}
        <div
          className="flex items-center gap-2 bg-neutral-50 border border-neutral-200 px-3 py-1.5 rounded-full shadow-2xs"
          onClick={(e) => e.stopPropagation()}
        >
          <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'text-[#159A91] animate-spin' : 'text-neutral-400'}`} />
          <span className="text-xs font-bold text-[#123B50]">Auto rotate</span>
          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            className={`w-8 h-4 rounded-full p-0.5 transition-colors cursor-pointer ${
              autoRotate ? 'bg-[#159A91]' : 'bg-neutral-300'
            }`}
          >
            <div
              className={`w-3 h-3 rounded-full bg-white shadow-xs transition-transform ${
                autoRotate ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
