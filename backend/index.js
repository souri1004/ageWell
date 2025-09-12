// index.js
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

// Connect Database
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // React app
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/team-applications', teamApplications);
app.use('/api/beta-users', betaUsers);
app.use('/api/admin', admin);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Backend running',
    version: '1.0.0'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: "Welcome to AgeWell Backend API",
    version: "1.0.0",
    endpoints: {
      teamApplications: "/api/team-applications",
      betaUsers: "/api/beta-users",
      admin: "/api/admin"
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error middleware:", err.message);
  res.status(500).json({ message: "Server error" });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Export app for Vercel
export default app;
