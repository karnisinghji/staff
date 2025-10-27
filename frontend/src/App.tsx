import React, { Suspense, lazy, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { App as CapacitorApp } from '@capacitor/app';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './features/auth/AuthContext';
import { NotificationProvider } from './features/notifications/NotificationContext';
import { MessageProvider } from './features/messaging/MessageContext';
import { NotificationList } from './features/notifications/NotificationList';
import { NavBar } from './features/common/NavBar';
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
const TeamHub = lazy(() => import('./features/team/TeamHub'));
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
  
  // If user is already logged in, redirect to team page
  return token ? <Navigate to="/team" /> : children;
};

const HomeRoute = () => {
  const { token, isLoading } = useAuth();
  
  if (isLoading) {
    return <LoadingFallback />;
  }
  
  // If logged in, go to team page; otherwise show home page
  return token ? <Navigate to="/team" /> : <HomePage />;
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
  // If reactRouterNavigate is not injected, we'll add a runtime no-op
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    try {
      const handler = (data: any) => {
        try {
          const url = data.url as string;
          console.log('[AppUrlListener] appUrlOpen:', url);
          // Attempt to parse and route to the internal path
          // For Capacitor deep links the URL may be like: com.app.scheme://auth/callback?code=...
          // Use a fallback strategy to extract path+search
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

          // If we discovered the navigate function, use it.
          if (typeof navigate === 'function') {
            navigate(pathAndSearch);
          } else {
            // As a fallback, set window.location to route within webview
            window.location.href = pathAndSearch;
          }
        } catch (e) {
          console.error('[AppUrlListener] handler error', e);
        }
      };

      const listener = CapacitorApp.addListener('appUrlOpen', handler);
      return () => {
        try { listener.remove(); } catch (e) {}
      };
    } catch (e) {
      console.warn('[AppUrlListener] could not register listener', e);
    }
  }, []);
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
            <Route path="/team" element={
              <ProtectedRoute>
                <TeamHub />
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
