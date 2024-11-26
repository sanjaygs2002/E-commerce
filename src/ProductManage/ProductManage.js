import React, { useState, useEffect } from "react";
import './ProductManage.css'; // Ensure you're using the CSS file

const ProductManage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    rating: 0,
    brand: "",
    color: "",
    gender: "",
    price: 0,
    offers: "",
    description: "",
    image: null,
  });
  const [editProductId, setEditProductId] = useState(null); // Store the ID of the product being edited

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setNewProduct({ ...newProduct, image: e.target.files[0]?.name || newProduct.image });
  };

  const addProduct = (e) => {
    e.preventDefault();
    if (editProductId === null) {
      // Adding a new product
      fetch("http://localhost:5000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      })
        .then((response) => response.json())
        .then((newProductData) => {
          setProducts([...products, newProductData]);
          resetForm();
        })
        .catch((error) => console.error("Error adding product:", error));
    } else {
      // Save edited product
      saveEdit(e);
    }
  };

  const handleEdit = (id) => {
    const productToEdit = products.find((product) => product.id === id);
    setEditProductId(id); // Set the ID of the product being edited
    setNewProduct({ ...productToEdit });
  };

  const saveEdit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/products/${editProductId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((updatedProduct) => {
        setProducts(
          products.map((product) =>
            product.id === editProductId ? updatedProduct : product
          )
        );
        setEditProductId(null); // Reset after editing
        resetForm();
      })
      .catch((error) => console.error("Error updating product:", error));
  };

  const deleteProduct = (id) => {
    fetch(`http://localhost:5000/products/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setProducts(products.filter((product) => product.id !== id));
        } else {
          console.error("Failed to delete product");
        }
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  const resetForm = () => {
    setNewProduct({
      name: "",
      rating: 0,
      brand: "",
      color: "",
      gender: "",
      price: 0,
      offers: "",
      description: "",
      image: null,
    });
    setEditProductId(null); // Reset edit mode
  };

  return (
    <div className="container">
      <h1>Product Management</h1>

      <form onSubmit={addProduct}>
        <h3>{editProductId ? "Edit Product" : "Add New Product"}</h3>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating"
          value={newProduct.rating}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={newProduct.brand}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="color"
          placeholder="Color"
          value={newProduct.color}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="gender"
          placeholder="Gender"
          value={newProduct.gender}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="offers"
          placeholder="Offers"
          value={newProduct.offers}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={newProduct.description}
          onChange={handleInputChange}
          required
        />
        <input type="file" name="image" onChange={handleImageChange} />
        <button type="submit">{editProductId ? "Save Changes" : "Add Product"}</button>
        {editProductId && <button onClick={resetForm}>Cancel Edit</button>}
      </form>

      <div className="product-list">
        {products.map((product) => (
          <div className="product-item" key={product.id}>
            <img src={`/image/${product.image}`} alt={product.name} />
            <div className="product-details">
              <h4>{product.name}</h4>
              <p><strong>Brand:</strong> {product.brand}</p>
              <p><strong>Color:</strong> {product.color}</p>
              <p><strong>Gender:</strong> {product.gender}</p>
              <p><strong>Rating:</strong> {product.rating}</p>
              <p><strong>Price:</strong> ${product.price}</p>
              <p><strong>Offers:</strong> {product.offers}</p>
              <p><strong>Description:</strong> {product.description}</p>
            </div>
            <button className="edit" onClick={() => handleEdit(product.id)}>Edit</button>
            <button className="delete" onClick={() => deleteProduct(product.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManage;
