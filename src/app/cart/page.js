"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
  }, []);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleProceedToCheckout = () => {
    router.push('/CheckOut'); // Redirect to the checkout page
  };

  if (cartItems.length === 0) {
    return <h2>Your cart is empty</h2>;
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {cartItems.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={`/images/${item.image}`} alt={item.name} className="cart-image" />
            <div className="cart-details">
              <p className="cart-name">{item.name}</p>
              <p>Size: {item.size}</p>
              <p>Color: <span className="color-swatch" style={{ backgroundColor: item.color }}></span></p>
              <p>Price: ${item.price}</p>
            </div>
            <div className="cart-quantity">
              <p>Quantity: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-total">
        <h3>Total Price: ${getTotalPrice()}</h3>
        <button className="checkout-button" onClick={handleProceedToCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
