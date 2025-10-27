import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from './AuthContext';

export const OAuthCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const handleCallback = async () => {
      // Get tokens from URL params
      const accessToken = searchParams.get('access_token');
      const refreshToken = searchParams.get('refresh_token');
      const userId = searchParams.get('user_id');
      const errorParam = searchParams.get('error');

      if (errorParam) {
        setError(`OAuth authentication failed: ${errorParam}`);
        setTimeout(() => navigate('/register'), 1500);
        return;
      }

      if (!accessToken || !refreshToken || !userId) {
        setError('Missing authentication tokens. Please try again.');
        setTimeout(() => navigate('/register'), 1500);
        return;
      }

      try {
        // Store tokens
        localStorage.setItem('refreshToken', refreshToken);
        
        // Create user object with userId
        const userObj = { id: userId };
        
        // Use AuthContext login (token, user)
        login(accessToken, userObj);
        
        // Redirect to My Team page
        navigate('/saved');
      } catch (err) {
        console.error('OAuth callback error:', err);
        setError('Failed to complete authentication. Please try again.');
        setTimeout(() => navigate('/register'), 1500);
      }
    };

    handleCallback();
  }, [searchParams, navigate, login]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f7f4e9',
      padding: '2rem'
    }}>
      <div style={{
        background: '#fff',
        padding: '3rem',
        borderRadius: '16px',
        boxShadow: '0 4px 32px rgba(0,0,0,0.1)',
        textAlign: 'center',
        maxWidth: '500px'
      }}>
        {error ? (
          <>
            <div style={{
              fontSize: '3rem',
              color: '#d32f2f',
              marginBottom: '1rem'
            }}>❌</div>
            <h2 style={{ color: '#d32f2f', marginBottom: '1rem' }}>Authentication Failed</h2>
            <p style={{ color: '#666', marginBottom: '1.5rem' }}>{error}</p>
            <p style={{ color: '#999', fontSize: '0.9rem' }}>Redirecting to registration page...</p>
          </>
        ) : (
          <>
            <div style={{
              width: '60px',
              height: '60px',
              border: '4px solid #43a047',
              borderTop: '4px solid transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 1.5rem'
            }}></div>
            <h2 style={{ color: '#43a047', marginBottom: '1rem' }}>Completing Sign In...</h2>
            <p style={{ color: '#666' }}>Please wait while we set up your account.</p>
          </>
        )}
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
};
