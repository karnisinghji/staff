import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMessages } from './MessageContext';

export const MessageInput = () => {
  const { sendMessage } = useMessages();
  const [searchParams] = useSearchParams();
  const [to, setTo] = useState('');
  const [content, setContent] = useState('');

  // Pre-populate recipient from URL parameters
  useEffect(() => {
    const userId = searchParams.get('userId');
    const userName = searchParams.get('userName');
    
    if (userId && userName) {
      // Set the recipient field with user name (for display)
      setTo(userName);
    } else if (userId) {
      // Fallback to userId if userName not provided
      setTo(userId);
    }
  }, [searchParams]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (to && content) {
      sendMessage(to, content);
      setContent('');
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
      <form className="msg-input-form" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Recipient"
          value={to}
          onChange={e => setTo(e.target.value)}
          required
          style={{ flex: 1 }}
        />
        <input
          type="text"
          placeholder="Message"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
          style={{ flex: 2 }}
        />
        <button type="submit">Send</button>
      </form>
    </>
  );
};
