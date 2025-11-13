import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Capacitor } from '@capacitor/core';

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
        // Fetch full user profile from user service
        let userObj = { id: userId };
        
        try {
          const API_CONFIG = {
            USER_SERVICE: import.meta.env.MODE === 'production' 
              ? 'https://user-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io'
              : 'http://localhost:3002'
          };
          
          console.log('%c[OAuthCallback]%c Fetching user profile from:', 'color: #4CAF50; font-weight: bold', 'color: inherit', `${API_CONFIG.USER_SERVICE}/api/users/${userId}`);
          
          const response = await fetch(`${API_CONFIG.USER_SERVICE}/api/users/${userId}`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            }
          });
          
          console.log('%c[OAuthCallback]%c User service response status:', 'color: #4CAF50; font-weight: bold', 'color: inherit', response.status);
          
          if (response.ok) {
            const userData = await response.json();
            console.log('%c[OAuthCallback]%c User data response:', 'color: #4CAF50; font-weight: bold', 'color: inherit', userData);
            
            if (userData.success && userData.data && userData.data.user) {
              userObj = {
                id: userData.data.user.id,
                email: userData.data.user.email || (userData.data.contacts?.find((c: any) => c.type === 'email')?.value),
                name: userData.data.user.name,
                role: userData.data.user.role || 'worker',
                roles: [userData.data.user.role || 'worker']
              };
              console.log('%c[OAuthCallback]%c Fetched user profile:', 'color: #2196F3; font-weight: bold', 'color: inherit', userObj);
            } else {
              console.warn('[OAuthCallback] User data response not successful, using minimal user object');
              // Ensure basic user object fields
              userObj = { id: userId, name: 'User', role: 'worker', roles: ['worker'] };
            }
          } else {
            console.warn('[OAuthCallback] Failed to fetch user profile (status: ' + response.status + '), using minimal user object');
            // Ensure basic user object fields
            userObj = { id: userId, name: 'User', role: 'worker', roles: ['worker'] };
          }
        } catch (err) {
          console.error('[OAuthCallback] Error fetching user profile:', err);
          // Ensure basic user object fields even on error
          userObj = { id: userId, name: 'User', role: 'worker', roles: ['worker'] };
        }
        
        console.log('%c[OAuthCallback]%c Final user object before login:', 'color: #FF9800; font-weight: bold', 'color: inherit', userObj);
        console.log('%c[OAuthCallback]%c Access token:', 'color: #9C27B0; font-weight: bold', 'color: inherit', accessToken?.substring(0, 50) + '...');
        
        // Use AuthContext login (token, user, refreshToken)
        login(accessToken, userObj, refreshToken);
        console.log('%c[OAuthCallback]%c Login called', 'color: #4CAF50; font-weight: bold', 'color: inherit');
        
        // On mobile, close the browser and return to app
        if (Capacitor.isNativePlatform()) {
          console.log('%c[OAuthCallback]%c Mobile platform detected - closing browser and returning to app', 'color: #00BCD4; font-weight: bold', 'color: inherit');
          
          // Import Browser plugin dynamically
          import('@capacitor/browser').then(({ Browser }) => {
            // Close the Chrome Custom Tab
            Browser.close().then(() => {
              console.log('%c[OAuthCallback]%c Browser closed successfully', 'color: #4CAF50; font-weight: bold', 'color: inherit');
            }).catch(err => {
              console.error('[OAuthCallback] Error closing browser:', err);
            });
          }).catch(err => {
            console.error('[OAuthCallback] Error importing Browser:', err);
          });
          
          // Navigate to dashboard in the app
          setTimeout(() => {
            navigate('/dashboard');
          }, 300);
        } else {
          // On web, just navigate normally
          navigate('/dashboard');
        }
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
