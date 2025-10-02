import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface ProfileSharingProps {
  profileId: string;
  userName: string;
  isPublic: boolean;
  onPrivacyChange: (isPublic: boolean) => void;
}

export const ProfileSharing: React.FC<ProfileSharingProps> = ({
  profileId,
  userName,
  isPublic,
  onPrivacyChange
}) => {
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);

  const publicUrl = `${window.location.origin}/public-profile/${profileId}`;
  const profileData = {
    name: userName,
    profileUrl: publicUrl,
    timestamp: new Date().toISOString()
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(`Check out ${userName}'s professional profile`);
    const body = encodeURIComponent(
      `Hi!\n\nI'd like to share my professional profile with you:\n${publicUrl}\n\nBest regards,\n${userName}`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  const shareViaLinkedIn = () => {
    const url = encodeURIComponent(publicUrl);
    const text = encodeURIComponent(`Check out my professional profile: ${userName}`);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&text=${text}`, '_blank');
  };

  const shareViaWhatsApp = () => {
    const text = encodeURIComponent(`Check out my professional profile: ${publicUrl}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const generatePDF = async () => {
    setGenerating(true);
    try {
      // Simulate PDF generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a simple PDF-like content for download
      const pdfContent = `
        Professional Profile - ${userName}
        Generated on: ${new Date().toLocaleDateString()}
        Profile URL: ${publicUrl}
        
        This is a simplified version of the profile.
        For the full interactive experience, visit: ${publicUrl}
      `;
      
      const blob = new Blob([pdfContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${userName.replace(/\s+/g, '_')}_profile.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success('Profile exported successfully!');
    } catch (error) {
      toast.error('Failed to generate profile export');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <>
      <style>{`
        .sharing-container {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          margin-bottom: 2rem;
        }
        
        .sharing-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #f7fafc;
        }
        
        .sharing-title {
          font-size: 1.2em;
          font-weight: 700;
          color: #2d3748;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .privacy-toggle {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .toggle-switch {
          position: relative;
          width: 50px;
          height: 24px;
          background: #e2e8f0;
          border-radius: 12px;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        
        .toggle-switch.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .toggle-slider {
          position: absolute;
          top: 2px;
          left: 2px;
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 50%;
          transition: transform 0.3s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .toggle-switch.active .toggle-slider {
          transform: translateX(26px);
        }
        
        .url-section {
          background: #f7fafc;
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .url-input-group {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }
        
        .url-input {
          flex: 1;
          padding: 0.75rem;
          border: 2px solid #e2e8f0;
          border-radius: 6px;
          background: white;
          font-family: monospace;
          font-size: 0.9em;
          color: #4a5568;
        }
        
        .copy-button {
          background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
          color: white;
          border: none;
          padding: 0.75rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          min-width: 80px;
        }
        
        .copy-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(72, 187, 120, 0.3);
        }
        
        .copy-button.copied {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .sharing-options {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .share-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          background: white;
          color: #4a5568;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
          text-decoration: none;
        }
        
        .share-button:hover {
          border-color: #667eea;
          color: #667eea;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .share-button.linkedin {
          border-color: #0077b5;
          color: #0077b5;
        }
        
        .share-button.linkedin:hover {
          background: #0077b5;
          color: white;
        }
        
        .share-button.whatsapp {
          border-color: #25d366;
          color: #25d366;
        }
        
        .share-button.whatsapp:hover {
          background: #25d366;
          color: white;
        }
        
        .share-button.email {
          border-color: #dd6b20;
          color: #dd6b20;
        }
        
        .share-button.email:hover {
          background: #dd6b20;
          color: white;
        }
        
        .export-section {
          padding-top: 1rem;
          border-top: 2px solid #f7fafc;
        }
        
        .export-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .export-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
        }
        
        .export-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
        
        .privacy-info {
          background: #e6fffa;
          border: 1px solid #b2f5ea;
          border-radius: 8px;
          padding: 1rem;
          margin-top: 1rem;
          font-size: 0.9em;
          color: #234e52;
        }
        
        @media (max-width: 768px) {
          .sharing-header {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
          
          .url-input-group {
            flex-direction: column;
          }
          
          .url-input {
            font-size: 0.8em;
          }
          
          .sharing-options {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>

      <div className="sharing-container">
        <div className="sharing-header">
          <div className="sharing-title">
            🔗 Profile Sharing & Privacy
          </div>
          
          <div className="privacy-toggle">
            <span style={{ fontSize: '0.9em', color: '#718096' }}>
              {isPublic ? 'Public' : 'Private'}
            </span>
            <div 
              className={`toggle-switch ${isPublic ? 'active' : ''}`}
              onClick={() => onPrivacyChange(!isPublic)}
            >
              <div className="toggle-slider" />
            </div>
          </div>
        </div>

        {isPublic && (
          <>
            <div className="url-section">
              <div style={{ marginBottom: '0.5rem', fontSize: '0.9em', color: '#718096' }}>
                Public Profile URL:
              </div>
              <div className="url-input-group">
                <input
                  type="text"
                  className="url-input"
                  value={publicUrl}
                  readOnly
                />
                <button
                  className={`copy-button ${copied ? 'copied' : ''}`}
                  onClick={() => copyToClipboard(publicUrl)}
                >
                  {copied ? '✓ Copied' : '📋 Copy'}
                </button>
              </div>
            </div>

            <div style={{ marginBottom: '1rem', fontSize: '0.9em', color: '#718096' }}>
              Share your profile:
            </div>
            
            <div className="sharing-options">
              <button className="share-button linkedin" onClick={shareViaLinkedIn}>
                💼 LinkedIn
              </button>
              
              <button className="share-button whatsapp" onClick={shareViaWhatsApp}>
                💬 WhatsApp
              </button>
              
              <button className="share-button email" onClick={shareViaEmail}>
                ✉️ Email
              </button>
              
              <button 
                className="share-button"
                onClick={() => copyToClipboard(JSON.stringify(profileData, null, 2))}
              >
                📄 Copy Data
              </button>
            </div>
          </>
        )}

        <div className="export-section">
          <button
            className="export-button"
            onClick={generatePDF}
            disabled={generating}
          >
            {generating ? '⏳ Generating...' : '📥 Export Profile'}
          </button>
        </div>

        <div className="privacy-info">
          <strong>Privacy Info:</strong> {isPublic 
            ? 'Your profile is visible to anyone with the link. You can disable public access anytime.'
            : 'Your profile is private and only visible to you when logged in.'
          }
        </div>
      </div>
    </>
  );
};