import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface Message {
  id: string;
  from: string;
  to: string;
  content: string;
  timestamp: string;
}

interface MessageContextType {
  messages: Message[];
  sendMessage: (to: string, content: string) => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Example WebSocket connection for real-time messaging
    const ws = new WebSocket('ws://localhost:3004/ws');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [ ...prev, data ]);
    };
    return () => ws.close();
  }, []);

  const sendMessage = (to: string, content: string) => {
    // Example: send message via WebSocket
    const ws = new WebSocket('ws://localhost:3004/ws');
    ws.onopen = () => {
      ws.send(JSON.stringify({ to, content }));
      ws.close();
    };
  };

  return (
    <MessageContext.Provider value={{ messages, sendMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (!context) throw new Error('useMessages must be used within MessageProvider');
  return context;
};
