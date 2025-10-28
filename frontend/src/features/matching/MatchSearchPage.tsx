import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../auth/AuthContext';
import { ContractorRequirementsList } from './ContractorRequirementsList';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_CONFIG } from '../../config/api';

// Base matching service URL (without specific endpoint)
const MATCHING_BASE = import.meta.env.VITE_MATCHING_BASE || `${API_CONFIG.MATCHING_SERVICE}/api/matching`;
const COMMUNICATION_BASE = API_CONFIG.COMMUNICATION_SERVICE;

export const MatchSearchPage: React.FC = () => {
  const { token, user } = useAuth();
  const [skillType, setSkillType] = useState('');
  const [location, setLocation] = useState('');
  const [locationType, setLocationType] = useState('');
  const [maxDistance, setMaxDistance] = useState<number>(50);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAdvanced] = useState(false);
  const [experienceLevel, setExperienceLevel] = useState(''); // beginner | intermediate | expert
  const [urgency, setUrgency] = useState(''); // low | medium | high
  const [budgetMax, setBudgetMax] = useState<number | ''>('');
  const [ratingMin, setRatingMin] = useState<number | ''>('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [autoSearch, setAutoSearch] = useState(true);
  const [showRaw, setShowRaw] = useState(false);
  const [rawPayload, setRawPayload] = useState<any>(null);
  const [rawResponse, setRawResponse] = useState<any>(null);
  const [searched, setSearched] = useState(false);
  const [sentRequests, setSentRequests] = useState<Set<string>>(new Set());
  const [requestMessage, setRequestMessage] = useState('');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  // Contact modal state
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactMessage, setContactMessage] = useState('');
  const [selectedContactMatch, setSelectedContactMatch] = useState<any>(null);
  // Call modal state
  const [showCallModal, setShowCallModal] = useState(false);
  const [selectedCallMatch, setSelectedCallMatch] = useState<any>(null);
  const [callType, setCallType] = useState<'voice' | 'video'>('voice');
  const debounceRef = useRef<number | undefined>(undefined);
  const firstLoadRef = useRef(true);

  // Extract role from either single role field or roles array
  const userRole = user?.role || (user?.roles && user.roles[0]) || 'user';
  // Storage key per role
  const storageKey = `matching_criteria_${userRole || 'anon'}`;

  // Auto-get current location on first load
  useEffect(() => {
    const autoLocation = async () => {
      if (!location && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async pos => {
            const { latitude, longitude } = pos.coords;
            try {
              const response = await fetch(`${API_CONFIG.MATCHING_SERVICE}/api/matching/reverse-geocode?lat=${latitude}&lon=${longitude}`);
              const data = await response.json();
              const name = data.address?.city || data.address?.town || data.address?.village || data.address?.state || data.address?.country || data.display_name || `${latitude},${longitude}`;
              setLocation(name);
              setLocationType('__current__');
            } catch {
              setLocation(`${latitude},${longitude}`);
              setLocationType('__current__');
            }
          },
          () => {
            // If geolocation fails, try to load saved criteria
            try {
              const raw = localStorage.getItem(storageKey);
              if (raw) {
                const saved = JSON.parse(raw);
                setLocation(saved.location || '');
                setLocationType(saved.locationType || '');
              }
            } catch {/* ignore */}
          }
        );
      }
    };

    // Load saved criteria first
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const saved = JSON.parse(raw);
        setSkillType(saved.skillType || '');
        setLocation(saved.location || '');
        setLocationType(saved.locationType || '');
        setMaxDistance(saved.maxDistance || 50);
        setExperienceLevel(saved.experienceLevel || '');
        setUrgency(saved.urgency || '');
        setBudgetMax(saved.budgetMax ?? '');
        setRatingMin(saved.ratingMin ?? '');
        
        // If no saved location, try to get current location
        if (!saved.location) {
          autoLocation();
        }
      } else {
        // No saved data, try to get current location
        autoLocation();
      }
    } catch {
      autoLocation();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userRole]);

  const persistCriteria = () => {
    try {
      const obj = {
        skillType,
        location,
        locationType,
        maxDistance,
        experienceLevel,
        urgency,
        budgetMax: budgetMax === '' ? undefined : budgetMax,
        ratingMin: ratingMin === '' ? undefined : ratingMin,
        page,
        limit,
        autoSearch
      };
      localStorage.setItem(storageKey, JSON.stringify(obj));
    } catch {/* ignore */}
  };

  const resetForm = () => {
    setSkillType('');
    setLocation('');
    setLocationType('');
    setMaxDistance(50);
    setExperienceLevel('');
    setUrgency('');
    setBudgetMax('');
    setRatingMin('');
    setResults([]);
    setError('');
    setPage(1);
    setTotalPages(1);
    setRawPayload(null);
    setRawResponse(null);
    setSearched(false);
    try { localStorage.removeItem(storageKey); } catch {/* ignore */}
  };

  const executeSearch = async (targetPage?: number) => {
    setError('');
    setLoading(true);
    setResults([]);
    if (!token) {
      setError('You must be logged in to search.');
      setLoading(false);
      return;
    }
    // Validation
    if (!location) {
      setError('Location is required');
      setLoading(false);
      return;
    }
    if (!maxDistance || maxDistance <= 0) {
      setError('Max distance must be greater than 0');
      setLoading(false);
      return;
    }
    // Extract role from either single role field or roles array
    const userRole = user?.role || (user?.roles && user.roles[0]) || 'user';
    
    if (userRole !== 'worker' && !skillType) {
      setError('Skill type is required');
      setLoading(false);
      return;
    }

    const endpoint = userRole === 'worker'
      ? `${MATCHING_BASE}/find-contractors`
      : `${MATCHING_BASE}/find-workers`;

    const payload: Record<string, any> = {
      location,
      maxDistance: Number(maxDistance)
    };
    if (userRole !== 'worker') {
      payload.skillType = skillType;
    } else if (skillType) {
      payload.skillType = skillType;
    }

    if (experienceLevel) payload.experienceLevel = experienceLevel;
    if (urgency) payload.urgency = urgency;
    if (budgetMax !== '' && Number(budgetMax) > 0) {
      payload.budgetRange = { max: Number(budgetMax) };
    }
    if (ratingMin !== '' && Number(ratingMin) > 0) {
      payload.rating = Number(ratingMin);
    }
    const usePage = targetPage ?? page;
    payload.page = usePage;
    payload.limit = limit;

    // Persist criteria (excluding token)
    persistCriteria();
    setRawPayload(payload);

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      setRawResponse(data);
      const matches = data.matches || data.data?.matches;
      
      // Debug: Log the API response to see what data we're getting
      // API call successful - matches loaded
      
      if (res.ok && Array.isArray(matches)) {
        setResults(matches);
        const meta = data.data || data;
        if (meta.totalPages) setTotalPages(meta.totalPages);
        setPage(meta.page || usePage);
      } else {
        setError(data.message || 'No matches found');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Manual search resets to page 1
    executeSearch(1);
  };

  const sendTeamRequest = async (match: any, message: string = '') => {
    try {
      const response = await fetch(`${MATCHING_BASE}/send-team-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          receiverId: match.id,
          message: message,
          matchContext: {
            skill: match.skill || skillType,
            distance: match.distanceKm ? `${match.distanceKm}km` : undefined,
            matchScore: match.score,
            searchType: userRole === 'worker' ? 'contractor' : 'worker'
          }
        })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setSentRequests(prev => new Set([...prev, match.id]));
        setShowRequestModal(false);
        setRequestMessage('');
        setSelectedMatch(null);
        toast.success('✅ Team request sent successfully!');
      } else {
        toast.error(data.message || 'Failed to send team request');
      }
    } catch (error) {
      console.error('Error sending team request:', error);
      toast.error('Network error. Please try again.');
    }
  };

  const sendMessage = async (match: any, message: string) => {
    try {
      const response = await fetch(`${COMMUNICATION_BASE}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          fromUserId: user?.id,
          toUserId: match.id,
          body: message
        })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setShowContactModal(false);
        setContactMessage('');
        setSelectedContactMatch(null);
        toast.success('✅ Message sent successfully!');
      } else {
        toast.error(data.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Network error. Please try again.');
    }
  };

  const initiateCall = async (match: any, type: 'voice' | 'video') => {
    try {
      // Debug: Log the match object to see what data we have
      // Check for available phone number
      
      // Check if we have phone number for direct calling
      if (match.phone || match.phoneNumber) {
        const phoneNumber = match.phone || match.phoneNumber;
        // Direct phone call available
        if (type === 'voice') {
          // Open device's phone app
          window.open(`tel:${phoneNumber}`, '_self');
          setShowCallModal(false);
          return;
        }
      } else {
        // No phone number - use app notification system
      }

      // For WebRTC or video calls, first notify the other user
      const response = await fetch(`${COMMUNICATION_BASE}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          fromUserId: user?.id,
          toUserId: match.id,
          body: `📞 ${user?.name || 'Someone'} wants to start a ${type} call with you. Please check your notifications.`
        })
      });

      if (response.ok) {
        setShowCallModal(false);
        toast.success(`📞 ${type === 'voice' ? 'Voice' : 'Video'} call request sent! The other person will be notified.`);
        
        // In a real implementation, you'd integrate with WebRTC or a calling service
        // For now, we'll show a placeholder for WebRTC implementation
        // Call request initiated
        
        // TODO: Implement WebRTC calling logic here
        // - Create peer connection
        // - Handle ICE candidates
        // - Start media streams
        
      } else {
        toast.error('Failed to send call request');
      }
    } catch (error) {
      console.error('Error initiating call:', error);
      toast.error('Network error. Please try again.');
    }
  };

  const handleSendRequest = (match: any) => {
    setSelectedMatch(match);
    setShowRequestModal(true);
  };

  const handleContactWorker = (match: any) => {
    setSelectedContactMatch(match);
    setContactMessage(`Hi ${match.name || 'there'}, I saw your profile and would like to discuss a potential project. Are you available?`);
    setShowContactModal(true);
  };

  const handleCallWorker = (match: any) => {
    // Initiate call with worker
    alert(`Debug: Phone number is ${match.phone || 'not found'}`);
    
    setSelectedCallMatch(match);
    setCallType('voice');
    setShowCallModal(true);
  };

  // Debounced auto-search when criteria change (excluding first mount & while not loading)
  useEffect(() => {
    if (!autoSearch) return;
    if (firstLoadRef.current) { firstLoadRef.current = false; return; }
    if (!token) return; // skip until authenticated
    // Reset page to 1 when criteria change
    setPage(1);
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      executeSearch(1);
    }, 600);
    return () => { if (debounceRef.current) window.clearTimeout(debounceRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skillType, location, maxDistance, experienceLevel, urgency, budgetMax, ratingMin, autoSearch]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <style>{`
        .search-bg {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          background: #f5f7fa;
          padding: 2rem;
        }
        .search-container {
          width: 100%;
          max-width: 500px;
          min-width: 320px;
          padding: 2.5rem 2.5rem 2rem 2.5rem;
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 4px 32px rgba(0,0,0,0.10);
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .search-container h2 {
          text-align: center;
          margin-bottom: 1rem;
          color: #1976d2;
          font-size: 2rem;
          font-weight: 700;
        }
        .search-form {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        .search-form input {
          padding: 1rem;
          border-radius: 10px;
          border: 1px solid #bbb;
          font-size: 1.1rem;
          background: #f7f9fc;
          color: #000;
        }
        .search-form button {
          padding: 1rem;
          border-radius: 10px;
          border: none;
          background: #1976d2;
          color: #fff;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(25,118,210,0.08);
          transition: background 0.2s;
        }
        .search-form .secondary-btn {
          background: #607d8b;
        }
        .search-form .secondary-btn:hover { background: #455a64; }
        .search-form button:hover {
          background: #115293;
        }
        .search-error {
          color: red;
          text-align: center;
          font-weight: 500;
        }
        .search-results {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .skeleton-list li { background: #e3e7ec; position: relative; overflow: hidden; }
        .skeleton { width: 100%; height: 14px; background: linear-gradient(90deg,#e0e3e7 0%,#f5f7fa 50%,#e0e3e7 100%); background-size: 200% 100%; animation: pulse 1.2s infinite; border-radius:4px; }
        @keyframes pulse { 0%{background-position:0% 0} 100%{background-position:-200% 0} }
        .search-results li {
          background: #f7f9fc;
          margin-bottom: 1rem;
          padding: 1rem;
          border-radius: 8px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
          font-size: 1.05rem;
        }
        .contractor-results {
          display: grid;
          gap: 1.5rem;
          margin-top: 1rem;
        }
        .contractor-card {
          background: #ffffff;
          border: 1px solid #e1e8ed;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          transition: all 0.2s ease;
        }
        .contractor-card:hover {
          box-shadow: 0 4px 16px rgba(0,0,0,0.12);
          transform: translateY(-2px);
        }
        .contractor-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }
        .contractor-title h3 {
          margin: 0 0 0.5rem 0;
          color: #1a365d;
          font-size: 1.25rem;
          font-weight: 600;
        }
        .hiring-badge {
          background: #38a169;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 500;
        }
        .contractor-rating {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .rating-stars {
          color: #f6ad55;
          font-size: 1.1rem;
        }
        .rating-number {
          color: #4a5568;
          font-weight: 500;
        }
        .contractor-details {
          margin-bottom: 1.5rem;
        }
        .contractor-skill {
          color: #2b6cb0;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }
        .contractor-location {
          color: #4a5568;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
        }
        .contractor-location:before {
          content: "📍";
          margin-right: 0.5rem;
        }
        .contractor-stats {
          color: #718096;
          font-size: 0.9rem;
        }
        .contractor-actions {
          display: flex;
          gap: 1rem;
          border-top: 1px solid #e2e8f0;
          padding-top: 1rem;
        }
        .contact-btn {
          background: #3182ce;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s ease;
          flex: 1;
        }
        .contact-btn:hover {
          background: #2c5aa0;
        }
        .call-btn {
          background: #38a169;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s ease;
          flex: 1;
        }
        .call-btn:hover {
          background: #2f855a;
        }
        .save-btn {
          background: #e2e8f0;
          color: #4a5568;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .save-btn:hover {
          background: #cbd5e0;
          color: #2d3748;
        }
        .location-btn {
          background: #48bb78;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-size: 0.9rem;
          cursor: pointer;
          margin-top: 0.5rem;
          transition: background 0.2s ease;
        }
        .location-btn:hover {
          background: #38a169;
        }
        @media (max-width: 600px) {
          .search-container {
            max-width: 100vw;
            min-width: 0;
            padding: 1.2rem 0.5rem 1rem 0.5rem;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          }
          .search-container h2 {
            font-size: 1.4rem;
          }
          .search-form input, .search-form button {
            font-size: 1rem;
            padding: 0.7rem;
            border-radius: 7px;
          }
          .search-results li {
            font-size: 0.98rem;
            padding: 0.7rem;
          }
        }

        /* Team Request Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal-content {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          max-width: 500px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
        }
        .modal-content h3 {
          margin: 0 0 1rem 0;
          color: #1976d2;
        }
        .modal-field {
          margin: 1.5rem 0;
        }
        .modal-field label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #333;
        }
        .modal-field textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-family: inherit;
          resize: vertical;
          min-height: 100px;
        }
        .modal-field small {
          color: #666;
          font-size: 0.85rem;
        }
        .modal-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          margin-top: 2rem;
        }
        .modal-btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.2s;
        }
        .modal-btn.secondary {
          background: #f5f5f5;
          color: #666;
        }
        .modal-btn.secondary:hover {
          background: #e0e0e0;
        }
        .modal-btn.primary {
          background: #1976d2;
          color: white;
        }
        .modal-btn.primary:hover {
          background: #115293;
        }
        
        /* Updated button styles */
        .save-btn.sent {
          background: #4caf50;
          color: white;
          cursor: not-allowed;
        }
        .save-btn.sent:hover {
          background: #4caf50;
        }

        /* Call Modal Styles */
        .call-type-options {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }
        .radio-option {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .radio-option:hover {
          background: #f8f9fa;
          border-color: #38a169;
        }
        .radio-option input[type="radio"] {
          margin: 0;
        }
        .call-info {
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 6px;
          margin: 1rem 0;
        }
        .call-info p {
          margin: 0 0 0.5rem 0;
          font-size: 0.95rem;
        }
        .call-info small {
          color: #666;
          font-size: 0.85rem;
        }
      `}</style>
      <div className="search-bg">
        <div className="search-container">
          <h2>{userRole === 'worker' ? 'Find Contractors' : 'Find Workers'}</h2>
          <form className="search-form" onSubmit={handleSearch}>
            <select
              value={skillType}
              onChange={e => setSkillType(e.target.value)}
              required
              style={{ fontSize: '1rem', padding: '0.7rem', borderRadius: 7, marginBottom: 8, width: '100%' }}
            >
              <option value="">Select Skill Type</option>
              <option value="plumber">Plumber</option>
              <option value="electrician">Electrician</option>
              <option value="carpenter">Carpenter</option>
              <option value="painter">Painter</option>
              <option value="other">Other</option>
            </select>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', gap: 16, marginBottom: 8 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <input
                    type="radio"
                    name="locationType"
                    value="name"
                    checked={locationType === 'name'}
                    onChange={() => {
                      setLocationType('name');
                      setLocation('');
                    }}
                  />
                  Location Name
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <input
                    type="radio"
                    name="locationType"
                    value="__current__"
                    checked={locationType === '__current__'}
                    onChange={async () => {
                      setLocationType('__current__');
                      if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                          async pos => {
                            const { latitude, longitude } = pos.coords;
                            try {
                              const response = await fetch(`${API_CONFIG.MATCHING_SERVICE}/api/matching/reverse-geocode?lat=${latitude}&lon=${longitude}`);
                              const data = await response.json();
                              const name = data.address?.city || data.address?.town || data.address?.village || data.address?.state || data.address?.country || data.display_name || `${latitude},${longitude}`;
                              setLocation(name);
                            } catch {
                              setLocation(`${latitude},${longitude}`);
                            }
                          },
                          () => {
                            setLocation('');
                            alert('Could not get current location');
                          }
                        );
                      } else {
                        setLocation('');
                        alert('Geolocation not supported');
                      }
                    }}
                  />
                  Current Location
                </label>
              </div>
              {locationType === '__current__' && location && (
                <div style={{ 
                  padding: '0.7rem', 
                  backgroundColor: '#f0fdf4', 
                  border: '1px solid #bbf7d0', 
                  borderRadius: '7px', 
                  fontSize: '0.9rem',
                  color: '#166534'
                }}>
                  📍 <strong>Current Location:</strong> {location}
                </div>
              )}
              {locationType === 'name' && (
                <input
                  type="text"
                  placeholder="Enter location name"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  required
                  style={{ fontSize: '1rem', padding: '0.7rem', borderRadius: 7, width: '100%' }}
                />
              )}
              {locationType === 'name' && (
                <button 
                  type="button" 
                  className="location-btn"
                  onClick={async () => {
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition(
                        async pos => {
                          const { latitude, longitude } = pos.coords;
                          try {
                            const response = await fetch(`${API_CONFIG.MATCHING_SERVICE}/api/matching/reverse-geocode?lat=${latitude}&lon=${longitude}`);
                            const data = await response.json();
                            const name = data.address?.city || data.address?.town || data.address?.village || data.address?.state || data.address?.country || data.display_name || `${latitude},${longitude}`;
                            setLocation(name);
                            setLocationType('__current__');
                          } catch {
                            setLocation(`${latitude},${longitude}`);
                            setLocationType('__current__');
                          }
                        },
                        () => alert('Could not get current location')
                      );
                    } else {
                      alert('Geolocation not supported');
                    }
                  }}
                >
                  📍 Use Current Location
                </button>
              )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="maxDistance" style={{ fontWeight: '500', fontSize: '0.9rem', color: '#374151' }}>
                Max Distance (km)
              </label>
              <input
                id="maxDistance"
                type="number"
                name="maxDistance"
                min={1}
                max={500}
                value={maxDistance}
                onChange={e => setMaxDistance(Number(e.target.value))}
                required
                placeholder="Enter maximum distance"
                style={{ fontSize: '1rem', padding: '0.7rem', borderRadius: 7, width: '100%' }}
              />
            </div>
            {/* Advanced filters button disabled for now */}
            {/* <button type="button" className="secondary-btn" onClick={() => setShowAdvanced(s => !s)}>
              {showAdvanced ? 'Hide Advanced' : 'Show Advanced Filters'}
            </button> */}
            {showAdvanced && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <select
                  value={experienceLevel}
                  onChange={e => setExperienceLevel(e.target.value)}
                  style={{ fontSize: '1rem', padding: '0.7rem', borderRadius: 7, width: '100%' }}
                >
                  <option value="">Experience Level (any)</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="expert">Expert</option>
                </select>
                <select
                  value={urgency}
                  onChange={e => setUrgency(e.target.value)}
                  style={{ fontSize: '1rem', padding: '0.7rem', borderRadius: 7, width: '100%' }}
                >
                  <option value="">Urgency (any)</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <input
                  type="number"
                  min={1}
                  value={budgetMax}
                  onChange={e => setBudgetMax(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="Max Budget / Hourly Rate"
                  style={{ fontSize: '1rem', padding: '0.7rem', borderRadius: 7, width: '100%' }}
                />
                <input
                  type="number"
                  min={1}
                  max={5}
                  step={0.1}
                  value={ratingMin}
                  onChange={e => setRatingMin(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="Minimum Rating (1-5)"
                  style={{ fontSize: '1rem', padding: '0.7rem', borderRadius: 7, width: '100%' }}
                />
              </div>
            )}
            <button type="submit">Search</button>
            <button type="button" className="secondary-btn" onClick={resetForm}>Reset</button>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem' }}>
              <input type="checkbox" checked={autoSearch} onChange={e => setAutoSearch(e.target.checked)} />
              Auto search
            </label>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <label style={{ fontSize: '0.85rem' }}>Limit:
                <select value={limit} onChange={e => { setLimit(Number(e.target.value)); setPage(1); }} style={{ marginLeft: 6 }}>
                  {[10,20,50].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </label>
              <button type="button" className="secondary-btn" disabled={page <= 1 || loading} onClick={() => executeSearch(page - 1)}>Prev</button>
              <button type="button" className="secondary-btn" disabled={page >= totalPages || loading} onClick={() => executeSearch(page + 1)}>Next</button>
              <span style={{ fontSize: '0.8rem' }}>Page {page} / {totalPages}</span>
            </div>
            <button type="button" className="secondary-btn" onClick={() => setShowRaw(r => !r)}>
              {showRaw ? 'Hide Raw' : 'Show Raw'}
            </button>
          </form>
          {loading && <div style={{ textAlign: 'center', margin: '1.5rem 0' }}><span style={{ fontSize: 22 }}>🔄</span> Searching...</div>}
          {error && <div className="search-error">{error}</div>}
          {loading && (
            <ul className="search-results skeleton-list">
              {Array.from({ length: 3 }).map((_, i) => (
                <li key={i}>
                  <div className="skeleton" style={{ width: '60%', marginBottom: 8 }} />
                  <div className="skeleton" style={{ width: '40%', marginBottom: 6 }} />
                  <div className="skeleton" style={{ width: '30%' }} />
                </li>
              ))}
            </ul>
          )}
          {!loading && (
            <>
              {/* Contractor Requirements Section (visible to workers) */}
              {userRole === 'worker' && <ContractorRequirementsList showContactButton={true} />}
              
              <div className="contractor-results">
                {results.map((match: any, idx) => {
                  const name = match.workerName || match.contractorName || match.name || 'Unknown';
                  const companyName = match.companyName || match.company_name || '';
                  const skill = match.skillType || match.skill_type || '';
                  const distance = match.distance != null ? `${Math.round(match.distance)} km away` : '';
                  const rating = match.rating != null ? Number(match.rating).toFixed(1) : '0.0';
                  const totalProjects = match.totalProjects || match.total_projects || 0;
                  const score = match.matchScore != null ? Math.round(match.matchScore) : 0;
                  const needWorker = match.needWorkerStatus || match.need_worker_status;
                  
                  return (
                    <div key={idx} className="contractor-card">
                      <div className="contractor-header">
                        <div className="contractor-title">
                          <h3>{companyName || name}</h3>
                          {needWorker && <span className="hiring-badge">Actively Hiring</span>}
                        </div>
                        <div className="contractor-rating">
                          <span className="rating-stars">
                            {'★'.repeat(Math.round(Number(rating)))}
                            {'☆'.repeat(5 - Math.round(Number(rating)))}
                          </span>
                          <span className="rating-number">{rating}</span>
                        </div>
                      </div>
                      
                      <div className="contractor-details">
                        {skill && <div className="contractor-skill">Specializes in: {skill}</div>}
                        <div className="contractor-location">{match.location}</div>
                        <div className="contractor-stats">
                          <span>{totalProjects} projects completed</span>
                          {distance && <span> • {distance}</span>}
                          {score > 0 && <span> • Match Score: {score}%</span>}
                        </div>
                      </div>
                      
                      <div className="contractor-actions">
                        {/* Debug: Show phone number */}
                        {match.phone && <div style={{fontSize: '12px', color: '#666', marginBottom: '4px'}}>Phone: {match.phone}</div>}
                        <button className="contact-btn" onClick={() => handleContactWorker(match)}>💬 Message</button>
                        <button className="call-btn" onClick={() => handleCallWorker(match)}>📞 Call</button>
                        {sentRequests.has(match.id) ? (
                          <button className="save-btn sent" disabled>Request Sent ✓</button>
                        ) : (
                          <button className="save-btn" onClick={() => handleSendRequest(match)}>Send Request</button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
          {!loading && searched && results.length === 0 && !error && (
            <div style={{ marginTop: 16, textAlign: 'center', fontSize: '0.9rem', color: '#555' }}>
              No matches yet. Try broadening your max distance or adjusting filters.
            </div>
          )}
          {showRaw && (rawPayload || rawResponse) && (
            <div style={{ marginTop: 20 }}>
              <h4 style={{ margin: '8px 0 4px 0' }}>Debug Payload</h4>
              <pre style={{ maxHeight: 180, overflow: 'auto', background: '#f1f3f5', padding: 10, borderRadius: 6, fontSize: '0.75rem' }}>{JSON.stringify(rawPayload, null, 2)}</pre>
              <h4 style={{ margin: '12px 0 4px 0' }}>Raw Response</h4>
              <pre style={{ maxHeight: 240, overflow: 'auto', background: '#f1f3f5', padding: 10, borderRadius: 6, fontSize: '0.75rem' }}>{JSON.stringify(rawResponse, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>

      {/* Team Request Modal */}
      {showRequestModal && selectedMatch && (
        <div className="modal-overlay" onClick={() => setShowRequestModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Send Team Request</h3>
            <p>Send a team request to <strong>{selectedMatch.name || selectedMatch.companyName}</strong></p>
            
            <div className="modal-field">
              <label htmlFor="request-message">Optional Message:</label>
              <textarea
                id="request-message"
                value={requestMessage}
                onChange={(e) => setRequestMessage(e.target.value)}
                placeholder="Hi! I'd like to collaborate with you on projects..."
                maxLength={500}
                rows={4}
              />
              <small>{requestMessage.length}/500 characters</small>
            </div>

            <div className="modal-actions">
              <button 
                className="modal-btn secondary" 
                onClick={() => setShowRequestModal(false)}
              >
                Cancel
              </button>
              <button 
                className="modal-btn primary" 
                onClick={() => sendTeamRequest(selectedMatch, requestMessage)}
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Worker Modal */}
      {showContactModal && selectedContactMatch && (
        <div className="modal-overlay" onClick={() => setShowContactModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Contact {userRole === 'worker' ? 'Contractor' : 'Worker'}</h3>
            <p>Send a direct message to <strong>{selectedContactMatch.name || selectedContactMatch.companyName}</strong></p>
            
            <div className="modal-field">
              <label htmlFor="contact-message">Message:</label>
              <textarea
                id="contact-message"
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="Hi! I'd like to discuss a potential project..."
                maxLength={1000}
                rows={5}
                required
              />
              <small>{contactMessage.length}/1000 characters</small>
            </div>

            <div className="modal-actions">
              <button 
                className="modal-btn secondary" 
                onClick={() => setShowContactModal(false)}
              >
                Cancel
              </button>
              <button 
                className="modal-btn primary" 
                onClick={() => sendMessage(selectedContactMatch, contactMessage)}
                disabled={!contactMessage.trim()}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Call Worker Modal */}
      {showCallModal && selectedCallMatch && (
        <div className="modal-overlay" onClick={() => setShowCallModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>📞 Call {selectedCallMatch.name || selectedCallMatch.companyName}</h3>
            <p>Choose how you'd like to connect with <strong>{selectedCallMatch.name || selectedCallMatch.companyName}</strong></p>
            
            <div className="modal-field">
              <label>Call Type:</label>
              <div className="call-type-options">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="callType"
                    value="voice"
                    checked={callType === 'voice'}
                    onChange={(e) => setCallType(e.target.value as 'voice' | 'video')}
                  />
                  📞 Voice Call
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="callType"
                    value="video"
                    checked={callType === 'video'}
                    onChange={(e) => setCallType(e.target.value as 'voice' | 'video')}
                  />
                  📹 Video Call
                </label>
              </div>
            </div>

            {selectedCallMatch.phone && (
              <div className="call-info">
                <p><strong>Phone:</strong> {selectedCallMatch.phone}</p>
                <small>Voice calls will open your device's phone app</small>
              </div>
            )}

            {!selectedCallMatch.phone && (
              <div className="call-info">
                <small>This will send a call request notification to the other person</small>
              </div>
            )}

            <div className="modal-actions">
              <button 
                className="modal-btn secondary" 
                onClick={() => setShowCallModal(false)}
              >
                Cancel
              </button>
              <button 
                className="modal-btn primary" 
                onClick={() => initiateCall(selectedCallMatch, callType)}
              >
                {callType === 'voice' ? '📞 Start Voice Call' : '📹 Start Video Call'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
