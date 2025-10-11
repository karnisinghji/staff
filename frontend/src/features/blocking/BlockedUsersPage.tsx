import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { API_CONFIG } from '../../config/api';

interface BlockedUser {
  block_id: number;
  blocked_id: string;
  blocked_user_name: string;
  blocked_user_email: string;
  blocked_user_role: string;
  reason: string;
  blocked_at: string;
}

export const BlockedUsersPage: React.FC = () => {
  const { token } = useAuth();
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBlockedUsers = async () => {
    if (!token) {
      setError('Please log in to view blocked users');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_CONFIG.MATCHING_SERVICE}/api/matching/blocked-users`, {
        credentials: 'include',
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });

      const data = await response.json();
      
      if (data.success) {
        setBlockedUsers(data.data.blockedUsers);
      } else {
        setError(data.message || 'Failed to fetch blocked users');
      }
    } catch (err) {
      console.error('Error fetching blocked users:', err);
      setError('Failed to fetch blocked users');
    } finally {
      setLoading(false);
    }
  };

  const handleUnblock = async (userId: string, userName: string) => {
    if (!confirm(`Are you sure you want to unblock ${userName}?`)) {
      return;
    }

    try {
      const response = await fetch(`${API_CONFIG.MATCHING_SERVICE}/api/matching/unblock-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ blockedUserId: userId })
      });

      const data = await response.json();
      
      if (data.success) {
        setBlockedUsers(prev => prev.filter(user => user.blocked_id !== userId));
      } else {
        alert(`Error unblocking user: ${data.message}`);
      }
    } catch (error) {
      console.error('Error unblocking user:', error);
      alert('Failed to unblock user. Please try again.');
    }
  };

  useEffect(() => {
    fetchBlockedUsers();
  }, [token]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getReasonDisplay = (reason: string) => {
    const reasonMap: { [key: string]: string } = {
      'harassment': '🚨 Harassment',
      'unprofessional': '⚠️ Unprofessional',
      'spam': '📧 Spam',
      'other': '❓ Other'
    };
    return reasonMap[reason] || '❓ Other';
  };

  return (
    <>
      <style>{`
        .blocked-users-bg {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          background: #f5f7fa;
          padding: 2rem;
        }
        .blocked-users-container {
          width: 100%;
          max-width: 800px;
          padding: 2rem;
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 4px 32px rgba(0,0,0,0.10);
          animation: fadeInUp 0.6s ease-out;
        }
        .blocked-users-header {
          text-align: center;
          margin-bottom: 2rem;
          color: #d32f2f;
          font-size: 2rem;
          font-weight: 700;
        }
        .blocked-user-card {
          background: #fafafa;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 1.5rem;
          margin-bottom: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .blocked-user-info {
          flex: 1;
        }
        .blocked-user-name {
          font-weight: 600;
          font-size: 1.1rem;
          color: #333;
          margin-bottom: 0.5rem;
        }
        .blocked-user-details {
          font-size: 0.9rem;
          color: #666;
          margin-bottom: 0.25rem;
        }
        .blocked-user-reason {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
          background: #ffebee;
          color: #d32f2f;
          margin-top: 0.5rem;
        }
        .unblock-btn {
          background: #4caf50;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 8px 16px;
          cursor: pointer;
          font-size: 14px;
          transition: background 0.2s;
        }
        .unblock-btn:hover {
          background: #45a049;
        }
        .empty-state {
          text-align: center;
          color: #666;
          font-size: 1.1rem;
          padding: 3rem;
        }
        .error-message {
          background: #ffebee;
          color: #d32f2f;
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
          margin-bottom: 1rem;
          border: 1px solid #ffcdd2;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      
      <div className="blocked-users-bg">
        <div className="blocked-users-container">
          <div className="blocked-users-header">🚫 Blocked Users</div>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              Loading blocked users...
            </div>
          ) : blockedUsers.length === 0 ? (
            <div className="empty-state">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>😌</div>
              <div>No blocked users</div>
              <div style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                You haven't blocked anyone yet.
              </div>
            </div>
          ) : (
            <div>
              <div style={{ marginBottom: '1rem', color: '#666' }}>
                {blockedUsers.length} blocked user{blockedUsers.length !== 1 ? 's' : ''}
              </div>
              
              {blockedUsers.map((user) => (
                <div key={user.block_id} className="blocked-user-card">
                  <div className="blocked-user-info">
                    <div className="blocked-user-name">
                      {user.blocked_user_name}
                    </div>
                    <div className="blocked-user-details">
                      {user.blocked_user_email} • {user.blocked_user_role}
                    </div>
                    <div className="blocked-user-details">
                      Blocked on {formatDate(user.blocked_at)}
                    </div>
                    {user.reason && (
                      <div className="blocked-user-reason">
                        {getReasonDisplay(user.reason)}
                      </div>
                    )}
                  </div>
                  
                  <button
                    className="unblock-btn"
                    onClick={() => handleUnblock(user.blocked_id, user.blocked_user_name)}
                  >
                    ✓ Unblock
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};