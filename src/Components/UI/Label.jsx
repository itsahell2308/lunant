import React, { memo } from "react";

const Label = ({ className, children, isRequired = false }) => {
  return (
    <label className={`${className}`}>
      {children}
      {isRequired ? <span className="text-danger">*</span> : ""}
    </label>
  );
};

export default memo(Label);
