import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { API_CONFIG } from '../../config/api';
import { Capacitor } from '@capacitor/core';
import { Browser } from '@capacitor/browser';

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
      navigate('/team');
    }
  }, [token, navigate]);

  const handleGoogleLogin = async () => {
    const isNativePlatform = Capacitor.isNativePlatform();
    console.log('[handleGoogleLogin] isNativePlatform:', isNativePlatform);
    
    if (isNativePlatform) {
      // Generate a unique session ID for this OAuth attempt
      const sessionId = `mobile_oauth_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const authUrl = `${API_CONFIG.AUTH_SERVICE}/google?platform=mobile&sessionId=${sessionId}`;
      console.log('[handleGoogleLogin] Opening OAuth with sessionId:', sessionId);
      
      // Open OAuth in Chrome Custom Tab
      await Browser.open({ 
        url: authUrl,
        presentationStyle: 'popover'
      });
      
      // Poll the backend for tokens using the sessionId
      let pollAttempts = 0;
      const maxAttempts = 60; // 30 seconds total
      
      const pollForTokens = setInterval(async () => {
        pollAttempts++;
        console.log(`[OAuth Poll] Attempt ${pollAttempts}/${maxAttempts}`);
        
        if (pollAttempts >= maxAttempts) {
          clearInterval(pollForTokens);
          console.log('[OAuth Poll] Timeout - stopping poll');
          toast.error('Login timeout. Please try again.');
          return;
        }
        
        try {
          // Poll the backend for tokens
          const response = await fetch(`${API_CONFIG.AUTH_SERVICE}/oauth/poll/${sessionId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            
            if (data.accessToken && data.refreshToken && data.userId) {
              clearInterval(pollForTokens);
              console.log('[OAuth Poll] Tokens received! Logging in...');
              
              // Close browser
              await Browser.close();
              
              // Store refresh token
              localStorage.setItem('refreshToken', data.refreshToken);
              
              // Login
              const userObj = { id: data.userId };
              login(data.accessToken, userObj);
              
              // Navigate
              toast.success('Login successful!');
              navigate('/team');
            }
          }
        } catch (error) {
          console.log('[OAuth Poll] Error checking for tokens:', error);
          // Continue polling
        }
      }, 500); // Poll every 500ms
      
    } else {
      // On web: Use standard redirect
      const authUrl = `${API_CONFIG.AUTH_SERVICE}/google`;
      window.location.href = authUrl;
    }
  };

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
          
          <div className="divider">
            <span>OR</span>
          </div>
          
          <button type="button" className="social-btn google-btn" onClick={handleGoogleLogin}>
            <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
              <path d="M9.003 18c2.43 0 4.467-.806 5.956-2.18L12.05 13.56c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z" fill="#34A853"/>
              <path d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.426 0 9.003 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>
          
          <p style={{ marginTop: '10px', textAlign: 'center', fontSize: '14px', color: '#666' }}>
            Don't have an account? <a href="/register" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: '600' }}>Register here</a>
          </p>
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
        .divider {
          display: flex;
          align-items: center;
          text-align: center;
          margin: 1rem 0;
        }
        .divider::before,
        .divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid #ddd;
        }
        .divider span {
          padding: 0 10px;
          color: #999;
          font-weight: 600;
          font-size: 0.9rem;
        }
        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 0.9rem;
          border: 1px solid #ddd;
          border-radius: 10px;
          background: #fff;
          color: #333;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .social-btn:hover {
          background: #f7f9fc;
          border-color: #bbb;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .google-btn:hover {
          border-color: #4285F4;
          background: #f8fbff;
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
            color: #000;
          }
        }
      `}</style>
    </>
  );
};
