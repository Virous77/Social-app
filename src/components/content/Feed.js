import React, { useState, useEffect } from "react";
import "../../styles/Feed.css";
import { useParams } from "react-router-dom";
import Loader from "../UI/Loader";
import notFound from "../../Images/notfound.jpg";
import Masnoary from "./Masnoary";
import { searchQuery, feedQuery } from "../../Utils/data";
import { client } from "../../client";

const Feed = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pins, setpins] = useState(null);

  const { categoryId } = useParams();

  useEffect(() => {
    setIsLoading(true);

    if (categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setpins(data);
        setIsLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setpins(data);
        setIsLoading(false);
      });
    }
  }, [categoryId]);

  //Return
  if (isLoading) return <Loader />;

  if (!pins?.length) {
    return (
      <div
        className="empty
    "
      >
        <img src={notFound} alt="Empty Feed" />
        <p>Feed is Empty!</p>
      </div>
    );
  }

  return (
    <section className="feedBar">
      {pins && (
        <Masnoary
          pins={pins}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
    </section>
  );
};

export default Feed;
