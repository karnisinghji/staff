import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { theme } from '../../styles/theme';
import { SkeletonCard, LoadingButton } from '../../components/LoadingComponents';
import { API_CONFIG } from '../../config/api';
import { formatLocation } from '../../utils/location';
import { Geolocation } from '@capacitor/geolocation';

interface SearchResultCardProps {
  match: any;
  onContact: () => void;
  onTeamRequest: () => void;
  isLoading?: boolean;
  userRole?: string; // 'contractor' or 'worker'
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({ match, onContact, onTeamRequest, isLoading = false, userRole }) => (
  <div className="responsive-card" style={{
    transition: 'all 0.2s ease-in-out',
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.boxShadow = theme.shadows.md;
    e.currentTarget.style.transform = 'translateY(-2px)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.boxShadow = theme.shadows.sm;
    e.currentTarget.style.transform = 'translateY(0)';
  }}>
    {/* Header */}
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing.md,
      marginBottom: theme.spacing.md,
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        backgroundColor: theme.colors.primary[100],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: theme.typography.fontSize.xl,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.primary[600],
      }}>
        {(match.name || match.full_name || match.user_name || match.id)?.charAt(0)?.toUpperCase() || '?'}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: theme.typography.fontSize.lg,
          fontWeight: theme.typography.fontWeight.semibold,
          color: theme.colors.neutral[900],
          marginBottom: theme.spacing.xs,
        }}>
          {match.name || match.full_name || match.user_name || `Worker ${match.id?.slice(-6) || 'Unknown'}`}
        </div>
        <div style={{
          fontSize: theme.typography.fontSize.sm,
          color: theme.colors.neutral[600],
        }}>
          {match.company || (userRole === 'contractor' ? 'Individual Worker' : 'Individual Contractor')}
        </div>
      </div>
            {match.score && (
        <div style={{
          position: 'absolute',
          top: theme.spacing.sm,
          right: theme.spacing.sm,
          backgroundColor: theme.colors.success[100],
          color: theme.colors.success[700],
          padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
          borderRadius: theme.borderRadius.full,
          fontSize: theme.typography.fontSize.xs,
          fontWeight: theme.typography.fontWeight.medium,
        }}>
          {Math.round(match.score)}% match
        </div>
      )}
    </div>

    {/* Skills */}
    {match.skills && Array.isArray(match.skills) && match.skills.length > 0 && (
      <div style={{ marginBottom: theme.spacing.md }}>
        <div style={{
          fontSize: theme.typography.fontSize.sm,
          fontWeight: theme.typography.fontWeight.medium,
          color: theme.colors.neutral[700],
          marginBottom: theme.spacing.xs,
        }}>
          Skills
        </div>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: theme.spacing.xs,
        }}>
          {match.skills.slice(0, 4).map((skill: string, index: number) => (
            <span
              key={index}
              style={{
                padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
                backgroundColor: theme.colors.primary[50],
                color: theme.colors.primary[700],
                borderRadius: theme.borderRadius.sm,
                fontSize: theme.typography.fontSize.xs,
                fontWeight: theme.typography.fontWeight.medium,
              }}
            >
              {skill.trim()}
            </span>
          ))}
          {match.skills.length > 4 && (
            <span style={{
              padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
              backgroundColor: theme.colors.neutral[100],
              color: theme.colors.neutral[600],
              borderRadius: theme.borderRadius.sm,
              fontSize: theme.typography.fontSize.xs,
            }}>
              +{match.skills.length - 4} more
            </span>
          )}
        </div>
      </div>
    )}

    {/* Location & Distance */}
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing.md,
      marginBottom: theme.spacing.md,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.neutral[600],
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.xs }}>
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
        {formatLocation(match.location)}
      </div>
            {match.distanceKm && (
        <span style={{
          color: theme.colors.neutral[500],
          fontSize: theme.typography.fontSize.sm,
        }}>
          {Math.round(match.distanceKm)} km away
        </span>
      )}
    </div>

    {/* Bio/Description */}
    {match.bio && (
      <div style={{
        marginBottom: theme.spacing.md,
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.neutral[700],
        lineHeight: '1.5',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        {match.bio}
      </div>
    )}

    {/* Rating & Reviews */}
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing.md,
      marginBottom: theme.spacing.lg,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.neutral[600],
    }}>
      {match.rating != null && !isNaN(Number(match.rating)) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.xs }}>
          <div style={{ display: 'flex', gap: '1px' }}>
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                width="16"
                height="16"
                fill={i < Math.floor(Number(match.rating)) ? theme.colors.warning[400] : theme.colors.neutral[300]}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span>{Number(match.rating).toFixed(1)}</span>
          {match.review_count && <span>({match.review_count} reviews)</span>}
        </div>
      )}
    </div>

    {/* Action Buttons - Role Specific */}
    <div style={{
      display: 'flex',
      gap: theme.spacing.sm,
      justifyContent: 'flex-end',
    }}>
      <LoadingButton
        isLoading={isLoading}
        variant="outline"
        size="sm"
        onClick={onContact}
      >
        📞 Contact
      </LoadingButton>
      <LoadingButton
        isLoading={isLoading}
        variant="primary"
        size="sm"
        onClick={onTeamRequest}
      >
        {userRole === 'worker' ? '✅ Request to Join' : '📤 Send Team Request'}
      </LoadingButton>
    </div>
  </div>
);

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  const visiblePages = getVisiblePages();

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing.xs,
      marginTop: theme.spacing.xl,
    }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          padding: `${theme.spacing.sm} ${theme.spacing.sm}`,
          border: `1px solid ${theme.colors.neutral[300]}`,
          borderRadius: theme.borderRadius.sm,
          backgroundColor: 'white',
          color: currentPage === 1 ? theme.colors.neutral[400] : theme.colors.neutral[700],
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </button>

      {visiblePages.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' ? onPageChange(page) : undefined}
          disabled={typeof page !== 'number'}
          style={{
            padding: `${theme.spacing.sm} ${theme.spacing.md}`,
            border: `1px solid ${currentPage === page ? theme.colors.primary[500] : theme.colors.neutral[300]}`,
            borderRadius: theme.borderRadius.sm,
            backgroundColor: currentPage === page ? theme.colors.primary[500] : 'white',
            color: currentPage === page ? 'white' : theme.colors.neutral[700],
            cursor: typeof page === 'number' ? 'pointer' : 'default',
            fontSize: theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.medium,
            minWidth: '40px',
          }}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          padding: `${theme.spacing.sm} ${theme.spacing.sm}`,
          border: `1px solid ${theme.colors.neutral[300]}`,
          borderRadius: theme.borderRadius.sm,
          backgroundColor: 'white',
          color: currentPage === totalPages ? theme.colors.neutral[400] : theme.colors.neutral[700],
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export const EnhancedMatchSearchPage: React.FC = () => {
  const { token, user } = useAuth();
  const { success, error: showError, info, warning } = useToast();
  
  // Search state
  const [skillType, setSkillType] = useState('');
  const [location, setLocation] = useState('');
  const [locationCoords, setLocationCoords] = useState<{ lat: number; lng: number } | null>(null); // Store GPS coordinates
  const [maxDistance, setMaxDistance] = useState<number>(50);
  
  // Results state
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  
  // UI state
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [locationAccuracy, setLocationAccuracy] = useState<number | null>(null);

  // Skills fetched from backend database
  const [skillOptions, setSkillOptions] = useState<string[]>([]);
  const [skillsLoading, setSkillsLoading] = useState(true);

  const sortOptions = [
    { value: 'relevance', label: 'Best Match' },
    { value: 'distance', label: 'Nearest First' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'recent', label: 'Recently Active' }
  ];

  // Fetch skills from backend on component mount
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setSkillsLoading(true);
  const response = await fetch(`${API_CONFIG.USER_SERVICE}/skills`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success && Array.isArray(result.data)) {
            setSkillOptions(result.data);
          } else {
            console.error('Invalid skills data format:', result);
            // Fallback to empty array
            setSkillOptions([]);
          }
        } else {
          console.error('Failed to fetch skills:', response.status);
          setSkillOptions([]);
        }
      } catch (error) {
        console.error('Error fetching skills:', error);
        setSkillOptions([]);
      } finally {
        setSkillsLoading(false);
      }
    };

    if (token) {
      fetchSkills();
    }
  }, [token]);

  // Auto-detect user's location on component mount if location is empty
  useEffect(() => {
    const detectUserLocation = async () => {
      // Only auto-detect if location is empty and user hasn't searched yet
      if (location || searched) {
        return;
      }

      setDetectingLocation(true);
      
      try {
        // Check and request location permissions
        const permissionStatus = await Geolocation.checkPermissions();
        
        if (permissionStatus.location === 'denied') {
          const requestResult = await Geolocation.requestPermissions();
          if (requestResult.location === 'denied') {
            console.log('Location permission denied');
            setDetectingLocation(false);
            return;
          }
        }

        // Get location (GPS or WiFi - whatever is available)
        console.log(`� Detecting location...`);
        
        let position;
        let accuracy = 999999;
        let attempts = 0;
        const maxAttempts = 5;
        
        while (accuracy > 50 && attempts < maxAttempts) {
          attempts++;
          console.log(`GPS attempt ${attempts}/${maxAttempts}...`);
          
          position = await Geolocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0
          });
          
          accuracy = position.coords.accuracy || 999999;
          console.log(`Accuracy: ±${Math.round(accuracy)}m`);
          
          if (accuracy <= 50) break;
          if (attempts < maxAttempts) await new Promise(r => setTimeout(r, 2000));
        }
        
        const latitude = position!.coords.latitude;
        const longitude = position!.coords.longitude;
        
        console.log(`📍 Location detected: ${latitude.toFixed(6)}, ${longitude.toFixed(6)} (±${Math.round(accuracy)}m)`);
        
        // Store coordinates and accuracy
        setLocationCoords({ lat: latitude, lng: longitude });
        setLocationAccuracy(accuracy || null);
        
        // Use reverse geocoding via backend proxy to avoid CORS issues
        try {
          const response = await fetch(
            `${API_CONFIG.MATCHING_SERVICE}/reverse-geocode?lat=${latitude}&lon=${longitude}`
          );
          
          if (response.ok) {
            const data = await response.json();
            const addressComponents = data.address || {};
            
            // Get detailed address with street name
            const road = addressComponents.road || addressComponents.street || '';
            const suburb = addressComponents.suburb || addressComponents.neighbourhood || '';
            const cityName = addressComponents.city || 
              addressComponents.town || 
              addressComponents.village || 
              addressComponents.state_district || 
              addressComponents.state || '';
            
            const stateName = addressComponents.state || '';
            
            // Build location string with street if available
            let locationString = '';
            if (road && accuracy < 500) {
              // Only show street if GPS is accurate
              locationString = suburb ? `${road}, ${suburb}, ${cityName}` : `${road}, ${cityName}`;
            } else {
              locationString = stateName ? `${cityName}, ${stateName}` : cityName;
            }
            
            setLocation(locationString || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
            console.log(`📍 Auto-detected location: ${locationString} (${latitude}, ${longitude})`);
          } else {
            // Fallback to coordinates
            setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          }
        } catch (geocodeError) {
          // Fallback to coordinates if geocoding fails
          setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        }
        
        
      } catch (error: any) {
        // Silently fail - user can manually enter location
        console.log('Auto-location detection skipped:', error.code === 1 ? 'Permission denied' : error.message);
      } finally {
        setDetectingLocation(false);
      }
    };

    detectUserLocation();
  }, [token]); // Only run once when component mounts and token is available

  const handleSearch = async (pageNum = 1) => {
    if (!token) return;

    // Validate required fields before making request
    if (!location || !maxDistance || maxDistance <= 0) {
      showError('Missing required fields', 'Please provide location and maximum distance');
      return;
    }

    setLoading(true);
    setPage(pageNum);

    try {
      // Determine endpoint based on user role
      // Fallback: if user.role is missing, decode it from JWT token
      let userRole = user?.role;
      
      if (!userRole && token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          userRole = payload.roles?.[0] || payload.role;
          console.log('Decoded role from token:', userRole);
        } catch (e) {
          console.error('Failed to decode token:', e);
        }
      }
      
      const isContractor = userRole === 'contractor';
      const endpoint = isContractor ? '/find-workers' : '/find-contractors';
      
      console.log('User role:', userRole, '| Contractor?', isContractor, '| Endpoint:', endpoint);
      
      // Prepare search body for POST request
      // Use GPS coordinates if available (should be accurate ±50m from retry logic)
      const searchBody = {
        location: locationCoords 
          ? `${locationCoords.lat}, ${locationCoords.lng}`
          : location.trim(),
        maxDistance: Math.max(1, maxDistance),
        skillType: skillType || undefined,
        limit: 12,
        ...(pageNum > 1 && { offset: (pageNum - 1) * 12 })
      };
      
      console.log('🔍 Searching with:', searchBody);

  const response = await fetch(`${API_CONFIG.MATCHING_SERVICE}${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchBody),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('🔍 Search results:', data);
        
        // Debug: Log first result to see its structure
        if (data.data?.matches?.[0]) {
          console.log('📋 First match fields:', Object.keys(data.data.matches[0]));
          console.log('📋 First match data:', data.data.matches[0]);
        }
        
        if (data.success) {
          setResults(data.data.matches || []);
          setTotalPages(data.data.totalPages || 1);
          setTotalResults(data.data.total || 0);
          setSearched(true);
          
          if (pageNum === 1) {
            success('Search completed', `Found ${data.data.total || 0} matches`);
          }
        } else {
          throw new Error(data.message || 'Search failed');
        }
      } else {
        throw new Error('Search request failed');
      }
    } catch (err) {
      console.error('Search error:', err);
      showError('Search failed', 'Please try again');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTeamRequest = async (match: any) => {
    if (!token) return;
    
    setActionLoading(`team-${match.id}`);
    
    try {
      // Determine user role for message customization
      const currentUserRole = user?.role || (token ? JSON.parse(atob(token.split('.')[1])).roles?.[0] : null);
      const isContractor = currentUserRole === 'contractor';
      
      // Role-specific messages
      const message = isContractor
        ? `Hi ${match.name || 'there'}, I'd like to invite you to join my team. Your skills in ${skillType || 'your field'} would be a great fit for our project.`
        : `Hi ${match.name || 'there'}, I'm interested in joining your team. I have experience in ${skillType || 'various skills'} and I'm available for work in ${location || 'your area'}.`;
      
      const successMessage = isContractor
        ? `Invitation sent to ${match.name || 'worker'}`
        : `Request sent to ${match.name || 'contractor'}`;
      
      // Fixed: Use correct endpoint and field names per backend validation schema
      const response = await fetch(`${API_CONFIG.MATCHING_SERVICE}/send-team-request`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          receiverId: match.id, // Changed from recipient_id to match backend schema
          message: message,
          matchContext: {
            skill: skillType,
            distance: match.distanceKm ? `${Math.round(match.distanceKm)} km` : undefined,
            matchScore: match.score,
            searchType: isContractor ? 'worker' : 'contractor'
          }
        }),
      });

      if (response.ok) {
        await response.json(); // Consume response body
        success('Team request sent', successMessage);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send team request');
      }
    } catch (err) {
      console.error('Team request error:', err);
      showError('Failed to send request', err instanceof Error ? err.message : 'Please try again');
    } finally {
      setActionLoading(null);
    }
  };

  const handleContact = async (match: any) => {
    setActionLoading(`contact-${match.id}`);
    
    // Simulate contact action
    setTimeout(() => {
      success('Contact initiated', `You can now message ${match.name}`);
      setActionLoading(null);
    }, 1000);
  };

  // Toggle filter function (currently unused)
  // const toggleFilter = (filter: string) => {
  //   setActiveFilters(prev => 
  //     prev.includes(filter) 
  //       ? prev.filter(f => f !== filter)
  //       : [...prev, filter]
  //   );
  // };

  const clearAllFilters = () => {
    setSkillType('');
    setActiveFilters([]);
  };

  const hasActiveFilters = skillType || activeFilters.length > 0;

  // Determine user role for dynamic content
  const userRole = user?.role || (token ? JSON.parse(atob(token.split('.')[1])).roles?.[0] : null);
  const isContractor = userRole === 'contractor';

  return (
    <div className="responsive-container page-wrapper" style={{
      backgroundColor: theme.colors.neutral[50],
      minHeight: '100vh',
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: theme.spacing.xl,
      }}>
        <h1 className="responsive-heading-1" style={{
          color: theme.colors.neutral[900],
          marginBottom: theme.spacing.sm,
        }}>
          {isContractor ? 'Find Skilled Workers' : 'Find Job Opportunities'}
        </h1>
        <p className="responsive-heading-3" style={{
          color: theme.colors.neutral[600],
        }}>
          {isContractor 
            ? 'Discover talented workers for your construction projects' 
            : 'Browse contractors hiring workers in your area'}
        </p>
      </div>

      {/* Search Form */}
      <div className="responsive-card" style={{
        marginBottom: theme.spacing.xl,
      }}>
        <div className="responsive-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: theme.spacing.lg,
          marginBottom: theme.spacing.lg,
        }}>
          {/* Skill Type */}
          <div>
            <label style={{
              display: 'block',
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.medium,
              color: theme.colors.neutral[700],
              marginBottom: theme.spacing.xs,
            }}>
              {isContractor ? 'Skills Required' : 'Your Skills / Job Type'}
            </label>
            <select
              value={skillType}
              onChange={(e) => setSkillType(e.target.value)}
              disabled={skillsLoading}
              style={{
                width: '100%',
                padding: theme.spacing.sm,
                border: `1px solid ${theme.colors.neutral[300]}`,
                borderRadius: theme.borderRadius.md,
                fontSize: theme.typography.fontSize.sm,
                backgroundColor: skillsLoading ? theme.colors.neutral[100] : 'white',
                color: '#000',
                cursor: skillsLoading ? 'wait' : 'pointer',
              }}
            >
              <option value="">
                {skillsLoading ? 'Loading skills...' : 'Select a skill...'}
              </option>
              {skillOptions.map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.xs,
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.medium,
              color: theme.colors.neutral[700],
              marginBottom: theme.spacing.xs,
            }}>
              <span>Location</span>
              {detectingLocation && <span style={{ color: theme.colors.primary[600] }}>(Detecting...)</span>}
              {locationAccuracy && !detectingLocation && (
                <span style={{
                  fontSize: '0.7rem',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  backgroundColor: locationAccuracy <= 100 ? '#dcfce7' : locationAccuracy <= 1000 ? '#fef3c7' : '#fee2e2',
                  color: locationAccuracy <= 100 ? '#166534' : locationAccuracy <= 1000 ? '#92400e' : '#991b1b',
                  fontWeight: 600,
                }}>
                  {locationAccuracy <= 100 ? '✓ Accurate' : locationAccuracy <= 1000 ? `⚠ ±${Math.round(locationAccuracy)}m` : `⚠ ±${Math.round(locationAccuracy / 1000)}km`}
                </span>
              )}
            </label>
            <div style={{ display: 'flex', gap: theme.spacing.xs }}>
              <input
                type="text"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  // Clear GPS coordinates when user manually types a location
                  if (locationCoords) {
                    setLocationCoords(null);
                    console.log('📍 Cleared GPS coordinates (manual input)');
                  }
                }}
                placeholder={detectingLocation ? "Detecting your location..." : "Enter city name (e.g., Delhi, Mumbai, Bangalore)"}
                disabled={detectingLocation}
                style={{
                  flex: 1,
                  padding: theme.spacing.sm,
                  border: `1px solid ${theme.colors.neutral[300]}`,
                  borderRadius: theme.borderRadius.md,
                  fontSize: theme.typography.fontSize.sm,
                  backgroundColor: detectingLocation ? theme.colors.neutral[100] : 'white',
                  color: '#000',
                }}
              />
              <button
                type="button"
                onClick={async () => {
                  setDetectingLocation(true);
                  
                  try {
                    // Check and request location permissions
                    const permissionStatus = await Geolocation.checkPermissions();
                    
                    if (permissionStatus.location === 'denied') {
                      const requestResult = await Geolocation.requestPermissions();
                      if (requestResult.location === 'denied') {
                        showError('Permission denied', 'Location permission is required to use this feature');
                        setDetectingLocation(false);
                        return;
                      }
                    }

                    // Get location quickly
                    console.log(`� Getting your location...`);
                    
                    info('Getting accurate GPS location...');
                    
                    let position;
                    let accuracy = 999999;
                    let attempts = 0;
                    const maxAttempts = 5;
                    
                    while (accuracy > 50 && attempts < maxAttempts) {
                      attempts++;
                      console.log(`GPS attempt ${attempts}/${maxAttempts}...`);
                      
                      if (attempts > 1) {
                        info(`Improving GPS... (${attempts}/${maxAttempts})`);
                      }
                      
                      position = await Geolocation.getCurrentPosition({
                        enableHighAccuracy: true,
                        timeout: 15000,
                        maximumAge: 0
                      });
                      
                      accuracy = position.coords.accuracy || 999999;
                      console.log(`Accuracy: ±${Math.round(accuracy)}m`);
                      
                      if (accuracy <= 50) {
                        success(`GPS locked! ±${Math.round(accuracy)}m`);
                        break;
                      }
                      
                      if (attempts < maxAttempts) await new Promise(r => setTimeout(r, 2000));
                    }
                    
                    if (accuracy > 50) {
                      warning(`Best accuracy: ±${Math.round(accuracy)}m`);
                    }
                    
                    const latitude = position!.coords.latitude;
                    const longitude = position!.coords.longitude;
                    
                    console.log(`📍 Location: ${latitude.toFixed(6)}, ${longitude.toFixed(6)} (±${Math.round(accuracy)}m)`);
                    
                    // Store coordinates and accuracy
                    setLocationCoords({ lat: latitude, lng: longitude });
                    setLocationAccuracy(accuracy || null);
                    
                    // Use reverse geocoding via backend proxy to avoid CORS issues
                    try {
                      const response = await fetch(
                        `${API_CONFIG.MATCHING_SERVICE}/reverse-geocode?lat=${latitude}&lon=${longitude}`
                      );
                      
                      if (response.ok) {
                        const data = await response.json();
                        const addressComponents = data.address || {};
                        
                        // Get detailed address with street name
                        const road = addressComponents.road || addressComponents.street || '';
                        const suburb = addressComponents.suburb || addressComponents.neighbourhood || '';
                        const cityName = addressComponents.city || 
                          addressComponents.town || 
                          addressComponents.village || 
                          addressComponents.state_district || 
                          addressComponents.state || '';
                        
                        const stateName = addressComponents.state || '';
                        
                        // Build location string with street if GPS is accurate
                        let locationString = '';
                        if (road && accuracy < 500) {
                          // Show street if GPS is good
                          locationString = suburb ? `${road}, ${suburb}, ${cityName}` : `${road}, ${cityName}`;
                        } else {
                          locationString = stateName ? `${cityName}, ${stateName}` : cityName;
                        }
                        
                        setLocation(locationString || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
                        
                        // Provide feedback based on accuracy
                        const accuracyKm = accuracy ? (accuracy / 1000).toFixed(1) : 'unknown';
                        if (accuracy && accuracy <= 50) {
                          success('Location detected', `${locationString || 'coordinates'} (±${Math.round(accuracy)}m - Excellent GPS signal)`);
                        } else if (accuracy && accuracy <= 500) {
                          success('Location detected', `${locationString || 'coordinates'} (±${Math.round(accuracy)}m - Good accuracy)`);
                        } else if (accuracy && accuracy > 500) {
                          success('Location detected', `${locationString || 'coordinates'} (±${accuracyKm}km - Consider moving to an open area for better GPS)`);
                        } else {
                          success('Location detected', `Using: ${locationString || 'coordinates'}`);
                        }
                        console.log(`📍 Manual location detected: ${locationString} (${latitude}, ${longitude})`);
                      } else {
                        // Fallback to coordinates
                        setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
                        const accuracyKm = accuracy ? (accuracy / 1000).toFixed(1) : 'unknown';
                        success('Location detected', accuracy ? `Coordinates (±${accuracyKm}km accuracy)` : 'Using coordinates');
                      }
                    } catch (geocodeError) {
                      // Fallback to coordinates if geocoding fails
                      setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
                      success('Location detected', 'Using coordinates (address lookup failed)');
                    }
                  } catch (error: any) {
                    let errorMessage = 'Unable to detect location';
                    let errorTitle = 'Detection failed';
                    
                    if (error.code === 1) {
                      errorTitle = 'Permission denied';
                      errorMessage = 'To enable location: Click the lock/info icon (🔒) in your browser address bar → Site settings → Location → Allow';
                    } else if (error.code === 2) {
                      errorTitle = 'Location unavailable';
                      errorMessage = 'Please check that GPS is enabled on your device and try again.';
                    } else if (error.code === 3) {
                      errorTitle = 'Request timed out';
                      errorMessage = 'Location detection took too long. Please check your GPS signal and try again.';
                    }
                    showError(errorTitle, errorMessage);
                  } finally {
                    setDetectingLocation(false);
                  }
                }}
                disabled={detectingLocation}
                style={{
                  padding: `${theme.spacing.sm} ${theme.spacing.md}`,
                  border: `1px solid ${theme.colors.primary[500]}`,
                  borderRadius: theme.borderRadius.md,
                  backgroundColor: detectingLocation ? theme.colors.neutral[200] : theme.colors.primary[50],
                  color: theme.colors.primary[700],
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: theme.typography.fontWeight.medium,
                  cursor: detectingLocation ? 'wait' : 'pointer',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing.xs,
                }}
              >
                📍 {detectingLocation ? 'Detecting...' : 'Use My Location'}
              </button>
            </div>
          </div>

          {/* Max Distance */}
          <div>
            <label style={{
              display: 'block',
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.medium,
              color: theme.colors.neutral[700],
              marginBottom: theme.spacing.xs,
            }}>
              Max Distance: {maxDistance} km
            </label>
            <input
              type="range"
              min="5"
              max="50"
              value={maxDistance}
              onChange={(e) => setMaxDistance(Number(e.target.value))}
              style={{
                width: '100%',
                height: '6px',
                borderRadius: '3px',
                backgroundColor: theme.colors.neutral[200],
                outline: 'none',
                cursor: 'pointer',
              }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.md,
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', gap: theme.spacing.sm }}>
            <LoadingButton
              isLoading={loading}
              variant="primary"
              onClick={() => handleSearch(1)}
              disabled={!skillType}
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              Search Matches
            </LoadingButton>
            
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                style={{
                  padding: `${theme.spacing.sm} ${theme.spacing.md}`,
                  border: `1px solid ${theme.colors.neutral[300]}`,
                  borderRadius: theme.borderRadius.md,
                  backgroundColor: 'white',
                  color: theme.colors.neutral[600],
                  fontSize: theme.typography.fontSize.sm,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing.xs,
                }}
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Clear Filters
              </button>
            )}
          </div>

          {/* Sort Options */}
          {searched && (
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                handleSearch(1);
              }}
              style={{
                padding: theme.spacing.sm,
                border: `1px solid ${theme.colors.neutral[300]}`,
                borderRadius: theme.borderRadius.md,
                fontSize: theme.typography.fontSize.sm,
                backgroundColor: 'white',
              }}
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Results Header */}
      {searched && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: theme.spacing.lg,
        }}>
          <div style={{
            fontSize: theme.typography.fontSize.lg,
            fontWeight: theme.typography.fontWeight.medium,
            color: theme.colors.neutral[900],
          }}>
            {loading ? 'Searching...' : `${totalResults} matches found`}
          </div>
          {totalPages > 1 && (
            <div style={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.neutral[600],
            }}>
              Page {page} of {totalPages}
            </div>
          )}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="grid-3-cols" style={{
          gap: theme.spacing.lg,
        }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* Results */}
      {!loading && searched && (
        <>
          {results.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: theme.spacing['2xl'],
              backgroundColor: 'white',
              borderRadius: theme.borderRadius.lg,
              border: `1px solid ${theme.colors.neutral[200]}`,
            }}>
              <svg
                width="64"
                height="64"
                fill={theme.colors.neutral[400]}
                viewBox="0 0 20 20"
                style={{ margin: '0 auto', marginBottom: theme.spacing.lg }}
              >
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              <h3 style={{
                fontSize: theme.typography.fontSize.xl,
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.neutral[900],
                marginBottom: theme.spacing.sm,
              }}>
                No matches found
              </h3>
              <p style={{
                fontSize: theme.typography.fontSize.base,
                color: theme.colors.neutral[600],
                marginBottom: theme.spacing.lg,
              }}>
                Try adjusting your search criteria or expanding your location range.
              </p>
              <button
                onClick={clearAllFilters}
                style={{
                  padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
                  backgroundColor: theme.colors.primary[500],
                  color: 'white',
                  border: 'none',
                  borderRadius: theme.borderRadius.md,
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: theme.typography.fontWeight.medium,
                  cursor: 'pointer',
                }}
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid-3-cols" style={{
              gap: theme.spacing.lg,
            }}>
              {results.map((match, index) => (
                <SearchResultCard
                  key={match.user_id || index}
                  match={match}
                  onContact={() => handleContact(match)}
                  onTeamRequest={() => handleTeamRequest(match)}
                  isLoading={actionLoading === `team-${match.id}` || actionLoading === `contact-${match.id}`}
                  userRole={userRole}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handleSearch}
          />
        </>
      )}

      {/* Empty State for No Search */}
      {!searched && !loading && (
        <div style={{
          textAlign: 'center',
          padding: theme.spacing['2xl'],
          backgroundColor: 'white',
          borderRadius: theme.borderRadius.lg,
          border: `1px solid ${theme.colors.neutral[200]}`,
        }}>
          <svg
            width="80"
            height="80"
            fill={theme.colors.primary[400]}
            viewBox="0 0 20 20"
            style={{ margin: '0 auto', marginBottom: theme.spacing.lg }}
          >
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
          </svg>
          <h3 style={{
            fontSize: theme.typography.fontSize['2xl'],
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.neutral[900],
            marginBottom: theme.spacing.sm,
          }}>
            Ready to find your next team member?
          </h3>
          <p style={{
            fontSize: theme.typography.fontSize.lg,
            color: theme.colors.neutral[600],
          }}>
            Enter your requirements above and start searching for the perfect match.
          </p>
        </div>
      )}
    </div>
  );
};

export default EnhancedMatchSearchPage;