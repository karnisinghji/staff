import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const API_URL = 'http://localhost:3001/api/auth/login';

export const LoginPage: React.FC = () => {
  const { login, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  // Redirect if already logged in
  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, []);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessBar, setShowSuccessBar] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  const payload = { email: username, password };
  // Submitting login request
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      // Login response received
      if (res.ok && data.accessToken) {
        try {
          login(data.accessToken, data.user);
          setShowSuccessBar(true);
        } catch (loginErr) {
          setError('There was a problem saving your login. Please try again.');
          setLoading(false);
          return;
        }
        // navigation will happen in useEffect
      } else {
        if (data.error && typeof data.error === 'string' && data.error.toLowerCase().includes('invalid')) {
          setError('Invalid username or password. Please try again.');
        } else if (data.error && typeof data.error === 'object' && data.error.message) {
          setError(data.error.message);
        } else if (data.error) {
          setError(typeof data.error === 'string' ? data.error : 'Login failed. Please try again.');
        } else {
          setError('Login failed. Please try again.');
        }
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .login-bg {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f5f7fa;
          padding: 2rem;
        }
        .login-form {
          width: 100%;
          max-width: 420px;
          min-width: 320px;
          padding: 2.5rem 2.5rem 2rem 2.5rem;
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 4px 32px rgba(0,0,0,0.10);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .login-form h2 {
          text-align: center;
          margin-bottom: 1rem;
          color: #1976d2;
          font-size: 2rem;
          font-weight: 700;
        }
        .login-form input {
          padding: 1rem;
          border-radius: 10px;
          border: 1px solid #bbb;
          font-size: 1.1rem;
          background: #f7f9fc;
        }
        .login-form button {
          padding: 1rem;
          border-radius: 10px;
          border: none;
          background: #1976d2;
          color: #fff;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(25,118,210,0.08);
          transition: background 0.2s;
        }
        .login-form button:hover {
          background: #115293;
        }
        .login-form .error {
          color: red;
          text-align: center;
          font-weight: 500;
        }
        @media (max-width: 600px) {
          .login-form {
            max-width: 100vw;
            min-width: 0;
            padding: 1.2rem 0.5rem 1rem 0.5rem;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          }
          .login-form h2 {
            font-size: 1.4rem;
          }
          .login-form input, .login-form button {
            font-size: 1rem;
            padding: 0.7rem;
            border-radius: 7px;
          }
        }
      `}</style>
      <div className="login-bg">
        <form className="login-form" onSubmit={handleSubmit} aria-label="Login form" tabIndex={0}>
          <h2 id="login-title">Login</h2>
          {showSuccessBar && (
            <div className="success-bar" role="status" aria-live="polite">
              Login successful!
              <button className="close-btn" onClick={() => setShowSuccessBar(false)} aria-label="Close success message">&times;</button>
            </div>
          )}
          <label htmlFor="login-username" style={{display:'none'}}>Username</label>
          <input
            id="login-username"
            type="text"
            placeholder="Username (email or mobile)"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            aria-label="Username"
            autoComplete="username"
          />
          <label htmlFor="login-password" style={{display:'none'}}>Password</label>
          <input
            id="login-password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            aria-label="Password"
            autoComplete="current-password"
          />
          <div className="login-options-row">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
            <a href="/forgot-password" className="forgot-password-link">Forgot password?</a>
          </div>
          <button type="submit" disabled={loading} aria-busy={loading} aria-label="Login">
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && <div className="error" role="alert">{error}</div>}
        </form>
      </div>
      <style>{`
        .success-bar {
          background: #43a047;
          color: #fff;
          padding: 0.8rem 1.2rem;
          border-radius: 8px;
          font-weight: 600;
          text-align: center;
          margin-bottom: 1rem;
          position: relative;
          box-shadow: 0 2px 8px rgba(67,160,71,0.12);
          animation: fadeIn 0.3s;
        }
        .login-options-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: -0.5rem;
        }
        .remember-me {
          display: flex;
          align-items: center;
          font-size: 1rem;
          gap: 0.4rem;
        }
        .forgot-password-link {
          color: #1976d2;
          text-decoration: none;
          font-size: 1rem;
          transition: color 0.2s;
        }
        .forgot-password-link:hover {
          color: #115293;
          text-decoration: underline;
        }
        .close-btn {
          background: none;
          border: none;
          color: #fff;
          font-size: 1.2rem;
          position: absolute;
          right: 12px;
          top: 8px;
          cursor: pointer;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};
