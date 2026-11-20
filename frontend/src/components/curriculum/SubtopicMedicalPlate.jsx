import React, { useState } from "react";
import {
  Maximize2,
  ZoomIn,
  X,
  ChevronDown,
  ChevronUp,
  Layers,
  Sparkles,
  Stethoscope,
  Info
} from "lucide-react";
import { renderAnatomyIllustration } from "../illustrations/AnatomyIllustrations";
import { renderPhysiologyIllustration } from "../illustrations/PhysiologyIllustrations";
import {
  CarbohydrateDiagram,
  LipidDiagram,
  ProteinDiagram,
  EnzymeDiagram,
  AcidBaseDiagram,
  HemeDiagram,
  ImmunologyDiagram
} from "../illustrations/BiochemIllustrations";
import {
  FoodGroupsDiagram,
  DietaryFiberDiagram,
  FattyAcidsDietDiagram,
  VitaminsMineralsDiagram,
  BalancedDietPlateDiagram,
  DeficiencyDisordersDiagram,
  TherapeuticDietsDiagram,
  CulinaryScienceDiagram,
  ABCDAssessmentDiagram,
  FoodSafetyProgramDiagram
} from "../illustrations/NutritionIllustrations";

const renderBiochemIllustration = (subtopicId = "", title = "") => {
  const s = `${subtopicId} ${title}`.toLowerCase();
  if (s.includes("lipid") || s.includes("fat") || s.includes("membrane") || s.includes("cholesterol") || s.includes("fatty")) {
    return <LipidDiagram />;
  }
  if (s.includes("protein") || s.includes("amino") || s.includes("peptide") || s.includes("nitrogen")) {
    return <ProteinDiagram />;
  }
  if (s.includes("enzyme") || s.includes("kinetics") || s.includes("cataly") || s.includes("inhibition")) {
    return <EnzymeDiagram />;
  }
  if (s.includes("acid") || s.includes("base") || s.includes("buffer") || s.includes("ph") || s.includes("electrolyte")) {
    return <AcidBaseDiagram />;
  }
  if (s.includes("heme") || s.includes("hemoglobin") || s.includes("bilirubin") || s.includes("porphyrin") || s.includes("iron")) {
    return <HemeDiagram />;
  }
  if (s.includes("immuno") || s.includes("antibody") || s.includes("antigen") || s.includes("organ-function")) {
    return <ImmunologyDiagram />;
  }
  return <CarbohydrateDiagram />;
};

const renderNutritionIllustration = (subtopicId = "", title = "") => {
  const s = `${subtopicId} ${title}`.toLowerCase();
  if (s.includes("fiber") || s.includes("cellulose") || s.includes("roughage") || s.includes("motility")) {
    return <DietaryFiberDiagram />;
  }
  if (s.includes("fat") || s.includes("oil") || s.includes("lipid") || s.includes("cholesterol") || s.includes("pufa")) {
    return <FattyAcidsDietDiagram />;
  }
  if (s.includes("vitamin") || s.includes("mineral") || s.includes("calcium") || s.includes("iron") || s.includes("iodine")) {
    return <VitaminsMineralsDiagram />;
  }
  if (s.includes("plate") || s.includes("balance") || s.includes("meal") || s.includes("rda") || s.includes("requirement")) {
    return <BalancedDietPlateDiagram />;
  }
  if (s.includes("deficien") || s.includes("pem") || s.includes("kwashiorkor") || s.includes("marasmus") || s.includes("disorder")) {
    return <DeficiencyDisordersDiagram />;
  }
  if (s.includes("therap") || s.includes("renal") || s.includes("diabet") || s.includes("hypertens") || s.includes("hospital")) {
    return <TherapeuticDietsDiagram />;
  }
  if (s.includes("cook") || s.includes("culinary") || s.includes("preserv") || s.includes("nutrient-retention")) {
    return <CulinaryScienceDiagram />;
  }
  if (s.includes("abcd") || s.includes("assessment") || s.includes("anthropo") || s.includes("bmi") || s.includes("muac")) {
    return <ABCDAssessmentDiagram />;
  }
  if (s.includes("safety") || s.includes("hygiene") || s.includes("program") || s.includes("policy") || s.includes("sanitation")) {
    return <FoodSafetyProgramDiagram />;
  }
  return <FoodGroupsDiagram />;
};

/**
 * SubtopicMedicalPlate
 * Renders high-resolution anatomical, physiological, or biochemical plates for any subtopic.
 * Automatically falls back to rich medical SVG schematics if images are .emf or missing.
 */
export const SubtopicMedicalPlate = ({
  subtopicId = "",
  subtopicTitle = "",
  subject = "anatomy",
  images = [],
  diagramExplanation = null
}) => {
  const [zoomImage, setZoomImage] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const primaryImage = images && images.length > 0 ? images[0] : null;
  const isEmf = primaryImage?.src?.toLowerCase()?.endsWith(".emf");

  // Determine if we should display an SVG diagram
  const shouldRenderSvg = isEmf || imageError || !primaryImage;

  const renderSubjectSvg = () => {
    switch (subject) {
      case "anatomy":
        return renderAnatomyIllustration(subtopicId, subtopicTitle);
      case "physiology":
        return renderPhysiologyIllustration(subtopicId, subtopicTitle);
      case "biochemistry":
        return renderBiochemIllustration(subtopicId, subtopicTitle);
      case "nutrition":
        return renderNutritionIllustration(subtopicId, subtopicTitle);
      default:
        return renderAnatomyIllustration(subtopicId, subtopicTitle);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-sm overflow-hidden my-6">
      {/* Plate Header */}
      <div className="px-5 py-3.5 bg-neutral-50/90 border-b border-neutral-200 flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <span className="px-2.5 py-1 rounded-lg bg-[#159A91] text-white font-black text-xs shrink-0">
            Plate
          </span>
          <h4 className="text-xs sm:text-sm font-black text-[#123B50] truncate">
            {primaryImage?.caption || `${subtopicTitle} • Anatomical &amp; Clinical Plate`}
          </h4>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {!shouldRenderSvg && (
            <button
              type="button"
              onClick={() => setZoomImage(primaryImage)}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#E9F5F3] text-[#123B50] text-xs font-bold border border-neutral-200 transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#159A91]" />
              <span className="hidden sm:inline">Enlarge Plate</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 rounded-xl bg-white hover:bg-neutral-100 text-neutral-600 border border-neutral-200 transition-colors cursor-pointer"
            title={expanded ? "Collapse Details" : "Expand Details"}
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Visual Canvas (Image or High-Quality SVG) */}
      <div className="p-4 sm:p-6 bg-[#E9F5F3]/30 border-b border-neutral-100 flex items-center justify-center">
        {shouldRenderSvg ? (
          <div className="w-full">{renderSubjectSvg()}</div>
        ) : (
          <div
            className="relative w-full flex items-center justify-center min-h-[220px] max-h-[440px] cursor-zoom-in group"
            onClick={() => setZoomImage(primaryImage)}
          >
            <img
              src={primaryImage.src}
              alt={primaryImage.alt || subtopicTitle}
              onError={() => setImageError(true)}
              className="max-h-[400px] w-auto object-contain rounded-xl group-hover:scale-[1.01] transition-transform duration-300 drop-shadow-sm"
            />
            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#123B50]/90 text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg backdrop-blur-xs">
              <ZoomIn className="w-3.5 h-3.5 text-[#159A91]" />
              <span>Click to Enlarge</span>
            </div>
          </div>
        )}
      </div>

      {/* Diagram Explanation & Clinical Takeaway */}
      {expanded && (
        <div className="p-5 sm:p-6 bg-white space-y-4 text-xs sm:text-sm">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#159A91] block mb-1">
              Plate Architectural Analysis &amp; Anatomical Landmarks
            </span>
            <p className="text-neutral-700 leading-relaxed font-medium">
              {diagramExplanation?.overview ||
                diagramExplanation?.para ||
                `High-yield structural demonstration for "${subtopicTitle}". Correlates tissue histology, functional orientation, and clinical bedside applications.`}
            </p>
          </div>

          {diagramExplanation?.points && diagramExplanation.points.length > 0 && (
            <div className="bg-[#E9F5F3]/50 rounded-2xl p-4 border border-[#159A91]/20 space-y-1.5">
              <div className="font-extrabold text-xs text-[#123B50] flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#159A91]" />
                <span>Identified Architectural Landmarks:</span>
              </div>
              <ul className="space-y-1 text-xs text-[#263746]">
                {diagramExplanation.points.slice(0, 4).map((pt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#159A91] mt-1.5 shrink-0" />
                    <span className="leading-relaxed">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex items-center gap-2 pt-1 text-xs text-[#123B50] font-bold">
            <Stethoscope className="w-4 h-4 text-[#159A91]" />
            <span>Clinical Rule: Always inspect anatomical landmark coordinates prior to bedside interventions.</span>
          </div>
        </div>
      )}

      {/* Zoom Modal */}
      {zoomImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setZoomImage(null)}
        >
          <div
            className="max-w-4xl w-full bg-white rounded-3xl p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <h3 className="font-black text-sm text-[#123B50]">
                {zoomImage.caption || subtopicTitle}
              </h3>
              <button
                type="button"
                onClick={() => setZoomImage(null)}
                className="p-1.5 rounded-xl hover:bg-neutral-100 text-neutral-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center justify-center bg-neutral-50 rounded-2xl p-4 min-h-[300px]">
              <img
                src={zoomImage.src}
                alt={zoomImage.alt || subtopicTitle}
                className="max-h-[65vh] w-auto object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubtopicMedicalPlate;
