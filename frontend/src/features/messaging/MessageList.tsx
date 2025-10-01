import { useMessages } from './MessageContext';

export const MessageList = () => {
  const { messages } = useMessages();
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
        <div className="msg-list-header">Messages</div>
        <ul className="msg-list-ul">
          {messages.map((msg, idx) => (
            <li key={msg.id || idx} className="msg-list-li">
              <span className="msg-list-from">{msg.from}:</span>
              <span className="msg-list-content">{msg.content}</span>
              <div className="msg-list-timestamp">{new Date(msg.timestamp).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
