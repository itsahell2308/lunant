import React, { useState } from "react";
import CommonModal from "./CommonModal";
import { Button } from "../Components";

const ConfimationModal = ({ getValue, onStatusChange }) => {
  const [isShow, setIsShow] = useState(false); // Modal visibility state

  const handleShowHide = () => {
    setIsShow(!isShow);
  };

  const handleCheckboxChange = (e) => {
    e.target.blur();
    setIsShow(true);
  };

  return (
    <>
      <div className="form-check form-switch form-switch-success">
        <input
          className="form-check-input"
          type="checkbox"
          checked={getValue()}
          onChange={handleCheckboxChange}
        />
      </div>

      <CommonModal
        isShow={isShow}
        handleShowHide={handleShowHide}
        modalTitle="Change Status"
        isFooter={false}
      >
        <div className="row m-0 p-0">
          <div className="col-md-12 m-0 p-1">
            <h5 className="mb-1">Do you want to change?</h5>
          </div>
          <div className="col-md-12 m-0 p-1 d-flex align-items-center justify-content-end">
            <Button
              className="btn-outline-danger mx-2"
              onClick={() => handleShowHide()}
            >
              No
            </Button>
            <Button
              className="btn-primary"
              onClick={() => {
                onStatusChange(!getValue());
                handleShowHide();
              }}
            >
              Yes
            </Button>
          </div>
        </div>
      </CommonModal>
    </>
  );
};

export default ConfimationModal;
