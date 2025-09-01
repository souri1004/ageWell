import express from 'express';
import { body, validationResult } from 'express-validator';
import BetaUser from '../models/BetaUser.js';
import { auth, checkPermission } from '../middleware/auth.js';

const router = express.Router();

// Validation rules
const betaUserValidation = [
  body('fullName').trim().isLength({ min: 2, max: 50 }).withMessage('Full name must be between 2 and 50 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('mobile').trim().isLength({ min: 10, max: 15 }).withMessage('Mobile number must be between 10 and 15 characters'),
  body('betaTier').optional().isIn(['early_access', 'standard', 'premium']).withMessage('Invalid beta tier'),
  body('preferences.notifications').optional().isBoolean().withMessage('Notifications preference must be boolean'),
  body('preferences.updates').optional().isBoolean().withMessage('Updates preference must be boolean'),
  body('preferences.marketing').optional().isBoolean().withMessage('Marketing preference must be boolean')
];

// Join beta program (public route)
router.post('/join', 
  betaUserValidation,
  async (req, res) => {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          message: 'Validation failed', 
          errors: errors.array() 
        });
      }

      // Check if user already exists
      const existingUser = await BetaUser.findOne({ email: req.body.email });

      if (existingUser) {
        return res.status(400).json({ 
          message: 'You are already registered for our beta program' 
        });
      }

      // Create user data
      const userData = {
        fullName: req.body.fullName,
        email: req.body.email,
        mobile: req.body.mobile,
        betaTier: req.body.betaTier || 'standard',
        preferences: {
          notifications: req.body.preferences?.notifications ?? true,
          updates: req.body.preferences?.updates ?? true,
          marketing: req.body.preferences?.marketing ?? false
        }
      };

      const betaUser = new BetaUser(userData);
      await betaUser.save();

      res.status(201).json({
        message: 'Successfully joined our beta program!',
        userId: betaUser._id,
        betaTier: betaUser.betaTier
      });

    } catch (error) {
      console.error('Error joining beta program:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Get all beta users (admin only)
router.get('/', auth, checkPermission('viewApplications'), async (req, res) => {
  try {
    console.log('GET /api/beta-users - Request received');
    console.log('Admin user:', req.admin.username, 'Role:', req.admin.role);
    console.log('Admin permissions:', req.admin.permissions);
    
    const { page = 1, limit = 10, status, betaTier, search } = req.query;
    
    let query = {};
    
    // Filter by status
    if (status) {
      query.status = status;
    }
    
    // Filter by beta tier
    if (betaTier) {
      query.betaTier = betaTier;
    }
    
    // Search by name or email
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    console.log('Query:', query);
    
    const users = await BetaUser.find(query)
      .sort({ signupDate: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
    
    console.log('Found beta users:', users.length);
    
    res.json(users);
  } catch (error) {
    console.error('Error fetching beta users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single beta user (admin only)
router.get('/:id', auth, checkPermission('viewApplications'), async (req, res) => {
  try {
    const user = await BetaUser.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);

  } catch (error) {
    console.error('Error fetching beta user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update beta user (admin only)
router.patch('/:id', 
  auth, 
  checkPermission('updateApplications'),
  [
    body('status').optional().isIn(['active', 'inactive', 'waitlist']).withMessage('Invalid status'),
    body('betaTier').optional().isIn(['early_access', 'standard', 'premium']).withMessage('Invalid beta tier'),
    body('notes').optional().trim().isLength({ max: 500 }).withMessage('Notes too long')
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
      delete updateData.email; // Prevent email change
      
      const user = await BetaUser.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({
        message: 'User updated successfully',
        user
      });

    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Delete beta user (admin only)
router.delete('/:id', auth, checkPermission('deleteApplications'), async (req, res) => {
  try {
    const user = await BetaUser.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await BetaUser.findByIdAndDelete(req.params.id);

    res.json({ message: 'User deleted successfully' });

  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get beta program statistics (admin only)
router.get('/stats/overview', auth, checkPermission('viewApplications'), async (req, res) => {
  try {
    const stats = await BetaUser.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const tierStats = await BetaUser.aggregate([
      {
        $group: {
          _id: '$betaTier',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalUsers = await BetaUser.countDocuments();
    const activeUsers = await BetaUser.countDocuments({ status: 'active' });
    const waitlistUsers = await BetaUser.countDocuments({ status: 'waitlist' });

    // Monthly signup trend
    const monthlyTrend = await BetaUser.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$signupDate' },
            month: { $month: '$signupDate' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    res.json({
      totalUsers,
      activeUsers,
      waitlistUsers,
      statusBreakdown: stats,
      tierBreakdown: tierStats,
      monthlyTrend
    });

  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user preferences (public route - requires email verification)
router.patch('/preferences/update', 
  [
    body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
    body('preferences').isObject().withMessage('Preferences must be an object')
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

      const { email, preferences } = req.body;

      const user = await BetaUser.findOneAndUpdate(
        { email },
        { preferences },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({
        message: 'Preferences updated successfully',
        preferences: user.preferences
      });

    } catch (error) {
      console.error('Error updating preferences:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

export default router;
