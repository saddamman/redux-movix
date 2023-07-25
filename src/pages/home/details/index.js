import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import DetailsBanner from "./bannerDetails";
import TopCast from "./TopCast";
import OfficialVideos from "./OfficialVideos";
import SimilarCarousel from "./SimilarCarousel";
import Recommendations from "./Recommendations";

const Details = () => {
  const { mediaType, id } = useParams();
  console.log(mediaType, id);
  const { data: video } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits } = useFetch(`/${mediaType}/${id}/credits`);
  const { data: similar } = useFetch(`/${mediaType}/${id}/similar`);
  const { data: recommendations } = useFetch(`/${mediaType}/${id}/recommendations`);

  return (
    <div>
      <DetailsBanner video={video?.results?.[0]} crew={credits?.crew} />
      {!!credits?.cast?.length > 0 && <TopCast cast={credits?.cast} />}
      {!!video?.results?.length > 0 && <OfficialVideos video={video?.results} />}
      {!!similar?.results?.length > 0 && <SimilarCarousel similar={similar} />}
      {!!recommendations?.results?.length > 0 && <Recommendations recommendations={recommendations} />}
    </div>
  );
};

export default React.memo(Details);
