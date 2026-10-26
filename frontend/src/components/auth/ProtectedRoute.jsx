import React from 'react';
import { Navigate, useLocation, Outlet, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { currentUser, role, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 text-neutral-900">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
          <p className="text-neutral-500 font-semibold text-xs tracking-wide">Verifying credentials...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    const dashboardPath =
      role === 'admin'
        ? '/admin/dashboard'
        : role === 'faculty'
          ? '/faculty/dashboard'
          : '/';

    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 text-neutral-900 p-6">
        <div className="max-w-md w-full bg-white border border-neutral-200 shadow-xl rounded-3xl p-8 text-center">
          <div className="w-16 h-16 bg-green-50 text-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-green-200">
            <span className="text-3xl">🚫</span>
          </div>
          <h2 className="text-xl font-extrabold text-neutral-900 mb-2">Access Restricted</h2>
          <p className="text-neutral-600 text-xs sm:text-sm mb-6 leading-relaxed">
            Your current role (<span className="text-green-700 font-bold">{role}</span>) does not have permission to view this section.
          </p>
          <Link
            to={dashboardPath}
            className="inline-flex items-center justify-center px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl shadow-md shadow-green-600/20 transition-all cursor-pointer"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
