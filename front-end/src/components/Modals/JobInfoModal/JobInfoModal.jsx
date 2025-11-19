import "./JobInfoModal.css";
import "../Modals.css";

import icon from "../../../assets/react.svg";
import dollarIcon from "../../../assets/dollar-sign.svg";

function JobInfoModal({ activeModal, closeModal, jobData }) {
  if (!jobData) {
    return null;
  }

  console.log(jobData);

  return (
    <div className={`modal ${activeModal === "job-info" && "modal__open"}`}>
      <div className="modal__content">
        <button
          className="modal__close-button"
          type="button"
          onClick={closeModal}
        >
          ×
        </button>
        <div className="job-info">
          <header className="job-info__header">
            <img className="job-info__icon" src={icon} alt="job-info icon" />
            <div className="job-info__title-content">
              <h2 className="job-info__title">{jobData.job_name}</h2>
              <p className="job-info__category">{jobData.category}</p>
            </div>
          </header>
          <div className="job-info__section">
            <h3>Job Description</h3>
            <p>{jobData.description}</p>
          </div>
          <div className="job-info__section">
            <div className="job-info__container">
              <div className="job-info__icon-container">
                <img
                  className="job-info__icon"
                  src={dollarIcon}
                  alt="compensation icon"
                />
                <div className="job-info__experience-container">
                  <h3>Compensation</h3>
                  <p>{jobData.payinfo}</p>
                </div>
              </div>
              <div className="job-info__icon-container">
                <img
                  className="job-info__icon"
                  src={icon}
                  alt="job-info icon"
                />
                <div className="job-info__experience-container">
                  <h3>Experience Level</h3>
                  <p>{jobData.career_level}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="job-info__section">
            <div className="job-info__icon-container">
              <img className="job-info__icon" src={icon} alt="job-info icon" />
              <div className="job-info__experience-container">
                <h3>Education Requirements</h3>
                <p>{jobData.required_education}</p>
              </div>
            </div>
          </div>
          <div className="job-info__section">
            <div className="job-info__education-container">
              <h3>Experience Requirements</h3>
            </div>
            <p>{jobData.experience}</p>
          </div>
          <div className="job-info__section">
            <div className="job-info__education-container">
              <h3>Key Skills</h3>
            </div>
            <p>{jobData.required_skills}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobInfoModal;
