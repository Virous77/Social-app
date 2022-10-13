import React from "react";
import { useSearchContext } from "../../store/searchContext";

import Loader from "../UI/Loader";
import Masnoary from "./Masnoary";
import "../../styles/Search.css";
import notFound from "../../Images/notfound.jpg";

const Search = () => {
  const { pins, loading } = useSearchContext();

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="searchPage">
      {pins?.length !== 0 ? (
        <Masnoary pins={pins} />
      ) : (
        <div className="notFoundSearch">
          <p>Search not found</p>
          <img src={notFound} alt="notfound" />
        </div>
      )}
    </section>
  );
};

export default Search;
