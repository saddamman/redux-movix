import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Circle = ({ rating }) => {
  return (
    <div className="rating__cricle">
      <CircularProgressbar
        value={rating}
        text={rating}
        maxValue={10}
        styles={buildStyles({
          // Rotation of path and trail, in number of turns (0-1)
          //   rotation: 0.25,

          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
          //   strokeLinecap: "butt",

          // Text size
          //   textSize: "20px",

          // How long animation takes to go from one percentage to another, in seconds
          //   pathTransitionDuration: 0.5,

          // Can specify path transition in more detail, or remove it entirely
          // pathTransition: 'none',

          // Colors
          strokeWidth: 4,
          pathColor: rating < 5 ? "red" : rating < 7 ? "orange" : "green",
          //   textColor: "#f88",
          //   trailColor: "#d6d6d6",
          backgroundColor: "#3e98c7",
        })}
      />
    </div>
  );
};

export default Circle;
