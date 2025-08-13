import { useState } from "react";
import Header from "../Header/Header";
import Home from "../Home/Home";
import Footer from "../Footer/Footer";
import JobInfoModal from "../Modals/JobInfoModal/JobInfoModal";

import "./App.css";

function App() {
  const [activeModal, setActiveModal] = useState("");

  const onJobInfoClick = () => {
    setActiveModal("job-info");
  };

  const closeModal = () => {
    setActiveModal("");
  };

  return (
    <div className="app">
      <div className="app__content">
        <Header />
        <Home onJobInfoClick={onJobInfoClick} />
        <Footer />
      </div>
      <JobInfoModal activeModal={activeModal} closeModal={closeModal} />
    </div>
  );
}

export default App;
