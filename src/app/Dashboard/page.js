"use client";

import { useState, useEffect } from 'react';

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    size: 'M',
    color: 'lightgray',
    image: '',
    units: 0,
    hidden: false,
  });

  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleAddProduct = () => {
    const newProductId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const productToAdd = { ...newProduct, id: newProductId };

    const updatedProducts = [...products, productToAdd];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setNewProduct({
      name: '',
      size: 'M',
      color: 'lightgray',
      image: '',
      units: 0,
      hidden: false,
    });
  };

  const handleRemoveProduct = (id) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const handleHideProduct = (id) => {
    const updatedProducts = products.map(product =>
      product.id === id ? { ...product, hidden: !product.hidden } : product
    );
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  return (
    <main className="admin-dashboard">
      <h2>Product Dashboard</h2>

      <div className="add-product">
        <h3>Add New Product</h3>
        <input
          type="text"
          name="name"
          value={newProduct.name}
          placeholder="Product Name"
          onChange={handleInputChange}
          style={{
            width: '100%',
            padding: '0.5rem',
            marginBottom: '1rem',
            border: '1px solid #ced4da',
            borderRadius: '4px',
          }}
        />
        <input
          type="text"
          name="image"
          value={newProduct.image}
          placeholder="Image File Name"
          onChange={handleInputChange}
          style={{
            width: '100%',
            padding: '0.5rem',
            marginBottom: '1rem',
            border: '1px solid #ced4da',
            borderRadius: '4px',
          }}
        />
        <input
          type="number"
          name="units"
          value={newProduct.units}
          placeholder="Units"
          onChange={handleInputChange}
          style={{
            width: '100%',
            padding: '0.5rem',
            marginBottom: '1rem',
            border: '1px solid #ced4da',
            borderRadius: '4px',
          }}
        />
        <select
          name="size"
          value={newProduct.size}
          onChange={handleInputChange}
          style={{
            width: '100%',
            padding: '0.5rem',
            marginBottom: '1rem',
            border: '1px solid #ced4da',
            borderRadius: '4px',
          }}
        >
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
        </select>
        <input
          type="color"
          name="color"
          value={newProduct.color}
          onChange={handleInputChange}
        />
        <label>
          Hide Product:
          <input
            type="checkbox"
            name="hidden"
            checked={newProduct.hidden}
            onChange={handleInputChange}
          />
        </label>
        <button
          onClick={handleAddProduct}
          style={{
            width: '100%',
            padding: '0.5rem',
            marginBottom: '1rem',
            border: '1px solid #ced4da',
            borderRadius: '4px',
          }}
        >
          Add Product
        </button>
      </div>

      <div className="product-list">
        <h3>Existing Products</h3>
        <ul>
          {products.map(product => (
            <li key={product.id}>
              {product.name} - {product.units} units - {product.hidden ? 'Hidden' : 'Visible'}
              <button onClick={() => handleHideProduct(product.id)}>
                {product.hidden ? 'Unhide' : 'Hide'}
              </button>
              <button onClick={() => handleRemoveProduct(product.id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
