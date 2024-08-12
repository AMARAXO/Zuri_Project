"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const authenticateUser = (email, password) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user && user.email === email && user.password === password;
};

const signUpUser = (email, password) => {
  const user = { email, password };
  localStorage.setItem('user', JSON.stringify(user));
};

export default function Auth() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignIn = () => {
    if (authenticateUser(email, password)) {
      setIsSignedIn(true);
      setError('');
      router.push('/');  // Redirect to the home page
    } else {
      setError('Invalid email or password.');
    }
  };

  const handleSignUp = () => {
    signUpUser(email, password);
    setIsSignedIn(true);
    setIsSignUp(false);
    router.push('/');  // Redirect to the home page
  };

  const handleLogout = () => {
    setIsSignedIn(false);
    setEmail('');
    setPassword('');
  };

  return (
    <div className='authContainer'>
      {isSignedIn ? (
        <div className='authBox'>
          <h2>Welcome, {email}!</h2>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <div className='authBox'>
          <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isSignUp ? (
            <button onClick={handleSignUp}>Sign Up</button>
          ) : (
            <button onClick={handleSignIn}>Sign In</button>
          )}
          {error && <p className='error'>{error}</p>}
          <p className='switch' onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </p>
          <p className='owner' >
            Are you are the owner?<a href='/Dashboard'> click here</a> 
          </p>
        </div>
      )}
    </div>
  );
}
