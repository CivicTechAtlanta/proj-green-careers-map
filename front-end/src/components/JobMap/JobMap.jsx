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
  const [selectedTags, setSelectedTags] = useState([]);
  const [hiddenColumns, setHiddenColumns] = useState([]);

  // Filter jobs based on search term and selected tags
  const filteredJobs = Array.isArray(jobs) ? jobs.filter(job => {
    // Filter by search term
    const matchesSearch = job.job_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by selected tags (if any tags are selected)
    const matchesTags = selectedTags.length === 0 || 
      (job.tags && Array.isArray(job.tags) && 
       selectedTags.some(selectedTag => job.tags.includes(selectedTag)));
    
    return matchesSearch && matchesTags;
  }) : [];

  // Extract unique tags from all jobs
  const getAllTags = () => {
    const allTags = new Set();
    if (Array.isArray(jobs)) {
      jobs.forEach(job => {
        if (job.tags && Array.isArray(job.tags)) {
          job.tags.forEach(tag => allTags.add(tag));
        }
      });
    }
    return Array.from(allTags);
  };

  const allTags = getAllTags();

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

  // Handle tag selection
  const handleTagClick = (tag) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        // Remove tag if already selected
        return prev.filter(t => t !== tag);
      } else {
        // Add tag if not selected
        return [...prev, tag];
      }
    });
  };

  // Clear all selected tags
  const clearAllTags = () => {
    setSelectedTags([]);
  };

  // Handle column visibility toggle
  const toggleColumnVisibility = (category) => {
    setHiddenColumns(prev => {
      if (prev.includes(category)) {
        // Show column if currently hidden
        return prev.filter(c => c !== category);
      } else {
        // Hide column if currently visible
        return [...prev, category];
      }
    });
  };

  // Filter visible categories
  const visibleCategories = categories.filter(cat => !hiddenColumns.includes(cat));

  return (
    <div className="map">
      <div className="page-header">
        <h1>Explore career opportunities in environmental and sustainable industries. Click on any job to learn more</h1>
      </div>
      <div className="search-container">
        <div className="search-input-wrapper">
          <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            type="text"
            placeholder="Search jobs..."
            className="search-box"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      {allTags.length > 0 && (
        <div className="tags-section">
          <div className="tags-header">
            <h3>Filter by Tags:</h3>
            {selectedTags.length > 0 && (
              <button className="clear-tags-btn" onClick={clearAllTags}>
                Clear All ({selectedTags.length})
              </button>
            )}
          </div>
          <div className="tags-list">
            {allTags.map((tag, index) => (
              <button
                key={index}
                className={`tag ${selectedTags.includes(tag) ? 'tag-selected' : ''}`}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
      {hiddenColumns.length > 0 && (
        <div className="hidden-columns-section">
          <span className="hidden-columns-label">Hidden columns:</span>
          {hiddenColumns.map((category, index) => (
            <button
              key={index}
              className="hidden-column-btn"
              onClick={() => toggleColumnVisibility(category)}
              title="Click to show column"
            >
              {category} ✓
            </button>
          ))}
        </div>
      )}
      {filteredJobs.length === 0 ? (
        <div className="no-results">
          <p>No jobs match the selected criteria</p>
        </div>
      ) : (
        <>
          <div className={`table-container ${visibleCategories.length > 5 ? 'scrollable' : ''}`}>
          <table className="job-map-table">
        <thead>
          <tr>
            <th>
              <button className="corner-button" onClick={handleSortClick}>
                {isReversed ? "▲" : "▼"}
              </button>
            </th>
            {visibleCategories.map((category, index) => (
              <th key={index} className={`category-header column-${categories.indexOf(category) + 1}`}>
                <div className="category-header-wrapper">
                  <button 
                    className="hide-column-btn" 
                    onClick={() => toggleColumnVisibility(category)}
                    title="Hide column"
                  >
                    ✕
                  </button>
                  <span>{category}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedTiers.map((tier, rowIndex) => (
            <tr key={rowIndex}>
              <td className="tier-header">{levelMap[tier] || `Level ${tier}`}</td>
              {visibleCategories.map((category, colIndex) => {
                const cellJobs = getJobsForCell(category, tier);
                return (
                  <td key={colIndex} className={`job-cell column-${categories.indexOf(category) + 1}`}>
                    {cellJobs.map((job, jobIndex) => (
                      <div key={job.id || jobIndex} className="job-button-container">
                        <button
                          className="job-button"
                          onClick={() => onJobInfoClick(job)}
                        >
                          <div className="job-name">{job.job_name}</div>
                          <div className="job-pay">{job.payinfo}</div>
                        </button>
                      </div>
                    ))}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
          </div>
        </>
      )}
    </div>
  );
}

export default JobMap;
