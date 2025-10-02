import React from 'react';
import { theme } from '../styles/theme';

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number | string;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '1rem',
  borderRadius = theme.borderRadius.sm,
  className = '',
}) => {
  const skeletonStyle: React.CSSProperties = {
    display: 'inline-block',
    width,
    height,
    borderRadius,
    backgroundColor: theme.colors.neutral[200],
    position: 'relative',
    overflow: 'hidden',
    animation: 'skeleton-loading 1.5s ease-in-out infinite',
  };

  return (
    <>
      <style>
        {`
          @keyframes skeleton-loading {
            0% {
              background-color: ${theme.colors.neutral[200]};
            }
            50% {
              background-color: ${theme.colors.neutral[300]};
            }
            100% {
              background-color: ${theme.colors.neutral[200]};
            }
          }
        `}
      </style>
      <div className={className} style={skeletonStyle} />
    </>
  );
};

export const SkeletonCard: React.FC = () => (
  <div style={{
    padding: theme.spacing.lg,
    border: `1px solid ${theme.colors.neutral[200]}`,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: 'white',
    boxShadow: theme.shadows.sm,
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.md, marginBottom: theme.spacing.md }}>
      <Skeleton width="48px" height="48px" borderRadius="50%" />
      <div style={{ flex: 1 }}>
        <Skeleton width="60%" height="1.25rem" />
        <div style={{ marginTop: theme.spacing.xs }}>
          <Skeleton width="40%" height="1rem" />
        </div>
      </div>
    </div>
    <div style={{ marginBottom: theme.spacing.sm }}>
      <Skeleton width="100%" height="1rem" />
    </div>
    <div style={{ marginBottom: theme.spacing.sm }}>
      <Skeleton width="80%" height="1rem" />
    </div>
    <div style={{ display: 'flex', gap: theme.spacing.sm, marginTop: theme.spacing.md }}>
      <Skeleton width="80px" height="32px" borderRadius={theme.borderRadius.sm} />
      <Skeleton width="80px" height="32px" borderRadius={theme.borderRadius.sm} />
    </div>
  </div>
);

export const SkeletonTable: React.FC<{ rows?: number; columns?: number }> = ({ rows = 5, columns = 4 }) => (
  <div style={{
    border: `1px solid ${theme.colors.neutral[200]}`,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: 'white',
  }}>
    {/* Header */}
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: theme.spacing.md,
      padding: theme.spacing.lg,
      backgroundColor: theme.colors.neutral[50],
      borderBottom: `1px solid ${theme.colors.neutral[200]}`,
    }}>
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton key={i} width="70%" height="1rem" />
      ))}
    </div>
    {/* Rows */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div
        key={rowIndex}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: theme.spacing.md,
          padding: theme.spacing.lg,
          borderBottom: rowIndex < rows - 1 ? `1px solid ${theme.colors.neutral[100]}` : 'none',
        }}
      >
        {Array.from({ length: columns }).map((_, colIndex) => (
          <Skeleton key={colIndex} width={colIndex === 0 ? '90%' : '60%'} height="1rem" />
        ))}
      </div>
    ))}
  </div>
);

export const SkeletonStats: React.FC = () => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: theme.spacing.lg,
  }}>
    {Array.from({ length: 4 }).map((_, i) => (
      <div
        key={i}
        style={{
          padding: theme.spacing.lg,
          border: `1px solid ${theme.colors.neutral[200]}`,
          borderRadius: theme.borderRadius.lg,
          backgroundColor: 'white',
          boxShadow: theme.shadows.sm,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: theme.spacing.md }}>
          <Skeleton width="60%" height="1rem" />
          <Skeleton width="24px" height="24px" borderRadius="50%" />
        </div>
        <Skeleton width="40%" height="2rem" />
        <div style={{ marginTop: theme.spacing.sm }}>
          <Skeleton width="80%" height="0.875rem" />
        </div>
      </div>
    ))}
  </div>
);

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = theme.colors.primary[500] 
}) => {
  const sizeMap = {
    sm: '16px',
    md: '24px',
    lg: '32px',
  };

  const spinnerStyle: React.CSSProperties = {
    width: sizeMap[size],
    height: sizeMap[size],
    border: `2px solid ${theme.colors.neutral[200]}`,
    borderTop: `2px solid ${color}`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  };

  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={spinnerStyle} />
    </>
  );
};

interface LoadingOverlayProps {
  message?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message = 'Loading...' }) => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  }}>
    <LoadingSpinner size="lg" />
    <div style={{
      marginTop: theme.spacing.md,
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.neutral[600],
      fontWeight: theme.typography.fontWeight.medium,
    }}>
      {message}
    </div>
  </div>
);

interface LoadingButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading,
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'md',
}) => {
  const getButtonStyles = () => {
    const baseStyles = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing.sm,
      border: 'none',
      borderRadius: theme.borderRadius.md,
      cursor: (isLoading || disabled) ? 'not-allowed' : 'pointer',
      fontSize: theme.typography.fontSize.sm,
      fontWeight: theme.typography.fontWeight.medium,
      transition: 'all 0.2s ease-in-out',
      opacity: (isLoading || disabled) ? 0.6 : 1,
    };

    const sizeStyles = {
      sm: { padding: `${theme.spacing.xs} ${theme.spacing.sm}`, fontSize: theme.typography.fontSize.xs },
      md: { padding: `${theme.spacing.sm} ${theme.spacing.md}`, fontSize: theme.typography.fontSize.sm },
      lg: { padding: `${theme.spacing.md} ${theme.spacing.lg}`, fontSize: theme.typography.fontSize.base },
    };

    const variantStyles = {
      primary: {
        backgroundColor: theme.colors.primary[500],
        color: 'white',
      },
      secondary: {
        backgroundColor: theme.colors.neutral[500],
        color: 'white',
      },
      outline: {
        backgroundColor: 'transparent',
        color: theme.colors.primary[500],
        border: `1px solid ${theme.colors.primary[500]}`,
      },
    };

    return { ...baseStyles, ...sizeStyles[size], ...variantStyles[variant] };
  };

  return (
    <button
      style={getButtonStyles()}
      onClick={onClick}
      disabled={isLoading || disabled}
    >
      {isLoading && <LoadingSpinner size="sm" color="currentColor" />}
      {children}
    </button>
  );
};