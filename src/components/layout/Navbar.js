import React, { useState, useRef } from "react";
import "../../styles/Navbar.css";
import { useUserContext } from "../../store/userContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { RiHome7Fill } from "react-icons/ri";
import { BiSearchAlt, BiChevronRight, BiChevronLeft } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
import { categories } from "../../Utils/data";
import { useSearchContext } from "../../store/searchContext";

const Navbar = () => {
  const { user } = useUserContext();
  const [searchIcon, setSearchIcon] = useState(false);
  const { search, setSearch } = useSearchContext();

  const scrollRef = useRef();
  const navigate = useNavigate();

  const setScrollLeft = (id) => {
    id === "right"
      ? (scrollRef.current.scrollLeft += 200)
      : (scrollRef.current.scrollLeft -= 200);
  };

  return (
    <>
      <header className="header">
        <nav>
          <div className="logo">
            <NavLink to="/">
              <h1>Social</h1>
            </NavLink>
          </div>

          <div className="searchBar">
            {searchIcon && <BiSearchAlt className="searchIcon" />}
            <input
              type="search"
              placeholder="Search"
              onFocus={() => {
                setSearchIcon(true);
                navigate("/search");
              }}
              onBlur={() => {
                setSearchIcon(false);
                navigate("/");
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="submitPhoto">
            <Link to="/create-pin">
              <div htmlFor="submitPhoto">Submit Photo</div>
            </Link>

            <Link to="/create-pin">
              <p className="plusIcon">
                <BsPlus className="plusIcons" />
              </p>
            </Link>
          </div>

          <Link to={`user-profile/${user?.uid}`}>
            <div className="userProfile">
              <img
                src={user.photoURL}
                alt={user?.displayName}
                referrerpolicy="no-referrer"
              />
            </div>
          </Link>
        </nav>

        <div className="category">
          <div className="home">
            <NavLink to="/">
              <RiHome7Fill className="homeIcon" />
            </NavLink>

            <div className="line"></div>
          </div>

          <div className="navLinks">
            <div>
              <BiChevronLeft
                className="leftIcon"
                onClick={() => setScrollLeft("left")}
              />
            </div>
            <div className="categoriesContent" ref={scrollRef}>
              {categories
                .slice(0, categories.length - 1)
                .map((category, idx) => (
                  <NavLink to={`category/${category.name}`} key={idx}>
                    {category.name}
                  </NavLink>
                ))}
            </div>
            <div>
              <BiChevronRight
                className="rightIcon"
                onClick={() => setScrollLeft("right")}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
