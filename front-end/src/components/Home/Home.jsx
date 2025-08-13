import "./Home.css";

function Home({ onJobInfoClick }) {
  return (
    <section className="home">
      THIS IS THE HOME SECTION
      <button
        className="home__job-info-button"
        type="button"
        onClick={onJobInfoClick}
      >
        CLICK HERE TO OPEN JOB INFO MODAL
      </button>
    </section>
  );
}

export default Home;
