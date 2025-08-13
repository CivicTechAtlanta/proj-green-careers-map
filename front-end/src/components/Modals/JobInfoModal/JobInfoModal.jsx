import "./JobInfoModal.css";
import "../Modals.css";

function JobInfoModal({ activeModal, closeModal }) {
  return (
    <div className={`modal ${activeModal === "job-info" && "modal__open"}`}>
      <div className="modal__content">
        <p>THIS IS THE JOB INFO MODAL</p>
        <button
          className="modal__close-button"
          type="button"
          onClick={closeModal}
        >
          X
        </button>
      </div>
    </div>
  );
}

export default JobInfoModal;
