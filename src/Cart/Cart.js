// src/components/Cart.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser && loggedInUser.cart) {
      setCart(loggedInUser.cart);
      calculateTotal(loggedInUser.cart);
    }
  }, []);

  const calculateTotal = (cartItems) => {
    const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(totalAmount);
  };

  const handleRemove = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    
    if (loggedInUser) {
      const updatedUser = { ...loggedInUser, cart: updatedCart };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setCart(updatedCart);
      calculateTotal(updatedCart);
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCart = cart.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    
    if (loggedInUser) {
      const updatedUser = { ...loggedInUser, cart: updatedCart };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setCart(updatedCart);
      calculateTotal(updatedCart);
    }
  };

  const handlePlaceOrder = () => {
    navigate('/shipping'); // Navigate to Shipping page
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
        
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={`./image/${item.image}`} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
                <p>Brand: {item.brand}</p>
                <p>Color: {item.color}</p>
                <p>Gender: {item.gender}</p>
                <p>Rating: {item.rating} ★</p>
                <div className="cart-item-quantity">
                  <button onClick={() => handleQuantityChange(item.id, Math.max(item.quantity - 1, 1))}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                </div>
                <button onClick={() => handleRemove(item.id)} className="remove-btn">Remove</button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <h3>Total Price: ${total.toFixed(2)}</h3>
            <button className="place-order-btn" onClick={handlePlaceOrder}>Place Order</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
