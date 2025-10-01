import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface Notification {
  id: string;
  message: string;
  type?: 'info' | 'success' | 'error';
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (msg: string, type?: Notification['type']) => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Example WebSocket connection for real-time notifications
    const ws = new WebSocket('ws://localhost:3005/ws');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setNotifications((prev) => [
        ...prev,
        { id: Date.now().toString(), message: data.message, type: data.type || 'info' }
      ]);
    };
    return () => ws.close();
  }, []);

  const addNotification = (message: string, type: Notification['type'] = 'info') => {
    setNotifications((prev) => [
      ...prev,
      { id: Date.now().toString(), message, type }
    ]);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter(n => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotifications must be used within NotificationProvider');
  return context;
};
