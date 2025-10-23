import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Component to fix map rendering issues
const MapInvalidator: React.FC = () => {
  const map = useMap();
  
  useEffect(() => {
    // Multiple invalidations with increasing delays to ensure tiles load
    const timers = [
      setTimeout(() => map.invalidateSize(), 100),
      setTimeout(() => map.invalidateSize(), 300),
      setTimeout(() => map.invalidateSize(), 500),
      setTimeout(() => map.invalidateSize(), 1000)
    ];
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [map]);
  
  return null;
};

// Fix for default marker icons in Leaflet with webpack
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Validation helper function (outside component for performance)
const isValidCoordinate = (lat: number | undefined, lng: number | undefined): boolean => {
  return (
    lat !== undefined && 
    lng !== undefined && 
    !isNaN(lat) && 
    !isNaN(lng) &&
    isFinite(lat) &&
    isFinite(lng) &&
    lat >= -90 && 
    lat <= 90 && 
    lng >= -180 && 
    lng <= 180
  );
};

interface LocationMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  workerName: string;
  workerLocation: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  contractorLocation?: {
    latitude: number;
    longitude: number;
  } | null;
  distance?: string | null;
}

export const LocationMapModal: React.FC<LocationMapModalProps> = ({
  isOpen,
  onClose,
  workerName,
  workerLocation,
  contractorLocation,
  distance
}) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Check if worker location is valid BEFORE rendering anything
  if (!isValidCoordinate(workerLocation.latitude, workerLocation.longitude)) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: '1rem'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '2rem',
          maxWidth: '400px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '1rem' }}>⚠️</div>
          <h2 style={{ marginBottom: '1rem', color: '#d32f2f' }}>Location Not Available</h2>
          <p style={{ marginBottom: '1.5rem', color: '#666' }}>
            This worker hasn't updated their GPS location yet. Please ask them to update their location.
          </p>
          <button
            onClick={onClose}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  // Calculate map center and zoom based on whether we have both locations
  const getMapCenter = (): [number, number] => {
    const workerLat = Number(workerLocation.latitude);
    const workerLng = Number(workerLocation.longitude);
    
    if (contractorLocation && isValidCoordinate(contractorLocation.latitude, contractorLocation.longitude)) {
      const contractorLat = Number(contractorLocation.latitude);
      const contractorLng = Number(contractorLocation.longitude);
      // Center between contractor and worker
      const centerLat = (workerLat + contractorLat) / 2;
      const centerLng = (workerLng + contractorLng) / 2;
      return [centerLat, centerLng];
    }
    // Just worker location
    return [workerLat, workerLng];
  };

  const getZoomLevel = (): number => {
    if (!contractorLocation || !isValidCoordinate(contractorLocation.latitude, contractorLocation.longitude)) {
      return 15; // Higher zoom for single location (was 13)
    }
    
    // Calculate zoom based on distance
    const latDiff = Math.abs(workerLocation.latitude - contractorLocation.latitude);
    const lngDiff = Math.abs(workerLocation.longitude - contractorLocation.longitude);
    const maxDiff = Math.max(latDiff, lngDiff);
    
    // If locations are very close (less than 0.001 degrees = ~100m), zoom in more
    if (maxDiff < 0.001) return 17; // Very close - zoom in to see both
    if (maxDiff > 0.5) return 9;  // Very far
    if (maxDiff > 0.2) return 11; // Far
    if (maxDiff > 0.05) return 12; // Moderate
    return 13; // Close
  };

  // Custom icons with better visibility
  const workerIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [30, 49],
    iconAnchor: [15, 49],
    popupAnchor: [1, -34],
    shadowSize: [49, 49]
  });

  const contractorIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [30, 49],
    iconAnchor: [15, 49],
    popupAnchor: [1, -34],
    shadowSize: [49, 49]
  });

  const handleGetDirections = () => {
    // Open Google Maps with directions
    const url = `https://www.google.com/maps/dir/?api=1&origin=${contractorLocation?.latitude},${contractorLocation?.longitude}&destination=${workerLocation.latitude},${workerLocation.longitude}`;
    window.open(url, '_blank');
  };

  // Ensure coordinates are numbers and validate
  const workerLat = Number(workerLocation.latitude);
  const workerLng = Number(workerLocation.longitude);

  // Final validation after conversion
  if (!isValidCoordinate(workerLat, workerLng)) {
    console.error('Invalid worker coordinates after conversion:', { workerLat, workerLng, original: workerLocation });
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: '1rem'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '2rem',
          maxWidth: '400px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '1rem' }}>⚠️</div>
          <h2 style={{ marginBottom: '1rem', color: '#d32f2f' }}>Invalid Coordinates</h2>
          <p style={{ marginBottom: '1.5rem', color: '#666' }}>
            The location data is invalid. Please try again or contact support.
          </p>
          <button
            onClick={onClose}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      padding: 0
    }}>
      <div style={{
        background: 'white',
        borderRadius: '0',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '1rem',
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexShrink: 0
        }}>
          <div style={{ flex: 1, paddingRight: '1rem' }}>
            <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#1976d2', wordBreak: 'break-word' }}>
              📍 {workerName}'s Location
            </h2>
            {workerLocation.address && (
              <p style={{ margin: '0.5rem 0 0 0', color: '#666', fontSize: '0.9rem' }}>
                {workerLocation.address}
              </p>
            )}
            {distance && (
              <p style={{ margin: '0.25rem 0 0 0', color: '#4caf50', fontSize: '0.9rem', fontWeight: 'bold' }}>
                Distance: {distance}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '2rem',
              cursor: 'pointer',
              color: '#666',
              padding: '0',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = '#f0f0f0'}
            onMouseOut={(e) => e.currentTarget.style.background = 'none'}
          >
            ×
          </button>
        </div>

        {/* Map */}
        <div style={{ flex: 1, width: '100%', position: 'relative', minHeight: '300px' }}>
          <MapContainer
            key={`${workerLocation.latitude}-${workerLocation.longitude}`}
            center={getMapCenter()}
            zoom={getZoomLevel()}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
          >
            <MapInvalidator />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              maxZoom={19}
            />
            
            {/* Contractor Marker (render first, so it's underneath) */}
            {contractorLocation && isValidCoordinate(contractorLocation.latitude, contractorLocation.longitude) && (
              <Marker 
                position={[Number(contractorLocation.latitude), Number(contractorLocation.longitude)]}
                icon={contractorIcon}
                zIndexOffset={100}
              >
                <Popup>
                  <div style={{ textAlign: 'center', padding: '0.5rem' }}>
                    <strong style={{ color: '#4CAF50', fontSize: '1.1rem' }}>👤 You</strong>
                    <br />
                    <span style={{ fontSize: '0.85rem', color: '#666' }}>Your Location</span>
                  </div>
                </Popup>
              </Marker>
            )}
            
            {/* Worker Marker (render last, so it's on top) */}
            <Marker 
              position={[Number(workerLocation.latitude), Number(workerLocation.longitude)]}
              icon={workerIcon}
              zIndexOffset={200}
            >
              <Popup>
                <div style={{ textAlign: 'center', padding: '0.5rem' }}>
                  <strong style={{ color: '#2196F3', fontSize: '1.1rem' }}>👷 {workerName}</strong>
                  <br />
                  <span style={{ fontSize: '0.85rem', color: '#666' }}>Worker Location</span>
                  {workerLocation.address && (
                    <>
                      <br />
                      <span style={{ fontSize: '0.8rem', color: '#999' }}>{workerLocation.address}</span>
                    </>
                  )}
                </div>
              </Popup>
            </Marker>

            {/* Line between contractor and worker */}
            {contractorLocation && isValidCoordinate(contractorLocation.latitude, contractorLocation.longitude) && (
              <Polyline
                positions={[
                  [Number(contractorLocation.latitude), Number(contractorLocation.longitude)],
                  [Number(workerLocation.latitude), Number(workerLocation.longitude)]
                ]}
                color="#FF9800"
                weight={3}
                opacity={0.7}
                dashArray="10, 10"
              />
            )}
          </MapContainer>

          {/* Legend */}
          <div style={{
            position: 'absolute',
            bottom: '0.5rem',
            right: '0.5rem',
            background: 'white',
            padding: '0.5rem',
            borderRadius: '6px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            fontSize: '0.75rem',
            zIndex: 1000,
            maxWidth: 'calc(100% - 1rem)'
          }}>
            <div style={{ marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <div style={{ width: '10px', height: '10px', background: '#2B7FDB', borderRadius: '50%', flexShrink: 0 }}></div>
              <span style={{ fontSize: '0.7rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}><strong>{workerName}</strong></span>
            </div>
            {contractorLocation && isValidCoordinate(contractorLocation.latitude, contractorLocation.longitude) && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.3rem' }}>
                  <div style={{ width: '10px', height: '10px', background: '#2AAD27', borderRadius: '50%', flexShrink: 0 }}></div>
                  <span style={{ fontSize: '0.7rem' }}><strong>You</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <div style={{ width: '15px', height: '2px', background: '#FF9800', borderTop: '2px dashed #FF9800', flexShrink: 0 }}></div>
                  <span style={{ fontSize: '0.7rem' }}>Distance</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer with Actions */}
        <div style={{
          padding: '0.75rem 1rem',
          borderTop: '1px solid #e0e0e0',
          display: 'flex',
          gap: '0.5rem',
          justifyContent: 'flex-end',
          flexWrap: 'wrap',
          flexShrink: 0
        }}>
          {contractorLocation && isValidCoordinate(contractorLocation.latitude, contractorLocation.longitude) && (
            <button
              onClick={handleGetDirections}
              style={{
                padding: '0.6rem 1rem',
                background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 2px 8px rgba(76, 175, 80, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                flex: '1',
                justifyContent: 'center',
                minWidth: '120px'
              }}
            >
              🗺️ Directions
            </button>
          )}
          <button
            onClick={onClose}
            style={{
              padding: '0.6rem 1rem',
              background: '#f5f5f5',
              color: '#666',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '0.85rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.2s',
              flex: '1',
              minWidth: '80px'
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
