// Design System Theme - Production Ready with Enhanced Contrast
export const theme = {
    colors: {
        primary: {
            50: '#e3f2fd',
            100: '#bbdefb',
            200: '#90caf9',
            300: '#64b5f6',
            400: '#42a5f5',
            500: '#2196f3',
            600: '#1976d2', // Main primary - Enhanced for better contrast
            700: '#1565c0',
            800: '#0d47a1',
            900: '#0a3d91',
        },
        secondary: {
            50: '#fffef7',
            100: '#fef9e7',
            200: '#fcf3cf',
            300: '#f9e79f',
            400: '#f7dc6f',
            500: '#f5ecd6', // Main secondary (navbar background)
            600: '#e9d8a6',
            700: '#d4af37',
            800: '#b8860b',
            900: '#9a7d0a',
        },
        success: {
            50: '#e8f5e9',
            100: '#c8e6c9',
            200: '#a5d6a7',
            300: '#81c784',
            400: '#66bb6a',
            500: '#4caf50', // Main success - Brighter, better contrast
            600: '#43a047',
            700: '#388e3c',
            800: '#2e7d32',
            900: '#1b5e20',
        },
        warning: {
            50: '#fff8e1',
            100: '#ffecb3',
            200: '#ffe082',
            300: '#ffd54f',
            400: '#ffca28',
            500: '#ffc107', // Main warning - High visibility
            600: '#ffb300',
            700: '#ffa000',
            800: '#ff8f00',
            900: '#ff6f00',
        },
        danger: {
            50: '#ffebee',
            100: '#ffcdd2',
            200: '#ef9a9a',
            300: '#e57373',
            400: '#ef5350',
            500: '#f44336', // Main danger - Strong contrast
            600: '#e53935',
            700: '#d32f2f',
            800: '#c62828',
            900: '#b71c1c',
        },
        neutral: {
            50: '#fafafa',
            100: '#f5f5f5',
            200: '#eeeeee',
            300: '#e0e0e0',
            400: '#bdbdbd',
            500: '#9e9e9e', // Main neutral
            600: '#757575',
            700: '#616161',
            800: '#424242',
            900: '#212121',
        },
        // New: Text colors for optimal readability
        text: {
            primary: '#1a1a1a',      // Near black for main content
            secondary: '#4a5568',    // Dark gray for secondary content
            tertiary: '#718096',     // Medium gray for hints
            disabled: '#cbd5e0',     // Light gray for disabled
            inverse: '#ffffff',      // White for dark backgrounds
        },
        // New: Background colors
        background: {
            primary: '#ffffff',      // Pure white
            secondary: '#f7fafc',    // Very light gray
            tertiary: '#edf2f7',     // Light gray
            elevated: '#ffffff',     // White with shadow
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
        sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.15), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.08)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.08)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
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