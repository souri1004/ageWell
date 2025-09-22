import mongoose from 'mongoose';

const teamApplicationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  mobile: {
    type: String,
    required: true,
    trim: true
  },
  profession: {
    type: String,
    required: true,
    enum: ['doctor', 'nurse', 'physiotherapist', 'psychologist']
  },
  experience: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  resumeLink: {   // 👈 replaced file object with just a link
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  applicationDate: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    trim: true
  },
  adminNotes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for efficient queries
teamApplicationSchema.index({ email: 1, profession: 1 });
teamApplicationSchema.index({ status: 1, applicationDate: -1 });

export default mongoose.model('TeamApplication', teamApplicationSchema);
