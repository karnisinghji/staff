import React, { Suspense, lazy, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { App as CapacitorApp } from '@capacitor/app';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './features/auth/AuthContext';
import { NotificationProvider } from './features/notifications/NotificationContext';
import { MessageProvider } from './features/messaging/MessageContext';
import { NotificationList } from './features/notifications/NotificationList';
import { NavBar } from './features/common/NavBar';
import { BottomNavBar } from './components/BottomNavBar';
import { ToastContainer } from './components/ToastContainer';
import { GlobalAnimations } from './components/AnimationComponents';

// Critical pages loaded immediately (no lazy loading for better UX)
import { LoginPage } from './features/auth/LoginPage';
import { RegisterPage } from './features/auth/RegisterPage';
import EnhancedDashboardPage from './features/dashboard/EnhancedDashboardPage';

// Lazy load non-critical pages
const ForgotPasswordPage = lazy(() => import('./features/auth/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('./features/auth/ResetPasswordPage'));
const OAuthCallback = lazy(() => import('./features/auth/OAuthCallback').then(m => ({ default: m.OAuthCallback })));
const EnhancedMatchSearchPage = lazy(() => import('./features/matching/EnhancedMatchSearchPage'));
const MyTeamPage = lazy(() => import('./features/matching/SavedMatchesPage').then(m => ({ default: m.MyTeamPage })));
const ModernMessagingPage = lazy(() => import('./features/messaging/ModernMessagingPage'));
const HomePage = lazy(() => import('./features/home/HomePage').then(m => ({ default: m.HomePage })));
const EnhancedProfilePage = lazy(() => import('./features/profile/EnhancedProfilePage'));
const StatusPage = lazy(() => import('./features/status/StatusPage'));

// Loading fallback component
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
    fontSize: '1.2rem',
    color: '#666'
  }}>
    <div>Loading...</div>
  </div>
);

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const { token, isLoading } = useAuth();
  
  if (isLoading) {
    return <LoadingFallback />;
  }
  
  return token ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }: { children: React.ReactElement }) => {
  const { token, isLoading } = useAuth();
  
  if (isLoading) {
    return <LoadingFallback />;
  }
  
  // If user is already logged in, redirect to dashboard
  return token ? <Navigate to="/dashboard" /> : children;
};

const HomeRoute = () => {
  const { token, isLoading } = useAuth();
  
  if (isLoading) {
    return <LoadingFallback />;
  }
  
  // If logged in, go to dashboard; otherwise show home page
  return token ? <Navigate to="/dashboard" /> : <HomePage />;
};



// Injector component: expose react-router navigate to window so listeners
// outside react tree can route programmatically (used by Capacitor deep-linking)
const RouterNavigatorInjector: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    (window as any).reactRouterNavigate = navigate;
    return () => { (window as any).reactRouterNavigate = undefined; };
  }, [navigate]);
  return null;
};

// Small component to listen for app URL opens (deep links) on native platforms
const AppUrlListener: React.FC = () => {
  const navigate = (window as any).reactRouterNavigate;
  const { login } = useAuth();
  
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    
    // Check if app was launched with a deep link (only fires once on launch)
    const checkLaunchUrl = async () => {
      try {
        const result = await CapacitorApp.getLaunchUrl();
        if (result && result.url) {
          console.log('[AppUrlListener] App launched with URL:', result.url);
          await processDeepLink(result.url);
        }
      } catch (err) {
        console.error('[AppUrlListener] Error checking launch URL:', err);
      }
    };
    
    // Function to process deep link URLs (used by both launch and runtime)
    const processDeepLink = async (url: string) => {
      console.log('[AppUrlListener] Processing deep link:', url);
      
      // Check if this is an OAuth callback with tokens
      if (url.includes('/auth/callback') && (url.includes('access_token') || url.includes('#'))) {
        console.log('[AppUrlListener] OAuth callback detected');
        
        // Parse the URL to extract tokens
        try {
          // Handle custom scheme URLs (comeondost://auth/callback#access_token=...&refresh_token=...)
          const urlToParse = url.replace('comeondost://', 'https://dummy.com/');
          const parsed = new URL(urlToParse);
          
          // Try to get tokens from hash first (mobile OAuth uses hash)
          let accessToken = null;
          let refreshToken = null;
          let userId = null;
          
          if (parsed.hash) {
            // Parse hash parameters manually
            const hashParams = new URLSearchParams(parsed.hash.substring(1)); // Remove '#'
            accessToken = hashParams.get('access_token');
            refreshToken = hashParams.get('refresh_token');
            userId = hashParams.get('user_id');
            console.log('[AppUrlListener] Parsed from hash - access_token length:', accessToken?.length, 'userId:', userId);
          }
          
          // Fallback to query parameters (web OAuth uses query params)
          if (!accessToken) {
            accessToken = parsed.searchParams.get('access_token');
            refreshToken = parsed.searchParams.get('refresh_token');
            userId = parsed.searchParams.get('user_id');
            console.log('[AppUrlListener] Parsed from query - access_token length:', accessToken?.length, 'userId:', userId);
          }
          
          if (accessToken && refreshToken && userId) {
            console.log('[AppUrlListener] Tokens found, logging in');
            
            // Close browser if still open
            try {
              const { Browser } = await import('@capacitor/browser');
              await Browser.close();
            } catch (e) {
              console.log('[AppUrlListener] Browser already closed or not available');
            }
            
            // Login user with refresh token
            const userObj = { id: userId };
            login(accessToken, userObj, refreshToken);
            
            // Navigate to dashboard
            if (typeof navigate === 'function') {
              navigate('/dashboard');
            } else {
              window.location.href = '/dashboard';
            }
            
            return; // Exit early for OAuth callback
          } else {
            console.log('[AppUrlListener] Missing tokens - accessToken:', !!accessToken, 'refreshToken:', !!refreshToken, 'userId:', !!userId);
          }
        } catch (err) {
          console.error('[AppUrlListener] Error parsing OAuth callback:', err);
        }
      } else {
        console.log('[AppUrlListener] Not an OAuth callback URL');
        
        // For non-OAuth deep links, route to the path
        let pathAndSearch = '/';
        try {
          const parsed = new URL(url);
          pathAndSearch = parsed.pathname + (parsed.search || '');
        } catch (err) {
          // If URL constructor fails (custom schemes), try manual parsing
          const idx = url.indexOf('://');
          const after = idx >= 0 ? url.slice(idx + 3) : url;
          const firstSlash = after.indexOf('/');
          if (firstSlash >= 0) {
            pathAndSearch = after.slice(firstSlash);
          } else {
            pathAndSearch = '/';
          }
        }
        
        // Navigate to the path
        if (typeof navigate === 'function') {
          navigate(pathAndSearch);
        } else {
          window.location.href = pathAndSearch;
        }
      }
    };
    
    // Check launch URL on mount
    checkLaunchUrl();
    
    const handler = async (data: any) => {
      try {
        const url = data.url as string;
        console.log('[AppUrlListener] Deep link received (appUrlOpen event):', url);
        await processDeepLink(url);
      } catch (e) {
        console.error('[AppUrlListener] handler error', e);
      }
    };

    // Add listener for runtime deep links (when app is already running)
    CapacitorApp.addListener('appUrlOpen', handler).then(listenerHandle => {
      // Store handle for cleanup
      (window as any).__appUrlListenerHandle = listenerHandle;
    });
    
    return () => {
      // Cleanup listener on unmount
      const handle = (window as any).__appUrlListenerHandle;
      if (handle && handle.remove) {
        try { handle.remove(); } catch (e) {}
      }
    };
  }, [navigate, login]);
  
  return null;
};

// We will inject a small runtime helper for navigation. In the Router below
// we'll attach a real navigate function to window.reactRouterNavigate so
// the AppUrlListener can use it (avoids needing navigate at top-level).

const App: React.FC = () => (
  <AuthProvider>
    <NotificationProvider>
      <MessageProvider>
        <Router>
          <GlobalAnimations />
          {/* Injector: expose react-router navigate to AppUrlListener via window.reactRouterNavigate */}
          <RouterNavigatorInjector />
          <AppUrlListener />
          <NavBar />
          <NotificationList />
          <ToastContainer />
          <BottomNavBar />
          <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/login" element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            } />
            <Route path="/register" element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            } />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
            <Route path="/auth/callback" element={<OAuthCallback />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <EnhancedDashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/search" element={
              <ProtectedRoute>
                <EnhancedMatchSearchPage />
              </ProtectedRoute>
            } />
            <Route path="/saved" element={
              <ProtectedRoute>
                <MyTeamPage />
              </ProtectedRoute>
            } />
            <Route path="/messages" element={
              <ProtectedRoute>
                <ModernMessagingPage />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <EnhancedProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/status" element={
              <ProtectedRoute>
                <StatusPage />
              </ProtectedRoute>
            } />
            {/* Example: <Route path="/details/:id" element={<MatchDetailsPage match={...} />} /> */}
            <Route path="/" element={<HomeRoute />} />
            <Route path="/home" element={<HomeRoute />} />
          </Routes>
        </Suspense>
      </Router>
      </MessageProvider>
    </NotificationProvider>
  </AuthProvider>
);

export default App;
