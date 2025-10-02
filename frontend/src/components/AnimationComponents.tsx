import React from 'react';
import { theme } from '../styles/theme';

// Global CSS animations and keyframes
export const GlobalAnimations: React.FC = () => (
  <style>
    {`
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes slideInRight {
        from {
          opacity: 0;
          transform: translateX(30px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes slideInLeft {
        from {
          opacity: 0;
          transform: translateX(-30px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes scaleIn {
        from {
          opacity: 0;
          transform: scale(0.9);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      @keyframes bounce {
        0%, 20%, 53%, 80%, 100% {
          transform: translate3d(0, 0, 0);
        }
        40%, 43% {
          transform: translate3d(0, -30px, 0);
        }
        70% {
          transform: translate3d(0, -15px, 0);
        }
        90% {
          transform: translate3d(0, -4px, 0);
        }
      }

      @keyframes pulse {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.05);
        }
        100% {
          transform: scale(1);
        }
      }

      @keyframes shake {
        0%, 100% {
          transform: translateX(0);
        }
        10%, 30%, 50%, 70%, 90% {
          transform: translateX(-10px);
        }
        20%, 40%, 60%, 80% {
          transform: translateX(10px);
        }
      }

      @keyframes ripple {
        0% {
          transform: scale(0);
          opacity: 1;
        }
        100% {
          transform: scale(4);
          opacity: 0;
        }
      }

      @keyframes shimmer {
        0% {
          background-position: -468px 0;
        }
        100% {
          background-position: 468px 0;
        }
      }

      @keyframes glow {
        0% {
          box-shadow: 0 0 5px ${theme.colors.primary[500]};
        }
        50% {
          box-shadow: 0 0 20px ${theme.colors.primary[500]}, 0 0 30px ${theme.colors.primary[500]};
        }
        100% {
          box-shadow: 0 0 5px ${theme.colors.primary[500]};
        }
      }

      .animate-fade-in {
        animation: fadeIn 0.6s ease-out forwards;
      }

      .animate-fade-in-up {
        animation: fadeInUp 0.6s ease-out forwards;
      }

      .animate-slide-in-right {
        animation: slideInRight 0.6s ease-out forwards;
      }

      .animate-slide-in-left {
        animation: slideInLeft 0.6s ease-out forwards;
      }

      .animate-scale-in {
        animation: scaleIn 0.3s ease-out forwards;
      }

      .animate-bounce {
        animation: bounce 1s ease-in-out;
      }

      .animate-pulse {
        animation: pulse 2s ease-in-out infinite;
      }

      .animate-shake {
        animation: shake 0.5s ease-in-out;
      }

      .animate-glow {
        animation: glow 2s ease-in-out infinite;
      }

      .hover-lift {
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      }

      .hover-lift:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      }

      .hover-grow {
        transition: transform 0.3s ease;
      }

      .hover-grow:hover {
        transform: scale(1.05);
      }

      .hover-bounce {
        transition: transform 0.3s ease;
      }

      .hover-bounce:hover {
        transform: translateY(-5px);
        animation: bounce 0.6s ease-in-out;
      }

      .hover-glow {
        transition: box-shadow 0.3s ease;
      }

      .hover-glow:hover {
        box-shadow: 0 0 20px ${theme.colors.primary[500]}40;
      }

      .focus-ring:focus {
        outline: 2px solid ${theme.colors.primary[500]};
        outline-offset: 2px;
      }

      .ripple-effect {
        position: relative;
        overflow: hidden;
      }

      .ripple-effect::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: translate(-50%, -50%);
        transition: width 0.6s, height 0.6s;
      }

      .ripple-effect:active::before {
        width: 300px;
        height: 300px;
      }

      .shimmer {
        background: linear-gradient(
          to right,
          #f6f7f8 0%,
          #edeef1 20%,
          #f6f7f8 40%,
          #f6f7f8 100%
        );
        background-size: 800px 104px;
        animation: shimmer 1.5s linear infinite;
      }

      .slide-enter {
        transform: translateX(100%);
        opacity: 0;
      }

      .slide-enter-active {
        transform: translateX(0);
        opacity: 1;
        transition: all 0.3s ease-out;
      }

      .slide-exit {
        transform: translateX(0);
        opacity: 1;
      }

      .slide-exit-active {
        transform: translateX(-100%);
        opacity: 0;
        transition: all 0.3s ease-out;
      }

      .stagger-children > * {
        animation-delay: calc(var(--index, 0) * 0.1s);
      }

      /* Smooth scrolling */
      html {
        scroll-behavior: smooth;
      }

      /* Enhanced focus states */
      button:focus,
      input:focus,
      textarea:focus,
      select:focus {
        outline: 2px solid ${theme.colors.primary[500]};
        outline-offset: 2px;
      }

      /* Loading states */
      .loading-pulse {
        animation: pulse 1.5s ease-in-out infinite;
      }

      /* Card hover effects */
      .card-hover {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .card-hover:hover {
        transform: translateY(-4px);
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      }

      /* Button press effects */
      .button-press {
        transition: all 0.15s ease;
      }

      .button-press:active {
        transform: scale(0.98);
      }

      /* Progress animations */
      @keyframes progress {
        0% {
          width: 0%;
        }
        100% {
          width: 100%;
        }
      }

      .progress-animate {
        animation: progress 1s ease-out forwards;
      }

      /* Notification slide-in */
      @keyframes notification-slide-in {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      .notification-enter {
        animation: notification-slide-in 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
      }

      /* Modal animations */
      @keyframes modal-fade-in {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      @keyframes modal-scale-in {
        from {
          opacity: 0;
          transform: scale(0.9) translateY(-20px);
        }
        to {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }

      .modal-backdrop {
        animation: modal-fade-in 0.3s ease-out;
      }

      .modal-content {
        animation: modal-scale-in 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      }

      /* Micro-interactions for form elements */
      .form-input-wrapper {
        position: relative;
      }

      .form-input-wrapper::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background: ${theme.colors.primary[500]};
        transition: width 0.3s ease;
      }

      .form-input-wrapper:focus-within::after {
        width: 100%;
      }
    `}
  </style>
);

interface AnimatedContainerProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'fadeInUp' | 'slideInRight' | 'slideInLeft' | 'scaleIn';
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  children,
  animation = 'fadeIn',
  delay = 0,
  duration = 0.6,
  className = '',
  style = {},
}) => {
  const animationClass = `animate-${animation.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
  
  return (
    <div
      className={`${animationClass} ${className}`}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

interface RippleButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const RippleButton: React.FC<RippleButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  style = {},
}) => {
  const [ripples, setRipples] = React.useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples(prev => [...prev, { x, y, id }]);

    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== id));
    }, 600);

    onClick?.();
  };

  const getButtonStyles = () => {
    const baseStyles = {
      position: 'relative' as const,
      overflow: 'hidden' as const,
      border: 'none',
      borderRadius: theme.borderRadius.md,
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontSize: theme.typography.fontSize.sm,
      fontWeight: theme.typography.fontWeight.medium,
      transition: 'all 0.2s ease',
      opacity: disabled ? 0.6 : 1,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing.xs,
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
        border: `2px solid ${theme.colors.primary[500]}`,
      },
    };

    return { ...baseStyles, ...sizeStyles[size], ...variantStyles[variant] };
  };

  return (
    <button
      className={`button-press ${className}`}
      style={{ ...getButtonStyles(), ...style }}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          style={{
            position: 'absolute',
            left: ripple.x,
            top: ripple.y,
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            transform: 'translate(-50%, -50%)',
            animation: 'ripple 0.6s linear',
            pointerEvents: 'none',
          }}
        />
      ))}
    </button>
  );
};

interface HoverCardProps {
  children: React.ReactNode;
  hoverEffect?: 'lift' | 'grow' | 'glow' | 'bounce';
  className?: string;
  style?: React.CSSProperties;
}

export const HoverCard: React.FC<HoverCardProps> = ({
  children,
  hoverEffect = 'lift',
  className = '',
  style = {},
}) => {
  const hoverClass = `hover-${hoverEffect}`;
  
  return (
    <div
      className={`${hoverClass} ${className}`}
      style={{
        padding: theme.spacing.lg,
        backgroundColor: 'white',
        borderRadius: theme.borderRadius.lg,
        border: `1px solid ${theme.colors.neutral[200]}`,
        boxShadow: theme.shadows.sm,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

interface ProgressBarProps {
  progress: number;
  color?: string;
  height?: number;
  animated?: boolean;
  showLabel?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = theme.colors.primary[500],
  height = 8,
  animated = true,
  showLabel = false,
  className = '',
}) => {
  return (
    <div className={className}>
      {showLabel && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: theme.spacing.xs,
          fontSize: theme.typography.fontSize.sm,
          color: theme.colors.neutral[700],
        }}>
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
      )}
      <div style={{
        width: '100%',
        height: `${height}px`,
        backgroundColor: theme.colors.neutral[200],
        borderRadius: `${height / 2}px`,
        overflow: 'hidden',
      }}>
        <div
          className={animated ? 'progress-animate' : ''}
          style={{
            height: '100%',
            width: `${Math.min(100, Math.max(0, progress))}%`,
            backgroundColor: color,
            borderRadius: `${height / 2}px`,
            transition: animated ? 'width 0.5s ease-out' : 'none',
          }}
        />
      </div>
    </div>
  );
};

interface FloatingActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  color?: string;
  size?: number;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  className?: string;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  children,
  onClick,
  color = theme.colors.primary[500],
  size = 56,
  position = 'bottom-right',
  className = '',
}) => {
  const getPositionStyles = () => {
    const positions = {
      'bottom-right': { bottom: theme.spacing.lg, right: theme.spacing.lg },
      'bottom-left': { bottom: theme.spacing.lg, left: theme.spacing.lg },
      'top-right': { top: theme.spacing.lg, right: theme.spacing.lg },
      'top-left': { top: theme.spacing.lg, left: theme.spacing.lg },
    };
    return positions[position];
  };

  return (
    <button
      className={`hover-lift button-press ${className}`}
      onClick={onClick}
      style={{
        position: 'fixed',
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        backgroundColor: color,
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: theme.shadows.lg,
        zIndex: 1000,
        fontSize: '24px',
        transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
        ...getPositionStyles(),
      }}
    >
      {children}
    </button>
  );
};

interface PulsingDotProps {
  color?: string;
  size?: number;
  className?: string;
}

export const PulsingDot: React.FC<PulsingDotProps> = ({
  color = theme.colors.success[500],
  size = 8,
  className = '',
}) => {
  return (
    <div
      className={`animate-pulse ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        backgroundColor: color,
        display: 'inline-block',
      }}
    />
  );
};

interface StaggeredListProps {
  children: React.ReactNode[];
  staggerDelay?: number;
  animation?: 'fadeInUp' | 'slideInLeft' | 'slideInRight';
  className?: string;
}

export const StaggeredList: React.FC<StaggeredListProps> = ({
  children,
  staggerDelay = 0.1,
  animation = 'fadeInUp',
  className = '',
}) => {
  return (
    <div className={`stagger-children ${className}`}>
      {children.map((child, index) => (
        <div
          key={index}
          className={`animate-${animation.replace(/([A-Z])/g, '-$1').toLowerCase()}`}
          style={{
            '--index': index,
            animationDelay: `${index * staggerDelay}s`,
          } as React.CSSProperties}
        >
          {child}
        </div>
      ))}
    </div>
  );
};