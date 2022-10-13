import React from "react";
import "./Loader.css";
import { FiLoader } from "react-icons/fi";

const Loader = () => {
  return (
    <main className="loader">
      <FiLoader className="loaderIcon" />
    </main>
  );
};

export default Loader;
