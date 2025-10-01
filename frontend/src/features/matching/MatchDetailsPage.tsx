import React from 'react';

interface MatchDetailsProps {
  match: any;
}

export const MatchDetailsPage: React.FC<MatchDetailsProps> = ({ match }) => {
  if (!match) return (
    <div style={{ minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#888', fontSize: '1.2rem' }}>
      No match selected.
    </div>
  );
  return (
    <>
      <style>{`
        .details-bg {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          background: #f5f7fa;
          padding: 2rem;
        }
        .details-container {
          width: 100%;
          max-width: 520px;
          min-width: 320px;
          padding: 2.5rem 2.5rem 2rem 2.5rem;
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 4px 32px rgba(0,0,0,0.10);
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        .details-header {
          text-align: center;
          margin-bottom: 1rem;
          color: #1976d2;
          font-size: 2rem;
          font-weight: 700;
        }
        .details-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1.1rem;
          color: #333;
        }
        .details-label {
          font-weight: 600;
          color: #555;
        }
        .details-value {
          color: #222;
        }
        .details-description {
          margin-top: 1.2rem;
          font-size: 1.05rem;
          color: #444;
          background: #f7f9fc;
          padding: 1rem;
          border-radius: 8px;
        }
        @media (max-width: 600px) {
          .details-container {
            max-width: 100vw;
            min-width: 0;
            padding: 1.2rem 0.5rem 1rem 0.5rem;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          }
          .details-header {
            font-size: 1.4rem;
          }
          .details-row {
            font-size: 1rem;
          }
          .details-description {
            font-size: 0.98rem;
            padding: 0.7rem;
          }
        }
      `}</style>
      <div className="details-bg">
        <div className="details-container">
          <div className="details-header">{match.workerName}</div>
          <div className="details-row"><span className="details-label">Skill:</span> <span className="details-value">{match.skillType}</span></div>
          <div className="details-row"><span className="details-label">Location:</span> <span className="details-value">{match.location}</span></div>
          <div className="details-row"><span className="details-label">Experience:</span> <span className="details-value">{match.experienceYears} years</span></div>
          <div className="details-row"><span className="details-label">Hourly Rate:</span> <span className="details-value">${match.hourlyRate}</span></div>
          <div className="details-row"><span className="details-label">Rating:</span> <span className="details-value">{match.rating}</span></div>
          <div className="details-row"><span className="details-label">Completed Jobs:</span> <span className="details-value">{match.completedJobs}</span></div>
          <div className="details-description">{match.description}</div>
        </div>
      </div>
    </>
  );
};
