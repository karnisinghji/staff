import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { API_CONFIG } from '../../config/api';

interface LocationRecord {
  id: string;
  latitude: string;
  longitude: string;
  accuracy: number | null;
  location_name: string | null;
  source: 'manual' | 'auto';
  recorded_at: string;
  addressName?: string; // Fetched via reverse geocoding
}

interface LocationHistoryViewerProps {
  userId?: string; // If provided, shows team member's history
  userName?: string;
  userRole?: 'worker' | 'contractor';
}

export const LocationHistoryViewer: React.FC<LocationHistoryViewerProps> = ({ 
  userId, 
  userName = 'You',
  userRole 
}) => {
  const { token } = useAuth();
  const [locations, setLocations] = useState<LocationRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeRange, setTimeRange] = useState<number>(24); // hours
  const [isExpanded, setIsExpanded] = useState(false);

  const fetchLocationHistory = async () => {
    if (!token) return;

    setLoading(true);
    setError('');

    try {
      const endpoint = userId 
        ? `${API_CONFIG.MATCHING_SERVICE}/location/history/${userId}?hours=${timeRange}`
        : `${API_CONFIG.MATCHING_SERVICE}/location/history?hours=${timeRange}&limit=100`;

      const response = await fetch(endpoint, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch location history');
      }

      const data = await response.json();
      const locationsData = data.data?.locations || [];
      
      // Set locations first without addresses for immediate display
      setLocations(locationsData.map((loc: LocationRecord) => ({ ...loc, addressName: 'Loading...' })));
      
      // Fetch address names sequentially with delay to avoid rate limiting
      const locationsWithAddresses: LocationRecord[] = [];
      for (let i = 0; i < locationsData.length; i++) {
        const location = locationsData[i];
        
        // Add 1 second delay between requests (Nominatim rate limit = 1 req/sec)
        if (i > 0) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        const addressName = await reverseGeocode(
          parseFloat(location.latitude),
          parseFloat(location.longitude)
        );
        
        const locationWithAddress = { ...location, addressName };
        locationsWithAddresses.push(locationWithAddress);
        
        // Update UI progressively as addresses load
        setLocations([...locationsWithAddresses, ...locationsData.slice(i + 1).map((loc: LocationRecord) => ({ ...loc, addressName: 'Loading...' }))]);
      }
      
      setLocations(locationsWithAddresses);
    } catch (err) {
      console.error('Location history error:', err);
      setError(err instanceof Error ? err.message : 'Failed to load location history');
    } finally {
      setLoading(false);
    }
  };

  // Reverse geocode coordinates to readable address
  const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    try {
      // Use backend proxy to avoid CORS and rate limiting
      const response = await fetch(
        `${API_CONFIG.MATCHING_SERVICE}/reverse-geocode?lat=${lat}&lon=${lng}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;

      const data = await response.json();
      const address = data.address;

      // Build readable address string with MAXIMUM priority for street/road names
      const parts = [];
      
      // Priority 1: STREET/ROAD NAMES (most specific)
      if (address.road) {
        parts.push(address.road);
      } else if (address.street) {
        parts.push(address.street);
      } else if (address.pedestrian) {
        parts.push(address.pedestrian);
      } else if (address.path) {
        parts.push(address.path);
      } else if (address.highway) {
        parts.push(address.highway);
      }
      
      // Priority 2: Building/Shop/Amenity (if available)
      if (address.building) {
        parts.push(address.building);
      } else if (address.shop) {
        parts.push(address.shop);
      } else if (address.amenity) {
        parts.push(address.amenity);
      } else if (address.house_number && parts.length > 0) {
        // Add house number to road name if available
        parts[0] = `${parts[0]} ${address.house_number}`;
      }
      
      // Priority 3: Neighborhood/Suburb (local area context)
      if (address.neighbourhood) {
        parts.push(address.neighbourhood);
      } else if (address.suburb) {
        parts.push(address.suburb);
      } else if (address.quarter) {
        parts.push(address.quarter);
      } else if (address.village) {
        // Only include village if no suburb/neighbourhood found
        parts.push(address.village);
      }
      
      // Priority 4: City/Town (avoid rural/district)
      if (address.city) {
        parts.push(address.city);
      } else if (address.town) {
        parts.push(address.town);
      }

      // If we have good data, return top 2-3 most relevant parts
      if (parts.length > 0) {
        // Show street name FIRST, then neighborhood/town
        return parts.slice(0, 3).join(', ');
      }

      // Fallback: Parse display_name and skip administrative boundaries
      if (data.display_name) {
        const displayParts = data.display_name.split(',').map((p: string) => p.trim());
        // Skip parts containing "Rural", "District", or just state names
        const filtered = displayParts.filter((p: string) => 
          !p.includes('Rural') && 
          !p.includes('District') && 
          p !== 'Rajasthan' && 
          p !== 'India'
        );
        if (filtered.length > 0) {
          return filtered.slice(0, 2).join(', ');
        }
      }

      // Last resort: coordinates
      return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    } catch (error) {
      console.error('Reverse geocoding failed:', error);
      return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    }
  };

  useEffect(() => {
    if (isExpanded) {
      fetchLocationHistory();
    }
  }, [timeRange, isExpanded]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateTotalDistance = () => {
    if (locations.length < 2) return 0;

    let total = 0;
    for (let i = 1; i < locations.length; i++) {
      const prev = locations[i - 1];
      const curr = locations[i];
      
      const lat1 = parseFloat(prev.latitude);
      const lon1 = parseFloat(prev.longitude);
      const lat2 = parseFloat(curr.latitude);
      const lon2 = parseFloat(curr.longitude);

      // Haversine formula
      const R = 6371; // Earth's radius in km
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const distance = R * c;
      
      total += distance;
    }

    return total;
  };

  const manualCount = locations.filter(l => l.source === 'manual').length;
  const autoCount = locations.filter(l => l.source === 'auto').length;
  const totalDistance = calculateTotalDistance();

  if (!isExpanded) {
    return (
      <div style={{
        background: '#f5f5f5',
        borderRadius: '8px',
        padding: '0.75rem 1rem',
        marginBottom: '1rem',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }}
      onClick={() => setIsExpanded(true)}
      onMouseEnter={(e) => e.currentTarget.style.background = '#e0e0e0'}
      onMouseLeave={(e) => e.currentTarget.style.background = '#f5f5f5'}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: '600', fontSize: '14px' }}>
            📍 View Location History
          </span>
          <span style={{ fontSize: '20px' }}>▼</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: 'white',
      border: '2px solid #2196f3',
      borderRadius: '12px',
      padding: '1rem',
      marginBottom: '1.5rem',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '1rem',
        paddingBottom: '0.75rem',
        borderBottom: '2px solid #e0e0e0'
      }}>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#1976d2' }}>
          📍 Location History: {userName}
        </h3>
        <button
          onClick={() => setIsExpanded(false)}
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '0',
            color: '#666'
          }}
        >
          ✕
        </button>
      </div>

      {/* Time Range Filter */}
      <div style={{ 
        display: 'flex', 
        gap: '0.5rem', 
        marginBottom: '1rem',
        flexWrap: 'wrap'
      }}>
        {[1, 6, 12, 24, 168].map(hours => (
          <button
            key={hours}
            onClick={() => setTimeRange(hours)}
            style={{
              padding: '0.5rem 1rem',
              border: timeRange === hours ? '2px solid #2196f3' : '1px solid #ddd',
              borderRadius: '20px',
              background: timeRange === hours ? '#e3f2fd' : 'white',
              color: timeRange === hours ? '#1976d2' : '#666',
              fontWeight: timeRange === hours ? '600' : '400',
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {hours === 168 ? '7 Days' : `${hours}h`}
          </button>
        ))}
        <button
          onClick={fetchLocationHistory}
          style={{
            padding: '0.5rem 1rem',
            border: '1px solid #4caf50',
            borderRadius: '20px',
            background: '#4caf50',
            color: 'white',
            fontWeight: '600',
            fontSize: '13px',
            cursor: 'pointer',
            marginLeft: 'auto'
          }}
        >
          🔄 Refresh
        </button>
      </div>

      {/* Stats Summary */}
      {locations.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '0.75rem',
          marginBottom: '1rem',
          padding: '0.75rem',
          background: '#f5f5f5',
          borderRadius: '8px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#2196f3' }}>
              {locations.length}
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>Total Points</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#ff9800' }}>
              {manualCount}
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>Manual</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#4caf50' }}>
              {autoCount}
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>Auto</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#9c27b0' }}>
              {totalDistance.toFixed(1)}
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>km Traveled</div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
          <div style={{ fontSize: '32px', marginBottom: '0.5rem' }}>⏳</div>
          Loading location history...
        </div>
      )}

      {/* Error State */}
      {error && (
        <div style={{
          padding: '1rem',
          background: '#ffebee',
          color: '#c62828',
          borderRadius: '8px',
          marginBottom: '1rem'
        }}>
          ❌ {error}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && locations.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '2rem',
          color: '#999'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '0.5rem' }}>📍</div>
          <div style={{ fontSize: '16px', marginBottom: '0.5rem' }}>No location history found</div>
          <div style={{ fontSize: '13px' }}>
            {userName} hasn't updated their location in the last {timeRange === 168 ? '7 days' : `${timeRange} hours`}
          </div>
        </div>
      )}

      {/* Timeline List */}
      {!loading && locations.length > 0 && (
        <div style={{
          maxHeight: '400px',
          overflowY: 'auto',
          border: '1px solid #e0e0e0',
          borderRadius: '8px'
        }}>
          {locations.map((location, index) => (
            <div
              key={location.id}
              style={{
                padding: '0.75rem 1rem',
                borderBottom: index < locations.length - 1 ? '1px solid #f0f0f0' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                background: index % 2 === 0 ? '#fafafa' : 'white'
              }}
            >
              {/* Timeline dot */}
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: location.source === 'manual' ? '#ff9800' : '#4caf50',
                flexShrink: 0
              }} />

              {/* Content */}
              <div style={{ flex: 1 }}>
                <div style={{ 
                  fontSize: '13px', 
                  fontWeight: '600',
                  marginBottom: '0.25rem',
                  color: '#333'
                }}>
                  {formatDate(location.recorded_at)}
                </div>
                
                {/* Location name */}
                {location.addressName && (
                  <div style={{ 
                    fontSize: '13px', 
                    color: '#1976d2', 
                    fontWeight: '500',
                    marginBottom: '0.25rem'
                  }}>
                    📍 {location.addressName}
                  </div>
                )}
                
                {/* Coordinates (smaller, secondary) */}
                <div style={{ fontSize: '11px', color: '#999' }}>
                  {parseFloat(location.latitude).toFixed(6)}, {parseFloat(location.longitude).toFixed(6)}
                  {location.accuracy != null && typeof location.accuracy === 'number' && (
                    <span style={{ marginLeft: '0.5rem' }}>
                      (±{location.accuracy.toFixed(0)}m)
                    </span>
                  )}
                </div>
              </div>

              {/* Source badge */}
              <div style={{
                padding: '0.25rem 0.5rem',
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: '600',
                background: location.source === 'manual' ? '#fff3e0' : '#e8f5e9',
                color: location.source === 'manual' ? '#e65100' : '#2e7d32'
              }}>
                {location.source === 'manual' ? '👤 Manual' : '🤖 Auto'}
              </div>

              {/* View on map button */}
              <button
                onClick={() => {
                  const lat = parseFloat(location.latitude);
                  const lng = parseFloat(location.longitude);
                  window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
                }}
                style={{
                  padding: '0.4rem 0.75rem',
                  background: '#2196f3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                🗺️ Map
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
