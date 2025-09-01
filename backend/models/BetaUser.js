import mongoose from 'mongoose';

const betaUserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  mobile: {
    type: String,
    required: true,
    trim: true
  },
  signupDate: {
    type: Date,
    default: Date.now
  },
  betaTier: {
    type: String,
    enum: ['early_access', 'standard', 'premium'],
    default: 'standard'
  },
  preferences: {
    notifications: {
      type: Boolean,
      default: true
    },
    updates: {
      type: Boolean,
      default: true
    },
    marketing: {
      type: Boolean,
      default: false
    }
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'waitlist'],
    default: 'active'
  },
  lastLogin: {
    type: Date
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for efficient queries
betaUserSchema.index({ status: 1, signupDate: -1 });
betaUserSchema.index({ betaTier: 1 });

export default mongoose.model('BetaUser', betaUserSchema);
