import React, { memo } from "react";

import Button from "./Button";

const SubHeading = ({ subTitle = "", isAddBtn = true, handleShowHide }) => {
  return (
    <>
      <div className="card-header my-1">
        <div className="row align-items-center m-0 p-0">
          <div className="col-auto m-0 p-0">
            <h4 className="card-title">{subTitle}</h4>
          </div>
          {isAddBtn && (
            <div className="col-auto ms-auto m-0 p-0">
              <Button
                icon="FaPlus"
                className="btn btn-primary"
                onClick={handleShowHide}
              >
                Add <></>
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default memo(SubHeading);
