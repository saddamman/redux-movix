import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import DetailsBanner from "./bannerDetails";
import TopCast from "./TopCast";
import OfficialVideos from "./OfficialVideos";
import SimilarCarousel from "./SimilarCarousel";

const Details = () => {
  const { mediaType, id } = useParams();
  const { data: video, isLoading: isVideoLoadin, error: videError } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, isLoading: creaditLoding, error: creditError } = useFetch(`/${mediaType}/${id}/credits`);
  const { data: similar, isLoading: similarLoding, error: similarError } = useFetch(`/${mediaType}/${id}/similar`);

  return (
    <div>
      <DetailsBanner video={video?.results?.[0]} crew={credits?.crew} />
      {!!credits?.cast?.length > 0 && <TopCast cast={credits?.cast} />}
      {!!video?.results?.length > 0 && <OfficialVideos video={video?.results} />}
      <SimilarCarousel similar={similar} />
    </div>
  );
};

export default Details;
