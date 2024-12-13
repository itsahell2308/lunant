import React, { memo } from "react";

const Image = ({ src, className, alt = "", height }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      height={height}
    />
  );
};

export default memo(Image);
