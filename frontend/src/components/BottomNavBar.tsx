import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import { API_CONFIG } from '../config/api';

export const BottomNavBar: React.FC = () => {
  const { token, user } = useAuth();
  const location = useLocation();
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch unread message count
  useEffect(() => {
    if (!token || !user?.id) {
      console.log('[BottomNavBar] No token or user.id, skipping unread count fetch');
      return;
    }

    const fetchUnreadCount = async () => {
      try {
        console.log('[BottomNavBar] Fetching unread count for user:', user.id);
        const response = await fetch(`${API_CONFIG.COMMUNICATION_SERVICE}/messages?userId=${user.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });

        console.log('[BottomNavBar] Response status:', response.status);
        if (response.ok) {
          const data = await response.json();
          console.log('[BottomNavBar] Messages data:', data);
          if (data.success && data.data) {
            // Count unread messages where current user is recipient and readAt is null
            const unread = data.data.filter((msg: any) => 
              msg.toUserId === user.id && !msg.readAt
            );
            console.log('[BottomNavBar] Unread count:', unread.length);
            setUnreadCount(unread.length);
          }
        } else {
          console.error('[BottomNavBar] API error:', response.status, await response.text());
        }
      } catch (error) {
        console.error('[BottomNavBar] Error fetching unread count:', error);
      }
    };

    fetchUnreadCount();
    
    // Poll every 30 seconds for new messages
    const interval = setInterval(fetchUnreadCount, 30000);
    
    // Listen for messages read event
    const handleMessagesRead = () => {
      console.log('[BottomNavBar] Messages read event received, refetching count');
      fetchUnreadCount();
    };
    window.addEventListener('messagesRead', handleMessagesRead);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('messagesRead', handleMessagesRead);
    };
  }, [token, user?.id]);

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  // Don't show bottom nav if not authenticated
  if (!token) return null;

  return (
    <>
      <style>{`
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: #ffffff;
          box-shadow: 0 -2px 12px rgba(0,0,0,0.1);
          border-top: 1px solid #e0e0e0;
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 0.5rem 0;
          z-index: 1000;
          height: 60px;
        }

        .bottom-nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          color: #666;
          font-size: 0.75rem;
          font-weight: 500;
          padding: 0.25rem 0.75rem;
          border-radius: 8px;
          transition: all 0.2s ease;
          min-width: 60px;
          position: relative;
        }

        .bottom-nav-item.active {
          color: #1976d2;
        }

        .bottom-nav-item:hover {
          color: #1976d2;
          background: #f5f7fa;
        }

        .bottom-nav-icon {
          font-size: 1.5rem;
          margin-bottom: 0.15rem;
        }

        .bottom-nav-item.active .bottom-nav-icon {
          transform: scale(1.1);
        }

        .bottom-nav-label {
          font-size: 0.7rem;
          white-space: nowrap;
        }

        /* Active indicator dot */
        .bottom-nav-item.active::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 4px;
          background: #1976d2;
          border-radius: 50%;
        }

        /* Badge for unread count */
        .bottom-nav-badge {
          position: absolute;
          top: 0;
          right: 8px;
          background: #ef4444;
          color: white;
          font-size: 0.65rem;
          font-weight: 600;
          padding: 0.1rem 0.35rem;
          border-radius: 10px;
          min-width: 18px;
          text-align: center;
          line-height: 1.2;
          box-shadow: 0 2px 4px rgba(239, 68, 68, 0.3);
        }

        .bottom-nav-badge.large {
          font-size: 0.6rem;
          padding: 0.1rem 0.3rem;
        }

        /* Add padding to page content so it doesn't hide behind bottom nav */
        body {
          padding-bottom: 70px;
        }

        /* Hide bottom nav on desktop */
        @media (min-width: 769px) {
          .bottom-nav {
            display: none;
          }
          body {
            padding-bottom: 0;
          }
        }

        /* Optimize for very small screens */
        @media (max-width: 360px) {
          .bottom-nav {
            padding: 0.25rem 0;
            height: 55px;
          }
          .bottom-nav-item {
            min-width: 50px;
            padding: 0.25rem 0.5rem;
          }
          .bottom-nav-icon {
            font-size: 1.3rem;
          }
          .bottom-nav-label {
            font-size: 0.65rem;
          }
        }
      `}</style>

      <nav className="bottom-nav">
        <Link 
          to="/dashboard" 
          className={`bottom-nav-item ${isActive('/dashboard') ? 'active' : ''}`}
        >
          <span className="bottom-nav-icon">🏠</span>
          <span className="bottom-nav-label">Home</span>
        </Link>

        <Link 
          to="/search" 
          className={`bottom-nav-item ${isActive('/search') ? 'active' : ''}`}
        >
          <span className="bottom-nav-icon">🔍</span>
          <span className="bottom-nav-label">Search</span>
        </Link>

        <Link 
          to="/saved" 
          className={`bottom-nav-item ${isActive('/saved') ? 'active' : ''}`}
        >
          <span className="bottom-nav-icon">👥</span>
          <span className="bottom-nav-label">My Team</span>
        </Link>

        <Link 
          to="/messages" 
          className={`bottom-nav-item ${isActive('/messages') ? 'active' : ''}`}
        >
          <span className="bottom-nav-icon">💬</span>
          <span className="bottom-nav-label">Messages</span>
          {unreadCount > 0 && (
            <span className={`bottom-nav-badge ${unreadCount > 99 ? 'large' : ''}`}>
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </Link>

        <Link 
          to="/profile" 
          className={`bottom-nav-item ${isActive('/profile') ? 'active' : ''}`}
        >
          <span className="bottom-nav-icon">👤</span>
          <span className="bottom-nav-label">Profile</span>
        </Link>
      </nav>
    </>
  );
};
