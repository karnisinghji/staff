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
import { MatchSearchPage } from './features/matching/MatchSearchPage';
import { MyTeamPage } from './features/matching/SavedMatchesPage';
import { MessagingPage } from './features/messaging/MessagingPage';
import { HomePage } from './features/home/HomePage';
import DashboardPage from './features/dashboard/DashboardPage';
import ProfilePage from './features/profile/ProfilePage';
import StatusPage from './features/status/StatusPage';

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};



const App: React.FC = () => (
  <AuthProvider>
    <NotificationProvider>
      <Router>
        <NavBar />
        <NotificationList />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="/auth/callback" element={<OAuthCallback />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/search" element={
            <ProtectedRoute>
              <MatchSearchPage />
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
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="/status" element={
            <ProtectedRoute>
              <StatusPage />
            </ProtectedRoute>
          } />
          {/* Example: <Route path="/details/:id" element={<MatchDetailsPage match={...} />} /> */}
          <Route path="/" element={
            <ProtectedRoute>
              <Navigate to="/dashboard" />
            </ProtectedRoute>
          } />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </Router>
    </NotificationProvider>
  </AuthProvider>
);

export default App;
