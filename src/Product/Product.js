// src/components/Product.js
import React from 'react';
import './Product.css';

const Product = ({ product }) => {
  const { name, rating, brand, color, gender, price, offers, description, image } = product;

  return (
    <div className="product-card">
      <img src={`/image/${image}`} alt={name} className="product-image" />
      <div className="product-info">
        <h2 className="product-name">{name}</h2>
        <p className="product-description">{description}</p>
        <p><strong>Brand:</strong> {brand}</p>
        <p><strong>Color:</strong> {color}</p>
        <p><strong>Gender:</strong> {gender}</p>
        <p><strong>Rating:</strong> {rating} ★</p>
        <p><strong>Price:</strong> {price.toFixed(2)}</p>
        <p className="product-offers">{offers}</p>
        <button className="buy-now-btn">Add To Cart</button>
      </div>
    </div>
  );
};

export default Product;
