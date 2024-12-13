import React, { useState, useEffect, memo } from "react";
import Icon from "../assets/icons/Icon";

const DisplayOrder = ({ initialValue, onConfirm }) => {
  const [inputValue, setInputValue] = useState(initialValue);

  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleConfirm = () => {
    onConfirm(inputValue);
  };

  return (
    <div className="d-flex align-items-center justify-content-center position-relative">
      <input
        className="form-control input_cuter_box"
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        id="example-text-input"
        onBlur={() => {
          if (!inputValue) {
            setInputValue(initialValue);
          }
        }}
        autoComplete="off"
        onWheel={(e) => e.target.focus()}
      />
      <div className="action-btn">
        <Icon
          name="FaCheck"
          className="check-icon btn btn-outline-success icon_button"
          onClick={handleConfirm}
        />
      </div>
    </div>
  );
};

export default memo(DisplayOrder);
