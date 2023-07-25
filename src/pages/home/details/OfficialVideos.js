import React, { useState } from "react";
import Img from "../../../components/lazyLoadImg/Img";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import VideoModal from "../../../components/ui/modal/videoModal";

const OfficialVideo = ({ video }) => {
  const [showModal, setShowModal] = useState(false);
  const [videoData, setVideoData] = useState({});

  const showVideoHandler = (currantVideo, title) => {
    setVideoData({
      videoKey: currantVideo,
      videoTitle: title,
    });
    setShowModal(true);
  };

  const hideModalHandler = () => {
    setShowModal(false);
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
                  onClick={() => {
                    showVideoHandler(c?.key);
                  }}>
                  <FontAwesomeIcon icon={faPlay} />
                  <small className="ps-2 py-1 px-1 ">Watch Trailer</small>
                </button>
              </div>
              <div className="officailVideo__block__details">
                <h4 className="fw-semibold text-white ">{c?.name}</h4>
              </div>
            </div>
          ))}
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
              src={`https://www.youtube.com/embed/${videoData.videoKey}`}
              // frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={videoData.title}
            />
          </div>
        </VideoModal>
      )}
    </div>
  );
};

export default React.memo(OfficialVideo);
