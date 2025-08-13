import "./Occupation.css";

function Occupation({ onJobInfoClick }) {
  return (
    <div>
      <button
        className="home__job-info-button"
        type="button"
        onClick={onJobInfoClick}
      >
        JOB 1
      </button>
    </div>
  );
}

export default Occupation;
