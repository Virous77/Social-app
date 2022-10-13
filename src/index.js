import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./store/userContext";
import { AnimatePresence } from "framer-motion";
import { CreatePinProvider } from "./store/createPinContext";
import { PinDetailProvider } from "./store/pinDetailContext";
import { SearchContextProvider } from "./store/searchContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AnimatePresence>
        <UserProvider>
          <CreatePinProvider>
            <PinDetailProvider>
              <SearchContextProvider>
                <App />
              </SearchContextProvider>
            </PinDetailProvider>
          </CreatePinProvider>
        </UserProvider>
      </AnimatePresence>
    </BrowserRouter>
  </React.StrictMode>
);
