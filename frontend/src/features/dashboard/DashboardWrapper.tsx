import React from 'react';
import { Capacitor } from '@capacitor/core';
import EnhancedDashboardPage from './EnhancedDashboardPage';
import ModernMobileDashboard from './ModernMobileDashboard';

/**
 * Smart Dashboard Wrapper
 * Shows ModernMobileDashboard on native mobile apps (Android/iOS)
 * Shows EnhancedDashboardPage on web browsers
 */
const DashboardWrapper: React.FC = () => {
  const isNativeMobile = Capacitor.isNativePlatform();
  
  // Use modern card-based dashboard for native mobile apps
  if (isNativeMobile) {
    return <ModernMobileDashboard />;
  }
  
  // Use enhanced dashboard for web
  return <EnhancedDashboardPage />;
};

export default DashboardWrapper;
