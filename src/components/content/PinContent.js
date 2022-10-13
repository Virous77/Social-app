import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { IoCloudDownload, IoArrowRedo } from "react-icons/io5";
import { AiTwotoneDelete } from "react-icons/ai";
import { client, urlFor } from "../../client";
import { useUserContext } from "../../store/userContext";
import "../../styles/Pin.css";
import Loader from "../UI/Loader";

const PinContent = ({ pin, isLoading, setIsLoading }) => {
  const { user } = useUserContext();
  const { _id, destination, image, save, postedBy } = pin;

  const navigate = useNavigate();

  const alreadySaved = !!save?.filter(
    (item) => item.postedBy?._id === user?.uid
  )?.length;

  const savePin = async (id) => {
    setIsLoading(true);
    if (!alreadySaved) {
      await client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: user?.uid,
            postedBy: {
              _type: "postedBy",
              _ref: user?.uid,
            },
          },
        ])
        .commit()
        .then(() => {
          setIsLoading(false);
          window.location.reload();
        });
    }
  };

  const deletePost = async (id) => {
    setIsLoading(true);
    await client.delete(id).then(() => {
      setIsLoading(false);
      window.location.reload();
    });
  };

  useEffect(() => {}, [savePin, deletePost, save, _id, pin]);

  if (isLoading) return <Loader />;

  return (
    <section className="pinContentSection">
      <div className="pinImage">
        <img
          src={urlFor(image)}
          alt=""
          onClick={() => navigate(`/pin-detail/${_id}`)}
          referrerpolicy="no-referrer"
        />

        <div className="cloud">
          <a href={`${image?.asset?.url}?dl`} download>
            <IoCloudDownload className="cloudIcon" />
          </a>
        </div>

        <div className="save">
          {alreadySaved ? (
            <button type="button">
              <span>{save?.length}</span> Saved
            </button>
          ) : (
            <button type="button" onClick={(e) => savePin(_id)}>
              Save
            </button>
          )}
        </div>

        {destination && (
          <div className="arrow">
            <a href={destination} target="_blank" rel="norefferer">
              <IoArrowRedo className="arrowIcon" />
              {destination.length > 15
                ? `${destination.slice(0, 15)}...`
                : destination}
            </a>
          </div>
        )}

        {postedBy?._id === user?.uid && (
          <div className="delete" onClick={() => deletePost(_id)}>
            <AiTwotoneDelete className="deleteIcon" />
          </div>
        )}
      </div>
      <div className="user">
        <div className="userPostImage">
          <Link to={`user-profile/${postedBy?._id}`}>
            <img
              src={postedBy?.image}
              alt={postedBy?.userName}
              referrerpolicy="no-referrer"
            />
          </Link>
        </div>

        <div className="userPostName">
          <h2>{postedBy?.userName}</h2>
        </div>
      </div>
    </section>
  );
};

export default PinContent;
