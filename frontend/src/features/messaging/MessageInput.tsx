import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMessages } from './MessageContext';

export const MessageInput = () => {
  const { sendMessage, loading, messages } = useMessages();
  const [searchParams] = useSearchParams();
  const [toUserId, setToUserId] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');

  // Pre-populate recipient from URL parameters and find their name
  useEffect(() => {
    const userId = searchParams.get('userId');
    const userName = searchParams.get('userName');
    
    if (userId) {
      setToUserId(userId);
      
      // Try to get name from URL parameter first
      if (userName) {
        setRecipientName(userName);
      } else {
        // Try to find the name from existing messages
        const message = messages.find(m => m.fromUserId === userId || m.toUserId === userId);
        if (message?.senderName) {
          setRecipientName(message.senderName);
        }
      }
    }
  }, [searchParams, messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!toUserId || !body) return;
    
    setSending(true);
    setSendError('');
    
    try {
      await sendMessage(toUserId, body);
      setBody(''); // Clear message after sending
    } catch (err: any) {
      setSendError(err.message || 'Failed to send message');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <style>{`
        .msg-input-form {
          max-width: 500px;
          margin: 1.5rem auto 2rem auto;
          display: flex;
          gap: 1rem;
        }
        .msg-input-form input {
          padding: 1rem;
          border-radius: 10px;
          border: 1px solid #bbb;
          font-size: 1.1rem;
          background: #f7f9fc;
          color: #000;
        }
        .msg-input-form button {
          padding: 1rem 2rem;
          border-radius: 10px;
          border: none;
          background: #43a047;
          color: #fff;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(67,160,71,0.08);
          transition: background 0.2s;
        }
        .msg-input-form button:hover {
          background: #2e7031;
        }
        @media (max-width: 600px) {
          .msg-input-form {
            max-width: 100vw;
            gap: 0.5rem;
          }
          .msg-input-form input, .msg-input-form button {
            font-size: 1rem;
            padding: 0.7rem;
            border-radius: 7px;
          }
        }
      `}</style>
      {sendError && (
        <div style={{
          maxWidth: '500px',
          margin: '0 auto 1rem auto',
          padding: '0.75rem',
          background: '#ffebee',
          color: '#c62828',
          borderRadius: '8px',
          fontSize: '0.9rem',
          textAlign: 'center'
        }}>
          {sendError}
        </div>
      )}
      
      <form className="msg-input-form" onSubmit={handleSend}>
        {recipientName ? (
          <div style={{
            flex: 1,
            padding: '1rem',
            borderRadius: '10px',
            border: '2px solid #2196F3',
            background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            color: '#1565c0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            To: {recipientName}
          </div>
        ) : (
          <input
            type="text"
            placeholder="Recipient User ID"
            value={toUserId}
            onChange={e => setToUserId(e.target.value)}
            required
            disabled={sending}
            style={{ 
              flex: 1,
              opacity: sending ? 0.6 : 1
            }}
          />
        )}
        <input
          type="text"
          placeholder="Type your message..."
          value={body}
          onChange={e => setBody(e.target.value)}
          required
          disabled={sending}
          style={{ 
            flex: 2,
            opacity: sending ? 0.6 : 1
          }}
        />
        <button 
          type="submit"
          disabled={sending || !toUserId || !body}
          style={{
            opacity: (sending || !toUserId || !body) ? 0.6 : 1,
            cursor: (sending || !toUserId || !body) ? 'not-allowed' : 'pointer',
            background: (sending || !toUserId || !body) ? '#999' : '#43a047'
          }}
        >
          {sending ? 'Sending...' : 'Send'}
        </button>
      </form>
    </>
  );
};
