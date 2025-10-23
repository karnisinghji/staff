import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { ContractorRequirementsList } from './ContractorRequirementsList';
import { CardSkeleton, SkeletonStyles } from '../common/Skeleton';
import { ContactOptionsModal } from '../common/ContactOptionsModal';
import { LocationMapModal } from '../common/LocationMapModal';
import { LocationHistoryViewer } from './LocationHistoryViewer';
import { TeamMapView } from './TeamMapView';
import { API_CONFIG } from '../../config/api';
import { useCurrentLocation } from '../../hooks/useCurrentLocation';
import { useGPSTracking } from '../../hooks/useGPSTracking';

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
  
  // Get user role from JWT token or user object
  const userRole = user?.role || user?.roles?.[0] || 'worker';
  
  // GPS location tracking
  const { location: currentLocation, error: locationError, loading: locationLoading, getCurrentLocation } = useCurrentLocation();
  const [locationUpdateStatus, setLocationUpdateStatus] = useState<'idle' | 'updating' | 'success' | 'error'>('idle');
  const [locationUpdateMessage, setLocationUpdateMessage] = useState('');
  const [autoTrackingEnabled, setAutoTrackingEnabled] = useState<boolean>(false);
  const [autoTrackingTimeRemaining, setAutoTrackingTimeRemaining] = useState<number>(0); // in seconds
  
  // Real-time GPS tracking (auto-updates every 30 seconds)
  const { status: gpsStatus, startTracking, stopTracking, isSupported: isGPSSupported } = useGPSTracking({
    enabled: autoTrackingEnabled,
    updateInterval: 30000, // 30 seconds
    highAccuracy: true,
    onLocationUpdate: (position) => {
      console.log('[My Team] GPS updated:', position.coords);
      // Refresh team data to get updated distances/statuses
      fetchMatches();
    },
    onError: (error) => {
      console.error('[My Team] GPS error:', error);
      setLocationUpdateMessage(`GPS Error: ${error.message}`);
    }
  });
  
  // Modal states
  const [showContactModal, setShowContactModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showTeamMapView, setShowTeamMapView] = useState(false); // New: Full team map view
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [currentUserLocation, setCurrentUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  // Update location to backend
  const updateLocationToBackend = async (lat: number, lng: number) => {
    if (!token) return;
    
    setLocationUpdateStatus('updating');
    setLocationUpdateMessage('Updating your location...');
    
    // Save to state immediately for map display
    setCurrentUserLocation({ latitude: lat, longitude: lng });
    
    try {
      // Save to location history (also updates current location)
      const response = await fetch(`${API_CONFIG.MATCHING_SERVICE}/api/matching/location/history`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          latitude: lat, 
          longitude: lng,
          source: 'manual' // Indicates this was a manual update
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to save location');
      }
      
      setLocationUpdateStatus('success');
      setLocationUpdateMessage('✅ Location saved to history');
      
      // Refresh team data to get updated distances
      fetchMatches();
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setLocationUpdateStatus('idle');
        setLocationUpdateMessage('');
      }, 3000);
    } catch (err) {
      console.error('Location update error:', err);
      setLocationUpdateStatus('error');
      setLocationUpdateMessage('❌ Failed to save location');
      
      setTimeout(() => {
        setLocationUpdateStatus('idle');
        setLocationUpdateMessage('');
      }, 3000);
    }
  };

  // Start auto-tracking for 24 hours (saves every 30 minutes)
  const startAutoTracking = () => {
    const AUTO_TRACK_DURATION = 24 * 60 * 60; // 24 hours in seconds
    const AUTO_TRACK_INTERVAL = 30; // 30 minutes
    
    setAutoTrackingEnabled(true);
    setAutoTrackingTimeRemaining(AUTO_TRACK_DURATION);
    
    // Store start time in localStorage
    localStorage.setItem('autoTrackingStartTime', Date.now().toString());
    localStorage.setItem('autoTrackingEnabled', 'true');
    
    setLocationUpdateMessage('✅ Location saved! Auto-tracking every 30 min for 24 hours');
    setTimeout(() => setLocationUpdateMessage(''), 5000);
  };

  const stopAutoTracking = () => {
    setAutoTrackingEnabled(false);
    setAutoTrackingTimeRemaining(0);
    localStorage.removeItem('autoTrackingStartTime');
    localStorage.removeItem('autoTrackingEnabled');
    
    setLocationUpdateMessage('⏹️ Auto-tracking stopped. Location updates paused.');
    setTimeout(() => setLocationUpdateMessage(''), 3000);
  };

  // Auto-detect location on mount
  useEffect(() => {
    if (currentLocation && !locationError) {
      // Save to state for map display
      setCurrentUserLocation({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude
      });
      // Also update backend
      updateLocationToBackend(currentLocation.latitude, currentLocation.longitude);
    }
  }, [currentLocation, locationError]);

  // Restore auto-tracking state from localStorage
  useEffect(() => {
    const startTime = localStorage.getItem('autoTrackingStartTime');
    const enabled = localStorage.getItem('autoTrackingEnabled');
    
    if (enabled === 'true' && startTime) {
      const elapsedSeconds = Math.floor((Date.now() - parseInt(startTime)) / 1000);
      const remainingSeconds = (24 * 60 * 60) - elapsedSeconds;
      
      if (remainingSeconds > 0) {
        setAutoTrackingEnabled(true);
        setAutoTrackingTimeRemaining(remainingSeconds);
      } else {
        // Auto-tracking period expired
        stopAutoTracking();
      }
    }
  }, []);

  // Auto-tracking interval effect (saves every 30 minutes)
  useEffect(() => {
    if (!autoTrackingEnabled || !token) return;
    
    const AUTO_TRACK_INTERVAL = 30 * 60 * 1000; // 30 minutes in milliseconds
    
    // Set interval to auto-save location
    const intervalId = setInterval(async () => {
      try {
        // Get fresh location with high accuracy
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,  // Use GPS for maximum precision
            timeout: 15000,             // 15 seconds to get accurate fix
            maximumAge: 0               // Always fresh location
          });
        });
        
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const accuracy = position.coords.accuracy;
        
        console.log(`🔄 Auto-tracking location: ${lat}, ${lng} (±${Math.round(accuracy)}m)`);
        
        // Save to history with 'auto' source
        await fetch(`${API_CONFIG.MATCHING_SERVICE}/api/matching/location/history`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            latitude: lat, 
            longitude: lng,
            source: 'auto' // Mark as auto-save
          })
        });
        
        console.log('Auto-tracking: Location saved at', new Date().toLocaleTimeString());
        
        // Update time remaining
        const startTime = parseInt(localStorage.getItem('autoTrackingStartTime') || '0');
        const elapsedMinutes = Math.floor((Date.now() - startTime) / (1000 * 60));
        const remainingMinutes = (24 * 60) - elapsedMinutes;
        
        setAutoTrackingTimeRemaining(remainingMinutes);
        
        // Stop if 24 hours elapsed
        if (remainingMinutes <= 0) {
          stopAutoTracking();
        }
      } catch (error) {
        console.error('Auto-tracking error:', error);
      }
    }, AUTO_TRACK_INTERVAL);
    
    // Countdown timer (updates every second for display)
    const countdownId = setInterval(() => {
      const startTime = parseInt(localStorage.getItem('autoTrackingStartTime') || '0');
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
      const remainingSeconds = (24 * 60 * 60) - elapsedSeconds;
      
      setAutoTrackingTimeRemaining(remainingSeconds);
      
      if (remainingSeconds <= 0) {
        stopAutoTracking();
      }
    }, 1000); // Update every second
    
    return () => {
      clearInterval(intervalId);
      clearInterval(countdownId);
    };
  }, [autoTrackingEnabled, token]);

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
          
          {/* Location update status */}
          {locationUpdateMessage && (
            <div style={{ 
              background: locationUpdateStatus === 'success' ? '#e8f5e9' : locationUpdateStatus === 'error' ? '#ffebee' : '#e3f2fd',
              color: locationUpdateStatus === 'success' ? '#2e7d32' : locationUpdateStatus === 'error' ? '#d32f2f' : '#1565c0',
              padding: '0.75rem', 
              borderRadius: '8px', 
              textAlign: 'center',
              fontSize: '0.9rem',
              marginBottom: '1rem',
              border: `1px solid ${locationUpdateStatus === 'success' ? '#c8e6c9' : locationUpdateStatus === 'error' ? '#ffcdd2' : '#bbdefb'}`
            }}>
              {locationUpdateMessage}
            </div>
          )}
          
          {/* Smart Location Button - Updates location AND starts auto-tracking */}
          {!locationLoading && (
            <button
              onClick={() => {
                if (autoTrackingEnabled) {
                  // Stop auto-tracking
                  stopAutoTracking();
                } else {
                  // Update location and start auto-tracking
                  getCurrentLocation();
                  startAutoTracking();
                }
              }}
              style={{
                background: autoTrackingEnabled ? '#d32f2f' : '#2196f3',
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
                transition: 'all 0.3s ease'
              }}
            >
              {autoTrackingEnabled ? (
                <>
                  📍 Active ({(() => {
                    const hours = Math.floor(autoTrackingTimeRemaining / 3600);
                    const minutes = Math.floor((autoTrackingTimeRemaining % 3600) / 60);
                    const seconds = autoTrackingTimeRemaining % 60;
                    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                  })()})
                </>
              ) : (
                <>
                  📍 Update My Location
                </>
              )}
            </button>
          )}
          
          {/* Real-time GPS Tracking Toggle */}
          {isGPSSupported && (
            <div style={{
              background: autoTrackingEnabled ? '#e8f5e9' : '#fff3e0',
              border: `2px solid ${autoTrackingEnabled ? '#4caf50' : '#ff9800'}`,
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.25rem' }}>
                    {gpsStatus.isTracking ? '🟢' : '⚪'}
                  </span>
                  <strong style={{ fontSize: '0.95rem' }}>
                    {gpsStatus.isTracking ? 'Live GPS Tracking' : 'GPS Tracking Off'}
                  </strong>
                </div>
                <button
                  onClick={() => setAutoTrackingEnabled(!autoTrackingEnabled)}
                  style={{
                    background: autoTrackingEnabled ? '#f44336' : '#4caf50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: '600'
                  }}
                >
                  {autoTrackingEnabled ? 'Stop' : 'Start'}
                </button>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#666' }}>
                {gpsStatus.isTracking ? (
                  <>
                    📡 Updating every 30s • {gpsStatus.updateCount} updates
                    {gpsStatus.accuracy && ` • ${gpsStatus.accuracy.toFixed(0)}m accuracy`}
                  </>
                ) : (
                  'Enable to share your live location with team members'
                )}
              </div>
              {gpsStatus.error && (
                <div style={{ fontSize: '0.8rem', color: '#f44336', marginTop: '0.5rem' }}>
                  ⚠️ {gpsStatus.error}
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
        </div>
      </div>
      
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
