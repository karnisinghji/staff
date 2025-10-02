import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { theme } from '../../styles/theme';
import { SkeletonCard, LoadingButton, LoadingSpinner } from '../../components/LoadingComponents';

const MATCHING_BASE = import.meta.env.VITE_MATCHING_BASE || 'http://localhost:3003/api/matching';
const USER_BASE = import.meta.env.VITE_USER_BASE || 'http://localhost:3002';

interface FilterChipProps {
  label: string;
  value: string;
  isActive: boolean;
  onClick: () => void;
  color?: string;
}

const FilterChip: React.FC<FilterChipProps> = ({ label, value, isActive, onClick, color = theme.colors.primary[500] }) => (
  <button
    onClick={onClick}
    style={{
      padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
      borderRadius: theme.borderRadius.full,
      border: `2px solid ${isActive ? color : theme.colors.neutral[300]}`,
      backgroundColor: isActive ? color : 'white',
      color: isActive ? 'white' : theme.colors.neutral[700],
      fontSize: theme.typography.fontSize.sm,
      fontWeight: theme.typography.fontWeight.medium,
      cursor: 'pointer',
      transition: 'all 0.2s ease-in-out',
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing.xs,
    }}
    onMouseEnter={(e) => {
      if (!isActive) {
        e.currentTarget.style.borderColor = color;
        e.currentTarget.style.backgroundColor = `${color}10`;
      }
    }}
    onMouseLeave={(e) => {
      if (!isActive) {
        e.currentTarget.style.borderColor = theme.colors.neutral[300];
        e.currentTarget.style.backgroundColor = 'white';
      }
    }}
  >
    {label}
    {isActive && (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    )}
  </button>
);

interface SearchResultCardProps {
  match: any;
  onContact: () => void;
  onTeamRequest: () => void;
  isLoading?: boolean;
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({ match, onContact, onTeamRequest, isLoading = false }) => (
  <div style={{
    backgroundColor: 'white',
    borderRadius: theme.borderRadius.lg,
    border: `1px solid ${theme.colors.neutral[200]}`,
    boxShadow: theme.shadows.sm,
    padding: theme.spacing.lg,
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
        {(match.name || match.id)?.charAt(0)?.toUpperCase() || '?'}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: theme.typography.fontSize.lg,
          fontWeight: theme.typography.fontWeight.semibold,
          color: theme.colors.neutral[900],
          marginBottom: theme.spacing.xs,
        }}>
          {match.name || `Worker ${match.id?.slice(-6) || 'Unknown'}`}
        </div>
        <div style={{
          fontSize: theme.typography.fontSize.sm,
          color: theme.colors.neutral[600],
        }}>
          {match.company || 'Individual Contractor'}
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
          {Math.round(match.score * 100)}% match
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
        {match.location || 'Location not specified'}
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

    {/* Action Buttons */}
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
        Contact
      </LoadingButton>
      <LoadingButton
        isLoading={isLoading}
        variant="primary"
        size="sm"
        onClick={onTeamRequest}
      >
        Send Team Request
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
  const { success, error: showError } = useToast();
  
  // Search state
  const [skillType, setSkillType] = useState('');
  const [location, setLocation] = useState('');
  const [maxDistance, setMaxDistance] = useState<number>(50);
  const [experienceLevel, setExperienceLevel] = useState('');
  const [urgency, setUrgency] = useState('');
  
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

  // Skills fetched from backend database
  const [skillOptions, setSkillOptions] = useState<string[]>([]);
  const [skillsLoading, setSkillsLoading] = useState(true);

  const experienceOptions = [
    { value: 'beginner', label: 'Beginner (0-2 years)' },
    { value: 'intermediate', label: 'Intermediate (2-5 years)' },
    { value: 'expert', label: 'Expert (5+ years)' }
  ];

  const urgencyOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' }
  ];

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
        const response = await fetch(`${USER_BASE}/api/users/skills`, {
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

  const handleSearch = async (pageNum = 1) => {
    if (!token) return;

    setLoading(true);
    setPage(pageNum);

    try {
      // Determine endpoint based on user role
      const isContractor = user?.role === 'contractor';
      const endpoint = isContractor ? 'find-workers' : 'find-contractors';
      
      // Prepare search body for POST request
      const searchBody = {
        skillType: skillType || undefined,
        location: location || undefined,
        maxDistance: maxDistance > 0 ? maxDistance : undefined,
        limit: 12,
        // Map frontend params to backend expected format
        ...(experienceLevel && { experienceLevel }),
        ...(urgency && { urgency }),
        ...(pageNum > 1 && { offset: (pageNum - 1) * 12 })
      };

      const response = await fetch(`${MATCHING_BASE}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchBody),
      });

      if (response.ok) {
        const data = await response.json();
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
      const response = await fetch(`${MATCHING_BASE}/team-requests`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipient_id: match.id,
          message: `Hi ${match.name || 'there'}, I'd like to invite you to join my team. Your skills in ${skillType} would be a great fit for our project.`,
        }),
      });

      if (response.ok) {
        success('Team request sent', `Invitation sent to ${match.name || 'worker'}`);
      } else {
        throw new Error('Failed to send team request');
      }
    } catch (err) {
      console.error('Team request error:', err);
      showError('Failed to send request', 'Please try again');
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

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const clearAllFilters = () => {
    setSkillType('');
    setExperienceLevel('');
    setUrgency('');
    setActiveFilters([]);
  };

  const hasActiveFilters = skillType || experienceLevel || urgency || activeFilters.length > 0;

  return (
    <div style={{
      maxWidth: '1400px',
      margin: '0 auto',
      padding: theme.spacing.xl,
      backgroundColor: theme.colors.neutral[50],
      minHeight: '100vh',
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: theme.spacing.xl,
      }}>
        <h1 style={{
          fontSize: theme.typography.fontSize['4xl'],
          fontWeight: theme.typography.fontWeight.bold,
          color: theme.colors.neutral[900],
          marginBottom: theme.spacing.sm,
        }}>
          Find Your Perfect Team Match
        </h1>
        <p style={{
          fontSize: theme.typography.fontSize.lg,
          color: theme.colors.neutral[600],
        }}>
          Discover talented contractors and workers for your projects
        </p>
      </div>

      {/* Search Form */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.xl,
        boxShadow: theme.shadows.sm,
        border: `1px solid ${theme.colors.neutral[200]}`,
        marginBottom: theme.spacing.xl,
      }}>
        <div style={{
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
              Skills Required
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
              display: 'block',
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.medium,
              color: theme.colors.neutral[700],
              marginBottom: theme.spacing.xs,
            }}>
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter city, state, or zip code"
              style={{
                width: '100%',
                padding: theme.spacing.sm,
                border: `1px solid ${theme.colors.neutral[300]}`,
                borderRadius: theme.borderRadius.md,
                fontSize: theme.typography.fontSize.sm,
              }}
            />
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
              max="200"
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

        {/* Filter Chips */}
        <div style={{ marginBottom: theme.spacing.lg }}>
          <div style={{
            fontSize: theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.medium,
            color: theme.colors.neutral[700],
            marginBottom: theme.spacing.sm,
          }}>
            Experience Level
          </div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: theme.spacing.sm,
            marginBottom: theme.spacing.md,
          }}>
            {experienceOptions.map(option => (
              <FilterChip
                key={option.value}
                label={option.label}
                value={option.value}
                isActive={experienceLevel === option.value}
                onClick={() => setExperienceLevel(experienceLevel === option.value ? '' : option.value)}
                color={theme.colors.success[500]}
              />
            ))}
          </div>

          <div style={{
            fontSize: theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.medium,
            color: theme.colors.neutral[700],
            marginBottom: theme.spacing.sm,
          }}>
            Project Urgency
          </div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: theme.spacing.sm,
          }}>
            {urgencyOptions.map(option => (
              <FilterChip
                key={option.value}
                label={option.label}
                value={option.value}
                isActive={urgency === option.value}
                onClick={() => setUrgency(urgency === option.value ? '' : option.value)}
                color={theme.colors.warning[500]}
              />
            ))}
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
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
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
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: theme.spacing.lg,
            }}>
              {results.map((match, index) => (
                <SearchResultCard
                  key={match.user_id || index}
                  match={match}
                  onContact={() => handleContact(match)}
                  onTeamRequest={() => handleTeamRequest(match)}
                  isLoading={actionLoading === `team-${match.id}` || actionLoading === `contact-${match.id}`}
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