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
    email: userData.email || (userData.registrationType === 'email' ? userData.username : ''),
    phone: userData.phone || (userData.registrationType === 'phone' ? userData.username : ''),
    name: '',
    location: '',
    address: '',
    skillType: '',
    skills: [] as string[]
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mobile device detection for contact import
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  const skillTypeOptions = [
    { value: '', label: 'Select your primary skill...' },
    { value: 'carpenter', label: 'Carpenter' },
    { value: 'plumber', label: 'Plumber' },
    { value: 'painter', label: 'Painter' },
    { value: 'electrician', label: 'Electrician' },
    { value: 'landscaper', label: 'Landscaper' },
    { value: 'cleaner', label: 'Cleaner' },
    { value: 'other', label: 'Other' }
  ];

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    // Validate fields based on registration type and pre-filled status
    if (userData.registrationType !== 'email') {
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    }
    if (userData.registrationType !== 'phone') {
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    }
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
      // Ensure registration data is included in final form data
      const finalFormData = {
        ...formData,
        email: formData.email || (userData.registrationType === 'email' ? userData.username : ''),
        phone: formData.phone || (userData.registrationType === 'phone' ? userData.username : '')
      };
      
      await onComplete(finalFormData);
      toast.success('🎉 Profile completed successfully! Welcome to the platform!');
    } catch (error) {
      console.error('Profile completion error:', error);
      toast.error('Failed to complete profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const importContactsFromPhone = async () => {
    try {
      // Check if browser supports Contact Picker API
      if ('contacts' in navigator && 'ContactsManager' in window) {
        const contacts = await (navigator as any).contacts.select(['name', 'tel', 'email'], { multiple: false });
        if (contacts && contacts.length > 0) {
          const contact = contacts[0];
          setFormData(prev => ({
            ...prev,
            name: contact.name?.[0] || prev.name,
            phone: contact.tel?.[0] || prev.phone,
            email: contact.email?.[0] || prev.email
          }));
          toast.success('Contact imported successfully!');
        }
      } else {
        toast.info('Contact import not supported on this device');
      }
    } catch (error) {
      console.error('Contact import error:', error);
      toast.error('Failed to import contact');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="completion-modal">
        {/* Header */}
        <div className="modal-header">
          <h2>Complete Your Profile</h2>
          <p>Please complete these mandatory fields to access the platform</p>
        </div>

        {/* Progress indicator */}
        <div className="progress-container">
          <div className="progress-text">
            Complete your profile to get started
          </div>
        </div>

        {/* Form */}
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <div className="form-grid">
            {/* Basic Information */}
            <div className="form-section">
              <h3>Basic Information</h3>
              <div className="registration-info">
                <small className="field-note">
                  Registered with {userData.registrationType}: <strong>{userData.username}</strong>
                </small>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Display Name *{formData.name && <span style={{ color: '#38b2ac', fontSize: '0.8em' }}> (pre-filled)</span>}</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!!formData.name}
                    placeholder="Enter your display name"
                    className={errors.name ? 'error' : ''}
                    style={formData.name ? { opacity: 0.6, backgroundColor: '#f5f5f5' } : {}}
                  />
                  {formData.name && <small style={{ color: '#38b2ac' }}>This field is pre-filled and cannot be changed.</small>}
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>
              </div>

              {userData.registrationType !== 'email' && (
                <div className="form-row">
                  <div className="form-group">
                    <label>Email Address *{formData.email && <span style={{ color: '#38b2ac', fontSize: '0.8em' }}> (pre-filled)</span>}</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!!formData.email}
                      placeholder="Enter your email"
                      className={errors.email ? 'error' : ''}
                      style={formData.email ? { opacity: 0.6, backgroundColor: '#f5f5f5' } : {}}
                    />
                    {formData.email && <small style={{ color: '#38b2ac' }}>This field is pre-filled and cannot be changed.</small>}
                    {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>
                </div>
              )}
              
              {userData.registrationType === 'email' && (
                <div className="form-row">
                  <div className="form-group">
                    <label>Email Address (From Registration)</label>
                    <input
                      type="email"
                      name="email"
                      value={userData.email || userData.username || ''}
                      disabled={true}
                      placeholder="Registration email (cannot be changed)"
                      style={{ opacity: 0.6, backgroundColor: '#f5f5f5' }}
                    />
                    <small style={{ color: '#38b2ac' }}>This email was used for registration and cannot be changed.</small>
                  </div>
                </div>
              )}

              {userData.registrationType !== 'phone' && (
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number *{formData.phone && <span style={{ color: '#38b2ac', fontSize: '0.8em' }}> (pre-filled)</span>}</label>
                    <div className="phone-input-container">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!!formData.phone}
                        placeholder="Enter your phone number"
                        className={errors.phone ? 'error' : ''}
                        style={formData.phone ? { opacity: 0.6, backgroundColor: '#f5f5f5' } : {}}
                      />
                      {isMobile && !formData.phone && (
                        <button
                          type="button"
                          className="import-contact-btn"
                          onClick={importContactsFromPhone}
                          title="Import from contacts"
                        >
                          📱
                        </button>
                      )}
                    </div>
                    {formData.phone && <small style={{ color: '#38b2ac' }}>This field is pre-filled and cannot be changed.</small>}
                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                  </div>
                </div>
              )}
              
              {userData.registrationType === 'phone' && (
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number (From Registration)</label>
                    <div className="phone-input-container">
                      <input
                        type="tel"
                        name="phone"
                        value={userData.phone || userData.username || ''}
                        disabled={true}
                        placeholder="Registration phone (cannot be changed)"
                        style={{ opacity: 0.6, backgroundColor: '#f5f5f5' }}
                      />
                    </div>
                    <small style={{ color: '#38b2ac' }}>This phone was used for registration and cannot be changed.</small>
                  </div>
                </div>
              )}
            </div>

            {/* Location Information */}
            <div className="form-section">
              <h3>Location Information{(formData.location || formData.address) && <span style={{ color: '#38b2ac', fontSize: '0.8em' }}> (pre-filled)</span>}</h3>
              <LocationSelector
                location={formData.location}
                address={formData.address}
                onLocationChange={(location) => {
                  if (!formData.location) {
                    setFormData(prev => ({ ...prev, location }));
                    if (errors.location) setErrors(prev => ({ ...prev, location: '' }));
                  }
                }}
                onAddressChange={(address) => {
                  if (!formData.address) {
                    setFormData(prev => ({ ...prev, address }));
                    if (errors.address) setErrors(prev => ({ ...prev, address: '' }));
                  }
                }}
                disabled={isSubmitting || !!(formData.location && formData.address)}
              />
              {(formData.location || formData.address) && (
                <small style={{ color: '#38b2ac' }}>Location information is pre-filled and cannot be changed.</small>
              )}
              {(errors.location || errors.address) && (
                <span className="error-text">{errors.location || errors.address}</span>
              )}
            </div>

            {/* Skills Information */}
            <div className="form-section">
              <h3>Skills Information</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Primary Skill *{formData.skillType && <span style={{ color: '#38b2ac', fontSize: '0.8em' }}> (pre-filled)</span>}</label>
                  <select
                    name="skillType"
                    value={formData.skillType}
                    onChange={handleChange}
                    disabled={!!formData.skillType}
                    className={errors.skillType ? 'error' : ''}
                    style={formData.skillType ? { opacity: 0.6, backgroundColor: '#f5f5f5' } : {}}
                  >
                    {skillTypeOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {formData.skillType && <small style={{ color: '#38b2ac' }}>This field is pre-filled and cannot be changed.</small>}
                  {errors.skillType && <span className="error-text">{errors.skillType}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Additional Skills (Optional){formData.skills.length > 0 && <span style={{ color: '#38b2ac', fontSize: '0.8em' }}> (pre-filled)</span>}</label>
                  {formData.skills.length > 0 ? (
                    <div style={{ 
                      padding: '0.75rem', 
                      border: '2px solid #e2e8f0', 
                      borderRadius: '6px', 
                      backgroundColor: '#f5f5f5',
                      opacity: 0.6 
                    }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {formData.skills.map(skill => (
                          <span key={skill} style={{
                            background: '#667eea',
                            color: 'white',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '4px',
                            fontSize: '0.8rem'
                          }}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <SkillsTagInput
                      skills={formData.skills}
                      availableSkills={availableSkills}
                      onSkillsChange={(skills: string[]) => setFormData(prev => ({ ...prev, skills }))}
                      placeholder="Add additional skills..."
                    />
                  )}
                  {formData.skills.length > 0 && (
                    <small style={{ color: '#38b2ac' }}>Skills are pre-filled and cannot be changed.</small>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            {onSkipForNow && (
              <button type="button" className="btn btn-text" onClick={onSkipForNow}>
                Skip for now
              </button>
            )}
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Completing...' : 'Complete Profile'}
            </button>
          </div>
        </form>

        {/* Styles */}
        <style>{`
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            padding: 1rem;
          }

          .completion-modal {
            background: white;
            border-radius: 12px;
            max-width: 600px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          }

          .modal-header {
            padding: 2rem 2rem 1rem;
            text-align: center;
            border-bottom: 1px solid #e2e8f0;
          }

          .modal-header h2 {
            margin: 0 0 0.5rem;
            color: #2d3748;
            font-size: 1.5rem;
            font-weight: 600;
          }

          .modal-header p {
            margin: 0;
            color: #718096;
            font-size: 0.9rem;
          }

          .progress-container {
            padding: 1rem 2rem;
            background: #f7fafc;
            border-bottom: 1px solid #e2e8f0;
          }

          .progress-text {
            text-align: center;
            color: #4a5568;
            font-weight: 500;
            font-size: 0.9rem;
          }

          .form-grid {
            padding: 2rem;
          }

          .form-section {
            margin-bottom: 2rem;
          }

          .form-section h3 {
            margin: 0 0 1rem;
            color: #2d3748;
            font-size: 1.1rem;
            font-weight: 600;
            border-bottom: 2px solid #667eea;
            padding-bottom: 0.5rem;
          }

          .form-row {
            margin-bottom: 1rem;
          }

          .form-group {
            position: relative;
          }

          .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            color: #4a5568;
            font-weight: 500;
            font-size: 0.9rem;
          }

          .form-group input,
          .form-group select {
            width: 100%;
            padding: 0.75rem;
            border: 2px solid #e2e8f0;
            border-radius: 6px;
            font-size: 0.9rem;
            transition: border-color 0.2s;
            box-sizing: border-box;
          }

          .form-group input:focus,
          .form-group select:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          }

          .form-group input:disabled {
            background: #f7fafc;
            color: #a0aec0;
            cursor: not-allowed;
          }

          .form-group input.error,
          .form-group select.error {
            border-color: #e53e3e;
          }

          .phone-input-container {
            display: flex;
            gap: 0.5rem;
          }

          .import-contact-btn {
            background: #667eea;
            border: none;
            border-radius: 6px;
            padding: 0.75rem;
            color: white;
            cursor: pointer;
            font-size: 1.2rem;
            flex-shrink: 0;
            transition: background 0.2s;
          }

          .import-contact-btn:hover {
            background: #5a67d8;
          }

          .error-text {
            color: #e53e3e;
            font-size: 0.8rem;
            margin-top: 0.25rem;
            display: block;
          }

          .field-note {
            color: #718096;
            font-size: 0.8rem;
            margin-top: 0.25rem;
            display: block;
          }

          .registration-info {
            background: #e6fffa;
            border: 1px solid #38b2ac;
            border-radius: 6px;
            padding: 0.75rem;
            margin-bottom: 1rem;
            text-align: center;
          }

          .registration-info .field-note {
            margin: 0;
            color: #2c7a7b;
          }

          .modal-footer {
            padding: 1.5rem 2rem;
            border-top: 1px solid #e2e8f0;
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
          }

          .btn {
            padding: 0.75rem 1.5rem;
            border-radius: 6px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            border: none;
            font-size: 0.9rem;
          }

          .btn-primary {
            background: #667eea;
            color: white;
          }

          .btn-primary:hover:not(:disabled) {
            background: #5a67d8;
          }

          .btn-primary:disabled {
            background: #cbd5e0;
            cursor: not-allowed;
          }

          .btn-text {
            background: transparent;
            color: #718096;
            border: 1px solid #e2e8f0;
          }

          .btn-text:hover {
            color: #4a5568;
            border-color: #cbd5e0;
          }

          @media (max-width: 768px) {
            .modal-overlay {
              padding: 0.5rem;
            }
            
            .completion-modal {
              max-height: 95vh;
            }
            
            .form-grid {
              padding: 1rem;
            }
            
            .modal-header {
              padding: 1.5rem 1rem 1rem;
            }
            
            .modal-footer {
              padding: 1rem;
              flex-direction: column;
            }
          }
        `}</style>
      </div>
    </div>
  );
};