import React, { useState, useEffect } from "react";
import "../../styles/UserProfile.css";
import { AiOutlineLogout } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useUserContext } from "../../store/userContext";

import {
  userSavedPinsQuery,
  userQuery,
  userCreatedPinsQuery,
} from "../../Utils/data";
import { client } from "../../client";
import Masnoary from "./Masnoary";

import Loader from "../UI/Loader";

const randomImage =
  "https://source.unsplash.com/1600x900/?nature,photograpy,technology";

const UserProfile = () => {
  const [You, setYou] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("Created");
  const { userId } = useParams();

  const { logoutUser } = useUserContext();

  useEffect(() => {
    const query = userQuery(userId);
    client.fetch(query).then((data) => {
      setYou(data[0]);
    });
  }, [text, userId, activeBtn]);

  useEffect(() => {
    if (text === "Created") {
      const created = userCreatedPinsQuery(userId);
      client.fetch(created).then((data) => {
        setPins(data);
      });
    } else {
      const savedPin = userSavedPinsQuery(userId);
      client.fetch(savedPin).then((data) => {
        setPins(data);
      });
    }
  }, [text, userId, activeBtn]);

  if (!You) {
    return <Loader />;
  }

  return (
    <section className="userProfileBar">
      <div className="userHome">
        <div className="userBanner">
          <img src={randomImage} alt="" />
          <div className="userHomeProfile">
            <img src={You?.image} alt="" referrerpolicy="no-referrer" />

            <h2>{You?.userName}</h2>
          </div>

          <div className="userLogout">
            <button type="button" onClick={logoutUser}>
              <AiOutlineLogout className="userLogoutIcon" />
            </button>
          </div>
        </div>

        <div className="userHomeButtons">
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn("Created");
            }}
            className={
              activeBtn === "Created" ? "activeButton" : "nonActiveButton"
            }
          >
            Created
          </button>

          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn("Saved");
            }}
            className={
              activeBtn === "Saved" ? "activeButton" : "nonActiveButton"
            }
          >
            Saved
          </button>
        </div>

        <div className="displayUserPin">
          {pins?.length ? <Masnoary pins={pins} /> : <p>No Post Found</p>}
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
