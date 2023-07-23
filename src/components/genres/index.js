import React from "react";
import { useSelector } from "react-redux";

const Genres = (props) => {
  // console.log(props.data);
  const { genres } = useSelector((state) => state.home);
  return (
    <>
      {props?.data.map((gen) => {
        if (!genres[gen]?.name) return true;
        return (
          <span className="badge text-bg-warning rounded-1 genres__item" key={genres[gen].id}>
            {genres[gen]?.name}
          </span>
        );
      })}
    </>
  );
};

export default Genres;
