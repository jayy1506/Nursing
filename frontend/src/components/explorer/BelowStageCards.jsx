import React, { useState } from 'react';
import { 
  Microscope, 
  Share2, 
  Play, 
  FileText, 
  User, 
  ArrowRight, 
  Heart, 
  X,
  Sparkles
} from 'lucide-react';

export const BelowStageCards = ({
  specimen,
  onOpenQuiz,
  onOpenCompare,
  onTriggerAnimate
}) => {
  const [activeModalData, setActiveModalData] = useState(null);

  // Fallbacks for data safety
  const quoteText = specimen.quote?.text || "Learning is an act of curiosity.";
  const quoteHighlight = specimen.quote?.highlight || "Keep exploring!";

  const microTitle = specimen.microscopicView?.title || "Histological structure";
  const microImg = specimen.microscopicView?.image || `/images/explorer/${specimen.id}_microscopic.jpg`;

  const compareSubtitle = specimen.compareData?.subtitle || `${specimen.name} comparison`;
  const compareImg = specimen.compareData?.image || `/images/explorer/${specimen.id}_compare.jpg`;

  const animTitle = specimen.animation?.title || "Physiological function";
  const animPoster = specimen.animation?.poster || `/images/explorer/${specimen.id}_animation.jpg`;

  const conditionsList = specimen.conditions || [
    "Acute inflammatory state",
    "Microvascular ischemia",
    "Cellular hypertrophy",
    "Fibrotic remodeling",
    "Functional insufficiency",
    "Congenital malformation",
    "Secondary metabolic syndrome",
    "Autoimmune degradation"
  ];

  const systemTitle = specimen.systemView?.title || specimen.system || "Human System";
  const systemImg = specimen.systemView?.image || `/images/explorer/${specimen.id}_where_works.jpg`;

  return (
    <div className="pt-1">
      {/* 6 Equal Responsive Cards in One Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5 items-stretch">
        
        {/* CARD 1: Quote Card (MedPulse Soft Mint) */}
        <div className="bg-gradient-to-br from-[#E9F5F3] to-[#F0F6F8] rounded-3xl border border-[#159A91]/30 p-4 flex flex-col justify-between shadow-2xs h-[200px]">
          <div className="space-y-2.5">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#159A91] shadow-2xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <p className="font-serif text-sm font-bold text-[#123B50] leading-snug">
                {quoteText}
              </p>
              <p className="font-serif italic text-sm font-black text-[#159A91]">
                {quoteHighlight}
              </p>
            </div>
          </div>
          <div>
            <span className="text-[9px] text-[#263746] tracking-wider uppercase font-black">
              Clinical Inspiration
            </span>
          </div>
        </div>

        {/* CARD 2: MICROSCOPIC VIEW */}
        <div className="bg-white rounded-3xl border border-neutral-200/90 p-3.5 flex flex-col justify-between hover:shadow-md transition-shadow h-[200px]">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-black tracking-widest uppercase text-[#159A91]">
                MICROSCOPIC VIEW
              </span>
              <Microscope className="w-3.5 h-3.5 text-[#159A91]" />
            </div>
            <h4 className="font-serif text-xs font-bold text-[#123B50] truncate leading-tight">
              {microTitle}
            </h4>

            {/* Circular Histology Slide */}
            <div className="flex justify-center py-1">
              <div className="w-20 h-20 rounded-full overflow-hidden border border-[#159A91]/30 shadow-2xs bg-neutral-50 ring-2 ring-[#E9F5F3]">
                <img
                  src={microImg}
                  alt={microTitle}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/images/explorer/heart_microscopic.jpg';
                  }}
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveModalData({
              title: microTitle,
              category: 'Microscopic View',
              image: microImg,
              text: specimen.microscopicView?.description || 'High-resolution histology slide displaying cellular tissue organization and specialized membrane junctions.'
            })}
            className="w-full pt-2 border-t border-neutral-100 text-[11px] font-bold text-[#123B50] hover:text-[#159A91] flex items-center justify-between cursor-pointer transition-colors"
          >
            <span>Explore tissue</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#159A91]" />
          </button>
        </div>

        {/* CARD 3: COMPARE ORGANS */}
        <div className="bg-white rounded-3xl border border-neutral-200/90 p-3.5 flex flex-col justify-between hover:shadow-md transition-shadow h-[200px]">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-black tracking-widest uppercase text-[#159A91]">
                COMPARE ORGANS
              </span>
              <Share2 className="w-3.5 h-3.5 text-[#159A91]" />
            </div>
            <h4 className="font-serif text-xs font-bold text-[#123B50] truncate leading-tight">
              {compareSubtitle}
            </h4>

            {/* Side-by-side Organs Illustration */}
            <div className="flex justify-center py-1">
              <div className="w-full h-20 rounded-2xl overflow-hidden border border-neutral-100 flex items-center justify-center bg-neutral-50 p-1">
                <img
                  src={compareImg}
                  alt={compareSubtitle}
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/images/explorer/liver_compare.jpg';
                  }}
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenCompare}
            className="w-full pt-2 border-t border-neutral-100 text-[11px] font-bold text-[#123B50] hover:text-[#159A91] flex items-center justify-between cursor-pointer transition-colors"
          >
            <span>Open comparison</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#159A91]" />
          </button>
        </div>

        {/* CARD 4: FUNCTION ANIMATION */}
        <div className="bg-white rounded-3xl border border-neutral-200/90 p-3.5 flex flex-col justify-between hover:shadow-md transition-shadow h-[200px]">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-black tracking-widest uppercase text-[#159A91]">
                FUNCTION ANIMATION
              </span>
              <Play className="w-3.5 h-3.5 text-[#159A91]" />
            </div>
            <h4 className="font-serif text-xs font-bold text-[#123B50] truncate leading-tight">
              {animTitle}
            </h4>

            {/* Illustration with Play Overlay */}
            <div className="flex justify-center py-1">
              <div
                onClick={onTriggerAnimate}
                className="relative w-full h-20 rounded-2xl overflow-hidden border border-neutral-100 flex items-center justify-center bg-neutral-50 p-1 group cursor-pointer"
              >
                <img
                  src={animPoster}
                  alt={animTitle}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/images/explorer/liver_animation.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-[#123B50]/20 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-[#159A91] group-hover:scale-110 transition-transform">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onTriggerAnimate}
            className="w-full pt-2 border-t border-neutral-100 text-[11px] font-bold text-[#123B50] hover:text-[#159A91] flex items-center justify-between cursor-pointer transition-colors"
          >
            <span>Play animation</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#159A91]" />
          </button>
        </div>

        {/* CARD 5: CLINICAL NOTES */}
        <div className="bg-white rounded-3xl border border-neutral-200/90 p-3.5 flex flex-col justify-between hover:shadow-md transition-shadow h-[200px]">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-black tracking-widest uppercase text-[#159A91]">
                CLINICAL NOTES
              </span>
              <FileText className="w-3.5 h-3.5 text-[#159A91]" />
            </div>
            <h4 className="font-serif text-xs font-bold text-[#123B50] leading-tight">
              Common conditions
            </h4>

            {/* List with red heart bullets */}
            <div className="space-y-0.5 text-[10px] text-[#263746] pt-1 max-h-[92px] overflow-hidden">
              {conditionsList.slice(0, 8).map((cond, idx) => (
                <div key={idx} className="flex items-center gap-1.5 truncate leading-tight">
                  <Heart className="w-2 h-2 text-[#DC2626] fill-[#DC2626] shrink-0" />
                  <span className="truncate font-medium">{cond}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveModalData({
              title: 'Common Clinical Conditions',
              category: `${specimen.name} Pathology`,
              list: conditionsList,
              text: `Detailed nursing and clinical implications for ${specimen.name} pathologies, diagnosis criteria, and therapeutic care plans.`
            })}
            className="w-full pt-2 border-t border-neutral-100 text-[11px] font-bold text-[#123B50] hover:text-[#159A91] flex items-center justify-between cursor-pointer transition-colors"
          >
            <span>See all (8)</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#159A91]" />
          </button>
        </div>

        {/* CARD 6: WHERE IT WORKS */}
        <div className="bg-white rounded-3xl border border-neutral-200/90 p-3.5 flex flex-col justify-between hover:shadow-md transition-shadow h-[200px]">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-black tracking-widest uppercase text-[#159A91]">
                WHERE IT WORKS
              </span>
              <User className="w-3.5 h-3.5 text-[#159A91]" />
            </div>
            <h4 className="font-serif text-xs font-bold text-[#123B50] truncate leading-tight">
              {systemTitle}
            </h4>

            {/* Silhouette with Highlighted Organ */}
            <div className="flex justify-center py-1">
              <div className="w-full h-20 rounded-2xl overflow-hidden border border-neutral-100 flex items-center justify-center bg-neutral-50 p-1">
                <img
                  src={systemImg}
                  alt={systemTitle}
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/images/explorer/liver_where_works.jpg';
                  }}
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveModalData({
              title: systemTitle,
              category: 'Topographical Anatomy',
              image: systemImg,
              text: `Systemic anatomical pathways, vascular perfusion, sympathetic/parasympathetic innervation, and topological boundaries of the ${specimen.name}.`
            })}
            className="w-full pt-2 border-t border-neutral-100 text-[11px] font-bold text-[#123B50] hover:text-[#159A91] flex items-center justify-between cursor-pointer transition-colors"
          >
            <span>See the system</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#159A91]" />
          </button>
        </div>

      </div>

      {/* Detail Modal for Bottom Cards */}
      {activeModalData && (
        <div
          className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setActiveModalData(null)}
        >
          <div
            className="bg-white max-w-md w-full rounded-3xl p-6 border border-neutral-200 shadow-2xl space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-neutral-100 pb-2.5">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#159A91]">
                  {activeModalData.category}
                </span>
                <h3 className="font-serif text-xl font-black text-[#123B50]">
                  {activeModalData.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalData(null)}
                className="p-1 rounded-lg text-neutral-400 hover:text-[#123B50] hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {activeModalData.image && (
              <div className="w-full max-h-52 rounded-2xl overflow-hidden border border-neutral-100 bg-neutral-50 flex items-center justify-center p-2">
                <img
                  src={activeModalData.image}
                  alt={activeModalData.title}
                  className="max-h-48 object-contain"
                />
              </div>
            )}

            {activeModalData.list && (
              <div className="grid grid-cols-2 gap-2 p-3 bg-[#E9F5F3]/50 rounded-2xl border border-[#159A91]/20">
                {activeModalData.list.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-xs text-[#263746]">
                    <Heart className="w-2.5 h-2.5 text-[#DC2626] fill-[#DC2626] shrink-0" />
                    <span className="font-medium truncate">{item}</span>
                  </div>
                ))}
              </div>
            )}

            <p className="text-xs text-[#263746] leading-relaxed">
              {activeModalData.text}
            </p>

            <button
              type="button"
              onClick={() => setActiveModalData(null)}
              className="w-full py-2.5 rounded-xl bg-[#159A91] hover:bg-[#12837B] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              Close Window
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
