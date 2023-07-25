import React, { useState } from "react";
import { useSelector } from "react-redux";
import useFetch from "../../../hooks/useFetch";
// import CommanTab from "../../components/commanTab";
import MovieSlider from "../../../components/movieSlider";
import SliderCard from "../../../components/ui/SliderCard";
import Img from "../../../components/lazyLoadImg/Img";
import Genres from "../../../components/genres";
import Circle from "../../../components/circle";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import noposter from "../../../assets/no-poster.png";

const Recommendations = ({ recommendations }) => {
  console.log(recommendations);
  const { mediaType, id } = useParams();

  const [endPoint, setEndPoint] = useState("tv");
  const { url } = useSelector((state) => state.home);
  // const { data, isLoading, error } = useFetch(`/${endPoint}/popular`);
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
    <div className="trending mt-4">
      <div className="container">
        <div className="slider__title__section">
          <h2 className="slider__title">{`Recommendations ${mediaType.toUpperCase()} `}</h2>
          {/* <CommanTab data={["Tv", "Movie"]} onTabChange={onTabChangeHandler} /> */}
        </div>

        <div className="comman__slider">
          <MovieSlider settings={settings}>
            {recommendations?.results.map((item) => {
              return (
                <div key={item.id}>
                  <SliderCard className="slider__card">
                    <div className="slider__card__poster position-relative" onClick={() => navigate(`/${mediaType}/${item.id}`)}>
                      <Img src={item?.poster_path !== null ? url.poster + item.poster_path : noposter} alt={item.title} className="img-thumbnail" />{" "}
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

export default Recommendations;
