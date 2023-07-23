import React from "react";

const Backdrop = (props) => {
  const hideModalHandler = () => {
    props.onHideModal();
  };
  return (
    <div className="modal-backdrop fade show" onClick={hideModalHandler}>
      Modal Backdrop
    </div>
  );
};

export default Backdrop;
