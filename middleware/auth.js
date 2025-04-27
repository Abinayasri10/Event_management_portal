import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, _, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return next({ status: 401, message: 'Not logged in' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch {
    next({ status: 401, message: 'Token failed' });
  }
};

export const authorize =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next({ status: 403, message: 'Forbidden' });
    next();
  };
