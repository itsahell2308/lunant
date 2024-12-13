import React, { memo } from "react";

const Error = ({ className, children }) => {
  return <span className={`text-danger ${className}`}>{children}</span>;
};

export default memo(Error);
