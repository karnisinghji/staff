import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

export const HomePage: React.FC = () => (


  <div className={styles.homeRoot}>
    {/* Left: Text & Actions */}
    <div className={styles.leftSection}>
      <div style={{ background: '#f5ecd6', borderRadius: 12, padding: '1.2rem 1.5rem', marginBottom: 28, boxShadow: '0 2px 8px #e9d8a633', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 700, marginBottom: 16, color: '#222', lineHeight: 1.2 }}>Connecting People.<br />Creating Success.</h1>
        <p style={{ fontSize: '1.15rem', color: '#555', marginBottom: 0 }}>
          Welcome! Find the best matches for your needs, chat in real time, and manage your saved connections.
        </p>
      </div>
      <div className={styles.buttonRow}>
        <Link to="/search"><button style={{ padding: '0.85rem 2.2rem', fontSize: '1.08rem', borderRadius: 10, border: 'none', background: '#c97d60', color: '#fff', fontWeight: 600, boxShadow: '0 2px 8px #c97d6022', cursor: 'pointer', transition: 'background 0.2s' }}>Find Matches</button></Link>
        <Link to="/messages"><button style={{ padding: '0.85rem 2.2rem', fontSize: '1.08rem', borderRadius: 10, border: 'none', background: '#a5a58d', color: '#fff', fontWeight: 600, boxShadow: '0 2px 8px #a5a58d22', cursor: 'pointer', transition: 'background 0.2s' }}>Messages</button></Link>
  {/* <Link to="/saved"><button style={{ padding: '0.85rem 2.2rem', fontSize: '1.08rem', borderRadius: 10, border: 'none', background: '#e9d8a6', color: '#222', fontWeight: 600, boxShadow: '0 2px 8px #e9d8a622', cursor: 'pointer', transition: 'background 0.2s' }}>My Team</button></Link> */}
      </div>
    </div>

    {/* Right: Images */}
    <div className={styles.rightSection}>
  <img src="/images/fort1.png" alt="Fort 1" className={styles.fortImage} />
  <img src="/images/fort2.png" alt="Fort 2" className={styles.fortImage} />
    </div>
  </div>
);
