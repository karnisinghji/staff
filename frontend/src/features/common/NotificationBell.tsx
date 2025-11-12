import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../auth/AuthContext';
import { API_CONFIG } from '../../config/api';

interface TeamRequest {
  id: number;
  sender_name: string;
  sender_company?: string;
  message: string;
  created_at: string;
  match_context?: {
    skill?: string;
    distance?: number;
    score?: number;
  };
}

export const NotificationBell: React.FC = () => {
  const { token, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [requests, setRequests] = useState<TeamRequest[]>([]);
  const [count, setCount] = useState(0);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch pending requests count
  const fetchRequestsCount = useCallback(async () => {
    if (!token) return;

    try {
      const response = await fetch(`${API_CONFIG.MATCHING_SERVICE}/team-requests/received`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        // Safely handle API response with proper null checks
        if (result?.success && result?.data && Array.isArray(result?.data?.requests)) {
          const pendingRequests = result.data.requests;
          setCount(pendingRequests.length);
          setRequests(pendingRequests.slice(0, 5)); // Show only first 5 in dropdown
        } else {
          setCount(0);
          setRequests([]);
        }
      } else {
        // Handle non-OK responses
        setCount(0);
        setRequests([]);
      }
    } catch (error) {
      console.error('Error fetching team requests:', error);
      // Always set safe defaults on error
      setCount(0);
      setRequests([]);
    }
  }, [token]);

  // Fetch unread messages count
  const fetchUnreadMessagesCount = useCallback(async () => {
    if (!token || !user?.id) return;

    try {
      const response = await fetch(`${API_CONFIG.COMMUNICATION_SERVICE}/messages`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          // Count unread messages where current user is recipient and readAt is null
          const unread = data.data.filter((msg: any) => 
            msg.toUserId === user.id && !msg.readAt
          );
          setUnreadMessagesCount(unread.length);
        }
      }
    } catch (error) {
      console.error('Error fetching unread messages:', error);
      setUnreadMessagesCount(0);
    }
  }, [token, user?.id]);

  // Poll for new requests and messages every 30 seconds
  useEffect(() => {
    fetchRequestsCount();
    fetchUnreadMessagesCount();
    const interval = setInterval(() => {
      fetchRequestsCount();
      fetchUnreadMessagesCount();
    }, 30000);
    return () => clearInterval(interval);
  }, [fetchRequestsCount, fetchUnreadMessagesCount]);

  const handleAcceptRequest = useCallback(async (requestId: number) => {
    if (!token) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_CONFIG.MATCHING_SERVICE}/team-requests/${requestId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'accepted' }),
      });

      if (response.ok) {
        // Refresh requests
        await fetchRequestsCount();
      }
    } catch (error) {
      console.error('Error accepting request:', error);
    } finally {
      setLoading(false);
    }
  }, [token, fetchRequestsCount]);

  const handleRejectRequest = useCallback(async (requestId: number) => {
    if (!token) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_CONFIG.MATCHING_SERVICE}/team-requests/${requestId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'rejected' }),
      });

      if (response.ok) {
        // Refresh requests
        await fetchRequestsCount();
      }
    } catch (error) {
      console.error('Error rejecting request:', error);
    } finally {
      setLoading(false);
    }
  }, [token, fetchRequestsCount]);

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return `${Math.floor(diffInHours / 24)}d ago`;
    }
  }, []);

  if (!token) return null;

  return (
    <>
      <style>{`
        .notification-bell {
          position: relative;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          border-radius: 50%;
          transition: background-color 0.2s;
        }
        .notification-bell:hover {
          background-color: rgba(25, 118, 210, 0.1);
        }
        .notification-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          background-color: #f44336;
          color: white;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: bold;
          min-width: 18px;
        }
        .notification-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          min-width: 320px;
          max-width: 400px;
          z-index: 1000;
          margin-top: 0.5rem;
        }
        .notification-header {
          padding: 1rem;
          border-bottom: 1px solid #e0e0e0;
          font-weight: 600;
          color: #333;
        }
        .notification-list {
          max-height: 400px;
          overflow-y: auto;
        }
        .notification-item {
          padding: 1rem;
          border-bottom: 1px solid #f0f0f0;
          transition: background-color 0.2s;
        }
        .notification-item:hover {
          background-color: #f8f9fa;
        }
        .notification-item:last-child {
          border-bottom: none;
        }
        .sender-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .sender-name {
          font-weight: 600;
          color: #333;
        }
        .sender-company {
          color: #666;
          font-size: 0.875rem;
        }
        .request-message {
          color: #555;
          font-size: 0.875rem;
          margin-bottom: 0.75rem;
          line-height: 1.4;
        }
        .request-actions {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }
        .btn-accept {
          background-color: #4caf50;
          color: white;
          border: none;
          padding: 0.375rem 0.75rem;
          border-radius: 4px;
          font-size: 0.75rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .btn-accept:hover:not(:disabled) {
          background-color: #45a049;
        }
        .btn-reject {
          background-color: #f44336;
          color: white;
          border: none;
          padding: 0.375rem 0.75rem;
          border-radius: 4px;
          font-size: 0.75rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .btn-reject:hover:not(:disabled) {
          background-color: #da190b;
        }
        .btn-accept:disabled,
        .btn-reject:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .request-time {
          color: #999;
          font-size: 0.75rem;
          margin-left: auto;
        }
        .empty-state {
          padding: 2rem;
          text-align: center;
          color: #666;
        }
        .view-all {
          padding: 0.75rem 1rem;
          text-align: center;
          border-top: 1px solid #e0e0e0;
          background-color: #f8f9fa;
        }
        .view-all a {
          color: #1976d2;
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
        }
        .view-all a:hover {
          text-decoration: underline;
        }
      `}</style>
      
      <div className="notification-bell" ref={dropdownRef}>
        <div onClick={() => setIsOpen(!isOpen)}>
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#1976d2" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          {(count + unreadMessagesCount) > 0 && (
            <span className="notification-badge">
              {(count + unreadMessagesCount) > 9 ? '9+' : (count + unreadMessagesCount)}
            </span>
          )}
        </div>

        {isOpen && (
          <div className="notification-dropdown">
            <div className="notification-header">
              Notifications ({count} requests, {unreadMessagesCount} messages)
            </div>
            
            <div className="notification-list">
              {!requests || !Array.isArray(requests) || requests.length === 0 ? (
                <div className="empty-state">
                  <p>No pending team requests</p>
                </div>
              ) : (
                requests.map((request) => (
                  <div key={request.id} className="notification-item">
                    <div className="sender-info">
                      <span className="sender-name">{request.sender_name}</span>
                      {request.sender_company && (
                        <span className="sender-company">• {request.sender_company}</span>
                      )}
                      <span className="request-time">{formatDate(request.created_at)}</span>
                    </div>
                    
                    {request.message && (
                      <div className="request-message">
                        "{request.message}"
                      </div>
                    )}
                    
                    {request.match_context && (
                      <div className="request-message">
                        <small>
                          {request.match_context.skill && `Skill: ${request.match_context.skill}`}
                          {request.match_context.distance && ` • ${request.match_context.distance}km away`}
                        </small>
                      </div>
                    )}
                    
                    <div className="request-actions">
                      <button
                        className="btn-accept"
                        onClick={() => handleAcceptRequest(request.id)}
                        disabled={loading}
                      >
                        Accept
                      </button>
                      <button
                        className="btn-reject"
                        onClick={() => handleRejectRequest(request.id)}
                        disabled={loading}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {count > 5 && (
              <div className="view-all">
                <a href="/dashboard" onClick={() => setIsOpen(false)}>
                  View all requests
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};