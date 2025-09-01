# AgeWell Backend API

A comprehensive Node.js backend for the AgeWell eldercare platform, built with Express.js and MongoDB.

## Features

### 🏥 Team Applications (Healthcare Professionals)
- Submit job applications with resume uploads
- Professional validation and duplicate prevention
- Admin approval workflow (pending/approved/rejected)
- File upload support (PDF, DOC, DOCX, TXT)
- Comprehensive application tracking

### 🚀 Beta Program (Users)
- User registration for beta testing
- Preference management (notifications, updates, marketing)
- Beta tier system (early_access, standard, premium)
- User status management (active, inactive, waitlist)

### 🔐 Admin Management
- Secure JWT-based authentication
- Role-based access control (admin, super_admin)
- Permission-based operations
- Comprehensive admin dashboard
- User and application management

## Tech Stack

- **Runtime**: Node.js with ES6 modules
- **Framework**: Express.js 5.x
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with bcryptjs
- **File Upload**: Multer with validation
- **Validation**: Express-validator
- **CORS**: Cross-origin resource sharing enabled

## Prerequisites

- Node.js 18+ 
- MongoDB 5+ (local or cloud)
- npm or yarn package manager

## Installation

1. **Clone and navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   - Copy `config.env` and update with your values:
   ```env
   MONGODB_URI=mongodb://localhost:27017/agewell
   PORT=5000
   JWT_SECRET=your_secure_jwt_secret_here
   UPLOAD_PATH=./uploads
   ```

4. **Start MongoDB**
   - Local: Ensure MongoDB service is running
   - Cloud: Update MONGODB_URI with your connection string

5. **Seed Initial Data (Optional)**
   ```bash
   npm run seed
   ```

6. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Team Applications
- `POST /api/team-applications/submit` - Submit application
- `GET /api/team-applications` - Get all applications (admin)
- `GET /api/team-applications/:id` - Get single application (admin)
- `PATCH /api/team-applications/:id/status` - Update status (admin)
- `DELETE /api/team-applications/:id` - Delete application (admin)
- `GET /api/team-applications/stats/overview` - Get statistics (admin)

### Beta Users
- `POST /api/beta-users/join` - Join beta program
- `GET /api/beta-users` - Get all users (admin)
- `GET /api/beta-users/:id` - Get single user (admin)
- `PATCH /api/beta-users/:id` - Update user (admin)
- `DELETE /api/beta-users/:id` - Delete user (admin)
- `GET /api/beta-users/stats/overview` - Get statistics (admin)
- `PATCH /api/beta-users/preferences/update` - Update preferences

### Admin
- `POST /api/admin/login` - Admin login
- `GET /api/admin/profile` - Get admin profile
- `PATCH /api/admin/profile` - Update admin profile
- `PATCH /api/admin/change-password` - Change password
- `POST /api/admin/create` - Create new admin (super admin)
- `GET /api/admin/list` - List all admins (super admin)
- `PATCH /api/admin/:id/permissions` - Update permissions (super admin)
- `PATCH /api/admin/:id/deactivate` - Deactivate admin (super admin)
- `POST /api/admin/logout` - Logout

## Database Models

### TeamApplication
- Personal information (name, email, mobile)
- Professional details (profession, experience, location)
- Resume file information
- Application status and admin notes
- Timestamps and audit trail

### BetaUser
- User registration details
- Beta tier and preferences
- Account status and signup tracking
- Communication preferences

### Admin
- Authentication credentials
- Role-based permissions
- Activity tracking
- Security features

## File Upload

- **Supported formats**: PDF, DOC, DOCX, TXT
- **Maximum size**: 5MB
- **Storage**: Local file system (`./uploads` directory)
- **Security**: File type validation and sanitization

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs with salt rounds
- **Input Validation**: Comprehensive request validation
- **CORS Protection**: Configurable cross-origin policies
- **File Upload Security**: Type and size validation
- **Role-based Access**: Granular permission system

## Admin Dashboard Access

### Default Credentials
- **Super Admin**: admin@agewell.com / admin123456
- **Regular Admin**: staff@agewell.com / staff123456

### Permissions
- **View Applications**: View all applications and users
- **Update Applications**: Change application status and notes
- **Delete Applications**: Remove applications (super admin only)
- **Manage Users**: Create and manage admin accounts (super admin only)

## Development

### Scripts
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run seed       # Seed initial data
```

### Environment Variables
- `MONGODB_URI`: MongoDB connection string
- `PORT`: Server port (default: 5000)
- `JWT_SECRET`: Secret key for JWT tokens
- `UPLOAD_PATH`: File upload directory

### File Structure
```
backend/
├── config/
│   └── database.js          # Database connection
├── middleware/
│   ├── auth.js              # Authentication middleware
│   └── upload.js            # File upload middleware
├── models/
│   ├── Admin.js             # Admin user model
│   ├── TeamApplication.js   # Team application model
│   └── BetaUser.js          # Beta user model
├── routes/
│   ├── admin.js             # Admin routes
│   ├── teamApplications.js  # Team application routes
│   └── betaUsers.js         # Beta user routes
├── utils/
│   └── seedData.js          # Data seeding utility
├── uploads/                  # File upload directory
├── config.env               # Environment configuration
├── index.js                 # Main server file
└── package.json
```

## API Response Format

### Success Response
```json
{
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "message": "Error description",
  "errors": [ ... ]
}
```

## Error Handling

- **Validation Errors**: Detailed field-level validation messages
- **Authentication Errors**: Clear unauthorized access messages
- **File Upload Errors**: Specific file-related error messages
- **Database Errors**: Graceful error handling with logging

## Monitoring & Logging

- **Health Check**: `/api/health` endpoint
- **Error Logging**: Console and error middleware
- **Request Logging**: Express request logging
- **Database Logging**: Connection and query logging

## Production Considerations

- **Environment Variables**: Use proper .env files
- **JWT Secret**: Use strong, unique secrets
- **File Storage**: Consider cloud storage for production
- **Rate Limiting**: Implement API rate limiting
- **SSL/TLS**: Use HTTPS in production
- **Monitoring**: Add application monitoring
- **Backup**: Regular database backups

## Troubleshooting

### Common Issues
1. **MongoDB Connection**: Check connection string and service status
2. **Port Conflicts**: Ensure port 5000 is available
3. **File Permissions**: Check uploads directory permissions
4. **JWT Issues**: Verify JWT_SECRET is set correctly

### Debug Mode
```bash
DEBUG=* npm run dev
```

## Contributing

1. Follow existing code style
2. Add proper error handling
3. Include input validation
4. Update documentation
5. Test thoroughly

## License

This project is licensed under the ISC License.
