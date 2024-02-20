import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function AllSelectModal(props) {
  const modalStyle = {
    fontFamily: "Helvetica",
    fontSize: "16px",
  };

  const modalHeaderStyle = {
    fontWeight: "bold",
    borderBottom: "0px",
    padding: "1rem 1rem 0rem 1rem",
  };

  const modalFooterStyle = {
    borderTop: "0px",
    padding: "0rem 2rem 1rem 1rem",
    fontFamily: "Helvetica",
    fontSize: "16px",
  };

  const AllSelectOptions = () => {
    return (
      <div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="allSelectOptionRadios"
            id="currentPage"
            value="currentPage"
            defaultChecked
          />
          <label className="form-check-label" htmlFor="currentPage">
            Documents on current page
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="allSelectOptionRadios"
            id="allPages"
            value="allPages"
          />
          <label className="form-check-label" htmlFor="allPages">
            Documents across all pages
          </label>
        </div>
      </div>
    );
  };

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      centered
      style={modalStyle}
    >
      <Modal.Header closeButton style={modalHeaderStyle}>
        Select documents
      </Modal.Header>
      <Modal.Body>{AllSelectOptions()}</Modal.Body>
      <Modal.Footer style={modalFooterStyle}>
        <Button variant="outline-secondary" onClick={props.onHide}>
          Cancel
        </Button>
        <Button variant="primary">Ok</Button>
      </Modal.Footer>
    </Modal>
  );
}
