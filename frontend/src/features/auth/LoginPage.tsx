import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { API_CONFIG } from '../../config/api';
export const LoginPage: React.FC = () => {
  const { login, token } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessBar, setShowSuccessBar] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const payload = { email: username, password };
    try {
      const res = await fetch(`${API_CONFIG.AUTH_SERVICE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok && data.accessToken) {
        try {
          login(data.accessToken, data.user);
          setShowSuccessBar(true);
        } catch (loginErr) {
          setError('There was a problem saving your login. Please try again.');
          setLoading(false);
        }
      } else if (data.error) {
        // Check if user tried to login with OAuth account using password
        if (data.error === 'OAUTH_LOGIN_REQUIRED') {
          setError('This account was created with Google/Facebook/Twitter. Please use the social login buttons below.');
        } else {
          setError(typeof data.error === 'string' ? data.error : 'Login failed. Please try again.');
        }
        setLoading(false);
      } else {
        setError('Login failed. Please try again.');
        setLoading(false);
      }
    } catch (err) {
      setError('Network error. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <>
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
            autoComplete="username"
            required
          />
          <label htmlFor="login-password" style={{display:'none'}}>Password</label>
          <input
            id="login-password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          <div style={{display:'flex',alignItems:'center',marginBottom:'1rem'}}>
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
              style={{marginRight:'0.5rem'}}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {error && <div className="error" role="alert">{error}</div>}
          <button type="submit" disabled={loading} aria-busy={loading} aria-label="Login">
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <a href="/forgot-password" className="forgot-password-link">Forgot password?</a>
        </form>
      </div>
      <style>{`
        .login-bg {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(120deg, #e3f2fd 0%, #f7f9fc 100%);
        }
        .login-form {
          background: #fff;
          padding: 2.5rem 2rem 2rem 2rem;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(25,118,210,0.10);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          min-width: 320px;
          max-width: 400px;
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
    </>
  );
};
