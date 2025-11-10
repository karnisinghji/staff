import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../auth/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useAutoSave } from '../../hooks/useAutoSave';
import { SkillsTagInput } from '../common/SkillsTagInput';
import { ProfileSharing } from '../common/ProfileSharing';
import { PortfolioSection } from '../common/PortfolioSection';
import { API_CONFIG } from '../../config/api';
import { LocationSelector } from '../common/LocationSelector';
// import { ProfileCompletionModal } from '../common/ProfileCompletionModal';
import { useProfileCompletion, getFieldLockStatus } from '../../hooks/useProfileCompletion';
import { 
  ValidationIndicator, 
  validateField, 
  ValidationRules, 
  // ProgressIndicator,
  AnimatedSuccess 
} from '../common/ValidationComponents';
import InvitationSystem from '../invitations/InvitationSystem';

// Portfolio types
interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  projectUrl?: string;
  tags: string[];
  completedDate?: string;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  verificationUrl?: string;
}

interface SocialLink {
  platform: string;
  url: string;
  username: string;
}

// Helper to determine registration type (email / phone / oauth)
function getRegistrationType(username: string, user?: any): string {
  if (!username) {
    // If no username but user has email, assume email registration
    if (user?.email) return 'email';
    // If no username but user has phone, assume phone registration  
    if (user?.phone) return 'phone';
    return 'unknown';
  }
  
  // Check for phone number pattern
  if (/^\+?\d{7,15}$/.test(username.trim())) return 'phone';
  
  // Check for email pattern (more flexible regex)
  if (/^\S+@\S+\.\S+$/.test(username.trim())) return 'email';
  
  // Check if this might be OAuth-based registration
  if (user?.provider || user?.oauth_provider) return 'oauth';
  
  return 'email'; // Default to email if unclear
}

// Generate avatar initials
function getInitials(name?: string | null, username?: string): string {
  if (name && name.trim()) {
    return name.trim().split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  }
  if (username) {
    const cleanUsername = username.split('@')[0];
    return cleanUsername.slice(0, 2).toUpperCase();
  }
  return 'U';
}

// Generate avatar color based on name/username
function getAvatarColor(name?: string | null, username?: string): string {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57',
    '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF9F43',
    '#10AC84', '#EE5A6F', '#60A3BC', '#778CA3', '#F8B500'
  ];
  const str = name || username || 'default';
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
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
  avatar?: string | null;
  [key: string]: any; // allow extra backend fields
}

interface WorkerProfileData {
  skill_type?: string;
  experience_years?: number;
  hourly_rate?: number;
  availability?: string;
  description?: string;
  is_available?: boolean;
  rating?: number;
  completed_jobs?: number;
  skills?: string[];
  certifications?: string[];
  portfolio_links?: string[];
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
  company_website?: string;
  company_size?: string;
  established_year?: number;
  companyName?: string;
  companyDescription?: string;
}

interface NormalizedProfile {
  id?: string;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  role?: 'worker' | 'contractor';
  location?: string | null;
  address?: string | null;
  avatar?: string | null;
  skillType?: string | null;
  experienceYears?: number | null;
  hourlyRate?: number | null;
  availability?: string | null;
  description?: string | null;
  isAvailable?: boolean | null;
  rating?: number | null;
  completedJobs?: number | null;
  skills?: string[];
  certifications?: string[];
  portfolioLinks?: string[];
  companyName?: string | null;
  companyDescription?: string | null;
  verificationStatus?: string | null;
  totalJobsPosted?: number | null;
  companyWebsite?: string | null;
  companySize?: string | null;
  establishedYear?: number | null;
}

const EnhancedProfilePage: React.FC = () => {
  const { user, token } = useAuth();
  const registrationType = getRegistrationType(user?.username || '', user);
  const isAdmin = user?.roles?.includes('admin') || user?.role === 'admin';
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Helper to determine if field should be disabled due to registration method
  const isRegistrationField = (fieldName: 'email' | 'phone'): boolean => {
    if (fieldName === 'email' && registrationType === 'email') return true;
    if (fieldName === 'phone' && registrationType === 'phone') return true;
    return false;
  };
  
  // Dynamic skill type options loaded from backend
  const [skillTypeOptions, setSkillTypeOptions] = useState<{ value: string; label: string }[]>([
    { value: '', label: 'Select skill type' }
  ]);
  const [_skillsLoading, setSkillsLoading] = useState(false);
  const [_skillsError, setSkillsError] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [activeSection, setActiveSection] = useState<'basic' | 'professional' | 'portfolio' | 'sharing' | 'invitations'>('basic');
  const [autoSaveStatus, setAutoSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  
  // Avatar upload states
  const [_avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  // Separate state for editing (form) and for displaying saved profile (profile)
  const emptyNormalized: NormalizedProfile = {
    email: registrationType === 'email' ? user?.username || '' : '',
    phone: registrationType === 'phone' ? user?.username || '' : '',
    role: user?.role || undefined,
    name: '',
    location: '',
    address: '',
    avatar: null,
    skillType: '',
    experienceYears: null,
    hourlyRate: null,
    availability: '',
    description: '',
    isAvailable: null,
    rating: null,
    completedJobs: null,
    skills: [],
    certifications: [],
    portfolioLinks: [],
    companyName: '',
    companyDescription: '',
    verificationStatus: null,
    totalJobsPosted: null,
    companyWebsite: '',
    companySize: '',
    establishedYear: null
  };
  
  const [profile, setProfile] = useState<NormalizedProfile>(emptyNormalized);
  const [form, setForm] = useState<NormalizedProfile>(emptyNormalized);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [completeness, setCompleteness] = useState<number | null>(null);
  const [missingFields, setMissingFields] = useState<string[]>([]);
  
  // Enhanced states for new features
  // const [validationResults] = useState<{[key: string]: any}>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [portfolioData, setPortfolioData] = useState<{
    projects: PortfolioItem[];
    certifications: Certification[];
    socialLinks: SocialLink[];
  }>({
    projects: [],
    certifications: [],
    socialLinks: []
  });
  const [skills, setSkills] = useState<string[]>([]);

  // Profile completion states
  // const [showCompletionModal, setShowCompletionModal] = useState(false);
  const completionStatus = useProfileCompletion(profile, user);
  // const autoFillData = getAutoFillData(user);

  // Check if we should show the completion modal
  // TEMPORARILY DISABLED - Modal is disabled for some time
  useEffect(() => {
    // if (completionStatus.isFirstLogin && !loading && profile && user) {
    //   setShowCompletionModal(true);
    // }
  }, [completionStatus.isFirstLogin, loading, profile, user]);

  // Load available skills
  useEffect(() => {
    const loadSkills = async () => {
      try {
  const res = await fetch(`${API_CONFIG.USER_SERVICE}/api/users/skills`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        // Handle backend response format { success: true, data: skills }
        const data = await res.json();
        const skillsData = data?.skills || data?.data || [];
        setSkills(Array.isArray(skillsData) ? skillsData : []);
      } catch (err) {
        console.log('Failed to load skills:', err);
        // Set some default skills if API fails
        setSkills(['JavaScript', 'Python', 'React', 'Node.js', 'CSS', 'HTML', 'TypeScript', 'Vue.js', 'Angular', 'PHP']);
      }
    };
    
    if (token) {
      loadSkills();
    }
  }, [token]);

  const normalize = (apiUser: ApiUser, worker?: WorkerProfileData, contractor?: ContractorProfileData): NormalizedProfile => {
    // Very robust skillType extraction - check all possible field names and formats
    let skillType = '';
    if (worker) {
      // Check for skillType in various possible formats
      skillType = worker.skillType || 
                  worker.skill_type || 
                  (worker as any).skilltype || 
                  (worker as any).SkillType || 
                  (worker as any).SKILL_TYPE || '';
      
      // Handle case where skillType might be stored differently in response
      if (!skillType && worker.skills && Array.isArray(worker.skills) && worker.skills.length > 0) {
        skillType = worker.skills[0]; // Use first skill as primary if no explicit skillType
      }
      

    }
    
    return {
      id: apiUser.id,
      name: apiUser.name ?? null,
      email: apiUser.email ?? (registrationType === 'email' ? apiUser.username : null),
      phone: apiUser.phone ?? (registrationType === 'phone' ? apiUser.username : null),
      role: apiUser.role,
      location: apiUser.location ?? null,
      address: apiUser.address ?? null,
      avatar: apiUser.avatar ?? null,
      skillType: skillType || null,
      experienceYears: (worker?.experienceYears || worker?.experience_years) ?? null,
      hourlyRate: (worker?.hourlyRate || worker?.hourly_rate) ?? null,
      availability: (worker?.availability) ?? null,
      description: (worker?.description) ?? null,
      isAvailable: (worker?.isAvailable ?? worker?.is_available) ?? null,
      rating: (worker?.rating || contractor?.rating) ?? null,
      completedJobs: (worker?.completed_jobs) ?? null,
      skills: worker?.skills || [],
      certifications: worker?.certifications || [],
      portfolioLinks: worker?.portfolio_links || [],
      companyName: (contractor?.companyName || contractor?.company_name) ?? null,
      companyDescription: (contractor?.companyDescription || contractor?.company_description) ?? null,
      verificationStatus: (contractor?.verification_status) ?? null,
      totalJobsPosted: (contractor?.total_jobs_posted) ?? null,
      companyWebsite: contractor?.company_website ?? null,
      companySize: contractor?.company_size ?? null,
      establishedYear: contractor?.established_year ?? null
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

  const { data: profileData, isLoading: profileQueryLoading, error: profileQueryError } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
    enabled: !!token,
    staleTime: 1000 * 60
  });

  useEffect(() => {
    if (profileData) {
      const api = profileData;
      const apiUser: ApiUser = api.user || {};
      // FIX: Backend returns worker profile in 'workerProfile', not 'profile'  
      const worker: WorkerProfileData | undefined = apiUser.role === 'worker' ? (api.workerProfile || api.profile || undefined) : undefined;
      const contractor: ContractorProfileData | undefined = apiUser.role === 'contractor' ? (api.contractorProfile || api.profile || undefined) : undefined;
      const normalized = normalize(apiUser, worker, contractor);
      setProfile(normalized);
      // Convert null values to empty strings for form fields to prevent validation errors
      const formData = { ...normalized };
      if (formData.phone === null) formData.phone = '';
      if (formData.email === null) formData.email = '';
      if (formData.name === null) formData.name = '';
      if (formData.location === null) formData.location = '';
      if (formData.address === null) formData.address = '';
      
      setForm(prev => ({ ...prev, ...formData }));
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

  // Fetch available skills once
  const fetchSkills = useCallback(async () => {
    setSkillsLoading(true);
    setSkillsError('');
    try {
      const res = await axios.get(`${API_CONFIG.USER_SERVICE}/api/users/skills`);
      const list: string[] = res.data?.data || [];
      const options = [{ value: '', label: 'Select skill type' }, ...list.map(s => ({ value: s, label: s.charAt(0).toUpperCase() + s.slice(1) }))];
      setSkillTypeOptions(options);
    } catch (e) {
      setSkillsError('Failed to load skills');
    } finally {
      setSkillsLoading(false);
    }
  }, []);

  useEffect(() => { fetchSkills(); }, [fetchSkills]);

  // Avatar upload handler
  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error('File size must be less than 5MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    try {
      setUploadingAvatar(true);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to server (simulate for now)
      const formData = new FormData();
      formData.append('avatar', file);
      
      // TODO: Replace with actual upload endpoint
      // const response = await axios.post(`${API_CONFIG.USER_SERVICE}/api/users/upload-avatar`, formData, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //     'Content-Type': 'multipart/form-data'
      //   }
      // });
      
      setTimeout(() => {
        setForm(prev => ({ ...prev, avatar: URL.createObjectURL(file) }));
        toast.success('Avatar uploaded successfully!');
        setUploadingAvatar(false);
      }, 1500);
      
    } catch (error) {
      toast.error('Failed to upload avatar');
      setUploadingAvatar(false);
      setAvatarPreview(null);
    }
  };

  // Helper function to extract phone number from +91 format
  const extractPhoneNumber = (fullPhone: string): string => {
    if (fullPhone && fullPhone.startsWith('+91')) {
      return fullPhone.slice(3); // Remove +91 prefix
    }
    return fullPhone || '';
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      // For phone, we only allow digits and format to +91 prefix
      const digits = value.replace(/\D/g, ''); // Remove non-digits
      const limitedDigits = digits.slice(0, 10); // Limit to 10 digits max
      const fullPhone = limitedDigits ? `+91${limitedDigits}` : '';
      setForm({ ...form, [name]: fullPhone });
    } else {
      setForm({ ...form, [name]: value });
    }
    
    setErrors({ ...errors, [name]: '' });

    // Auto-save trigger (debounced)
    setAutoSaveStatus('saving');
    // TODO: Implement debounced auto-save
  }  // Validation function
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (isAdmin) {
      const emailVal = form.email || '';
      if (!emailVal.trim()) newErrors.email = 'Email is required.';
      else if (!/^\S+@\S+\.\S+$/.test(emailVal)) newErrors.email = 'Invalid email address.';
    }
    
    const phoneVal = form.phone || '';
    if (phoneVal) {
      if (!/^\+91[6-9]\d{9}$/.test(phoneVal)) {
        newErrors.phone = 'Phone number must be in format +91xxxxxxxxxx (10 digits starting with 6-9)';
      }
    }
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
    onError: (_err, _vars, _context) => {
      toast.error('Failed to update profile.');
      setAutoSaveStatus('error');
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('Profile updated successfully!');
      setAutoSaveStatus('saved');
      setShowSuccess(true);
      setTimeout(() => {
        setAutoSaveStatus('idle');
        setShowSuccess(false);
      }, 3000);
    }
  });

  // TEMPORARILY DISABLED - Auto-save integration
  /*
  const autoSave = useAutoSave({
    data: form,
    saveFunction: async (data: NormalizedProfile) => {
      // Only include fields that have values to avoid sending empty/null values
      const userPayload: any = {};
      if (data.name) userPayload.name = data.name;
      if (data.phone) userPayload.phone = data.phone;
      if (data.location) userPayload.location = data.location;
      if (data.address) userPayload.address = data.address;

      const workerPayload = data.role === 'worker' ? (() => {
        const payload: any = {};
        // Always include skillType, even if empty, and let cleanup handle it
        payload.skillType = data.skillType;
        if (data.skills && data.skills.length > 0) payload.skills = data.skills;
        if (data.experienceYears !== null && data.experienceYears !== undefined) payload.experienceYears = data.experienceYears;
        if (data.availability) payload.availability = data.availability;
        // if (data.hourlyRate !== null && data.hourlyRate !== undefined) payload.hourlyRate = data.hourlyRate; // DISABLED - not required at this time
        if (data.description) payload.description = data.description;
        
        // Clean up null, undefined, and empty string values
        Object.keys(payload).forEach(k => {
          if (payload[k] === undefined || payload[k] === null || payload[k] === '') {
            delete payload[k];
          }
        });
        
        return Object.keys(payload).length > 0 ? payload : undefined;
      })() : undefined;

      const contractorPayload = data.role === 'contractor' ? (() => {
        const payload: any = {};
        if (data.companyName) payload.companyName = data.companyName;
        if (data.companyDescription) payload.companyDescription = data.companyDescription;
        if (data.establishedYear !== null && data.establishedYear !== undefined) payload.establishedYear = data.establishedYear;
        if (data.totalJobsPosted !== null && data.totalJobsPosted !== undefined) payload.totalJobsPosted = data.totalJobsPosted;
        if (data.companyWebsite) payload.companyWebsite = data.companyWebsite;
        if (data.companySize) payload.companySize = data.companySize;
        return Object.keys(payload).length > 0 ? payload : undefined;
      })() : undefined;

      // Only save if there's actually data to save
      if (Object.keys(userPayload).length > 0 || workerPayload || contractorPayload) {
        await mutation.mutateAsync({ userPayload, workerPayload, contractorPayload });
      }
    },
    delay: 1500, // 1.5 second delay for auto-save
    enabled: false // TEMPORARILY DISABLED - Auto-save disabled to prevent interference with manual saves
  });
  */

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
        location: form.location,
        address: form.address
      };
      
      if (isAdmin) {

        userPayload.email = form.email;
      }
      
      Object.keys(userPayload).forEach(k => {
        if (userPayload[k] === undefined || userPayload[k] === '' || userPayload[k] === null) {
          delete userPayload[k];
        }
      });
      
      let workerPayload: any = undefined;
      let contractorPayload: any = undefined;
      
      if (profile.role === 'worker') {
        workerPayload = {
          skillType: form.skillType,
          experienceYears: form.experienceYears,
          // hourlyRate: form.hourlyRate, // DISABLED - not required at this time
          availability: form.availability,
          description: form.description,
          isAvailable: form.isAvailable,
          skills: form.skills,
          certifications: form.certifications,
          portfolioLinks: form.portfolioLinks
        };
        Object.keys(workerPayload).forEach(k => {
          if (workerPayload[k] === undefined || workerPayload[k] === null || workerPayload[k] === '') {
            delete workerPayload[k];
          }
        });
        if (Object.keys(workerPayload).length === 0) workerPayload = undefined;
      }
      
      if (profile.role === 'contractor') {
        contractorPayload = {
          companyName: form.companyName,
          companyDescription: form.companyDescription,
          companyWebsite: form.companyWebsite,
          companySize: form.companySize,
          establishedYear: form.establishedYear
        };
        Object.keys(contractorPayload).forEach(k => {
          if (contractorPayload[k] === undefined || contractorPayload[k] === null || contractorPayload[k] === '') {
            delete contractorPayload[k];
          }
        });
        if (Object.keys(contractorPayload).length === 0) contractorPayload = undefined;
      }
      
      await mutation.mutateAsync({ userPayload, workerPayload, contractorPayload });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err: any) {
      const backendCode = err?.response?.data?.code;
      const backendMsg = err?.response?.data?.message || err?.response?.data?.error || '';
      
      if (backendCode === 'CONFLICT' || backendMsg.toLowerCase().includes('email')) {
        setErrors(prev => ({ ...prev, email: 'This email is already in use by another account.' }));
        setError('This email is already in use by another account.');
        toast.error('This email is already in use by another account.');
      } else if (backendMsg.toLowerCase().includes('phone')) {
        setErrors(prev => ({ ...prev, phone: 'This phone number is already in use by another account.' }));
        setError('This phone number is already in use by another account.');
        toast.error('This phone number is already in use by another account.');
      } else {
        setError(backendMsg || 'Failed to update profile.');
        toast.error(backendMsg || 'Failed to update profile.');
      }
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: i < rating ? '#FFD700' : '#DDD', fontSize: '1.2em' }}>
        ★
      </span>
    ));
  };

  if (loading || profileQueryLoading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            border: '4px solid rgba(255,255,255,0.3)', 
            borderTop: '4px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }} />
          <div>Loading your profile...</div>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      
      {/* Profile Completion Modal - TEMPORARILY DISABLED */}
      {/* {showCompletionModal && (
        <ProfileCompletionModal
          isOpen={showCompletionModal}
          userData={{
            username: user?.username || '',
            email: autoFillData.email,
            phone: autoFillData.phone,
            registrationType: autoFillData.registrationType
          }}
          availableSkills={skills}
          onComplete={(profileData: any) => {
            setProfile(profileData);
            setForm(profileData);
            setShowCompletionModal(false);
            toast.success('Profile completed successfully! Welcome to the platform.');
          }}
          onSkipForNow={() => setShowCompletionModal(false)}
        />
      )} */}
      
      {/* Modern Profile Styles */}
      <style>{`
        .enhanced-profile {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 2rem 1rem;
          font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        .profile-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 350px 1fr;
          gap: 2rem;
          align-items: start;
        }
        
        .profile-sidebar {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          position: sticky;
          top: 2rem;
        }
        
        .profile-main {
          background: #f0f2f5;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        
        .avatar-section {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .avatar-wrapper {
          position: relative;
          display: inline-block;
          margin-bottom: 1rem;
        }
        
        .avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5em;
          font-weight: bold;
          color: white;
          margin: 0 auto;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .avatar:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
        
        .avatar-upload-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          color: white;
          font-size: 0.9em;
          border-radius: 50%;
        }
        
        .avatar:hover .avatar-upload-overlay {
          opacity: 1;
        }
        
        .profile-name {
          font-size: 1.5em;
          font-weight: 700;
          margin: 0.5rem 0;
          color: #2d3748;
          text-align: center;
          width: 100%;
        }
        
        .profile-role {
          display: inline-block;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 0.3rem 1rem;
          border-radius: 20px;
          font-size: 0.9em;
          font-weight: 600;
          text-transform: capitalize;
          margin: 0.5rem auto;
        }
        
        .completeness-card {
          background: #f7fafc;
          border-radius: 12px;
          padding: 1.5rem;
          margin: 1.5rem 0;
        }
        
        .completeness-bar {
          width: 100%;
          height: 8px;
          background: #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
          margin: 0.5rem 0;
        }
        
        .completeness-fill {
          height: 100%;
          background: linear-gradient(90deg, #48bb78 0%, #38a169 100%);
          transition: width 0.3s ease;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-top: 1.5rem;
        }
        
        .stat-card {
          background: #f7fafc;
          border-radius: 12px;
          padding: 1rem;
          text-align: center;
        }
        
        .stat-number {
          font-size: 1.5em;
          font-weight: 700;
          color: #2d3748;
        }
        
        .stat-label {
          font-size: 0.8em;
          color: #718096;
          margin-top: 0.25rem;
        }

        .sidebar-section {
          background: #f7fafc;
          border-radius: 12px;
          padding: 1rem;
          margin-top: 1rem;
          border: 1px solid #e2e8f0;
        }

        .sidebar-section-title {
          margin: 0 0 0.75rem 0;
          font-size: 0.9em;
          font-weight: 700;
          color: #2d3748;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .sidebar-details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .detail-item {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.85em;
        }

        .detail-label {
          font-weight: 600;
          color: #4a5568;
          min-width: 60px;
          flex-shrink: 0;
        }

        .detail-value {
          color: #2d3748;
          flex: 1;
          word-break: break-word;
        }

        .registration-badge {
          font-size: 0.8em;
          background: #e6fffa;
          color: #234e52;
          padding: 0.1rem 0.3rem;
          border-radius: 4px;
          margin-left: 0.25rem;
        }

        .skill-badge {
          background: #667eea;
          color: white;
          padding: 0.2rem 0.5rem;
          border-radius: 6px;
          font-size: 0.8em;
          font-weight: 600;
        }

        .skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.25rem;
          align-items: center;
        }

        .skill-tag-mini {
          background: #e2e8f0;
          color: #4a5568;
          padding: 0.1rem 0.4rem;
          border-radius: 4px;
          font-size: 0.7em;
          font-weight: 500;
        }

        .skill-more {
          color: #718096;
          font-size: 0.7em;
          font-style: italic;
        }

        .availability-badge {
          padding: 0.2rem 0.5rem;
          border-radius: 6px;
          font-size: 0.8em;
          font-weight: 600;
        }

        .availability-badge.available {
          background: #c6f6d5;
          color: #276749;
        }

        .availability-badge.unavailable {
          background: #fed7d7;
          color: #742a2a;
        }
        
        .section-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
          border-bottom: 2px solid #e2e8f0;
        }
        
        .tab-button {
          padding: 0.75rem 1.5rem;
          border: none;
          background: none;
          color: #718096;
          font-weight: 600;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: all 0.3s ease;
        }
        
        .tab-button.active {
          color: #667eea;
          border-bottom-color: #667eea;
        }
        
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-group.full-width {
          grid-column: 1 / -1;
        }
        
        .form-label {
          display: block;
          font-weight: 600;
          color: #111b21;
          margin-bottom: 0.5rem;
          font-size: 14px;
        }
        
        .form-input {
          width: 100%;
          padding: 10px 16px;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          color: #111b21;
          transition: all 0.2s ease;
          background: #ffffff;
          box-sizing: border-box;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }
        
        .form-input:focus {
          outline: none;
          background: #ffffff;
          box-shadow: 0 0 0 2px #00a884, 0 1px 2px rgba(0, 0, 0, 0.05);
        }
        
        .form-input:disabled {
          background: #f0f2f5;
          color: #8696a0;
          cursor: not-allowed;
        }
        
        .form-input::placeholder {
          color: #8696a0;
        }
        
        .form-textarea {
          min-height: 100px;
          resize: vertical;
          font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
          line-height: 1.6;
          padding: 12px 16px;
        }
        
        .form-error {
          color: #e53e3e;
          font-size: 0.8em;
          margin-top: 0.25rem;
        }
        
        select.form-input {
          background: #ffffff;
          cursor: pointer;
          padding-right: 40px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23667781' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
        }
        
        .save-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 0.75rem 2rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
        }
        
        .save-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
        }
        
        .save-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
        
        .auto-save-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8em;
          color: #718096;
          margin-left: 1rem;
        }
        
        .skills-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }
        
        .skill-tag {
          background: #e6fffa;
          color: #234e52;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8em;
          border: 1px solid #b2f5ea;
        }
        
        @media (max-width: 768px) {
          .enhanced-profile {
            padding: 1rem 0;
            width: 100%;
            max-width: 100vw;
            overflow-x: hidden;
          }
          
          .profile-container {
            grid-template-columns: 1fr;
            gap: 1rem;
            width: 100%;
            max-width: 100%;
            padding: 0 0.5rem;
            box-sizing: border-box;
          }
          
          .profile-sidebar {
            position: static;
            padding: 1.5rem;
            width: 100%;
            box-sizing: border-box;
          }
          
          .profile-main {
            padding: 1.5rem;
            width: 100%;
            box-sizing: border-box;
          }
          
          .form-grid {
            grid-template-columns: 1fr;
          }
          
          .avatar {
            width: 100px;
            height: 100px;
          }
          
          .section-title {
            font-size: 1.3em;
          }
          
          input.form-input, textarea.form-input, select.form-input {
            font-size: 15px;
            padding: 10px 14px;
            width: 100%;
            box-sizing: border-box;
          }
          
          textarea.form-input {
            min-height: 120px;
            padding: 12px 14px;
          }
        }
        
        @media (max-width: 480px) {
          .enhanced-profile {
            padding: 0.5rem 0;
          }
          
          .profile-container {
            padding: 0 0.25rem;
          }
          
          .profile-sidebar, .profile-main {
            padding: 1rem;
            border-radius: 12px;
          }
          
          .avatar {
            width: 80px;
            height: 80px;
          }
          
          .form-group {
            margin-bottom: 1rem;
          }
          
          input.form-input, textarea.form-input, select.form-input {
            font-size: 15px;
            padding: 10px 12px;
          }
          
          textarea.form-input {
            padding: 12px 12px;
          }
          
          .section-tabs {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }
          
          .tab-button {
            padding: 0.625rem 1rem;
            font-size: 0.9em;
          }
        }
      `}</style>

      <div className="enhanced-profile">
        <div className="profile-container">
          {/* Sidebar */}
          <div className="profile-sidebar">
            {/* Avatar Section */}
            <div className="avatar-section">
              <div className="avatar-wrapper">
                <div 
                  className="avatar"
                  style={{ 
                    backgroundImage: form.avatar ? `url(${form.avatar})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: form.avatar ? 'transparent' : getAvatarColor(form.name, user?.username)
                  }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {!form.avatar && getInitials(form.name, user?.username)}
                  <div className="avatar-upload-overlay">
                    {uploadingAvatar ? '⏳' : '📷 Upload'}
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  style={{ display: 'none' }}
                />
              </div>
              
              <div className="profile-name">
                {form.name || user?.username || 'User'}
              </div>
              
              {form.role && (
                <div className="profile-role">
                  {form.role}
                </div>
              )}
              
              {form.rating && (
                <div style={{ margin: '1rem 0' }}>
                  {renderStars(form.rating)}
                  <div style={{ fontSize: '0.8em', color: '#718096', marginTop: '0.25rem' }}>
                    {form.rating}/5 Rating
                  </div>
                </div>
              )}
            </div>

            {/* Profile Completeness */}
            {completeness !== null && (
              <div className="completeness-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: '600', color: '#2d3748' }}>Profile Completeness</span>
                  <span style={{ fontWeight: '700', color: '#667eea' }}>{completeness}%</span>
                </div>
                <div className="completeness-bar">
                  <div 
                    className="completeness-fill" 
                    style={{ width: `${completeness}%` }}
                  />
                </div>
                {missingFields.length > 0 && (
                  <div style={{ fontSize: '0.8em', color: '#718096', marginTop: '0.5rem' }}>
                    Missing: {missingFields.join(', ')}
                  </div>
                )}
              </div>
            )}



            {/* Stats */}
            <div className="stats-grid">
              {form.role === 'worker' && (
                <>
                  <div className="stat-card">
                    <div className="stat-number">{form.completedJobs || 0}</div>
                    <div className="stat-label">Jobs Done</div>
                  </div>
                  {/* TEMPORARILY DISABLED - Hourly Rate not required for now */}
                  {/* <div className="stat-card">
                    <div className="stat-number">
                      {form.hourlyRate ? `$${form.hourlyRate}` : 'N/A'}
                    </div>
                    <div className="stat-label">Hourly Rate</div>
                  </div> */}
                </>
              )}
              
              {form.role === 'contractor' && (
                <>
                  <div className="stat-card">
                    <div className="stat-number">{form.totalJobsPosted || 0}</div>
                    <div className="stat-label">Jobs Posted</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-number">
                      {form.establishedYear || 'N/A'}
                    </div>
                    <div className="stat-label">Established</div>
                  </div>
                </>
              )}
            </div>

            {/* Contact Information */}
            <div className="sidebar-section">
              <h4 className="sidebar-section-title">📞 Contact Info</h4>
              <div className="sidebar-details">
                {form.email && (
                  <div className="detail-item">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{form.email}</span>
                    {isRegistrationField('email') && <span className="registration-badge">📧</span>}
                  </div>
                )}
                {form.phone && (
                  <div className="detail-item">
                    <span className="detail-label">Phone:</span>
                    <span className="detail-value">{form.phone}</span>
                    {isRegistrationField('phone') && <span className="registration-badge">📱</span>}
                  </div>
                )}
                {form.location && (
                  <div className="detail-item">
                    <span className="detail-label">Location:</span>
                    <span className="detail-value">{form.location}</span>
                  </div>
                )}
                {form.address && (
                  <div className="detail-item">
                    <span className="detail-label">Address:</span>
                    <span className="detail-value">{form.address}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Professional Details */}
            {(form.skillType || form.skills?.length || form.experienceYears /* || form.hourlyRate */) && (
              <div className="sidebar-section">
                <h4 className="sidebar-section-title">💼 Professional</h4>
                <div className="sidebar-details">
                  {form.skillType && (
                    <div className="detail-item">
                      <span className="detail-label">Primary Skill:</span>
                      <span className="detail-value skill-badge">{form.skillType}</span>
                    </div>
                  )}
                  {form.experienceYears && (
                    <div className="detail-item">
                      <span className="detail-label">Experience:</span>
                      <span className="detail-value">{form.experienceYears} years</span>
                    </div>
                  )}
                  {form.skills && form.skills.length > 0 && (
                    <div className="detail-item">
                      <span className="detail-label">Skills:</span>
                      <div className="skills-list">
                        {form.skills.slice(0, 3).map(skill => (
                          <span key={skill} className="skill-tag-mini">{skill}</span>
                        ))}
                        {form.skills.length > 3 && (
                          <span className="skill-more">+{form.skills.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  )}
                  {/* TEMPORARILY DISABLED - Availability Status not required for now */}
                  {/* {form.isAvailable !== null && (
                    <div className="detail-item">
                      <span className="detail-label">Status:</span>
                      <span className={`availability-badge ${form.isAvailable ? 'available' : 'unavailable'}`}>
                        {form.isAvailable ? '🟢 Available' : '🔴 Unavailable'}
                      </span>
                    </div>
                  )} */}
                </div>
              </div>
            )}

            {/* Account Details */}
            <div className="sidebar-section">
              <h4 className="sidebar-section-title">🔐 Account</h4>
              <div className="sidebar-details">
                <div className="detail-item">
                  <span className="detail-label">Registration:</span>
                  <span className="detail-value">
                    {registrationType === 'email' && 'Email based'}
                    {registrationType === 'phone' && 'Phone based'}
                    {registrationType === 'oauth' && 'OAuth based'}
                    {registrationType === 'unknown' && 'Standard account'}
                  </span>
                </div>
                {(profile as any).profileCompletedAt && (
                  <div className="detail-item">
                    <span className="detail-label">Completed:</span>
                    <span className="detail-value">
                      {new Date((profile as any).profileCompletedAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {(profile as any).profileLockedAt && (
                  <div className="detail-item">
                    <span className="detail-label">Secured:</span>
                    <span className="detail-value">🔒 Locked</span>
                  </div>
                )}
              </div>
            </div>

            {/* Admin Badge */}
            {isAdmin && (
              <div style={{ 
                background: 'linear-gradient(135deg, #ffd700 0%, #ff8c00 100%)',
                color: '#333',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                textAlign: 'center',
                fontWeight: '700',
                marginTop: '1rem'
              }}>
                🔒 ADMIN ACCESS
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="profile-main">
            {/* Section Tabs */}
            <div className="section-tabs">
              <button 
                className={`tab-button ${activeSection === 'basic' ? 'active' : ''}`}
                onClick={() => setActiveSection('basic')}
              >
                Basic Info
              </button>
              <button 
                className={`tab-button ${activeSection === 'professional' ? 'active' : ''}`}
                onClick={() => setActiveSection('professional')}
              >
                Professional
              </button>
              <button 
                className={`tab-button ${activeSection === 'portfolio' ? 'active' : ''}`}
                onClick={() => setActiveSection('portfolio')}
              >
                Portfolio
              </button>
              <button 
                className={`tab-button ${activeSection === 'sharing' ? 'active' : ''}`}
                onClick={() => setActiveSection('sharing')}
              >
                Sharing
              </button>
              <button 
                className={`tab-button ${activeSection === 'invitations' ? 'active' : ''}`}
                onClick={() => setActiveSection('invitations')}
              >
                🎯 Invitations
              </button>
            </div>

            {/* TEMPORARILY DISABLED - Auto-save Status (auto-save is disabled) */}
            {/* <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              padding: '1rem',
              backgroundColor: '#f7fafc',
              borderRadius: '8px',
              marginBottom: '1rem',
              fontSize: '0.9em'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {autoSave.status === 'saving' && (
                  <>
                    <div style={{ color: '#667eea' }}>💾</div>
                    <span style={{ color: '#4a5568' }}>Saving changes...</span>
                  </>
                )}
                {autoSave.status === 'saved' && (
                  <>
                    <div style={{ color: '#48bb78' }}>✅</div>
                    <span style={{ color: '#4a5568' }}>All changes saved</span>
                  </>
                )}
                {autoSave.status === 'error' && (
                  <>
                    <div style={{ color: '#e53e3e' }}>❌</div>
                    <span style={{ color: '#4a5568' }}>Error saving changes</span>
                  </>
                )}
                {autoSave.status === 'idle' && autoSave.hasUnsavedChanges && (
                  <>
                    <div style={{ color: '#d69e2e' }}>📝</div>
                    <span style={{ color: '#4a5568' }}>Unsaved changes</span>
                  </>
                )}
                {autoSave.status === 'idle' && !autoSave.hasUnsavedChanges && (
                  <>
                    <div style={{ color: '#718096' }}>💤</div>
                    <span style={{ color: '#718096' }}>No changes</span>
                  </>
                )}
              </div>
              
              {autoSave.hasUnsavedChanges && (
                <button
                  type="button"
                  onClick={() => autoSave.saveNow()}
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.5rem 1rem',
                    fontSize: '0.8em',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  Save Now
                </button>
              )}
            </div> */}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Basic Info Section */}
              {activeSection === 'basic' && (
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      Display Name
                      {form.name && <span style={{ color: '#38b2ac', fontSize: '0.8em' }}> (pre-filled)</span>}
                      {(getFieldLockStatus(profile, 'name') && !isAdmin) && <span style={{ color: '#718096', fontSize: '0.8em' }}> (locked)</span>}
                    </label>
                    <input
                      className="form-input"
                      name="name"
                      value={form.name || ''}
                      onChange={handleChange}
                      disabled={!!(form.name && getFieldLockStatus(profile, 'name') && !isAdmin)}
                      style={{ opacity: (form.name && getFieldLockStatus(profile, 'name') && !isAdmin) ? 0.6 : 1 }}
                      placeholder={form.name ? "Display name is set" : "Your display name"}
                    />
                    {form.name && getFieldLockStatus(profile, 'name') && !isAdmin && (
                      <small style={{ color: '#38b2ac' }}>This field is locked for security.</small>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Email
                      {isRegistrationField('email') && <span style={{ color: '#38b2ac', fontSize: '0.8em' }}> (registration method)</span>}
                      {(getFieldLockStatus(profile, 'email') && !isAdmin && !isRegistrationField('email')) && <span style={{ color: '#718096', fontSize: '0.8em' }}> (locked)</span>}
                    </label>
                    <input
                      className="form-input"
                      name="email"
                      type="email"
                      value={form.email || ''}
                      onChange={handleChange}
                      disabled={isRegistrationField('email') || (getFieldLockStatus(profile, 'email') && !isAdmin)}
                      style={{ opacity: (isRegistrationField('email') || (getFieldLockStatus(profile, 'email') && !isAdmin)) ? 0.6 : 1 }}
                      placeholder={isRegistrationField('email') ? "Registration email (cannot be changed)" : (getFieldLockStatus(profile, 'email') && !isAdmin) ? "Email locked for security" : "Enter your email"}
                    />
                    {errors.email && <div className="form-error">{errors.email}</div>}
                    {isAdmin && form.email && (
                      <ValidationIndicator
                        validation={validateField({
                          fieldName: 'Email',
                          value: form.email,
                          rules: [ValidationRules.email, ValidationRules.professionalEmail],
                          required: true
                        })}
                      />
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Phone
                      {isRegistrationField('phone') && <span style={{ color: '#38b2ac', fontSize: '0.8em' }}> (registration method)</span>}
                      {(getFieldLockStatus(profile, 'phone') && !isAdmin && !isRegistrationField('phone')) && <span style={{ color: '#718096', fontSize: '0.8em' }}> (locked)</span>}
                    </label>
                    <div className="phone-input-container" style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px',
                      padding: '0',
                      backgroundColor: 'white',
                      opacity: (isRegistrationField('phone') || (getFieldLockStatus(profile, 'phone') && !isAdmin)) ? 0.6 : 1
                    }}>
                      <div className="country-code" style={{
                        padding: '12px 16px',
                        backgroundColor: '#f7fafc',
                        border: 'none',
                        borderRight: '1px solid #e2e8f0',
                        color: '#4a5568',
                        fontWeight: '500',
                        fontSize: '16px',
                        minWidth: '60px',
                        textAlign: 'center'
                      }}>
                        +91
                      </div>
                      <input
                        className="form-input"
                        name="phone"
                        value={extractPhoneNumber(form.phone || '')}
                        onChange={handleChange}
                        disabled={isRegistrationField('phone') || (getFieldLockStatus(profile, 'phone') && !isAdmin)}
                        style={{
                          border: 'none',
                          borderRadius: '0 6px 6px 0',
                          flex: 1,
                          margin: 0,
                          padding: '12px 16px',
                          fontSize: '16px'
                        }}
                        placeholder={isRegistrationField('phone') ? "Registration number (cannot be changed)" : (getFieldLockStatus(profile, 'phone') && !isAdmin) ? "Number locked for security" : "Enter your 10-digit mobile number"}
                        maxLength={10}
                        type="tel"
                      />
                    </div>
                    {errors.phone && <div className="form-error">{errors.phone}</div>}
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">
                      Location & Address
                      {(form.location || form.address) && <span style={{ color: '#38b2ac', fontSize: '0.8em' }}> (pre-filled)</span>}
                      {(getFieldLockStatus(profile, 'location') && !isAdmin) && <span style={{ color: '#718096', fontSize: '0.8em' }}> (locked)</span>}
                    </label>
                    <LocationSelector
                      location={form.location || ''}
                      address={form.address || ''}
                      onLocationChange={(location) => {
                        if (!(getFieldLockStatus(profile, 'location') && !isAdmin)) {
                          setForm(f => ({ ...f, location }));
                        }
                      }}
                      onAddressChange={(address) => {
                        if (!(getFieldLockStatus(profile, 'address') && !isAdmin)) {
                          setForm(f => ({ ...f, address }));
                        }
                      }}
                      disabled={mutation.isPending || (getFieldLockStatus(profile, 'location') && !isAdmin)}
                    />
                    {(getFieldLockStatus(profile, 'location') && !isAdmin && (form.location || form.address)) && (
                      <small style={{ color: '#38b2ac' }}>Location information is locked for security.</small>
                    )}
                    {(errors.location || errors.address) && (
                      <div className="form-error">
                        {errors.location || errors.address}
                      </div>
                    )}
                  </div>

                  {form.role === 'worker' && (
                    <div className="form-group">
                      <label className="form-label">Primary Skill</label>
                      <select
                        className="form-input"
                        name="skillType"
                        value={form.skillType || ''}
                        onChange={handleChange}
                        required
                      >
                        {skillTypeOptions.map(opt => (
                          <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      {errors.skillType && <div className="form-error">{errors.skillType}</div>}
                    </div>
                  )}
                </div>
              )}

              {/* Professional Section */}
              {activeSection === 'professional' && (
                <div className="form-grid">
                  {form.role === 'worker' && (
                    <>
                      <div className="form-group">
                        <label className="form-label">Experience (Years)</label>
                        <input
                          className="form-input"
                          name="experienceYears"
                          type="number"
                          value={form.experienceYears ?? ''}
                          onChange={handleChange}
                          min={0}
                          placeholder="Years of experience"
                        />
                      </div>

                      {/* TEMPORARILY DISABLED - Hourly Rate not required for now */}
                      {/* <div className="form-group">
                        <label className="form-label">Hourly Rate ($)</label>
                        <input
                          className="form-input"
                          name="hourlyRate"
                          type="number"
                          value={form.hourlyRate ?? ''}
                          onChange={handleChange}
                          min={0}
                          placeholder="Your hourly rate"
                        />
                        {form.hourlyRate && (
                          <ValidationIndicator
                            validation={validateField({
                              fieldName: 'Hourly Rate',
                              value: form.hourlyRate,
                              rules: [ValidationRules.hourlyRateRange, ValidationRules.minValue(5)],
                              required: false
                            })}
                          />
                        )}
                      </div> */}

                      {/* TEMPORARILY DISABLED - Availability Status not required for now */}
                      {/* <div className="form-group">
                        <label className="form-label">Availability Status</label>
                        <select
                          className="form-input"
                          name="isAvailable"
                          value={form.isAvailable === null || form.isAvailable === undefined ? '' : String(form.isAvailable)}
                          onChange={(e) => setForm(f => ({ ...f, isAvailable: e.target.value === '' ? null : e.target.value === 'true' }))}
                        >
                          <option value="">Select availability...</option>
                          <option value="true">Available</option>
                          <option value="false">Busy</option>
                        </select>
                      </div> */}

                      <div className="form-group full-width">
                        <label className="form-label">Skills</label>
                        <SkillsTagInput
                          skills={form.skills || []}
                          onSkillsChange={(newSkills) => setForm(f => ({ ...f, skills: newSkills }))}
                          availableSkills={skills}
                          placeholder="Add your skills..."
                        />
                      </div>

                      <div className="form-group full-width">
                        <label className="form-label">Professional Description</label>
                        <textarea
                          className="form-input form-textarea"
                          name="description"
                          value={form.description || ''}
                          onChange={handleChange}
                          placeholder="Describe your skills, experience, and what makes you unique..."
                        />
                      </div>
                    </>
                  )}

                  {form.role === 'contractor' && (
                    <>
                      <div className="form-group">
                        <label className="form-label">Company Name</label>
                        <input
                          className="form-input"
                          name="companyName"
                          value={form.companyName || ''}
                          onChange={handleChange}
                          placeholder="Your company name"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Company Website</label>
                        <input
                          className="form-input"
                          name="companyWebsite"
                          type="url"
                          value={form.companyWebsite || ''}
                          onChange={handleChange}
                          placeholder="https://www.yourcompany.com"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Company Size</label>
                        <select
                          className="form-input"
                          name="companySize"
                          value={form.companySize || ''}
                          onChange={handleChange}
                        >
                          <option value="">Select company size...</option>
                          <option value="1-10">1-10 employees</option>
                          <option value="11-50">11-50 employees</option>
                          <option value="51-200">51-200 employees</option>
                          <option value="201-500">201-500 employees</option>
                          <option value="500+">500+ employees</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Established Year</label>
                        <input
                          className="form-input"
                          name="establishedYear"
                          type="number"
                          value={form.establishedYear ?? ''}
                          onChange={handleChange}
                          min={1900}
                          max={new Date().getFullYear()}
                          placeholder="Year established"
                        />
                      </div>

                      <div className="form-group full-width">
                        <label className="form-label">Company Description</label>
                        <textarea
                          className="form-input form-textarea"
                          name="companyDescription"
                          value={form.companyDescription || ''}
                          onChange={handleChange}
                          placeholder="Describe your company, services, and values..."
                        />
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Portfolio Section */}
              {activeSection === 'portfolio' && (
                <PortfolioSection
                  userRole={form.role || 'worker'}
                  portfolioItems={portfolioData.projects}
                  certifications={portfolioData.certifications}
                  socialLinks={portfolioData.socialLinks}
                  onPortfolioUpdate={(items) => setPortfolioData(prev => ({ ...prev, projects: items }))}
                  onCertificationsUpdate={(certs) => setPortfolioData(prev => ({ ...prev, certifications: certs }))}
                  onSocialLinksUpdate={(links) => setPortfolioData(prev => ({ ...prev, socialLinks: links }))}
                />
              )}

              {/* Profile Sharing Section */}
              {activeSection === 'sharing' && (
                <ProfileSharing
                  profileId={user?.id || ''}
                  userName={form.name || user?.username || 'User'}
                  isPublic={false}
                  onPrivacyChange={(isPublic) => {
                    // Handle privacy toggle
                    console.log('Privacy changed:', isPublic);
                    toast.info(`Profile is now ${isPublic ? 'public' : 'private'}`);
                  }}
                />
              )}

              {/* Invitations Section */}
              {activeSection === 'invitations' && (
                <div style={{ marginTop: '1rem' }}>
                  <InvitationSystem />
                </div>
              )}

              {/* Save Button */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                marginTop: '2rem',
                paddingTop: '2rem',
                borderTop: '2px solid #e2e8f0'
              }}>
                <button
                  type="submit"
                  className="save-button"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? '💾 Saving...' : '💾 Save Profile'}
                </button>

                {/* Auto-save indicator */}
                <div className="auto-save-indicator">
                  {autoSaveStatus === 'saving' && (
                    <>⏳ Saving...</>
                  )}
                  {autoSaveStatus === 'saved' && (
                    <>✅ Saved</>
                  )}
                  {autoSaveStatus === 'error' && (
                    <>❌ Error saving</>
                  )}
                </div>
              </div>
            </form>

            {/* Error Display */}
            {(error || profileQueryError) && (
              <div style={{ 
                background: '#fed7d7',
                border: '1px solid #feb2b2',
                color: '#c53030',
                padding: '1rem',
                borderRadius: '8px',
                marginTop: '1rem'
              }}>
                {error || (profileQueryError as any)?.message}
              </div>
            )}

            {/* Success Display */}
            {success && (
              <div style={{ 
                background: '#c6f6d5',
                border: '1px solid #9ae6b4',
                color: '#2f855a',
                padding: '1rem',
                borderRadius: '8px',
                marginTop: '1rem'
              }}>
                ✅ Profile updated successfully!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Success Animation */}
      <AnimatedSuccess
        message="Profile Updated Successfully!"
        show={showSuccess}
      />
    </>
  );
};

export default EnhancedProfilePage;