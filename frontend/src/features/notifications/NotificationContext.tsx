import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
// import { WS_CONFIG } from '../../config/api'; // Disabled until backend WebSocket implemented

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
    // TODO: Re-enable when backend WebSocket is implemented
    // Temporarily disabled to prevent console errors (backend returns 426 Upgrade Required)
    // See: backend/services/notification-service/src/app.ts - WebSocket placeholder route
    
    /* DISABLED - Backend WebSocket not implemented
    const ws = new WebSocket(WS_CONFIG.NOTIFICATION);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setNotifications((prev) => [
        ...prev,
        { id: Date.now().toString(), message: data.message, type: data.type || 'info' }
      ]);
    };
    return () => ws.close();
    */
    
    // Log once to indicate notifications are in polling mode
    console.log('WebSocket notifications disabled - backend implementation pending');
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
