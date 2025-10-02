import React, { useEffect, useState } from 'react';
import { Users, CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface InvitationInfo {
  valid: boolean;
  invitation?: {
    type: 'general' | 'worker' | 'contractor';
    inviterName?: string;
    customMessage?: string;
    expiresAt: string;
  };
}

interface InvitationBannerProps {
  inviteCode?: string;
  onValidationComplete?: (isValid: boolean, info?: InvitationInfo) => void;
}

const InvitationBanner: React.FC<InvitationBannerProps> = ({ 
  inviteCode, 
  onValidationComplete 
}) => {
  const [invitationInfo, setInvitationInfo] = useState<InvitationInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (inviteCode) {
      validateInvitation();
    }
  }, [inviteCode]);

  const validateInvitation = async () => {
    if (!inviteCode) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/invitations/${inviteCode}/validate`);
      const data = await response.json();

      if (response.ok && data.success) {
        setInvitationInfo(data.data);
        if (onValidationComplete) {
          onValidationComplete(data.data.valid, data.data);
        }
      } else {
        setError(data.error || 'Invalid invitation code');
        if (onValidationComplete) {
          onValidationComplete(false);
        }
      }
    } catch (err) {
      setError('Failed to validate invitation');
      if (onValidationComplete) {
        onValidationComplete(false);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!inviteCode) return null;

  if (loading) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
          <span className="text-blue-800">Validating invitation...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-3">
          <AlertCircle className="text-red-600" size={20} />
          <div>
            <h4 className="text-red-800 font-medium">Invalid Invitation</h4>
            <p className="text-red-700 text-sm mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (invitationInfo?.valid) {
    const invitation = invitationInfo.invitation!;
    const expiresAt = new Date(invitation.expiresAt);
    const now = new Date();
    const daysUntilExpiry = Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <CheckCircle className="text-green-600 mt-0.5" size={20} />
          <div className="flex-1">
            <h4 className="text-green-800 font-medium flex items-center">
              <Users className="mr-2" size={16} />
              You've been invited to join!
            </h4>
            
            <div className="mt-2 space-y-2">
              {invitation.inviterName && (
                <p className="text-green-700 text-sm">
                  <strong>Invited by:</strong> {invitation.inviterName}
                </p>
              )}
              
              <p className="text-green-700 text-sm">
                <strong>Invitation type:</strong> {invitation.type.charAt(0).toUpperCase() + invitation.type.slice(1)}
              </p>
              
              {invitation.customMessage && (
                <div className="bg-white bg-opacity-60 rounded p-2 mt-2">
                  <p className="text-green-800 text-sm italic">
                    "{invitation.customMessage}"
                  </p>
                </div>
              )}
              
              <div className="flex items-center text-green-600 text-sm mt-3">
                <Clock size={14} className="mr-1" />
                <span>
                  Invitation expires in {daysUntilExpiry} {daysUntilExpiry === 1 ? 'day' : 'days'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default InvitationBanner;