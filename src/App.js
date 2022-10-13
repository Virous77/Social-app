import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import { useUserContext } from "./store/userContext";

function App() {
  const { user } = useUserContext();
  return (
    <section className="App">
      <Routes>
        <Route path={user ? "login" : "/"} element={<LoginPage />} />
        <Route path="/*" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <ToastContainer style={{ marginTop: "7rem" }} />
    </section>
  );
}

export default App;
