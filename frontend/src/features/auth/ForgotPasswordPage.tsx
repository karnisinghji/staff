import React, { useState } from 'react';
import { API_CONFIG } from '../../config/api';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // Send request to backend server
      const res = await fetch(`${API_CONFIG.AUTH_SERVICE}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError('Failed to send reset link. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-bg" style={{minHeight:'100vh',display:'flex',justifyContent:'center',alignItems:'center',background:'#f5f7fa'}}>
      <form className="forgot-password-form" onSubmit={handleSubmit} style={{background:'#fff',padding:'2.5rem',borderRadius:'16px',boxShadow:'0 4px 32px rgba(0,0,0,0.10)',maxWidth:'420px',width:'100%'}}>
        <h2 style={{textAlign:'center',color:'#1976d2',fontWeight:700}}>Forgot Password</h2>
        {submitted ? (
          <div style={{color:'#43a047',textAlign:'center',margin:'1rem 0'}}>If an account exists for this email, a reset link has been sent.</div>
        ) : (
          <>
            <label htmlFor="forgot-email" style={{display:'none'}}>Email</label>
            <input
              id="forgot-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{padding:'1rem',borderRadius:'10px',border:'1px solid #bbb',fontSize:'1.1rem',background:'#f7f9fc',width:'100%',marginBottom:'1rem'}}
              autoComplete="email"
            />
            <button type="submit" disabled={loading} style={{padding:'1rem',borderRadius:'10px',border:'none',background:'#1976d2',color:'#fff',fontWeight:700,fontSize:'1.1rem',width:'100%',cursor:'pointer'}}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
            {error && <div style={{color:'red',textAlign:'center',marginTop:'1rem'}}>{error}</div>}
          </>
        )}
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
