import React from "react";
import Icon from "../../assets/icons/Icon";

const Loading = () => {
  return (
    <div className="spinner-box">
      <Icon name="CgSpinner" className="spinner" size={25} />
    </div>
  );
};

export default Loading;
