import React from 'react';

export interface ValidationRule {
  rule: (value: any) => boolean;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

export interface FieldValidation {
  fieldName: string;
  value: any;
  rules: ValidationRule[];
  required?: boolean;
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  infos: string[];
}

export function validateField(validation: FieldValidation): ValidationResult {
  const result: ValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
    infos: []
  };

  // Check required field
  if (validation.required && (!validation.value || validation.value.toString().trim() === '')) {
    result.isValid = false;
    result.errors.push(`${validation.fieldName} is required`);
    return result;
  }

  // Skip other rules if field is empty and not required
  if (!validation.value || validation.value.toString().trim() === '') {
    return result;
  }

  // Apply validation rules
  validation.rules.forEach(rule => {
    if (!rule.rule(validation.value)) {
      switch (rule.severity) {
        case 'error':
          result.isValid = false;
          result.errors.push(rule.message);
          break;
        case 'warning':
          result.warnings.push(rule.message);
          break;
        case 'info':
          result.infos.push(rule.message);
          break;
      }
    }
  });

  return result;
}

interface ValidationIndicatorProps {
  validation: ValidationResult;
  showSuccess?: boolean;
}

export const ValidationIndicator: React.FC<ValidationIndicatorProps> = ({ 
  validation, 
  showSuccess = true 
}) => {
  if (validation.errors.length > 0) {
    return (
      <div style={{ 
        color: '#e53e3e', 
        fontSize: '0.8em', 
        marginTop: '0.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem'
      }}>
        <span>❌</span>
        <div>
          {validation.errors.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </div>
      </div>
    );
  }

  if (validation.warnings.length > 0) {
    return (
      <div style={{ 
        color: '#d69e2e', 
        fontSize: '0.8em', 
        marginTop: '0.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem'
      }}>
        <span>⚠️</span>
        <div>
          {validation.warnings.map((warning, index) => (
            <div key={index}>{warning}</div>
          ))}
        </div>
      </div>
    );
  }

  if (validation.infos.length > 0) {
    return (
      <div style={{ 
        color: '#3182ce', 
        fontSize: '0.8em', 
        marginTop: '0.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem'
      }}>
        <span>ℹ️</span>
        <div>
          {validation.infos.map((info, index) => (
            <div key={index}>{info}</div>
          ))}
        </div>
      </div>
    );
  }

  if (showSuccess && validation.isValid) {
    return (
      <div style={{ 
        color: '#38a169', 
        fontSize: '0.8em', 
        marginTop: '0.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem'
      }}>
        <span>✅</span>
        <span>Looks good!</span>
      </div>
    );
  }

  return null;
};

// Common validation rules
export const ValidationRules = {
  email: {
    rule: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: 'Please enter a valid email address',
    severity: 'error' as const
  },
  
  phone: {
    rule: (value: string) => /^\+?[1-9]\d{1,14}$/.test(value.replace(/[\s-()]/g, '')),
    message: 'Please enter a valid phone number',
    severity: 'error' as const
  },
  
  url: {
    rule: (value: string) => {
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    },
    message: 'Please enter a valid URL',
    severity: 'error' as const
  },
  
  minLength: (min: number) => ({
    rule: (value: string) => value.length >= min,
    message: `Must be at least ${min} characters`,
    severity: 'error' as const
  }),
  
  maxLength: (max: number) => ({
    rule: (value: string) => value.length <= max,
    message: `Must be no more than ${max} characters`,
    severity: 'error' as const
  }),
  
  minValue: (min: number) => ({
    rule: (value: number) => value >= min,
    message: `Must be at least ${min}`,
    severity: 'error' as const
  }),
  
  maxValue: (max: number) => ({
    rule: (value: number) => value <= max,
    message: `Must be no more than ${max}`,
    severity: 'error' as const
  }),
  
  strongPassword: {
    rule: (value: string) => {
      return value.length >= 8 && 
             /[A-Z]/.test(value) && 
             /[a-z]/.test(value) && 
             /\d/.test(value);
    },
    message: 'Password must be at least 8 characters with uppercase, lowercase, and numbers',
    severity: 'error' as const
  },
  
  noSpaces: {
    rule: (value: string) => !value.includes(' '),
    message: 'Cannot contain spaces',
    severity: 'error' as const
  },
  
  alphanumeric: {
    rule: (value: string) => /^[a-zA-Z0-9]+$/.test(value),
    message: 'Only letters and numbers allowed',
    severity: 'error' as const
  },
  
  professionalEmail: {
    rule: (value: string) => {
      const domain = value.split('@')[1];
      return domain ? !['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'].includes(domain.toLowerCase()) : false;
    },
    message: 'Consider using a professional email address',
    severity: 'warning' as const
  },
  
  hourlyRateRange: {
    rule: (value: number) => value >= 10 && value <= 500,
    message: 'Hourly rate should typically be between $10-$500',
    severity: 'warning' as const
  },
  
  experienceYears: {
    rule: (value: number) => value <= 50,
    message: 'Experience years seems unusually high',
    severity: 'warning' as const
  },
  
  futureDate: {
    rule: (value: string) => new Date(value) > new Date(),
    message: 'Date should be in the future',
    severity: 'error' as const
  },
  
  pastDate: {
    rule: (value: string) => new Date(value) < new Date(),
    message: 'Date should be in the past',
    severity: 'error' as const
  },
  
  linkedInProfile: {
    rule: (value: string) => value.includes('linkedin.com/in/'),
    message: 'Should be a LinkedIn profile URL',
    severity: 'error' as const
  },
  
  goodDescription: {
    rule: (value: string) => value.split(' ').length >= 10,
    message: 'A more detailed description would be helpful',
    severity: 'info' as const
  }
};

interface ProgressIndicatorProps {
  steps: string[];
  currentStep: number;
  completedSteps: number[];
  errorSteps?: number[];
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps,
  currentStep,
  completedSteps,
  errorSteps = []
}) => {
  return (
    <>
      <style>{`
        .progress-container {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 2rem 0;
          overflow-x: auto;
          padding: 1rem 0;
        }
        
        .progress-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          min-width: 120px;
          text-align: center;
        }
        
        .step-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: white;
          transition: all 0.3s ease;
          position: relative;
        }
        
        .step-circle.completed {
          background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
        }
        
        .step-circle.current {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.2);
        }
        
        .step-circle.error {
          background: linear-gradient(135deg, #e53e3e 0%, #c53030 100%);
        }
        
        .step-circle.pending {
          background: #e2e8f0;
          color: #718096;
        }
        
        .step-label {
          font-size: 0.8em;
          font-weight: 600;
          color: #718096;
        }
        
        .step-label.current {
          color: #667eea;
        }
        
        .step-label.completed {
          color: #38a169;
        }
        
        .step-label.error {
          color: #e53e3e;
        }
        
        .step-connector {
          flex: 1;
          height: 2px;
          background: #e2e8f0;
          margin: 0 -0.5rem;
          z-index: -1;
        }
        
        .step-connector.completed {
          background: linear-gradient(90deg, #48bb78 0%, #38a169 100%);
        }
      `}</style>
      
      <div className="progress-container">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="progress-step">
              <div className={`step-circle ${
                completedSteps.includes(index) ? 'completed' :
                errorSteps.includes(index) ? 'error' :
                currentStep === index ? 'current' : 'pending'
              }`}>
                {completedSteps.includes(index) ? '✓' :
                 errorSteps.includes(index) ? '✕' : index + 1}
              </div>
              <div className={`step-label ${
                completedSteps.includes(index) ? 'completed' :
                errorSteps.includes(index) ? 'error' :
                currentStep === index ? 'current' : ''
              }`}>
                {step}
              </div>
            </div>
            
            {index < steps.length - 1 && (
              <div className={`step-connector ${
                completedSteps.includes(index) ? 'completed' : ''
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

interface AnimatedSuccessProps {
  message: string;
  show: boolean;
}

export const AnimatedSuccess: React.FC<AnimatedSuccessProps> = ({ message, show }) => {
  if (!show) return null;

  return (
    <>
      <style>{`
        .success-animation {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          text-align: center;
          z-index: 10000;
          animation: successSlideIn 0.5s ease-out;
        }
        
        .success-icon {
          font-size: 4em;
          margin-bottom: 1rem;
          animation: successBounce 0.6s ease-out 0.2s both;
        }
        
        .success-message {
          font-size: 1.2em;
          font-weight: 700;
          color: #38a169;
          margin-bottom: 0.5rem;
        }
        
        .success-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.3);
          z-index: 9999;
          animation: fadeIn 0.3s ease-out;
        }
        
        @keyframes successSlideIn {
          from {
            opacity: 0;
            transform: translate(-50%, -60%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
        
        @keyframes successBounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
          }
          40%, 43% {
            transform: translate3d(0, -20px, 0);
          }
          70% {
            transform: translate3d(0, -10px, 0);
          }
          90% {
            transform: translate3d(0, -4px, 0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
      
      <div className="success-backdrop">
        <div className="success-animation">
          <div className="success-icon">🎉</div>
          <div className="success-message">{message}</div>
          <div style={{ color: '#718096', fontSize: '0.9em' }}>
            Your changes have been saved successfully!
          </div>
        </div>
      </div>
    </>
  );
};