import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import database connection
import connectDB from './config/database.js';

// Import routes
import teamApplications from './routes/teamApplications.js';
import betaUsers from './routes/betaUsers.js';
import admin from './routes/admin.js';

dotenv.config({ path: './config.env' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/team-applications', teamApplications);
app.use('/api/beta-users', betaUsers);
app.use('/api/admin', admin);

// Admin dashboard route
app.get('/admin', (req, res) => {
  res.json({ /* ... */ });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ /* ... */ });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ /* ... */ });
});

// Error handling middleware
app.use((err, req, res, next) => {
  // ... your error handling logic
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Correct: Export the app for Vercel
export default app; // Or use module.exports = app; for CommonJS