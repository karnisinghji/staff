import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { ContractorRequirementsList } from './ContractorRequirementsList';

// Force cache bust - Updated API endpoint
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3003/api/matching/my-team';

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

  useEffect(() => {
    const fetchMatches = async () => {
      setError('');
      setLoading(true);
      console.log('MyTeamPage: Starting fetch... [UPDATED CODE - Oct 1, 2025]');
      console.log('MyTeamPage: API_URL =', API_URL);
      console.log('MyTeamPage: Expected URL should be /my-team NOT /saved-matches');
      console.log('MyTeamPage: Token exists =', !!token);
      console.log('MyTeamPage: Token value =', token?.substring(0, 20) + '...');
      
      if (!token) {
        console.log('MyTeamPage: No token available');
        setError('Please log in to view your team members');
        setLoading(false);
        return;
      }

      try {
        console.log('MyTeamPage: Making fetch request...');
        const res = await fetch(API_URL, {
          method: 'GET',
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        console.log('MyTeamPage: Response status:', res.status);
        console.log('MyTeamPage: Response ok:', res.ok);
        
        const data = await res.json();
        console.log('MyTeamPage: API Response data:', data);
        
        if (res.ok && data.success && data.data) {
          const teamMembers = data.data.teamMembers || [];
          console.log('MyTeamPage: Team members received:', teamMembers.length);
          // Map the API response to include isAvailable field
          const mappedMembers = teamMembers.map((member: any) => ({
            ...member,
            isAvailable: member.is_available
          }));
          setMatches(mappedMembers);
          console.log('MyTeamPage: Successfully set matches:', mappedMembers.length);
        } else {
          console.error('MyTeamPage: API Error - Status:', res.status, 'Data:', data);
          setError(data.message || `Failed to fetch team members (${res.status})`);
        }
      } catch (err) {
        console.error('MyTeamPage: Network/Fetch Error:', err);
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(`Network error: ${errorMessage}. Please check if backend services are running.`);
      } finally {
        setLoading(false);
      }
    };
    
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
          <div className="myteam-header">My Team - Fixed API</div>
          {error && <div className="myteam-error">{error}</div>}
          
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
              <li style={{ textAlign: 'center', color: '#2196f3', justifyContent: 'center' }}>
                Loading team members...
              </li>
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
