// src/Shipping/Shipping.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Shipping.css';

const Shipping = () => {
  const [shippingDetails, setShippingDetails] = useState({
    email: '',
    address: '',
    phone: '',
    paymentType: 'Cash on Delivery',
  });
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the logged-in user from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setShippingDetails((prevDetails) => ({
        ...prevDetails,
        email: loggedInUser.email,
      }));
      setCart(loggedInUser.cart || []); // Load the user's cart
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async () => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));

    if (!shippingDetails.address || !shippingDetails.phone) {
      alert('Please fill in all required fields.');
      return;
    }

    // Prepare the order data
    const order = {
      id: Date.now(), // Unique order ID
      products: cart,
      deliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Current date + 2 days
      orderDate: new Date().toISOString().split('T')[0], // Current date
      shippingDetails,
    };

    // Update user's order history
    const updatedUser = {
      ...loggedInUser,
      orderHistory: [...(loggedInUser.orderHistory || []), order],
      cart: [], // Empty the cart after placing the order
    };

    // Save the updated user data to localStorage
    try {
      // Update user data on the server (if needed)
      const response = await fetch(`http://localhost:5000/users/${loggedInUser.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error('Failed to update user data');
      }

      // Update localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      alert('Order placed successfully!');
      navigate('/orderHistory'); // Navigate to Order History page
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order. Please try again.');
    }
  };

  return (
    <div className="shipping-container">
      <h2>Shipping Details</h2>
      <form className="shipping-form">
        <label>Email:</label>
        <input type="email" value={shippingDetails.email} readOnly />

        <label>Shipping Address:</label>
        <input
          type="text"
          name="address"
          value={shippingDetails.address}
          onChange={handleInputChange}
          required
        />

        <label>Phone Number:</label>
        <input
          type="tel"
          name="phone"
          value={shippingDetails.phone}
          onChange={handleInputChange}
          required
        />

        <label>Payment Type:</label>
        <div className="payment-options">
          <input
            type="radio"
            id="cod"
            name="paymentType"
            value="Cash on Delivery"
            checked={shippingDetails.paymentType === 'Cash on Delivery'}
            onChange={handleInputChange}
          />
          <label htmlFor="cod">Cash on Delivery</label>

          <input
            type="radio"
            id="onlinePay"
            name="paymentType"
            value="Online Pay"
            checked={shippingDetails.paymentType === 'Online Pay'}
            onChange={handleInputChange}
          />
          <label htmlFor="onlinePay">Online Pay</label>
        </div>

        <button
          type="button"
          className="submit-btn"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Shipping;
