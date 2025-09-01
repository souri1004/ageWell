import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminData, setAdminData] = useState(null);
  const [applications, setApplications] = useState([]);
  const [betaUsers, setBetaUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('applications');
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Check if admin is already logged in
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsLoggedIn(true);
      fetchAdminData(token);
    }
  }, []);

  const fetchAdminData = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setAdminData(data);
        fetchApplications(token);
        fetchBetaUsers(token);
      } else {
        localStorage.removeItem('adminToken');
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
  };

  const fetchApplications = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/team-applications', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setApplications(data);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const fetchBetaUsers = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/beta-users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setBetaUsers(data);
      }
    } catch (error) {
      console.error('Error fetching beta users:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('adminToken', data.token);
        setIsLoggedIn(true);
        setAdminData(data.admin);
        fetchApplications(data.token);
        fetchBetaUsers(data.token);
      } else {
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    setAdminData(null);
    setApplications([]);
    setBetaUsers([]);
  };

  const updateApplicationStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/team-applications/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        // Update local state
        setApplications(prev => 
          prev.map(app => 
            app._id === id ? { ...app, status } : app
          )
        );
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesFilter = filter === 'all' || app.status === filter;
    const matchesSearch = app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filteredBetaUsers = betaUsers.filter(user => {
    const matchesFilter = filter === 'all' || user.status === filter;
    const matchesSearch = user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (!isLoggedIn) {
    return (
      <div className="admin-login">
        <div className="admin-login-container">
          <div className="admin-login-header">
            <h1>🔐 Admin Login</h1>
            <p>Access AgeWell Admin Dashboard</p>
          </div>
          
          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Enter admin email"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="Enter password"
              />
            </div>
            
            <button type="submit" disabled={loading} className="login-btn">
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="admin-login-info">
            <h3>Default Admin Credentials:</h3>
            <p><strong>Super Admin:</strong> admin@agewell.com / admin123456</p>
            <p><strong>Regular Admin:</strong> staff@agewell.com / staff123456</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="admin-info">
          <h1>👨‍💼 Admin Dashboard</h1>
          <p>Welcome back, {adminData?.username || 'Admin'}!</p>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="admin-tabs">
        <button
          className={`tab ${activeTab === 'applications' ? 'active' : ''}`}
          onClick={() => setActiveTab('applications')}
        >
          Team Applications ({applications.length})
        </button>
        <button
          className={`tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Beta Users ({betaUsers.length})
        </button>
      </div>

      <div className="admin-controls">
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="active">Active</option>
            <option value="waitlist">Waitlist</option>
          </select>
        </div>
      </div>

      {activeTab === 'applications' && (
        <div className="applications-section">
          <h2>Team Applications</h2>
          <div className="applications-grid">
            {filteredApplications.map((app) => (
              <div key={app._id} className="application-card">
                <div className="application-header">
                  <h3>{app.fullName}</h3>
                  <span className={`status ${app.status}`}>{app.status}</span>
                </div>
                <div className="application-details">
                  <p><strong>Email:</strong> {app.email}</p>
                  <p><strong>Mobile:</strong> {app.mobile}</p>
                  <p><strong>Profession:</strong> {app.profession}</p>
                  <p><strong>Experience:</strong> {app.experience}</p>
                  <p><strong>Location:</strong> {app.location}</p>
                  {app.notes && <p><strong>Notes:</strong> {app.notes}</p>}
                </div>
                <div className="application-actions">
                  <select
                    value={app.status}
                    onChange={(e) => updateApplicationStatus(app._id, e.target.value)}
                    className="status-select"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="users-section">
          <h2>Beta Users</h2>
          <div className="users-grid">
            {filteredBetaUsers.map((user) => (
              <div key={user._id} className="user-card">
                <div className="user-header">
                  <h3>{user.fullName}</h3>
                  <span className={`status ${user.status}`}>{user.status}</span>
                </div>
                <div className="user-details">
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Mobile:</strong> {user.mobile}</p>
                  <p><strong>Beta Tier:</strong> {user.betaTier}</p>
                  <p><strong>Signup Date:</strong> {new Date(user.signupDate).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
