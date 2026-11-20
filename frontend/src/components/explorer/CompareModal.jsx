import React, { useState } from 'react';
import { X, Columns2, ArrowRight } from 'lucide-react';
import heartData from '../../data/organs/heart.json';
import brainData from '../../data/organs/brain.json';
import lungsData from '../../data/organs/lungs.json';

const ORGANS_MAP = {
  heart: heartData,
  brain: brainData,
  lungs: lungsData
};

export const CompareModal = ({ primarySpecimen, onClose, onSwitchOrgan }) => {
  const [secondOrganId, setSecondOrganId] = useState(
    primarySpecimen.id === 'heart' ? 'lungs' : 'heart'
  );

  const secondarySpecimen = ORGANS_MAP[secondOrganId] || lungsData;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div
        className="bg-white max-w-4xl w-full rounded-3xl border border-neutral-200 p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <div className="flex items-center gap-2">
            <Columns2 className="w-5 h-5 text-[#159A91]" />
            <h3 className="font-serif text-xl font-bold text-[#123B50]">
              Dual Organ Anatomical Comparison
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-[#123B50] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Selector */}
        <div className="flex items-center justify-between bg-neutral-50 p-3 rounded-2xl border border-neutral-200 text-xs">
          <span className="font-bold text-[#123B50]">
            Comparing <strong>{primarySpecimen.name}</strong> against:
          </span>
          <select
            value={secondOrganId}
            onChange={(e) => setSecondOrganId(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-white border border-neutral-200 text-xs font-bold text-[#123B50] focus:outline-none"
          >
            <option value="heart">The Heart (Cardiovascular)</option>
            <option value="brain">The Brain (Nervous System)</option>
            <option value="lungs">The Lungs (Respiratory)</option>
          </select>
        </div>

        {/* Split View Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Organ 1 */}
          <div className="bg-neutral-50/50 rounded-3xl p-5 border border-neutral-200 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{primarySpecimen.thumbnail}</span>
              <div>
                <span className="text-[10px] font-black uppercase text-[#159A91]">
                  {primarySpecimen.system}
                </span>
                <h4 className="font-serif text-xl font-bold text-[#123B50]">
                  {primarySpecimen.name}
                </h4>
              </div>
            </div>

            <p className="text-xs text-[#263746] leading-relaxed">
              {primarySpecimen.description}
            </p>

            <div className="space-y-1.5 pt-2 border-t border-neutral-200/80 text-xs">
              <span className="font-bold text-[#123B50] block mb-1">Key Metrics:</span>
              {primarySpecimen.keyFacts?.slice(0, 4).map((f, i) => (
                <div key={i} className="flex justify-between py-0.5 border-b border-neutral-100">
                  <span className="text-neutral-500">{f.label}</span>
                  <span className="font-bold text-[#123B50]">{f.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Organ 2 */}
          <div className="bg-neutral-50/50 rounded-3xl p-5 border border-neutral-200 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{secondarySpecimen.thumbnail}</span>
              <div>
                <span className="text-[10px] font-black uppercase text-[#159A91]">
                  {secondarySpecimen.system}
                </span>
                <h4 className="font-serif text-xl font-bold text-[#123B50]">
                  {secondarySpecimen.name}
                </h4>
              </div>
            </div>

            <p className="text-xs text-[#263746] leading-relaxed">
              {secondarySpecimen.description}
            </p>

            <div className="space-y-1.5 pt-2 border-t border-neutral-200/80 text-xs">
              <span className="font-bold text-[#123B50] block mb-1">Key Metrics:</span>
              {secondarySpecimen.keyFacts?.slice(0, 4).map((f, i) => (
                <div key={i} className="flex justify-between py-0.5 border-b border-neutral-100">
                  <span className="text-neutral-500">{f.label}</span>
                  <span className="font-bold text-[#123B50]">{f.value}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                onSwitchOrgan && onSwitchOrgan(secondarySpecimen.id);
                onClose();
              }}
              className="w-full mt-3 py-2.5 rounded-xl bg-[#159A91] hover:bg-[#12837B] text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Load {secondarySpecimen.name} into 3D Stage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
