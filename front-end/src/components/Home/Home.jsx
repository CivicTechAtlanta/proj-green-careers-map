import { useState, useEffect } from "react";
import JobMap from "../JobMap/JobMap";
import "./Home.css";

function Home({ onJobInfoClick }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        setLoading(true);
        setError(null);
        
        // Replace with your actual API endpoint
        const response = await fetch('http://localhost:8055/items/jobs');

        const jobsData = await response.json();

        console.log('Fetch response:', jobsData);

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

  if (loading) {
    return (
      <section className="home">
        <div className="loading">Loading...</div>
      </section>
    );
  }

  if (error) {

    return (
      <section className="home">
        <div className="error">Error: {error}</div>
      </section>
    );
  }

  return (
    <section className="home">
      <JobMap onJobInfoClick={onJobInfoClick} jobs={jobs} />
    </section>
  );
}

export default Home;
