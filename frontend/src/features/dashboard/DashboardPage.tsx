import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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

interface TeamMember {
  id: number;
  name: string;
  company?: string;
  relationship_type: string;
  created_at: string;
}

const DashboardPage: React.FC = () => {
  const { token } = useAuth();
  const [pendingRequests, setPendingRequests] = useState<TeamRequest[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const queryClient = useQueryClient();

  // Fetch team requests with React Query
  const { data: requestsData, isLoading: requestsLoading } = useQuery({
    queryKey: ['dashboard-teamRequests', token],
    queryFn: async () => {
      if (!token) return [];
      const response = await fetch(`${API_CONFIG.MATCHING_SERVICE}/team-requests/received`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) return [];
      const result = await response.json();
      return (result.success && result.data && result.data.requests) ? result.data.requests : [];
    },
    enabled: !!token,
    staleTime: 1000 * 30,
    retry: 2,
    retryDelay: 500
  });

  // Fetch team members with React Query
  const { data: teamData, isLoading: teamLoading } = useQuery({
    queryKey: ['dashboard-teamMembers', token],
    queryFn: async () => {
      if (!token) return [];
      const response = await fetch(`${API_CONFIG.MATCHING_SERVICE}/my-team`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) return [];
      const result = await response.json();
      return (result.success && result.data && result.data.teamMembers) ? result.data.teamMembers : [];
    },
    enabled: !!token,
    staleTime: 1000 * 30,
    retry: 2,
    retryDelay: 500
  });

  // Update local state when data changes
  useEffect(() => {
    if (requestsData) setPendingRequests(requestsData);
  }, [requestsData]);

  useEffect(() => {
    if (teamData) setTeamMembers(teamData);
  }, [teamData]);

  const loading = requestsLoading || teamLoading;

  // Mutation for handling team request actions
  const requestActionMutation = useMutation({
    mutationFn: async ({ requestId, status }: { requestId: number; status: 'accepted' | 'rejected' }) => {
      const response = await fetch(`${API_CONFIG.MATCHING_SERVICE}/team-requests/${requestId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error(`Failed to ${status} request`);
      return { requestId, status };
    },
    onSuccess: () => {
      // Invalidate queries to refetch data
      queryClient.invalidateQueries({ queryKey: ['dashboard-teamRequests'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-teamMembers'] });
    },
    onError: (error, variables) => {
      console.error(`Error ${variables.status} request:`, error);
    }
  });

  const handleRequestAction = (requestId: number, status: 'accepted' | 'rejected') => {
    setActionLoading(requestId);
    requestActionMutation.mutate({ requestId, status }, {
      onSettled: () => setActionLoading(null)
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <div>Loading dashboard...</div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .dashboard-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          background-color: #f8f9fa;
          min-height: 100vh;
        }
        .dashboard-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .dashboard-title {
          color: #333;
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }
        .dashboard-subtitle {
          color: #666;
          font-size: 1.1rem;
        }
        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }
        @media (max-width: 768px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }
        .dashboard-section {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          height: fit-content;
        }
        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          padding-bottom: 0.75rem;
          border-bottom: 2px solid #f0f0f0;
        }
        .section-title {
          font-size: 1.3rem;
          font-weight: 600;
          color: #333;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .section-count {
          background-color: #1976d2;
          color: white;
          border-radius: 12px;
          padding: 0.25rem 0.5rem;
          font-size: 0.875rem;
          font-weight: 600;
        }
        .request-card {
          padding: 1rem;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          margin-bottom: 1rem;
          transition: box-shadow 0.2s;
        }
        .request-card:hover {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .request-card:last-child {
          margin-bottom: 0;
        }
        .sender-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }
        .sender-details {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .sender-name {
          font-weight: 600;
          color: #333;
        }
        .sender-company {
          color: #666;
          font-size: 0.875rem;
        }
        .request-time {
          color: #999;
          font-size: 0.75rem;
        }
        .request-message {
          background-color: #f8f9fa;
          padding: 0.75rem;
          border-radius: 6px;
          margin-bottom: 0.75rem;
          font-style: italic;
          color: #555;
        }
        .request-context {
          color: #666;
          font-size: 0.875rem;
          margin-bottom: 1rem;
        }
        .request-actions {
          display: flex;
          gap: 0.75rem;
        }
        .btn-accept {
          background-color: #4caf50;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: background-color 0.2s;
          flex: 1;
        }
        .btn-accept:hover:not(:disabled) {
          background-color: #45a049;
        }
        .btn-reject {
          background-color: #f44336;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: background-color 0.2s;
          flex: 1;
        }
        .btn-reject:hover:not(:disabled) {
          background-color: #da190b;
        }
        .btn-accept:disabled,
        .btn-reject:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .team-member-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          margin-bottom: 0.75rem;
          background-color: white;
        }
        .team-member-card:last-child {
          margin-bottom: 0;
        }
        .member-info h4 {
          margin: 0 0 0.25rem 0;
          color: #333;
          font-weight: 600;
        }
        .member-info p {
          margin: 0;
          color: #666;
          font-size: 0.875rem;
        }
        .member-since {
          color: #999;
          font-size: 0.75rem;
        }
        .empty-state {
          text-align: center;
          padding: 2rem;
          color: #666;
        }
        .empty-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .stat-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .stat-number {
          font-size: 2rem;
          font-weight: bold;
          color: #1976d2;
          margin-bottom: 0.5rem;
        }
        .stat-label {
          color: #666;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
      `}</style>
      
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">Manage your team requests and connections</p>
        </div>

        {/* Stats Overview */}
          <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{pendingRequests?.length || 0}</div>
            <div className="stat-label">Pending Requests</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{teamMembers?.length || 0}</div>
            <div className="stat-label">Team Members</div>
          </div>
        </div>        <div className="dashboard-grid">
          {/* Pending Team Requests */}
          <div className="dashboard-section">
            <div className="section-header">
              <h2 className="section-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                Pending Requests
                {pendingRequests && pendingRequests.length > 0 && (
                  <span className="section-count">{pendingRequests.length}</span>
                )}
              </h2>
            </div>

            {!pendingRequests || pendingRequests.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📭</div>
                <p>No pending team requests</p>
                <small>When someone sends you a team request, it will appear here</small>
              </div>
            ) : (
              pendingRequests.map((request) => (
                <div key={request.id} className="request-card">
                  <div className="sender-info">
                    <div className="sender-details">
                      <span className="sender-name">{request.sender_name}</span>
                      {request.sender_company && (
                        <span className="sender-company">• {request.sender_company}</span>
                      )}
                    </div>
                    <span className="request-time">{formatDate(request.created_at)}</span>
                  </div>

                  {request.message && (
                    <div className="request-message">
                      "{request.message}"
                    </div>
                  )}

                  {request.match_context && (
                    <div className="request-context">
                      {request.match_context.skill && `Skill: ${request.match_context.skill}`}
                      {request.match_context.distance && ` • ${request.match_context.distance}km away`}
                      {request.match_context.score && ` • Match Score: ${request.match_context.score}%`}
                    </div>
                  )}

                  <div className="request-actions">
                    <button
                      className="btn-accept"
                      onClick={() => handleRequestAction(request.id, 'accepted')}
                      disabled={actionLoading === request.id}
                    >
                      {actionLoading === request.id ? 'Processing...' : 'Accept'}
                    </button>
                    <button
                      className="btn-reject"
                      onClick={() => handleRequestAction(request.id, 'rejected')}
                      disabled={actionLoading === request.id}
                    >
                      {actionLoading === request.id ? 'Processing...' : 'Reject'}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* My Team */}
          <div className="dashboard-section">
            <div className="section-header">
              <h2 className="section-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                My Team
                {teamMembers && teamMembers.length > 0 && (
                  <span className="section-count">{teamMembers.length}</span>
                )}
              </h2>
            </div>

            {!teamMembers || teamMembers.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">👥</div>
                <p>No team members yet</p>
                <small>Accept team requests to build your network</small>
              </div>
            ) : (
              teamMembers.map((member) => (
                <div key={member.id} className="team-member-card">
                  <div className="member-info">
                    <h4>{member.name}</h4>
                    {member.company && <p>{member.company}</p>}
                    <span className="member-since">
                      Connected since {formatDate(member.created_at)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
