import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_CONFIG } from '../../config/api';

export const RegisterPage: React.FC = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('contractor');
  const [error, setError] = useState('');

  const [showSuccessBar, setShowSuccessBar] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  setError('');
  setShowSuccessBar(false);
    // Validate contact as email or mobile
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    const mobileRegex = /^[1-9][0-9]{9,14}$/;

    if (!contact) {
      setError('Please provide your email or mobile number.');
      return;
    }
    if (!emailRegex.test(contact) && !mobileRegex.test(contact)) {
      setError('Please enter a valid email or mobile number.');
      return;
    }
    try {
      // Always send as 'username' to match backend
      let payload: any = { username: contact, password, role };
      console.log('Register payload:', payload);
      const response = await fetch(`${API_CONFIG.AUTH_SERVICE}/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
      const data = await response.json();
      if (response.ok) {
        setShowSuccessBar(true);
        toast.success('Registration successful! Redirecting to login...', {
          position: 'top-right',
          autoClose: 1500
        });
        setTimeout(() => setShowSuccessBar(false), 1500);
      } else {
        // Handle specific error codes
        const errorCode = data.error?.code;
        const errorMessage = data.error?.message || data.message || 'Registration failed';
        
        if (errorCode === 'EMAIL_TAKEN') {
          setError('This email is already registered. Please use a different email or login.');
          toast.error('This email is already registered!', {
            position: 'top-right',
            autoClose: 5000
          });
        } else if (errorCode === 'PHONE_TAKEN') {
          setError('This phone number is already registered. Please use a different phone number or login.');
          toast.error('This phone number is already registered!', {
            position: 'top-right',
            autoClose: 5000
          });
        } else if (errorCode === 'USERNAME_TAKEN') {
          setError(errorMessage);
          toast.error(errorMessage, {
            position: 'top-right',
            autoClose: 5000
          });
        } else if (errorCode === 'DUPLICATE_USER') {
          setError('This email or phone number is already registered.');
          toast.error('This email or phone number is already registered!', {
            position: 'top-right',
            autoClose: 5000
          });
        } else {
          setError(errorMessage);
          toast.error(errorMessage, {
            position: 'top-right',
            autoClose: 5000
          });
        }
      }
    } catch (err) {
      setError('Network error');
      toast.error('Network error. Please check your connection and try again.', {
        position: 'top-right',
        autoClose: 5000
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <style>{`
        .register-split-bg {
          min-height: 100vh;
          display: flex;
          flex-direction: row;
          background: #f7f4e9;
        }
        .register-left {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem;
        }
        .register-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #a7c957 60%, #f7f4e9 100%);
          color: #3e2723;
          padding: 2rem;
        }
        .register-form {
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
        .register-form h2 {
          text-align: center;
          margin-bottom: 1rem;
          color: #43a047;
          font-size: 2rem;
          font-weight: 700;
        }
        .register-form input, .register-form select {
          padding: 1.1rem;
          border-radius: 14px;
          border: 1.5px solid #b2b2b2;
          font-size: 1.13rem;
          background: #f7f9fc;
          box-shadow: 0 2px 8px rgba(67,160,71,0.06);
          margin-bottom: 0.5rem;
          transition: border 0.2s, box-shadow 0.2s;
        }
        .register-form input:focus, .register-form select:focus {
          outline: none;
          border: 1.5px solid #43a047;
          box-shadow: 0 0 0 2px #a7c95744;
          background: #f0fff0;
        }
        .register-form select {
          background: #f7f9fc;
        }
        .register-form button {
          padding: 1.1rem;
          border-radius: 14px;
          border: none;
          background: linear-gradient(90deg, #43a047 60%, #a7c957 100%);
          color: #fff;
          font-size: 1.13rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 2px 12px rgba(67,160,71,0.13);
          transition: background 0.2s, transform 0.1s;
        }
        .register-form button:hover {
          background: linear-gradient(90deg, #2e7031 60%, #a7c957 100%);
          transform: translateY(-2px) scale(1.03);
        }
        .register-form .error {
          color: red;
          text-align: center;
          font-weight: 500;
        }
        .register-form .success {
          color: green;
          text-align: center;
          font-weight: 500;
        }
        .divider {
          display: flex;
          align-items: center;
          text-align: center;
          margin: 0.5rem 0;
        }
        .divider::before,
        .divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid #ddd;
        }
        .divider span {
          padding: 0 1rem;
          color: #666;
          font-size: 0.9rem;
          font-weight: 600;
        }
        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 1rem;
          border-radius: 14px;
          border: 1.5px solid #ddd;
          background: #fff;
          color: #333;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        .social-btn:hover {
          border-color: #bbb;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transform: translateY(-1px);
        }
        .google-btn:hover {
          background: #f8f9fa;
        }
        .facebook-btn:hover {
          background: #f0f5ff;
        }
        .twitter-btn:hover {
          background: #f5f5f5;
        }
        @media (max-width: 900px) {
          .register-split-bg {
            flex-direction: column;
          }
          .register-right {
            min-height: 180px;
            padding: 1rem;
          }
        }
        @media (max-width: 600px) {
          .register-form {
            max-width: 100vw;
            min-width: 0;
            padding: 1.2rem 0.5rem 1rem 0.5rem;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          }
          .register-form h2 {
            font-size: 1.4rem;
          }
          .register-form input, .register-form select, .register-form button {
            font-size: 1rem;
            padding: 0.7rem;
            border-radius: 7px;
          }
        }
      `}</style>
      <div className="register-split-bg">
        <div className="register-left">
          <form className="register-form" onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input
              type="text"
              placeholder="Email or Mobile Number"
              value={contact}
              onChange={e => setContact(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <select value={role} onChange={e => setRole(e.target.value)} required>
              <option value="contractor">Contractor</option>
              <option value="worker">Worker</option>
            </select>
            <button type="submit">Register</button>
            
            <div className="divider">
              <span>OR</span>
            </div>
            
            <button type="button" className="social-btn google-btn" onClick={() => window.location.href = `${API_CONFIG.AUTH_SERVICE}/google`}>
              <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
                <path d="M9.003 18c2.43 0 4.467-.806 5.956-2.18L12.05 13.56c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z" fill="#34A853"/>
                <path d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.426 0 9.003 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
            
            <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#666' }}>
              Already have an account? <a href="/login" style={{ color: '#3b82f6', textDecoration: 'none' }}>Login here</a>
            </p>
            
            {showSuccessBar && (
              <div className="success-bar">
                Registration successful!
                <button className="close-btn" onClick={() => setShowSuccessBar(false)}>&times;</button>
              </div>
            )}
            {error && <div className="error">{error}</div>}
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
          </form>
        </div>
        <div className="register-right">
          <h2 style={{ color: '#6d4c41' }}>Connecting People. Creating Success.</h2>
          <p style={{ maxWidth: '340px', fontSize: '1.1rem', marginTop: '1rem', color: '#3e2723' }}>
            Welcome! Our platform helps rural helpers and masons find work and connect with contractors. Simple, secure, and made for you.
          </p>
          <img
            src="https://images.pexels.com/photos/34003193/pexels-photo-34003193.jpeg"
            alt="Rural workers with wheelbarrow"
            style={{ width: '90%', maxWidth: '320px', borderRadius: '12px', marginTop: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.12)' }}
          />
          <img
            src="https://images.pexels.com/photos/4509092/pexels-photo-4509092.jpeg"
            alt="Mason laying bricks in rural area"
            style={{ width: '90%', maxWidth: '320px', borderRadius: '12px', marginTop: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.12)' }}
          />
        </div>
      </div>
    </>
  );
};
