import React from "react";
import { BiCloudUpload } from "react-icons/bi";
import { MdDelete, MdDriveFileRenameOutline } from "react-icons/md";
import { GrContactInfo } from "react-icons/gr";
import { AiOutlineLink } from "react-icons/ai";
import ImageLoader from "../UI/ImageLoader";
import Loader from "../UI/Loader";
import { useUserContext } from "../../store/userContext";
import { categories } from "../../Utils/data";
import { useCreatePinContext } from "../../store/createPinContext";
import "../../styles/CreatePin.css";

const CreatePin = () => {
  const { user } = useUserContext();
  const {
    about,
    setAbout,
    title,
    setTitle,
    destination,
    setDestination,
    loading,
    category,
    setCategory,
    imageAsset,
    wrongImageTypes,
    submitPin,
    uploadImage,
    deleteUploadImage,
  } = useCreatePinContext();

  if (loading) return <Loader />;

  return (
    <section className="pinBar">
      <div className="userPostActive">
        <h2>
          Welcome, <br /> {user?.displayName}
        </h2>

        <img
          src={user?.photoURL}
          alt={user?.displayName}
          referrerpolicy="no-referrer"
        />
      </div>

      <div className="formBar">
        <form onSubmit={submitPin}>
          {/* //Uplod Image Code/ */}
          <div className="pinCreateImage">
            {loading && <ImageLoader />}
            {!imageAsset && (
              <div>
                {!loading && <BiCloudUpload className="cloudPin" />}
                {wrongImageTypes && <span>Wrong image type</span>}
                <div className="linePin"></div>
                {!loading && <p>Upload Your Photo</p>}
              </div>
            )}

            {!imageAsset ? (
              <input type="file" onChange={uploadImage} />
            ) : (
              <div className="uploadedImage">
                <img src={imageAsset.url} alt="Image" className="viewMsg" />

                <button type="button" onClick={deleteUploadImage}>
                  <MdDelete className="deleteUploadImage" />
                </button>
              </div>
            )}
          </div>

          <div className="pinTitle">
            <MdDriveFileRenameOutline className="titleIcon" />
            <input
              type="text"
              placeholder="Enter Post Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="pinAbout">
            <GrContactInfo className="aboutIcon" />
            <input
              type="text"
              placeholder="About"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>

          <div className="pinDestination">
            <AiOutlineLink className="destinationIcon" />
            <input
              type="text"
              placeholder="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          <div className="pinCategory">
            <p className="categoryHead">Choose pin Category</p>
            <select
              name="category"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="other">Select Category</option>

              {categories?.map((category, idx) => (
                <option key={idx} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="submitButton">
            <button>Post</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreatePin;
