import React, { memo } from "react";

const Switch = ({ getValue, onChange }) => {
  return (
    <div className="form-check form-switch form-switch-success">
      <input
        className="form-check-input"
        type="checkbox"
        checked={getValue()}
        onChange={onChange}
        onFocus={(e) => e.target.blur()}
      />
    </div>
  );
};

export default memo(Switch);
