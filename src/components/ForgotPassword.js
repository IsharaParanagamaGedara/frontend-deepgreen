import React, { useState } from 'react';
import axios from 'axios';
import '../assets/styles/Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');

    if (!email) {
      setError('Email is required.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/auth/forgot-password', { email });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Forgot Password error:', error);
      setError('Email not found. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title" data-testid="forgot-password-title">Forgot Password</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              data-testid="email-input"
            />
          </div>
          {message && <p className="auth-message" data-testid="auth-message">{message}</p>}
          {error && <p className="auth-error" data-testid="auth-error">{error}</p>}
          <button type="submit" className="auth-button" disabled={loading} data-testid="submit-button">
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
