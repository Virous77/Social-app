import React, { useRef, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import PinContentPage from "../../pages/PinContentPage";

const Home = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <section className="contentBar">
      <div className="content" ref={scrollRef}>
        <Routes>
          <Route path="/*" element={<PinContentPage />} />
        </Routes>
      </div>
    </section>
  );
};

export default Home;
