import React, { memo } from "react";
import { Modal } from "react-bootstrap";

import { Button } from "../Components";
import { useSelector } from "react-redux";

const CommonModal = ({
  children,
  isShow,
  handleShowHide,
  modalTitle,
  isFooter = true,
}) => {
  const { isLoading } = useSelector((state) => state.ui);
  const handleSubmitClick = () => {
    const submiBtn = document.querySelector("#form-submit-btn");
    if (submiBtn) {
      submiBtn.click();
    }
  };

  const handleCustomClose = () => {
    const modal = document.getElementById("commonModal");
    modal.classList.remove("show");
    modal.removeAttribute("style");
  };

  return (
    <Modal
      show={isShow}
      onHide={handleShowHide}
      backdrop="static"
      keyboard={false}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      {isFooter && (
        <Modal.Footer>
          <Button
            className="btn-outline-danger btn-md"
            onClick={handleShowHide}
          >
            Close
          </Button>
          <Button
            className="btn-primary btn-md"
            onClick={handleSubmitClick}
            isDisabled={isLoading}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default memo(CommonModal);
