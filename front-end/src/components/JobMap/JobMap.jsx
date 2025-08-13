import Occupation from "../Occupation/Occupation";
import "./JobMap.css";

function JobMap({ onJobInfoClick }) {
  return (
    <div className="map">
      <div className="category category__1">
        <h3 className="category__title">Utilities & Grid Modernization</h3>
      </div>
      <div className="category category__2">
        <h3 className="category__title">Renewable Energy Systems</h3>
      </div>

      <div className="category category__3">
        <h3 className="category__title">
          Residential & Commercial Construction
        </h3>
      </div>

      <div className="category category__4">
        <h3 className="category__title">Building Operations Systems</h3>
      </div>

      <div className="category category__5">
        <h3 className="category__title">HVAC/R & Product Distribution</h3>
      </div>

      <Occupation onJobInfoClick={onJobInfoClick} value="1" />
      <Occupation onJobInfoClick={onJobInfoClick} value="2" />
    </div>
  );
}

export default JobMap;
