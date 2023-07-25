import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import useFetch from "../../hooks/useFetch";
import CommanTab from "../../components/commanTab";
import MovieSlider from "../../components/movieSlider";
import SliderCard from "../../components/ui/SliderCard";
import Img from "../../components/lazyLoadImg/Img";
import Genres from "../../components/genres";
import Circle from "../../components/circle";
import noposter from "../../assets/no-poster.png";

const Populor = () => {
  const [endPoint, setEndPoint] = useState("tv");
  const { url } = useSelector((state) => state.home);
  const { data } = useFetch(`/${endPoint}/popular`);
  const navigate = useNavigate();

  // console.log(data);

  const onTabChangeHandler = (currantTab, index) => {
    let converToLower = currantTab.toLowerCase();
    setEndPoint(converToLower);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
    ],
  };
  return (
    <div className="trending">
      <div className="container">
        <div className="slider__title__section">
          <h2 className="slider__title">Populor</h2>
          <CommanTab data={["Tv", "Movie"]} onTabChange={onTabChangeHandler} />
        </div>

        <div className="comman__slider">
          <MovieSlider settings={settings}>
            {data?.results.map((item) => {
              return (
                <div key={item.id}>
                  <SliderCard className="slider__card">
                    <div className="slider__card__poster position-relative" onClick={() => navigate(`/${item.media_type || endPoint}/${item.id}`)}>
                      <Img
                        src={item?.poster_path != null ? url.poster + item.poster_path : noposter}
                        alt={item.title}
                        className="img-thumbnail h-100"
                      />
                      {/* <Img src={url.poster + item.poster_path} alt={item.title} className="img-thumbnail" />{" "} */}
                      <div className="genres">
                        <Genres data={item.genre_ids} />
                      </div>
                    </div>
                    <div className="card__content">
                      <Circle rating={item.vote_average.toFixed(1)} />
                      <h5 className="card__content__title">{item.title || item.name}</h5>
                      <div className="card__content__relaseDate">{dayjs(item.release_date).format("MMM D, YYYY")}</div>
                    </div>
                  </SliderCard>
                </div>
              );
            })}
          </MovieSlider>
          {/* // ) : (
          //   <div className="loadingSkeleton">
          //     {skItem()}
          //     {skItem()}
          //     {skItem()}
          //     {skItem()}
          //     {skItem()}
          //   </div>
          // )} */}
        </div>
      </div>
    </div>
  );
};

export default Populor;
