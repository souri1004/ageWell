import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';
import TeamApplication from '../models/TeamApplication.js';
import BetaUser from '../models/BetaUser.js';

dotenv.config({ path: './config.env' });

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding data');

    // Clear existing data
    await Admin.deleteMany({});
    await TeamApplication.deleteMany({});
    await BetaUser.deleteMany({});
    console.log('Cleared existing data');

    // Create super admin
    const superAdmin = new Admin({
      username: 'superadmin',
      email: 'admin@agewell.com',
      password: 'admin123456',
      role: 'super_admin',
      permissions: {
        viewApplications: true,
        updateApplications: true,
        deleteApplications: true,
        manageUsers: true
      }
    });

    await superAdmin.save();
    console.log('Super admin created:', superAdmin.email);

    // Create regular admin
    const regularAdmin = new Admin({
      username: 'admin',
      email: 'staff@agewell.com',
      password: 'staff123456',
      role: 'admin',
      permissions: {
        viewApplications: true,
        updateApplications: true,
        deleteApplications: false,
        manageUsers: false
      }
    });

    await regularAdmin.save();
    console.log('Regular admin created:', regularAdmin.email);

    // Create sample team applications
    const sampleApplications = [
      {
        fullName: 'Dr. Sarah Johnson',
        email: 'sarah.johnson@email.com',
        mobile: '+1-555-0123',
        profession: 'doctor',
        experience: '15 years in geriatric care',
        location: 'New York, NY',
        status: 'pending',
        notes: 'Specializes in geriatric medicine'
      },
      {
        fullName: 'Nurse Michael Chen',
        email: 'michael.chen@email.com',
        mobile: '+1-555-0124',
        profession: 'nurse',
        experience: '8 years in home healthcare',
        location: 'Los Angeles, CA',
        status: 'approved',
        notes: 'Excellent bedside manner'
      },
      {
        fullName: 'Dr. Emily Rodriguez',
        email: 'emily.rodriguez@email.com',
        mobile: '+1-555-0125',
        profession: 'psychologist',
        experience: '12 years in mental health',
        location: 'Chicago, IL',
        status: 'pending',
        notes: 'Specializes in elderly mental health'
      }
    ];

    for (const app of sampleApplications) {
      const application = new TeamApplication(app);
      await application.save();
    }
    console.log('Sample team applications created');

    // Create sample beta users
    const sampleBetaUsers = [
      {
        fullName: 'John Smith',
        email: 'john.smith@email.com',
        mobile: '+1-555-0126',
        betaTier: 'early_access',
        preferences: {
          notifications: true,
          updates: true,
          marketing: false
        },
        status: 'active'
      },
      {
        fullName: 'Mary Wilson',
        email: 'mary.wilson@email.com',
        mobile: '+1-555-0127',
        betaTier: 'premium',
        preferences: {
          notifications: true,
          updates: true,
          marketing: true
        },
        status: 'active'
      },
      {
        fullName: 'Robert Brown',
        email: 'robert.brown@email.com',
        mobile: '+1-555-0128',
        betaTier: 'standard',
        preferences: {
          notifications: false,
          updates: true,
          marketing: false
        },
        status: 'waitlist'
      }
    ];

    for (const user of sampleBetaUsers) {
      const betaUser = new BetaUser(user);
      await betaUser.save();
    }
    console.log('Sample beta users created');

    console.log('Data seeding completed successfully!');
    console.log('\nDefault Admin Credentials:');
    console.log('Super Admin - Email: admin@agewell.com, Password: admin123456');
    console.log('Regular Admin - Email: staff@agewell.com, Password: staff123456');

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Always run seeding when this file is executed
seedData();