"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ProceedToCheckout = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [signUp, setSignUp] = useState(false);
  const router = useRouter();

  const handlePay = () => {
    // Implement payment logic here
    router.push('/'); // Redirect to the home page after payment
  };

  const handleSignUp = () => {
    router.push('/auth/signin'); // Redirect to the sign-up page
  };

  return (
    <div className="checkout-container">
      <h2>Billing Details</h2>
      <div className="billing-details">
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
          />
        </label>
        <label>
          Phone Number:
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
          />
        </label>
      </div>

      <div className="order-tracking">
        <h3>Order Tracking</h3>
        <p>You&#39;ll receive a confirmation email with your tracking details after the payment.</p>
      </div>

      <div className="sign-up-option">
        <label>
          <input
            type="checkbox"
            checked={signUp}
            onChange={(e) => setSignUp(e.target.checked)}
          />
          Sign up to save your details for future purchases
        </label>
        {signUp && (
          <p className="sign-up-link" onClick={handleSignUp}>
            Go to Sign Up Page
          </p>
        )}
      </div>

      <button className="pay-button" onClick={handlePay}>
        Pay Now
      </button>
    </div>
  );
};

export default ProceedToCheckout;
