import React from "react";
import Banner from "./Banner";
import Trending from "./Trending";
import Populor from "./Populor";
import TopRated from "./TopRated";

const Home = () => {
  return (
    <div>
      <Banner />
      <Trending />
      <Populor />
      <TopRated />
    </div>
  );
};

export default Home;
