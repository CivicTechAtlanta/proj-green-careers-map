import { useState, useRef, useEffect } from "react";
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

// Category color mapping based on column colors
const categoryColors = {
  1: '#f1c40f', // yellow
  2: '#9b59b6', // plum
  3: '#27ae60', // green
  4: '#3498db', // sky blue
  5: '#e67e22', // orange
  6: '#e91e63', // pink
  7: '#2980b9', // blue
  8: '#1abc9c', // mint
};

function JobMap({ onJobInfoClick, jobs }) {
  const [sortOrder, setSortOrder] = useState('entry-to-late');
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFields, setSelectedFields] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [isFieldDropdownOpen, setIsFieldDropdownOpen] = useState(false);
  const [isSkillsDropdownOpen, setIsSkillsDropdownOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const tableContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const fieldWrapperRef = useRef(null);
  const skillsWrapperRef = useRef(null);
  const [fieldDropdownAlignRight, setFieldDropdownAlignRight] = useState(false);
  const [skillsDropdownAlignRight, setSkillsDropdownAlignRight] = useState(false);
  const [mobileCurrentCategoryIndex, setMobileCurrentCategoryIndex] = useState(0);

  // Filter jobs based on search term, selected fields, and selected skills
  const filteredJobs = Array.isArray(jobs) ? jobs.filter(job => {
    const matchesSearch = job.job_name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesField = selectedFields.length === 0 ||
      selectedFields.includes(job.category);

    const matchesSkills = selectedSkills.length === 0 ||
      (job.tags && job.tags.some(tag => selectedSkills.includes(tag)));

    return matchesSearch && matchesField && matchesSkills;
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

  // Extract unique categories from all jobs (for dropdown)
  const allCategories = Array.from(new Set(
    jobs.filter(j => j.category).map(j => j.category)
  ));

  // Extract unique categories and career levels from filtered job data
  const { categories: allFilteredCategories, tiers } = ConstructJobsTable(filteredJobs);

  // Limit displayed categories based on selected fields (max 5)
  // If fields are selected, only show those fields (up to 5)
  // If no fields are selected, show empty array (triggers "no results" UI)
  const categories = selectedFields.length > 0
    ? selectedFields.filter(field => allFilteredCategories.includes(field)).slice(0, 5)
    : [];

  // Sort tiers based on current order
  const sortedTiers = sortOrder === 'late-to-entry'
    ? [...tiers].sort((a, b) => b - a)
    : [...tiers].sort((a, b) => a - b);

  // Function to get jobs for a specific category and tier
  const getJobsForCell = (category, tier) => {
    if (!Array.isArray(filteredJobs)) return [];
    return filteredJobs.filter(job => 
      job.category === category && job.career_level === tier
    );
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle field checkbox toggle with max 5 columns
  const handleFieldToggle = (field) => {
    if (selectedFields.includes(field)) {
      setSelectedFields(prev => prev.filter(f => f !== field));
    } else {
      // Only allow adding if we have fewer than 5 selected fields
      if (selectedFields.length < 5) {
        setSelectedFields([...selectedFields, field]);
      }
    }
  };

  // Handle skills checkbox toggle
  const handleSkillToggle = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(prev => prev.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  // Remove individual field tag
  const removeField = (field) => {
    setSelectedFields(prev => prev.filter(f => f !== field));
  };

  // Remove individual skill tag
  const removeSkill = (skill) => {
    setSelectedSkills(prev => prev.filter(s => s !== skill));
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSortOrder('entry-to-late');
    setSelectedFields([]);
    setSelectedSkills([]);
    setSearchTerm('');
  };

  // Update scroll button visibility
  const updateScrollButtons = () => {
    const container = tableContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  // Scroll left
  const scrollLeft = () => {
    tableContainerRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  // Scroll right
  const scrollRight = () => {
    tableContainerRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
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

  // Check scroll position on mount and resize
  useEffect(() => {
    const container = tableContainerRef.current;
    if (container) {
      updateScrollButtons();
      const handleResize = () => updateScrollButtons();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [visibleCategories, filteredJobs]);

  // Initialize with first 5 fields when jobs load
  useEffect(() => {
    if (!isInitialized && jobs && jobs.length > 0) {
      const uniqueCategories = Array.from(new Set(
        jobs.filter(j => j.category).map(j => j.category)
      ));
      setSelectedFields(uniqueCategories.slice(0, 5));
      setIsInitialized(true);
    }
  }, [jobs, isInitialized]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.multiselect-wrapper')) {
        setIsFieldDropdownOpen(false);
        setIsSkillsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset mobile category index when categories change
  useEffect(() => {
    if (mobileCurrentCategoryIndex >= visibleCategories.length) {
      setMobileCurrentCategoryIndex(Math.max(0, visibleCategories.length - 1));
    }
  }, [visibleCategories.length, mobileCurrentCategoryIndex]);

  // Calculate dropdown positioning to prevent viewport overflow
  useEffect(() => {
    const calculatePosition = (wrapperRef, setAlignRight) => {
      if (wrapperRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect();
        const availableSpace = window.innerWidth - rect.right;
        const dropdownWidth = 200; // min-width of trigger button

        // If not enough space on right, align to right edge
        setAlignRight(availableSpace < dropdownWidth);
      }
    };

    if (isFieldDropdownOpen) {
      calculatePosition(fieldWrapperRef, setFieldDropdownAlignRight);
    }

    if (isSkillsDropdownOpen) {
      calculatePosition(skillsWrapperRef, setSkillsDropdownAlignRight);
    }
  }, [isFieldDropdownOpen, isSkillsDropdownOpen]);

  return (
    <div className="map">
      <div className="new-header-section">
        <h1>Discover Where You Can Go</h1>
        <p>Use the map below to see the available careers in each field or use the filters to find one tailored to your skills.</p>
      </div>

      <div className="filters-row">
        <div className="filter-group">
          <label>Sort by Experience Level</label>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="entry-to-late">Entry to Late-Career</option>
            <option value="late-to-entry">Late-Career to Entry</option>
          </select>
        </div>

        <div className="filter-group multiselect-filter">
          <label>Filter by Field</label>
          <div className="multiselect-wrapper" ref={fieldWrapperRef}>
            <button
              className="multiselect-trigger"
              onClick={() => setIsFieldDropdownOpen(!isFieldDropdownOpen)}
            >
              {selectedFields.length === 0 ? 'All' : `${selectedFields.length} selected`}
              <svg className="dropdown-arrow" viewBox="0 0 12 12">
                <path fill="currentColor" d="M6 9L1 4h10z"/>
              </svg>
            </button>
            {isFieldDropdownOpen && (
              <div className={`multiselect-dropdown ${fieldDropdownAlignRight ? 'multiselect-dropdown--right' : ''}`}>
                {selectedFields.length >= 5 && (
                  <div className="multiselect-max-warning">
                    Maximum 5 fields can be displayed. Uncheck a field to select another.
                  </div>
                )}
                {allCategories.map(cat => {
                  const isChecked = selectedFields.includes(cat);
                  const isDisabled = !isChecked && selectedFields.length >= 5;
                  return (
                    <label
                      key={cat}
                      className={`multiselect-option ${isDisabled ? 'multiselect-option--disabled' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        disabled={isDisabled}
                        onChange={() => handleFieldToggle(cat)}
                      />
                      <span>{cat}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="filter-group multiselect-filter">
          <label>Filter by Skills</label>
          <div className="multiselect-wrapper" ref={skillsWrapperRef}>
            <button
              className="multiselect-trigger"
              onClick={() => setIsSkillsDropdownOpen(!isSkillsDropdownOpen)}
            >
              {selectedSkills.length === 0 ? 'All' : `${selectedSkills.length} selected`}
              <svg className="dropdown-arrow" viewBox="0 0 12 12">
                <path fill="currentColor" d="M6 9L1 4h10z"/>
              </svg>
            </button>
            {isSkillsDropdownOpen && (
              <div className={`multiselect-dropdown ${skillsDropdownAlignRight ? 'multiselect-dropdown--right' : ''}`}>
                {allTags.map(tag => (
                  <label key={tag} className="multiselect-option">
                    <input
                      type="checkbox"
                      checked={selectedSkills.includes(tag)}
                      onChange={() => handleSkillToggle(tag)}
                    />
                    <span>{tag}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="search-container-inline">
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

        <button className="clear-all-link" onClick={clearAllFilters}>
          Clear All Filters
        </button>
      </div>

      {(selectedFields.length > 0 || selectedSkills.length > 0) && (
        <div className="tags-selected-section">
          <span className="tags-label">Tags Selected</span>
          <div className="selected-tags-list">
            {selectedFields.map(field => (
              <div key={field} className="tag-pill">
                {field}
                <button onClick={() => removeField(field)} aria-label={`Remove ${field}`}>×</button>
              </div>
            ))}
            {selectedSkills.map(skill => (
              <div key={skill} className="tag-pill">
                {skill}
                <button onClick={() => removeSkill(skill)} aria-label={`Remove ${skill}`}>×</button>
              </div>
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
      {filteredJobs.length === 0 || visibleCategories.length === 0 ? (
        <div className="no-results">
          <p>No jobs match the selected criteria</p>
        </div>
      ) : (
        <>
          <div className="navigation-wrapper">
            {canScrollLeft && (
              <button
                className="nav-arrow left"
                onClick={scrollLeft}
                aria-label="Scroll left"
              >
                ←
              </button>
            )}

            <div
              ref={tableContainerRef}
              className={`table-container ${visibleCategories.length > 5 ? 'scrollable' : ''}`}
              onScroll={updateScrollButtons}
            >
              <table className="job-map-table">
                <thead>
                  <tr>
                    <th></th>
                    {visibleCategories.map((category, index) => (
                    <th key={index} className={`category-header column-${categories.indexOf(category) + 1}`}>
                      <span>{category}</span>
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
                const columnIndex = categories.indexOf(category) + 1;
                const categoryColor = categoryColors[columnIndex];
                return (
                  <td key={colIndex} className={`job-cell column-${columnIndex}`}>
                    {cellJobs.map((job, jobIndex) => (
                      <div key={job.id || jobIndex} className="job-button-container">
                        <button
                          className="job-button"
                          onClick={() => onJobInfoClick({ ...job, categoryColor })}
                        >
                          <div className="job-name">{job.job_name}</div>
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

          {canScrollRight && (
            <button
              className="nav-arrow right"
              onClick={scrollRight}
              aria-label="Scroll right"
            >
              →
            </button>
          )}
        </div>

        {/* Mobile Card View */}
        <div className="mobile-card-view">
          {visibleCategories.length > 0 && (
            <>
              <div className="mobile-category-nav">
                <button
                  className="mobile-nav-btn"
                  onClick={() => setMobileCurrentCategoryIndex(prev => Math.max(0, prev - 1))}
                  disabled={mobileCurrentCategoryIndex === 0}
                  aria-label="Previous category"
                >
                  ←
                </button>
                <div
                  className={`mobile-category-title column-${categories.indexOf(visibleCategories[mobileCurrentCategoryIndex]) + 1}`}
                >
                  {visibleCategories[mobileCurrentCategoryIndex]}
                </div>
                <button
                  className="mobile-nav-btn"
                  onClick={() => setMobileCurrentCategoryIndex(prev => Math.min(visibleCategories.length - 1, prev + 1))}
                  disabled={mobileCurrentCategoryIndex === visibleCategories.length - 1}
                  aria-label="Next category"
                >
                  →
                </button>
              </div>
              <div className="mobile-category-indicator">
                {mobileCurrentCategoryIndex + 1} of {visibleCategories.length} fields
              </div>

              {sortedTiers.map((tier) => {
                const currentCategory = visibleCategories[mobileCurrentCategoryIndex];
                const cellJobs = getJobsForCell(currentCategory, tier);
                const columnIndex = categories.indexOf(currentCategory) + 1;
                const categoryColor = categoryColors[columnIndex];

                return (
                  <div key={tier} className="mobile-tier-section">
                    <div className="mobile-tier-header">
                      {levelMap[tier] || `Level ${tier}`}
                    </div>
                    <div className="mobile-jobs-list">
                      {cellJobs.length > 0 ? (
                        cellJobs.map((job, jobIndex) => (
                          <button
                            key={job.id || jobIndex}
                            className="mobile-job-card"
                            style={{ borderColor: categoryColor }}
                            onClick={() => onJobInfoClick({ ...job, categoryColor })}
                          >
                            <div className="mobile-job-name" style={{ color: categoryColor }}>
                              {job.job_name}
                            </div>
                          </button>
                        ))
                      ) : (
                        <div className="mobile-empty-tier">No jobs at this level</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
        </>
      )}
    </div>
  );
}

export default JobMap;
