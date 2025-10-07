import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './features/auth/AuthContext';
import { NotificationProvider } from './features/notifications/NotificationContext';
import { NotificationList } from './features/notifications/NotificationList';
import { NavBar } from './features/common/NavBar';
import { LoginPage } from './features/auth/LoginPage';
import { RegisterPage } from './features/auth/RegisterPage';
import ForgotPasswordPage from './features/auth/ForgotPasswordPage';
import ResetPasswordPage from './features/auth/ResetPasswordPage';
import { OAuthCallback } from './features/auth/OAuthCallback';
import EnhancedMatchSearchPage from './features/matching/EnhancedMatchSearchPage';
import { MyTeamPage } from './features/matching/SavedMatchesPage';
import { MessagingPage } from './features/messaging/MessagingPage';
import { HomePage } from './features/home/HomePage';
import EnhancedDashboardPage from './features/dashboard/EnhancedDashboardPage';
import EnhancedProfilePage from './features/profile/EnhancedProfilePage';
import StatusPage from './features/status/StatusPage';
import { ToastContainer } from './components/ToastContainer';
import { GlobalAnimations } from './components/AnimationComponents';

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
      </Router>
    </NotificationProvider>
  </AuthProvider>
);

export default App;
