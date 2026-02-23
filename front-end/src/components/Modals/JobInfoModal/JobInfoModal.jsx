import { useEffect, useRef } from "react";
import "./JobInfoModal.css";
import "../Modals.css";

import dollarIcon from "../../../assets/dollar-sign.svg";
import trendingUpIcon from "../../../assets/trending-up.svg";
import graduationCapIcon from "../../../assets/graduation-cap.svg";

import { levelMap } from "../../../../content/shared.js";
import {
  jobDescriptionHeading,
  compensationHeading,
  experienceLevelHeading,
  educationHeading,
  experienceRequirementsHeading,
  keySkillsHeading,
  externalSearchesHeading,
  linkedInJobsLabel,
  indeedJobsLabel,
  compensationIconAlt,
  experienceLevelIconAlt,
  educationIconAlt,
} from "../../../../content/job-info-modal.js";

function JobInfoModal({ activeModal, closeModal, jobData }) {
  const jobInfoRef = useRef(null);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (activeModal === "job-info") {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeModal]);

  // Handle scroll indicators
  useEffect(() => {
    const handleScroll = () => {
      const element = jobInfoRef.current;
      if (!element) return;

      const { scrollTop, scrollHeight, clientHeight } = element;
      const canScrollUp = scrollTop > 0;
      const canScrollDown = scrollTop + clientHeight < scrollHeight - 1;

      element.classList.toggle('can-scroll-up', canScrollUp);
      element.classList.toggle('can-scroll-down', canScrollDown);
    };

    const element = jobInfoRef.current;
    if (element) {
      handleScroll(); // Initial check
      element.addEventListener('scroll', handleScroll);

      // Check on resize
      const resizeObserver = new ResizeObserver(handleScroll);
      resizeObserver.observe(element);

      return () => {
        element.removeEventListener('scroll', handleScroll);
        resizeObserver.disconnect();
      };
    }
  }, [jobData, activeModal]);

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
        <div className="job-info" ref={jobInfoRef}>
          <header className="job-info__header">
            <svg
              className="job-info__icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke={jobData.categoryColor || 'rgb(255, 195, 66)'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            <div className="job-info__title-content">
              <h2 className="job-info__title">{jobData.job_name}</h2>
              <p
                className="job-info__category"
                style={{
                  borderColor: jobData.categoryColor || 'rgb(255, 195, 66)',
                  color: jobData.categoryColor || 'rgb(255, 195, 66)'
                }}
              >
                {jobData.category}
              </p>
            </div>
          </header>
          <div className="job-info__section">
            <h3>{jobDescriptionHeading}</h3>
            <p>{jobData.description}</p>
          </div>
          <div className="job-info__stats-wrapper">
            <div className="job-info__stat-item">
              <img
                className="job-info__icon"
                src={dollarIcon}
                alt={compensationIconAlt}
              />
              <div className="job-info__stat-content">
                <h3>{compensationHeading}</h3>
                <p>{jobData.payinfo}</p>
              </div>
            </div>
            <div className="job-info__stat-item">
              <img
                className="job-info__icon"
                src={trendingUpIcon}
                alt={experienceLevelIconAlt}
              />
              <div className="job-info__stat-content">
                <h3>{experienceLevelHeading}</h3>
                <p>{levelMap[jobData.career_level] || jobData.career_level}</p>
              </div>
            </div>
            <div className="job-info__stat-item">
              <img className="job-info__icon" src={graduationCapIcon} alt={educationIconAlt} />
              <div className="job-info__stat-content">
                <h3>{educationHeading}</h3>
                <p>{jobData.required_education}</p>
              </div>
            </div>
          </div>
          <div className="job-info__section">
            <div className="job-info__education-container">
              <h3>{experienceRequirementsHeading}</h3>
            </div>
            <p>{jobData.experience}</p>
          </div>
          <div className="job-info__section">
            <div className="job-info__education-container">
              <h3>{keySkillsHeading}</h3>
            </div>
            <p>{jobData.required_skills}</p>
          </div>
          {(jobData.linkedin_search || jobData.indeed_search) && (
            <div className="job-info__section">
              <h3>{externalSearchesHeading}</h3>
              <div className="external-search-buttons">
                {jobData.linkedin_search && (
                  <a
                    href={jobData.linkedin_search}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="external-search-btn external-search-btn--linkedin"
                  >
                    <span className="btn-icon">in</span>
                    {linkedInJobsLabel}
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
                    {indeedJobsLabel}
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobInfoModal;
