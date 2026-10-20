import { useState, useEffect, useCallback } from 'react';
import { getStudentGatingStatus } from './assessmentEngine';

const COMPLETED_UNITS_KEY = 'nursing_lms_completed_units';
const COMPLETION_EVENT = 'nursing_lms_completion_updated';

/**
 * Returns current completed unit IDs from localStorage
 */
export const getCompletedUnitIds = () => {
  try {
    const raw = localStorage.getItem(COMPLETED_UNITS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

/**
 * Checks if a specific chapter/unit is marked completed
 */
export const isUnitCompleted = (unitId) => {
  if (!unitId) return false;
  const list = getCompletedUnitIds();
  return list.includes(unitId);
};

/**
 * Toggles or sets a unit's completion state in localStorage and dispatches a window event
 */
export const toggleUnitCompletion = (unitId, forceState) => {
  if (!unitId) return false;
  try {
    const list = getCompletedUnitIds();
    let updated;
    const currentlyCompleted = list.includes(unitId);
    const shouldComplete = forceState !== undefined ? forceState : !currentlyCompleted;

    if (shouldComplete && !currentlyCompleted) {
      updated = [...list, unitId];
    } else if (!shouldComplete && currentlyCompleted) {
      updated = list.filter((id) => id !== unitId);
    } else {
      updated = list;
    }

    localStorage.setItem(COMPLETED_UNITS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(COMPLETION_EVENT, { detail: { unitId, completed: shouldComplete } }));
    return shouldComplete;
  } catch (err) {
    console.warn('[CurriculumProgress] Error saving unit completion:', err);
    return false;
  }
};

/**
 * React hook to listen to real-time curriculum progress and gating for any subject
 */
export const useCurriculumProgress = (subject = 'physiology') => {
  const [completedList, setCompletedList] = useState(getCompletedUnitIds);
  const [gating, setGating] = useState(() => getStudentGatingStatus(subject));

  const refresh = useCallback(() => {
    setCompletedList(getCompletedUnitIds());
    setGating(getStudentGatingStatus(subject));
  }, [subject]);

  useEffect(() => {
    refresh();

    const handleUpdate = () => {
      refresh();
    };

    window.addEventListener(COMPLETION_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(COMPLETION_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [refresh]);

  const toggle = useCallback((unitId) => {
    const nextState = toggleUnitCompletion(unitId);
    refresh();
    return nextState;
  }, [refresh]);

  return {
    completedUnitIds: completedList,
    isCompleted: (unitId) => completedList.includes(unitId),
    toggleCompletion: toggle,
    gating,
    refresh
  };
};

export default useCurriculumProgress;
