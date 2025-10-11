import React, { useState, useEffect } from 'react';
import { 
  Share, 
  Users, 
  Copy, 
  MessageCircle, 
  TrendingUp,
  Eye,
  UserCheck,
  Calendar,
  Plus
} from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { API_CONFIG } from '../../config/api';

interface Invitation {
  id: string;
  code: string;
  type: 'general' | 'worker' | 'contractor';
  recipientName?: string;
  recipientEmail?: string;
  status: 'sent' | 'clicked' | 'registered' | 'expired';
  clicksCount: number;
  createdAt: string;
  expiresAt: string;
  registeredAt?: string;
}

interface InvitationStats {
  totalSent: number;
  totalClicked: number;
  totalRegistered: number;
  clickRate: number;
  conversionRate: number;
}

interface ShareLinks {
  whatsapp: string;
  email: string;
  sms: string;
}

const InvitationSystem: React.FC = () => {
  const { token } = useAuth();
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [stats, setStats] = useState<InvitationStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    customMessage: "Hey! I'd love for you to join this amazing platform. It's perfect for connecting contractors and workers. Check it out!"
  });

  // Fetch user's invitations and stats
  const fetchInvitations = async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(`${API_CONFIG.USER_SERVICE}/api/invitations`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setInvitations(data.data.invitations);
        setStats(data.data.stats);
      }
    } catch (error) {
      console.error('Error fetching invitations:', error);
    } finally {
      setLoading(false);
    }
  };

  // Create new invitation
  const createInvitation = async () => {
    if (!token) {
      alert('Please log in to create invitations');
      return;
    }
    setCreateLoading(true);
    try {
      const response = await fetch(`${API_CONFIG.USER_SERVICE}/api/invitations`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          invitationType: 'general',
          customMessage: formData.customMessage
        })
      });

      if (response.ok) {
        const data = await response.json();
        const { invitationLink, shareLinks } = data.data;
        
        // Show success modal with sharing options
        showShareModal(invitationLink, shareLinks);
        
        // Refresh invitations list
        fetchInvitations();
        
        // Reset form
        setFormData({
          customMessage: "Hey! I'd love for you to join this amazing platform. It's perfect for connecting contractors and workers. Check it out!"
        });
        setShowCreateForm(false);
      } else {
        alert('Failed to create invitation. Please try again.');
      }
    } catch (error) {
      console.error('Error creating invitation:', error);
      alert('Error creating invitation. Please try again.');
    } finally {
      setCreateLoading(false);
    }
  };

  // Show share modal with complete message
  const showShareModal = (link: string, shareLinks: ShareLinks) => {
    const completeMessage = `${formData.customMessage}\n\n${link}`;
    
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
        <h3 class="text-lg font-semibold mb-4">🎉 Your Invitation Message is Ready!</h3>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Complete Message to Share:</label>
          <div class="bg-gray-50 p-4 rounded-lg border mb-3">
            <div class="text-sm text-gray-800 whitespace-pre-wrap">${completeMessage}</div>
          </div>
          <div class="flex items-center space-x-2">
            <button onclick="navigator.clipboard.writeText('${completeMessage.replace(/'/g, "\\'")}')" class="flex-1 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
              📋 Copy Complete Message
            </button>
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Or share directly:</label>
          <div class="grid grid-cols-3 gap-2">
            <a href="${shareLinks.whatsapp}" target="_blank" class="flex flex-col items-center p-3 bg-green-500 text-white rounded hover:bg-green-600">
              <svg class="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 2.079.549 4.088 1.595 5.872L0 24l6.257-1.611c1.724.957 3.67 1.466 5.76 1.466 6.621 0 11.988-5.367 11.988-11.988C23.971 5.346 18.637.001 12.017.001zM18.476 16.641c-.295.827-1.455 1.511-2.389 1.701-.642.131-1.48.193-4.318-1.012-3.604-1.532-5.918-5.17-6.096-5.412-.177-.241-1.455-1.933-1.455-3.688s.916-2.616 1.241-2.975c.326-.359.712-.449 1.012-.449.295 0 .594.006.85.015.273.01.64-.103.998 1.012.366 1.139 1.262 3.076 1.375 3.297.113.221.189.482.038.772-.15.295-.225.482-.449.741-.225.259-.472.577-.675.772-.225.221-.459.459-.197.9.262.441 1.166 1.93 2.505 3.125 1.723 1.54 3.174 2.018 3.628 2.244.455.225.719.189.984-.113.266-.302 1.139-1.329 1.442-1.785.304-.455.607-.378.026.227-.38.604-1.513 2.244-2.389 2.714z"/>
              </svg>
              <span class="text-xs">WhatsApp</span>
            </a>
            <a href="${shareLinks.email}" target="_blank" class="flex flex-col items-center p-3 bg-blue-500 text-white rounded hover:bg-blue-600">
              <svg class="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <span class="text-xs">Email</span>
            </a>
            <a href="${shareLinks.sms}" target="_blank" class="flex flex-col items-center p-3 bg-gray-500 text-white rounded hover:bg-gray-600">
              <svg class="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
              <span class="text-xs">SMS</span>
            </a>
          </div>
        </div>
        <button onclick="this.parentElement.parentElement.remove()" class="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600">
          Close
        </button>
      </div>
    `;
    document.body.appendChild(modal);
  };

  // Copy to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You can add a toast notification here
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-yellow-100 text-yellow-800';
      case 'clicked': return 'bg-blue-100 text-blue-800';
      case 'registered': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  useEffect(() => {
    fetchInvitations();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm border">
        {/* Header */}
        <div className="border-b p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                <Users className="mr-3 text-blue-600" size={28} />
                Invite Friends
              </h2>
              <p className="text-gray-600 mt-1">
                Grow our community by inviting friends and colleagues
              </p>
            </div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Create Invitation Message</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        {stats && (
          <div className="p-6 border-b bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-2">
                  <Share className="text-blue-600" size={20} />
                </div>
                <div className="text-2xl font-semibold text-gray-900">{stats.totalSent}</div>
                <div className="text-sm text-gray-600">Sent</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-2">
                  <Eye className="text-purple-600" size={20} />
                </div>
                <div className="text-2xl font-semibold text-gray-900">{stats.totalClicked}</div>
                <div className="text-sm text-gray-600">Clicked</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-2">
                  <UserCheck className="text-green-600" size={20} />
                </div>
                <div className="text-2xl font-semibold text-gray-900">{stats.totalRegistered}</div>
                <div className="text-sm text-gray-600">Joined</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mx-auto mb-2">
                  <TrendingUp className="text-orange-600" size={20} />
                </div>
                <div className="text-2xl font-semibold text-gray-900">{stats.clickRate.toFixed(1)}%</div>
                <div className="text-sm text-gray-600">Click Rate</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mx-auto mb-2">
                  <TrendingUp className="text-indigo-600" size={20} />
                </div>
                <div className="text-2xl font-semibold text-gray-900">{stats.conversionRate.toFixed(1)}%</div>
                <div className="text-sm text-gray-600">Conversion</div>
              </div>
            </div>
          </div>
        )}

        {/* Invitations List */}
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Your Invitations</h3>
          
          {invitations.length === 0 ? (
            <div className="text-center py-8">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No invitations yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Start by creating your first invitation
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {invitations.map((invitation) => (
                <div
                  key={invitation.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invitation.status)}`}>
                          {invitation.status.charAt(0).toUpperCase() + invitation.status.slice(1)}
                        </div>
                        <span className="text-sm text-gray-500 capitalize">
                          {invitation.type}
                        </span>
                        {invitation.recipientName && (
                          <span className="text-sm text-gray-700">
                            → {invitation.recipientName}
                          </span>
                        )}
                      </div>
                      <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="mr-1" size={14} />
                          {formatDate(invitation.createdAt)}
                        </span>
                        <span className="flex items-center">
                          <Eye className="mr-1" size={14} />
                          {invitation.clicksCount} clicks
                        </span>
                        {invitation.registeredAt && (
                          <span className="flex items-center text-green-600">
                            <UserCheck className="mr-1" size={14} />
                            Joined {formatDate(invitation.registeredAt)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          const link = `${window.location.origin}/register?invite=${invitation.code}`;
                          copyToClipboard(link);
                        }}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded"
                        title="Copy link"
                      >
                        <Copy size={16} />
                      </button>
                      <button
                        onClick={() => {
                          const link = `${window.location.origin}/register?invite=${invitation.code}`;
                          const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`Join our platform! ${link}`)}`;
                          window.open(whatsappUrl, '_blank');
                        }}
                        className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded"
                        title="Share on WhatsApp"
                      >
                        <MessageCircle size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Invitation Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Create Invitation Message</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Write your invitation message
                </label>
                <textarea
                  value={formData.customMessage}
                  onChange={(e) => setFormData({...formData, customMessage: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                  placeholder="Write your personal invitation message here..."
                />
                <p className="text-sm text-gray-500 mt-1">
                  Write a personal message to invite someone. The invitation link will be automatically added to your message.
                </p>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowCreateForm(false)}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                disabled={createLoading}
              >
                Cancel
              </button>
              <button
                onClick={createInvitation}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                disabled={createLoading}
              >
                {createLoading ? 'Creating...' : 'Generate Message & Link'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvitationSystem;