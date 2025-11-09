import { createContext, useState, useContext, useCallback, useEffect, type ReactNode } from 'react';
import { Preferences } from '@capacitor/preferences';
import { MobileNotificationService } from '../../services/mobileNotifications';
// import { pushNotificationService } from '../../services/pushNotificationService'; // Temporarily disabled - Firebase not configured


interface AuthState {
  token: string | null;
  user: any | null;
}

interface AuthContextType extends AuthState {
  login: (token: string, user: any, refreshToken?: string) => void;
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
          
          // Initialize push notifications
          // Temporarily disabled - Firebase not configured
          // if (localUser) {
          //   const parsedUser = JSON.parse(localUser);
          //   await pushNotificationService.initialize(parsedUser.id, localToken);
          // }
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

  const login = useCallback(async (newToken: string, newUser: any, refreshToken?: string) => {
    console.log('[AuthContext] Login called');
    
    // Immediately set state for instant UI update
    setToken(newToken);
    setUser(newUser);
    
    // Save to localStorage synchronously (fast)
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
    
    // Save to Preferences in background (parallel, non-blocking)
    Promise.all([
      Preferences.set({ key: 'token', value: newToken }),
      Preferences.set({ key: 'user', value: JSON.stringify(newUser) }),
      refreshToken ? Preferences.set({ key: 'refreshToken', value: refreshToken }) : Promise.resolve()
    ]).then(() => {
      console.log('[AuthContext] Token and user saved to Preferences');
    }).catch(error => {
      console.warn('[AuthContext] Preferences save failed (non-critical):', error);
    });
    
    // Initialize mobile notifications in background (non-blocking)
    MobileNotificationService.initialize(newToken).catch(error => {
      console.warn('[AuthContext] Mobile notifications init failed (non-critical):', error);
    });
    
    console.log('[AuthContext] Login complete');
  }, []);

  const logout = useCallback(async () => {
    setToken(null);
    setUser(null);
    await Preferences.remove({ key: 'token' });
    await Preferences.remove({ key: 'user' });
    await Preferences.remove({ key: 'refreshToken' });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('refreshToken');
    
    // Stop mobile notifications
    MobileNotificationService.stopPolling();
    
    // Unregister push notifications
    // await pushNotificationService.unregister(); // Temporarily disabled - Firebase not configured
  }, []);

  // Auto-refresh token before expiry
  useEffect(() => {
    if (!token) return;
    
    const refreshAccessToken = async () => {
      try {
        const { value: storedRefreshToken } = await Preferences.get({ key: 'refreshToken' });
        const refreshToken = storedRefreshToken || localStorage.getItem('refreshToken');
        
        if (!refreshToken) {
          console.warn('[AuthContext] No refresh token available, logging out');
          logout();
          return;
        }
        
        console.log('[AuthContext] Refreshing access token...');
        const response = await fetch('https://auth-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io/api/auth/refresh', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken })
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('[AuthContext] Token refreshed successfully');
          
          // Update token (login function will save it)
          await login(data.accessToken, user, data.refreshToken || refreshToken);
        } else {
          console.error('[AuthContext] Token refresh failed, logging out');
          logout();
        }
      } catch (error) {
        console.error('[AuthContext] Error refreshing token:', error);
        logout();
      }
    };
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp) {
        const expiry = payload.exp * 1000;
        const now = Date.now();
        
        // If token already expired, try to refresh immediately
        if (expiry < now) {
          console.log('[AuthContext] Token expired, attempting refresh');
          refreshAccessToken();
          return;
        }
        
        // Schedule refresh 5 minutes before expiry
        const refreshTime = expiry - now - (5 * 60 * 1000); // 5 minutes before expiry
        
        if (refreshTime > 0) {
          console.log(`[AuthContext] Token will auto-refresh in ${Math.round(refreshTime / 1000 / 60)} minutes`);
          const timeout = setTimeout(() => {
            console.log('[AuthContext] Auto-refreshing token');
            refreshAccessToken();
          }, refreshTime);
          return () => clearTimeout(timeout);
        } else {
          // Token expires in less than 5 minutes, refresh now
          console.log('[AuthContext] Token expires soon, refreshing now');
          refreshAccessToken();
        }
      }
    } catch (e) {
      console.error('[AuthContext] Invalid token format:', e);
      // Invalid token, try to refresh or logout
      refreshAccessToken();
    }
  }, [token, user, login, logout]);

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
