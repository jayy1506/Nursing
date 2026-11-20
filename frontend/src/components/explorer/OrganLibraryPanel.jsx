import React, { useState } from 'react';
import { Bookmark, Heart, ArrowRight } from 'lucide-react';

export const ORGANS_CATALOG = [
  { id: 'heart', name: 'Heart', system: 'Cardiovascular', thumb: '/images/explorer/heart_thumb.jpg', latin: 'Cor' },
  { id: 'brain', name: 'Brain', system: 'Nervous System', thumb: '/images/explorer/brain_thumb.jpg', latin: 'Encephalon' },
  { id: 'lungs', name: 'Lungs', system: 'Respiratory System', thumb: '/images/explorer/lungs_thumb.jpg', latin: 'Pulmones' },
  { id: 'liver', name: 'Liver', system: 'Digestive System', thumb: '/images/explorer/liver_thumb.jpg', latin: 'Hepar' },
  { id: 'kidneys', name: 'Kidneys', system: 'Urinary System', thumb: '/images/explorer/kidneys_thumb.jpg', latin: 'Renes' },
  { id: 'eye', name: 'Eye', system: 'Sensory System', thumb: '/images/explorer/eye_thumb.jpg', latin: 'Oculus' },
  { id: 'intestine', name: 'Intestine', system: 'Digestive System', thumb: '/images/explorer/intestine_thumb.jpg', latin: 'Intestinum' },
  { id: 'pancreas', name: 'Pancreas', system: 'Endocrine System', thumb: '/images/explorer/pancreas_thumb.jpg', latin: 'Pancreas' },
  { id: 'skin', name: 'Skin', system: 'Integumentary System', thumb: '/images/explorer/skin_thumb.jpg', latin: 'Cutis' }
];

export const OrganLibraryPanel = ({ selectedOrganId, onSelectOrgan, searchQuery = '' }) => {
  const [favoriteOrgans, setFavoriteOrgans] = useState({ liver: true, heart: true });
  const [showAllModal, setShowAllModal] = useState(false);

  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    setFavoriteOrgans((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filtered = ORGANS_CATALOG.filter((org) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return org.name.toLowerCase().includes(q) || org.system.toLowerCase().includes(q) || org.latin.toLowerCase().includes(q);
  });

  return (
    <div className="bg-white rounded-3xl border border-neutral-200/90 p-3 shadow-xs flex flex-col justify-between h-[520px]">
      <div className="space-y-2 flex-1 flex flex-col min-h-0">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-2 px-1 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#159A91]" />
            <h2 className="text-[10px] font-black tracking-widest uppercase text-[#123B50]">
              ORGAN LIBRARY
            </h2>
          </div>
          <button
            type="button"
            className="p-1 rounded-md hover:bg-[#E9F5F3] text-neutral-400 hover:text-[#159A91] transition-colors cursor-pointer"
            title="Bookmark Catalog"
          >
            <Bookmark className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Vertical Organ List */}
        <div className="space-y-1 overflow-y-auto pr-0.5 flex-1 scrollbar-thin scrollbar-thumb-neutral-200">
          {filtered.map((organ) => {
            const isSelected = selectedOrganId === organ.id;
            const isFavorited = !!favoriteOrgans[organ.id];

            return (
              <button
                key={organ.id}
                type="button"
                onClick={() => onSelectOrgan(organ.id)}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-2xl border text-left transition-all duration-150 cursor-pointer group ${
                  isSelected
                    ? 'bg-[#E9F5F3] border-[#159A91] shadow-xs'
                    : 'bg-transparent hover:bg-neutral-50 border-transparent hover:border-neutral-200'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {/* Circular thumbnail */}
                  <div
                    className={`w-8 h-8 rounded-full overflow-hidden shrink-0 transition-transform group-hover:scale-105 border ${
                      isSelected
                        ? 'border-[#159A91] ring-2 ring-[#159A91]/30 shadow-xs'
                        : 'border-neutral-200 bg-neutral-100'
                    }`}
                  >
                    <img
                      src={organ.thumb}
                      alt={organ.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = `/images/explorer/${organ.id}_thumb.jpg`;
                      }}
                    />
                  </div>

                  <div className="truncate">
                    <h3 className="font-serif text-sm font-bold text-[#123B50] leading-tight truncate">
                      {organ.name}
                    </h3>
                    <p className="text-[10px] text-[#263746] font-medium truncate leading-none">
                      {organ.system}
                    </p>
                  </div>
                </div>

                {/* Heart / Favorite Icon */}
                {isSelected ? (
                  <Heart className="w-3.5 h-3.5 text-[#159A91] fill-[#159A91] shrink-0" />
                ) : isFavorited ? (
                  <button
                    type="button"
                    onClick={(e) => toggleFavorite(e, organ.id)}
                    className="text-[#159A91] p-0.5 shrink-0"
                  >
                    <Heart className="w-3 h-3 fill-current" />
                  </button>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Button: View all organs */}
      <div className="pt-2 border-t border-neutral-100 shrink-0">
        <button
          type="button"
          onClick={() => setShowAllModal(true)}
          className="w-full py-1.5 px-3 rounded-xl hover:bg-[#E9F5F3] text-xs font-bold text-[#123B50] hover:text-[#159A91] flex items-center justify-between transition-all cursor-pointer"
        >
          <span>View all organs (9)</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#159A91]" />
        </button>
      </div>

      {/* All Organs Modal */}
      {showAllModal && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setShowAllModal(false)}
        >
          <div
            className="bg-white max-w-md w-full rounded-3xl p-5 border border-neutral-200 shadow-2xl space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
              <h3 className="font-serif text-base font-bold text-[#123B50]">
                Anatomical Specimen Collection
              </h3>
              <button
                onClick={() => setShowAllModal(false)}
                className="text-xs font-bold text-neutral-400 hover:text-[#123B50] cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2 max-h-[340px] overflow-y-auto">
              {ORGANS_CATALOG.map((org) => (
                <button
                  key={org.id}
                  onClick={() => {
                    onSelectOrgan(org.id);
                    setShowAllModal(false);
                  }}
                  className="p-2 rounded-2xl border border-neutral-200 hover:bg-[#E9F5F3] hover:border-[#159A91] flex flex-col items-center text-center gap-1 transition-all cursor-pointer"
                >
                  <img
                    src={org.thumb}
                    alt={org.name}
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <span className="font-serif text-xs font-bold text-[#123B50]">{org.name}</span>
                  <span className="text-[9px] text-[#263746] font-medium">{org.system}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
