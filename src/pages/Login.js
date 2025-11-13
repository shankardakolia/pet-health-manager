// src/pages/Login.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../features/auth/authSlice';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authStatus = useSelector((state) => state.auth.status);
  const authError = useSelector((state) => state.auth.error);
  const user = useSelector((state) => state.auth.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const canSubmit = email && password && authStatus !== 'loading';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSubmit) {
      dispatch(login({ email, password }));
    }
  };

  // Redirect on successful login
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: 20, border: '1px solid #ddd', borderRadius: 8 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 12 }}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 12 }}
        />

        <button type="submit" disabled={!canSubmit} style={{ padding: '10px 15px', background: '#ff4901', color: 'white', border: 'none', cursor: 'pointer' }}>
          {authStatus === 'loading' ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {authStatus === 'failed' && (
        <p style={{ color: 'red', marginTop: 10 }}>
          {typeof authError === 'string' ? authError : authError?.message || 'Unknown error'}
        </p>
      )}
    </div>
  );
}
