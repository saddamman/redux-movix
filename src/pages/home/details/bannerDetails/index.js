import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import useFetch from "../../../../hooks/useFetch";
import Img from "../../../../components/lazyLoadImg/Img";
import Genres from "../../../../components/genres";
import Circle from "../../../../components/circle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import VideoModal from "../../../../components/ui/modal/videoModal";

const DetailsBanner = ({ video, crew }) => {
  const { mediaType, id } = useParams();
  const { data, isLoading } = useFetch(`/${mediaType}/${id}`);
  const { url } = useSelector((state) => state.home);
  const [showModal, setShowModal] = useState(false);
  let genres = data?.genres.map((gen) => gen.id);
  const director = crew?.filter((dir) => dir.job === "Director");
  const writer = crew?.filter((f) => f.job === "Screenplay" || f.job === "Screenstory" || f.job === "Writer");

  const showVideoHandler = () => {
    setShowModal(true);
  };

  const hideModalHandler = () => {
    setShowModal(false);
  };

  const hourMin = () => {
    if (!!data) {
      let hour = parseInt((data?.runtime || data?.last_episode_to_air?.runtime) / 60);
      let min = (data?.runtime || data.last_episode_to_air?.runtime) % 60;
      return ` ${hour > 0 ? `${hour}h,` : ""} ${min}m`;
    }
  };

  return (
    <div className="detailsBanner__section">
      {!isLoading ? (
        <>
          {!!data && (
            <>
              <div className="banner__backdrop">
                <Img src={`${url.backdrop}${data?.backdrop_path}`} alt={data.title} className="banner__bg img-fluid" />
              </div>
              <div className="banner__backdrop__content">
                <div className=" container">
                  <div className="row">
                    <div className="col-lg-4">
                      <Img
                        src={`${url.poster}${data?.poster_path}`}
                        alt={data.title}
                        className="banner__backdrop__content__poster  img-fluid rounded pe-md-4 "
                      />
                    </div>
                    <div className="col-lg-8 text-white">
                      <div className="banner__backdrop__content__details">
                        <h2 className="detailsBanner_heading fw-semibold">
                          {data.name || data.title} <span className="releas__year">({dayjs(data.air_date).format("YYYY")})</span>
                        </h2>
                        <h4 className="detailsBanner_heading__sub fst-italic">{data.tagline}</h4>
                        <Genres data={genres} />
                        {video && (
                          <div className="rating__trailer d-flex align-items-center mt-4">
                            <Circle rating={data.vote_average.toFixed(1)} />
                            <button className="btn btn btn-outline-light ms-3" onClick={showVideoHandler}>
                              <FontAwesomeIcon icon={faPlay} />
                              <span className="ps-2">Watch Trailer</span>
                            </button>
                          </div>
                        )}

                        <div className="overview mt-3">
                          <h4 className="fw-700">Overview</h4>
                          <p>{data.overview}</p>
                        </div>

                        <ul className="list-group movie__info bg-transparent mt-3">
                          <li className="movie__info__item list-group-item bg-transparent text-white d-flex border-info-subtle">
                            <div className="movie__info__block me-3">
                              <span className="fw-semibold">Status:</span>
                              <span className="light-text ms-2">{data.status}</span>
                            </div>

                            <div className="movie__info__block me-3">
                              <span className="fw-semibold">Release Date:</span>
                              <span className="light-text ms-2">{dayjs(data.release_date).format("MMM M, YYYY")}</span>
                            </div>

                            <div className="movie__info__block me-3">
                              <span className="fw-semibold">Runtime:</span>
                              <span className="light-text ms-2">{hourMin()}</span>
                            </div>
                          </li>
                          {director?.length > 0 && (
                            <li className="movie__info__item list-group-item bg-transparent text-white d-flex border-info-subtle">
                              <div className="movie__info__block me-3">
                                <span className="fw-semibold">Director:</span>
                                {director?.map((item, i) => (
                                  <span className="light-text ms-2" key={i}>
                                    {item.name} {director.length - 1 !== i && ","}
                                  </span>
                                ))}
                              </div>
                            </li>
                          )}
                          {writer?.length > 0 && (
                            <li className="movie__info__item list-group-item bg-transparent text-white d-flex border-info-subtle">
                              <div className="movie__info__block me-3">
                                <span className="fw-semibold">Writer:</span>
                                {writer?.map((item, i) => (
                                  <span className="light-text ms-2" key={i}>
                                    {item.name} {writer.length - 1 !== i && ", "}
                                  </span>
                                ))}
                              </div>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {showModal && (
                <VideoModal onHideModal={hideModalHandler}>
                  {console.log("BannerDetaile")}
                  <div className="video-responsive ratio ratio-16x9">
                    <iframe
                      // width="853"
                      // height="480"
                      loading="lazy"
                      src={`https://www.youtube.com/embed/${video?.key}`}
                      // frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={video?.name}
                    />
                  </div>
                </VideoModal>
              )}
            </>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <div className="container">
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(DetailsBanner);
