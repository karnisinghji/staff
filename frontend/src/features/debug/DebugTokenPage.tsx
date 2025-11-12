import React, { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { PushNotifications, Token } from '@capacitor/push-notifications';

export const DebugTokenPage: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let listeners: Array<{ remove: () => void }> = [];
    const run = async () => {
      if (!Capacitor.isNativePlatform()) {
        setError('Not running on a native platform');
        return;
      }
      try {
        await PushNotifications.requestPermissions();
        await PushNotifications.register();
        listeners.push(
          await PushNotifications.addListener('registration', (t: Token) => {
            setToken(t.value);
          })
        );
        listeners.push(
          await PushNotifications.addListener('registrationError', (e: any) => {
            setError('Registration error: ' + (e?.message || 'unknown'));
          })
        );
      } catch (e: any) {
        setError(e?.message || 'Failed to register');
      }
    };
    run();
    return () => {
      listeners.forEach(l => { try { l.remove(); } catch {} });
    };
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h2>Debug: FCM Token</h2>
      {token ? (
        <>
          <p><strong>Token (prefix):</strong> {token.slice(0, 48)}...</p>
          <textarea readOnly value={token} style={{ width: '100%', height: 160 }} />
        </>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <p>Requesting token...</p>
      )}
    </div>
  );
};

export default DebugTokenPage;
