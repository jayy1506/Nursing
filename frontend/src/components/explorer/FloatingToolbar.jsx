import React from 'react';
import { 
  RotateCw, 
  ZoomIn, 
  Focus, 
  Scissors, 
  Layers, 
  Columns2, 
  RotateCcw 
} from 'lucide-react';

export const FloatingToolbar = ({
  activeTool,
  onSelectTool,
  clippingY,
  onClippingChange,
  activeLayers,
  onToggleLayer,
  onReset,
  onOpenCompare,
  layersList = []
}) => {
  const tools = [
    { id: 'rotate', label: 'Rotate', icon: RotateCw },
    { id: 'zoom', label: 'Zoom', icon: ZoomIn },
    { id: 'isolate', label: 'Isolate', icon: Focus },
    { id: 'crossSection', label: 'Cross-sec', icon: Scissors },
    { id: 'layers', label: 'Layers', icon: Layers },
    { id: 'compare', label: 'Compare', icon: Columns2 },
    { id: 'reset', label: 'Reset', icon: RotateCcw },
  ];

  const handleToolClick = (toolId) => {
    if (toolId === 'reset') {
      onReset && onReset();
      return;
    }
    if (toolId === 'compare') {
      onOpenCompare && onOpenCompare();
      return;
    }
    onSelectTool && onSelectTool(activeTool === toolId ? null : toolId);
  };

  return (
    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border border-[#159A91]/20 shadow-lg shadow-[#123B50]/10">
      {tools.map((t) => {
        const Icon = t.icon;
        const isActive = activeTool === t.id;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => handleToolClick(t.id)}
            className={`w-12 py-2 flex flex-col items-center justify-center rounded-xl transition-all cursor-pointer ${
              isActive
                ? 'bg-[#159A91] text-white shadow-xs'
                : 'text-[#123B50] hover:text-[#159A91] hover:bg-[#E9F5F3]'
            }`}
            title={t.label}
          >
            <Icon className="w-4 h-4 mb-0.5" />
            <span className="font-serif text-[9px] font-bold tracking-tight">
              {t.label}
            </span>
          </button>
        );
      })}

      {/* Cross-Section Slider Sub-popover */}
      {activeTool === 'crossSection' && (
        <div className="absolute left-16 top-28 bg-white p-4 rounded-2xl border border-[#159A91]/30 shadow-xl w-52 z-30 animate-in fade-in slide-in-from-left-2 duration-150">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#123B50]">
              Section Plane
            </span>
            <span className="text-[10px] font-bold text-[#159A91]">
              {Math.round((clippingY + 1) * 50)}%
            </span>
          </div>
          <input
            type="range"
            min="-0.9"
            max="1.2"
            step="0.05"
            value={clippingY}
            onChange={(e) => onClippingChange && onClippingChange(parseFloat(e.target.value))}
            className="w-full accent-[#159A91] cursor-pointer"
          />
          <div className="flex justify-between text-[9px] text-[#263746] mt-1 font-semibold">
            <span>Deep Internal</span>
            <span>Surface</span>
          </div>
        </div>
      )}

      {/* Layers Toggle Sub-popover */}
      {activeTool === 'layers' && (
        <div className="absolute left-16 top-36 bg-white p-4 rounded-2xl border border-[#159A91]/30 shadow-xl w-56 z-30 space-y-2 animate-in fade-in slide-in-from-left-2 duration-150">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#123B50] block border-b border-[#E9F5F3] pb-1">
            Anatomical Layers
          </span>
          {layersList.map((l) => (
            <label key={l.id} className="flex items-center gap-2 text-xs font-bold text-[#263746] cursor-pointer hover:text-[#159A91]">
              <input
                type="checkbox"
                checked={activeLayers.has(l.id)}
                onChange={() => onToggleLayer && onToggleLayer(l.id)}
                className="accent-[#159A91] rounded cursor-pointer"
              />
              <span>{l.name}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
