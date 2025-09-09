import { useEffect, useState } from "react";
import JobMap from "../JobMap/JobMap";
import { getRows, getCategories, getJobs } from "../../services/api";
import "./Home.css";

function Home() {
  const [categories, setCategories] = useState([]);
  const [rows, setRows] = useState([]);
  const [jobsCount, setJobsCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setError("");

        const [catsRes, rowsRes, jobsRes] = await Promise.all([
          getCategories({ signal: ac.signal }),
          getRows({ signal: ac.signal }),
          getJobs({ signal: ac.signal }),
        ]);

        const toArray = (v) => (Array.isArray(v) ? v : v ? [v] : []);
        setCategories(toArray(catsRes));
        setRows(toArray(rowsRes));
        setJobsCount(toArray(jobsRes).length);
      } catch (e) {
        if (e.name !== "AbortError")
          setError(e.message || "Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    })();
    return () => ac.abort();
  }, []);

  return (
    <section className="home">
      <h2 className="home__title">Career Map</h2>

      {loading && <div className="home__status">Loading…</div>}
      {error && <div className="home__error">Error: {error}</div>}
      {jobsCount != null && !loading && !error && (
        <div className="home__note">
          Jobs fetched: <strong>{jobsCount}</strong>
        </div>
      )}

      <JobMap categories={categories} rows={rows} />
    </section>
  );
}

export default Home;
