import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [betaUsers, setBetaUsers] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [filteredBetaUsers, setFilteredBetaUsers] = useState([]);
  const [currentTab, setCurrentTab] = useState("applications");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [adminName, setAdminName] = useState("Admin");
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    totalUsers: 0,
    activeUsers: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("all");

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      window.location.href = "/admin";
      return;
    }
    loadDashboardData(token);
  }, []);
  const API_URL = import.meta.env.VITE_API_URL;

  const loadDashboardData = async (token) => {
    try {
      setLoading(true);

      // Fetch admin profile
      const profileRes = await fetch(`${API_URL}/api/admin/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!profileRes.ok) throw new Error("Invalid token");
      const profileData = await profileRes.json();
      setAdminName(profileData.username || "Admin");

      // Fetch applications and beta users concurrently
      await Promise.all([fetchApplications(token), fetchBetaUsers(token)]);
    } catch (err) {
      console.error("Dashboard load error:", err);
      localStorage.removeItem("adminToken");
      window.location.href = "/admin";
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async (token) => {
    try {
      const res = await fetch(`${API_URL}/api/team-applications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Applications fetch status:", res.status);

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to fetch applications");
      }

      const data = await res.json();
      setApplications(data);
      setFilteredApplications(data);
      updateStats(data, betaUsers);
    } catch (err) {
      console.error("Fetch applications error:", err);
      setError(err.message);
    }
  };

  const fetchBetaUsers = async (token) => {
    try {
      const res = await fetch(`${API_URL}/api/beta-users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Beta users fetch status:", res.status);

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to fetch beta users");
      }

      const data = await res.json();
      setBetaUsers(data);
      setFilteredBetaUsers(data);
      updateStats(applications, data);
    } catch (err) {
      console.error("Fetch beta users error:", err);
      setError(err.message);
    }
  };

  const updateStats = (apps, users) => {
    const pendingApps = apps.filter((app) => app.status === "pending").length;
    const activeUsers = users.filter((user) => user.status === "active").length;

    setStats({
      totalApplications: apps.length,
      pendingApplications: pendingApps,
      totalUsers: users.length,
      activeUsers,
    });
  };

  const handleTabSwitch = (tab) => {
    setCurrentTab(tab);
    setSearchTerm("");
    setFilterValue("all");
  };

  const handleFilter = () => {
    if (currentTab === "applications") {
      const filtered = applications.filter((app) => {
        const matchesFilter = filterValue === "all" || app.status === filterValue;
        const matchesSearch =
          app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.email.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
      });
      setFilteredApplications(filtered);
    } else {
      const filtered = betaUsers.filter((user) => {
        const matchesFilter = filterValue === "all" || user.status === filterValue;
        const matchesSearch =
          user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
      });
      setFilteredBetaUsers(filtered);
    }
  };

  useEffect(() => {
    handleFilter();
  }, [searchTerm, filterValue, currentTab, applications, betaUsers]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin";
  };

  const updateApplicationStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API_URL}/api/team-applications/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to update status");
      }

      const updatedApps = applications.map((app) =>
        app._id === id ? { ...app, status } : app
      );
      setApplications(updatedApps);
      handleFilter();
      updateStats(updatedApps, betaUsers);
    } catch (err) {
      console.error("Update status error:", err);
      setError(err.message);
    }
  };

  return (
    <div className="admin-dashboard-page">
      {/* Header */}
      <div className="admin-header">
        <div className="header-content">
          <div className="header-info">
            <h1>Admin Dashboard</h1>
            <p>Welcome back, {adminName}</p>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="admin-content">
        {/* Stats */}
        <div className="stats-cards">
          <div className="stat-card">
            <h3>Total Applications</h3>
            <div className="number">{stats.totalApplications}</div>
          </div>
          <div className="stat-card">
            <h3>Pending Applications</h3>
            <div className="number">{stats.pendingApplications}</div>
          </div>
          <div className="stat-card">
            <h3>Total Beta Users</h3>
            <div className="number">{stats.totalUsers}</div>
          </div>
          <div className="stat-card">
            <h3>Active Users</h3>
            <div className="number">{stats.activeUsers}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="admin-tabs">
          <div className="tab-buttons">
            <button
              className={`tab-btn ${currentTab === "applications" ? "active" : ""}`}
              onClick={() => handleTabSwitch("applications")}
            >
              Team Applications
            </button>
            <button
              className={`tab-btn ${currentTab === "users" ? "active" : ""}`}
              onClick={() => handleTabSwitch("users")}
            >
              Beta Users
            </button>
          </div>

          <div className="search-filter">
            <input
              type="text"
              className="search-input"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="filter-select"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            >
              {currentTab === "applications" ? (
                <>
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </>
              ) : (
                <>
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="waitlist">Waitlist</option>
                </>
              )}
            </select>
          </div>
        </div>

        {/* Error */}
        {error && <div className="error-message">{error}</div>}

        {/* Loading */}
        {loading ? (
          <div className="loading">
            <h3>Loading Dashboard...</h3>
            <p>Please wait while we fetch your data.</p>
          </div>
        ) : (
          <>
            {/* Applications Section */}
            {currentTab === "applications" && (
              <div className="data-section">
                <div className="section-header">
                  <h2>Team Applications</h2>
                </div>
                <div className="data-grid">
                  {filteredApplications.length === 0 ? (
                    <div className="no-data">No applications found</div>
                  ) : (
                    filteredApplications.map((app) => (
                      <div key={app._id} className="data-card">
                        <div className="card-header">
                          <h3>{app.fullName}</h3>
                          <span className={`status-badge status-${app.status}`}>
                            {app.status}
                          </span>
                        </div>
                        <div className="card-details">
                          <div className="detail-row">
                            <span className="detail-label">Email:</span>
                            <span className="detail-value">{app.email}</span>
                          </div>
                          <div className="detail-row">
                            <span className="detail-label">Mobile:</span>
                            <span className="detail-value">{app.mobile}</span>
                          </div>
                          <div className="detail-row">
                            <span className="detail-label">Profession:</span>
                            <span className="detail-value">{app.profession}</span>
                          </div>
                          <div className="detail-row">
                            <span className="detail-label">Resume:</span>
                            <span className="detail-value">
                              <a
                                href={app.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View Resume
                              </a>
                            </span>
                          </div>
                        </div>
                        <div className="card-actions">
                          <select
                            className="status-select"
                            value={app.status}
                            onChange={(e) =>
                              updateApplicationStatus(app._id, e.target.value)
                            }
                          >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Users Section */}
            {currentTab === "users" && (
              <div className="data-section">
                <div className="section-header">
                  <h2>Beta Users</h2>
                </div>
                <div className="data-grid">
                  {filteredBetaUsers.length === 0 ? (
                    <div className="no-data">No users found</div>
                  ) : (
                    filteredBetaUsers.map((user) => (
                      <div key={user._id} className="data-card">
                        <div className="card-header">
                          <h3>{user.fullName}</h3>
                          <span className={`status-badge status-${user.status}`}>
                            {user.status}
                          </span>
                        </div>
                        <div className="card-details">
                          <div className="detail-row">
                            <span className="detail-label">Email:</span>
                            <span className="detail-value">{user.email}</span>
                          </div>
                          <div className="detail-row">
                            <span className="detail-label">Mobile:</span>
                            <span className="detail-value">{user.mobile}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
