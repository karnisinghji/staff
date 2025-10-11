import React, { useState } from 'react';
import { Users, Plus, Copy, MessageCircle } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { API_CONFIG } from '../../config/api';

interface InviteQuickActionProps {
  onInviteCreated?: () => void;
}

const InviteQuickAction: React.FC<InviteQuickActionProps> = ({ onInviteCreated }) => {
  const { token } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');
  const [shareLinks, setShareLinks] = useState<{
    whatsapp: string;
    email: string;
    sms: string;
  } | null>(null);

  const generateQuickInvite = async () => {
    if (!token) {
      alert('Please log in to create invitations');
      return;
    }
    setIsGenerating(true);
    try {
      const response = await fetch(`${API_CONFIG.USER_SERVICE}/api/invitations`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          invitationType: 'general',
          customMessage: 'Hey! I found this amazing platform for contractors and workers. You should definitely check it out!'
        })
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedLink(data.data.invitationLink);
        setShareLinks(data.data.shareLinks);
        setShowShareOptions(true);
        
        if (onInviteCreated) {
          onInviteCreated();
        }
      } else {
        alert('Failed to generate invitation. Please try again.');
      }
    } catch (error) {
      console.error('Error generating invite:', error);
      alert('Error generating invitation. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You can add a toast notification here
    alert('Link copied to clipboard!');
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-white bg-opacity-20 rounded-lg">
            <Users size={20} />
          </div>
          <div>
            <h3 className="font-semibold">Invite Friends</h3>
            <p className="text-sm opacity-90">Grow our community together</p>
          </div>
        </div>
        
        <button
          onClick={generateQuickInvite}
          disabled={isGenerating}
          className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg flex items-center space-x-2 transition-all disabled:opacity-50"
        >
          {isGenerating ? (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
          ) : (
            <Plus size={16} />
          )}
          <span className="text-sm font-medium">
            {isGenerating ? 'Generating...' : 'Quick Invite'}
          </span>
        </button>
      </div>

      {/* Share Options Modal */}
      {showShareOptions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 text-gray-900">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Share Invitation</h3>
              <button
                onClick={() => setShowShareOptions(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            {/* Invitation Link */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Invitation Link
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={generatedLink}
                  readOnly
                  className="flex-1 p-2 border rounded-lg bg-gray-50 text-sm"
                />
                <button
                  onClick={() => copyToClipboard(generatedLink)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  title="Copy link"
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>

            {/* Quick Share Buttons */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <a
                href={shareLinks?.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
              >
                <MessageCircle size={20} className="mb-1" />
                <span className="text-xs font-medium">WhatsApp</span>
              </a>
              
              <a
                href={shareLinks?.email}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span className="text-xs font-medium">Email</span>
              </a>
              
              <a
                href={shareLinks?.sms}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-3 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                <span className="text-xs font-medium">SMS</span>
              </a>
            </div>

            <button
              onClick={() => setShowShareOptions(false)}
              className="w-full bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InviteQuickAction;