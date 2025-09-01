import express from 'express';
import { body, validationResult } from 'express-validator';
import Admin from '../models/Admin.js';
import { auth, checkPermission } from '../middleware/auth.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Admin login
router.post('/login', 
  [
    body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          message: 'Validation failed', 
          errors: errors.array() 
        });
      }

      const { email, password } = req.body;

      // Find admin by email
      const admin = await Admin.findOne({ email });
      if (!admin || !admin.isActive) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Check password
      const isMatch = await admin.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Update last login
      admin.lastLogin = new Date();
      await admin.save();

      // Generate JWT token
      const payload = {
        id: admin._id,
        email: admin.email,
        role: admin.role
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

      res.json({
        message: 'Login successful',
        token,
        admin: {
          id: admin._id,
          username: admin.username,
          email: admin.email,
          role: admin.role,
          permissions: admin.permissions
        }
      });

    } catch (error) {
      console.error('Error during admin login:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Get admin profile
router.get('/profile', auth, async (req, res) => {
  try {
    console.log('GET /api/admin/profile - Request received');
    console.log('Admin ID from token:', req.admin.id);
    console.log('Admin data:', req.admin);
    
    const admin = await Admin.findById(req.admin.id).select('-password');
    console.log('Admin profile found:', admin ? 'Yes' : 'No');
    
    res.json(admin);
  } catch (error) {
    console.error('Error fetching admin profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update admin profile
router.patch('/profile', 
  auth,
  [
    body('username').optional().trim().isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters'),
    body('email').optional().isEmail().normalizeEmail().withMessage('Please provide a valid email')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          message: 'Validation failed', 
          errors: errors.array() 
        });
      }

      const updateData = { ...req.body };
      delete updateData.password; // Password update handled separately
      delete updateData.role; // Role update requires super admin
      delete updateData.permissions; // Permissions update requires super admin

      const admin = await Admin.findByIdAndUpdate(
        req.admin.id,
        updateData,
        { new: true }
      ).select('-password');

      res.json({
        message: 'Profile updated successfully',
        admin
      });

    } catch (error) {
      console.error('Error updating admin profile:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Change admin password
router.patch('/change-password',
  auth,
  [
    body('currentPassword').isLength({ min: 6 }).withMessage('Current password must be at least 6 characters'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          message: 'Validation failed', 
          errors: errors.array() 
        });
      }

      const { currentPassword, newPassword } = req.body;

      const admin = await Admin.findById(req.admin.id);
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }

      // Verify current password
      const isMatch = await admin.comparePassword(currentPassword);
      if (!isMatch) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }

      // Update password
      admin.password = newPassword;
      await admin.save();

      res.json({ message: 'Password changed successfully' });

    } catch (error) {
      console.error('Error changing password:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Create new admin (super admin only)
router.post('/create',
  auth,
  checkPermission('manageUsers'),
  [
    body('username').trim().isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters'),
    body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role').optional().isIn(['admin', 'super_admin']).withMessage('Invalid role')
  ],
  async (req, res) => {
    try {
      // Check if current admin is super admin
      if (req.admin.role !== 'super_admin') {
        return res.status(403).json({ message: 'Only super admins can create new admins' });
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          message: 'Validation failed', 
          errors: errors.array() 
        });
      }

      const { username, email, password, role = 'admin' } = req.body;

      // Check if admin already exists
      const existingAdmin = await Admin.findOne({ 
        $or: [{ email }, { username }] 
      });

      if (existingAdmin) {
        return res.status(400).json({ 
          message: 'Admin with this email or username already exists' 
        });
      }

      const admin = new Admin({
        username,
        email,
        password,
        role
      });

      await admin.save();

      res.status(201).json({
        message: 'Admin created successfully',
        admin: {
          id: admin._id,
          username: admin.username,
          email: admin.email,
          role: admin.role,
          permissions: admin.permissions
        }
      });

    } catch (error) {
      console.error('Error creating admin:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Get all admins (super admin only)
router.get('/list',
  auth,
  checkPermission('manageUsers'),
  async (req, res) => {
    try {
      // Check if current admin is super admin
      if (req.admin.role !== 'super_admin') {
        return res.status(403).json({ message: 'Only super admins can view admin list' });
      }

      const admins = await Admin.find({}).select('-password').sort({ createdAt: -1 });

      res.json(admins);

    } catch (error) {
      console.error('Error fetching admins:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Update admin permissions (super admin only)
router.patch('/:id/permissions',
  auth,
  checkPermission('manageUsers'),
  async (req, res) => {
    try {
      // Check if current admin is super admin
      if (req.admin.role !== 'super_admin') {
        return res.status(403).json({ message: 'Only super admins can update permissions' });
      }

      const { permissions } = req.body;

      if (!permissions || typeof permissions !== 'object') {
        return res.status(400).json({ message: 'Permissions object is required' });
      }

      const admin = await Admin.findByIdAndUpdate(
        req.params.id,
        { permissions },
        { new: true }
      ).select('-password');

      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }

      res.json({
        message: 'Permissions updated successfully',
        admin
      });

    } catch (error) {
      console.error('Error updating permissions:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Deactivate admin (super admin only)
router.patch('/:id/deactivate',
  auth,
  checkPermission('manageUsers'),
  async (req, res) => {
    try {
      // Check if current admin is super admin
      if (req.admin.role !== 'super_admin') {
        return res.status(403).json({ message: 'Only super admins can deactivate admins' });
      }

      // Prevent self-deactivation
      if (req.params.id === req.admin.id) {
        return res.status(400).json({ message: 'Cannot deactivate yourself' });
      }

      const admin = await Admin.findByIdAndUpdate(
        req.params.id,
        { isActive: false },
        { new: true }
      ).select('-password');

      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }

      res.json({
        message: 'Admin deactivated successfully',
        admin
      });

    } catch (error) {
      console.error('Error deactivating admin:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Logout (client-side token removal)
router.post('/logout', auth, (req, res) => {
  res.json({ message: 'Logout successful' });
});

export default router;
