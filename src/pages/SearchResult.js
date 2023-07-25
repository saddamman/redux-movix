import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDataFromApi } from "../utils/api";
import Loader from "../components/ui/Loader";
import SliderCard from "../components/ui/SliderCard";
import Img from "../components/lazyLoadImg/Img";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import noposter from "../assets/no-poster.png";
import InfiniteScroll from "react-infinite-scroll-component";

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(true);
  const { query } = useParams();
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();

  const fetchMoreData = () => {
    console.log(pageNum);

    console.log(data);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      if (data?.results) {
        setData({ ...data, results: [...data?.results, ...res?.results] });
      } else {
        setData(res);
      }
      setPageNum((prev) => prev + 1);
    });
  };

  useEffect(() => {
    setPageNum(1);
    const fetchInitialData = () => {
      setLoading(true);
      fetchDataFromApi(`/search/multi?query=${query}`).then((res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      });
    };
    fetchInitialData();
  }, [query]);

  return (
    <div className="search__resultPage header__space">
      {loading && <Loader className="loader__resultPage" />}
      {!loading && (
        <>
          <div className="container">
            <div className="slider__title__section">
              <h2 className="slider__title">Search result for '{query}'</h2>
            </div>
          </div>
          <div className="container">
            <InfiniteScroll
              dataLength={data?.results.length || []}
              next={fetchMoreData}
              hasMore={pageNum <= data?.total_pages}
              loader={<small className="text-white text-center d-block mt-3 mb-5">Loading...</small>}>
              <div className="row">
                {data?.results.map((item, index) => (
                  <div className="col-sm-2" key={index}>
                    <SliderCard className="slider__card remove-card-sapce">
                      <div className="slider__card__poster position-relative" onClick={() => navigate(`/${item.media_type}/${item.id}`)}>
                        <Img
                          src={item?.poster_path != null ? url.poster + item.poster_path : noposter}
                          alt={item.title}
                          className="img-thumbnail h-100"
                        />{" "}
                      </div>
                      <div className="card__content">
                        <h5 className="card__content__title">{item.title || item.name}</h5>
                        <div className="card__content__relaseDate">{dayjs(item.release_date).format("MMM D, YYYY")}</div>
                      </div>
                    </SliderCard>
                  </div>
                ))}
              </div>
            </InfiniteScroll>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchResult;
