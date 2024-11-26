import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css'; // CSS file for styling

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for logged-in user (regular user)
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setUser(loggedInUser);
    }

    // Check for logged-in admin
    const loggedInAdmin = JSON.parse(localStorage.getItem('admin'));
    if (loggedInAdmin) {
      setAdmin(loggedInAdmin);
    }
  }, []);

  const handleLogout = () => {
    if (user) {
      // Logout user
      localStorage.removeItem('user'); // Remove user from localStorage
      setUser(null); // Update state to reflect logout
      navigate('/'); // Redirect to the home page after user logout
    } else if (admin) {
      // Logout admin
      localStorage.removeItem('admin'); // Remove admin from localStorage
      setAdmin(null); // Update state to reflect logout
      navigate('/admin'); // Redirect to the admin login page after admin logout
    }
  };

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">ProWatches</Link>
      </div>
      <div className="navbar-center">
        <span className="navbar-date">{formattedDate}</span>
      </div>
      <ul className="navbar-links">
        {/* Links for regular users (Cart and Order History) */}
        {user && !admin && (
          <>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/orderHistory">Order History</Link>
            </li>
            <li>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}

        {/* Links for Admin (Admin Dashboard and Logout) */}
        {admin && (
          <>
            {/* <li>
              <Link to="/admin-dashboard">Admin Dashboard</Link>
            </li> */}
            <li>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}

       
        {!user && !admin && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
