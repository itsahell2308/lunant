import React, { useEffect, useState } from "react";
import CommonModal from "./CommonModal";
import { Button } from "../Components";

const CheckPasswordModal = ({ onStatusChange, rowData, getValue }) => {
  const [isShow, setIsShow] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handle password change and validation
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value) {
      setError("");
    } else {
      setError("Password is required");
    }
  };

  const handleShowHide = () => {
    setIsShow(!isShow);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) {
      setError("Password is required");
    } else {
      onStatusChange(!getValue(), password);
      setIsShow(false);
    }
  };

  return (
    <>
      <div className="form-check form-switch form-switch-success">
        <input
          className="form-check-input"
          type="checkbox"
          checked={getValue()}
          onChange={(e) => {
            setPassword("");
            e.target.blur();
            setIsShow(true);
          }}
        />
      </div>

      <CommonModal
        isShow={isShow}
        handleShowHide={handleShowHide}
        modalTitle="Enter Password to Change Status"
      >
        <form onSubmit={handleSubmit}>
          <div className="row m-0 p-0">
            <div className="col-md-6 m-0 p-1">
              <label htmlFor="password" className="form-label" required>
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                placeholder="Enter password"
                onChange={handlePasswordChange} // Handle password input change
                value={password}
                autoFocus
              />
              {error && <div className="text-danger">{error}</div>}
              {/* Show error if password is empty */}
            </div>
          </div>
          <Button type="submit" id="form-submit-btn" isHidden={true}>
            Submit
          </Button>
        </form>
      </CommonModal>
    </>
  );
};

export default CheckPasswordModal;
