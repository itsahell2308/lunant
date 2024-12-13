import React from "react";
import Select from "react-select";

const CustomSelect = ({
  options = [],
  value = null,
  onChange,
  placeholder = "Select...",
  isClearable = true,
  isDisabled = false,
  isMulti = false,
  styles = {},
  ...props
}) => {
  const defaultStyles = {
    control: (base) => ({
      ...base,
      borderColor: "#ced4da",
      "&:hover": { borderColor: "#2684FF" },
      boxShadow: "none",
    }),

    option: (base, state) => ({
      ...base,
      color: "#333",
      backgroundColor: state.isFocused ? "#c5d5ff" : "white",
      cursor: "pointer",
    }),
    singleValue: (base) => ({
      ...base,
      color: "white", // Change the font color of the selected value
    }),
  };

  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      isClearable={isClearable}
      isDisabled={isDisabled}
      isMulti={isMulti}
      styles={{ ...defaultStyles, ...styles }}
      {...props}
    />
  );
};

export default CustomSelect;
