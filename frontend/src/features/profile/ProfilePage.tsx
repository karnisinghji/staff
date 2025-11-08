import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../auth/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_CONFIG } from '../../config/api';

// Helper to determine registration type (email / phone)
function getRegistrationType(username: string) {
  if (!username) return 'unknown';
  if (/^\+?\d{7,15}$/.test(username)) return 'phone';
  if (/^\S+@\S+\.\S+$/.test(username)) return 'email';
  return 'unknown';
}

interface ApiUser {
  id?: string;
  username?: string;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  location?: string | null;
  address?: string | null;
  role?: 'worker' | 'contractor';
  [key: string]: any; // allow extra backend fields
}

interface WorkerProfileData {
  skill_type?: string; // snake_case from backend
  experience_years?: number;
  hourly_rate?: number;
  availability?: string;
  description?: string;
  is_available?: boolean;
  rating?: number;
  completed_jobs?: number;
  // Potential camelCase if backend ever changes
  skillType?: string;
  experienceYears?: number;
  hourlyRate?: number;
  isAvailable?: boolean;
}

interface ContractorProfileData {
  company_name?: string;
  company_description?: string;
  verification_status?: string;
  rating?: number;
  total_jobs_posted?: number;
  companyName?: string;
  companyDescription?: string;
}

interface NormalizedProfile {
  id?: string;
  username: string;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  role?: 'worker' | 'contractor';
  location?: string | null;
  address?: string | null;
  skillType?: string | null;
  experienceYears?: number | null;
  hourlyRate?: number | null;
  availability?: string | null;
  description?: string | null;
  isAvailable?: boolean | null;
  rating?: number | null;
  completedJobs?: number | null;
  companyName?: string | null;
  companyDescription?: string | null;
  verificationStatus?: string | null;
  totalJobsPosted?: number | null;
}

const ProfilePage: React.FC = () => {
  const { user, token } = useAuth();
  const registrationType = getRegistrationType(user?.username || '');
  const isAdmin = user?.roles?.includes('admin') || user?.role === 'admin';
  // Dynamic skill type options loaded from backend
  const [skillTypeOptions, setSkillTypeOptions] = useState<{ value: string; label: string }[]>([
    { value: '', label: 'Select skill type' }
  ]);
  const [skillsLoading, setSkillsLoading] = useState(false);
  const [skillsError, setSkillsError] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  // Separate state for editing (form) and for displaying saved profile (profile)
  const emptyNormalized: NormalizedProfile = {
    username: user?.username || '',
    email: registrationType === 'email' ? user?.username || '' : '',
    phone: registrationType === 'phone' ? user?.username || '' : '',
    role: undefined,
    name: '',
    location: '',
    address: '',
    skillType: '',
    experienceYears: null,
    hourlyRate: null,
    availability: '',
    description: '',
    isAvailable: null,
    rating: null,
    completedJobs: null,
    companyName: '',
    companyDescription: '',
    verificationStatus: null,
    totalJobsPosted: null
  };
  const [profile, setProfile] = useState<NormalizedProfile>(emptyNormalized);
  const [form, setForm] = useState<NormalizedProfile>(emptyNormalized);
  const [loading, setLoading] = useState(true); // local loading for form prefill; queries also have status
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [completeness, setCompleteness] = useState<number | null>(null);
  const [missingFields, setMissingFields] = useState<string[]>([]);

  const normalize = (apiUser: ApiUser, worker?: WorkerProfileData, contractor?: ContractorProfileData): NormalizedProfile => {
    // Prefer camelCase if exists, fallback to snake_case
    const skillType = (worker?.skillType || worker?.skill_type || '') as string;
    return {
      id: apiUser.id,
      username: apiUser.username || apiUser.email || '',
      name: apiUser.name ?? null,
      email: apiUser.email ?? (registrationType === 'email' ? apiUser.username : null),
      phone: apiUser.phone ?? (registrationType === 'phone' ? apiUser.username : null),
      role: apiUser.role,
      location: apiUser.location ?? null,
      address: apiUser.address ?? null,
      skillType: skillType || null,
      experienceYears: (worker?.experienceYears || worker?.experience_years) ?? null,
      hourlyRate: (worker?.hourlyRate || worker?.hourly_rate) ?? null,
      availability: (worker?.availability) ?? null,
      description: (worker?.description) ?? null,
      isAvailable: (worker?.isAvailable ?? worker?.is_available) ?? null,
      rating: (worker?.rating || contractor?.rating) ?? null,
  completedJobs: (worker?.completed_jobs) ?? null,
      companyName: (contractor?.companyName || contractor?.company_name) ?? null,
      companyDescription: (contractor?.companyDescription || contractor?.company_description) ?? null,
      verificationStatus: (contractor?.verification_status) ?? null,
      totalJobsPosted: (contractor?.total_jobs_posted) ?? null
    };
  };

  const fetchProfile = useCallback(async () => {
    if (!token) return null;
    const res = await axios.get(`${API_CONFIG.USER_SERVICE}/api/users/profile`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data?.data;
  }, [token]);

  const queryClient = useQueryClient();

  // Fetch profile with React Query
  const { data: profileData, isLoading: profileQueryLoading, error: profileQueryError } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
    enabled: !!token,
    staleTime: 1000 * 60,
    retry: 2,
    retryDelay: 500
  });

  // Fetch skills in parallel with React Query
  const { data: skillsData, isLoading: skillsQueryLoading } = useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      const res = await axios.get(`${API_CONFIG.USER_SERVICE}/api/users/skills`);
      return res.data?.data || [];
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 5, // Cache skills for 5 minutes
    retry: 2,
    retryDelay: 500
  });

  useEffect(() => {
    if (profileData) {
      const api = profileData;
      const apiUser: ApiUser = api.user || {};
      const worker: WorkerProfileData | undefined = apiUser.role === 'worker' ? (api.profile || undefined) : undefined;
      const contractor: ContractorProfileData | undefined = apiUser.role === 'contractor' ? (api.profile || undefined) : undefined;
      const normalized = normalize(apiUser, worker, contractor);
      setProfile(normalized);
      setForm(prev => ({ ...prev, ...normalized }));
      if (api.meta) {
        if (typeof api.meta.completeness === 'number') setCompleteness(api.meta.completeness);
        if (Array.isArray(api.meta.completenessBreakdown)) {
          const missing = api.meta.completenessBreakdown
            .filter((x: any) => !x.present)
            .map((x: any) => x.field);
          setMissingFields(missing);
        }
      }
      setLoading(false);
    } else if (!profileQueryLoading) {
      setLoading(false);
    }
  }, [profileData, profileQueryLoading]);

  // Update skillTypeOptions when skillsData changes
  useEffect(() => {
    if (skillsData) {
      const list: string[] = skillsData;
      const options = [
        { value: '', label: 'Select skill type' },
        ...list.map(s => ({ value: s, label: s.charAt(0).toUpperCase() + s.slice(1) }))
      ];
      setSkillTypeOptions(options);
      setSkillsLoading(false);
      setSkillsError('');
    } else if (!skillsQueryLoading) {
      setSkillsLoading(false);
    }
  }, [skillsData, skillsQueryLoading]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  }

  // Validation function
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    // Only validate username and email for admins
    if (isAdmin) {
      const usernameVal = form.username || '';
      if (!usernameVal.trim()) newErrors.username = 'Username is required.';
      const emailVal = form.email || '';
      if (!emailVal.trim()) newErrors.email = 'Email is required.';
      else if (!/^\S+@\S+\.\S+$/.test(emailVal)) newErrors.email = 'Invalid email address.';
    }
    
    const phoneVal = form.phone || '';
    if (phoneVal && !/^\+?[0-9]{7,15}$/.test(phoneVal)) newErrors.phone = 'Invalid phone number.';
    const locationVal = form.location || '';
    if (!locationVal.trim()) newErrors.location = 'Location is required.';
    const addressVal = form.address || '';
    if (!addressVal.trim()) newErrors.address = 'Address is required.';
    if (profile.role === 'worker' && !form.skillType) newErrors.skillType = 'Skill type is required.';
    return newErrors;
  };

  const mutation = useMutation({
    mutationFn: async (payload: { userPayload: any; workerPayload?: any; contractorPayload?: any }) => {
      const { userPayload, workerPayload, contractorPayload } = payload;
      if (Object.keys(userPayload).length > 0) {
        await axios.put(`${API_CONFIG.USER_SERVICE}/api/users/profile`, userPayload, {
          withCredentials: true,
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
      }
      if (profile.role === 'worker' && workerPayload && Object.keys(workerPayload).length > 0) {
        await axios.put(`${API_CONFIG.USER_SERVICE}/api/users/worker-profile`, workerPayload, {
          withCredentials: true,
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
      }
      if (profile.role === 'contractor' && contractorPayload && Object.keys(contractorPayload).length > 0) {
        await axios.put(`${API_CONFIG.USER_SERVICE}/api/users/contractor-profile`, contractorPayload, {
          withCredentials: true,
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
      }
      return true;
    },
    onMutate: async (vars) => {
      // Optimistic update: snapshot previous
      await queryClient.cancelQueries({ queryKey: ['profile'] });
      const prev = queryClient.getQueryData(['profile']);
      // Merge local optimistic fields into profile cache if exists
      if (prev && typeof prev === 'object') {
        const draft: any = { ...(prev as any) };
        if (vars.userPayload) {
          draft.user = { ...draft.user, ...vars.userPayload };
        }
        if (profile.role === 'worker' && vars.workerPayload) {
          draft.profile = { ...draft.profile, ...vars.workerPayload };
        }
        if (profile.role === 'contractor' && vars.contractorPayload) {
          draft.profile = { ...draft.profile, ...vars.contractorPayload };
        }
        queryClient.setQueryData(['profile'], draft);
      }
      return { prev };
    },
    onError: (_err, _vars, context) => {
      if (context?.prev) queryClient.setQueryData(['profile'], context.prev);
      toast.error('Failed to update profile.');
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('Profile updated successfully!');
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    try {
      const userPayload: any = {
        name: form.name,
        phone: form.phone,
        location: form.location
      };
      
      // Include username and email only for admin users
      if (isAdmin) {
        userPayload.username = form.username;
        userPayload.email = form.email;
      }
      
      // Remove undefined / empty strings (except allow empty phone to clear?)
      Object.keys(userPayload).forEach(k => {
        if (userPayload[k] === undefined || userPayload[k] === '') delete userPayload[k];
      });
      let workerPayload: any = undefined;
      let contractorPayload: any = undefined;
      if (profile.role === 'worker') {
        workerPayload = {
          skillType: form.skillType,
          experienceYears: form.experienceYears,
          hourlyRate: form.hourlyRate,
          availability: form.availability,
          description: form.description,
          isAvailable: form.isAvailable
        };
        Object.keys(workerPayload).forEach(k => workerPayload[k] === undefined && delete workerPayload[k]);
        if (Object.keys(workerPayload).length === 0) workerPayload = undefined;
      }
      if (profile.role === 'contractor') {
        contractorPayload = {
          companyName: form.companyName,
          companyDescription: form.companyDescription
        };
        Object.keys(contractorPayload).forEach(k => contractorPayload[k] === undefined && delete contractorPayload[k]);
        if (Object.keys(contractorPayload).length === 0) contractorPayload = undefined;
      }
      await mutation.mutateAsync({ userPayload, workerPayload, contractorPayload });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err: any) {
      const backendCode = err?.response?.data?.code;
      const backendMsg = err?.response?.data?.message || err?.response?.data?.error || '';
      
      // Handle specific error codes
      if (backendCode === 'CONFLICT' || backendMsg.toLowerCase().includes('email')) {
        setErrors(prev => ({ ...prev, email: 'This email is already in use by another account.' }));
        setError('This email is already in use by another account.');
        toast.error('This email is already in use by another account.', {
          position: 'top-right',
          autoClose: 5000
        });
      } else if (backendMsg.toLowerCase().includes('phone')) {
        setErrors(prev => ({ ...prev, phone: 'This phone number is already in use by another account.' }));
        setError('This phone number is already in use by another account.');
        toast.error('This phone number is already in use by another account.', {
          position: 'top-right',
          autoClose: 5000
        });
      } else {
        setError(backendMsg || 'Failed to update profile.');
        toast.error(backendMsg || 'Failed to update profile.', {
          position: 'top-right',
          autoClose: 5000
        });
      }
    }
  };

  // Show loading state while both profile and skills are loading
  const isPageLoading = profileQueryLoading || skillsQueryLoading || loading;

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', padding: '2rem', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #eee' }}>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      {isPageLoading && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          background: 'rgba(255,255,255,0.9)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              width: 60, 
              height: 60, 
              border: '4px solid #f3f3f3', 
              borderTop: '4px solid #43a047', 
              borderRadius: '50%', 
              animation: 'spin 1s linear infinite',
              margin: '0 auto 1rem'
            }}></div>
            <p style={{ color: '#43a047', fontWeight: 600 }}>Loading profile...</p>
          </div>
        </div>
      )}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .profile-form input, .profile-form select {
          padding: 1.1rem;
          border-radius: 14px;
          border: 1.5px solid #b2b2b2;
          font-size: 1.13rem;
          background: #f7f9fc;
          color: #000;
          box-shadow: 0 2px 8px rgba(67,160,71,0.06);
          margin-bottom: 0.5rem;
          transition: border 0.2s, box-shadow 0.2s;
        }
        .profile-form input:focus, .profile-form select:focus {
          outline: none;
          border: 1.5px solid #43a047;
          box-shadow: 0 0 0 2px #a7c95744;
          background: #f0fff0;
        }
        .profile-form select {
          background: #f7f9fc;
        }
        .profile-form button {
          padding: 1.1rem;
          border-radius: 14px;
          border: none;
          background: linear-gradient(90deg, #43a047 60%, #a7c957 100%);
          color: #fff;
          font-size: 1.13rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 2px 12px rgba(67,160,71,0.13);
          transition: background 0.2s, transform 0.1s;
        }
        .profile-form button:hover {
          background: linear-gradient(90deg, #2e7031 60%, #a7c957 100%);
          transform: translateY(-2px) scale(1.03);
        }
      `}</style>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ margin: 0 }}>My Profile</h2>
        {isAdmin && (
          <span style={{ 
            backgroundColor: '#ffd700', 
            color: '#333', 
            padding: '4px 8px', 
            borderRadius: '4px', 
            fontSize: '12px', 
            fontWeight: 'bold'
          }}>
            ADMIN
          </span>
        )}
      </div>
      {!isAdmin && (
        <div style={{ 
          backgroundColor: '#f0f8ff', 
          border: '1px solid #b3d9ff', 
          padding: '10px', 
          borderRadius: '6px', 
          marginBottom: '1rem',
          fontSize: '13px',
          color: '#1976d2'
        }}>
          🔒 <strong>Security Notice:</strong> Username and email are locked for security reasons. Contact an administrator if changes are needed.
        </div>
      )}
      {completeness !== null && (
        <div style={{ margin: '0.75rem 0 1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 4 }}>
            <span>Profile completeness</span>
            <span>{completeness}%</span>
          </div>
          <div style={{ background: '#e0e0e0', borderRadius: 8, height: 10, overflow: 'hidden', position: 'relative' }}>
            <div style={{ width: `${completeness}%`, transition: 'width 0.4s ease', background: completeness === 100 ? '#43a047' : '#64b5f6', height: '100%' }} />
          </div>
          {missingFields.length > 0 && (
            <div style={{ marginTop: 8, fontSize: 12, color: '#555' }}>
              Missing: {missingFields.join(', ')}
            </div>
          )}
        </div>
      )}
  {(loading || profileQueryLoading) && <div>Loading...</div>}
  {(error || profileQueryError) && <div style={{ color: 'red', marginBottom: 12 }}>{error || (profileQueryError as any)?.message}</div>}
  {success && <div style={{ color: 'green', marginBottom: 12 }}>Profile updated successfully!</div>}
      {!loading && (
        <form className="profile-form" onSubmit={handleSubmit} noValidate>
          <label>
            Username {!isAdmin && <span style={{ fontSize: '12px', color: '#666' }}>(locked)</span>}
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              style={{ 
                width: '100%', 
                marginBottom: 4,
                backgroundColor: !isAdmin ? '#f5f5f5' : 'white',
                cursor: !isAdmin ? 'not-allowed' : 'text'
              }}
              disabled={!isAdmin}
              title={!isAdmin ? "Username can only be modified by administrators" : ""}
            />
            {!isAdmin && <div style={{ fontSize: '11px', color: '#666', marginBottom: '8px' }}>Username can only be modified by administrators</div>}
            {errors.username && <div style={{ color: 'red', fontSize: 13 }}>{errors.username}</div>}
          </label>
          <label>
            Name
            <input
              name="name"
              value={form.name || ''}
              onChange={handleChange}
              style={{ width: '100%', marginBottom: 4 }}
              placeholder="Your display name"
            />
          </label>
          <label>
            Email {!isAdmin && <span style={{ fontSize: '12px', color: '#666' }}>(locked)</span>}
            <input
              name="email"
              type="email"
              value={form.email || ''}
              onChange={handleChange}
              required={registrationType === 'email'}
              style={{ 
                width: '100%', 
                marginBottom: 4,
                backgroundColor: !isAdmin ? '#f5f5f5' : 'white',
                cursor: !isAdmin ? 'not-allowed' : 'text'
              }}
              disabled={!isAdmin}
              placeholder={isAdmin ? "Enter your email" : "Email locked for security"}
              title={!isAdmin ? "Email can only be modified by administrators" : ""}
            />
            {!isAdmin && <div style={{ fontSize: '11px', color: '#666', marginBottom: '8px' }}>Email can only be modified by administrators</div>}
            {errors.email && <div style={{ color: 'red', fontSize: 13 }}>{errors.email}</div>}
          </label>
          <label>
            Phone
            <input
              name="phone"
              value={form.phone || ''}
              onChange={handleChange}
              required={registrationType === 'phone'}
              style={{ width: '100%', marginBottom: 4 }}
              disabled={registrationType === 'phone' && !!form.phone}
              placeholder="Enter your phone number"
            />
            {errors.phone && <div style={{ color: 'red', fontSize: 13 }}>{errors.phone}</div>}
          </label>
          {profile.role === 'worker' && (
            <>
              <label>
                Skill Type
                <select
                  name="skillType"
                  value={form.skillType || ''}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', marginBottom: 4 }}
                >
                  {skillTypeOptions.map(opt => (
                    <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.skillType && <div style={{ color: 'red', fontSize: 13 }}>{errors.skillType}</div>}
                {skillsLoading && <div style={{ fontSize: 12, color: '#888' }}>Loading skills...</div>}
                {skillsError && <div style={{ fontSize: 12, color: 'red' }}>{skillsError}</div>}
              </label>
              <label>
                Experience Years
                <input name="experienceYears" value={form.experienceYears ?? ''} onChange={handleChange} type="number" style={{ width: '100%', marginBottom: 4 }} min={0} />
              </label>
              <label>
                Hourly Rate
                <input name="hourlyRate" value={form.hourlyRate ?? ''} onChange={handleChange} type="number" style={{ width: '100%', marginBottom: 4 }} min={0} />
              </label>
              <label>
                Availability
                <input name="availability" value={form.availability || ''} onChange={handleChange} style={{ width: '100%', marginBottom: 4 }} />
              </label>
              <label>
                Description
                <input name="description" value={form.description || ''} onChange={handleChange} style={{ width: '100%', marginBottom: 4 }} />
              </label>
              <label>
                Is Available
                <select name="isAvailable" value={form.isAvailable === null || form.isAvailable === undefined ? '' : String(form.isAvailable)} onChange={(e) => setForm(f => ({ ...f, isAvailable: e.target.value === '' ? null : e.target.value === 'true' }))} style={{ width: '100%', marginBottom: 4 }}>
                  <option value="">Select...</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </label>
            </>
          )}
          {profile.role === 'contractor' && (
            <>
              <label>
                Company Name
                <input name="companyName" value={form.companyName || ''} onChange={handleChange} style={{ width: '100%', marginBottom: 4 }} />
              </label>
              <label>
                Company Description
                <input name="companyDescription" value={form.companyDescription || ''} onChange={handleChange} style={{ width: '100%', marginBottom: 4 }} />
              </label>
            </>
          )}
          <label>
            Location
            <input name="location" value={form.location || ''} onChange={handleChange} required style={{ width: '100%', marginBottom: 4 }} placeholder="Enter your location" />
            {errors.location && <div style={{ color: 'red', fontSize: 13 }}>{errors.location}</div>}
          </label>
          <label>
            Address
            <input name="address" value={form.address || ''} onChange={handleChange} required style={{ width: '100%', marginBottom: 4 }} />
            {errors.address && <div style={{ color: 'red', fontSize: 13 }}>{errors.address}</div>}
          </label>
          {/* Removed duplicate Skill Type field */}
          <button type="submit" disabled={mutation.isPending} style={{ padding: '0.7rem 2rem', background: mutation.isPending ? '#90a4ae' : '#1976d2', color: '#fff', border: 'none', borderRadius: 8, marginTop: 12 }}>
            {mutation.isPending ? 'Saving...' : 'Save'}
          </button>
        </form>
      )}
      {/* Profile summary display */}
      {!loading && (
        <div style={{ marginTop: 32, background: '#f7f7f7', borderRadius: 8, padding: 16 }}>
          <h3 style={{ marginTop: 0 }}>Profile Summary</h3>
          <div><b>Username:</b> {profile.username}</div>
          <div><b>Registered via:</b> {getRegistrationType(profile.username)}</div>
          <div><b>Role:</b> {profile.role || <span style={{ color: '#aaa' }}>Not set</span>}</div>
          <div><b>Name:</b> {profile.name || <span style={{ color: '#aaa' }}>Not set</span>}</div>
          <div><b>Email:</b> {profile.email || <span style={{ color: '#aaa' }}>Not set</span>}</div>
          <div><b>Phone:</b> {profile.phone || <span style={{ color: '#aaa' }}>Not set</span>}</div>
          {profile.role === 'worker' && (
            <>
              <div><b>Skill Type:</b> {profile.skillType ? (skillTypeOptions.find(opt => opt.value === profile.skillType)?.label || profile.skillType) : <span style={{ color: '#aaa' }}>Not set</span>}</div>
              <div><b>Experience Years:</b> {profile.experienceYears ?? <span style={{ color: '#aaa' }}>Not set</span>}</div>
              <div><b>Hourly Rate:</b> {profile.hourlyRate !== null && profile.hourlyRate !== undefined ? `$${profile.hourlyRate}` : <span style={{ color: '#aaa' }}>Not set</span>}</div>
              <div><b>Availability:</b> {profile.availability || <span style={{ color: '#aaa' }}>Not set</span>}</div>
              <div><b>Description:</b> {profile.description || <span style={{ color: '#aaa' }}>Not set</span>}</div>
              <div><b>Is Available:</b> {profile.isAvailable === null || profile.isAvailable === undefined ? <span style={{ color: '#aaa' }}>Not set</span> : profile.isAvailable ? 'Yes' : 'No'}</div>
              <div><b>Worker Rating:</b> {profile.rating ?? <span style={{ color: '#aaa' }}>Not set</span>}</div>
              <div><b>Completed Jobs:</b> {profile.completedJobs ?? <span style={{ color: '#aaa' }}>Not set</span>}</div>
            </>
          )}
          {profile.role === 'contractor' && (
            <>
              <div><b>Company Name:</b> {profile.companyName || <span style={{ color: '#aaa' }}>Not set</span>}</div>
              <div><b>Company Description:</b> {profile.companyDescription || <span style={{ color: '#aaa' }}>Not set</span>}</div>
              <div><b>Verification Status:</b> {profile.verificationStatus || <span style={{ color: '#aaa' }}>Not set</span>}</div>
              <div><b>Rating:</b> {profile.rating ?? <span style={{ color: '#aaa' }}>Not set</span>}</div>
              <div><b>Total Jobs Posted:</b> {profile.totalJobsPosted ?? <span style={{ color: '#aaa' }}>Not set</span>}</div>
            </>
          )}
          <div><b>Location:</b> {profile.location || <span style={{ color: '#aaa' }}>Not set</span>}</div>
          <div><b>Address:</b> {profile.address || <span style={{ color: '#aaa' }}>Not set</span>}</div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
