import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useMessages } from './MessageContext';
import { useNavigate } from 'react-router-dom';
import './ChatBubble.css';

interface Conversation {
  userId: string;
  userName: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  avatar?: string;
}

interface ChatMessage {
  id: string;
  fromUserId: string;
  toUserId: string;
  body: string;
  createdAt: string;
  senderName?: string;
  type: 'chat-message' | 'team-request';
}

const ModernMessagingPage: React.FC = () => {
  const { user } = useAuth();
  const { messages, sendMessage } = useMessages();
  const navigate = useNavigate();
  
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Group messages into conversations
  useEffect(() => {
    if (!user?.id) return;

    const conversationMap = new Map<string, Conversation>();

    messages.forEach((msg: any) => {
      // Determine the other person in the conversation
      const otherUserId = msg.fromUserId === user.id ? msg.toUserId : msg.fromUserId;
      
      if (!otherUserId || otherUserId === user.id) return;

      const existing = conversationMap.get(otherUserId);
      const msgTime = new Date(msg.createdAt).getTime();

      if (!existing || new Date(existing.lastMessageTime).getTime() < msgTime) {
        conversationMap.set(otherUserId, {
          userId: otherUserId,
          userName: msg.senderName || 'Team Member',
          lastMessage: msg.body || 'Team request',
          lastMessageTime: msg.createdAt,
          unreadCount: 0, // TODO: Implement unread tracking
        });
      }
    });

    const convList = Array.from(conversationMap.values())
      .sort((a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime());

    setConversations(convList);
  }, [messages, user?.id]);

  // Filter conversations based on search
  const filteredConversations = conversations.filter(conv =>
    conv.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Load chat messages for selected conversation
  useEffect(() => {
    if (!selectedConversation || !user?.id) return;

    const filtered = messages.filter((msg: any) => 
      (msg.fromUserId === user.id && msg.toUserId === selectedConversation) ||
      (msg.fromUserId === selectedConversation && msg.toUserId === user.id)
    ).sort((a: any, b: any) => 
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    ).map((msg: any) => ({
      ...msg,
      type: msg.type || 'chat-message'
    }));

    console.log('=== CHAT MESSAGES DEBUG ===');
    console.log('Current user ID:', user.id);
    console.log('Selected conversation:', selectedConversation);
    console.log('Total messages:', messages.length);
    console.log('Filtered messages:', filtered.length);
    filtered.forEach((msg: any) => {
      console.log(`Message: from=${msg.fromUserId}, to=${msg.toUserId}, isMe=${msg.fromUserId === user.id}, body="${msg.body}"`);
    });

    setChatMessages(filtered);
  }, [selectedConversation, messages, user?.id]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedConversation || isSending) return;

    try {
      setIsSending(true);
      await sendMessage(selectedConversation, messageInput.trim());
      setMessageInput('');
    } catch (err) {
      console.error('Failed to send message:', err);
    } finally {
      setIsSending(false);
    }
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatMessageTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const selectedConvData = conversations.find(c => c.userId === selectedConversation);

  return (
    <div className="messaging-app-container">
      {/* Left Panel - Chat List */}
      <div className={`chat-list-panel ${selectedConversation ? 'hidden-mobile' : ''}`}>
        {/* Chat List Header */}
        <div className="chat-list-header">
          <h2>Chats</h2>
          <div className="chat-search-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8696a0" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search or start new chat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Chat List Items */}
        <div className="chat-list-items">
          {filteredConversations.length === 0 ? (
            <div className="empty-state">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
              </svg>
              <h3>No conversations yet</h3>
              <p>Start messaging with your team members</p>
            </div>
          ) : (
            filteredConversations.map((conv) => (
              <div
                key={conv.userId}
                className={`chat-list-item ${selectedConversation === conv.userId ? 'active' : ''}`}
                onClick={() => setSelectedConversation(conv.userId)}
              >
                {/* Avatar */}
                {conv.avatar ? (
                  <img src={conv.avatar} alt={conv.userName} className="chat-avatar" />
                ) : (
                  <div className="chat-avatar-placeholder">
                    {conv.userName.charAt(0).toUpperCase()}
                  </div>
                )}
                
                {/* Chat Info */}
                <div className="chat-item-content">
                  <div className="chat-item-header">
                    <span className="chat-item-name">{conv.userName}</span>
                    <span className="chat-item-time">{formatTime(conv.lastMessageTime)}</span>
                  </div>
                  <div className="chat-item-preview">
                    <span className="chat-item-preview-text">
                      {conv.lastMessage.length > 35 ? conv.lastMessage.substring(0, 35) + '...' : conv.lastMessage}
                    </span>
                    {conv.unreadCount > 0 && (
                      <span className="chat-item-unread">{conv.unreadCount}</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Panel - Chat Window */}
      <div className={`chat-window-panel ${!selectedConversation ? 'hidden-mobile' : ''}`}>
        {!selectedConversation ? (
          <div className="empty-state">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
            </svg>
            <h3>Select a chat</h3>
            <p>Choose a conversation from the list to start messaging</p>
          </div>
        ) : (
          <>
            {/* Chat Header */}
            <div className="chat-window-header">
              <button className="back-button" onClick={() => setSelectedConversation(null)}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                </svg>
              </button>
              
              <div className="chat-window-header-info">
                {selectedConvData?.avatar ? (
                  <img src={selectedConvData.avatar} alt={selectedConvData.userName} className="chat-avatar" />
                ) : (
                  <div className="chat-avatar-placeholder">
                    {selectedConvData?.userName.charAt(0).toUpperCase()}
                  </div>
                )}
                
                <div className="chat-window-header-text">
                  <h3 className="chat-window-contact-name">{selectedConvData?.userName}</h3>
                  <p className="chat-window-status">online</p>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="message-list-container">
              {chatMessages.map((msg, index) => {
                const isMe = msg.fromUserId === user?.id;
                const messageType = isMe ? 'outgoing' : 'incoming';
                const bubbleClass = isMe ? 'bubble-outgoing' : 'bubble-incoming';
                
                return (
                  <div key={msg.id} className={`message-container ${messageType}`}>
                    <div className={`chat-bubble ${bubbleClass}`}>
                      <div className="message-text">
                        {msg.body}
                      </div>
                      <div className="timestamp">
                        <span>{formatMessageTime(msg.createdAt)}</span>
                        {isMe && (
                          <span className="read-receipt">
                            <svg viewBox="0 0 16 16">
                              <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"/>
                            </svg>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            {/* Message Input */}
            <div className="message-input-container">
              <button className="emoji-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9c.83 0 1.5-.67 1.5-1.5S7.83 8 7 8s-1.5.67-1.5 1.5S6.17 11 7 11zm5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5zm3.5-6.5c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5z"/>
                </svg>
              </button>
              
              <input
                type="text"
                placeholder="Type a message"
                className="message-input"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey && messageInput.trim()) {
                    e.preventDefault();
                    const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
                    handleSendMessage(fakeEvent);
                  }
                }}
              />
              
              <button 
                className="send-button"
                onClick={(e) => {
                  e.preventDefault();
                  const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
                  handleSendMessage(fakeEvent);
                }}
                disabled={!messageInput.trim()}
              >
                <svg viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ModernMessagingPage;
