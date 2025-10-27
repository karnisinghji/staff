import { createContext, useState, useContext, useCallback, useEffect, type ReactNode } from 'react';
import { Preferences } from '@capacitor/preferences';
import { MobileNotificationService } from '../../services/mobileNotifications';

interface AuthState {
  token: string | null;
  user: any | null;
}

interface AuthContextType extends AuthState {
  login: (token: string, user: any) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load stored auth data on mount
  useEffect(() => {
    const loadStoredAuth = async () => {
      try {
        console.log('[AuthContext] Loading stored auth...');
        console.log('[AuthContext] Current timestamp:', Date.now());
        
        // Try Capacitor Preferences first
        const { value: storedToken } = await Preferences.get({ key: 'token' });
        const { value: storedUser } = await Preferences.get({ key: 'user' });
        
        // Fallback to localStorage if Preferences is empty
        const localToken = storedToken || localStorage.getItem('token');
        const localUser = storedUser || localStorage.getItem('user');
        
        console.log('[AuthContext] Preferences token:', storedToken ? 'EXISTS' : 'NULL');
        console.log('[AuthContext] localStorage token:', localStorage.getItem('token') ? 'EXISTS' : 'NULL');
        console.log('[AuthContext] Final token exists:', !!localToken);
        console.log('[AuthContext] Final user exists:', !!localUser);
        
        if (localToken) {
          console.log('[AuthContext] Setting token in state...');
          setToken(localToken);
          console.log('[AuthContext] Token set successfully');
          // Initialize mobile notifications if token exists
          await MobileNotificationService.initialize(localToken);
        } else {
          console.warn('[AuthContext] NO TOKEN FOUND - User will need to login');
        }
        
        if (localUser) {
          console.log('[AuthContext] Setting user in state...');
          setUser(JSON.parse(localUser));
          console.log('[AuthContext] User set successfully');
        }
      } catch (error) {
        console.error('[AuthContext] Error loading stored auth:', error);
      } finally {
        setIsLoading(false);
        console.log('[AuthContext] Loading complete, isLoading set to false');
      }
    };
    loadStoredAuth();
  }, []);

  const login = useCallback(async (newToken: string, newUser: any) => {
    console.log('[AuthContext] Login called');
    setToken(newToken);
    setUser(newUser);
    
    try {
      // Save to both Preferences AND localStorage for redundancy
      await Preferences.set({ key: 'token', value: newToken });
      await Preferences.set({ key: 'user', value: JSON.stringify(newUser) });
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(newUser));
      console.log('[AuthContext] Token and user saved to both Preferences and localStorage');
    } catch (error) {
      console.error('[AuthContext] Error saving auth:', error);
    }
    
    // Initialize mobile notifications
    await MobileNotificationService.initialize(newToken);
  }, []);

  const logout = useCallback(async () => {
    setToken(null);
    setUser(null);
    await Preferences.remove({ key: 'token' });
    await Preferences.remove({ key: 'user' });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Stop mobile notifications
    MobileNotificationService.stopPolling();
  }, []);

  // Auto-logout on token expiry
  useEffect(() => {
    if (!token) return;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp) {
        const expiry = payload.exp * 1000;
        const now = Date.now();
        if (expiry < now) {
          logout();
        } else {
          const timeout = setTimeout(() => logout(), expiry - now);
          return () => clearTimeout(timeout);
        }
      }
    } catch (e) {
      // Invalid token, force logout
      logout();
    }
  }, [token, logout]);

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
