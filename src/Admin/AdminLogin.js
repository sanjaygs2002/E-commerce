import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    try {
      // Fetch admin credentials from backend (e.g., json-server)
      const response = await fetch('http://localhost:4000/admin');
      const adminData = await response.json();

      if (adminData.email === email && adminData.password === password) {
        // Store admin data in localStorage after successful login
        localStorage.setItem('admin', JSON.stringify(adminData));
        alert('Login successfully');
        navigate('/admin-dashboard'); // Navigate to Admin Dashboard
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
      alert('Something went wrong');
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleAdminLogin} className="admin-login-form">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="admin-login-btn">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
