import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ModernHomePage.css';
import logoImage from '../../assets/comeondost-logo.png';

const ModernHomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="modern-home-container">
      {/* Header */}
      <div className="modern-home-header">
        <div className="logo">
          <img src={logoImage} alt="ComeOnDost Logo" className="logo-image" />
          <span>ComeOnDost</span>
        </div>
        <div className="header-buttons">
          <button className="btn-login" onClick={() => navigate('/login')}>
            Login
          </button>
          <button className="btn-signup" onClick={() => navigate('/register')}>
            Sign Up
          </button>
        </div>
      </div>

      {/* Hero Section with Network Visualization */}
      <div className="hero-section">
        {/* 3D Network Background */}
        <div className="network-visualization">
          {/* Grid Base */}
          {/* 3D Network Background */}
          <svg className="grid-svg" viewBox="0 0 500 450" preserveAspectRatio="xMidYMid meet">
            {/* Grid lines */}
            <defs>
              <linearGradient id="gridGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(0, 188, 212, 0.5)" />
                <stop offset="100%" stopColor="rgba(147, 51, 234, 0.4)" />
              </linearGradient>
              <linearGradient id="platformGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(0, 188, 212, 0.15)" />
                <stop offset="50%" stopColor="rgba(147, 51, 234, 0.1)" />
                <stop offset="100%" stopColor="rgba(236, 72, 153, 0.15)" />
              </linearGradient>
            </defs>
            
            {/* 3D Platform base with perspective */}
            <path
              d="M 50 320 Q 250 340 450 320 L 450 380 Q 250 400 50 380 Z"
              fill="url(#platformGradient)"
              opacity="0.4"
            />
            
            {/* Curved horizontal grid lines with 3D perspective */}
            {[...Array(10)].map((_, i) => {
              const y = 280 + i * 12;
              const curve = 15 - i * 1.5;
              return (
                <path
                  key={`h-${i}`}
                  d={`M 50 ${y} Q 250 ${y + curve} 450 ${y}`}
                  stroke="url(#gridGradient)"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.6"
                />
              );
            })}
            
            {/* Vertical perspective grid lines */}
            {[...Array(15)].map((_, i) => {
              const x = 50 + i * 28;
              const spread = Math.abs(i - 7) * 3;
              return (
                <line
                  key={`v-${i}`}
                  x1={x}
                  y1="280"
                  x2={x + spread}
                  y2="390"
                  stroke="url(#gridGradient)"
                  strokeWidth="1.5"
                  opacity="0.5"
                />
              );
            })}            {/* Wavy spiral path to center */}
            <g className="spiral-path">
              <path
                d="M 250 300 Q 200 280 180 250 Q 160 220 190 190 Q 220 160 250 170 Q 280 180 300 210 Q 320 240 280 260 Q 240 280 250 300"
                stroke="#9333ea"
                strokeWidth="3"
                fill="none"
                opacity="0.7"
                className="spiral-line"
              />
              <path
                d="M 250 300 Q 300 280 320 250 Q 340 220 310 190 Q 280 160 250 170"
                stroke="#00bcd4"
                strokeWidth="3"
                fill="none"
                opacity="0.7"
                className="spiral-line"
              />
            </g>

            {/* Peer-to-peer connections */}
            <g className="peer-connections">
              <line x1="120" y1="320" x2="180" y2="305" stroke="#00bcd4" strokeWidth="2.5" opacity="0.6" className="peer-line"/>
              <line x1="180" y1="305" x2="220" y2="280" stroke="#9333ea" strokeWidth="2.5" opacity="0.6" className="peer-line"/>
              <line x1="280" y1="280" x2="320" y2="305" stroke="#d946ef" strokeWidth="2.5" opacity="0.6" className="peer-line"/>
              <line x1="320" y1="305" x2="380" y2="320" stroke="#00bcd4" strokeWidth="2.5" opacity="0.6" className="peer-line"/>
              <line x1="220" y1="280" x2="280" y2="280" stroke="#00e5ff" strokeWidth="2.5" opacity="0.6" className="peer-line"/>
              <line x1="150" y1="290" x2="220" y2="280" stroke="#9333ea" strokeWidth="2.5" opacity="0.6" className="peer-line"/>
              <line x1="280" y1="280" x2="350" y2="290" stroke="#d946ef" strokeWidth="2.5" opacity="0.6" className="peer-line"/>
            </g>

            {/* Center tower/pyramid with spiral */}
            <g className="tower">
              <path
                d="M 250 100 L 240 150 L 250 200 L 260 150 Z"
                fill="#9333ea"
                opacity="0.3"
                className="tower-pyramid"
              />
              <line x1="250" y1="50" x2="250" y2="320" stroke="#9333ea" strokeWidth="4" opacity="0.7"/>
              <circle cx="250" cy="80" r="8" fill="#9333ea" opacity="1" className="tower-node"/>
              <circle cx="250" cy="120" r="7" fill="#d946ef" opacity="0.95" className="tower-node"/>
              <circle cx="250" cy="160" r="7" fill="#00bcd4" opacity="0.95" className="tower-node"/>
              <circle cx="250" cy="200" r="7" fill="#00e5ff" opacity="0.95" className="tower-node"/>
              <circle cx="250" cy="240" r="6" fill="#d946ef" opacity="0.9" className="tower-node"/>
            </g>

            {/* People icons on platform */}
            {[
              { x: 120, y: 320, color: '#00bcd4', size: 1 },
              { x: 180, y: 305, color: '#9333ea', size: 1.1 },
              { x: 220, y: 280, color: '#00e5ff', size: 1.2 },
              { x: 280, y: 280, color: '#d946ef', size: 1.2 },
              { x: 320, y: 305, color: '#00bcd4', size: 1.1 },
              { x: 380, y: 320, color: '#9333ea', size: 1 },
              { x: 150, y: 290, color: '#00e5ff', size: 1.15 },
              { x: 350, y: 290, color: '#d946ef', size: 1.15 },
              { x: 250, y: 260, color: '#9333ea', size: 1.3 },
              { x: 200, y: 330, color: '#00bcd4', size: 0.9 },
              { x: 300, y: 330, color: '#d946ef', size: 0.9 },
            ].map((person, i) => (
              <g key={`person-${i}`} className="person-icon">
                {/* Connection line to center with curve */}
                <path
                  d={`M ${person.x} ${person.y} Q ${(person.x + 250) / 2} ${person.y - 20} 250 200`}
                  stroke={person.color} 
                  strokeWidth={2.5 * person.size}
                  fill="none"
                  opacity="0.5"
                  className="connection-line"
                />
                {/* Platform circle under person */}
                <ellipse 
                  cx={person.x} 
                  cy={person.y + 8} 
                  rx={8 * person.size} 
                  ry={3 * person.size} 
                  fill={person.color} 
                  opacity="0.3"
                />
                {/* Body */}
                <rect 
                  x={person.x - 3 * person.size} 
                  y={person.y - 8 * person.size} 
                  width={6 * person.size} 
                  height={8 * person.size} 
                  fill={person.color} 
                  opacity="1" 
                  rx="1"
                  className="person-body"
                />
                {/* Head */}
                <circle cx={person.x} cy={person.y - 12 * person.size} r={4 * person.size} fill={person.color} opacity="1" className="person-head"/>
              </g>
            ))}

            {/* Large Clear Arrow pointing up */}
            <g className="arrow-up">
              {/* Arrow glow effect */}
              <line x1="250" y1="85" x2="250" y2="20" stroke="#9333ea" strokeWidth="8" opacity="0.3"/>
              {/* Main arrow line */}
              <line x1="250" y1="85" x2="250" y2="20" stroke="#9333ea" strokeWidth="5" opacity="0.9"/>
              {/* Arrow head - large and clear */}
              <polygon points="250,15 235,35 265,35" fill="#9333ea" opacity="0.95"/>
              {/* Arrow head outline for clarity */}
              <polygon points="250,15 235,35 265,35" fill="none" stroke="#fff" strokeWidth="1" opacity="0.6"/>
              {/* Side arrow decorations */}
              <polygon points="250,25 242,35 258,35" fill="#d946ef" opacity="0.8"/>
            </g>
          </svg>
        </div>

        {/* Hero Content */}
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-line">Connect.</span>
            <span className="title-line">Collaborate.</span>
            <span className="title-line">Succeed.</span>
          </h1>
          <p className="hero-subtitle">
            Connecting People. Creating Success. Find your next great match,
            <br />
            join communities, and achieve shared goals.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate('/register')}>
              Join Now
            </button>
            <button className="btn-secondary" onClick={() => navigate('/login')}>
              Learn More
            </button>
          </div>
          <p className="login-link">
            Already have an account? <a onClick={() => navigate('/login')}>Log In</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModernHomePage;
