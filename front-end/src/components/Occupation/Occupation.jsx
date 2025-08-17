import "./Occupation.css";

function Occupation({ onJobInfoClick, value }) {
  return (
    <div>
      <button
        className="home__job-info-button"
        type="button"
        onClick={onJobInfoClick}
      >
        JOB {value}
      </button>
    </div>
  );
}

export default Occupation;
