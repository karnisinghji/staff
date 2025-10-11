import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { CardSkeleton, SkeletonStyles } from '../common/Skeleton';
import { ContactOptionsModal } from '../common/ContactOptionsModal';
import { API_CONFIG } from '../../config/api';

export interface ContractorRequirement {
  id: number;
  contractor_id: string;
  required_workers: number;
  skills?: string[];
  location?: string;
  notes?: string;
  created_at?: string;
  contractor_name?: string;
  contractor_email?: string;
  contractor_phone?: string;
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
  const [sendingMessage, setSendingMessage] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState<ContractorRequirement | null>(null);

  const fetchRequirements = () => {
    if (!token) return;
    setLoading(true);
    setError('');
    fetch(`${API_CONFIG.MATCHING_SERVICE}/api/matching/contractor-requirements`, {
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
  };

  useEffect(() => {
    fetchRequirements();
  }, [token]);

    const handleContact = async (contractorId: string) => {
    if (!contactMsg.trim()) {
      alert('Please enter a message');
      return;
    }
    
    setSendingMessage(true);
    try {
      const response = await fetch(`${API_CONFIG.MATCHING_SERVICE}/api/matching/contact-contractor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          contractorId,
          message: contactMsg
        })
      });
      
      const data = await response.json();
      if (data.success) {
        setSuccessMsg('✅ Message sent successfully!');
        setContactMsg('');
        setContactingId(null);
        setTimeout(() => setSuccessMsg(''), 5000);
      } else {
        alert(`Failed to send message: ${data.message}`);
      }
    } catch (err) {
      alert('Network error sending message');
    } finally {
      setSendingMessage(false);
    }
  };

  const handleCall = () => {
    if (selectedContractor?.contractor_phone) {
      window.open(`tel:${selectedContractor.contractor_phone}`, '_self');
    } else {
      alert('Phone number not available for this contractor');
    }
    setShowContactModal(false);
  };

  const handleMessage = () => {
    setShowContactModal(false);
    if (selectedContractor) {
      setContactingId(selectedContractor.id);
    }
  };

  const closeModal = () => {
    setShowContactModal(false);
    setSelectedContractor(null);
  };

  return (
    <div style={{ margin: '2rem 0' }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '1rem',
        padding: '1rem',
        background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
        borderRadius: '12px',
        color: 'white'
      }}>
        <div style={{ marginRight: '0.5rem', fontSize: '1.5em' }}>💼</div>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.2em' }}>Available Work Opportunities</h3>
          <p style={{ margin: '4px 0 0 0', fontSize: '0.9em', opacity: 0.9 }}>
            Contractors are looking for workers like you!
          </p>
        </div>
      </div>
      
      {loading && (
        <div>
          <SkeletonStyles />
          {[1, 2, 3].map(i => (
            <CardSkeleton key={i} showActions={true} />
          ))}
        </div>
      )}
      
      {error && (
        <div style={{ 
          color: '#d32f2f', 
          background: '#ffebee', 
          padding: '1rem', 
          borderRadius: '8px',
          marginBottom: '1rem',
          border: '1px solid #ffcdd2',
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: '1rem' }}>❌ {error}</div>
          <button
            onClick={fetchRequirements}
            style={{
              background: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 16px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            🔄 Try Again
          </button>
        </div>
      )}
      
      {!loading && requirements.length === 0 && !error && (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem 1rem', 
          background: '#f8f9fa', 
          borderRadius: '12px',
          color: '#666'
        }}>
          <div style={{ fontSize: '3em', marginBottom: '1rem' }}>📋</div>
          <h4 style={{ margin: '0 0 0.5rem 0' }}>No opportunities available right now</h4>
          <p style={{ margin: 0, fontSize: '0.9em' }}>
            Check back later or update your profile to get matched with contractors!
          </p>
        </div>
      )}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {requirements.map(req => (
          <li key={req.id} style={{ 
            background: '#f7f9fc', 
            marginBottom: 16, 
            padding: 20, 
            borderRadius: 12, 
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: '1px solid #e3f2fd'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: '1.1em', fontWeight: 'bold', color: '#1976d2', marginBottom: 4 }}>
                  {req.contractor_name || req.contractor_email?.split('@')[0] || 'Contractor'} is looking for workers
                </div>
                <div style={{ fontSize: '0.9em', color: '#666' }}>
                  {req.contractor_email || `ID: ${req.contractor_id.substring(0, 8)}...`}
                </div>
              </div>
              <div style={{ 
                background: '#1976d2', 
                color: 'white', 
                padding: '4px 12px', 
                borderRadius: '20px', 
                fontSize: '0.9em', 
                fontWeight: 'bold' 
              }}>
                {req.required_workers} worker{req.required_workers !== 1 ? 's' : ''} needed
              </div>
            </div>
            
            {req.skills && req.skills.length > 0 && (
              <div style={{ marginBottom: 8 }}>
                <strong style={{ color: '#333' }}>Skills Required:</strong> 
                <div style={{ marginTop: 4 }}>
                  {req.skills.map(skill => (
                    <span key={skill} style={{ 
                      display: 'inline-block', 
                      background: '#e8f5e8', 
                      color: '#2e7d32', 
                      padding: '2px 8px', 
                      borderRadius: '12px', 
                      fontSize: '0.85em', 
                      marginRight: 6, 
                      marginBottom: 4 
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {req.location && (
              <div style={{ marginBottom: 8 }}>
                <strong style={{ color: '#333' }}>📍 Location:</strong> {req.location}
              </div>
            )}
            
            {req.notes && (
              <div style={{ marginBottom: 8 }}>
                <strong style={{ color: '#333' }}>📝 Additional Notes:</strong>
                <div style={{ 
                  marginTop: 4, 
                  padding: '8px 12px', 
                  background: '#f5f5f5', 
                  borderRadius: '6px', 
                  fontSize: '0.9em',
                  fontStyle: 'italic'
                }}>
                  {req.notes}
                </div>
              </div>
            )}
            
            <div style={{ fontSize: '0.8em', color: '#888', marginTop: 8, marginBottom: 12 }}>
              🕒 Posted: {req.created_at ? new Date(req.created_at).toLocaleString() : 'N/A'}
            </div>
            {showContactButton && (
              <div style={{ marginTop: 8 }}>
                <button 
                  onClick={() => {
                    setSelectedContractor(req);
                    setShowContactModal(true);
                  }}
                  style={{ 
                    background: '#1976d2', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: 6, 
                    padding: '6px 16px', 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  📞 Contact
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      {successMsg && (
        <div style={{ 
          color: '#2e7d32', 
          background: '#e8f5e8', 
          padding: '1rem', 
          borderRadius: '8px',
          marginTop: '1rem',
          border: '1px solid #c8e6c9',
          textAlign: 'center',
          fontSize: '1.1em'
        }}>
          {successMsg}
        </div>
      )}
      
      {/* Contact Options Modal */}
      <ContactOptionsModal
        isOpen={showContactModal}
        onClose={closeModal}
        contactName={selectedContractor?.contractor_name || 'Contractor'}
        contactEmail={selectedContractor?.contractor_email || ''}
        contactPhone={selectedContractor?.contractor_phone}
        onCall={handleCall}
        onMessage={handleMessage}
      />
      
      {/* Message form for when user selects message option */}
      {contactingId && (
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
          onClick={() => setContactingId(null)}
        >
          <div 
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '2rem',
              maxWidth: '500px',
              width: '90%',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ margin: '0 0 1rem 0', color: '#1976d2' }}>Send Message</h3>
            <textarea 
              value={contactMsg} 
              onChange={e => setContactMsg(e.target.value)} 
              placeholder="Enter your message to the contractor..." 
              rows={4} 
              style={{ 
                width: '100%', 
                marginBottom: '1rem',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '14px',
                resize: 'vertical'
              }} 
            />
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => setContactingId(null)} 
                style={{ 
                  background: '#f5f5f5', 
                  color: '#666',
                  border: 'none', 
                  borderRadius: '6px', 
                  padding: '0.75rem 1.5rem', 
                  cursor: 'pointer' 
                }}
              >
                Cancel
              </button>
              <button 
                onClick={() => selectedContractor && handleContact(selectedContractor.contractor_id)} 
                disabled={sendingMessage || !contactMsg.trim()}
                style={{ 
                  background: (sendingMessage || !contactMsg.trim()) ? '#ccc' : '#1976d2', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '6px', 
                  padding: '0.75rem 1.5rem', 
                  cursor: (sendingMessage || !contactMsg.trim()) ? 'not-allowed' : 'pointer' 
                }}
              >
                {sendingMessage ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
