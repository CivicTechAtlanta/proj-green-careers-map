import { useEffect, useRef } from "react";
import "./JobInfoModal.css";
import "../Modals.css";

import icon from "../../../assets/react.svg";
import dollarIcon from "../../../assets/dollar-sign.svg";
import trendingUpIcon from "../../../assets/trending-up.svg";
import graduationCapIcon from "../../../assets/graduation-cap.svg";

function JobInfoModal({ activeModal, closeModal, jobData }) {
  const jobInfoRef = useRef(null);

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
            <img className="job-info__icon" src={icon} alt="job-info icon" />
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
                  src={trendingUpIcon}
                  alt="experience level icon"
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
              <img className="job-info__icon" src={graduationCapIcon} alt="education icon" />
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
