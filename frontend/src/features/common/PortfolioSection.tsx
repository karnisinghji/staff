import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  projectUrl?: string;
  tags: string[];
  completedDate?: string;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  verificationUrl?: string;
}

interface SocialLink {
  platform: string;
  url: string;
  username: string;
}

interface PortfolioSectionProps {
  userRole: 'worker' | 'contractor';
  portfolioItems: PortfolioItem[];
  certifications: Certification[];
  socialLinks: SocialLink[];
  onPortfolioUpdate: (items: PortfolioItem[]) => void;
  onCertificationsUpdate: (certs: Certification[]) => void;
  onSocialLinksUpdate: (links: SocialLink[]) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  userRole,
  portfolioItems,
  certifications,
  socialLinks,
  onPortfolioUpdate,
  onCertificationsUpdate,
  onSocialLinksUpdate
}) => {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'certifications' | 'social'>('portfolio');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);

  // Sample data for demonstration
  const samplePortfolio: PortfolioItem[] = [
    {
      id: '1',
      title: 'Modern Kitchen Renovation',
      description: 'Complete kitchen renovation including custom cabinets, granite countertops, and modern appliances.',
      imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
      tags: ['Kitchen', 'Renovation', 'Carpentry'],
      completedDate: '2024-08-15'
    },
    {
      id: '2',
      title: 'Bathroom Remodel',
      description: 'Luxury bathroom remodel with heated floors, rain shower, and custom tile work.',
      imageUrl: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400',
      tags: ['Bathroom', 'Plumbing', 'Tiling'],
      completedDate: '2024-06-20'
    }
  ];

  const sampleCertifications: Certification[] = [
    {
      id: '1',
      name: 'Licensed General Contractor',
      issuer: 'State Licensing Board',
      issueDate: '2020-03-15',
      expiryDate: '2025-03-15',
      credentialId: 'GC-2020-12345'
    },
    {
      id: '2',
      name: 'OSHA 30-Hour Construction Safety',
      issuer: 'OSHA Training Institute',
      issueDate: '2023-01-10',
      credentialId: 'OSHA-30-67890'
    }
  ];

  const addPortfolioItem = (item: Omit<PortfolioItem, 'id'>) => {
    const newItem: PortfolioItem = {
      ...item,
      id: Date.now().toString()
    };
    onPortfolioUpdate([...portfolioItems, newItem]);
    setShowAddForm(false);
    toast.success('Portfolio item added successfully!');
  };

  const removePortfolioItem = (id: string) => {
    onPortfolioUpdate(portfolioItems.filter(item => item.id !== id));
    toast.success('Portfolio item removed');
  };

  const displayPortfolio = portfolioItems.length > 0 ? portfolioItems : samplePortfolio;
  const displayCertifications = certifications.length > 0 ? certifications : sampleCertifications;

  return (
    <>
      <style>{`
        .portfolio-container {
          width: 100%;
        }
        
        .portfolio-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
          border-bottom: 2px solid #e2e8f0;
        }
        
        .portfolio-tab {
          padding: 0.75rem 1.5rem;
          border: none;
          background: none;
          color: #718096;
          font-weight: 600;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .portfolio-tab.active {
          color: #667eea;
          border-bottom-color: #667eea;
        }
        
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .portfolio-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }
        
        .portfolio-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          border-color: #667eea;
        }
        
        .portfolio-image {
          width: 100%;
          height: 200px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 3em;
          background-size: cover;
          background-position: center;
        }
        
        .portfolio-content {
          padding: 1.5rem;
        }
        
        .portfolio-title {
          font-size: 1.2em;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 0.5rem;
        }
        
        .portfolio-description {
          color: #718096;
          margin-bottom: 1rem;
          line-height: 1.5;
        }
        
        .portfolio-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        
        .portfolio-tag {
          background: #e6fffa;
          color: #234e52;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8em;
          border: 1px solid #b2f5ea;
        }
        
        .portfolio-date {
          font-size: 0.85em;
          color: #a0aec0;
          margin-bottom: 1rem;
        }
        
        .portfolio-actions {
          display: flex;
          gap: 0.5rem;
        }
        
        .action-button {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          font-size: 0.85em;
        }
        
        .action-button.primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        
        .action-button.danger {
          background: #fed7d7;
          color: #c53030;
        }
        
        .action-button:hover {
          transform: translateY(-1px);
        }
        
        .add-button {
          background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
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
          margin-bottom: 2rem;
        }
        
        .add-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(72, 187, 120, 0.3);
        }
        
        .certification-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .certification-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border-left: 4px solid #667eea;
        }
        
        .certification-header {
          display: flex;
          justify-content: between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }
        
        .certification-name {
          font-size: 1.1em;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 0.25rem;
        }
        
        .certification-issuer {
          color: #667eea;
          font-weight: 600;
        }
        
        .certification-details {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }
        
        .certification-detail {
          font-size: 0.9em;
        }
        
        .certification-detail-label {
          color: #718096;
          font-weight: 600;
        }
        
        .certification-detail-value {
          color: #2d3748;
          margin-top: 0.25rem;
        }
        
        .social-links {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }
        
        .social-link-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.3s ease;
        }
        
        .social-link-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
        
        .social-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5em;
          color: white;
        }
        
        .social-icon.linkedin { background: #0077b5; }
        .social-icon.github { background: #333; }
        .social-icon.website { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .social-icon.twitter { background: #1da1f2; }
        
        .empty-state {
          text-align: center;
          padding: 3rem 1rem;
          color: #718096;
        }
        
        .empty-state-icon {
          font-size: 4em;
          margin-bottom: 1rem;
        }
        
        @media (max-width: 768px) {
          .portfolio-grid {
            grid-template-columns: 1fr;
          }
          
          .portfolio-tabs {
            flex-wrap: wrap;
          }
          
          .certification-details {
            grid-template-columns: 1fr;
          }
          
          .social-links {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="portfolio-container">
        <div className="portfolio-tabs">
          <button 
            className={`portfolio-tab ${activeTab === 'portfolio' ? 'active' : ''}`}
            onClick={() => setActiveTab('portfolio')}
          >
            📁 {userRole === 'contractor' ? 'Projects' : 'Portfolio'}
          </button>
          <button 
            className={`portfolio-tab ${activeTab === 'certifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('certifications')}
          >
            🏆 Certifications
          </button>
          <button 
            className={`portfolio-tab ${activeTab === 'social' ? 'active' : ''}`}
            onClick={() => setActiveTab('social')}
          >
            🔗 Links
          </button>
        </div>

        {/* Portfolio Tab */}
        {activeTab === 'portfolio' && (
          <div>
            <button className="add-button" onClick={() => setShowAddForm(true)}>
              ➕ Add {userRole === 'contractor' ? 'Project' : 'Portfolio Item'}
            </button>

            {displayPortfolio.length > 0 ? (
              <div className="portfolio-grid">
                {displayPortfolio.map((item) => (
                  <div key={item.id} className="portfolio-card">
                    <div 
                      className="portfolio-image"
                      style={{
                        backgroundImage: item.imageUrl ? `url(${item.imageUrl})` : 'none'
                      }}
                    >
                      {!item.imageUrl && '🖼️'}
                    </div>
                    <div className="portfolio-content">
                      <div className="portfolio-title">{item.title}</div>
                      <div className="portfolio-description">{item.description}</div>
                      
                      {item.tags.length > 0 && (
                        <div className="portfolio-tags">
                          {item.tags.map((tag, index) => (
                            <span key={index} className="portfolio-tag">{tag}</span>
                          ))}
                        </div>
                      )}
                      
                      {item.completedDate && (
                        <div className="portfolio-date">
                          📅 Completed: {new Date(item.completedDate).toLocaleDateString()}
                        </div>
                      )}
                      
                      <div className="portfolio-actions">
                        {item.projectUrl && (
                          <button 
                            className="action-button primary"
                            onClick={() => window.open(item.projectUrl, '_blank')}
                          >
                            🔗 View
                          </button>
                        )}
                        <button 
                          className="action-button danger"
                          onClick={() => removePortfolioItem(item.id)}
                        >
                          🗑️ Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">📁</div>
                <h3>No {userRole === 'contractor' ? 'projects' : 'portfolio items'} yet</h3>
                <p>Showcase your work by adding your first {userRole === 'contractor' ? 'project' : 'portfolio item'}!</p>
              </div>
            )}
          </div>
        )}

        {/* Certifications Tab */}
        {activeTab === 'certifications' && (
          <div>
            <button className="add-button">
              ➕ Add Certification
            </button>

            {displayCertifications.length > 0 ? (
              <div className="certification-list">
                {displayCertifications.map((cert) => (
                  <div key={cert.id} className="certification-card">
                    <div className="certification-header">
                      <div>
                        <div className="certification-name">{cert.name}</div>
                        <div className="certification-issuer">{cert.issuer}</div>
                      </div>
                    </div>
                    
                    <div className="certification-details">
                      <div className="certification-detail">
                        <div className="certification-detail-label">Issue Date</div>
                        <div className="certification-detail-value">
                          {new Date(cert.issueDate).toLocaleDateString()}
                        </div>
                      </div>
                      
                      {cert.expiryDate && (
                        <div className="certification-detail">
                          <div className="certification-detail-label">Expires</div>
                          <div className="certification-detail-value">
                            {new Date(cert.expiryDate).toLocaleDateString()}
                          </div>
                        </div>
                      )}
                      
                      {cert.credentialId && (
                        <div className="certification-detail">
                          <div className="certification-detail-label">Credential ID</div>
                          <div className="certification-detail-value">{cert.credentialId}</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">🏆</div>
                <h3>No certifications added</h3>
                <p>Add your professional certifications and licenses to build trust with clients.</p>
              </div>
            )}
          </div>
        )}

        {/* Social Links Tab */}
        {activeTab === 'social' && (
          <div>
            <button className="add-button">
              ➕ Add Social Link
            </button>

            <div className="social-links">
              <div className="social-link-card">
                <div className="social-icon linkedin">💼</div>
                <div>
                  <div style={{ fontWeight: '600', color: '#2d3748' }}>LinkedIn</div>
                  <div style={{ color: '#718096', fontSize: '0.9em' }}>Connect professionally</div>
                </div>
              </div>
              
              <div className="social-link-card">
                <div className="social-icon website">🌐</div>
                <div>
                  <div style={{ fontWeight: '600', color: '#2d3748' }}>Website</div>
                  <div style={{ color: '#718096', fontSize: '0.9em' }}>Your professional website</div>
                </div>
              </div>
              
              <div className="social-link-card">
                <div className="social-icon github">🔧</div>
                <div>
                  <div style={{ fontWeight: '600', color: '#2d3748' }}>Portfolio</div>
                  <div style={{ color: '#718096', fontSize: '0.9em' }}>Showcase your work</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};