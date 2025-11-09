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
  type?: string;
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
  const [pollingInterval, setPollingInterval] = useState(5000); // 5 seconds - balanced for performance and responsiveness

  // Fetch messages from team requests (both sent and received)
  const fetchMessages = async () => {
    if (!user?.id || !token) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // Fetch only actual chat messages (team-requests endpoint no longer used)
      console.log('📨 Fetching messages from:', API_CONFIG.COMMUNICATION_SERVICE);
      const chatMessagesRes = await axios.get(
        `${API_CONFIG.COMMUNICATION_SERVICE}/messages?userId=${user.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      ).catch(err => {
        console.warn('Failed to fetch chat messages:', err);
        return { data: { success: false, data: [] } };
      });
      
      console.log('✅ Chat messages:', chatMessagesRes.data);
      
      // Transform chat messages and fetch user names
      const chatMessagesRaw = chatMessagesRes.data.success ? (chatMessagesRes.data.data || []) : [];
      
      // Fetch user details for all unique user IDs in chat messages
      const userIds = new Set(chatMessagesRaw.map((msg: any) => msg.from_user_id || msg.fromUserId));
      const userDetailsMap: Record<string, any> = {};
      
      // Fetch user details in parallel
      await Promise.all(
        Array.from(userIds).map(async (userId: any) => {
          const userIdStr = String(userId);
          if (userIdStr === user.id) {
            userDetailsMap[userIdStr] = { name: 'You' };
            return;
          }
          try {
            const userRes = await axios.get(
              `${API_CONFIG.USER_SERVICE}/api/users/${userIdStr}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            if (userRes.data.success) {
              userDetailsMap[userIdStr] = userRes.data.data.user || userRes.data.data;
            }
          } catch (err) {
            console.warn(`Failed to fetch user ${userIdStr}:`, err);
            userDetailsMap[userIdStr] = { name: 'Team Member' };
          }
        })
      );
      
      const chatMessages: Message[] = chatMessagesRaw.map((msg: any) => {
        const senderId = String(msg.from_user_id || msg.fromUserId);
        const senderDetails = userDetailsMap[senderId];
        
        return {
          id: String(msg.id),
          fromUserId: senderId,
          toUserId: msg.to_user_id || msg.toUserId,
          body: msg.body,
          createdAt: msg.created_at || msg.createdAt,
          senderName: senderDetails?.name || 'Team Member',
          type: 'chat-message'
        };
      });
      
      // Combine and sort by date
      const allMessages = [...receivedMessages, ...sentMessages, ...chatMessages]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      console.log(`📬 Total messages: ${allMessages.length} (${receivedMessages.length} team requests received, ${sentMessages.length} team requests sent, ${chatMessages.length} chat messages)`);
      setMessages(allMessages);
      setPollingInterval(30000); // Reset to normal interval on success
    } catch (err: any) {
      console.error('❌ Failed to fetch messages:', err);
      console.error('Error details:', err.response?.data || err.message);
      
      // Handle rate limiting with exponential backoff
      if (err.response?.status === 429) {
        console.warn('⚠️ Rate limited - increasing polling interval');
        setPollingInterval((prev) => Math.min(prev * 2, 120000)); // Max 2 minutes
        setError('Too many requests - slowing down refresh rate');
      } else {
        setError(err.response?.data?.message || 'Failed to load messages');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    
    // Poll for new messages with dynamic interval
    const interval = setInterval(fetchMessages, pollingInterval);
    
    return () => clearInterval(interval);
  }, [user?.id, token, pollingInterval]);

  const sendMessage = async (toUserId: string, body: string) => {
    if (!user?.id || !token) {
      throw new Error('You must be logged in to send messages');
    }
    
    // Optimistic update - add message immediately
    const tempMessage: Message = {
      id: `temp-${Date.now()}`,
      fromUserId: user.id,
      toUserId: toUserId,
      body: body,
      createdAt: new Date().toISOString(),
      senderName: 'You',
      type: 'chat-message'
    };
    
    setMessages(prev => [...prev, tempMessage]);
    
    try {
      setError(null);
      
      // Use communication-service for actual chat messages
      const response = await axios.post(
        `${API_CONFIG.COMMUNICATION_SERVICE}/messages`,
        {
          fromUserId: user.id,
          toUserId: toUserId,
          body: body
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      if (response.data.success) {
        // Refresh messages to get the real message from server
        await fetchMessages();
      }
    } catch (err: any) {
      console.error('Failed to send message:', err);
      // Remove the optimistic message on error
      setMessages(prev => prev.filter(msg => msg.id !== tempMessage.id));
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
