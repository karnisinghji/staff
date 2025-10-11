import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { ContractorRequirementsList } from './ContractorRequirementsList';
import { CardSkeleton, SkeletonStyles } from '../common/Skeleton';
import { API_CONFIG } from '../../config/api';

// Use production API URL
const API_URL = `${API_CONFIG.MATCHING_SERVICE}/api/matching/my-team`;

interface TeamMember {
  team_member_record_id: string;
  team_member_id: string;
  relationship_type: string;
  team_since: string;
  notes?: string;
  name: string;
  email: string;
  role: 'worker' | 'contractor';
  location?: string;
  profile_info?: string;
  rating?: string;
  total_work?: number;
  isAvailable?: boolean; // We'll need to add this from worker profiles
}

export const MyTeamPage: React.FC = () => {
  const { token } = useAuth();
  const [matches, setMatches] = useState<TeamMember[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'available' | 'busy'>('all');

  const fetchMatches = async () => {
    setError('');
    setLoading(true);
    // Fetching team data...
    
    if (!token) {
      // No authentication token
      setError('Please log in to view your team members');
      setLoading(false);
      return;
    }

    try {
      // Making API request
      const res = await fetch(API_URL, {
        credentials: 'include',
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      
      // Response received
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      
      const data = await res.json();
      console.log('MyTeamPage: Response data:', data);
      
      if (data.success && Array.isArray(data.data)) {
        setMatches(data.data);
      } else if (data.data && Array.isArray(data.data)) {
        setMatches(data.data);
      } else if (Array.isArray(data)) {
        // Handle case where data is directly an array
        setMatches(data);
      } else {
        // Check if this is a success message about team members found
        if (data.message && (
          data.message.includes('Found') && data.message.includes('team member') ||
          data.message.includes('No team members') ||
          data.message.includes('empty')
        )) {
          // This is a success message, set empty array for now (data should be in data.data)
          setMatches([]);
        } else if (data.message && (
          data.message.includes('error') ||
          data.message.includes('failed') ||
          data.message.includes('unauthorized')
        )) {
          // This is an actual error message
          throw new Error(data.message);
        } else {
          // Fallback for unknown format - try to handle it gracefully
          console.warn('MyTeamPage: Unknown response format:', data);
          setMatches([]);
        }
      }
    } catch (err) {
      console.error('MyTeamPage: Network/Fetch Error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(`Network error: ${errorMessage}. Please check if backend services are running.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('MyTeamPage: useEffect running, token exists:', !!token);
    fetchMatches();
  }, [token]);

  // Filter matches based on availability status
  const filteredMatches = matches.filter(match => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'available') return match.isAvailable === true;
    if (filterStatus === 'busy') return match.isAvailable === false || match.isAvailable === null || match.isAvailable === undefined;
    return true;
  });

  // Helper function to get availability badge
  const getAvailabilityBadge = (isAvailable?: boolean) => {
    if (isAvailable === true) {
      return <span style={{ 
        display: 'inline-block', 
        padding: '0.2rem 0.6rem', 
        borderRadius: '12px', 
        fontSize: '0.85rem', 
        fontWeight: '600', 
        background: '#4caf50', 
        color: 'white',
        marginLeft: '0.5rem'
      }}>Available</span>;
    } else if (isAvailable === false) {
      return <span style={{ 
        display: 'inline-block', 
        padding: '0.2rem 0.6rem', 
        borderRadius: '12px', 
        fontSize: '0.85rem', 
        fontWeight: '600', 
        background: '#f44336', 
        color: 'white',
        marginLeft: '0.5rem'
      }}>Busy</span>;
    }
    return <span style={{ 
      display: 'inline-block', 
      padding: '0.2rem 0.6rem', 
      borderRadius: '12px', 
      fontSize: '0.85rem', 
      fontWeight: '600', 
      background: '#9e9e9e', 
      color: 'white',
      marginLeft: '0.5rem'
    }}>N/A</span>;
  };

  return (
    <>
      <style>{`
        .myteam-bg {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          background: #f5f7fa;
          padding: 2rem;
        }
        .myteam-container {
          width: 100%;
          max-width: 500px;
          min-width: 320px;
          padding: 2.5rem 2.5rem 2rem 2.5rem;
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 4px 32px rgba(0,0,0,0.10);
          display: flex;
          animation: fadeInUp 0.6s ease-out;
          flex-direction: column;
          gap: 1.5rem;
        }
        .myteam-header {
          text-align: center;
          margin-bottom: 1rem;
          color: #fbc02d;
          font-size: 2rem;
          font-weight: 700;
        }
        .myteam-error {
          color: red;
          text-align: center;
          font-weight: 500;
        }
        .myteam-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .myteam-list li {
          background: #f7f9fc;
          margin-bottom: 1rem;
          padding: 1rem;
          border-radius: 8px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
          font-size: 1.05rem;
          color: #333;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
        }
        .filter-buttons {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
          margin-bottom: 1rem;
        }
        .filter-btn {
          padding: 0.5rem 1rem;
          border: 2px solid #1976d2;
          background: white;
          color: #1976d2;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .filter-btn:hover {
          background: #e3f2fd;
        }
        .filter-btn.active {
          background: #1976d2;
          color: white;
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
        
        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .myteam-container {
            padding: 1rem;
          }
          .filter-buttons {
            flex-wrap: wrap;
            gap: 0.25rem;
          }
          .filter-btn {
            padding: 0.4rem 0.8rem;
            font-size: 0.9rem;
          }
          .myteam-list li {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
          .myteam-title {
            font-size: 1.5rem;
          }
        }
        @media (max-width: 600px) {
          .myteam-container {
            max-width: 100vw;
            min-width: 0;
            padding: 1.2rem 0.5rem 1rem 0.5rem;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          }
          .myteam-header {
            font-size: 1.4rem;
          }
          .myteam-list li {
            font-size: 0.98rem;
            padding: 0.7rem;
          }
        }
      `}</style>
      <div className="myteam-bg">
        <div className="myteam-container">
          <div className="myteam-header">My Team</div>
          {error && (
            <div style={{ 
              background: '#ffebee', 
              color: '#d32f2f', 
              padding: '1rem', 
              borderRadius: '8px', 
              textAlign: 'center',
              marginBottom: '1rem',
              border: '1px solid #ffcdd2'
            }}>
              <div style={{ marginBottom: '1rem' }}>❌ {error}</div>
              <button
                onClick={fetchMatches}
                style={{
                  background: '#1976d2',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                🔄 Try Again
              </button>
            </div>
          )}
          
          {/* Filter buttons */}
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
              onClick={() => setFilterStatus('all')}
            >
              All ({matches.length})
            </button>
            <button 
              className={`filter-btn ${filterStatus === 'available' ? 'active' : ''}`}
              onClick={() => setFilterStatus('available')}
            >
              Available ({matches.filter(m => m.isAvailable === true).length})
            </button>
            <button 
              className={`filter-btn ${filterStatus === 'busy' ? 'active' : ''}`}
              onClick={() => setFilterStatus('busy')}
            >
              Busy ({matches.filter(m => m.isAvailable === false || m.isAvailable === null || m.isAvailable === undefined).length})
            </button>
          </div>

          <ul className="myteam-list">
            {loading && (
              <>
                <SkeletonStyles />
                {[1, 2, 3, 4].map(i => (
                  <li key={i} style={{ listStyle: 'none' }}>
                    <CardSkeleton showActions={false} />
                  </li>
                ))}
              </>
            )}
            {!loading && filteredMatches.length === 0 && !error && (
              <li style={{ textAlign: 'center', color: '#888', justifyContent: 'center' }}>
                {filterStatus === 'all' ? 'No team members found.' : `No ${filterStatus} team members found.`}
              </li>
            )}
            {!loading && filteredMatches.map((member, idx) => (
              <li key={member.team_member_record_id || idx}>
                <div>
                  <strong>{member.name}</strong>
                  {member.profile_info && (
                    <> &mdash; {member.profile_info}</>
                  )}
                  <div style={{fontSize: '0.85em', color: '#666', marginTop: '4px'}}>
                    {member.role} • {member.location} • Rating: {member.rating || 'N/A'}
                  </div>
                </div>
                {getAvailabilityBadge(member.isAvailable)}
              </li>
            ))}
          </ul>

          {/* Contractor Requirements Section (visible to workers) */}
          <ContractorRequirementsList showContactButton={true} />
        </div>
      </div>
    </>
  );
};
