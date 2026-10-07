export const requireRole = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized: User authentication required.'
      });
    }

    const userRole = req.user.role || 'student';

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        error: `Forbidden: Access restricted to roles [${allowedRoles.join(', ')}]. Your current role is '${userRole}'.`
      });
    }

    next();
  };
};
