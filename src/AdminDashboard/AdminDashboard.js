import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css'; // Make sure to include your CSS

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Navigate to user details page
  const handleUserDetails = () => {
    navigate('/admin/user-details');
  };

  // Navigate to product manage page
  const handleProductManage = () => {
    navigate('/admin/product-manage');
  };

  return (
    <div className="admin-dashboard">
      <h1>Welcome to the Admin Dashboard</h1>
      <div className="button-container">
        <button onClick={handleUserDetails} className="rectangle-button">
          User Details
        </button>
        <button onClick={handleProductManage} className="rectangle-button">
          Product Manage
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
