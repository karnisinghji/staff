import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { theme } from '../../styles/theme';
import { SkeletonStats, SkeletonCard, LoadingButton } from '../../components/LoadingComponents';
import { API_CONFIG, demoFetch } from '../../config/api';

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

interface TeamMember {
  id: number;
  name: string;
  company?: string;
  relationship_type: string;
  created_at: string;
}

interface DashboardStats {
  totalConnections: number;
  pendingRequests: number;
  activeProjects: number;
  profileViews: number;
}

const StatsCard: React.FC<{
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: { value: number; isPositive: boolean };
  color: string;
}> = ({ title, value, icon, trend, color }) => (
  <div style={{
    padding: theme.spacing.lg,
    backgroundColor: 'white',
    borderRadius: theme.borderRadius.lg,
    boxShadow: theme.shadows.sm,
    border: `1px solid ${theme.colors.neutral[200]}`,
    position: 'relative',
    overflow: 'hidden',
  }}>
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '4px',
      height: '100%',
      backgroundColor: color,
    }} />
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: theme.spacing.sm,
    }}>
      <div style={{
        color: theme.colors.neutral[600],
        fontSize: theme.typography.fontSize.sm,
        fontWeight: theme.typography.fontWeight.medium,
      }}>
        {title}
      </div>
      <div style={{ color, opacity: 0.8 }}>
        {icon}
      </div>
    </div>
    <div style={{
      fontSize: theme.typography.fontSize['3xl'],
      fontWeight: theme.typography.fontWeight.bold,
      color: theme.colors.neutral[900],
      marginBottom: theme.spacing.xs,
    }}>
      {value}
    </div>
    {trend && (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing.xs,
        fontSize: theme.typography.fontSize.sm,
        color: trend.isPositive ? theme.colors.success[600] : theme.colors.danger[600],
      }}>
        <span>{trend.isPositive ? '↗' : '↘'}</span>
        <span>{Math.abs(trend.value)}% vs last month</span>
      </div>
    )}
  </div>
);

const QuickActionCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  color: string;
}> = ({ title, description, icon, onClick, color }) => (
  <div
    onClick={onClick}
    style={{
      padding: theme.spacing.lg,
      backgroundColor: 'white',
      borderRadius: theme.borderRadius.lg,
      boxShadow: theme.shadows.sm,
      border: `1px solid ${theme.colors.neutral[200]}`,
      cursor: 'pointer',
      transition: 'all 0.2s ease-in-out',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = theme.shadows.md;
      e.currentTarget.style.transform = 'translateY(-2px)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = theme.shadows.sm;
      e.currentTarget.style.transform = 'translateY(0)';
    }}
  >
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing.md,
      marginBottom: theme.spacing.sm,
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: theme.borderRadius.lg,
        backgroundColor: `${color}20`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color,
      }}>
        {icon}
      </div>
      <div>
        <div style={{
          fontSize: theme.typography.fontSize.lg,
          fontWeight: theme.typography.fontWeight.semibold,
          color: theme.colors.neutral[900],
          marginBottom: theme.spacing.xs,
        }}>
          {title}
        </div>
        <div style={{
          fontSize: theme.typography.fontSize.sm,
          color: theme.colors.neutral[600],
        }}>
          {description}
        </div>
      </div>
    </div>
  </div>
);

const ActivityFeedItem: React.FC<{
  type: 'request' | 'connection' | 'message';
  title: string;
  description: string;
  time: string;
  avatar?: string;
}> = ({ type, title, description, time, avatar }) => {
  const getTypeColor = () => {
    switch (type) {
      case 'request': return theme.colors.warning[500];
      case 'connection': return theme.colors.success[500];
      case 'message': return theme.colors.primary[500];
      default: return theme.colors.neutral[500];
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'request':
        return (
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
          </svg>
        );
      case 'connection':
        return (
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'message':
        return (
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{
      display: 'flex',
      gap: theme.spacing.md,
      padding: theme.spacing.md,
      borderBottom: `1px solid ${theme.colors.neutral[100]}`,
    }}>
      <div style={{
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        backgroundColor: avatar ? 'transparent' : `${getTypeColor()}20`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: getTypeColor(),
        flexShrink: 0,
        backgroundImage: avatar ? `url(${avatar})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        {!avatar && getTypeIcon()}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: theme.typography.fontSize.sm,
          fontWeight: theme.typography.fontWeight.medium,
          color: theme.colors.neutral[900],
          marginBottom: theme.spacing.xs,
        }}>
          {title}
        </div>
        <div style={{
          fontSize: theme.typography.fontSize.sm,
          color: theme.colors.neutral[600],
          marginBottom: theme.spacing.xs,
        }}>
          {description}
        </div>
        <div style={{
          fontSize: theme.typography.fontSize.xs,
          color: theme.colors.neutral[500],
        }}>
          {time}
        </div>
      </div>
    </div>
  );
};

const EnhancedDashboardPage: React.FC = () => {
  const { token } = useAuth();
  const { error: showError, success: showSuccess } = useToast();
  const [pendingRequests, setPendingRequests] = useState<TeamRequest[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalConnections: 0,
    pendingRequests: 0,
    activeProjects: 0,
    profileViews: 0,
  });
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const fetchDashboardData = useCallback(async () => {
    if (!token) return;

    try {
      setLoading(true);
      
      // Fetch pending team requests
      const requestsResponse = await demoFetch(`${API_CONFIG.MATCHING_SERVICE}/team-requests/received`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      // Fetch team members
      const teamResponse = await demoFetch(`${API_CONFIG.MATCHING_SERVICE}/my-team`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (requestsResponse.ok) {
        const requestsResult = await requestsResponse.json();
        if (requestsResult.success && requestsResult.data && requestsResult.data.requests) {
          setPendingRequests(requestsResult.data.requests);
        } else {
          setPendingRequests([]);
        }
      }

      if (teamResponse.ok) {
        const teamResult = await teamResponse.json();
        if (teamResult.success && teamResult.data && teamResult.data.teamMembers) {
          setTeamMembers(teamResult.data.teamMembers);
        } else {
          setTeamMembers([]);
        }
      }

      // Update stats
      setStats({
        totalConnections: teamMembers.length,
        pendingRequests: pendingRequests.length,
        activeProjects: Math.floor(Math.random() * 5) + 1, // Mock data
        profileViews: Math.floor(Math.random() * 100) + 50, // Mock data
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      showError('Failed to load dashboard data', 'Please try refreshing the page');
      setPendingRequests([]);
      setTeamMembers([]);
    } finally {
      setLoading(false);
    }
  }, [token, pendingRequests.length, teamMembers.length, showError]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleRequestAction = async (requestId: number, status: 'accepted' | 'rejected') => {
    if (!token) return;

    setActionLoading(requestId);
    try {
      const response = await demoFetch(`${API_CONFIG.MATCHING_SERVICE}/team-requests/${requestId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        showSuccess(`Request ${status}`, `Team request has been ${status} successfully`);
        await fetchDashboardData();
      } else {
        throw new Error(`Failed to ${status} request`);
      }
    } catch (error) {
      console.error(`Error ${status} request:`, error);
      showError(`Failed to ${status} request`, 'Please try again');
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const quickActions = [
    {
      title: 'Find Matches',
      description: 'Discover new team members',
      icon: (
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
      ),
      onClick: () => window.location.href = '/search',
      color: theme.colors.primary[500],
    },
    {
      title: 'Send Invitation',
      description: 'Invite someone to join your team',
      icon: (
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
          <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
        </svg>
      ),
      onClick: () => window.location.href = '/profile',
      color: theme.colors.success[500],
    },
    {
      title: 'View Messages',
      description: 'Check your conversations',
      icon: (
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      ),
      onClick: () => window.location.href = '/messages',
      color: theme.colors.warning[500],
    },
    {
      title: 'Update Profile',
      description: 'Keep your profile current',
      icon: (
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
      ),
      onClick: () => window.location.href = '/profile',
      color: theme.colors.primary[600],
    },
  ];

  const recentActivity = [
    {
      type: 'connection' as const,
      title: 'New team member added',
      description: 'John Doe joined your team',
      time: '2 hours ago',
    },
    {
      type: 'request' as const,
      title: 'Team request received',
      description: 'Jane Smith wants to join your project',
      time: '4 hours ago',
    },
    {
      type: 'message' as const,
      title: 'New message',
      description: 'You have 3 unread messages',
      time: '6 hours ago',
    },
  ];

  if (loading) {
    return (
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: theme.spacing.xl,
        backgroundColor: theme.colors.neutral[50],
        minHeight: '100vh',
      }}>
        <div style={{ marginBottom: theme.spacing.xl }}>
          <SkeletonStats />
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: theme.spacing.lg,
        }}>
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: theme.spacing.xl,
      backgroundColor: theme.colors.neutral[50],
      minHeight: '100vh',
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: theme.spacing.xl,
      }}>
        <h1 style={{
          fontSize: theme.typography.fontSize['4xl'],
          fontWeight: theme.typography.fontWeight.bold,
          color: theme.colors.neutral[900],
          marginBottom: theme.spacing.sm,
        }}>
          Welcome to Your Dashboard
        </h1>
        <p style={{
          fontSize: theme.typography.fontSize.lg,
          color: theme.colors.neutral[600],
        }}>
          Manage your team connections and track your progress
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: theme.spacing.lg,
        marginBottom: theme.spacing.xl,
      }}>
        <StatsCard
          title="Total Connections"
          value={stats.totalConnections}
          icon={
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
            </svg>
          }
          trend={{ value: 15, isPositive: true }}
          color={theme.colors.primary[500]}
        />
        <StatsCard
          title="Pending Requests"
          value={stats.pendingRequests}
          icon={
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
          }
          color={stats.pendingRequests > 0 ? theme.colors.warning[500] : theme.colors.success[500]}
        />
        <StatsCard
          title="Active Projects"
          value={stats.activeProjects}
          icon={
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          trend={{ value: 8, isPositive: true }}
          color={theme.colors.success[500]}
        />
        <StatsCard
          title="Profile Views"
          value={stats.profileViews}
          icon={
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
          }
          trend={{ value: 23, isPositive: true }}
          color={theme.colors.primary[600]}
        />
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: theme.spacing.xl }}>
        <h2 style={{
          fontSize: theme.typography.fontSize['2xl'],
          fontWeight: theme.typography.fontWeight.semibold,
          color: theme.colors.neutral[900],
          marginBottom: theme.spacing.lg,
        }}>
          Quick Actions
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: theme.spacing.lg,
        }}>
          {quickActions.map((action, index) => (
            <QuickActionCard key={index} {...action} />
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: theme.spacing.xl,
      }}>
        {/* Pending Requests */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: theme.borderRadius.lg,
          boxShadow: theme.shadows.sm,
          border: `1px solid ${theme.colors.neutral[200]}`,
        }}>
          <div style={{
            padding: theme.spacing.lg,
            borderBottom: `1px solid ${theme.colors.neutral[200]}`,
          }}>
            <h3 style={{
              fontSize: theme.typography.fontSize.xl,
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.neutral[900],
            }}>
              Pending Team Requests ({pendingRequests.length})
            </h3>
          </div>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {pendingRequests.length === 0 ? (
              <div style={{
                padding: theme.spacing.xl,
                textAlign: 'center',
                color: theme.colors.neutral[500],
              }}>
                <svg
                  width="48"
                  height="48"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  style={{ margin: '0 auto', marginBottom: theme.spacing.md, opacity: 0.5 }}
                >
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p>No pending requests</p>
              </div>
            ) : (
              pendingRequests.map((request) => (
                <div
                  key={request.id}
                  style={{
                    padding: theme.spacing.lg,
                    borderBottom: `1px solid ${theme.colors.neutral[100]}`,
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: theme.spacing.sm,
                  }}>
                    <div>
                      <div style={{
                        fontSize: theme.typography.fontSize.lg,
                        fontWeight: theme.typography.fontWeight.semibold,
                        color: theme.colors.neutral[900],
                        marginBottom: theme.spacing.xs,
                      }}>
                        {request.sender_name}
                      </div>
                      {request.sender_company && (
                        <div style={{
                          fontSize: theme.typography.fontSize.sm,
                          color: theme.colors.neutral[600],
                          marginBottom: theme.spacing.xs,
                        }}>
                          {request.sender_company}
                        </div>
                      )}
                      <div style={{
                        fontSize: theme.typography.fontSize.xs,
                        color: theme.colors.neutral[500],
                      }}>
                        {formatDate(request.created_at)}
                      </div>
                    </div>
                  </div>
                  <div style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.neutral[700],
                    marginBottom: theme.spacing.md,
                    padding: theme.spacing.sm,
                    backgroundColor: theme.colors.neutral[50],
                    borderRadius: theme.borderRadius.sm,
                    borderLeft: `3px solid ${theme.colors.primary[500]}`,
                  }}>
                    {request.message}
                  </div>
                  <div style={{
                    display: 'flex',
                    gap: theme.spacing.sm,
                  }}>
                    <LoadingButton
                      isLoading={actionLoading === request.id}
                      variant="primary"
                      size="sm"
                      onClick={() => handleRequestAction(request.id, 'accepted')}
                    >
                      Accept
                    </LoadingButton>
                    <LoadingButton
                      isLoading={actionLoading === request.id}
                      variant="outline"
                      size="sm"
                      onClick={() => handleRequestAction(request.id, 'rejected')}
                    >
                      Decline
                    </LoadingButton>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: theme.borderRadius.lg,
          boxShadow: theme.shadows.sm,
          border: `1px solid ${theme.colors.neutral[200]}`,
        }}>
          <div style={{
            padding: theme.spacing.lg,
            borderBottom: `1px solid ${theme.colors.neutral[200]}`,
          }}>
            <h3 style={{
              fontSize: theme.typography.fontSize.xl,
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.neutral[900],
            }}>
              Recent Activity
            </h3>
          </div>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {recentActivity.map((activity, index) => (
              <ActivityFeedItem key={index} {...activity} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedDashboardPage;