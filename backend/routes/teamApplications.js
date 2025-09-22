import express from 'express';
import { body, validationResult } from 'express-validator';
import TeamApplication from '../models/TeamApplication.js';
import { auth, checkPermission } from '../middleware/auth.js';

const router = express.Router();

// ---------- Application Validation ----------
const applicationValidation = [
  body('fullName').trim().isLength({ min: 2, max: 50 }).withMessage('Full name must be 2-50 chars'),
  body('email').isEmail().normalizeEmail().withMessage('Invalid email'),
  body('mobile').trim().isLength({ min: 10, max: 15 }).withMessage('Mobile 10-15 chars'),
  body('profession').isIn(['doctor','nurse','physiotherapist','psychologist']).withMessage('Invalid profession'),
  body('experience').trim().isLength({ min: 1, max: 100 }).withMessage('Experience 1-100 chars'),
  body('location').trim().isLength({ min: 2, max: 100 }).withMessage('Location 2-100 chars'),
  body('resume').isURL().withMessage('Resume must be a valid URL')
];

// ---------- Submit Team Application (Public) ----------
router.post('/submit', applicationValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array().map(e => ({ field: e.param, msg: e.msg }))
      });
    }

    const existingApplication = await TeamApplication.findOne({
      email: req.body.email,
      profession: req.body.profession
    });
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this profession' });
    }

    const application = new TeamApplication({
      fullName: req.body.fullName,
      email: req.body.email,
      mobile: req.body.mobile,
      profession: req.body.profession,
      experience: req.body.experience,
      location: req.body.location,
      resume: req.body.resume, // store the URL directly
      notes: req.body.notes
    });

    await application.save();
    res.status(201).json({ message: 'Application submitted successfully', applicationId: application._id });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ---------- Get All Applications (Admin) ----------
router.get('/', auth, checkPermission('viewApplications'), async (req, res) => {
  try {
    const { status, profession, search } = req.query;
    let query = {};
    if (status) query.status = status;
    if (profession) query.profession = profession;
    if (search) query.$or = [
      { fullName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];

    const applications = await TeamApplication.find(query).sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ---------- Get Single Application (Admin) ----------
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

// ---------- Update Application Status (Admin) ----------
router.patch('/:id/status', auth, checkPermission('updateApplications'), [
  body('status').isIn(['pending', 'approved', 'rejected']).withMessage('Invalid status'),
  body('adminNotes').optional().trim().isLength({ max: 500 }).withMessage('Admin notes too long')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ message: 'Validation failed', errors: errors.array() });

    const { status, adminNotes } = req.body;
    const application = await TeamApplication.findByIdAndUpdate(
      req.params.id,
      { status, adminNotes },
      { new: true }
    );
    if (!application) return res.status(404).json({ message: 'Application not found' });

    res.json({ message: 'Application status updated successfully', application });
  } catch (error) {
    console.error('Error updating application:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ---------- Delete Application (Admin) ----------
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

export default router;
