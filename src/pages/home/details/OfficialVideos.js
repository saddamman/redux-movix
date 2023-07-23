import React from "react";
import Img from "../../../components/lazyLoadImg/Img";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { showVideoModal } from "../../../store/home-slice";
import VideoModal from "../../../components/ui/modal/videoModal";

const OfficialVideo = ({ video }) => {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);
  const { isModalShow } = useSelector((state) => state.home);

  const showOfficalHandler = () => {
    dispatch(showVideoModal(true));
  };
  return (
    <div className="officailVideo__section mt-4">
      <div className="container">
        <h2 className="slider__title mb-3">Official Videos</h2>
        <div className="row">
          {video.slice(0, 4).map((c) => (
            <div className="col-sm-6 col-md-4 col-lg-3 officailVideo__block " key={c.id}>
              <div className="position-relative">
                <Img
                  src={`https://i3.ytimg.com/vi/${c.key}/maxresdefault.jpg`}
                  alt={c.name}
                  className="img-thumbnail officailVideo__block__profile"
                />
                <button
                  className="btn btn btn-outline-light position-absolute top-50 start-50 translate-middle watch__btn"
                  onClick={showOfficalHandler}>
                  <FontAwesomeIcon icon={faPlay} />
                  <small className="ps-2 py-1 px-1 ">Watch Trailer</small>
                </button>
              </div>
              <div className="officailVideo__block__details">
                <h4 className="fw-semibold text-white ">{c?.name}</h4>
              </div>

              {isModalShow && (
                <VideoModal>
                  {console.log("BannerDetaile")}
                  <div className="video-responsive ratio ratio-16x9">
                    <iframe
                      // width="853"
                      // height="480"
                      loading="lazy"
                      src={`https://www.youtube.com/embed/${c.key}`}
                      // frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={c?.name}
                    />
                  </div>
                </VideoModal>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(OfficialVideo);
