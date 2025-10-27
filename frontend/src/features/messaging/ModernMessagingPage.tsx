import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useMessages } from './MessageContext';
import { useNavigate } from 'react-router-dom';
import { API_CONFIG } from '../../config/api';
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

interface TeamMember {
  team_member_id: string;
  name: string;
  email?: string;
  phone?: string;
  role?: string;
  last_location_update?: string;
  location_status?: string;
}

const ModernMessagingPage: React.FC = () => {
  const { user, token } = useAuth();
  const { messages, sendMessage } = useMessages();
  const navigate = useNavigate();
  
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loadingTeam, setLoadingTeam] = useState(false);
  const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Fetch team members on mount to filter conversations
  useEffect(() => {
    if (!token) return;
    
    const fetchTeam = async () => {
      try {
        const response = await fetch(`${API_CONFIG.MATCHING_SERVICE}/api/matching/my-team`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          // Handle nested response structure: data.data.teamMembers
          const members = data.data?.teamMembers || data.teamMembers || [];
          setTeamMembers(members);
          console.log('✅ Team members loaded for messaging:', members.length);
        }
      } catch (error) {
        console.error('Failed to fetch team members:', error);
      }
    };

    fetchTeam();
  }, [token]);

  // Group messages into conversations (only with team members)
  useEffect(() => {
    if (!user?.id) return;

    const conversationMap = new Map<string, Conversation>();
    
    // Create a Set of team member IDs for quick lookup
    const teamMemberIds = new Set(teamMembers.map(m => m.team_member_id));

    messages.forEach((msg: any) => {
      // Determine the other person in the conversation
      const isMe = msg.fromUserId === user.id;
      const otherUserId = isMe ? msg.toUserId : msg.fromUserId;
      
      if (!otherUserId || otherUserId === user.id) return;
      
      // If team members haven't loaded yet, show all conversations
      // Otherwise, only show team member conversations
      if (teamMembers.length > 0 && !teamMemberIds.has(otherUserId)) {
        return;
      }

      const existing = conversationMap.get(otherUserId);
      const msgTime = new Date(msg.createdAt).getTime();

      // Use senderName only if the message is FROM the other person
      // Otherwise, look up the name from team members or use existing conversation name
      let displayName = msg.senderName || 'Team Member';
      if (isMe) {
        // If we sent the message, get the recipient's name from team members or existing conversation
        const teamMember = teamMembers.find(tm => tm.team_member_id === otherUserId);
        displayName = teamMember?.name || existing?.userName || 'Team Member';
      }

      if (!existing || new Date(existing.lastMessageTime).getTime() < msgTime) {
        conversationMap.set(otherUserId, {
          userId: otherUserId,
          userName: displayName,
          lastMessage: msg.body || 'Team request',
          lastMessageTime: msg.createdAt,
          unreadCount: 0, // TODO: Implement unread tracking
        });
      }
    });

    const convList = Array.from(conversationMap.values())
      .sort((a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime());

    setConversations(convList);
  }, [messages, user?.id, teamMembers]);

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

  // Calculate online status based on last location update
  const getOnlineStatus = (memberId: string): { text: string; color: string } => {
    const member = teamMembers.find(tm => tm.team_member_id === memberId);
    
    if (!member?.last_location_update) {
      return { text: 'offline', color: '#999' };
    }

    const lastUpdate = new Date(member.last_location_update);
    const now = new Date();
    const minutesAgo = Math.floor((now.getTime() - lastUpdate.getTime()) / 60000);

    if (minutesAgo < 2) {
      return { text: 'online', color: '#4caf50' }; // Green
    } else if (minutesAgo < 5) {
      return { text: `active ${minutesAgo}m ago`, color: '#ff9800' }; // Orange
    } else if (minutesAgo < 60) {
      return { text: `active ${minutesAgo}m ago`, color: '#999' }; // Gray
    } else if (minutesAgo < 1440) {
      const hours = Math.floor(minutesAgo / 60);
      return { text: `active ${hours}h ago`, color: '#999' };
    } else {
      const days = Math.floor(minutesAgo / 1440);
      return { text: `offline (${days}d ago)`, color: '#999' };
    }
  };

  // Fetch team members when modal opens
  const fetchTeamMembers = async () => {
    if (!token) return;
    
    setLoadingTeam(true);
    try {
      const response = await fetch(`${API_CONFIG.MATCHING_SERVICE}/api/matching/my-team`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        // Handle nested response structure: data.data.teamMembers
        const members = data.data?.teamMembers || data.teamMembers || [];
        setTeamMembers(members);
      }
    } catch (error) {
      console.error('Failed to fetch team members:', error);
    } finally {
      setLoadingTeam(false);
    }
  };

  // Start new conversation with team member
  const startNewConversation = (memberId: string, memberName: string) => {
    // Check if conversation already exists
    const existing = conversations.find(c => c.userId === memberId);
    if (existing) {
      setSelectedConversation(memberId);
      setShowNewMessageModal(false);
      return;
    }

    // Create new conversation entry
    const newConv: Conversation = {
      userId: memberId,
      userName: memberName,
      lastMessage: 'Start a conversation...',
      lastMessageTime: new Date().toISOString(),
      unreadCount: 0
    };
    
    setConversations(prev => [newConv, ...prev]);
    setSelectedConversation(memberId);
    setShowNewMessageModal(false);
  };

  // Soft delete message
  const handleDeleteMessage = async (messageId: string) => {
    if (!token) return;

    // Find the message to check its type
    const messageToDelete = chatMessages.find(msg => msg.id === messageId);
    
    // Only allow deleting actual chat messages, not team requests
    if (messageToDelete?.type === 'team-request') {
      alert('Team requests cannot be deleted. Only chat messages can be deleted.');
      return;
    }

    if (!confirm('Delete this message?')) return;

    try {
      // Optimistic UI update - hide message immediately
      setChatMessages(prev => prev.filter(msg => msg.id !== messageId));

      // Call backend to soft delete
      const response = await fetch(`${API_CONFIG.COMMUNICATION_SERVICE}/messages/${messageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        // If failed, reload messages to restore UI
        console.error('Failed to delete message');
        // Optionally reload messages here
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      // Optionally reload messages here
    }
  };

  const selectedConvData = conversations.find(c => c.userId === selectedConversation);

  return (
    <div className="messaging-app-container">
      {/* Left Panel - Chat List */}
      <div className={`chat-list-panel ${selectedConversation ? 'hidden-mobile' : ''}`}>
        {/* Chat List Header */}
        <div className="chat-list-header">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <h2 style={{ margin: 0 }}>Chats</h2>
            <button
              onClick={() => {
                setShowNewMessageModal(true);
                fetchTeamMembers();
              }}
              style={{
                background: '#25D366',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                boxShadow: '0 2px 6px rgba(37,211,102,0.4)',
                transition: 'all 0.2s'
              }}
              title="New Message"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(37,211,102,0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 6px rgba(37,211,102,0.4)';
              }}
            >
              <span style={{ fontSize: '1.4rem', fontWeight: 'bold', lineHeight: '1', color: 'white' }}>+</span>
            </button>
          </div>
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
                  <p 
                    className="chat-window-status"
                    style={{ color: getOnlineStatus(selectedConversation).color }}
                  >
                    {getOnlineStatus(selectedConversation).text}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="message-list-container">
              {chatMessages.map((msg) => {
                const isMe = msg.fromUserId === user?.id;
                const messageType = isMe ? 'outgoing' : 'incoming';
                const bubbleClass = isMe ? 'bubble-outgoing' : 'bubble-incoming';
                
                return (
                  <div 
                    key={msg.id} 
                    className={`message-container ${messageType}`}
                    onMouseEnter={() => setHoveredMessageId(msg.id)}
                    onMouseLeave={() => setHoveredMessageId(null)}
                    style={{ position: 'relative' }}
                  >
                    {/* Delete button - only show for own messages on hover */}
                    {isMe && hoveredMessageId === msg.id && (
                      <button
                        onClick={() => handleDeleteMessage(msg.id)}
                        style={{
                          position: 'absolute',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          left: messageType === 'outgoing' ? '-35px' : 'auto',
                          right: messageType === 'incoming' ? '-35px' : 'auto',
                          background: '#ff4444',
                          border: 'none',
                          borderRadius: '50%',
                          width: '28px',
                          height: '28px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '0.9rem',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                          transition: 'all 0.2s',
                          zIndex: 10
                        }}
                        title="Delete message"
                      >
                        🗑️
                      </button>
                    )}
                    
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

      {/* New Message Modal */}
      {showNewMessageModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }} onClick={() => setShowNewMessageModal(false)}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            maxWidth: '500px',
            width: '100%',
            maxHeight: '80vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 4px 24px rgba(0,0,0,0.2)'
          }} onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div style={{
              padding: '1.5rem',
              borderBottom: '1px solid #e0e0e0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#111' }}>Start New Conversation</h2>
              <button
                onClick={() => setShowNewMessageModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#666',
                  padding: '0.25rem',
                  lineHeight: 1
                }}
              >
                ×
              </button>
            </div>

            {/* Team Members List */}
            <div style={{
              flex: 1,
              overflow: 'auto',
              padding: '1rem'
            }}>
              {loadingTeam ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                  Loading team members...
                </div>
              ) : teamMembers.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                  <p>No team members found.</p>
                  <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                    Add team members first to start messaging.
                  </p>
                </div>
              ) : (
                teamMembers.map((member) => (
                  <div
                    key={member.team_member_id}
                    onClick={() => startNewConversation(member.team_member_id, member.name)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                      marginBottom: '0.5rem'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f0f2f5'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    {/* Avatar */}
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      flexShrink: 0
                    }}>
                      {member.name.charAt(0).toUpperCase()}
                    </div>

                    {/* Member Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontWeight: '600',
                        fontSize: '1rem',
                        color: '#111',
                        marginBottom: '0.25rem'
                      }}>
                        {member.name}
                      </div>
                      {member.role && (
                        <div style={{
                          fontSize: '0.85rem',
                          color: '#667781',
                          textTransform: 'capitalize'
                        }}>
                          {member.role}
                        </div>
                      )}
                    </div>

                    {/* Arrow Icon */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#8696a0">
                      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                    </svg>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernMessagingPage;
