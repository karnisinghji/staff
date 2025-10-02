import React, { useState, useRef } from 'react';
import { theme } from '../styles/theme';

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'tel' | 'url';
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  autoComplete?: string;
  icon?: React.ReactNode;
  helperText?: string;
  maxLength?: number;
  pattern?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  required = false,
  error,
  disabled = false,
  autoComplete,
  icon,
  helperText,
  maxLength,
  pattern,
}) => {
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasValue = value.length > 0;
  const showFloatingLabel = focused || hasValue;
  const showError = touched && error;

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
    setTouched(true);
  };

  const getBorderColor = () => {
    if (showError) return theme.colors.danger[500];
    if (focused) return theme.colors.primary[500];
    return theme.colors.neutral[300];
  };

  const getLabelColor = () => {
    if (showError) return theme.colors.danger[500];
    if (focused) return theme.colors.primary[500];
    if (showFloatingLabel) return theme.colors.neutral[600];
    return theme.colors.neutral[500];
  };

  return (
    <div style={{ marginBottom: theme.spacing.lg }}>
      <div style={{
        position: 'relative',
        border: `2px solid ${getBorderColor()}`,
        borderRadius: theme.borderRadius.md,
        backgroundColor: disabled ? theme.colors.neutral[50] : 'white',
        transition: 'all 0.2s ease-in-out',
      }}>
        {/* Icon */}
        {icon && (
          <div style={{
            position: 'absolute',
            left: theme.spacing.sm,
            top: '50%',
            transform: 'translateY(-50%)',
            color: focused ? theme.colors.primary[500] : theme.colors.neutral[400],
            transition: 'color 0.2s ease-in-out',
            zIndex: 1,
          }}>
            {icon}
          </div>
        )}

        {/* Floating Label */}
        <label
          style={{
            position: 'absolute',
            left: icon ? theme.spacing.xl : theme.spacing.sm,
            top: showFloatingLabel ? theme.spacing.xs : '50%',
            transform: showFloatingLabel ? 'translateY(0)' : 'translateY(-50%)',
            fontSize: showFloatingLabel ? theme.typography.fontSize.xs : theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.medium,
            color: getLabelColor(),
            backgroundColor: 'white',
            padding: showFloatingLabel ? `0 ${theme.spacing.xs}` : '0',
            transition: 'all 0.2s ease-in-out',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          {label} {required && <span style={{ color: theme.colors.danger[500] }}>*</span>}
        </label>

        {/* Input */}
        <input
          ref={inputRef}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={focused ? placeholder : ''}
          disabled={disabled}
          autoComplete={autoComplete}
          maxLength={maxLength}
          pattern={pattern}
          style={{
            width: '100%',
            padding: `${theme.spacing.lg} ${theme.spacing.sm}`,
            paddingLeft: icon ? theme.spacing.xl : theme.spacing.sm,
            paddingTop: theme.spacing.lg,
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.neutral[900],
            borderRadius: theme.borderRadius.md,
          }}
        />

        {/* Character Count */}
        {maxLength && (
          <div style={{
            position: 'absolute',
            right: theme.spacing.sm,
            bottom: theme.spacing.xs,
            fontSize: theme.typography.fontSize.xs,
            color: theme.colors.neutral[500],
          }}>
            {value.length}/{maxLength}
          </div>
        )}
      </div>

      {/* Helper Text / Error */}
      {(helperText || showError) && (
        <div style={{
          marginTop: theme.spacing.xs,
          fontSize: theme.typography.fontSize.xs,
          color: showError ? theme.colors.danger[500] : theme.colors.neutral[600],
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.xs,
        }}>
          {showError && (
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          )}
          {showError ? error : helperText}
        </div>
      )}
    </div>
  );
};

interface TextAreaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  rows?: number;
  maxLength?: number;
  helperText?: string;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  disabled = false,
  rows = 4,
  maxLength,
  helperText,
}) => {
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);

  const hasValue = value.length > 0;
  const showFloatingLabel = focused || hasValue;
  const showError = touched && error;

  const getBorderColor = () => {
    if (showError) return theme.colors.danger[500];
    if (focused) return theme.colors.primary[500];
    return theme.colors.neutral[300];
  };

  const getLabelColor = () => {
    if (showError) return theme.colors.danger[500];
    if (focused) return theme.colors.primary[500];
    if (showFloatingLabel) return theme.colors.neutral[600];
    return theme.colors.neutral[500];
  };

  return (
    <div style={{ marginBottom: theme.spacing.lg }}>
      <div style={{
        position: 'relative',
        border: `2px solid ${getBorderColor()}`,
        borderRadius: theme.borderRadius.md,
        backgroundColor: disabled ? theme.colors.neutral[50] : 'white',
        transition: 'all 0.2s ease-in-out',
      }}>
        {/* Floating Label */}
        <label
          style={{
            position: 'absolute',
            left: theme.spacing.sm,
            top: showFloatingLabel ? theme.spacing.xs : theme.spacing.lg,
            fontSize: showFloatingLabel ? theme.typography.fontSize.xs : theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.medium,
            color: getLabelColor(),
            backgroundColor: 'white',
            padding: showFloatingLabel ? `0 ${theme.spacing.xs}` : '0',
            transition: 'all 0.2s ease-in-out',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          {label} {required && <span style={{ color: theme.colors.danger[500] }}>*</span>}
        </label>

        {/* TextArea */}
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            setTouched(true);
          }}
          placeholder={focused ? placeholder : ''}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength}
          style={{
            width: '100%',
            padding: `${theme.spacing.lg} ${theme.spacing.sm}`,
            paddingTop: showFloatingLabel ? theme.spacing.xl : theme.spacing.lg,
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.neutral[900],
            borderRadius: theme.borderRadius.md,
            resize: 'vertical',
            minHeight: `${rows * 1.5}rem`,
            fontFamily: 'inherit',
          }}
        />

        {/* Character Count */}
        {maxLength && (
          <div style={{
            position: 'absolute',
            right: theme.spacing.sm,
            bottom: theme.spacing.xs,
            fontSize: theme.typography.fontSize.xs,
            color: theme.colors.neutral[500],
          }}>
            {value.length}/{maxLength}
          </div>
        )}
      </div>

      {/* Helper Text / Error */}
      {(helperText || showError) && (
        <div style={{
          marginTop: theme.spacing.xs,
          fontSize: theme.typography.fontSize.xs,
          color: showError ? theme.colors.danger[500] : theme.colors.neutral[600],
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.xs,
        }}>
          {showError && (
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          )}
          {showError ? error : helperText}
        </div>
      )}
    </div>
  );
};

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  helperText?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder = 'Select an option...',
  required = false,
  error,
  disabled = false,
  helperText,
}) => {
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);

  const hasValue = value.length > 0;
  const showFloatingLabel = focused || hasValue;
  const showError = touched && error;

  const getBorderColor = () => {
    if (showError) return theme.colors.danger[500];
    if (focused) return theme.colors.primary[500];
    return theme.colors.neutral[300];
  };

  const getLabelColor = () => {
    if (showError) return theme.colors.danger[500];
    if (focused) return theme.colors.primary[500];
    if (showFloatingLabel) return theme.colors.neutral[600];
    return theme.colors.neutral[500];
  };

  return (
    <div style={{ marginBottom: theme.spacing.lg }}>
      <div style={{
        position: 'relative',
        border: `2px solid ${getBorderColor()}`,
        borderRadius: theme.borderRadius.md,
        backgroundColor: disabled ? theme.colors.neutral[50] : 'white',
        transition: 'all 0.2s ease-in-out',
      }}>
        {/* Floating Label */}
        <label
          style={{
            position: 'absolute',
            left: theme.spacing.sm,
            top: showFloatingLabel ? theme.spacing.xs : '50%',
            transform: showFloatingLabel ? 'translateY(0)' : 'translateY(-50%)',
            fontSize: showFloatingLabel ? theme.typography.fontSize.xs : theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.medium,
            color: getLabelColor(),
            backgroundColor: 'white',
            padding: showFloatingLabel ? `0 ${theme.spacing.xs}` : '0',
            transition: 'all 0.2s ease-in-out',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          {label} {required && <span style={{ color: theme.colors.danger[500] }}>*</span>}
        </label>

        {/* Select */}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            setTouched(true);
          }}
          disabled={disabled}
          style={{
            width: '100%',
            padding: `${theme.spacing.lg} ${theme.spacing.sm}`,
            paddingTop: theme.spacing.lg,
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            fontSize: theme.typography.fontSize.sm,
            color: hasValue ? theme.colors.neutral[900] : theme.colors.neutral[500],
            borderRadius: theme.borderRadius.md,
            cursor: disabled ? 'not-allowed' : 'pointer',
            appearance: 'none',
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: 'right 0.5rem center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '1.5em 1.5em',
            paddingRight: '2.5rem',
          }}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Helper Text / Error */}
      {(helperText || showError) && (
        <div style={{
          marginTop: theme.spacing.xs,
          fontSize: theme.typography.fontSize.xs,
          color: showError ? theme.colors.danger[500] : theme.colors.neutral[600],
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.xs,
        }}>
          {showError && (
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          )}
          {showError ? error : helperText}
        </div>
      )}
    </div>
  );
};

interface CheckboxFieldProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  error?: string;
  helperText?: string;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
  error,
  helperText,
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ marginBottom: theme.spacing.lg }}>
      <label style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: theme.spacing.sm,
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.neutral[900],
      }}>
        <div style={{
          position: 'relative',
          width: '20px',
          height: '20px',
          flexShrink: 0,
          marginTop: '2px',
        }}>
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            disabled={disabled}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              opacity: 0,
              cursor: disabled ? 'not-allowed' : 'pointer',
            }}
          />
          <div style={{
            width: '100%',
            height: '100%',
            border: `2px solid ${
              error ? theme.colors.danger[500] :
              focused ? theme.colors.primary[500] :
              theme.colors.neutral[300]
            }`,
            borderRadius: theme.borderRadius.sm,
            backgroundColor: checked ? (
              error ? theme.colors.danger[500] :
              theme.colors.primary[500]
            ) : 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease-in-out',
          }}>
            {checked && (
              <svg width="12" height="12" fill="white" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </div>
        <div>
          <div style={{
            color: error ? theme.colors.danger[500] : theme.colors.neutral[900],
            lineHeight: '1.5',
          }}>
            {label}
          </div>
          {(helperText || error) && (
            <div style={{
              marginTop: theme.spacing.xs,
              fontSize: theme.typography.fontSize.xs,
              color: error ? theme.colors.danger[500] : theme.colors.neutral[600],
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.xs,
            }}>
              {error && (
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              )}
              {error || helperText}
            </div>
          )}
        </div>
      </label>
    </div>
  );
};

interface RadioGroupProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; description?: string }[];
  required?: boolean;
  error?: string;
  disabled?: boolean;
  helperText?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  value,
  onChange,
  options,
  required = false,
  error,
  disabled = false,
  helperText,
}) => {
  return (
    <div style={{ marginBottom: theme.spacing.lg }}>
      <div style={{
        fontSize: theme.typography.fontSize.sm,
        fontWeight: theme.typography.fontWeight.medium,
        color: error ? theme.colors.danger[500] : theme.colors.neutral[900],
        marginBottom: theme.spacing.sm,
      }}>
        {label} {required && <span style={{ color: theme.colors.danger[500] }}>*</span>}
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing.sm,
      }}>
        {options.map((option) => (
          <label
            key={option.value}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: theme.spacing.sm,
              cursor: disabled ? 'not-allowed' : 'pointer',
              padding: theme.spacing.sm,
              borderRadius: theme.borderRadius.md,
              border: `2px solid ${
                value === option.value ? theme.colors.primary[500] : 'transparent'
              }`,
              backgroundColor: value === option.value ? theme.colors.primary[50] : 'transparent',
              transition: 'all 0.2s ease-in-out',
            }}
          >
            <div style={{
              position: 'relative',
              width: '20px',
              height: '20px',
              flexShrink: 0,
              marginTop: '2px',
            }}>
              <input
                type="radio"
                name={label}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                  cursor: disabled ? 'not-allowed' : 'pointer',
                }}
              />
              <div style={{
                width: '100%',
                height: '100%',
                border: `2px solid ${
                  error ? theme.colors.danger[500] :
                  value === option.value ? theme.colors.primary[500] :
                  theme.colors.neutral[300]
                }`,
                borderRadius: '50%',
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease-in-out',
              }}>
                {value === option.value && (
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: error ? theme.colors.danger[500] : theme.colors.primary[500],
                  }} />
                )}
              </div>
            </div>
            <div>
              <div style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.neutral[900],
                fontWeight: theme.typography.fontWeight.medium,
                marginBottom: option.description ? theme.spacing.xs : 0,
              }}>
                {option.label}
              </div>
              {option.description && (
                <div style={{
                  fontSize: theme.typography.fontSize.xs,
                  color: theme.colors.neutral[600],
                  lineHeight: '1.4',
                }}>
                  {option.description}
                </div>
              )}
            </div>
          </label>
        ))}
      </div>

      {/* Helper Text / Error */}
      {(helperText || error) && (
        <div style={{
          marginTop: theme.spacing.sm,
          fontSize: theme.typography.fontSize.xs,
          color: error ? theme.colors.danger[500] : theme.colors.neutral[600],
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.xs,
        }}>
          {error && (
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          )}
          {error || helperText}
        </div>
      )}
    </div>
  );
};