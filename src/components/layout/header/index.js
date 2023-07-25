import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";

import logo from "../../../assets/movix-logo.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
const Header = () => {
  const [isHeaderShow, setHeaderShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const inputRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setHeaderShow("top");
  }, [location]);

  useEffect(() => {
    if (showSearch) {
      inputRef.current?.focus();
    }
  }, [showSearch]);

  const onScroll = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY) setHeaderShow("hide");
      else {
        setHeaderShow("top");
      }
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [lastScrollY]);

  const showSearchHandler = () => {
    setShowSearch(true);
  };
  const hideSearchHandler = () => {
    setShowSearch(false);
  };

  const queryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1500);
    }
  };

  const navigateHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }
  };

  const headerClasses = isHeaderShow === "hide" ? "hide" : "top";
  return (
    <header className={`header ${headerClasses}`}>
      <div className="container">
        <nav className="header__nav">
          <div className="header__nav__left">
            <Link to="/">
              <img src={logo} alt="LOGO" />
            </Link>
          </div>
          <div className="header__nav__right">
            <ul className="menu">
              <li
                onClick={() => {
                  navigateHandler("movie");
                }}>
                Movie
              </li>
              <li
                onClick={() => {
                  navigateHandler("tv");
                }}>
                TV Shows
              </li>
            </ul>
            <button className="search-button" onClick={showSearchHandler}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </nav>
      </div>
      {showSearch && (
        <div className="header__searchBar">
          <div className="container">
            <div className="header__searchBar__content">
              <input
                type="text"
                placeholder="Search Moview or tv Show..."
                ref={inputRef}
                onChange={(event) => {
                  setQuery(event.target.value);
                }}
                onKeyDown={queryHandler}
              />
              <button onClick={hideSearchHandler}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
