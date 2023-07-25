import React from "react";
import ReactDOM from "react-dom";
import Backdrop from "../Backdrop";

const VideoModal = (props) => {
  const hideVideoModal = () => {
    props.onHideModal();
  };
  const Modal = () => {
    return (
      <div className="modal modal-lg d-block opacity-100 pointer-none" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={hideVideoModal}></button>
            </div>
            <div className="modal-body">{props.children}</div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      {ReactDOM.createPortal(<Modal />, document.getElementById("modal-root"))}
      {ReactDOM.createPortal(<Backdrop onHideModal={hideVideoModal} />, document.getElementById("backdrop-root"))}
    </>
  );
};

export default React.memo(VideoModal);
