import { useNotifications } from './NotificationContext';

export const NotificationList = () => {
  const { notifications, removeNotification } = useNotifications();
  return (
    <>
      <style>{`
        .notif-list {
          position: fixed;
          top: 16px;
          right: 16px;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .notif-item {
          padding: 14px 18px;
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.10);
          border-left: 6px solid #1976d2;
          min-width: 220px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 1rem;
        }
        .notif-item[data-type="success"] {
          border-left-color: #43a047;
        }
        .notif-item[data-type="error"] {
          border-left-color: #d32f2f;
        }
        .notif-item[data-type="info"] {
          border-left-color: #1976d2;
        }
        .notif-dismiss {
          margin-left: 18px;
          background: #eee;
          border: none;
          border-radius: 6px;
          padding: 6px 12px;
          cursor: pointer;
          font-size: 0.95rem;
          color: #333;
          transition: background 0.2s;
        }
        .notif-dismiss:hover {
          background: #ddd;
        }
        @media (max-width: 600px) {
          .notif-list {
            top: 8px;
            right: 8px;
            gap: 8px;
          }
          .notif-item {
            min-width: 140px;
            font-size: 0.92rem;
            padding: 8px 10px;
          }
        }
      `}</style>
      <div className="notif-list">
        {notifications.map(n => (
          <div key={n.id} className="notif-item" data-type={n.type || 'info'}>
            <span>{n.message}</span>
            <button className="notif-dismiss" onClick={() => removeNotification(n.id)}>Dismiss</button>
          </div>
        ))}
      </div>
    </>
  );
};
