// src/components/SignUp/SignUp.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Create a new user object with empty cart and orderHistory
    const newUser = {
      userName,
      email,
      password,
      phoneNo,
      cart: [],
      orderHistory: [],
    };

    // Send POST request to save the user in db.json
    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      
      if (response.ok) {
        alert('User registered successfully!');
        navigate('/login');  // Navigate to login page after registration
      } else {
        alert('Failed to register user');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form className="signup-form" onSubmit={handleRegister}>
        <label>UserName:</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />

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

        <label>Phone Number:</label>
        <input
          type="tel"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
          required
        />

        <button type="submit" className="signup-btn">Register</button>
      </form>

      <p className='login'>Already registered? <Link to="/login">Login here</Link></p>
    </div>
  );
};

export default SignUp;
