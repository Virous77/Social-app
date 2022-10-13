import React from "react";
import Masnoary from "./Masnoary";
import "../../styles/RelatedPost.css";

const RelatedPost = ({ pins }) => {
  return (
    <section className="relatedPostBar">
      <div className="relatedHead">
        <h1>Related More Post</h1>

        <div className="realatedPost">
          {pins?.length > 0 ? (
            <article className="">
              <Masnoary pins={pins} />
            </article>
          ) : (
            <p>There is no related post!</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default RelatedPost;
