import "./Occupation.css";

function Occupation({ onJobInfoClick, value, children }) {
  return (
    <div>
      <button
        className="home__job-info-button"
        type="button"
        onClick={() => onJobInfoClick(value)}
      >
        {children}
      </button>
    </div>
  );
}

export default Occupation;
