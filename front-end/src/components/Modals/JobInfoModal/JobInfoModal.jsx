import "./JobInfoModal.css";
import "../Modals.css";

function JobInfoModal({ activeModal, closeModal, jobData }) {
  if (!jobData) {
    return null;
  }

  return (
    <div className={`modal ${activeModal === "job-info" && "modal__open"}`}>
      <div className="modal__content">
        <div className="job-info">
          <h2 className="job-info__title">{jobData.job_name}</h2>
          
          <div className="job-info__section">
            <h3>Description</h3>
            <p>{jobData.description}</p>
          </div>

          <div className="job-info__section">
            <h3>Required Skills</h3>
            <p>{jobData.required_skills}</p>
          </div>

          <div className="job-info__section">
            <h3>Required Education</h3>
            <p>{jobData.required_education}</p>
          </div>

          <div className="job-info__section">
            <h3>Experience</h3>
            <p>{jobData.experience}</p>
          </div>

          <div className="job-info__section">
            <h3>Pay Information</h3>
            <p>{jobData.payinfo}</p>
          </div>

          {(jobData.linkedin_search || jobData.indeed_search) && (
            <div className="job-info__section">
              <h3>External Searches</h3>
              <div className="external-search-buttons">
                {jobData.linkedin_search && (
                  <a 
                    href={jobData.linkedin_search} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="external-search-btn external-search-btn--linkedin"
                  >
                    <span className="btn-icon">in</span>
                    LinkedIn Jobs
                  </a>
                )}
                {jobData.indeed_search && (
                  <a 
                    href={jobData.indeed_search} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="external-search-btn external-search-btn--indeed"
                  >
                    <span className="btn-icon">i</span>
                    Indeed Jobs
                  </a>
                )}
              </div>
            </div>
          )}

          {jobData.tags && jobData.tags.length > 0 && (
            <div className="job-info__section">
              <h3>Tags</h3>
              <div className="job-tags">
                {jobData.tags.map((tag, index) => (
                  <span key={index} className="job-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="job-info__metadata">
            <p><strong>Category:</strong> {jobData.category}</p>
            <p><strong>Career Level:</strong> {jobData.career_level}</p>
          </div>
        </div>
        
        <button
          className="modal__close-button"
          type="button"
          onClick={closeModal}
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default JobInfoModal;
