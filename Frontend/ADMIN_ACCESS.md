# 🔐 AgeWell Admin Access

## **Admin Dashboard Access**

Your AgeWell website now has a **separate admin area** with a clean, professional interface that's completely separate from the main website.

## **🚀 How to Access:**

### **Option 1: From Main Website**
1. Go to your AgeWell website
2. Click the **"Admin"** button in the header navigation (blue button)
3. This opens the admin login in a new tab

### **Option 2: Direct URL Access**
- **Admin Login**: `http://localhost:3000/admin.html`
- **Admin Dashboard**: `http://localhost:3000/admin-dashboard.html` (after login)

## **🔑 Admin Credentials:**

### **Super Admin (Full Access)**
- **Email**: `admin@agewell.com`
- **Password**: `admin123456`
- **Permissions**: View, update, delete applications, manage users

### **Regular Admin (Limited Access)**
- **Email**: `staff@agewell.com`
- **Password**: `staff123456`
- **Permissions**: View and update applications only

## **📊 Dashboard Features:**

### **Statistics Overview:**
- **Total Applications** - Count of all team applications
- **Pending Applications** - Applications awaiting review
- **Total Beta Users** - Count of all beta program users
- **Active Users** - Currently active beta users

### **Team Applications Tab:**
- View all healthcare professional applications
- Filter by status (pending, approved, rejected)
- Search by name or email
- Update application status in real-time
- Clean, organized data display

### **Beta Users Tab:**
- View all beta program users
- Filter by status (active, waitlist)
- Search by name or email
- See user preferences and beta tier information

## **🎨 Design Features:**
- **Clean & Professional** - Minimalist design with proper spacing
- **Responsive Layout** - Works on all device sizes
- **Status Badges** - Color-coded status indicators
- **Real-time Updates** - Statistics update automatically
- **Error Handling** - Clear error messages and feedback
- **Formal Color Scheme** - Professional blues and grays

## **🔒 Security Features:**
- JWT token authentication
- Secure admin routes
- Role-based permissions
- Automatic logout on token expiry
- Separate admin domain
- Protected API endpoints

## **💻 Technical Details:**
- **Backend**: Node.js + Express.js on port 5000
- **Database**: MongoDB with sample data
- **Frontend**: Pure HTML/CSS/JavaScript (no React)
- **Authentication**: JWT tokens stored in localStorage
- **API Integration**: RESTful endpoints for all operations

## **⚠️ Important Notes:**
1. **Backend must be running** on port 5000 for admin to work
2. **Database must be seeded** with admin users
3. **Admin area is completely separate** from main website
4. **No admin components** are displayed on main website
5. **Data loads automatically** on dashboard initialization

## **🚀 Getting Started:**
1. Start your backend: `cd backend && npm run dev`
2. Seed the database: `npm run seed`
3. Start your frontend: `cd Frontend && npm run dev`
4. Click "Admin" in header or go to `/admin.html`
5. Login with credentials above
6. Explore the dashboard with sample data

## **🔧 Troubleshooting:**
- **Data not loading**: Check if backend is running on port 5000
- **Login fails**: Verify database is seeded with admin users
- **Network errors**: Ensure backend server is accessible
- **Page not found**: Check if admin HTML files are in the correct location

---

**Need Help?** Check the backend logs for any errors or contact support.
