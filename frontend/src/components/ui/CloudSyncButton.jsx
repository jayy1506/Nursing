import React, { useState, useEffect, useCallback } from 'react';
import { Cloud, CloudCheck, RefreshCw, AlertCircle, Database } from 'lucide-react';
import { syncLocalStorageToMongoDB, getSyncStats } from '../../services/mongoSyncService';
import { useAuth } from '../../context/AuthContext';

export const CloudSyncButton = ({ compact = false, className = '' }) => {
  const { currentUser } = useAuth();
  const [syncing, setSyncing] = useState(false);
  const [stats, setStats] = useState(getSyncStats());
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message: string }
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const refreshStats = useCallback(() => {
    setStats(getSyncStats());
  }, []);

  useEffect(() => {
    refreshStats();

    const handleSyncEvent = () => refreshStats();
    const handleProgressEvent = () => refreshStats();

    window.addEventListener('nursing_cloud_sync_completed', handleSyncEvent);
    window.addEventListener('nursing_lms_completion_updated', handleProgressEvent);

    return () => {
      window.removeEventListener('nursing_cloud_sync_completed', handleSyncEvent);
      window.removeEventListener('nursing_lms_completion_updated', handleProgressEvent);
    };
  }, [refreshStats]);

  const handleSync = async (e) => {
    e?.stopPropagation();
    if (syncing) return;

    if (!currentUser) {
      setFeedback({
        type: 'error',
        message: 'Please sign in to sync local storage data to MongoDB Atlas.'
      });
      setTimeout(() => setFeedback(null), 3500);
      return;
    }

    setSyncing(true);
    setFeedback(null);

    try {
      const res = await syncLocalStorageToMongoDB();
      if (res.success) {
        refreshStats();
        setFeedback({
          type: 'success',
          message: `Synced ${res.progressSynced} units & ${res.attemptsSynced} attempts to MongoDB!`
        });
      } else {
        setFeedback({
          type: 'error',
          message: res.error || res.message || 'Sync failed. Will retry when connected.'
        });
      }
    } catch (err) {
      setFeedback({
        type: 'error',
        message: err.message || 'Sync failed.'
      });
    } finally {
      setSyncing(false);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  const formatLastSync = (date) => {
    if (!date) return 'Not synced yet';
    const diff = Math.floor((new Date() - date) / 1000);
    if (diff < 10) return 'Just now';
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  if (compact) {
    return (
      <div className={`relative inline-flex items-center ${className}`}>
        <button
          type="button"
          onClick={handleSync}
          disabled={syncing}
          onMouseEnter={() => setTooltipOpen(true)}
          onMouseLeave={() => setTooltipOpen(false)}
          className={`relative p-2 rounded-xl border transition-all cursor-pointer shadow-xs focus-visible:ring-2 focus-visible:ring-emerald-500 ${
            syncing
              ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
              : stats.pendingAttemptsCount > 0
              ? 'bg-amber-50 border-amber-300 text-amber-700 hover:bg-amber-100'
              : 'bg-white hover:bg-neutral-100 border-neutral-300 text-neutral-700'
          }`}
          aria-label="Sync local storage to MongoDB"
          title="Sync Local Storage to MongoDB Atlas"
        >
          {syncing ? (
            <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
          ) : stats.pendingAttemptsCount > 0 ? (
            <Cloud className="w-4 h-4 text-amber-600" />
          ) : (
            <CloudCheck className="w-4 h-4 text-emerald-600" />
          )}

          {/* Pending badge indicator */}
          {stats.pendingAttemptsCount > 0 && !syncing && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-white shadow-xs">
              {stats.pendingAttemptsCount}
            </span>
          )}
        </button>

        {/* Hover / Status Tooltip */}
        {(tooltipOpen || feedback) && (
          <div className="absolute right-0 top-full mt-2 w-64 p-3 bg-neutral-900/95 backdrop-blur-md text-white text-xs rounded-xl shadow-xl z-50 border border-neutral-700 animate-in fade-in slide-in-from-top-1 duration-150">
            <div className="flex items-center justify-between pb-1.5 border-b border-neutral-700 mb-2">
              <span className="font-bold flex items-center gap-1.5 text-emerald-400">
                <Database className="w-3.5 h-3.5" /> MongoDB Atlas Sync
              </span>
              <span className="text-[10px] text-neutral-400">
                {formatLastSync(stats.lastSyncedAt)}
              </span>
            </div>

            <div className="space-y-1 text-[11px] text-neutral-300">
              <div className="flex justify-between">
                <span>Completed Units (local):</span>
                <span className="font-semibold text-white">{stats.totalCompletedUnits}</span>
              </div>
              <div className="flex justify-between">
                <span>Quiz Attempts:</span>
                <span className="font-semibold text-white">{stats.totalAttempts}</span>
              </div>
              {stats.pendingAttemptsCount > 0 && (
                <div className="flex justify-between text-amber-300 font-medium">
                  <span>Pending upload:</span>
                  <span>{stats.pendingAttemptsCount} offline attempt(s)</span>
                </div>
              )}
            </div>

            {feedback && (
              <div
                className={`mt-2 pt-2 border-t text-[11px] font-medium ${
                  feedback.type === 'success'
                    ? 'border-emerald-700 text-emerald-300'
                    : 'border-red-700 text-rose-300'
                }`}
              >
                {feedback.message}
              </div>
            )}

            <div className="mt-2.5 pt-2 border-t border-neutral-800 text-[10px] text-neutral-400 text-center">
              Click icon to force push local storage to MongoDB
            </div>
          </div>
        )}
      </div>
    );
  }

  // Full Expanded Card / Button layout
  return (
    <div className={`p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 shadow-xs ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-neutral-900 flex items-center gap-2">
              Cloud Synchronization
              {stats.pendingAttemptsCount > 0 ? (
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-amber-100 text-amber-800 rounded-full">
                  {stats.pendingAttemptsCount} Pending
                </span>
              ) : (
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-100 text-emerald-800 rounded-full">
                  All Synced
                </span>
              )}
            </h4>
            <p className="text-[11px] text-neutral-500 mt-0.5">
              Syncs completed lessons & offline quiz results from localStorage to MongoDB Atlas.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSync}
          disabled={syncing}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs shrink-0 ${
            syncing
              ? 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-md active:scale-95'
          }`}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
          <span>{syncing ? 'Syncing...' : 'Sync Now'}</span>
        </button>
      </div>

      <div className="mt-3 pt-3 border-t border-neutral-200 flex items-center justify-between text-[11px] text-neutral-500">
        <span>Last cloud sync: <strong className="text-neutral-700">{formatLastSync(stats.lastSyncedAt)}</strong></span>
        <span>{stats.totalCompletedUnits} units • {stats.totalAttempts} attempts</span>
      </div>

      {feedback && (
        <div
          className={`mt-2.5 px-3 py-2 rounded-xl text-xs flex items-center gap-2 animate-in fade-in duration-150 ${
            feedback.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}
        >
          {feedback.type === 'success' ? (
            <CloudCheck className="w-4 h-4 shrink-0 text-emerald-600" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}
    </div>
  );
};

export default CloudSyncButton;
