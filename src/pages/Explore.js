import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDataFromApi } from "../utils/api";
import Loader from "../components/ui/Loader";
import SliderCard from "../components/ui/SliderCard";
import Img from "../components/lazyLoadImg/Img";
import { useSelector } from "react-redux";
import Genres from "../components/genres";
import Circle from "../components/circle";
import dayjs from "dayjs";
import noposter from "../assets/no-poster.png";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";

import useFetch from "../hooks/useFetch";

let filters = {};

const sortbyData = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  {
    value: "primary_release_date.desc",
    label: "Release Date Descending",
  },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];

const Explore = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(true);
  const { mediaType } = useParams();
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const [genre, setGenre] = useState(null);
  const [sortby, setSortby] = useState(null);

  const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/discover/${mediaType}`, filters).then((res) => {
      setData(res);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    });
  };
  const fetchMoreData = () => {
    fetchDataFromApi(`/discover/${mediaType}?page=${pageNum}`, filters).then((res) => {
      if (data?.results) {
        setData({ ...data, results: [...data?.results, ...res?.results] });
      } else {
        setData(res);
      }
      setPageNum((prev) => prev + 1);
    });
  };

  useEffect(() => {
    filters = {};
    setData(null);
    setPageNum(1);
    setSortby(null);
    setGenre(null);
    const fetchInitialData = () => {
      setLoading(true);
      fetchDataFromApi(`/discover/${mediaType}`, filters).then((res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      });
    };
    fetchInitialData();
  }, [mediaType]);

  const onChange = (selectedItems, action) => {
    if (action.name === "sortby") {
      setSortby(selectedItems);
      if (action.action !== "clear") {
        filters.sort_by = selectedItems.value;
      } else {
        delete filters.sort_by;
      }
    }

    if (action.name === "genres") {
      setGenre(selectedItems);
      if (action.action !== "clear") {
        let genreId = selectedItems.map((g) => g.id);
        genreId = JSON.stringify(genreId).slice(1, -1);
        filters.with_genres = genreId;
      } else {
        delete filters.with_genres;
      }
    }

    setPageNum(1);
    fetchInitialData();
  };

  return (
    <div className="explorePage header__space">
      {loading && <Loader className="loader__resultPage" />}
      {!loading && (
        <>
          <div className="container">
            <div className="slider__title__section">
              <div className="slider__title__section">
                <h2 className="slider__title">Search result for '{mediaType}'</h2>
              </div>
              <div className="filter_header">
                <Select
                  isMulti
                  // defaultMenuIsOpen
                  closeMenuOnSelect={false}
                  name="genres"
                  value={genre}
                  options={genresData?.genres}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                  className="basic-multi-select customize-select genres-select"
                  classNamePrefix="select"
                  placeholder="Select genres"
                  onChange={onChange}
                />
                <Select
                  // defaultValue={colourOptions[0]}
                  // isDisabled={isDisabled}
                  // isLoading={isLoading}
                  // isClearable={isClearable}
                  // isRtl={isRtl}
                  name="sortby"
                  value={sortby}
                  options={sortbyData}
                  onChange={onChange}
                  isClearable={true}
                  placeholder="Sort by"
                  className="basic-single customize-select sort-select"
                  classNamePrefix="select"
                />
              </div>
            </div>
          </div>
          <div className="container">
            <InfiniteScroll
              dataLength={data?.results.length || []}
              next={fetchMoreData}
              comm
              hasMore={pageNum <= data?.total_pages}
              loader={<small className="text-white text-center d-block mt-3 mb-5">Loading...</small>}>
              <div className="row">
                {console.log(data)}
                {data?.results.map((item, index) => (
                  <div className="col-6 col-sm-4 col-md-3" key={index}>
                    <SliderCard className="slider__card remove-card-sapce">
                      <div className="slider__card__poster position-relative" onClick={() => navigate(`/${mediaType}/${item.id}`)}>
                        <Img
                          src={item?.poster_path != null ? url.poster + item.poster_path : noposter}
                          alt={item.title}
                          className="img-thumbnail h-100"
                        />
                        <div className="genres">
                          <Genres data={item.genre_ids} />
                        </div>
                      </div>
                      <div className="card__content move_top">
                        <Circle rating={item.vote_average.toFixed(1)} />
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

export default Explore;
