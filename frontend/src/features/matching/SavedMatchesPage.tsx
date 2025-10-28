import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { ContractorRequirementsList } from './ContractorRequirementsList';
import { CardSkeleton, SkeletonStyles } from '../common/Skeleton';
import { ContactOptionsModal } from '../common/ContactOptionsModal';
import { LocationMapModal } from '../common/LocationMapModal';
import { LocationHistoryViewer } from './LocationHistoryViewer';
import { TeamMapView } from './TeamMapView';
import ModernMessagingPage from '../messaging/ModernMessagingPage';
import { API_CONFIG } from '../../config/api';
import { useGPSTracking } from '../../hooks/useGPSTracking';

// Use production API URL
const API_URL = `${API_CONFIG.MATCHING_SERVICE}/api/matching/my-team`;

type TabType = 'members' | 'messages' | 'map';

interface TeamMember {
  team_member_record_id: string;
  team_member_id: string;
  relationship_type: string;
  team_since: string;
  notes?: string;
  name: string;
  email: string;
  phone?: string;
  role: 'worker' | 'contractor';
  location?: string;
  latitude?: number | string | null; // API returns string or null
  longitude?: number | string | null; // API returns string or null
  distance_km?: number | null;
  distance_formatted?: string | null;
  profile_info?: string;
  rating?: string;
  total_work?: number;
  isAvailable?: boolean;
  // Live location tracking fields
  location_status?: 'live' | 'recent' | 'stale' | 'old' | 'very_old' | 'unknown';
  location_status_text?: string;
  is_tracking_live?: boolean;
  location_last_update?: string;
}

export const MyTeamPage: React.FC = () => {
  const { token, user } = useAuth();
  const [matches, setMatches] = useState<TeamMember[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'available' | 'busy'>('all');
  const [activeTab, setActiveTab] = useState<TabType>('messages');
  
  // Get user role from JWT token or user object
  const userRole = user?.role || user?.roles?.[0] || 'worker';
  
  // Tracking mode: 'live' (30s) or 'shift' (5min)
  const [trackingMode, setTrackingMode] = useState<'live' | 'shift'>(() => {
    // Restore tracking mode from localStorage
    const saved = localStorage.getItem('gpsTrackingMode');
    return (saved === 'live' || saved === 'shift') ? saved : 'shift';
  });
  
  // GPS location tracking - restore state from localStorage
  const [autoTrackingEnabled, setAutoTrackingEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('gpsTrackingEnabled');
    const enabledAt = localStorage.getItem('gpsTrackingEnabledAt');
    
    // If tracking was enabled, check if it's been less than 24 hours
    if (saved === 'true' && enabledAt) {
      const enabledTime = new Date(enabledAt).getTime();
      const now = Date.now();
      const hoursElapsed = (now - enabledTime) / (1000 * 60 * 60);
      
      // Keep tracking enabled if less than 24 hours have passed
      if (hoursElapsed < 24) {
        console.log('[GPS Tracking] Auto-resuming tracking (enabled ${hoursElapsed.toFixed(1)}h ago)');
        return true;
      } else {
        // Clear expired tracking state
        localStorage.removeItem('gpsTrackingEnabled');
        localStorage.removeItem('gpsTrackingEnabledAt');
        console.log('[GPS Tracking] 24-hour period expired, tracking disabled');
      }
    }
    return false;
  });
  
  // Real-time GPS tracking with selectable mode
  const { status: gpsStatus, isSupported: isGPSSupported } = useGPSTracking({
    enabled: autoTrackingEnabled,
    mode: trackingMode,
    highAccuracy: true,
    onLocationUpdate: (position) => {
      console.log('[My Team] GPS updated:', position.coords);
      // Location saved to backend, no need to refresh entire team list
    },
    onError: (error) => {
      console.error('[My Team] GPS error:', error);
    }
  });
  
  // Modal states
  const [showContactModal, setShowContactModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showTeamMapView, setShowTeamMapView] = useState(false); // New: Full team map view
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [currentUserLocation, setCurrentUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  // Persist GPS tracking state to localStorage
  useEffect(() => {
    if (autoTrackingEnabled) {
      localStorage.setItem('gpsTrackingEnabled', 'true');
      // Set the enabled timestamp only if it doesn't exist (first time enabling)
      if (!localStorage.getItem('gpsTrackingEnabledAt')) {
        localStorage.setItem('gpsTrackingEnabledAt', new Date().toISOString());
      }
      console.log('[GPS Tracking] Tracking enabled and persisted');
    } else {
      localStorage.removeItem('gpsTrackingEnabled');
      localStorage.removeItem('gpsTrackingEnabledAt');
      console.log('[GPS Tracking] Tracking disabled and cleared from storage');
    }
  }, [autoTrackingEnabled]);

  // Show notification when tracking auto-resumes on page load
  useEffect(() => {
    if (autoTrackingEnabled) {
      const enabledAt = localStorage.getItem('gpsTrackingEnabledAt');
      if (enabledAt) {
        const enabledTime = new Date(enabledAt).getTime();
        const now = Date.now();
        const hoursElapsed = (now - enabledTime) / (1000 * 60 * 60);
        const hoursRemaining = Math.max(0, 24 - hoursElapsed);
        
        console.log(`[GPS Tracking] Auto-resumed tracking (${hoursRemaining.toFixed(1)}h remaining)`);
      }
    }
  }, []); // Only run on mount

  // Persist tracking mode to localStorage
  useEffect(() => {
    localStorage.setItem('gpsTrackingMode', trackingMode);
  }, [trackingMode]);

  // Calculate remaining tracking time
  const getRemainingTrackingTime = (): string => {
    const enabledAt = localStorage.getItem('gpsTrackingEnabledAt');
    if (!enabledAt) return '';
    
    const enabledTime = new Date(enabledAt).getTime();
    const now = Date.now();
    const hoursElapsed = (now - enabledTime) / (1000 * 60 * 60);
    const hoursRemaining = Math.max(0, 24 - hoursElapsed);
    
    if (hoursRemaining > 1) {
      return `${hoursRemaining.toFixed(1)}h remaining`;
    } else if (hoursRemaining > 0) {
      const minutesRemaining = Math.floor(hoursRemaining * 60);
      return `${minutesRemaining}m remaining`;
    }
    return 'Expiring soon';
  };

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
      
      // Store current user location if available
      if (data.data && data.data.currentUserLocation) {
        setCurrentUserLocation(data.data.currentUserLocation);
      }
      
      // Debug: Log all team members with their coordinates
      const allMembers = data.data?.teamMembers || data.data || data;
      if (Array.isArray(allMembers)) {
        console.log('📍 All team members coordinates:');
        allMembers.forEach((member: any) => {
          console.log(`  ${member.name}: lat=${member.latitude}, lng=${member.longitude}`);
        });
      }
      
      // Handle the correct response structure: data.data.teamMembers
      if (data.success && data.data && Array.isArray(data.data.teamMembers)) {
        setMatches(data.data.teamMembers);
      } else if (data.data && Array.isArray(data.data.teamMembers)) {
        setMatches(data.data.teamMembers);
      } else if (data.success && Array.isArray(data.data)) {
        // Legacy format: data.data is directly an array
        setMatches(data.data);
      } else if (data.data && Array.isArray(data.data)) {
        setMatches(data.data);
      } else if (Array.isArray(data)) {
        // Handle case where data is directly an array
        setMatches(data);
      } else if (data.message && data.message.includes('No team members')) {
        // Explicitly handle "No team members found" message
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
    
    // Also try to load user's last saved location from backend
    const fetchUserLocation = async () => {
      if (!token) return;
      
      try {
        const response = await fetch(`${API_CONFIG.MATCHING_SERVICE}/api/matching/location/history?limit=1`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.history && data.history.length > 0) {
            const lastLocation = data.history[0];
            setCurrentUserLocation({
              latitude: lastLocation.latitude,
              longitude: lastLocation.longitude
            });
          }
        }
      } catch (err) {
        console.log('Could not fetch user location history:', err);
      }
    };
    
    fetchUserLocation();
  }, [token]);

  // Periodic refresh when GPS tracking is active (backend fetches fresh locations, no page reload)
  useEffect(() => {
    if (!gpsStatus.isTracking) return;
    
    // Silently fetch updated team data from backend every 60 seconds
    // Backend always returns fresh location data, no UI refresh needed
    const refreshInterval = setInterval(() => {
      console.log('[My Team] Fetching updated team locations from backend');
      fetchMatches(); // This calls the API, backend returns latest data
    }, 60 * 1000); // 1 minute
    
    return () => clearInterval(refreshInterval);
  }, [gpsStatus.isTracking]);

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

  // Helper function to get distance badge
  const getDistanceBadge = (distanceKm?: number | null, distanceFormatted?: string | null) => {
    if (!distanceKm && !distanceFormatted) {
      return null;
    }
    
    return (
      <span style={{ 
        display: 'inline-block', 
        padding: '0.2rem 0.6rem', 
        borderRadius: '12px', 
        fontSize: '0.85rem', 
        fontWeight: '600', 
        background: '#2196f3', 
        color: 'white',
        marginLeft: '0.5rem'
      }}>
        📍 {distanceFormatted || `${distanceKm?.toFixed(1)} km`}
      </span>
    );
  };

  // Helper function to get location status badge
  const getLocationStatusBadge = (member: TeamMember) => {
    const status = member.location_status || 'unknown';
    const statusText = member.location_status_text || 'Location not updated';
    const isTracking = member.is_tracking_live || false;

    // Color coding based on status
    let bgColor = '#9e9e9e'; // gray for unknown
    let icon = '📍';
    
    switch (status) {
      case 'live':
        bgColor = '#4caf50'; // green
        icon = '🟢';
        break;
      case 'recent':
        bgColor = '#8bc34a'; // light green
        icon = '🟡';
        break;
      case 'stale':
        bgColor = '#ff9800'; // orange
        icon = '🟠';
        break;
      case 'old':
      case 'very_old':
        bgColor = '#9e9e9e'; // gray
        icon = '⚪';
        break;
    }

    return (
      <span style={{ 
        display: 'inline-block', 
        padding: '0.2rem 0.6rem', 
        borderRadius: '12px', 
        fontSize: '0.85rem', 
        fontWeight: '600', 
        background: bgColor, 
        color: 'white',
        marginLeft: '0.5rem'
      }}
      title={isTracking ? 'GPS tracking active' : 'Using last known location'}>
        {icon} {statusText}
      </span>
    );
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
          
          {/* Tab Navigation */}
          <div style={{ 
            display: 'flex', 
            borderBottom: '2px solid #e0e0e0', 
            marginBottom: '1.5rem',
            gap: '0.5rem'
          }}>
            <button
              onClick={() => setActiveTab('members')}
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                border: 'none',
                background: activeTab === 'members' ? '#1976d2' : 'transparent',
                color: activeTab === 'members' ? 'white' : '#666',
                borderRadius: '8px 8px 0 0',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontSize: '0.95rem'
              }}
            >
              📋 Team Members ({matches.length})
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                border: 'none',
                background: activeTab === 'messages' ? '#1976d2' : 'transparent',
                color: activeTab === 'messages' ? 'white' : '#666',
                borderRadius: '8px 8px 0 0',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontSize: '0.95rem'
              }}
            >
              💬 Messages
            </button>
            <button
              onClick={() => setActiveTab('map')}
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                border: 'none',
                background: activeTab === 'map' ? '#1976d2' : 'transparent',
                color: activeTab === 'map' ? 'white' : '#666',
                borderRadius: '8px 8px 0 0',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontSize: '0.95rem'
              }}
            >
              🗺️ Location Map
            </button>
          </div>
          
          {/* Members Tab Content */}
          {activeTab === 'members' && (
            <>
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
          
          {/* Real-time GPS Tracking Toggle - Live & Shift Modes */}
          {isGPSSupported && (
            <div style={{
              background: gpsStatus.isTracking ? '#e8f5e9' : '#fff3e0',
              border: `2px solid ${gpsStatus.isTracking ? '#4caf50' : '#ff9800'}`,
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.25rem' }}>
                    {gpsStatus.isTracking ? (trackingMode === 'live' ? '🟢' : '🔵') : '⚪'}
                  </span>
                  <strong style={{ fontSize: '0.95rem' }}>
                    {gpsStatus.isTracking ? (trackingMode === 'live' ? 'Live Tracking' : 'Shift Mode') : 'GPS Tracking Off'}
                  </strong>
                </div>
                <button
                  onClick={() => {
                    if (autoTrackingEnabled) {
                      // Confirm before stopping
                      if (window.confirm('Stop GPS tracking? You will need to manually restart it.')) {
                        setAutoTrackingEnabled(false);
                      }
                    } else {
                      setAutoTrackingEnabled(true);
                    }
                  }}
                  style={{
                    background: gpsStatus.isTracking ? '#f44336' : '#4caf50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: '600'
                  }}
                >
                  {gpsStatus.isTracking ? 'Stop' : 'Start'}
                </button>
              </div>
              
              {/* Show remaining time when tracking is active */}
              {gpsStatus.isTracking && (
                <div style={{ 
                  fontSize: '0.75rem', 
                  color: '#666', 
                  marginBottom: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  ⏱️ Auto-tracking enabled • {getRemainingTrackingTime()}
                </div>
              )}
              
              {/* Tracking Mode Selection */}
              {!gpsStatus.isTracking && (
                <div style={{ marginBottom: '0.75rem' }}>
                  <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.5rem' }}>
                    Choose tracking mode:
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <label style={{ 
                      flex: 1, 
                      cursor: 'pointer',
                      border: `2px solid ${trackingMode === 'live' ? '#4caf50' : '#ddd'}`,
                      borderRadius: '6px',
                      padding: '0.75rem',
                      background: trackingMode === 'live' ? '#e8f5e9' : 'white',
                      transition: 'all 0.2s'
                    }}>
                      <input
                        type="radio"
                        name="trackingMode"
                        value="live"
                        checked={trackingMode === 'live'}
                        onChange={(e) => setTrackingMode(e.target.value as 'live' | 'shift')}
                        style={{ marginRight: '0.5rem' }}
                      />
                      <strong style={{ fontSize: '0.85rem' }}>🟢 Live Mode</strong>
                      <div style={{ fontSize: '0.7rem', color: '#666', marginTop: '0.25rem', marginLeft: '1.5rem' }}>
                        Updates every 30s<br/>
                        <em>For active jobs</em>
                      </div>
                    </label>
                    
                    <label style={{ 
                      flex: 1, 
                      cursor: 'pointer',
                      border: `2px solid ${trackingMode === 'shift' ? '#2196f3' : '#ddd'}`,
                      borderRadius: '6px',
                      padding: '0.75rem',
                      background: trackingMode === 'shift' ? '#e3f2fd' : 'white',
                      transition: 'all 0.2s'
                    }}>
                      <input
                        type="radio"
                        name="trackingMode"
                        value="shift"
                        checked={trackingMode === 'shift'}
                        onChange={(e) => setTrackingMode(e.target.value as 'live' | 'shift')}
                        style={{ marginRight: '0.5rem' }}
                      />
                      <strong style={{ fontSize: '0.85rem' }}>🔵 Shift Mode</strong>
                      <div style={{ fontSize: '0.7rem', color: '#666', marginTop: '0.25rem', marginLeft: '1.5rem' }}>
                        Updates every 5 min<br/>
                        <em>Battery-friendly</em>
                      </div>
                    </label>
                  </div>
                </div>
              )}
              
              <div style={{ fontSize: '0.8rem', color: '#666' }}>
                {gpsStatus.isTracking ? (
                  <>
                    📡 {trackingMode === 'live' ? 'Updating every 30s' : 'Updating every 5 min'} • {gpsStatus.updateCount} updates
                    {gpsStatus.accuracy != null && typeof gpsStatus.accuracy === 'number' && ` • ${gpsStatus.accuracy.toFixed(0)}m accuracy`}
                  </>
                ) : (
                  'Enable to share your location with team members'
                )}
              </div>
              {gpsStatus.error && (
                <div style={{ fontSize: '0.8rem', color: '#f44336', marginTop: '0.5rem' }}>
                  ⚠️ {gpsStatus.error}
                </div>
              )}
              {gpsStatus.error && gpsStatus.error.includes('unavailable') && (
                <div style={{ 
                  fontSize: '0.75rem', 
                  color: '#666',
                  marginTop: '0.5rem',
                  padding: '0.5rem',
                  background: '#f5f5f5',
                  borderRadius: '4px'
                }}>
                  💡 <strong>Tip:</strong> Desktop browsers often don't have GPS. For best results, use this feature on a mobile device or update your location manually below.
                </div>
              )}
            </div>
          )}
          
          {/* View All on Map Button */}
          {(() => {
            // Use same filter logic as TeamMapView for consistency
            const membersWithLocation = matches.filter(m => {
              const latStr = String(m.latitude || '');
              const lngStr = String(m.longitude || '');
              const hasLat = latStr && latStr !== 'null' && latStr !== 'undefined';
              const hasLng = lngStr && lngStr !== 'null' && lngStr !== 'undefined';
              const latNum = parseFloat(latStr);
              const lngNum = parseFloat(lngStr);
              const isValid = hasLat && hasLng && !isNaN(latNum) && !isNaN(lngNum) && latNum !== 0 && lngNum !== 0;
              
              // Debug log
              console.log(`Filter check for ${m.name}: lat="${latStr}" lng="${lngStr}" valid=${isValid}`);
              
              return isValid;
            });
            
            // Debug: Show which members passed the filter
            console.log('Members with valid location for map:', membersWithLocation.map(m => `${m.name} [${m.latitude}, ${m.longitude}]`));
            
            return membersWithLocation.length > 0 && (
              <button
                onClick={() => setShowTeamMapView(true)}
                style={{
                  background: '#4caf50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.75rem 1rem',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 4px rgba(76, 175, 80, 0.3)'
                }}
              >
                🗺️ View All on Map ({membersWithLocation.length} member{membersWithLocation.length !== 1 ? 's' : ''})
              </button>
            );
          })()}
          
          {/* Location History Viewer - Shows your own history */}
          <LocationHistoryViewer 
            userName="Your"
            userRole={userRole}
          />
          
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
                <div style={{ flex: 1 }}>
                  <strong>{member.name}</strong>
                  {member.profile_info && (
                    <> &mdash; {member.profile_info}</>
                  )}
                  <div style={{fontSize: '0.85em', color: '#666', marginTop: '4px'}}>
                    {member.role} • {member.location} • Rating: {member.rating || 'N/A'}
                  </div>
                  <div style={{ marginTop: '0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                    {getAvailabilityBadge(member.isAvailable)}
                    {getLocationStatusBadge(member)}
                    {getDistanceBadge(member.distance_km, member.distance_formatted)}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  {member.phone && (
                    <button
                      onClick={() => {
                        setSelectedMember(member);
                        setShowContactModal(true);
                      }}
                      style={{
                        background: '#4caf50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: '600'
                      }}
                    >
                      📞 Contact
                    </button>
                  )}
                  {member.latitude && member.longitude && currentUserLocation && (
                    <button
                      onClick={() => {
                        setSelectedMember(member);
                        setShowMapModal(true);
                      }}
                      style={{
                        background: '#2196f3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: '600'
                      }}
                    >
                      🗺️ View on Map
                    </button>
                  )}
                  {(!member.latitude || !member.longitude || String(member.latitude) === '0' || String(member.longitude) === '0') && (
                    <div style={{
                      background: '#fff3cd',
                      color: '#856404',
                      border: '1px solid #ffeeba',
                      borderRadius: '6px',
                      padding: '6px 12px',
                      fontSize: '12px',
                      fontStyle: 'italic',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      📍 Location not set
                    </div>
                  )}
                </div>
                
                {/* Location History for this team member */}
                <div style={{ marginTop: '0.75rem' }}>
                  <LocationHistoryViewer 
                    userId={member.team_member_id}
                    userName={member.name}
                    userRole={member.role}
                  />
                </div>
              </li>
            ))}
          </ul>

          {/* Contractor Requirements Section (visible to workers only) */}
          {userRole === 'worker' && (
            <ContractorRequirementsList showContactButton={true} />
          )}
            </>
          )}
        </div>
      </div>
      
      {/* Messages Tab Content - Full Width */}
      {activeTab === 'messages' && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: '#f5f7fa',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          padding: '1rem'
        }}>
          {/* Header with Back Button */}
          <div style={{
            background: 'white',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <button
              onClick={() => setActiveTab('members')}
              style={{
                background: '#1976d2',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 16px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              ← Back to Team
            </button>
            <h2 style={{ margin: 0, color: '#1976d2', fontSize: '1.5rem', fontWeight: '700' }}>
              💬 Team Messages
            </h2>
          </div>
          
          {/* Messaging Interface */}
          <div style={{
            flex: 1,
            overflow: 'hidden',
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <ModernMessagingPage />
          </div>
        </div>
      )}
      
      {/* Map Tab Content - Full Width */}
      {activeTab === 'map' && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: '#f5f7fa',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          padding: '1rem'
        }}>
          {/* Header with Back Button */}
          <div style={{
            background: 'white',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <button
              onClick={() => setActiveTab('members')}
              style={{
                background: '#1976d2',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 16px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              ← Back to Team
            </button>
            <h2 style={{ margin: 0, color: '#1976d2', fontSize: '1.5rem', fontWeight: '700' }}>
              🗺️ Team Location Map
            </h2>
          </div>
          
          {/* Map Interface */}
          <div style={{
            flex: 1,
            overflow: 'hidden',
            background: 'white',
            borderRadius: '8px'
          }}>
            <TeamMapView />
          </div>
        </div>
      )}
      
      {/* Contact Modal */}
      {showContactModal && selectedMember && (
        <ContactOptionsModal
          isOpen={showContactModal}
          onClose={() => {
            setShowContactModal(false);
            setSelectedMember(null);
          }}
          contactName={selectedMember.name}
          contactEmail={selectedMember.email}
          contactPhone={selectedMember.phone}
          onCall={() => {
            if (selectedMember.phone) {
              window.location.href = `tel:${selectedMember.phone}`;
            }
          }}
          onMessage={() => {
            if (selectedMember.phone) {
              window.location.href = `sms:${selectedMember.phone}`;
            }
          }}
        />
      )}
      
      {/* Map Modal */}
      {showMapModal && selectedMember && currentUserLocation && (
        <LocationMapModal
          isOpen={showMapModal}
          onClose={() => {
            setShowMapModal(false);
            setSelectedMember(null);
          }}
          workerName={selectedMember.name}
          workerLocation={{
            latitude: Number(selectedMember.latitude) || 0,
            longitude: Number(selectedMember.longitude) || 0,
            address: selectedMember.location
          }}
          contractorLocation={{
            latitude: Number(currentUserLocation.latitude) || 0,
            longitude: Number(currentUserLocation.longitude) || 0
          }}
          distance={selectedMember.distance_formatted || `${selectedMember.distance_km?.toFixed(1)} km` || 'N/A'}
        />
      )}
      
      {/* Team Map View - Full screen map with all team members */}
      {showTeamMapView && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'white',
          zIndex: 10000,
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Close Button */}
          <div style={{ 
            position: 'absolute', 
            top: '1rem', 
            right: '1rem', 
            zIndex: 10001 
          }}>
            <button
              onClick={() => setShowTeamMapView(false)}
              style={{
                background: 'white',
                border: '2px solid #1976d2',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                fontSize: '1.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1976d2',
                fontWeight: 'bold',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
              }}
            >
              ×
            </button>
          </div>
          
          <TeamMapView />
        </div>
      )}
    </>
  );
};
