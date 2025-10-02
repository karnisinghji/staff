import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface LocationSelectorProps {
  location: string;
  address: string;
  onLocationChange: (location: string) => void;
  onAddressChange: (address: string) => void;
  disabled?: boolean;
}

interface LocationData {
  coordinates: {
    latitude: number;
    longitude: number;
  };
  address: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    formattedAddress?: string;
  };
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  location,
  address,
  onLocationChange,
  onAddressChange,
  disabled = false
}) => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [showManualEntry, setShowManualEntry] = useState(true);

  // Reverse geocoding using a free geocoding service
  const reverseGeocode = async (lat: number, lng: number): Promise<LocationData['address']> => {
    try {
      // Using Nominatim (OpenStreetMap's geocoding service) - free and no API key required
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      
      if (!response.ok) {
        throw new Error('Geocoding service unavailable');
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      // Parse the address components
      const addressComponents = data.address || {};
      
      return {
        street: `${addressComponents.house_number || ''} ${addressComponents.road || ''}`.trim(),
        city: addressComponents.city || addressComponents.town || addressComponents.village || '',
        state: addressComponents.state || addressComponents.province || '',
        country: addressComponents.country || '',
        postalCode: addressComponents.postcode || '',
        formattedAddress: data.display_name || ''
      };
    } catch (error) {
      console.error('Reverse geocoding failed:', error);
      throw new Error('Unable to get address for this location');
    }
  };

  const detectCurrentLocation = async () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    setIsDetecting(true);
    
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000
          }
        );
      });

      const { latitude, longitude } = position.coords;
      
      // Get address from coordinates
      try {
        const addressData = await reverseGeocode(latitude, longitude);
        
        // Format location string
        const locationString = [
          addressData.city,
          addressData.state,
          addressData.country
        ].filter(Boolean).join(', ');
        
        // Format full address
        const fullAddress = [
          addressData.street,
          addressData.city,
          addressData.state,
          addressData.postalCode,
          addressData.country
        ].filter(Boolean).join(', ');
        
        // Update form fields
        onLocationChange(locationString || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        onAddressChange(fullAddress || addressData.formattedAddress || '');
        
        // Enhanced success message with location details
        const detectedLocation = locationString || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
        toast.success(`📍 Location detected: ${detectedLocation}`, {
          autoClose: 4000,
          position: 'top-right'
        });
        setShowManualEntry(false);
        
      } catch (geocodeError) {
        // If geocoding fails, still show coordinates
        const coordString = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
        onLocationChange(coordString);
        toast.warning('Location detected, but unable to get address details. You can edit manually.');
      }
      
    } catch (error: any) {
      let errorMessage = 'Unable to detect location';
      
      if (error.code === 1) {
        errorMessage = 'Location access denied. Please enable location permissions.';
      } else if (error.code === 2) {
        errorMessage = 'Location unavailable. Please check your GPS settings.';
      } else if (error.code === 3) {
        errorMessage = 'Location request timed out. Please try again.';
      }
      
      toast.error(errorMessage);
    } finally {
      setIsDetecting(false);
    }
  };

  return (
    <>
      <style>{`
        .location-selector {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .location-detection {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border: 2px dashed #cbd5e0;
          border-radius: 8px;
          transition: all 0.3s ease;
        }
        
        .location-detection:hover {
          border-color: #667eea;
          transform: translateY(-1px);
        }
        
        .detect-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 6px;
          padding: 0.75rem 1.5rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }
        
        .detect-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
        }
        
        .detect-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }
        
        .detect-btn.detecting {
          background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
        }
        
        .location-info {
          flex: 1;
          font-size: 0.9em;
          color: #4a5568;
        }
        
        .location-info-title {
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 0.25rem;
        }
        
        .location-divider {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 1rem 0;
          color: #718096;
          font-size: 0.9em;
        }
        
        .location-divider::before,
        .location-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #e2e8f0;
        }
        
        .manual-entry {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        
        .form-label {
          font-weight: 600;
          color: #2d3748;
          font-size: 0.9em;
        }
        
        .form-input {
          padding: 0.75rem;
          border: 2px solid #e2e8f0;
          border-radius: 6px;
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        
        .form-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        
        .spinner {
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .toggle-manual {
          align-self: flex-start;
          background: none;
          border: none;
          color: #667eea;
          text-decoration: underline;
          cursor: pointer;
          font-size: 0.9em;
          padding: 0.25rem 0;
        }
        
        .toggle-manual:hover {
          color: #5a67d8;
        }
      `}</style>
      
      <div className="location-selector">
        {/* Current Location Detection */}
        <div className="location-detection">
          <div className="location-info">
            <div className="location-info-title">📍 Use Current Location</div>
            <div>Automatically detect and fill your location details using GPS</div>
          </div>
          
          <button
            type="button"
            className={`detect-btn ${isDetecting ? 'detecting' : ''}`}
            onClick={detectCurrentLocation}
            disabled={disabled || isDetecting}
          >
            {isDetecting ? (
              <>
                <div className="spinner">🔄</div>
                Detecting...
              </>
            ) : (
              <>
                <span>📡</span>
                Use Current Location
              </>
            )}
          </button>
        </div>
        
        {/* Divider */}
        <div className="location-divider">
          OR enter manually
        </div>
        
        {/* Manual Entry */}
        {showManualEntry && (
          <div className="manual-entry">
            <div className="form-group">
              <label className="form-label">Location/City</label>
              <input
                type="text"
                className="form-input"
                value={location}
                onChange={(e) => onLocationChange(e.target.value)}
                placeholder="Enter your city, state, country"
                disabled={disabled}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Full Address</label>
              <textarea
                className="form-input"
                value={address}
                onChange={(e) => onAddressChange(e.target.value)}
                placeholder="Enter your complete address"
                disabled={disabled}
                rows={3}
                style={{ resize: 'vertical', minHeight: '80px' }}
              />
            </div>
          </div>
        )}
        
        {!showManualEntry && (
          <button
            type="button"
            className="toggle-manual"
            onClick={() => setShowManualEntry(true)}
          >
            ✏️ Edit address manually
          </button>
        )}
      </div>
    </>
  );
};