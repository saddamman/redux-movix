import React from "react";

const Buttons = (props) => {
  // const classes = `btn ${props.className}`;
  return (
    <button type={props.type} className={`btn ${props.className}`} onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </button>
  );
};

export default Buttons;
