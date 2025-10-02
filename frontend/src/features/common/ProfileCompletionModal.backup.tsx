import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { LocationSelector } from './LocationSelector';
import { SkillsTagInput } from './SkillsTagInput';

interface ProfileCompletionModalProps {
  isOpen: boolean;
  userData: {
    username: string;
    email?: string;
    phone?: string;
    registrationType: 'email' | 'phone' | 'unknown';
  };
  availableSkills: string[];
  onComplete: (profileData: any) => void;
  onSkipForNow?: () => void;
}

export const ProfileCompletionModal: React.FC<ProfileCompletionModalProps> = ({
  isOpen,
  userData,
  availableSkills,
  onComplete,
  onSkipForNow
}) => {
  const [formData, setFormData] = useState({
    email: userData.email || '',
    phone: userData.phone || '',
    name: '',
    location: '',
    address: '',
    skillType: '',
    skills: [] as string[]
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMobileAutofill, setShowMobileAutofill] = useState(false);

  // Auto-detect mobile and show autofill suggestions
  useEffect(() => {
    if (isOpen && 'userAgent' in navigator) {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setShowMobileAutofill(isMobile);
    }
  }, [isOpen]);

  // Auto-fill based on registration method
  useEffect(() => {
    if (userData.registrationType === 'email' && userData.email) {
      setFormData(prev => ({ ...prev, email: userData.email || '' }));
    } else if (userData.registrationType === 'phone' && userData.phone) {
      setFormData(prev => ({ ...prev, phone: userData.phone || '' }));
    }
  }, [userData]);

  const skillTypeOptions = [
    { value: '', label: 'Select your primary skill...' },
    { value: 'carpenter', label: 'Carpenter' },
    { value: 'plumber', label: 'Plumber' },
    { value: 'painter', label: 'Painter' },
    { value: 'other', label: 'Other' }
  ];

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    // All mandatory fields in single step
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.name.trim()) newErrors.name = 'Display name is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.skillType) newErrors.skillType = 'Primary skill is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onComplete(formData);
      toast.success('🎉 Profile completed successfully! Welcome to the platform!');
    } catch (error) {
      toast.error('Failed to save profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMobileAutofill = async () => {
    try {
      // Try to get mobile contact info (this requires user permission)
      if ('contacts' in navigator && 'ContactsManager' in window) {
        const contacts = await (navigator as any).contacts.select(['name', 'email', 'tel'], { multiple: false });
        if (contacts && contacts.length > 0) {
          const contact = contacts[0];
          if (contact.email && contact.email.length > 0) {
            setFormData(prev => ({ ...prev, email: contact.email[0] }));
          }
          if (contact.tel && contact.tel.length > 0) {
            setFormData(prev => ({ ...prev, phone: contact.tel[0] }));
          }
          if (contact.name && contact.name.length > 0) {
            setFormData(prev => ({ ...prev, name: contact.name[0] }));
          }
          toast.success('Contact info auto-filled!');
        }
      } else {
        toast.info('Contact auto-fill not available on this device');
      }
    } catch (error) {
      toast.error('Unable to access contact information');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        .completion-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          padding: 1rem;
        }
        
        .completion-modal {
          background: white;
          border-radius: 16px;
          max-width: 600px;
          width: 100%;
          max-height: 90vh;
          overflow: hidden;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
          animation: modalSlideIn 0.4s ease-out;
        }
        
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .modal-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 2rem;
          text-align: center;
        }
        
        .modal-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
        }
        
        .modal-subtitle {
          font-size: 1rem;
          opacity: 0.9;
          margin: 0;
        }
        
        .step-indicator {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 1rem;
        }
        
        .step-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
        }
        
        .step-dot.active {
          background: white;
          transform: scale(1.2);
        }
        
        .modal-content {
          padding: 2rem;
          max-height: 60vh;
          overflow-y: auto;
        }
        
        .form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .form-label {
          font-weight: 600;
          color: #2d3748;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .required-star {
          color: #e53e3e;
        }
        
        .form-input, .form-select {
          padding: 0.875rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        
        .form-input:focus, .form-select:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        
        .form-error {
          color: #e53e3e;
          font-size: 0.875rem;
          margin-top: 0.25rem;
        }
        
        .autofill-section {
          background: linear-gradient(135deg, #f0f9ff 0%, #dbeafe 100%);
          border: 2px dashed #3b82f6;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }
        
        .autofill-title {
          font-weight: 600;
          color: #1e40af;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .autofill-btn {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 0.75rem 1.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .autofill-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
        }
        
        .role-selector {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-top: 0.5rem;
        }
        
        .role-option {
          padding: 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          cursor: pointer;
          text-align: center;
          transition: all 0.3s ease;
        }
        
        .role-option:hover {
          border-color: #667eea;
          transform: translateY(-2px);
        }
        
        .role-option.selected {
          border-color: #667eea;
          background: linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%);
        }
        
        .role-title {
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 0.5rem;
        }
        
        .role-description {
          font-size: 0.875rem;
          color: #718096;
        }
        
        .modal-footer {
          padding: 1.5rem 2rem;
          background: #f8fafc;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .btn {
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
        }
        
        .btn-secondary {
          background: #e2e8f0;
          color: #4a5568;
        }
        
        .btn-secondary:hover {
          background: #cbd5e0;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        
        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
        }
        
        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
        
        .skip-link {
          color: #718096;
          text-decoration: underline;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 0.875rem;
        }
        
        @media (max-width: 640px) {
          .completion-modal {
            margin: 0.5rem;
            max-height: 95vh;
          }
          
          .modal-header {
            padding: 1.5rem;
          }
          
          .modal-content {
            padding: 1.5rem;
            max-height: 70vh;
          }
          
          .role-selector {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      
      <div className="completion-modal-overlay">
        <div className="completion-modal">
          <div className="modal-header">
            <h2 className="modal-title">🎉 Welcome! Complete Your Profile</h2>
            <p className="modal-subtitle">
              {currentStep === 1 ? 'Let\'s start with your basic information' : 'Almost done! Add your location and skills'}
            </p>
            
            <div className="step-indicator">
              <div className={`step-dot ${currentStep >= 1 ? 'active' : ''}`}></div>
              <div className={`step-dot ${currentStep >= 2 ? 'active' : ''}`}></div>
            </div>
          </div>
          
          <div className="modal-content">
            {/* Mobile Autofill Section */}
            {showMobileAutofill && currentStep === 1 && (
              <div className="autofill-section">
                <div className="autofill-title">
                  <span>📱</span>
                  Quick Fill from Contacts
                </div>
                <p style={{ fontSize: '0.875rem', color: '#1e40af', marginBottom: '1rem' }}>
                  Auto-fill your contact information from your device
                </p>
                <button 
                  type="button"
                  className="autofill-btn"
                  onClick={handleMobileAutofill}
                >
                  📇 Auto-fill from Contacts
                </button>
              </div>
            )}
            
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    Role <span className="required-star">*</span>
                  </label>
                  <div className="role-selector">
                    <div 
                      className={`role-option ${formData.role === 'worker' ? 'selected' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, role: 'worker' }))}
                    >
                      <div className="role-title">🔧 Worker</div>
                      <div className="role-description">I provide services</div>
                    </div>
                    <div 
                      className={`role-option ${formData.role === 'contractor' ? 'selected' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, role: 'contractor' }))}
                    >
                      <div className="role-title">🏢 Contractor</div>
                      <div className="role-description">I hire workers</div>
                    </div>
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    Username <span className="required-star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.username}
                    onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                    placeholder="Choose a unique username"
                  />
                  {errors.username && <div className="form-error">{errors.username}</div>}
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    Display Name <span className="required-star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Your full name"
                  />
                  {errors.name && <div className="form-error">{errors.name}</div>}
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    Email <span className="required-star">*</span>
                    {userData.registrationType === 'email' && <span style={{ color: '#48bb78' }}>✓ From registration</span>}
                  </label>
                  <input
                    type="email"
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <div className="form-error">{errors.email}</div>}
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    Phone Number <span className="required-star">*</span>
                    {userData.registrationType === 'phone' && <span style={{ color: '#48bb78' }}>✓ From registration</span>}
                  </label>
                  <input
                    type="tel"
                    className="form-input"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phone && <div className="form-error">{errors.phone}</div>}
                </div>
              </div>
            )}
            
            {/* Step 2: Location & Skills */}
            {currentStep === 2 && (
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    Primary Skill <span className="required-star">*</span>
                  </label>
                  <select
                    className="form-select"
                    value={formData.skillType}
                    onChange={(e) => setFormData(prev => ({ ...prev, skillType: e.target.value }))}
                  >
                    {skillTypeOptions.map(option => (
                      <option key={option.value} value={option.value} disabled={option.value === ''}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.skillType && <div className="form-error">{errors.skillType}</div>}
                </div>
                
                <div className="form-group">
                  <label className="form-label">Additional Skills</label>
                  <SkillsTagInput
                    skills={formData.skills}
                    onSkillsChange={(skills) => setFormData(prev => ({ ...prev, skills }))}
                    availableSkills={availableSkills}
                    placeholder="Add your skills..."
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    Location & Address <span className="required-star">*</span>
                  </label>
                  <LocationSelector
                    location={formData.location}
                    address={formData.address}
                    onLocationChange={(location) => setFormData(prev => ({ ...prev, location }))}
                    onAddressChange={(address) => setFormData(prev => ({ ...prev, address }))}
                  />
                  {(errors.location || errors.address) && (
                    <div className="form-error">
                      {errors.location || errors.address}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div className="modal-footer">
            <div>
              {currentStep > 1 && (
                <button type="button" className="btn btn-secondary" onClick={handleBack}>
                  ← Back
                </button>
              )}
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {onSkipForNow && (
                <button type="button" className="skip-link" onClick={onSkipForNow}>
                  Skip for now
                </button>
              )}
              
              {currentStep < 2 ? (
                <button type="button" className="btn btn-primary" onClick={handleNext}>
                  Next →
                </button>
              ) : (
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Completing...' : '🎉 Complete Profile'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};