import React from "react";
import { FcGoogle } from "react-icons/fc";
import { BsGoogle } from "react-icons/bs";
import "../../styles/Login.css";
import { motion } from "framer-motion";
import { useUserContext } from "../../store/userContext";
import { Link } from "react-router-dom";

const Login = () => {
  const { loginUser } = useUserContext();

  return (
    <section className="loginSection">
      <main className="overlay">
        <motion.div
          className="loginBar"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="google">
            <FcGoogle className="mainIcon" />
          </div>
          <div className="loginButton">
            <button onClick={loginUser}>
              <span>
                <BsGoogle />
              </span>
              Login with Google
            </button>
          </div>
        </motion.div>

        <div className="aboutPage">
          <Link to="/about">About</Link>
        </div>
      </main>
    </section>
  );
};

export default Login;
