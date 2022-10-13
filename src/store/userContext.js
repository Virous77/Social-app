import {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useState,
} from "react";
import reducer from "./userReducer";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase.config";
import { client } from "../client";
import { userQuery } from "../Utils/data";

const UserContext = createContext();

//Get user-session data from localstorage
const localStorageData = () => {
  const userInfo =
    localStorage.getItem("socialApp") !== "undefined"
      ? JSON.parse(localStorage.getItem("socialApp"))
      : localStorage.clear();

  return userInfo;
};

const initialState = {
  user: localStorageData(),
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [users, setUsers] = useState(null);

  const navigate = useNavigate();

  //Login user
  const loginUser = async () => {
    const provider = new GoogleAuthProvider();

    const {
      user: { providerData },
    } = await signInWithPopup(auth, provider);

    dispatch({ type: "SET-USER", payload: providerData });
    localStorage.setItem("socialApp", JSON.stringify(providerData[0]));

    const { uid, displayName: name, photoURL: image } = providerData[0];

    const doc = {
      _id: uid,
      _type: "user",
      userName: name,
      image: image,
    };

    client.createIfNotExists(doc).then(() => {
      toast.success("SuccessFully Login");
      navigate("/");
      window.location.reload();
    });
  };

  //Logout user
  const logoutUser = async () => {
    await signOut(auth).then(() => {
      localStorage.clear();
      toast.success("You have Logout Succesfully");
      navigate("/login");
    });
  };

  //Fetching userData for validation

  useEffect(() => {
    const query = userQuery(state.user?.uid);
    client.fetch(query).then((data) => {
      setUsers(data);
    });
  }, [state.user?.uid]);

  return (
    <UserContext.Provider value={{ ...state, loginUser, logoutUser, users }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
