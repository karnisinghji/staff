import React from 'react';

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  width = '100%', 
  height = '20px', 
  borderRadius = '4px',
  className = ''
}) => {
  return (
    <div 
      className={`skeleton ${className}`}
      style={{
        width,
        height,
        borderRadius,
        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
        animation: 'skeleton-loading 1.5s infinite'
      }}
    />
  );
};

interface CardSkeletonProps {
  showActions?: boolean;
}

export const CardSkeleton: React.FC<CardSkeletonProps> = ({ showActions = true }) => {
  return (
    <div style={{
      padding: '20px',
      background: '#fff',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      marginBottom: '16px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ flex: 1 }}>
          <Skeleton height="24px" width="70%" />
          <div style={{ marginTop: '8px' }}>
            <Skeleton height="16px" width="50%" />
          </div>
        </div>
        <div>
          <Skeleton height="32px" width="80px" borderRadius="20px" />
        </div>
      </div>
      
      <div style={{ marginBottom: '12px' }}>
        <Skeleton height="16px" width="40%" />
        <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
          <Skeleton height="24px" width="60px" borderRadius="12px" />
          <Skeleton height="24px" width="80px" borderRadius="12px" />
          <Skeleton height="24px" width="70px" borderRadius="12px" />
        </div>
      </div>
      
      <div style={{ marginBottom: '12px' }}>
        <Skeleton height="16px" width="30%" />
        <div style={{ marginTop: '4px' }}>
          <Skeleton height="16px" width="60%" />
        </div>
      </div>
      
      <Skeleton height="14px" width="45%" />
      
      {showActions && (
        <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
          <Skeleton height="36px" width="120px" borderRadius="6px" />
          <Skeleton height="36px" width="100px" borderRadius="6px" />
        </div>
      )}
    </div>
  );
};

// Global skeleton animation styles
export const SkeletonStyles = () => (
  <style>{`
    @keyframes skeleton-loading {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }
    
    .skeleton {
      position: relative;
      overflow: hidden;
    }
  `}</style>
);