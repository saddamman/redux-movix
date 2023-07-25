import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Img from "../../components/lazyLoadImg/Img";
// import ContentWrapper from "../../hoc/ContentWrapper";

const Banner = () => {
  const [backGround, setBackground] = useState("");
  const [query, setQuery] = useState();
  const navigate = useNavigate();
  const { data, isLoading } = useFetch("/movie/upcoming");
  const url = useSelector((state) => state.home.url);

  useEffect(() => {
    let bgImg = url.backdrop + data?.results[Math.floor(Math.random() * data?.results?.length)]?.backdrop_path;
    setBackground(bgImg);
  }, [data, url.backdrop]);

  const searhQuearyHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <>
      <div className="banner">
        {!isLoading && (
          <div className="banner__backdrop">
            <Img src={backGround} alt="Banner Images" className="banner__bg"></Img>
          </div>
        )}
        <div className="banner__content">
          <h1 className="banner__content__title">Welcome</h1>
          <p className="banner__content__description">Millions of movies, TV shows and people to discover. Explore now.</p>
          <div className="banner__content__search">
            <input
              type="text"
              name="serch"
              placeholder="Serach for movie and tv show..."
              onKeyUp={searhQuearyHandler}
              onChange={(event) => {
                setQuery(event.target.value);
              }}
            />
            <button>Search</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
