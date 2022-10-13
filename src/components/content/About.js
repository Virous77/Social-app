import React from "react";
import team from "../../Images/4380.jpg";
import "../../styles/About.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="aboutSocial">
      <section className="aboutSection">
        <img src={team} alt="team" />

        <div className="aboutInfo">
          <h1>Social</h1>

          <div className="aboutMsg">
            <p>
              Social is inspired project..a place where friends can do share all
              the events.{" "}
            </p>
            <p className="aboutQuote">
              There is immense power when a group of people with similar
              interests gets together to work toward the same goals
            </p>

            <div className="link">
              <Link to="/">Login Page</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
