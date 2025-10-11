import React, { useState } from 'react';
import { API_CONFIG } from '../config/api';

interface BlockUserProps {
  userId: string;
  userName: string;
  isBlocked: boolean;
  onBlockStatusChange: (userId: string, isBlocked: boolean) => void;
}

export const BlockUserButton: React.FC<BlockUserProps> = ({
  userId,
  userName,
  isBlocked,
  onBlockStatusChange
}) => {
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [reason, setReason] = useState<'harassment' | 'unprofessional' | 'spam' | 'other' | ''>('');

  const handleBlock = async () => {
    if (!reason) {
      alert('Please select a reason for blocking');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_CONFIG.MATCHING_SERVICE}/api/matching/block-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          blockedUserId: userId,
          reason: reason
        })
      });

      const data = await response.json();
      
      if (data.success) {
        onBlockStatusChange(userId, true);
        setShowConfirm(false);
        setReason('');
      } else {
        alert(`Error blocking user: ${data.message}`);
      }
    } catch (error) {
      console.error('Error blocking user:', error);
      alert('Failed to block user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUnblock = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_CONFIG.MATCHING_SERVICE}/api/matching/unblock-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          blockedUserId: userId
        })
      });

      const data = await response.json();
      
      if (data.success) {
        onBlockStatusChange(userId, false);
      } else {
        alert(`Error unblocking user: ${data.message}`);
      }
    } catch (error) {
      console.error('Error unblocking user:', error);
      alert('Failed to unblock user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (isBlocked) {
    return (
      <button
        onClick={handleUnblock}
        disabled={loading}
        style={{
          background: '#4caf50',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          padding: '6px 12px',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '12px',
          opacity: loading ? 0.6 : 1
        }}
      >
        {loading ? '...' : '✓ Unblock'}
      </button>
    );
  }

  if (showConfirm) {
    return (
      <div style={{
        background: '#fff',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '1rem',
        position: 'absolute',
        zIndex: 1000,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        minWidth: '250px'
      }}>
        <div style={{ marginBottom: '1rem', fontWeight: '600' }}>
          Block {userName}?
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '14px' }}>
            Reason for blocking:
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value as any)}
            style={{
              width: '100%',
              padding: '6px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          >
            <option value="">Select reason</option>
            <option value="harassment">Harassment</option>
            <option value="unprofessional">Unprofessional behavior</option>
            <option value="spam">Spam/unwanted messages</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
          <button
            onClick={() => {
              setShowConfirm(false);
              setReason('');
            }}
            style={{
              background: '#f5f5f5',
              color: '#333',
              border: '1px solid #ddd',
              borderRadius: '4px',
              padding: '6px 12px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleBlock}
            disabled={loading || !reason}
            style={{
              background: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '6px 12px',
              cursor: loading || !reason ? 'not-allowed' : 'pointer',
              fontSize: '12px',
              opacity: loading || !reason ? 0.6 : 1
            }}
          >
            {loading ? 'Blocking...' : 'Block User'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      style={{
        background: '#f44336',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        padding: '6px 12px',
        cursor: 'pointer',
        fontSize: '12px'
      }}
    >
      🚫 Block
    </button>
  );
};