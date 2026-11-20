import React, { useState } from 'react';
import { ExplorerTopNav } from '../components/explorer/ExplorerTopNav';
import { OrganLibraryPanel } from '../components/explorer/OrganLibraryPanel';
import { ThreeDStage } from '../components/explorer/ThreeDStage';
import { OrganDetailPanel } from '../components/explorer/OrganDetailPanel';
import { BelowStageCards } from '../components/explorer/BelowStageCards';
import { QuizModal } from '../components/explorer/QuizModal';
import { CompareModal } from '../components/explorer/CompareModal';

import heartData from '../data/organs/heart.json';
import brainData from '../data/organs/brain.json';
import lungsData from '../data/organs/lungs.json';
import liverData from '../data/organs/liver.json';
import kidneysData from '../data/organs/kidneys.json';
import eyeData from '../data/organs/eye.json';
import intestineData from '../data/organs/intestine.json';
import pancreasData from '../data/organs/pancreas.json';
import skinData from '../data/organs/skin.json';

const SPECIMENS_MAP = {
  heart: heartData,
  brain: brainData,
  lungs: lungsData,
  liver: liverData,
  kidneys: kidneysData,
  eye: eyeData,
  intestine: intestineData,
  pancreas: pancreasData,
  skin: skinData
};

export default function ExplorerPage() {
  const [selectedOrganId, setSelectedOrganId] = useState('heart');
  const [activePartId, setActivePartId] = useState(null);
  const [hoveredPartId, setHoveredPartId] = useState(null);
  const [visitedPartIds, setVisitedPartIds] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNavTab, setActiveNavTab] = useState('explore');
  const [isAnimatePlaying, setIsAnimatePlaying] = useState(false);

  // Modals
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const specimen = SPECIMENS_MAP[selectedOrganId] || heartData;

  const handleSelectOrgan = (organId) => {
    setSelectedOrganId(organId);
    setActivePartId(null);
    setVisitedPartIds(new Set());
    setIsAnimatePlaying(false);
  };

  const handleSelectPart = (partId) => {
    setActivePartId(partId);
    if (partId) {
      setVisitedPartIds((prev) => new Set([...prev, partId]));
    }
  };

  const handleMarkVisited = (partId) => {
    setVisitedPartIds((prev) => new Set([...prev, partId]));
  };

  const handleTriggerAnimate = () => {
    setIsAnimatePlaying((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#123B50] font-sans antialiased selection:bg-[#159A91] selection:text-white flex flex-col">
      {/* 1. MedPulse Explorer Top Navigation Bar */}
      <ExplorerTopNav
        activeTab={activeNavTab}
        onTabChange={setActiveNavTab}
        onSearchChange={setSearchQuery}
      />

      {/* Main Studio Canvas */}
      <main className="flex-1 max-w-[1720px] w-full mx-auto px-3 sm:px-5 lg:px-8 py-3 space-y-3">
        
        {/* MedPulse Studio Reward Bar */}
        <div className="flex justify-center -mb-0.5">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#123B50] via-[#159A91] to-[#12837B] text-white font-bold text-xs px-5 py-1.5 rounded-full shadow-xs border border-white/20">
            <span>🎁</span>
            <span className="tracking-wide uppercase text-[11px] font-sans font-black">CURRICULUM REWARD UNLOCKED</span>
          </div>
        </div>

        {/* Mobile Horizontal Library Chip Scroller */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'heart', name: 'Heart', thumb: '/images/explorer/heart_thumb.jpg' },
            { id: 'brain', name: 'Brain', thumb: '/images/explorer/brain_thumb.jpg' },
            { id: 'lungs', name: 'Lungs', thumb: '/images/explorer/lungs_thumb.jpg' },
            { id: 'liver', name: 'Liver', thumb: '/images/explorer/liver_thumb.jpg' },
            { id: 'kidneys', name: 'Kidneys', thumb: '/images/explorer/kidneys_thumb.jpg' },
            { id: 'eye', name: 'Eye', thumb: '/images/explorer/eye_thumb.jpg' },
            { id: 'intestine', name: 'Intestine', thumb: '/images/explorer/intestine_thumb.jpg' },
            { id: 'pancreas', name: 'Pancreas', thumb: '/images/explorer/pancreas_thumb.jpg' },
            { id: 'skin', name: 'Skin', thumb: '/images/explorer/skin_thumb.jpg' }
          ].map((org) => (
            <button
              key={org.id}
              type="button"
              onClick={() => handleSelectOrgan(org.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                selectedOrganId === org.id
                  ? 'bg-[#E9F5F3] border border-[#159A91] text-[#159A91] shadow-2xs'
                  : 'bg-white border border-neutral-200 text-[#123B50]'
              }`}
            >
              <img
                src={org.thumb}
                alt=""
                className="w-4 h-4 rounded-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <span className="font-serif">{org.name}</span>
            </button>
          ))}
        </div>

        {/* 3-Column Studio Row: Left Library (200px), Center 3D Stage (1fr), Right Detail (250px) */}
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_260px] gap-3.5 items-stretch">
          
          {/* LEFT PANEL: Organ Library (Desktop) */}
          <aside className="hidden lg:block">
            <OrganLibraryPanel
              selectedOrganId={selectedOrganId}
              onSelectOrgan={handleSelectOrgan}
              searchQuery={searchQuery}
            />
          </aside>

          {/* CENTER: 3D Specimen Stage (Properly Centered and Framed) */}
          <section className="flex flex-col justify-center">
            <ThreeDStage
              specimen={specimen}
              activePartId={activePartId}
              onSelectPart={handleSelectPart}
              hoveredPartId={hoveredPartId}
              onHoverPart={setHoveredPartId}
              onOpenCompare={() => setIsCompareOpen(true)}
              isAnimatePlaying={isAnimatePlaying}
            />
          </section>

          {/* RIGHT PANEL: Rich Detailed Organ Part & Overview Inspector */}
          <aside>
            <OrganDetailPanel
              specimen={specimen}
              activePartId={activePartId}
              onSelectPart={handleSelectPart}
              visitedPartIds={visitedPartIds}
              onMarkVisited={handleMarkVisited}
              onTriggerAnimate={handleTriggerAnimate}
              onOpenQuiz={() => setIsQuizOpen(true)}
              onOpenCompare={() => setIsCompareOpen(true)}
              isAnimatePlaying={isAnimatePlaying}
            />
          </aside>
        </div>

        {/* BOTTOM ROW: 6 Equal Cards in MedPulse Clinical Theme */}
        <BelowStageCards
          specimen={specimen}
          onOpenQuiz={() => setIsQuizOpen(true)}
          onOpenCompare={() => setIsCompareOpen(true)}
          onTriggerAnimate={handleTriggerAnimate}
        />
      </main>

      {/* Interactive Assessment Modal (MCQ & 3D Pinpoint) */}
      {isQuizOpen && (
        <QuizModal
          specimen={specimen}
          onClose={() => setIsQuizOpen(false)}
          onPinpointTarget={(partId) => {
            handleSelectPart(partId);
          }}
        />
      )}

      {/* Dual Organ Comparison Split View Modal */}
      {isCompareOpen && (
        <CompareModal
          primarySpecimen={specimen}
          onClose={() => setIsCompareOpen(false)}
          onSwitchOrgan={(newOrganId) => {
            handleSelectOrgan(newOrganId);
          }}
        />
      )}
    </div>
  );
}
