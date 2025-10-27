import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.comeondost.app',
  appName: 'Come On Dost',
  webDir: 'dist',
  // Remove server.url to use local bundled files instead of loading from web
  android: {
    allowMixedContent: true,
    // Enable features
    useLegacyBridge: false
  }
};

export default config;
