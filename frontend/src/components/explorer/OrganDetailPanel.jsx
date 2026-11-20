import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Stethoscope, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  HelpCircle, 
  Split, 
  Share2,
  AlertCircle,
  Activity,
  Layers,
  FileCheck
} from 'lucide-react';

export const OrganDetailPanel = ({
  specimen,
  activePartId,
  onSelectPart,
  visitedPartIds = new Set(),
  onMarkVisited,
  onTriggerAnimate,
  onOpenQuiz,
  onOpenCompare,
  isAnimatePlaying = false
}) => {
  const activePart = specimen.parts?.find((p) => p.id === activePartId);

  const currentIndex = activePart
    ? specimen.parts?.findIndex((p) => p.id === activePart.id)
    : -1;
  const prevPart = currentIndex > 0 ? specimen.parts?.[currentIndex - 1] : null;
  const nextPart = currentIndex >= 0 && currentIndex < (specimen.parts?.length || 0) - 1
    ? specimen.parts?.[currentIndex + 1]
    : null;

  return (
    <div className="bg-white rounded-3xl border border-neutral-200/90 p-4 shadow-sm h-[520px] flex flex-col justify-between">
      {/* ===================== VIEW A: RICH DETAILED PART CARD ===================== */}
      {activePart ? (
        <div className="space-y-3 animate-in fade-in duration-150 flex-1 flex flex-col justify-between min-h-0">
          <div className="space-y-3 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-neutral-200 flex-1">
            
            {/* 1. Header with Back Button */}
            <div className="border-b border-neutral-100 pb-2.5">
              <button
                type="button"
                onClick={() => onSelectPart(null)}
                className="flex items-center gap-1.5 text-xs font-bold text-[#159A91] hover:text-[#12837B] transition-colors cursor-pointer mb-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to organ overview</span>
              </button>

              <span className="text-[9px] font-black uppercase tracking-widest text-[#159A91] block">
                ANATOMICAL STRUCTURE
              </span>
              <h2 className="font-serif text-2xl font-black text-[#123B50] leading-tight">
                {activePart.name}
              </h2>
              {activePart.latinName && (
                <p className="font-serif italic text-xs text-[#159A91] font-semibold mt-0.5">
                  {activePart.latinName}
                </p>
              )}
            </div>

            {/* 2. Gross Anatomy Description */}
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#123B50] block">
                Gross Morphology
              </span>
              <p className="text-xs text-[#263746] leading-relaxed font-normal">
                {activePart.description}
              </p>
            </div>

            {/* 3. Primary Physiological Function Card */}
            {activePart.function && (
              <div className="bg-[#E9F5F3] p-3 rounded-2xl border border-[#159A91]/30 space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-[#123B50]">
                  <Activity className="w-3.5 h-3.5 text-[#159A91]" />
                  <span>Physiological Mechanism</span>
                </div>
                <p className="text-xs text-[#123B50] font-semibold leading-relaxed">
                  {activePart.function}
                </p>
              </div>
            )}

            {/* 4. Key Clinical Metrics / Parameters Grid */}
            {activePart.keyFeatures && activePart.keyFeatures.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#123B50] flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-[#159A91]" />
                  <span>Key Anatomical Parameters:</span>
                </span>
                <div className="grid grid-cols-1 gap-1">
                  {activePart.keyFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-xs text-[#263746] bg-neutral-50 px-2.5 py-1.5 rounded-xl border border-neutral-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#159A91] mt-1.5 shrink-0" />
                      <span className="font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Anatomical Junctions & Landmarks */}
            {activePart.connections && activePart.connections.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#123B50] flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5 text-[#159A91]" />
                  <span>Anatomical Junctions & Landmarks:</span>
                </span>
                <ul className="space-y-1 text-xs text-[#263746]">
                  {activePart.connections.map((conn, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-neutral-50 p-2 rounded-xl border border-neutral-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#159A91] mt-1.5 shrink-0" />
                      <span className="leading-snug font-medium">{conn}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 6. Bedside Clinical Correlation / Pathology Pearls */}
            {activePart.clinicalNote && (
              <div className="p-3 rounded-2xl bg-[#FFFBEB] border border-[#F2B66D]/50 space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] font-black text-[#78350F]">
                  <AlertCircle className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Bedside Clinical Correlation (NCLEX Pearl)</span>
                </div>
                <p className="text-xs text-[#78350F] leading-relaxed font-medium">
                  {activePart.clinicalNote}
                </p>
              </div>
            )}

            {/* 7. Histological Architecture */}
            {activePart.histology && (
              <div className="p-2.5 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-[#123B50]">
                  <Layers className="w-3 h-3 text-[#159A91]" />
                  <span>Microscopic Histology</span>
                </div>
                <p className="text-xs text-[#263746] leading-relaxed">
                  {activePart.histology}
                </p>
              </div>
            )}
          </div>

          {/* Previous & Next Part Navigation */}
          <div className="flex items-center justify-between pt-2.5 border-t border-neutral-100 shrink-0">
            <button
              type="button"
              disabled={!prevPart}
              onClick={() => prevPart && onSelectPart(prevPart.id)}
              className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl border transition-colors cursor-pointer ${
                prevPart
                  ? 'bg-white hover:bg-neutral-50 text-[#123B50] border-neutral-200'
                  : 'opacity-40 cursor-not-allowed text-neutral-300 border-transparent'
              }`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <button
              type="button"
              disabled={!nextPart}
              onClick={() => nextPart && onSelectPart(nextPart.id)}
              className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl border transition-colors cursor-pointer ${
                nextPart
                  ? 'bg-[#159A91] hover:bg-[#12837B] text-white border-[#159A91] shadow-xs'
                  : 'opacity-40 cursor-not-allowed text-neutral-300 border-transparent'
              }`}
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* ===================== VIEW B: ORGAN OVERVIEW ===================== */
        <div className="space-y-3 animate-in fade-in duration-150 flex-1 flex flex-col justify-between min-h-0">
          
          <div className="space-y-2.5 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-neutral-200 flex-1">
            {/* Header: Label, Big serif title, Tagline, Round thumbnail */}
            <div className="flex items-start justify-between gap-2 border-b border-neutral-100 pb-2">
              <div>
                <span className="text-[10px] font-black tracking-widest uppercase text-[#159A91] flex items-center gap-1 mb-0.5">
                  <Heart className="w-2.5 h-2.5 fill-[#159A91]" />
                  <span>THE {specimen.name.toUpperCase()}</span>
                </span>
                <h1 className="font-serif text-2xl font-black text-[#123B50] tracking-tight leading-none">
                  {specimen.name}
                </h1>
                <p className="font-serif italic text-xs text-[#159A91] font-semibold mt-0.5">
                  {specimen.tagline}
                </p>
              </div>

              {/* Round watercolor thumbnail badge on the right */}
              <div className="w-11 h-11 rounded-2xl overflow-hidden border border-[#159A91]/30 shrink-0 shadow-xs bg-[#E9F5F3] p-0.5">
                <img
                  src={specimen.thumbnail || `/images/explorer/${specimen.id}_thumb.jpg`}
                  alt={specimen.name}
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/images/explorer/heart_thumb.jpg';
                  }}
                />
              </div>
            </div>

            {/* Description Paragraph */}
            <p className="text-xs text-[#263746] leading-relaxed font-normal">
              {specimen.description}
            </p>

            {/* KEY FACTS Table with Small Diamond Bullet Icons */}
            {specimen.keyFacts && specimen.keyFacts.length > 0 && (
              <div className="bg-neutral-50 rounded-2xl border border-neutral-100 p-2.5 space-y-1">
                <span className="text-[9px] font-black uppercase tracking-wider text-[#123B50] block">
                  KEY ANATOMICAL FACTS
                </span>
                <div className="space-y-1 text-xs text-[#263746]">
                  {specimen.keyFacts.map((fact, idx) => (
                    <div key={idx} className="flex items-baseline justify-between gap-2 border-b border-neutral-100 last:border-b-0 py-0.5">
                      <div className="flex items-center gap-1.5 text-[#263746] shrink-0 font-medium">
                        <span className="text-[8px] text-[#159A91]">◆</span>
                        <span>{fact.label}</span>
                      </div>
                      <span className="font-bold text-[#123B50] text-right text-xs">
                        {fact.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Medical Importance Card (MedPulse Soft Mint) */}
            {specimen.medicalImportance && (
              <div className="p-2.5 rounded-2xl bg-[#E9F5F3] border border-[#159A91]/30 space-y-0.5">
                <div className="flex items-center gap-1.5 text-[11px] font-black text-[#123B50]">
                  <Stethoscope className="w-3.5 h-3.5 text-[#159A91]" />
                  <span>Medical Importance</span>
                </div>
                <p className="text-xs text-[#123B50] leading-snug font-medium">
                  {specimen.medicalImportance}
                </p>
              </div>
            )}

            {/* Did You Know Card (MedPulse Soft Amber) */}
            {specimen.didYouKnow && (
              <div className="p-2.5 rounded-2xl bg-[#FFFBEB] border border-[#F2B66D]/40 space-y-0.5">
                <div className="flex items-center gap-1.5 text-[11px] font-black text-[#78350F]">
                  <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Did You Know?</span>
                </div>
                <p className="text-xs text-[#78350F] leading-snug font-medium">
                  {specimen.didYouKnow}
                </p>
              </div>
            )}
          </div>

          {/* ===================== ACTION BUTTONS (MEDPULSE THEME) ===================== */}
          <div className="space-y-2 pt-2 border-t border-neutral-100 shrink-0">
            {/* 1. Full-width Clinical Teal primary button: "View lesson →" */}
            <Link
              to="/anatomy-syllabus"
              className="w-full py-2.5 px-4 rounded-xl bg-[#159A91] hover:bg-[#12837B] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm shadow-[#159A91]/20 transition-all cursor-pointer"
            >
              <span>View lesson</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* 2. Row of two outlined buttons: Teal "▷ Animate" & Amber "? Quiz" */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={onTriggerAnimate}
                className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  isAnimatePlaying
                    ? 'bg-[#159A91] text-white border-[#159A91] shadow-xs'
                    : 'bg-white hover:bg-[#E9F5F3] text-[#159A91] border-[#159A91]/40'
                }`}
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Animate</span>
              </button>

              <button
                type="button"
                onClick={onOpenQuiz}
                className="py-2 px-3 rounded-xl border border-[#16A34A]/40 bg-white hover:bg-green-50 text-[#16A34A] font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Quiz</span>
              </button>
            </div>

            {/* 3. Full-width Deep Navy outlined "Compare" button */}
            <button
              type="button"
              onClick={onOpenCompare}
              className="w-full py-2 px-3 rounded-xl border border-[#123B50]/40 bg-white hover:bg-[#E9F5F3] text-[#123B50] font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Split className="w-3.5 h-3.5 text-[#159A91]" />
              <span>Compare Organs</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
