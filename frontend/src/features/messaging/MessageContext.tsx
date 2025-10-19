import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { API_CONFIG } from '../../config/api';
import { useAuth } from '../auth/AuthContext';
import axios from 'axios';

interface Message {
  id: string;
  fromUserId: string;
  toUserId: string;
  body: string;
  createdAt: string;
  readAt?: string;
  senderName?: string;
  senderCompany?: string;
  status?: string;
  matchContext?: any;
}

interface MessageContextType {
  messages: Message[];
  sendMessage: (toUserId: string, body: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  refreshMessages: () => Promise<void>;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const { user, token } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch messages from team requests (both sent and received)
  const fetchMessages = async () => {
    if (!user?.id || !token) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // Fetch both received and sent team requests
      const [receivedRes, sentRes] = await Promise.all([
        axios.get(
          `${API_CONFIG.MATCHING_SERVICE}/api/matching/team-requests/received`,
          { headers: { Authorization: `Bearer ${token}` } }
        ),
        axios.get(
          `${API_CONFIG.MATCHING_SERVICE}/api/matching/team-requests/sent`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
      ]);
      
      // Transform team requests to Message format
      const receivedMessages: Message[] = receivedRes.data.success 
        ? (receivedRes.data.data?.requests || []).map((req: any) => ({
            id: String(req.id),
            fromUserId: req.sender_id,
            toUserId: user.id,
            body: req.message || '',
            createdAt: req.created_at,
            senderName: req.sender_name,
            senderCompany: req.sender_company,
            status: req.status,
            matchContext: req.match_context
          }))
        : [];
      
      const sentMessages: Message[] = sentRes.data.success 
        ? (sentRes.data.data?.requests || []).map((req: any) => ({
            id: String(req.id),
            fromUserId: user.id,
            toUserId: req.receiver_id,
            body: req.message || '',
            createdAt: req.created_at,
            senderName: req.receiver_name,
            senderCompany: req.receiver_company,
            status: req.status,
            matchContext: req.match_context
          }))
        : [];
      
      // Combine and sort by date
      const allMessages = [...receivedMessages, ...sentMessages]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      setMessages(allMessages);
    } catch (err: any) {
      console.error('Failed to fetch messages:', err);
      setError(err.response?.data?.message || 'Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    
    // Poll for new messages every 10 seconds
    const interval = setInterval(fetchMessages, 10000);
    
    return () => clearInterval(interval);
  }, [user?.id, token]);

  const sendMessage = async (toUserId: string, body: string) => {
    if (!user?.id || !token) {
      throw new Error('You must be logged in to send messages');
    }
    
    try {
      setError(null);
      const response = await axios.post(
        `${API_CONFIG.MATCHING_SERVICE}/api/matching/send-team-request`,
        {
          receiverId: toUserId,
          message: body,
          matchContext: {
            searchType: 'direct-message'
          }
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      if (response.data.success) {
        // Refresh messages to show the new one
        await fetchMessages();
      }
    } catch (err: any) {
      console.error('Failed to send message:', err);
      const errorMsg = err.response?.data?.message || 'Failed to send message';
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  };

  const refreshMessages = async () => {
    await fetchMessages();
  };

  return (
    <MessageContext.Provider value={{ messages, sendMessage, loading, error, refreshMessages }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (!context) throw new Error('useMessages must be used within MessageProvider');
  return context;
};
