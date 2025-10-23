import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useAuth } from '../auth/AuthContext';
import { API_CONFIG } from '../../config/api';

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
        const response = await fetch(`${API_CONFIG.MATCHING_SERVICE}/api/matching/my-team`, {
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
        
        console.log('📊 Team members fetched:', members.length);
        console.log('📍 Members with location:', members.filter((m: TeamMember) => m.latitude && m.longitude).length);
        
        // Log each member's coordinates
        members.forEach((m: TeamMember) => {
          console.log(`  ${m.name}: lat=${m.latitude}, lng=${m.longitude}`);
        });
        
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
  }, [token]);

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
        <h2 style={{ margin: 0, fontSize: '1.3rem' }}>
          🗺️ Team Locations Map
        </h2>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', opacity: 0.9 }}>
          {teamMembers.length} team member{teamMembers.length !== 1 ? 's' : ''} with location data
        </p>
      </div>

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
