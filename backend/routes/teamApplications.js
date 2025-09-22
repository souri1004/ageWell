import express from 'express';
import { body, validationResult } from 'express-validator';
import TeamApplication from '../models/TeamApplication.js';
import { auth, checkPermission } from '../middleware/auth.js';

const router = express.Router();

// Validation rules
const applicationValidation = [
  body('fullName').trim().isLength({ min: 2, max: 50 }).withMessage('Full name must be between 2 and 50 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('mobile').trim().isLength({ min: 10, max: 15 }).withMessage('Mobile number must be between 10 and 15 characters'),
  body('profession').isIn(['doctor', 'nurse', 'physiotherapist', 'psychologist']).withMessage('Invalid profession'),
  body('experience').trim().isLength({ min: 1, max: 100 }).withMessage('Experience must be between 1 and 100 characters'),
  body('location').trim().isLength({ min: 2, max: 100 }).withMessage('Location must be between 2 and 100 characters'),
  body('resumeLink').isURL().withMessage('Resume link must be a valid URL')
];

// Submit team application (public route)
router.post('/submit', applicationValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    // Check if application already exists for this email and profession
    const existingApplication = await TeamApplication.findOne({
      email: req.body.email,
      profession: req.body.profession
    });

    if (existingApplication) {
      return res.status(400).json({ 
        message: 'You have already applied for this profession' 
      });
    }

    // Create application data
    const applicationData = {
      fullName: req.body.fullName,
      email: req.body.email,
      mobile: req.body.mobile,
      profession: req.body.profession,
      experience: req.body.experience,
      location: req.body.location,
      resumeLink: req.body.resumeLink,
      notes: req.body.notes
    };

    const application = new TeamApplication(applicationData);
    await application.save();

    res.status(201).json({
      message: 'Application submitted successfully',
      applicationId: application._id
    });

  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all applications (admin only)
router.get('/', auth, checkPermission('viewApplications'), async (req, res) => {
  try {
    const { page = 1, limit = 10, status, profession, search } = req.query;
    
    let query = {};

    if (status) query.status = status;
    if (profession) query.profession = profession;
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const applications = await TeamApplication.find(query)
      .sort({ applicationDate: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single application (admin only)
router.get('/:id', auth, checkPermission('viewApplications'), async (req, res) => {
  try {
    const application = await TeamApplication.findById(req.params.id);
    if (!application) return res.status(404).json({ message: 'Application not found' });
    res.json(application);
  } catch (error) {
    console.error('Error fetching application:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update application status (admin only)
router.patch('/:id/status', auth, checkPermission('updateApplications'),
  [
    body('status').isIn(['pending', 'approved', 'rejected']).withMessage('Invalid status'),
    body('adminNotes').optional().trim().isLength({ max: 500 }).withMessage('Admin notes too long')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
      }

      const { status, adminNotes } = req.body;

      const application = await TeamApplication.findByIdAndUpdate(
        req.params.id,
        { status, adminNotes, updatedAt: Date.now() },
        { new: true }
      );

      if (!application) return res.status(404).json({ message: 'Application not found' });

      res.json({ message: 'Application status updated successfully', application });
    } catch (error) {
      console.error('Error updating application:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Delete application (admin only)
router.delete('/:id', auth, checkPermission('deleteApplications'), async (req, res) => {
  try {
    const application = await TeamApplication.findById(req.params.id);
    if (!application) return res.status(404).json({ message: 'Application not found' });

    await TeamApplication.findByIdAndDelete(req.params.id);
    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Error deleting application:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get application statistics (admin only)
router.get('/stats/overview', auth, checkPermission('viewApplications'), async (req, res) => {
  try {
    const stats = await TeamApplication.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const professionStats = await TeamApplication.aggregate([
      { $group: { _id: '$profession', count: { $sum: 1 } } }
    ]);

    const totalApplications = await TeamApplication.countDocuments();
    const pendingApplications = await TeamApplication.countDocuments({ status: 'pending' });

    res.json({ totalApplications, pendingApplications, statusBreakdown: stats, professionBreakdown: professionStats });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
