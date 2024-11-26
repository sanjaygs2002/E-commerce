import React, { useState, useEffect } from 'react';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch products from the backend
    fetch('http://localhost:5000/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));

    // Fetch the logged-in user from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    console.log(loggedInUser); // Check if this logs the user correctly
    
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleAddToCart = async (product) => {
    if (!user) {
      alert('Please log in first to add products to the cart');
      return;
    }

    const updatedCart = [...user.cart, { ...product, quantity: 1 }];
    const updatedUser = { ...user, cart: updatedCart };

    try {
      await fetch(`http://localhost:5000/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      });

      // Update localStorage with the new cart
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      alert('Added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div className="products-container">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={`./image/${product.image}`} alt={product.name} />
          <h3>{product.name}</h3>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Color:</strong> {product.color}</p>
          <p><strong>Gender:</strong> {product.gender}</p>
          <p><strong>Rating:</strong> {product.rating} ★</p>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default Products;
