import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { NotificationBell } from './NotificationBell.tsx';



export const NavBar: React.FC = () => {
  const { token, logout } = useAuth();
  return (
    <>
      <style>{`
        .navbar {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 1.5rem;
          padding: 1.2rem 2.5rem 1.2rem 2.5rem;
          background: #f5ecd6;
          box-shadow: 0 2px 12px rgba(0,0,0,0.07);
          border-bottom: 2px solid #e9d8a6;
          font-size: 1.08rem;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .navbar a {
          color: #1976d2;
          text-decoration: none;
          font-weight: 600;
          padding: 0.5rem 1.2rem;
          border-radius: 8px;
          transition: background 0.2s, color 0.2s;
        }
        .navbar a:hover {
          background: #f5f7fa;
          color: #115293;
        }
        .navbar button {
          background: #d32f2f;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 0.5rem 1.2rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .navbar button:hover {
          background: #b71c1c;
        }
        @media (max-width: 600px) {
          .navbar {
            padding: 0.7rem 0.5rem 0.7rem 0.5rem;
            gap: 0.7rem;
            font-size: 0.98rem;
          }
          .navbar a, .navbar button {
            padding: 0.4rem 0.7rem;
            border-radius: 6px;
          }
        }
      `}</style>
      <nav className="navbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginRight: '2rem' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }} aria-label="Home">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L12 3l9 6.5V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.5z"/><path d="M9 22V12h6v10"/></svg>
          </Link>
        </div>
        {token ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1 }}>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/search">Search</Link>
            <Link to="/saved">My Team</Link>
            <Link to="/status">Status</Link>
            <Link to="/profile">Profile</Link>
            <NotificationBell />
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1, justifyContent: 'flex-end' }}>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </nav>
    </>
  );
};
