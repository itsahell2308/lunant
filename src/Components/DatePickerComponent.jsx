import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = ({
  selectedDate,
  onChange,
  dateFormat = "dd/MM/yyyy",
  placeholderText = "Select a date",
  isClearable = true,
  minDate = null,
  maxDate = null,
  ...props
}) => {
  return (
    <div className="date-picker-wrapper">
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        dateFormat={dateFormat}
        placeholderText={placeholderText}
        isClearable={isClearable}
        minDate={minDate}
        maxDate={maxDate}
        {...props}
      />
    </div>
  );
};

export default DatePickerComponent;
