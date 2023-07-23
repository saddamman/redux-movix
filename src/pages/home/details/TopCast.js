import React from "react";
import Img from "../../../components/lazyLoadImg/Img";
import { useSelector } from "react-redux";
import noposter from "../../../assets/no-poster.png";

const TopCast = ({ cast }) => {
  const { url } = useSelector((state) => state.home);
  console.log(url);
  return (
    <div className="cast__section">
      <div className="container">
        <h2 className="slider__title mb-3">Top Cast</h2>
        <div className="row">
          {cast &&
            cast.slice(0, 6).map((c) => (
              <div className=" col-6 col-sm-3 col-lg-2 cast__block" key={c.id}>
                <Img src={c?.profile_path !== null ? url.profile + c.profile_path : noposter} alt={c.title} className="img-thumbnail" />{" "}
                {/* <Img src={url.profile + `/${c.profile_path}`} alt={c.name} className="img-thumbnail cast__block__profile" /> */}
                <div className="cast__block__details">
                  <h4 className="fw-semibold text-white ">{c?.original_name}</h4>
                  <h5 className="light-text fst-italic fw-semibold">{c?.character}</h5>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(TopCast);
