"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ProductGrid = () => {
  const initialProducts = [
    { id: 1, name: 'Product 1', size: 'M', color: 'lightgray', image: 'sneakers.jpg', units: 10 },
    { id: 2, name: 'Product 2', size: 'M', color: 'lightgray', image: 'ankleBoot.jpg', units: 5 },
    { id: 3, name: 'Product 3', size: 'M', color: 'lightgray', image: 'shoe3.jpg', units: 7 },
    { id: 4, name: 'Product 4', size: 'M', color: 'lightgray', image: 'shoe4.jpg', units: 12 },
    { id: 5, name: 'Product 5', size: 'M', color: 'lightgray', image: 'shoe5.jpg', units: 8 },
    { id: 6, name: 'Product 6', size: 'M', color: 'lightgray', image: 'shoe6.jpg', units: 4 },
    { id: 7, name: 'Product 7', size: 'M', color: 'lightgray', image: 'shoe7.jpg', units: 6 },
    { id: 8, name: 'Product 8', size: 'M', color: 'lightgray', image: 'shoe8.jpg', units: 3 },
    { id: 9, name: 'Product 9', size: 'M', color: 'lightgray', image: 'slippers.jpg', units: 9 },
    { id: 10, name: 'Product 10', size: 'M', color: 'lightgray', image: 'Loafers.jpg', units: 11 },
    { id: 11, name: 'Product 11', size: 'M', color: 'lightgray', image: 'runningShoes.jpg', units: 10 },
    { id: 12, name: 'Product 12', size: 'M', color: 'lightgray', image: 'heels.jpg', units: 2 },
  ];

  const [products, setProducts] = useState(initialProducts);
  const router = useRouter();

  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem('products');
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
      } else {
        localStorage.setItem('products', JSON.stringify(initialProducts));
      }
    } catch (error) {
      console.error('Failed to parse products from localStorage:', error);
      localStorage.removeItem('products'); 
      setProducts(initialProducts); // Reset to initial products
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleSizeChange = (id, newSize) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, size: newSize } : product
    ));
  };

  const handleColorChange = (id, newColor) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, color: newColor } : product
    ));
  };

  const handleAddToCart = (productId) => {
    const productToAdd = products.find(product => product.id === productId);
    if (productToAdd) {
      try {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = [...cart, productToAdd];
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        router.push('/cart'); // Redirect to the cart page
      } catch (error) {
        console.error('Failed to update the cart:', error);
      }
    }
  };

  return (
    <div>
      <h2>Available Wears</h2>
      <div className="product-grid">
        {products
          .filter(product => !product.hidden) // Filter out hidden products
          .map(product => (
            <div key={product.id} className="product-item">
              <img src={`/images/${product.image}`} alt={product.name} className="product-image" />
              <p>{product.name} - {product.units} units left</p>
              <div>
                <label>Size: </label>
                <select value={product.size} onChange={(e) => handleSizeChange(product.id, e.target.value)}>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                </select>
              </div>
              <div>
                <label>Color: </label>
                <input 
                  type="color" 
                  value={product.color} 
                  onChange={(e) => handleColorChange(product.id, e.target.value)} 
                />
              </div>
              <button onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductGrid;
