import JobMap from "../JobMap/JobMap";
import "./Home.css";

function Home({ onJobInfoClick }) {
  return (
    <section className="home">
      <h2 className="home__title">Career Map</h2>
      <JobMap onJobInfoClick={onJobInfoClick} />
    </section>
  );
}

export default Home;
