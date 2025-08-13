import Occupation from "../Occupation/Occupation";
import "./Home.css";

function Home({ onJobInfoClick }) {
  return (
    <section className="home">
      <h2 className="home__title">Career Map</h2>
      <div className="home__job-map">
        <Occupation onJobInfoClick={onJobInfoClick} />
      </div>
    </section>
  );
}

export default Home;
