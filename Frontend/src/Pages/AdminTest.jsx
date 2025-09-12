import React, { useState, useEffect } from "react";
import "../styles/AdminApiTest.css";
import api from "../utils/api";

export default function AdminApiTest() {
  const [token, setToken] = useState(localStorage.getItem("adminToken"));
  const [loginResult, setLoginResult] = useState("");
  const [apiResult, setApiResult] = useState("");
  const [email, setEmail] = useState("admin@agewell.com");
  const [password, setPassword] = useState("admin123456");

  useEffect(() => {
    setToken(localStorage.getItem("adminToken"));
  }, []);

  const handleLogin = async () => {
    try {
      const res = await fetch(api.adminLogin, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("adminToken", data.token);
        setToken(data.token);
        setLoginResult(<pre className="success">Login Success ✅\n{JSON.stringify(data, null, 2)}</pre>);
      } else {
        setLoginResult(<span className="error">Login failed: {data.message}</span>);
      }
    } catch (err) {
      setLoginResult(<span className="error">Error: {err.message}</span>);
    }
  };

  const testApi = async (endpoint, label) => {
    if (!token) {
      setApiResult(<span className="error">No token. Please login first.</span>);
      return;
    }
    try {
      const res = await fetch(endpoint, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (res.ok) {
        setApiResult(<pre className="success">{label} ✅\n{JSON.stringify(data, null, 2)}</pre>);
      } else {
        setApiResult(<span className="error">{label} failed: {data.message}</span>);
      }
    } catch (err) {
      setApiResult(<span className="error">Error: {err.message}</span>);
    }
  };

  const clearToken = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
    setLoginResult("");
    setApiResult("");
  };

  return (
    <div className="apitest-container">
      <h1>Admin API Test Page</h1>

      <div className="test-section">
        <h3>1. Test Admin Login</h3>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Test Login</button>
        <div>{loginResult}</div>
      </div>

      <div className="test-section">
        <h3>2. Test API Endpoints</h3>
        <button onClick={() => testApi(api.adminProfile, "Profile API")}>Test Profile</button>
        <button onClick={() => testApi(api.teamApplications, "Applications API")}>Test Applications</button>
        <button onClick={() => testApi(api.betaUsers, "Beta Users API")}>Test Beta Users</button>
        <div>{apiResult}</div>
      </div>

      <div className="test-section">
        <h3>3. Current Token</h3>
        <div>{token || "No token"}</div>
        <button onClick={clearToken}>Clear Token</button>
      </div>
    </div>
  );
}
