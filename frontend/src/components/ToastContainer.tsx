import React, { useEffect, useState } from 'react';
import { useToast, type Toast } from '../contexts/ToastContext';
import { theme } from '../styles/theme';

const ToastItem: React.FC<{ toast: Toast; onRemove: (id: string) => void }> = ({ toast, onRemove }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleRemove = () => {
    setIsExiting(true);
    setTimeout(() => onRemove(toast.id), 300);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleRemove();
    }, toast.duration || 5000);

    return () => clearTimeout(timer);
  }, [toast.duration]);

  const getToastStyles = () => {
    const baseStyles = {
      position: 'relative' as const,
      display: 'flex',
      alignItems: 'flex-start',
      gap: theme.spacing.sm,
      padding: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
      borderRadius: theme.borderRadius.lg,
      boxShadow: theme.shadows.lg,
      transform: isExiting ? 'translateX(100%)' : 'translateX(0)',
      opacity: isExiting ? 0 : 1,
      transition: 'all 0.3s ease-in-out',
      maxWidth: '400px',
      cursor: 'pointer',
    };

    const typeStyles = {
      success: {
        backgroundColor: theme.colors.success[50],
        borderLeft: `4px solid ${theme.colors.success[500]}`,
        color: theme.colors.success[800],
      },
      error: {
        backgroundColor: theme.colors.danger[50],
        borderLeft: `4px solid ${theme.colors.danger[500]}`,
        color: theme.colors.danger[800],
      },
      warning: {
        backgroundColor: theme.colors.warning[50],
        borderLeft: `4px solid ${theme.colors.warning[500]}`,
        color: theme.colors.warning[800],
      },
      info: {
        backgroundColor: theme.colors.primary[50],
        borderLeft: `4px solid ${theme.colors.primary[500]}`,
        color: theme.colors.primary[800],
      },
    };

    return { ...baseStyles, ...typeStyles[toast.type] };
  };

  const getIcon = () => {
    const iconStyles = {
      width: '20px',
      height: '20px',
      flexShrink: 0,
      marginTop: '2px',
    };

    switch (toast.type) {
      case 'success':
        return (
          <svg style={iconStyles} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'error':
        return (
          <svg style={iconStyles} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      case 'warning':
        return (
          <svg style={iconStyles} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'info':
        return (
          <svg style={iconStyles} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div style={getToastStyles()} onClick={handleRemove}>
      {getIcon()}
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: theme.typography.fontWeight.semibold, marginBottom: theme.spacing.xs }}>
          {toast.title}
        </div>
        {toast.message && (
          <div style={{ fontSize: theme.typography.fontSize.sm, opacity: 0.8 }}>
            {toast.message}
          </div>
        )}
        {toast.action && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              toast.action!.onClick();
              handleRemove();
            }}
            style={{
              marginTop: theme.spacing.sm,
              padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
              backgroundColor: 'transparent',
              border: `1px solid currentColor`,
              borderRadius: theme.borderRadius.sm,
              color: 'inherit',
              fontSize: theme.typography.fontSize.sm,
              cursor: 'pointer',
              fontWeight: theme.typography.fontWeight.medium,
            }}
          >
            {toast.action.label}
          </button>
        )}
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleRemove();
        }}
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: theme.spacing.xs,
          color: 'inherit',
          opacity: 0.6,
        }}
      >
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: theme.spacing.lg,
        right: theme.spacing.lg,
        zIndex: 1000,
        pointerEvents: 'none',
      }}
    >
      <div style={{ pointerEvents: 'auto' }}>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>
    </div>
  );
};