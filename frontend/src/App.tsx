import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './features/auth/AuthContext';
import { NotificationProvider } from './features/notifications/NotificationContext';
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
const MessagingPage = lazy(() => import('./features/messaging/MessagingPage').then(m => ({ default: m.MessagingPage })));
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
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};



const App: React.FC = () => (
  <AuthProvider>
    <NotificationProvider>
      <Router>
        <GlobalAnimations />
        <NavBar />
        <NotificationList />
        <ToastContainer />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
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
                <MessagingPage />
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
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </Suspense>
      </Router>
    </NotificationProvider>
  </AuthProvider>
);

export default App;
