import React, { useEffect, useState } from "react";
import CommanTab from "../../components/commanTab";
import useFetch from "../../hooks/useFetch";

const Trending = () => {
  const [endPoint, setEndPoint] = useState("day");
  const { data, isLoading, error } = useFetch(`/trending/all/${endPoint}`);
  const onTabChangeHandler = (currantTab, index) => {
    console.log(currantTab, index);
    setEndPoint(currantTab);
  };

  console.log(data);

  return (
    <div className="trending">
      <div className="container">
        <div className="slider__title__section">
          <h2 className="slider__title">Trending</h2>
          <CommanTab data={["day", "week"]} onTabChange={onTabChangeHandler} />
        </div>

        <div className="tabone">Tab one data</div>
        <div className="tabone">Tab two data</div>
      </div>
    </div>
  );
};

export default Trending;
