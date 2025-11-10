import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { NotificationBell } from './NotificationBell.tsx';
import logoImage from '../../assets/comeondost-logo.png';

export const NavBar: React.FC = () => {
  const { token, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <>
      <style>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 2rem;
          background: #ffffff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          border-bottom: 1px solid #e0e0e0;
          font-size: 1rem;
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-right: 2rem;
        }

        .navbar-brand-text {
          color: #1976d2;
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.5px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .navbar-brand-icon {
          background: #1976d2;
          padding: 0.5rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .navbar-menu {
          display: flex;
          align-items: center;
          gap: 2rem;
          flex: 1;
        }

        .navbar-menu.authenticated {
          justify-content: space-between;
        }

        .navbar-menu.unauthenticated {
          justify-content: flex-end;
        }

        .navbar-links {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .navbar a {
          color: #333;
          text-decoration: none;
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          transition: all 0.2s ease;
          white-space: nowrap;
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .navbar a:hover {
          background: #f5f7fa;
          color: #1976d2;
          transform: translateY(-2px);
        }

        .navbar a.active {
          background: #e3f2fd;
          color: #1976d2;
          font-weight: 600;
        }

        .navbar button {
          background: #1976d2;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          padding: 0.5rem 1.25rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .navbar button:hover {
          background: #1565c0;
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(25, 118, 210, 0.3);
        }

        .mobile-menu-toggle {
          display: none;
          background: #f5f7fa;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          cursor: pointer;
          padding: 0.5rem;
          color: #333;
        }

        .mobile-menu-toggle:hover {
          background: #e0e0e0;
        }

        .mobile-menu {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-top: 1px solid rgba(255,255,255,0.2);
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
          flex-direction: column;
          padding: 1rem;
          gap: 0.5rem;
          backdrop-filter: blur(10px);
        }

        .mobile-menu.open {
          display: flex;
        }

        .mobile-menu a, .mobile-menu button {
          width: 100%;
          text-align: center;
          padding: 0.75rem;
          margin: 0.25rem 0;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: #ffffff;
        }

        .mobile-menu a:hover, .mobile-menu button:hover {
          background: rgba(255,255,255,0.2);
        }

        /* Tablet styles */
        @media (max-width: 968px) {
          .navbar {
            padding: 1rem 1.5rem;
          }
          
          .navbar-links {
            gap: 1rem;
          }
          
          .navbar a, .navbar button {
            padding: 0.4rem 0.8rem;
            font-size: 0.95rem;
          }
        }

        /* Mobile styles - modern gradient when bottom nav is present */
        @media (max-width: 768px) {
          .navbar {
            padding: 0.75rem 1rem;
            position: relative;
            justify-content: space-between;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            border-bottom: none;
          }

          .navbar-brand-text {
            color: #ffffff;
          }

          .navbar-brand-icon {
            background: rgba(255,255,255,0.2);
            backdrop-filter: blur(10px);
          }

          .navbar-brand-icon svg {
            stroke: #ffffff;
          }

        .mobile-actions {
          display: none;
          align-items: center;
          gap: 0.5rem;
        }

        .mobile-menu-toggle {
          background: none;
          border: none;
          cursor: pointer;
          color: white;
          padding: 0.5rem;
          display: none;
          transition: opacity 0.2s;
        }

        .mobile-menu-toggle:hover {
          opacity: 0.8;
        }          .navbar-brand {
            margin-right: auto;
            flex: 1;
          }

          .navbar-menu {
            display: none;
          }

          .mobile-actions {
            display: flex;
          }

          /* Hide desktop notification bell on mobile, show mobile one */
          .navbar-actions .notification-bell {
            display: none !important;
          }

          .mobile-menu-toggle {
            display: block;
            margin-left: auto;
          }

          /* Show Home and settings in mobile menu */
          .mobile-menu a,
          .mobile-menu button {
            display: block;
          }
        }

        /* Small mobile styles */
        @media (max-width: 480px) {
          .navbar {
            padding: 0.5rem 0.75rem;
          }
          
          .navbar-brand svg {
            width: 24px;
            height: 24px;
          }
        }
      `}</style>
      
      <nav className="navbar">
        {/* Brand/Logo */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div className="navbar-brand">
            <div className="navbar-brand-icon">
              <img src={logoImage} alt="ComeOnDost Logo" style={{ height: '32px', width: 'auto', objectFit: 'contain' }} />
            </div>
            <span className="navbar-brand-text">ComeOnDost</span>
          </div>
        </Link>

        {/* Mobile Actions - Show only menu toggle */}
        <div className="mobile-actions">
          {token && <NotificationBell />}
          <button 
            className="mobile-menu-toggle" 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        {token ? (
          <div className="navbar-menu authenticated">
            <div className="navbar-links">
              <Link to="/">🏠 Home</Link>
              <Link to="/dashboard">📊 Dashboard</Link>
              <Link to="/search">🔍 Search</Link>
              <Link to="/saved">👥 My Team</Link>
              <Link to="/messages">💬 Messages</Link>
              <Link to="/profile">👤 Profile</Link>
              <Link to="/status">📈 Status</Link>
            </div>
            <div className="navbar-actions">
              <NotificationBell />
              <button onClick={logout}>🚪 Logout</button>
            </div>
          </div>
        ) : (
          <div className="navbar-menu unauthenticated">
            <div className="navbar-links">
              <Link to="/">🏠 Home</Link>
              <Link to="/login">🔐 Login</Link>
              <Link to="/register">📝 Register</Link>
            </div>
          </div>
        )}

        {/* Mobile Menu - Simplified (main navigation is in bottom nav) */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          {token ? (
            <>
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>🏠 Home</Link>
              <Link to="/status" onClick={() => setIsMobileMenuOpen(false)}>📈 Status</Link>
              <button onClick={() => { logout(); setIsMobileMenuOpen(false); }}>🚪 Logout</button>
            </>
          ) : (
            <>
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>🏠 Home</Link>
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>🔐 Login</Link>
              <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>📝 Register</Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};
