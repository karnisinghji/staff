import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useAuth } from '../auth/AuthContext';
import { API_CONFIG } from '../../config/api';
import { Geolocation } from '@capacitor/geolocation';

// Component to invalidate map size
const MapInvalidator: React.FC = () => {
  const map = useMap();
  
  useEffect(() => {
    const timers = [
      setTimeout(() => map.invalidateSize(), 100),
      setTimeout(() => map.invalidateSize(), 300),
      setTimeout(() => map.invalidateSize(), 500),
    ];
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [map]);
  
  return null;
};

interface TeamMember {
  team_member_id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'worker' | 'contractor';
  location?: string;
  latitude?: number | string | null; // Can be number, string, or null from API
  longitude?: number | string | null; // Can be number, string, or null from API
  isAvailable?: boolean;
  is_available?: boolean; // API returns snake_case
  profile_info?: string;
  distance_km?: number | null;
}

export const TeamMapView: React.FC = () => {
  const { token } = useAuth();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [allMembers, setAllMembers] = useState<TeamMember[]>([]); // All members (for debugging)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mapCenter, setMapCenter] = useState<[number, number]>([27.245289, 75.657525]); // Default to Govindgarh
  const [mapZoom, setMapZoom] = useState(12);
  const [currentUserLocation, setCurrentUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [gpsAccuracy, setGpsAccuracy] = useState<number | null>(null);
  const [hasLiveGPS, setHasLiveGPS] = useState(false); // Track if we have live GPS
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  // Get live GPS location on mount
  useEffect(() => {
    const getLiveLocation = async () => {
      try {
        console.log('🗺️ TeamMapView: Starting live GPS detection...');
        
        // Check permissions first
        const permissionStatus = await Geolocation.checkPermissions();
        console.log('📋 Permission status:', permissionStatus.location);
        
        if (permissionStatus.location === 'denied') {
          console.warn('❌ Location permission denied');
          return;
        }

        // Try to get GPS location with retry for accuracy
        let position;
        let accuracy = 999999;
        let attempts = 0;
        const maxAttempts = 3; // Fewer attempts for map view
        
        while (accuracy > 50 && attempts < maxAttempts) {
          attempts++;
          console.log(`📍 TeamMapView GPS attempt ${attempts}/${maxAttempts}...`);
          
          position = await Geolocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          });
          
          accuracy = position.coords.accuracy || 999999;
          console.log(`📍 TeamMapView GPS accuracy: ±${Math.round(accuracy)}m`);
          
          if (accuracy <= 50) {
            console.log(`✅ TeamMapView: Accurate GPS locked!`);
            break;
          }
          
          if (attempts < maxAttempts) {
            await new Promise(r => setTimeout(r, 1000)); // Wait 1s between attempts
          }
        }
        
        if (position) {
          const liveLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          console.log(`✅ TeamMapView: Setting live GPS location:`, liveLocation, `±${Math.round(accuracy)}m`);
          
          // Save location to database immediately
          try {
            const saveResponse = await fetch(`${API_CONFIG.MATCHING_SERVICE}/update-location-live`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                latitude: liveLocation.lat,
                longitude: liveLocation.lng,
                accuracy,
                source: 'map-gps'
              })
            });
            
            if (saveResponse.ok) {
              console.log(`✅ TeamMapView: Location saved to database`);
            } else {
              console.warn(`⚠️ TeamMapView: Failed to save location:`, saveResponse.status);
            }
          } catch (err) {
            console.warn(`⚠️ TeamMapView: Error saving location:`, err);
          }
          
          setCurrentUserLocation(liveLocation);
          setGpsAccuracy(accuracy);
          setHasLiveGPS(true); // Mark that we have live GPS
          setMapCenter([liveLocation.lat, liveLocation.lng]);
          setMapZoom(14);
          
          console.log(`✅ TeamMapView: State updated with live GPS`);
        } else {
          console.warn('❌ TeamMapView: No GPS position obtained');
        }
      } catch (err) {
        console.warn('❌ TeamMapView: Could not get live GPS location:', err);
        // Continue with profile location as fallback
      }
    };

    getLiveLocation();
  }, []);

  // Fetch team members with location data
  useEffect(() => {
    const fetchTeamMembers = async () => {
      if (!token) {
        setError('Please log in to view team locations');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`${API_CONFIG.MATCHING_SERVICE}/my-team`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('Failed to fetch team members:', response.status, errorData);
          throw new Error(errorData.message || `Failed to fetch team members (${response.status})`);
        }

        const data = await response.json();
        const members = data.teamMembers || data.data?.teamMembers || [];
        
        setLastRefresh(new Date()); // Update refresh timestamp
        
        // Only fetch user profile if we haven't loaded location yet
        if (!hasLiveGPS && !currentUserLocation) {
          try {
            const userResponse = await fetch(`${API_CONFIG.USER_SERVICE}/profile`, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });
            
            if (userResponse.ok) {
              const userData = await userResponse.json();
              const user = userData.data?.user || userData.data || userData;
              
              if (user.latitude && user.longitude) {
                const dbLocation = {
                  lat: Number(user.latitude),
                  lng: Number(user.longitude)
                };
                setCurrentUserLocation(dbLocation);
                setMapCenter([dbLocation.lat, dbLocation.lng]);
                console.log('✅ Using saved location from database');
              }
            }
          } catch (err) {
            // Silent failure - not critical
          }
        }
        
        // Store all members for display
        setAllMembers(members);
        
        // Filter members with valid coordinates
        const membersWithLocation = members.filter((m: TeamMember) => {
          // Convert to string first to handle both string and number types
          const latStr = String(m.latitude || '');
          const lngStr = String(m.longitude || '');
          
          // Check if not empty and not 'null' string
          const hasLat = latStr && latStr !== 'null' && latStr !== 'undefined';
          const hasLng = lngStr && lngStr !== 'null' && lngStr !== 'undefined';
          
          // Convert to number and validate
          const latNum = parseFloat(latStr);
          const lngNum = parseFloat(lngStr);
          const validLat = !isNaN(latNum) && latNum !== 0;
          const validLng = !isNaN(lngNum) && lngNum !== 0;
          
          const isValid = hasLat && hasLng && validLat && validLng;
          if (!isValid) {
            console.log(`  ❌ ${m.name} filtered out: lat=${latStr}, lng=${lngStr}`);
          }
          
          return isValid;
        });

        console.log('✅ Members WITH valid location:', membersWithLocation.length);
        membersWithLocation.forEach((m: TeamMember) => {
          console.log(`  ✅ ${m.name}: [${m.latitude}, ${m.longitude}]`);
        });
        
        setTeamMembers(membersWithLocation);

        // Calculate center point of all members
        if (membersWithLocation.length > 0) {
          const avgLat = membersWithLocation.reduce((sum: number, m: TeamMember) => sum + Number(m.latitude), 0) / membersWithLocation.length;
          const avgLng = membersWithLocation.reduce((sum: number, m: TeamMember) => sum + Number(m.longitude), 0) / membersWithLocation.length;
          
          setMapCenter([avgLat, avgLng]);

          // Adjust zoom based on spread
          if (membersWithLocation.length === 1) {
            // Single member - zoom in to street level
            setMapZoom(15);
          } else if (membersWithLocation.length > 1) {
            const lats = membersWithLocation.map((m: TeamMember) => Number(m.latitude));
            const lngs = membersWithLocation.map((m: TeamMember) => Number(m.longitude));
            const latDiff = Math.max(...lats) - Math.min(...lats);
            const lngDiff = Math.max(...lngs) - Math.min(...lngs);
            const maxDiff = Math.max(latDiff, lngDiff);

            if (maxDiff > 0.5) setMapZoom(9);
            else if (maxDiff > 0.2) setMapZoom(11);
            else if (maxDiff > 0.05) setMapZoom(13);
            else setMapZoom(15);
          }
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching team members:', err);
        setError('Failed to load team locations');
        setLoading(false);
      }
    };

    fetchTeamMembers();
    
    // Auto-refresh team member locations every 15 seconds (better UX, less overwhelming)
    const refreshInterval = setInterval(() => {
      console.log('🔄 Auto-refreshing team member locations...');
      fetchTeamMembers();
    }, 30000); // 15 seconds - not too fast, not too slow

    return () => clearInterval(refreshInterval);
  }, [token, hasLiveGPS]);

  // Color palette for unique markers per team member
  const markerColors = [
    { color: 'blue', name: 'Blue', hex: '#2196F3' },
    { color: 'green', name: 'Green', hex: '#4CAF50' },
    { color: 'orange', name: 'Orange', hex: '#FF9800' },
    { color: 'red', name: 'Red', hex: '#F44336' },
    { color: 'violet', name: 'Purple', hex: '#9C27B0' },
    { color: 'yellow', name: 'Yellow', hex: '#FFEB3B' },
    { color: 'grey', name: 'Gray', hex: '#9E9E9E' },
    { color: 'black', name: 'Black', hex: '#000000' },
  ];

  // Create icon for each color
  const createMarkerIcon = (color: string) => new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  // Create a special icon for current user (home icon)
  const createHomeIcon = () => new L.DivIcon({
    className: 'custom-home-icon',
    html: `
      <div style="
        background: #1976d2;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        font-size: 20px;
      ">
        🏠
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18]
  });

  // Calculate distance between two points (Haversine formula)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const formatDistance = (km: number): string => {
    if (km < 1) return `${Math.round(km * 1000)} m`;
    return `${km.toFixed(1)} km`;
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleMessage = (phone: string) => {
    window.location.href = `sms:${phone}`;
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🗺️</div>
        <p>Loading team locations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#d32f2f' }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚠️</div>
        <p>{error}</p>
        {error.includes('log in') && (
          <button
            onClick={() => window.location.href = '/login'}
            style={{
              marginTop: '1rem',
              padding: '0.75rem 1.5rem',
              background: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Go to Login
          </button>
        )}
      </div>
    );
  }

  if (teamMembers.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📍</div>
        <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>No team members with location data found.</p>
        
        {allMembers.length > 0 ? (
          <div style={{ 
            background: '#fff3cd', 
            padding: '1rem', 
            borderRadius: '8px', 
            marginBottom: '1rem',
            border: '1px solid #ffc107'
          }}>
            <p style={{ fontSize: '0.95rem', color: '#856404', margin: 0 }}>
              ⚠️ You have <strong>{allMembers.length} team member{allMembers.length !== 1 ? 's' : ''}</strong>, 
              but none have shared their location yet.
            </p>
          </div>
        ) : (
          <p style={{ fontSize: '0.95rem', color: '#666', marginBottom: '0.5rem' }}>
            You don't have any team members yet. Add members to your team first!
          </p>
        )}
        
        <div style={{ 
          background: '#e3f2fd', 
          padding: '1rem', 
          borderRadius: '8px', 
          marginTop: '1.5rem',
          border: '1px solid #90caf9'
        }}>
          <p style={{ fontSize: '0.9rem', color: '#1976d2', margin: 0 }}>
            💡 <strong>How to add locations:</strong>
          </p>
          <ol style={{ 
            fontSize: '0.85rem', 
            color: '#555', 
            textAlign: 'left', 
            marginTop: '0.75rem',
            paddingLeft: '1.5rem'
          }}>
            <li>Go to "My Team" page</li>
            <li>Click "📍 Update My Location" button</li>
            <li>Allow browser location access</li>
            <li>Your location will be saved and visible on the map</li>
          </ol>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Custom CSS for marker tooltips */}
      <style>{`
        .marker-tooltip {
          background: rgba(255, 255, 255, 0.95) !important;
          border: 2px solid #1976d2 !important;
          border-radius: 8px !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3) !important;
          padding: 4px 8px !important;
        }
        .marker-tooltip::before {
          border-top-color: #1976d2 !important;
        }
        .leaflet-tooltip-top::before {
          border-top-color: #1976d2 !important;
        }
      `}</style>
      
      <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ 
          padding: '1rem', 
          background: '#1976d2', 
          color: 'white',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.3rem' }}>
              🗺️ Team Locations Map
            </h2>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', opacity: 0.9 }}>
              {teamMembers.length} team member{teamMembers.length !== 1 ? 's' : ''} with location data
              {!currentUserLocation && ' • ⚠️ Your location not found'}
              <br />
              🔄 Auto-refresh: 30s • Last: {lastRefresh.toLocaleTimeString()}
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.5)',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 'bold'
            }}
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Debug Banner for Missing User Location */}
      {!currentUserLocation && (
        <div style={{
          background: '#fff3cd',
          padding: '0.75rem 1rem',
          borderBottom: '2px solid #ffc107',
          color: '#856404',
          fontSize: '0.85rem',
          textAlign: 'center'
        }}>
          ⚠️ Your location is not saved. Distance lines won't show. Enable GPS tracking on "My Team" page to save your location.
        </div>
      )}

      {/* Map */}
      <div style={{ flex: 1, position: 'relative', minHeight: '400px' }}>
        <MapContainer
          key={`team-map-${mapCenter[0]}-${mapCenter[1]}-${teamMembers.length}`}
          center={mapCenter}
          zoom={mapZoom}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
          zoomControl={true}
        >
          <MapInvalidator />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={19}
          />

          {/* Current User Location Marker */}
          {currentUserLocation && (
            <Marker
              position={[currentUserLocation.lat, currentUserLocation.lng]}
              icon={createHomeIcon()}
            >
              <Tooltip 
                direction="top" 
                offset={[0, -20]} 
                permanent
                className="marker-tooltip"
              >
                <div style={{ 
                  fontWeight: 'bold', 
                  color: hasLiveGPS ? '#4caf50' : '#1976d2',
                  fontSize: '13px',
                  whiteSpace: 'nowrap',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                }}>
                  {hasLiveGPS ? '�' : '💾'} You {gpsAccuracy && hasLiveGPS && `(±${Math.round(gpsAccuracy)}m)`}
                </div>
              </Tooltip>
              
              <Popup>
                <div style={{ padding: '0.5rem' }}>
                  <strong style={{ fontSize: '1.1rem', color: '#1976d2' }}>
                    {hasLiveGPS ? '📡 Live GPS Location' : '💾 Saved Location'}
                  </strong>
                  <br />
                  <span style={{ fontSize: '0.85rem', color: '#666' }}>
                    📍 {currentUserLocation.lat.toFixed(6)}, {currentUserLocation.lng.toFixed(6)}
                    <br />
                    {gpsAccuracy && hasLiveGPS && (
                      <>
                        📡 Accuracy: ±{Math.round(gpsAccuracy)}m
                        {gpsAccuracy <= 50 ? ' ✅' : gpsAccuracy <= 250 ? ' ⚠️' : ' ❌'}
                        <br />
                      </>
                    )}
                    {hasLiveGPS ? '🟢 Real-time' : '🔵 From database'}
                  </span>
                </div>
              </Popup>
            </Marker>
          )}

          {/* Dotted Lines from Current User to Each Team Member */}
          {currentUserLocation && teamMembers.map((member, index) => {
            const lat = Number(member.latitude);
            const lng = Number(member.longitude);
            
            // Calculate distance
            const distance = calculateDistance(
              currentUserLocation.lat,
              currentUserLocation.lng,
              lat,
              lng
            );
            
            // Color for the line (match team member color)
            const colorIndex = index % markerColors.length;
            const memberColor = markerColors[colorIndex];
            
            // Calculate midpoint for distance label
            const midLat = (currentUserLocation.lat + lat) / 2;
            const midLng = (currentUserLocation.lng + lng) / 2;
            
            return (
              <React.Fragment key={`line-${member.team_member_id}`}>
                <Polyline
                  positions={[
                    [currentUserLocation.lat, currentUserLocation.lng],
                    [lat, lng]
                  ]}
                  pathOptions={{
                    color: memberColor.hex,
                    weight: 2,
                    opacity: 0.6,
                    dashArray: '10, 10'
                  }}
                />
                
                {/* Distance Label at midpoint */}
                <Marker
                  position={[midLat, midLng]}
                  icon={new L.DivIcon({
                    className: 'distance-label',
                    html: `
                      <div style="
                        background: white;
                        padding: 4px 8px;
                        border-radius: 12px;
                        border: 2px solid ${memberColor.hex};
                        font-size: 11px;
                        font-weight: bold;
                        color: ${memberColor.hex};
                        white-space: nowrap;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                      ">
                        ${formatDistance(distance)}
                      </div>
                    `,
                    iconSize: [50, 20],
                    iconAnchor: [25, 10]
                  })}
                />
              </React.Fragment>
            );
          })}

          {/* Team Member Markers */}
          {teamMembers.map((member, index) => {
            // Assign unique color to each member based on index
            const colorIndex = index % markerColors.length;
            const memberColor = markerColors[colorIndex];
            const memberIcon = createMarkerIcon(memberColor.color);
            
            // Check both camelCase and snake_case for availability
            const isAvailable = member.isAvailable ?? member.is_available ?? false;
            
            // Add small offset if members are at the same location to prevent complete overlap
            let lat = Number(member.latitude);
            let lng = Number(member.longitude);
            
            // Check if any previous member has the same coordinates
            const sameLocationMembers = teamMembers.slice(0, index).filter(m => 
              Math.abs(Number(m.latitude) - lat) < 0.0001 && 
              Math.abs(Number(m.longitude) - lng) < 0.0001
            );
            
            // If duplicate location, add a small offset in a circular pattern
            if (sameLocationMembers.length > 0) {
              const offsetIndex = sameLocationMembers.length;
              const angle = (offsetIndex * 360 / 8) * (Math.PI / 180); // Distribute in circle
              const offsetDistance = 0.0002; // About 20 meters
              lat += Math.cos(angle) * offsetDistance;
              lng += Math.sin(angle) * offsetDistance;
              console.log(`📍 Offset ${member.name} by ${offsetDistance} (angle: ${angle})`);
            }
            
            return (
              <Marker
                key={member.team_member_id}
                position={[lat, lng]}
                icon={memberIcon}
              >
                {/* Permanent label showing name */}
                <Tooltip 
                  direction="top" 
                  offset={[0, -35]} 
                  permanent
                  className="marker-tooltip"
                >
                  <div style={{ 
                    fontWeight: 'bold', 
                    color: memberColor.hex,
                    fontSize: '13px',
                    whiteSpace: 'nowrap',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                  }}>
                    {member.name}
                  </div>
                </Tooltip>
                
                <Popup>
                  <div style={{ minWidth: '200px', padding: '0.5rem' }}>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong style={{ fontSize: '1.1rem', color: memberColor.hex }}>
                        {member.name}
                      </strong>
                      <br />
                      <span style={{ fontSize: '0.85rem', color: '#666' }}>
                        {member.role} • <span style={{ color: isAvailable ? '#4caf50' : '#f44336' }}>
                          {isAvailable ? '🟢 Available' : '🔴 Busy'}
                        </span>
                      </span>
                    </div>

                  {member.profile_info && (
                    <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.5rem' }}>
                      {member.profile_info}
                    </div>
                  )}

                  {member.location && (
                    <div style={{ fontSize: '0.8rem', color: '#999', marginBottom: '0.5rem' }}>
                      📍 {member.location}
                    </div>
                  )}

                  {member.distance_km != null && (
                    <div style={{ fontSize: '0.8rem', color: '#2196f3', marginBottom: '0.75rem' }}>
                      📏 {member.distance_km.toFixed(1)} km away
                    </div>
                  )}

                  {/* Contact Buttons */}
                  {member.phone && (
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                      <button
                        onClick={() => handleCall(member.phone!)}
                        style={{
                          flex: 1,
                          padding: '0.5rem',
                          background: '#4caf50',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          fontWeight: 'bold'
                        }}
                      >
                        📞 Call
                      </button>
                      <button
                        onClick={() => handleMessage(member.phone!)}
                        style={{
                          flex: 1,
                          padding: '0.5rem',
                          background: '#2196f3',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          fontWeight: 'bold'
                        }}
                      >
                        💬 SMS
                      </button>
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
            );
          })}
        </MapContainer>

        {/* Legend - Show unique colors for each member */}
        <div style={{
          position: 'absolute',
          bottom: '1rem',
          right: '1rem',
          background: 'white',
          padding: '0.75rem',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          fontSize: '0.85rem',
          zIndex: 1000,
          maxHeight: '250px',
          overflowY: 'auto'
        }}>
          <div style={{ marginBottom: '0.5rem', fontWeight: 'bold', color: '#1976d2' }}>
            Team Members
          </div>
          {teamMembers.map((member, index) => {
            const colorIndex = index % markerColors.length;
            const memberColor = markerColors[colorIndex];
            const isAvailable = member.isAvailable ?? member.is_available ?? false;
            
            return (
              <div key={member.team_member_id} style={{ 
                marginBottom: '0.4rem', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                paddingBottom: '0.4rem',
                borderBottom: index < teamMembers.length - 1 ? '1px solid #eee' : 'none'
              }}>
                <div style={{ 
                  width: '14px', 
                  height: '14px', 
                  background: memberColor.hex, 
                  borderRadius: '50%',
                  border: '2px solid white',
                  boxShadow: '0 0 3px rgba(0,0,0,0.3)',
                  flexShrink: 0
                }}></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ 
                    fontSize: '0.85rem', 
                    fontWeight: '500',
                    color: '#333',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {member.name}
                  </div>
                  <div style={{ 
                    fontSize: '0.75rem', 
                    color: isAvailable ? '#4caf50' : '#f44336',
                    marginTop: '2px'
                  }}>
                    {isAvailable ? '🟢 Available' : '🔴 Busy'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </>
  );
};
