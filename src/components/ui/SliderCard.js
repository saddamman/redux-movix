import React from "react";

const SliderCard = (props) => {
  return (
    <div className={`card ${props.className} h-100`}>
      <div className="card-body h-100">{props.children}</div>
    </div>
  );
};

export default SliderCard;
