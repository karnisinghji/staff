import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';

const API_URL = import.meta.env.VITE_MATCHING_BASE || 'http://localhost:3003/api/matching';

export interface ContractorRequirement {
  id: number;
  contractor_id: string;
  required_workers: number;
  skills?: string[];
  location?: string;
  notes?: string;
  created_at?: string;
}

interface Props {
  showContactButton?: boolean;
}

export const ContractorRequirementsList: React.FC<Props> = ({ showContactButton = true }) => {
  const { token } = useAuth();
  const [requirements, setRequirements] = useState<ContractorRequirement[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [contactingId, setContactingId] = useState<number | null>(null);
  const [contactMsg, setContactMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    setError('');
    fetch(`${API_URL}/contractor-requirements`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setRequirements(data.data);
        } else {
          setError(data.message || 'Failed to fetch requirements');
        }
      })
      .catch(() => setError('Network error'))
      .finally(() => setLoading(false));
  }, [token]);

  const handleContact = async (contractorId: string) => {
    if (!contactMsg) return;
    setContactingId(null);
    setSuccessMsg('');
    // TODO: Replace with actual contact endpoint
    // Example: send a message or team request
    setSuccessMsg('Contact request sent!');
    setContactMsg('');
  };

  return (
    <div style={{ margin: '2rem 0' }}>
      <h3>Contractor Requirements</h3>
      {loading && <div>Loading requirements...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {!loading && requirements.length === 0 && !error && <div>No contractor requirements found.</div>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {requirements.map(req => (
          <li key={req.id} style={{ background: '#f7f9fc', marginBottom: 12, padding: 16, borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div><strong>Workers Needed:</strong> {req.required_workers}</div>
            {req.skills && req.skills.length > 0 && <div><strong>Skills:</strong> {req.skills.join(', ')}</div>}
            {req.location && <div><strong>Location:</strong> {req.location}</div>}
            {req.notes && <div><strong>Notes:</strong> {req.notes}</div>}
            <div style={{ fontSize: '0.85em', color: '#888', marginTop: 4 }}>Posted: {req.created_at ? new Date(req.created_at).toLocaleString() : 'N/A'}</div>
            {showContactButton && (
              <div style={{ marginTop: 8 }}>
                {contactingId === req.id ? (
                  <div>
                    <textarea value={contactMsg} onChange={e => setContactMsg(e.target.value)} placeholder="Message to contractor..." rows={2} style={{ width: '100%', marginBottom: 4 }} />
                    <button onClick={() => handleContact(req.contractor_id)} style={{ background: '#1976d2', color: 'white', border: 'none', borderRadius: 6, padding: '6px 16px', cursor: 'pointer' }}>Send</button>
                    <button onClick={() => setContactingId(null)} style={{ marginLeft: 8, background: '#eee', border: 'none', borderRadius: 6, padding: '6px 16px', cursor: 'pointer' }}>Cancel</button>
                  </div>
                ) : (
                  <button onClick={() => setContactingId(req.id)} style={{ background: '#1976d2', color: 'white', border: 'none', borderRadius: 6, padding: '6px 16px', cursor: 'pointer' }}>Contact Contractor</button>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
      {successMsg && <div style={{ color: 'green', marginTop: 8 }}>{successMsg}</div>}
    </div>
  );
};
