import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { currentUser, role, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-neutral-400 font-medium">Verifying credentials...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white p-6">
        <div className="max-w-md w-full bg-neutral-900/80 border border-2 border-black dark:border-white/30 rounded-2xl p-8 text-center backdrop-blur-xl">
          <div className="w-16 h-16 bg-black dark:bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🚫</span>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Access Restricted</h2>
          <p className="text-neutral-400 text-sm mb-6">
            Your current role (<span className="text-green-400 font-semibold">{role}</span>) does not have permission to view this section.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-md transition-all"
          >
            Return to Dashboard
          </a>
        </div>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
