import { useState } from "react";
import "./JobMap.css";

const levelMap = {
  1: "Entry",
  2: "Mid",
  3: "Late Career",
}

function ConstructJobsTable(jobs) {
  let categories = []
  let tiers = []
  
  if (Array.isArray(jobs)) {
    jobs.forEach((job) => {
      // Add unique categories
      if (job.category && !categories.includes(job.category)) {
        categories.push(job.category);
      }
      
      // Add unique career levels to tiers
      if (job.career_level && !tiers.includes(job.career_level)) {
        tiers.push(job.career_level);
      }
    });
  }
  
  return { categories, tiers };
}

function JobMap({ onJobInfoClick, jobs }) {
  const [isReversed, setIsReversed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter jobs based on search term
  const filteredJobs = Array.isArray(jobs) ? jobs.filter(job =>
    job.job_name.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  // Extract unique categories and career levels from filtered job data
  const { categories, tiers } = ConstructJobsTable(filteredJobs);
  
  // Sort tiers based on current order
  const sortedTiers = isReversed ? [...tiers].reverse() : tiers;

  // Function to get jobs for a specific category and tier
  const getJobsForCell = (category, tier) => {
    if (!Array.isArray(filteredJobs)) return [];
    return filteredJobs.filter(job => 
      job.category === category && job.career_level === tier
    );
  };

  // Handle sort button click
  const handleSortClick = () => {
    setIsReversed(!isReversed);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="map">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search jobs..."
          className="search-box"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      {filteredJobs.length === 0 ? (
        <div className="no-results">
          <p>No jobs match the selected criteria</p>
        </div>
      ) : (
        <>
          <p className="hover-note">Hover over each job to see pay information</p>
          <table className="job-map-table">
        <thead>
          <tr>
            <th>
              <button className="corner-button" onClick={handleSortClick}>
                {isReversed ? "▲" : "▼"}
              </button>
            </th>
            {categories.map((category, index) => (
              <th key={index} className={`category-header column-${index + 1}`}>
                {category}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedTiers.map((tier, rowIndex) => (
            <tr key={rowIndex}>
              <td className="tier-header">{levelMap[tier] || `Level ${tier}`}</td>
              {categories.map((category, colIndex) => {
                const cellJobs = getJobsForCell(category, tier);
                return (
                  <td key={colIndex} className={`job-cell column-${colIndex + 1}`}>
                    {cellJobs.map((job, jobIndex) => (
                      <div key={job.id || jobIndex} className="job-button-container">
                        <button
                          className="job-button"
                          onClick={() => onJobInfoClick(job)}
                        >
                          {job.job_name}
                        </button>
                        <div className="tooltip">{job.payinfo}</div>
                      </div>
                    ))}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
        </>
      )}
    </div>
  );
}

export default JobMap;
