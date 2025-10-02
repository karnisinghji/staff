import React from 'react';

interface ContactOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  onCall: () => void;
  onMessage: () => void;
}

export const ContactOptionsModal: React.FC<ContactOptionsModalProps> = ({
  isOpen,
  onClose,
  contactName,
  contactEmail,
  contactPhone,
  onCall,
  onMessage
}) => {
  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '2rem',
          maxWidth: '400px',
          width: '90%',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: '#666',
            padding: '0.25rem'
          }}
        >
          ×
        </button>

        {/* Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ 
            margin: '0 0 0.5rem 0', 
            color: '#1976d2',
            fontSize: '1.3rem'
          }}>
            Contact {contactName}
          </h3>
          <p style={{ 
            margin: 0, 
            color: '#666', 
            fontSize: '0.9rem' 
          }}>
            Choose how you'd like to contact this person:
          </p>
        </div>

        {/* Contact options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Call option */}
          <button
            onClick={onCall}
            disabled={!contactPhone}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '1rem',
              background: contactPhone ? '#4caf50' : '#f5f5f5',
              color: contactPhone ? 'white' : '#999',
              border: 'none',
              borderRadius: '8px',
              cursor: contactPhone ? 'pointer' : 'not-allowed',
              fontSize: '1rem',
              transition: 'all 0.2s'
            }}
          >
            <span style={{ fontSize: '1.5rem', marginRight: '1rem' }}>📞</span>
            <div style={{ textAlign: 'left', flex: 1 }}>
              <div style={{ fontWeight: 'bold' }}>Call</div>
              <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>
                {contactPhone ? contactPhone : 'Phone number not available'}
              </div>
            </div>
          </button>

          {/* Message option */}
          <button
            onClick={onMessage}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '1rem',
              background: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'all 0.2s'
            }}
          >
            <span style={{ fontSize: '1.5rem', marginRight: '1rem' }}>💬</span>
            <div style={{ textAlign: 'left', flex: 1 }}>
              <div style={{ fontWeight: 'bold' }}>Send Message</div>
              <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>
                Send a message via the platform
              </div>
            </div>
          </button>

          {/* Email option */}
          <button
            onClick={() => window.open(`mailto:${contactEmail}`, '_blank')}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '1rem',
              background: '#ff9800',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'all 0.2s'
            }}
          >
            <span style={{ fontSize: '1.5rem', marginRight: '1rem' }}>📧</span>
            <div style={{ textAlign: 'left', flex: 1 }}>
              <div style={{ fontWeight: 'bold' }}>Email</div>
              <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>
                {contactEmail}
              </div>
            </div>
          </button>
        </div>

        {/* Cancel button */}
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <button
            onClick={onClose}
            style={{
              background: '#f5f5f5',
              color: '#666',
              border: 'none',
              borderRadius: '6px',
              padding: '0.5rem 1.5rem',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};