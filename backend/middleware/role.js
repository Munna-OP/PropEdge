module.exports = function(requiredRoles = []) {
  // requiredRoles: string or array
  if (typeof requiredRoles === 'string') requiredRoles = [requiredRoles];
  return function (req, res, next) {
    const user = req.user;
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
      return res.status(403).json({ message: 'Forbidden: insufficient role' });
    }
    next();
  }
};
