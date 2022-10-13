import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../client";
import { toast } from "react-toastify";
import { useUserContext } from "./userContext";

const CreatePinContext = createContext();

export const CreatePinProvider = ({ children }) => {
  const [about, setAbout] = useState("");
  const [title, setTitle] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [imageAsset, setImageAsset] = useState(null);
  const [wrongImageTypes, setWrongImageTypes] = useState(null);

  const { user } = useUserContext();
  const navigate = useNavigate();

  //Post pin
  const submitPin = (e) => {
    e.preventDefault();

    setLoading(true);
    if (title && about && category && destination && imageAsset?._id) {
      const doc = {
        _type: "pin",
        title,
        about,
        destination,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset?._id,
          },
        },

        userId: user?.uid,
        postedBy: {
          _type: "postedBy",
          _ref: user?.uid,
        },
        category,
      };

      client
        .create(doc)
        .then(() => {
          setLoading(false);
          navigate("/");
          toast.success("Posted successfully");
        })
        .catch((err) => {
          toast.error("Seomthing went wrong, Try again");
          setLoading(false);
        });
    } else {
      toast.error("Fill all the Fields..");
    }

    setTitle("");
    setAbout("");
    setCategory("");
    setDestination("");
    setImageAsset(null);
  };

  //Upload Image
  const uploadImage = (e) => {
    const { type, name } = e.target?.files[0];

    if (
      type === "image/png" ||
      type === "image/jpg" ||
      type === "image/svg" ||
      type === "image/gif" ||
      type === "image/jpeg" ||
      type === "image/tiff"
    ) {
      setWrongImageTypes(false);
      setLoading(true);
      client.assets
        .upload("image", e.target.files[0], {
          contentType: type,
          filename: name,
        })
        .then((doc) => {
          setImageAsset(doc);
          setLoading(false);
        })
        .catch((err) => {
          toast.error("Image upload failed...try again");
          setLoading(false);
        });
    } else {
      setWrongImageTypes(true);
    }
  };

  //Delete Uploaded Image
  const deleteUploadImage = () => {
    setImageAsset(null);
  };

  return (
    <CreatePinContext.Provider
      value={{
        about,
        setAbout,
        title,
        setTitle,
        destination,
        setDestination,
        loading,
        setLoading,
        category,
        setCategory,
        imageAsset,
        setImageAsset,
        wrongImageTypes,
        setWrongImageTypes,
        submitPin,
        uploadImage,
        deleteUploadImage,
      }}
    >
      {children}
    </CreatePinContext.Provider>
  );
};

export const useCreatePinContext = () => useContext(CreatePinContext);
