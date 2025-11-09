import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { API_CONFIG } from '../../config/api';
import './ModernMobileDashboard.css';

interface DashboardStats {
  newChats: number;
  requests: number;
  projectProgress: number;
  projectName: string;
}

const ModernMobileDashboard: React.FC = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    newChats: 0,
    requests: 0,
    projectProgress: 75,
    projectName: 'Finish Project X',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [token]);

  const fetchDashboardData = async () => {
    try {
      // Fetch team requests count
      const requestsRes = await fetch(
        `${API_CONFIG.MATCHING_SERVICE}/api/matching/team-requests/received`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const requestsData = await requestsRes.json();
      
      // Fetch messages count (assuming unread messages)
      const messagesRes = await fetch(
        `${API_CONFIG.COMMUNICATION_SERVICE}/api/messages/conversations`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const messagesData = await messagesRes.json();

      setStats({
        newChats: messagesData.conversations?.filter((c: any) => c.unread_count > 0).length || 5,
        requests: requestsData.requests?.length || 3,
        projectProgress: 75,
        projectName: 'Finish Project X',
      });
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="modern-mobile-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">My Dashboard</h1>
        <div className="header-actions">
          <button className="icon-btn" onClick={() => navigate('/search')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8" strokeWidth="2"/>
              <path d="m21 21-4.35-4.35" strokeWidth="2"/>
            </svg>
          </button>
          <button className="icon-btn" onClick={() => navigate('/profile')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="1" strokeWidth="2"/>
              <circle cx="12" cy="5" r="1" strokeWidth="2"/>
              <circle cx="12" cy="19" r="1" strokeWidth="2"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Welcome Card */}
      <div className="welcome-card gradient-purple">
        <div className="welcome-content">
          <div className="user-avatar">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
              <circle cx="12" cy="8" r="4"/>
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>
            </svg>
          </div>
          <div>
            <h2 className="welcome-text">Welcome, {user?.name || 'Alex'}!</h2>
          </div>
        </div>
      </div>

      {/* Activity Snapshot */}
      <div className="activity-card gradient-blue">
        <h3 className="card-title">Activity Snapshot</h3>
        <div className="activity-chart">
          <svg width="80" height="40" viewBox="0 0 80 40">
            <polyline
              points="0,30 20,20 40,25 60,10 80,15"
              fill="none"
              stroke="white"
              strokeWidth="2"
            />
          </svg>
        </div>
        <div className="activity-stats">
          <div className="stat-item">
            <div className="stat-value">{stats.newChats}</div>
            <div className="stat-label">New Chats</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{stats.requests}</div>
            <div className="stat-label">Requests</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{stats.requests}</div>
            <div className="stat-label">Requests</div>
          </div>
        </div>
      </div>

      {/* Two Column Grid */}
      <div className="grid-two-column">
        {/* Prep for Tech Event */}
        <div className="small-card gradient-green" onClick={() => navigate('/my-team')}>
          <div className="small-card-title">Prep for</div>
          <div className="small-card-subtitle">Tech Event</div>
        </div>

        {/* Five Year Plan */}
        <div className="small-card gradient-light-blue" onClick={() => navigate('/profile')}>
          <div className="small-card-title">Five</div>
          <div className="small-card-subtitle">Year Plan</div>
        </div>
      </div>

      {/* Weekly Goals */}
      <div className="goals-card gradient-lime">
        <h3 className="card-title">Weekly Goals</h3>
        <div className="progress-section">
          <div className="progress-text">
            <span className="progress-percentage">{stats.projectProgress}%</span>
            <span className="progress-label">{stats.projectName}</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${stats.projectProgress}%` }}
            />
          </div>
        </div>
        <button className="check-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </button>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-card gradient-peach">
        <div className="quick-actions-content">
          <div className="user-avatar-small">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
              <circle cx="12" cy="8" r="4"/>
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>
            </svg>
          </div>
          <div className="quick-actions-text">
            <div className="quick-actions-title">Quick Actions</div>
            <div className="quick-actions-subtitle">Find Match</div>
          </div>
        </div>
        <div className="quick-action-buttons">
          <button className="quick-btn" onClick={() => navigate('/my-team')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <span>New Team</span>
          </button>
          <button className="quick-btn" onClick={() => navigate('/messages')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <span>Messages</span>
          </button>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="events-card gradient-light-blue-event">
        <div className="event-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
        </div>
        <div className="event-content">
          <div className="event-title">Upcoming Events</div>
          <div className="event-description">Coffee & Code Meetup - Tomorrow</div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fab" onClick={() => navigate('/search')}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      </button>
    </div>
  );
};

export default ModernMobileDashboard;
