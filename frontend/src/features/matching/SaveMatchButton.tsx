import React from 'react';
import { useAuth } from '../auth/AuthContext';
import { API_CONFIG } from '../../config/api';

interface SaveMatchButtonProps {
  matchId: string;
}

export const SaveMatchButton: React.FC<SaveMatchButtonProps> = ({ matchId }) => {
  const { token } = useAuth();
  const [saved, setSaved] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSave = async () => {
    setError('');
    try {
      const res = await fetch(
  `${API_CONFIG.MATCHING_SERVICE}/api/matching/save-match`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token || ''
          },
          body: JSON.stringify({ matchId })
        }
      );
      if (res.ok) {
        setSaved(true);
      } else {
        const data = await res.json();
        setError(data.message || 'Failed to save match');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <button onClick={handleSave} disabled={saved}>
      {saved ? 'Saved' : 'Save Match'}
      {error && <span style={{ color: 'red' }}>{error}</span>}
    </button>
  );
};
