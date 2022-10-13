import React, { useState, useEffect } from "react";
import { IoCloudDownload, IoArrowRedo, IoSend } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import Loader from "../UI/Loader";
import { usePinDetail } from "../../store/pinDetailContext";
import { useUserContext } from "../../store/userContext";
import "../../styles/PinDetails.css";
import { urlFor } from "../../client";
import { HiDotsVertical } from "react-icons/hi";
import { MdOutlineCancel } from "react-icons/md";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { client } from "../../client";
import { v4 as uuidv4 } from "uuid";
import { pinDetailQuery, pinDetailMorePinQuery } from "../../Utils/data";
import RelatedPost from "./RelatedPost";

const PinDetails = () => {
  const { pins, setComment, setPinDetail, setPins, pinDetail, comment } =
    usePinDetail();

  const [view, setView] = useState(false);
  const { user } = useUserContext();
  const { pinId } = useParams();

  const fetchPinDetails = () => {
    let query = pinDetailQuery(pinId);

    if (query) {
      client.fetch(query).then((data) => {
        setPinDetail(data[0]);

        if (data[0]) {
          query = pinDetailMorePinQuery(data[0]);
          client.fetch(query).then((res) => {
            setPins(res);
          });
        }
      });
    }
  };

  const postComment = (e) => {
    e.preventDefault();

    if (!comment) {
      toast.error("Please Enter a comment first..");
    }

    if (comment) {
      client
        .patch(pinId)
        .setIfMissing({ comment: [] })
        .insert("after", `comment[-1]`, [
          {
            comment,
            _key: uuidv4(),
            postedBy: {
              _type: "postedBy",
              _ref: user?.uid,
            },
          },
        ])
        .commit()
        .then(() => {
          fetchPinDetails();
          setComment("");
          toast.success("Comment posted!.");
        })
        .catch((err) => {
          toast.error("Error, Try again");
        });
    }
  };

  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

  if (!pinDetail) return <Loader />;

  return (
    <>
      <section className="pinDetailsBar">
        <div className="pinDetailImg">
          <img
            referrerpolicy="no-referrer"
            src={urlFor(pinDetail?.image.asset.url)}
            alt={pinDetail?.title}
            onClick={() => setView(false)}
          />

          <div className="viewMode">
            {!view ? (
              <HiDotsVertical
                className="viewIcon"
                onClick={() => setView(true)}
              />
            ) : (
              <MdOutlineCancel
                className="viewIcon"
                onClick={() => setView(false)}
              />
            )}
          </div>

          {view && (
            <motion.div
              className="pinImgLinks"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="pinDetailShare">
                <a
                  href={pinDetail?.destination}
                  target="_blank"
                  rel="norefferer"
                >
                  <IoArrowRedo className="pinShareIcon" />
                  {pinDetail?.destination.length > 15
                    ? `${pinDetail?.destination.slice(0, 15)}...`
                    : pinDetail?.destination}
                </a>
              </div>

              <div className="downloadPin">
                <a href={`${pinDetail?.image.asset.url}?dl`} download>
                  <IoCloudDownload className="pinDetailCloudIcon" />
                  <p>Download</p>
                </a>
              </div>
            </motion.div>
          )}
        </div>

        <div className="pinDeatilsInfo">
          <div className="pinDetailTitleHead">
            <h1>{pinDetail?.title}</h1>
            <p>{pinDetail?.about}</p>
          </div>

          <div className="pinPostedUser">
            <Link to={`user-profile/${pinDetail?.postedBy._id}`}>
              <img
                referrerpolicy="no-referrer"
                src={pinDetail?.postedBy.image}
                alt={pinDetail?.postedBy.userName}
              />
              <h2>{pinDetail?.postedBy.userName}</h2>
            </Link>
          </div>

          <div className="commentPin">
            <h3>Comments</h3>

            <div className="commentSection">
              {pinDetail?.comment?.map((commen, idx) => (
                <li key={idx} className="commentsList">
                  <div className="commentUserProfile">
                    <img
                      src={commen.postedBy.image}
                      referrerpolicy="no-referrer"
                    />
                  </div>

                  <div className="userComment">
                    <h4>{commen.postedBy.userName}</h4>
                    <p>{commen.comment}</p>
                  </div>
                </li>
              ))}
            </div>
          </div>

          <div className="commentPost">
            <div className="commentWrite">
              <Link to={`user-profile/${user?.uid}`}>
                <img
                  src={user?.photoURL}
                  alt={user?.displayName}
                  referrerpolicy="no-referrer"
                />
              </Link>
              <form onSubmit={postComment}>
                <input
                  type="text"
                  className="comment"
                  placeholder="Add a comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button>
                  <IoSend className="sendPinIcon" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <RelatedPost pins={pins} />
    </>
  );
};

export default PinDetails;
