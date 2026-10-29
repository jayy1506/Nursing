/**
 * Service to synchronize client-side localStorage data with MongoDB Atlas.
 * Handles:
 *  - Course/Unit & Lesson completion progress ('nursing_lms_completed_units', 'nursing_biochem_completed_lessons')
 *  - Offline quiz attempts & assessment submissions ('nursing_quiz_attempts')
 *  - Bi-directional sync & auto-merging across student devices
 */

const COMPLETED_UNITS_KEY = 'nursing_lms_completed_units';
const BIOCHEM_COMPLETED_KEY = 'nursing_biochem_completed_lessons';
const ATTEMPTS_STORAGE_KEY = 'nursing_quiz_attempts';
const LAST_SYNC_KEY = 'nursing_last_cloud_sync_time';
const SYNC_EVENT = 'nursing_cloud_sync_completed';

export const getStoredToken = () => {
  try {
    return (
      localStorage.getItem('nursing_token') ||
      localStorage.getItem('token') ||
      localStorage.getItem('firebase_token') ||
      null
    );
  } catch {
    return null;
  }
};

/**
 * Returns current sync status and count of pending offline items
 */
export const getSyncStats = () => {
  try {
    const rawAttempts = localStorage.getItem(ATTEMPTS_STORAGE_KEY);
    const attempts = rawAttempts ? JSON.parse(rawAttempts) : [];
    const pendingAttempts = attempts.filter((a) => !a.synced);

    const rawUnits = localStorage.getItem(COMPLETED_UNITS_KEY);
    const units = rawUnits ? JSON.parse(rawUnits) : [];

    const rawBiochem = localStorage.getItem(BIOCHEM_COMPLETED_KEY);
    const biochem = rawBiochem ? JSON.parse(rawBiochem) : [];

    const lastSync = localStorage.getItem(LAST_SYNC_KEY);

    return {
      pendingAttemptsCount: pendingAttempts.length,
      totalCompletedUnits: new Set([...units, ...biochem]).size,
      totalAttempts: attempts.length,
      lastSyncedAt: lastSync ? new Date(lastSync) : null
    };
  } catch {
    return {
      pendingAttemptsCount: 0,
      totalCompletedUnits: 0,
      totalAttempts: 0,
      lastSyncedAt: null
    };
  }
};

/**
 * Performs full bidirectional synchronization between localStorage and MongoDB
 */
export const syncLocalStorageToMongoDB = async () => {
  const token = getStoredToken();
  if (!token) {
    return {
      success: false,
      reason: 'unauthenticated',
      message: 'Please sign in to sync your progress to cloud MongoDB.'
    };
  }

  const results = {
    progressSynced: 0,
    attemptsSynced: 0,
    timestamp: new Date().toISOString()
  };

  try {
    // 1. Gather all local completed unit/lesson IDs
    const rawUnits = localStorage.getItem(COMPLETED_UNITS_KEY);
    const localUnits = rawUnits ? JSON.parse(rawUnits) : [];

    const rawBiochem = localStorage.getItem(BIOCHEM_COMPLETED_KEY);
    const localBiochem = rawBiochem ? JSON.parse(rawBiochem) : [];

    const combinedLocalUnits = Array.from(new Set([...localUnits, ...localBiochem]));

    // 2. Sync Progress to MongoDB & fetch server-merged state
    const progressRes = await fetch('/api/progress/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        completedUnitIds: combinedLocalUnits
      })
    });

    if (progressRes.ok) {
      const progData = await progressRes.json();
      if (progData.success && Array.isArray(progData.completedUnitIds)) {
        // Merge cloud progress back into localStorage so student gets progress on all devices
        localStorage.setItem(COMPLETED_UNITS_KEY, JSON.stringify(progData.completedUnitIds));
        results.progressSynced = progData.completedUnitIds.length;

        // Notify app components of updated progress
        window.dispatchEvent(
          new CustomEvent('nursing_lms_completion_updated', {
            detail: { sync: true, completedCount: progData.completedUnitIds.length }
          })
        );
      }
    }

    // 3. Sync offline quiz attempts to MongoDB
    const rawAttempts = localStorage.getItem(ATTEMPTS_STORAGE_KEY);
    const allAttempts = rawAttempts ? JSON.parse(rawAttempts) : [];
    const unsyncedAttempts = allAttempts.filter((a) => !a.synced);

    if (unsyncedAttempts.length > 0) {
      const attemptsRes = await fetch('/api/assessments/sync-offline', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          attempts: unsyncedAttempts
        })
      });

      if (attemptsRes.ok) {
        const attData = await attemptsRes.json();
        if (attData.success) {
          // Mark attempts as synced in localStorage
          const updatedAttempts = allAttempts.map((a) => ({ ...a, synced: true }));
          localStorage.setItem(ATTEMPTS_STORAGE_KEY, JSON.stringify(updatedAttempts));
          results.attemptsSynced = attData.syncedCount || unsyncedAttempts.length;
        }
      }
    }

    // Record last successful sync timestamp
    localStorage.setItem(LAST_SYNC_KEY, results.timestamp);

    window.dispatchEvent(
      new CustomEvent(SYNC_EVENT, {
        detail: results
      })
    );

    return {
      success: true,
      message: 'All local learning progress and quiz attempts successfully synchronized with MongoDB Atlas.',
      ...results
    };
  } catch (err) {
    console.error('[CloudSync] Sync error:', err);
    return {
      success: false,
      error: err.message || 'Network error during cloud sync',
      ...results
    };
  }
};

/**
 * Initializes automatic background synchronization on network reconnect
 */
let autoSyncInitialized = false;
export const initAutoSync = () => {
  if (autoSyncInitialized || typeof window === 'undefined') return;
  autoSyncInitialized = true;

  window.addEventListener('online', () => {
    const token = getStoredToken();
    if (token) {
      console.info('[CloudSync] Connection restored. Synchronizing localStorage to MongoDB...');
      syncLocalStorageToMongoDB();
    }
  });
};
