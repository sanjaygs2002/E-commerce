import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';  // Same CSS as used in SignUp

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Login handling function
  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Simulate a backend login or verify credentials
    const response = await fetch('http://localhost:5000/users');
    const users = await response.json();
    
    const foundUser = users.find(user => user.email === email && user.password === password);

    if (foundUser) {
      // Store the logged-in user data in localStorage
      localStorage.setItem('user', JSON.stringify(foundUser));
      alert('Login successful');
      navigate('/');  // Redirect to the products page
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div className='logo'>

    
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
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

        <button type="submit" className="login-btn">Login</button>
      </form>

      <p className='sign'>Not registered yet? <Link to="/signup">Sign Up here</Link></p>
    </div>
    </div>
  );
};

export default Login;
