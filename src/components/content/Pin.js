import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Feed from "./Feed";
import PinDetails from "./PinDetails";
import CreatePin from "./CreatePin";
import Search from "./Search";
import UserProfile from "./UserProfile";

const Pin = () => {
  const [search, setSearch] = useState("");

  return (
    <section className="pin">
      <div>
        <Navbar search={search} setSearch={setSearch} />
      </div>
      <Routes>
        <Route path="/*" element={<Feed />} />
        <Route path="/user-profile/:userId" element={<UserProfile />} />
        <Route path="/category/:categoryId" element={<Feed />} />
        <Route path="/pin-detail/:pinId" element={<PinDetails />} />
        <Route path="/create-pin" element={<CreatePin />} />
        <Route
          path="/search"
          element={<Search search={search} setSearch={setSearch} />}
        />
      </Routes>
    </section>
  );
};

export default Pin;
