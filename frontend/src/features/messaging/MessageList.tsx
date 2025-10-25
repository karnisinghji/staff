import { useState } from 'react';
import { useMessages } from './MessageContext';
import { useAuth } from '../auth/AuthContext';

export const MessageList = () => {
  const { messages, loading, error, sendMessage } = useMessages();
  const { user } = useAuth();
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<string>('');
  const [sending, setSending] = useState(false);

  const handleReply = async (msg: any) => {
    if (!replyText.trim()) return;
    
    // Determine the correct recipient:
    // If the message is from you (fromUserId === your ID), reply to toUserId
    // If the message is to you (toUserId === your ID), reply to fromUserId
    const recipientId = msg.fromUserId === user?.id ? msg.toUserId : msg.fromUserId;
    
    setSending(true);
    try {
      await sendMessage(recipientId, replyText);
      setReplyText('');
      setReplyingTo(null);
    } catch (err) {
      console.error('Failed to send reply:', err);
    } finally {
      setSending(false);
    }
  };
  return (
    <>
      <style>{`
        .msg-list-container {
          width: 100%;
          max-width: 500px;
          margin: 2rem auto 0 auto;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.08);
          padding: 2rem 2rem 1rem 2rem;
        }
        .msg-list-header {
          text-align: center;
          color: #1976d2;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }
        .msg-list-ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .msg-list-li {
          margin-bottom: 1.2rem;
          background: #f7f9fc;
          border-radius: 8px;
          padding: 1rem;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }
        .msg-list-from {
          font-weight: 600;
          color: #43a047;
        }
        .msg-list-content {
          margin-left: 0.5rem;
          color: #222;
        }
        .msg-list-timestamp {
          font-size: 0.85em;
          color: #888;
          margin-top: 0.5rem;
        }
        @media (max-width: 600px) {
          .msg-list-container {
            max-width: 100vw;
            padding: 1rem 0.5rem 0.5rem 0.5rem;
            border-radius: 8px;
          }
          .msg-list-header {
            font-size: 1.1rem;
          }
          .msg-list-li {
            font-size: 0.98rem;
            padding: 0.7rem;
          }
        }
      `}</style>
      <div className="msg-list-container">
        <div className="msg-list-header">Direct Messages</div>
        
        <div style={{
          background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
          color: 'white',
          padding: '0.75rem',
          borderRadius: '8px',
          marginBottom: '1rem',
          fontSize: '0.85rem',
          textAlign: 'center'
        }}>
          💡 <strong>Looking for team requests?</strong> Check your{' '}
          <a href="/saved" style={{ color: 'white', textDecoration: 'underline', fontWeight: 'bold' }}>
            My Team
          </a>{' '}
          page or the 🔔 notification bell above!
        </div>
        
        {loading && messages.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '2rem',
            color: '#666',
            fontSize: '0.95rem'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '1rem' }}>⏳</div>
            <div>Loading messages...</div>
          </div>
        )}
        
        {error && (
          <div style={{
            background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
            color: 'white',
            padding: '1rem',
            borderRadius: '12px',
            marginBottom: '1rem',
            textAlign: 'center',
            boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '0.5rem' }}>⚠️</div>
            <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
              Error Loading Messages
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.95 }}>
              {error}
            </div>
          </div>
        )}
        
        {messages.length === 0 && !loading && !error && (
          <div style={{
            textAlign: 'center',
            padding: '2rem',
            color: '#666',
            fontSize: '0.95rem'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '1rem', opacity: 0.5 }}>💬</div>
            <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>No direct messages yet</div>
            <div style={{ fontSize: '0.85rem', marginTop: '0.5rem', lineHeight: '1.6' }}>
              Start a conversation by sending a message below
            </div>
            <div style={{ 
              marginTop: '1rem', 
              padding: '0.75rem',
              background: '#f5f5f5',
              borderRadius: '6px',
              fontSize: '0.8rem',
              color: '#555'
            }}>
              <strong>💡 Tip:</strong> To get a user's ID, go to{' '}
              <a href="/saved" style={{ color: '#1976D2', textDecoration: 'underline' }}>
                My Team
              </a>
              {' '}and click on their profile
            </div>
          </div>
        )}
        
        <ul className="msg-list-ul">
          {messages.map((msg) => {
            const senderLabel = msg.senderName 
              ? `${msg.senderName}${msg.senderCompany ? ` (${msg.senderCompany})` : ''}`
              : msg.fromUserId;
            
            return (
              <li key={msg.id} className="msg-list-li">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <span className="msg-list-from">{senderLabel}</span>
                  {msg.status && (
                    <span style={{
                      fontSize: '0.75rem',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '12px',
                      background: msg.status === 'accepted' ? '#4caf50' : msg.status === 'rejected' ? '#f44336' : '#ff9800',
                      color: 'white',
                      fontWeight: 'bold'
                    }}>
                      {msg.status}
                    </span>
                  )}
                </div>
                <div className="msg-list-content">{msg.body}</div>
                {msg.matchContext?.skill && (
                  <div style={{ 
                    fontSize: '0.8rem', 
                    color: '#666', 
                    marginTop: '0.5rem',
                    fontStyle: 'italic'
                  }}>
                    Skill: {msg.matchContext.skill}
                  </div>
                )}
                <div className="msg-list-timestamp">{new Date(msg.createdAt).toLocaleString()}</div>
                
                {/* Reply Section */}
                {replyingTo === msg.id ? (
                  <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e0e0e0' }}>
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your reply..."
                      style={{
                        width: '100%',
                        minHeight: '60px',
                        padding: '0.75rem',
                        border: '2px solid #2196F3',
                        borderRadius: '8px',
                        fontSize: '0.95rem',
                        fontFamily: 'inherit',
                        resize: 'vertical',
                        outline: 'none'
                      }}
                    />
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                      <button
                        onClick={() => handleReply(msg)}
                        disabled={sending || !replyText.trim()}
                        style={{
                          flex: 1,
                          padding: '0.5rem 1rem',
                          background: sending || !replyText.trim() ? '#ccc' : 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '0.9rem',
                          fontWeight: 'bold',
                          cursor: sending || !replyText.trim() ? 'not-allowed' : 'pointer',
                          boxShadow: sending || !replyText.trim() ? 'none' : '0 2px 8px rgba(33, 150, 243, 0.3)'
                        }}
                      >
                        {sending ? '⏳ Sending...' : '✉️ Send Reply'}
                      </button>
                      <button
                        onClick={() => {
                          setReplyingTo(null);
                          setReplyText('');
                        }}
                        style={{
                          padding: '0.5rem 1rem',
                          background: '#f5f5f5',
                          color: '#666',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '0.9rem',
                          cursor: 'pointer'
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setReplyingTo(msg.id)}
                    style={{
                      marginTop: '0.75rem',
                      padding: '0.5rem 1rem',
                      background: 'linear-gradient(135deg, #4CAF50 0%, #43A047 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(76, 175, 80, 0.3)',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(76, 175, 80, 0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(76, 175, 80, 0.3)';
                    }}
                  >
                    💬 Reply
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
