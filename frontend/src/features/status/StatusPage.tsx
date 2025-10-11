import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_CONFIG } from '../../config/api';

interface WorkerProfile {
  isAvailable?: boolean;
  is_available?: boolean; // snake_case from database
  availabilityExpiresAt?: string;
  availability_expires_at?: string; // snake_case from database
}

interface ProfileData {
  user: {
    id: string;
    username: string;
    role: 'worker' | 'contractor';
    name?: string;
  };
  workerProfile?: WorkerProfile;
}

const StatusPage: React.FC = () => {
  const { user, token } = useAuth();
  const queryClient = useQueryClient();
  const [isAvailable, setIsAvailable] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  
  // Contractor requirement state (ALL hooks must be at top level)
  const [requiredWorkers, setRequiredWorkers] = useState<number | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch current profile to get availability status
  const { data: profileData, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      if (!token) return null;
      const res = await axios.get(`${API_CONFIG.USER_SERVICE}/api/users/profile`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data?.data as ProfileData;
    },
    enabled: !!token
  });

  // Mutation to update availability status
  const mutation = useMutation({
    mutationFn: async (available: boolean) => {
      await axios.put(
        `${API_CONFIG.USER_SERVICE}/api/users/worker-profile`,
        { isAvailable: available },
        {
          withCredentials: true,
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        }
      );
      return available;
    },
    onSuccess: (newStatus) => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success(
        newStatus 
          ? '✅ You are now visible in My Team section!' 
          : '⏸️ You are now hidden from My Team section'
      );
    },
    onError: () => {
      toast.error('Failed to update availability status');
      // Revert optimistic update
      setIsAvailable(!isAvailable);
    }
  });

  useEffect(() => {
    if (profileData) {
      if (profileData.user.role === 'worker' && profileData.workerProfile) {
        // Handle both camelCase and snake_case field names
        const available = profileData.workerProfile.isAvailable ?? profileData.workerProfile.is_available ?? false;
        setIsAvailable(available);
      }
    }
  }, [profileData]);

  // Profile data loaded - state updated

  // Timer effect for countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    // Handle both camelCase and snake_case field names
    const expiresAt = profileData?.workerProfile?.availabilityExpiresAt ?? profileData?.workerProfile?.availability_expires_at;
    if (isAvailable && expiresAt) {
      const updateTimer = () => {
        const expiryTime = new Date(expiresAt).getTime();
        const now = new Date().getTime();
        const difference = expiryTime - now;

        if (difference > 0) {
          const hours = Math.floor(difference / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);
          
          setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
        } else {
          setTimeRemaining('Expired');
          // Refresh the profile data to get updated status
          queryClient.invalidateQueries({ queryKey: ['profile'] });
        }
      };

      updateTimer(); // Initial call
      interval = setInterval(updateTimer, 1000);
    } else {
      setTimeRemaining('');
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAvailable, profileData?.workerProfile?.availabilityExpiresAt, queryClient]);

  const handleToggle = () => {
    const newStatus = !isAvailable;
    // Optimistic update
    setIsAvailable(newStatus);
    mutation.mutate(newStatus);
  };

  if (!user || !token) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Please log in to manage your status.</p>
      </div>
    );
  }

  // Show loading while fetching profile
  if (isLoading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Loading your profile...</p>
      </div>
    );
  }

  // Check user role from multiple sources (AuthContext or profile data)
  const userRole = profileData?.user?.role || user?.role || user?.roles?.[0];
  
  // Role determined from profile data or context

  const handleRequirementSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMsg('');
    setErrorMsg('');
    try {
      await axios.post(`${API_CONFIG.MATCHING_SERVICE}/api/matching/contractor-requirements`, {
        requiredWorkers: Number(requiredWorkers)
      }, {
        withCredentials: true,
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      setSuccessMsg('Requirement submitted successfully!');
      setRequiredWorkers('');
    } catch (err) {
      setErrorMsg('Failed to submit requirement.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (userRole !== 'worker') {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Status Management</h2>
        <p style={{ color: '#666', marginTop: '1rem' }}>
          As a contractor, you can specify how many workers you require.
        </p>
        <form onSubmit={handleRequirementSubmit} style={{ marginTop: '2rem' }}>
          <label htmlFor="requiredWorkers" style={{ fontWeight: 500, fontSize: '16px' }}>
            Number of workers required:
          </label>
          <input
            id="requiredWorkers"
            type="number"
            min={1}
            value={requiredWorkers}
            onChange={e => setRequiredWorkers(e.target.value === '' ? '' : Number(e.target.value))}
            style={{ marginLeft: '1rem', padding: '0.5rem', fontSize: '16px', width: '80px' }}
            required
          />
          <button
            type="submit"
            disabled={isSubmitting || requiredWorkers === ''}
            style={{ marginLeft: '1rem', padding: '0.5rem 1.5rem', fontSize: '16px', background: '#2196F3', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
        {successMsg && <div style={{ color: 'green', marginTop: '1rem' }}>{successMsg}</div>}
        {errorMsg && <div style={{ color: 'red', marginTop: '1rem' }}>{errorMsg}</div>}
      </div>
    );
  }

  return (
    <div className="responsive-container page-wrapper" style={{ 
      maxWidth: '600px', 
      background: '#fff',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
    }}>
      <ToastContainer position="top-right" autoClose={3000} />
      
      <style>{`
        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 80px;
          height: 40px;
          min-height: 44px; /* Touch-friendly */
        }
        
        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: .4s;
          border-radius: 40px;
        }
        
        .slider:before {
          position: absolute;
          content: "";
          height: 32px;
          width: 32px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        input:checked + .slider {
          background-color: #4CAF50;
        }
        
        input:checked + .slider:before {
          transform: translateX(40px);
        }
        
        .status-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 2rem;
          border-radius: 12px;
          margin-bottom: 2rem;
          text-align: center;
        }
        
        .status-card.available {
          background: linear-gradient(135deg, #43a047 0%, #66bb6a 100%);
        }
        
        .status-card.busy {
          background: linear-gradient(135deg, #e53935 0%, #ef5350 100%);
        }
        
        .info-box {
          background: #f5f5f5;
          padding: 1.5rem;
          border-radius: 8px;
          margin-top: 1.5rem;
          border-left: 4px solid #2196F3;
        }
      `}</style>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h2 style={{ margin: 0, color: '#333' }}>Work Status</h2>
          <p style={{ color: '#666', fontSize: '14px', margin: '0.25rem 0 0 0' }}>
            Control your visibility in the "My Team" section
          </p>
        </div>
        <button 
          className="responsive-button touch-target"
          onClick={() => queryClient.invalidateQueries({ queryKey: ['profile'] })}
          style={{
            background: '#2196F3',
            color: 'white',
            border: 'none',
            fontSize: '14px'
          }}
        >
          🔄 Refresh
        </button>
      </div>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Loading status...</p>
        </div>
      ) : (
        <>
          <div className={`status-card ${isAvailable ? 'available' : 'busy'}`}>
            <div style={{ fontSize: '48px', marginBottom: '1rem' }}>
              {isAvailable ? '✅' : '⏸️'}
            </div>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '24px' }}>
              {isAvailable ? 'Available for Work' : 'Not Available / Busy'}
            </h3>
            <p style={{ margin: '0 0 0.5rem 0', opacity: 0.9, fontSize: '14px' }}>
              {isAvailable 
                ? 'You are visible to contractors in My Team section'
                : 'You are hidden from My Team section'}
            </p>
            {isAvailable && timeRemaining && (
              <div style={{ 
                marginTop: '1rem', 
                padding: '0.5rem 1rem',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '20px',
                fontSize: '16px',
                fontWeight: 'bold'
              }}>
                ⏰ Auto-unavailable in: {timeRemaining}
              </div>
            )}
          </div>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '1.5rem',
            background: '#fafafa',
            borderRadius: '8px',
            marginBottom: '1.5rem'
          }}>
            <div>
              <h4 style={{ margin: '0 0 0.25rem 0', color: '#333' }}>Availability Status</h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>
                Toggle to change your status
              </p>
            </div>
            
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={isAvailable}
                onChange={handleToggle}
                disabled={mutation.isPending}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="info-box">
            <h4 style={{ marginTop: 0, color: '#1976d2' }}>ℹ️ How it works</h4>
            <ul style={{ 
              margin: 0, 
              paddingLeft: '1.5rem', 
              fontSize: '14px',
              lineHeight: '1.8',
              color: '#555'
            }}>
              <li>
                <strong>Available:</strong> Contractors can see your profile in their "My Team" section 
                and can contact you for work opportunities.
              </li>
              <li>
                <strong>Not Available/Busy:</strong> Your profile is hidden from "My Team" listings. 
                You won't receive new work requests.
              </li>
              <li>
                You can change your status anytime based on your availability.
              </li>
            </ul>
          </div>

          {mutation.isPending && (
            <div style={{ 
              textAlign: 'center', 
              color: '#666', 
              fontSize: '14px',
              marginTop: '1rem'
            }}>
              Updating status...
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StatusPage;