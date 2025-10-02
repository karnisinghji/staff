import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { NotificationBell } from './NotificationBell.tsx';

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
          padding: 1rem 2rem;
          background: #f5ecd6;
          box-shadow: 0 2px 12px rgba(0,0,0,0.07);
          border-bottom: 2px solid #e9d8a6;
          font-size: 1.08rem;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          margin-right: 2rem;
        }

        .navbar-menu {
          display: flex;
          align-items: center;
          gap: 1.5rem;
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
          gap: 1.5rem;
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .navbar a {
          color: #1976d2;
          text-decoration: none;
          font-weight: 600;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .navbar a:hover {
          background: #f5f7fa;
          color: #115293;
          transform: translateY(-1px);
        }

        .navbar button {
          background: #d32f2f;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 0.5rem 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .navbar button:hover {
          background: #b71c1c;
          transform: translateY(-1px);
        }

        .mobile-menu-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          color: #1976d2;
        }

        .mobile-menu {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: #f5ecd6;
          border-bottom: 2px solid #e9d8a6;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          flex-direction: column;
          padding: 1rem;
          gap: 0.5rem;
        }

        .mobile-menu.open {
          display: flex;
        }

        .mobile-menu a, .mobile-menu button {
          width: 100%;
          text-align: center;
          padding: 0.75rem;
          margin: 0.25rem 0;
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

        /* Mobile styles */
        @media (max-width: 768px) {
          .navbar {
            padding: 0.75rem 1rem;
            position: relative;
          }

          .navbar-brand {
            margin-right: 1rem;
          }

          .navbar-menu {
            display: none;
          }

          .mobile-menu-toggle {
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
        <div className="navbar-brand">
          <Link to="/" aria-label="Home">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9.5L12 3l9 6.5V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.5z"/>
              <path d="M9 22V12h6v10"/>
            </svg>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
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

        {/* Desktop Menu */}
        {token ? (
          <div className="navbar-menu authenticated">
            <div className="navbar-links">
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/search">Search</Link>
              <Link to="/saved">My Team</Link>
              <Link to="/status">Status</Link>
              <Link to="/profile">Profile</Link>
            </div>
            <div className="navbar-actions">
              <NotificationBell />
              <button onClick={logout}>Logout</button>
            </div>
          </div>
        ) : (
          <div className="navbar-menu unauthenticated">
            <div className="navbar-links">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          {token ? (
            <>
              <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
              <Link to="/search" onClick={() => setIsMobileMenuOpen(false)}>Search</Link>
              <Link to="/saved" onClick={() => setIsMobileMenuOpen(false)}>My Team</Link>
              <Link to="/status" onClick={() => setIsMobileMenuOpen(false)}>Status</Link>
              <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>Profile</Link>
              <button onClick={() => { logout(); setIsMobileMenuOpen(false); }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
              <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>Register</Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};
