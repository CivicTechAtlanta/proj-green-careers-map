import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Home from "../Home/Home";
import Footer from "../Footer/Footer";
import JobInfoModal from "../Modals/JobInfoModal/JobInfoModal";

import "./App.css";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);

  const onJobInfoClick = (job) => {
    setSelectedJob(job);
    setActiveModal("job-info");
  };

  const closeModal = () => {
    setActiveModal("");
    setSelectedJob(null);
  };

  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") closeModal();
    };

    const handleClickOutside = (e) => {
      if (e.target.classList.contains("modal")) {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEscClose);
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleEscClose);
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="app">
      <Header />
      <div className="app__content">
        <Home onJobInfoClick={onJobInfoClick} />
      </div>
      <Footer />
      <JobInfoModal activeModal={activeModal} closeModal={closeModal} jobData={selectedJob} />
    </div>
  );
}

export default App;
