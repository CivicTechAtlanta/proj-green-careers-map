import Occupation from "../Occupation/Occupation";
import "./JobMap.css";

function JobMap({ onJobInfoClick }) {
  return (
    <div className="map">
      <Occupation onJobInfoClick={onJobInfoClick} value="1" />
      <Occupation onJobInfoClick={onJobInfoClick} value="2" />
    </div>
  );
}

export default JobMap;
