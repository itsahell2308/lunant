import React, { memo } from "react";
import Icon from "../../assets/icons/Icon";

const Button = ({
  className,
  children,
  btnName = "",
  icon = null,
  type = "",
  isDisabled = false,
  onClick,
  isHidden = false,
  id = "",
}) => {
  return (
    <button
      className={`btn ${className}`}
      type={type}
      disabled={isDisabled}
      style={{ cursor: isDisabled ? "not-allowed" : "pointer" }}
      onClick={onClick}
      hidden={isHidden}
      id={id}
    >
      {children}
      {icon ? <Icon name={icon} /> : null}
    </button>
  );
};

export default memo(Button);
