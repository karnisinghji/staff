import React from 'react';
import { Capacitor } from '@capacitor/core';
import { HomePage } from './HomePage';
import ModernHomePage from './ModernHomePage';

/**
 * HomePageWrapper - Platform-specific routing for home page
 * 
 * Shows ModernHomePage on Android/iOS native apps
 * Shows original HomePage on web
 */
const HomePageWrapper: React.FC = () => {
  const isNativeMobile = Capacitor.isNativePlatform();

  if (isNativeMobile) {
    return <ModernHomePage />;
  }

  return <HomePage />;
};

export default HomePageWrapper;
