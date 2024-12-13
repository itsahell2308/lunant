import React from "react";
import { useSelector } from "react-redux";

const Heading = () => {
  const { heading } = useSelector((state) => state.ui);
  return (
    <div className="page-title-box d-md-flex justify-content-md-between align-items-center w-100">
      <h4 className="page-title">{heading || "Dashboard"}</h4>
    </div>
  );
};

export default Heading;
