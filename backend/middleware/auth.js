import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select('-password');
    
    if (!admin || !admin.isActive) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export const checkPermission = (permission) => {
  return (req, res, next) => {
    console.log('Permission check - Required permission:', permission);
    console.log('Admin permissions:', req.admin.permissions);
    console.log('Permission exists:', req.admin.permissions[permission]);
    
    if (!req.admin.permissions[permission]) {
      console.log('Permission denied for:', permission);
      return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
    }
    
    console.log('Permission granted for:', permission);
    next();
  };
};
