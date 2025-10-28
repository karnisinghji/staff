import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

// Import images (Vite will handle these correctly)
import fort1Image from '/images/fort1.png';
import fort2Image from '/images/fort2.png';

export const HomePage: React.FC = () => (


  <div className={styles.homeRoot}>
    {/* Left: Text & Actions */}
    <div className={styles.leftSection}>
      <div style={{ background: '#e3f2fd', borderRadius: 12, padding: '1.5rem 2rem', marginBottom: 24, boxShadow: '0 2px 8px rgba(25, 118, 210, 0.1)', textAlign: 'center', border: '1px solid #bbdefb' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: 16, color: '#1a1a1a', lineHeight: 1.2 }}>Connecting People.<br />Creating Success.</h1>
        <p style={{ fontSize: '1.1rem', color: '#4a5568', marginBottom: 0, lineHeight: 1.6 }}>
          Welcome! Find the best matches for your needs, chat in real time, and manage your saved connections.
        </p>
      </div>
      <div className={styles.buttonRow}>
        <Link to="/search"><button style={{ padding: '0.9rem 2rem', fontSize: '1.05rem', borderRadius: 8, border: 'none', background: '#1976d2', color: '#fff', fontWeight: 600, boxShadow: '0 2px 8px rgba(25, 118, 210, 0.3)', cursor: 'pointer', transition: 'all 0.2s' }}>Find Matches</button></Link>
        <Link to="/messages"><button style={{ padding: '0.9rem 2rem', fontSize: '1.05rem', borderRadius: 8, border: 'none', background: '#4caf50', color: '#fff', fontWeight: 600, boxShadow: '0 2px 8px rgba(76, 175, 80, 0.3)', cursor: 'pointer', transition: 'all 0.2s' }}>Messages</button></Link>
  {/* <Link to="/saved"><button style={{ padding: '0.9rem 2rem', fontSize: '1.05rem', borderRadius: 8, border: 'none', background: '#ffc107', color: '#1a1a1a', fontWeight: 600, boxShadow: '0 2px 8px rgba(255, 193, 7, 0.3)', cursor: 'pointer', transition: 'all 0.2s' }}>My Team</button></Link> */}
      </div>

      {/* Mobile App Download Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)', 
        borderRadius: 12, 
        padding: '1.5rem', 
        marginTop: 32, 
        textAlign: 'center',
        boxShadow: '0 4px 12px rgba(37, 211, 102, 0.2)'
      }}>
        <div style={{ marginBottom: 12 }}>
          <svg 
            width="48" 
            height="48" 
            viewBox="0 0 24 24" 
            fill="white" 
            style={{ marginBottom: 8 }}
          >
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
          </svg>
        </div>
        <h3 style={{ color: 'white', fontSize: '1.4rem', fontWeight: 700, marginBottom: 8 }}>
          📱 Download Android App
        </h3>
        <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.95rem', marginBottom: 16 }}>
          Get the full mobile experience with our native Android app
        </p>
        <a 
          href="https://drive.google.com/uc?export=download&id=1D6fAn60m3VwsqcVgWT-DUYKML7YHhAho" 
          target="_blank"
          rel="noopener noreferrer"
          style={{ 
            display: 'inline-block',
            textDecoration: 'none'
          }}
        >
          <button style={{ 
            padding: '0.9rem 2.5rem', 
            fontSize: '1.1rem', 
            borderRadius: 10, 
            border: '2px solid white', 
            background: 'white', 
            color: '#25D366', 
            fontWeight: 700, 
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.15)', 
            cursor: 'pointer', 
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            margin: '0 auto'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
            </svg>
            Download APK (18 MB)
          </button>
        </a>
        <div style={{ 
          marginTop: 12, 
          padding: '8px 12px', 
          background: 'rgba(255, 255, 255, 0.2)', 
          borderRadius: 8,
          fontSize: '0.85rem',
          color: 'white'
        }}>
          <strong>📥 How to Install:</strong><br/>
          1. Click "Download APK" button above<br/>
          2. File will download directly (18 MB)<br/>
          3. Open the downloaded APK file<br/>
          4. Enable "Install from Unknown Sources" if prompted<br/>
          5. Tap "Install" to complete<br/>
          <em>Note: If Google Drive shows a virus scan warning, click "Download anyway". This is normal for APK files not from Play Store.</em>
        </div>
      </div>
    </div>

    {/* Right: Images */}
    <div className={styles.rightSection}>
  <img src={fort1Image} alt="Fort 1" className={styles.fortImage} />
  <img src={fort2Image} alt="Fort 2" className={styles.fortImage} />
    </div>
  </div>
);
