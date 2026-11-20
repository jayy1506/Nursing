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

    // Non-blocking background sync with MongoDB Atlas
    try {
      const token =
        localStorage.getItem('nursing_token') ||
        localStorage.getItem('token') ||
        localStorage.getItem('firebase_token');
      if (token && navigator.onLine) {
        fetch('/api/progress/sync', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ completedUnitIds: updated })
        }).catch((e) => console.debug('[CurriculumProgress] Background sync queued:', e));
      }
    } catch {
      // Ignore background sync errors
    }

    return shouldComplete;
  } catch (err) {
    console.warn('[CurriculumProgress] Error saving unit completion:', err);
    return false;
  }
};

/**
 * Completely resets all curriculum progress and quiz attempts across all subjects back to 0.
 */
export const resetAllStudentProgress = async () => {
  try {
    localStorage.setItem(COMPLETED_UNITS_KEY, JSON.stringify([]));
    localStorage.setItem('nursing_lms_all_attempts', JSON.stringify([]));
    localStorage.setItem('nursing_biochem_completed_lessons', JSON.stringify({}));
    localStorage.removeItem('medpulse_last_lesson');
    localStorage.removeItem('medpulse_last_lesson_title');
    localStorage.removeItem('medpulse_last_lesson_chapter');
    localStorage.removeItem('nursing_quiz_attempts');
    localStorage.removeItem('nursing_student_results');
    localStorage.removeItem('medpulse_student_progress');

    window.dispatchEvent(new CustomEvent(COMPLETION_EVENT, { detail: { reset: true } }));
    window.dispatchEvent(new Event('storage'));

    // Non-blocking sync to backend
    try {
      const token =
        localStorage.getItem('nursing_token') ||
        localStorage.getItem('token') ||
        localStorage.getItem('firebase_token');
      if (token && navigator.onLine) {
        await fetch('/api/progress/sync', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ completedUnitIds: [], attempts: [] })
        });
      }
    } catch {}
  } catch (err) {
    console.warn('[CurriculumProgress] Reset error:', err);
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
