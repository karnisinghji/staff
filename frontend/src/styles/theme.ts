// Design System Theme
export const theme = {
    colors: {
        primary: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6',
            600: '#1976d2', // Main primary
            700: '#1565c0',
            800: '#1e40af',
            900: '#1e3a8a',
        },
        secondary: {
            50: '#fefdf8',
            100: '#fef7cd',
            200: '#fef08a',
            300: '#fde047',
            400: '#facc15',
            500: '#f5ecd6', // Main secondary (navbar background)
            600: '#e9d8a6',
            700: '#ca8a04',
            800: '#a16207',
            900: '#854d0e',
        },
        success: {
            50: '#f0fdf4',
            100: '#dcfce7',
            200: '#bbf7d0',
            300: '#86efac',
            400: '#4ade80',
            500: '#10b981', // Main success
            600: '#059669',
            700: '#047857',
            800: '#065f46',
            900: '#064e3b',
        },
        warning: {
            50: '#fffbeb',
            100: '#fef3c7',
            200: '#fde68a',
            300: '#fcd34d',
            400: '#fbbf24',
            500: '#f59e0b', // Main warning
            600: '#d97706',
            700: '#b45309',
            800: '#92400e',
            900: '#78350f',
        },
        danger: {
            50: '#fef2f2',
            100: '#fee2e2',
            200: '#fecaca',
            300: '#fca5a5',
            400: '#f87171',
            500: '#ef4444', // Main danger
            600: '#dc2626',
            700: '#b91c1c',
            800: '#991b1b',
            900: '#7f1d1d',
        },
        neutral: {
            50: '#f9fafb',
            100: '#f3f4f6',
            200: '#e5e7eb',
            300: '#d1d5db',
            400: '#9ca3af',
            500: '#6b7280', // Main neutral
            600: '#4b5563',
            700: '#374151',
            800: '#1f2937',
            900: '#111827',
        }
    },

    spacing: {
        xs: '0.25rem',   // 4px
        sm: '0.5rem',    // 8px
        md: '1rem',      // 16px
        lg: '1.5rem',    // 24px
        xl: '2rem',      // 32px
        '2xl': '3rem',   // 48px
        '3xl': '4rem',   // 64px
    },

    borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        full: '9999px',
    },

    shadows: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },

    typography: {
        fontFamily: {
            sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
            mono: ['Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
        },
        fontSize: {
            xs: '0.75rem',   // 12px
            sm: '0.875rem',  // 14px
            base: '1rem',    // 16px
            lg: '1.125rem',  // 18px
            xl: '1.25rem',   // 20px
            '2xl': '1.5rem', // 24px
            '3xl': '1.875rem', // 30px
            '4xl': '2.25rem',  // 36px
        },
        fontWeight: {
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
        },
        lineHeight: {
            tight: 1.25,
            normal: 1.5,
            relaxed: 1.75,
        }
    },

    transitions: {
        fast: '150ms ease-in-out',
        normal: '250ms ease-in-out',
        slow: '350ms ease-in-out',
    },

    breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
    }
};

// Component Styles
export const componentStyles = {
    button: {
        base: {
            padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
            borderRadius: theme.borderRadius.md,
            fontWeight: theme.typography.fontWeight.semibold,
            transition: theme.transitions.normal,
            cursor: 'pointer',
            border: 'none',
            fontSize: theme.typography.fontSize.base,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: theme.spacing.xs,
        },
        variants: {
            primary: {
                backgroundColor: theme.colors.primary[600],
                color: 'white',
                '&:hover': {
                    backgroundColor: theme.colors.primary[700],
                    transform: 'translateY(-1px)',
                    boxShadow: theme.shadows.md,
                }
            },
            secondary: {
                backgroundColor: theme.colors.neutral[100],
                color: theme.colors.neutral[700],
                border: `1px solid ${theme.colors.neutral[300]}`,
                '&:hover': {
                    backgroundColor: theme.colors.neutral[200],
                    transform: 'translateY(-1px)',
                }
            },
            success: {
                backgroundColor: theme.colors.success[500],
                color: 'white',
                '&:hover': {
                    backgroundColor: theme.colors.success[600],
                    transform: 'translateY(-1px)',
                }
            },
            danger: {
                backgroundColor: theme.colors.danger[500],
                color: 'white',
                '&:hover': {
                    backgroundColor: theme.colors.danger[600],
                    transform: 'translateY(-1px)',
                }
            }
        },
        sizes: {
            sm: {
                padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
                fontSize: theme.typography.fontSize.sm,
            },
            md: {
                padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
                fontSize: theme.typography.fontSize.base,
            },
            lg: {
                padding: `${theme.spacing.md} ${theme.spacing.xl}`,
                fontSize: theme.typography.fontSize.lg,
            }
        }
    },

    card: {
        base: {
            backgroundColor: 'white',
            borderRadius: theme.borderRadius.lg,
            padding: theme.spacing.lg,
            boxShadow: theme.shadows.md,
            border: `1px solid ${theme.colors.neutral[200]}`,
        },
        variants: {
            elevated: {
                boxShadow: theme.shadows.lg,
            },
            flat: {
                boxShadow: 'none',
                border: `1px solid ${theme.colors.neutral[300]}`,
            }
        }
    },

    input: {
        base: {
            padding: `${theme.spacing.sm} ${theme.spacing.md}`,
            borderRadius: theme.borderRadius.md,
            border: `1px solid ${theme.colors.neutral[300]}`,
            fontSize: theme.typography.fontSize.base,
            transition: theme.transitions.fast,
            width: '100%',
            '&:focus': {
                outline: 'none',
                borderColor: theme.colors.primary[500],
                boxShadow: `0 0 0 3px ${theme.colors.primary[100]}`,
            }
        }
    }
};

export default theme;