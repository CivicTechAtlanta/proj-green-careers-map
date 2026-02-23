import { useState, useEffect } from "react";
import Hero from "../Hero/Hero";
import ExploreFields from "../ExploreFields/ExploreFields";
import JobMap from "../JobMap/JobMap";
import "./Home.css";
import {
  loadingText,
  errorTitle,
  retryButtonText,
  acknowledgmentText,
  acknowledgmentLinkText,
  acknowledgmentLinkUrl,
} from "../../../content/home.js";

function Home({ onJobInfoClick }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        setLoading(true);
        setError(null);
        
        // API endpoint from environment variable, fallback to localhost for development
        const apiUrl = import.meta.env.VITE_API_URL || 'https://green-careers-map-demo.fly.dev';
        
        const response = await fetch(`${apiUrl}/items/jobs`);

        const jobsData = await response.json();

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        if (jobsData.data) {
          console.log('Jobs data:', jobsData.data);
          setJobs(jobsData.data);
        }
        else {
          // No jobs data found
          console.warn('No data field in jobsData:', jobsData);
          setJobs([]);
        }

      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <section className="home">
      <Hero />
      <ExploreFields />
      {loading ? (
        <div className="loading">{loadingText}</div>
      ) : error ? (
        <div className="error-container">
          <div className="error-icon">{"\u26A0\uFE0F"}</div>
          <h2 className="error-title">{errorTitle}</h2>
          <p className="error-message">{error}</p>
          <button className="error-retry" onClick={() => window.location.reload()}>
            {retryButtonText}
          </button>
        </div>
      ) : (
        <JobMap onJobInfoClick={onJobInfoClick} jobs={jobs} />
      )}

      {/* Acknowledgment Box */}
      <div className="home__acknowledgment">
        <p className="home__acknowledgment-text">
          {acknowledgmentText}{" "}
          <a
            href={acknowledgmentLinkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="home__acknowledgment-link"
          >
            {acknowledgmentLinkText}
          </a>
        </p>
      </div>
    </section>
  );
}

export default Home;
