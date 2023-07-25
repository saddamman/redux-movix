import React from "react";

const Loader = ({ className }) => {
  return (
    <div className={`loader ${className}`}>
      <div className={`spinner-border text-white `} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
