import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";

const AdobeView = ({ adobe, onClose }) => {
  if (!adobe) return null;

  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Maskan passporti</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Maskan nomi:</strong> {adobe.title}
        </p>
        <p>
          <strong>Ma'lumot:</strong> {adobe.description}
        </p>
        <p>
          <strong>Maskan turi:</strong> {adobe.tourism_service_id}
        </p>
        <p>
          <strong>Narxi:</strong> {adobe.price}
        </p>
        <p>
          <strong>Necha kishi:</strong> {adobe.price_description}
        </p>
        <p>
          <strong>Viloyat:</strong> {adobe.region_id}
        </p>
        <p>
          <strong>Tuman:</strong> {adobe.district_id}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          {adobe.status === "0" || adobe.status === 0
            ? "Jarayonda"
            : "Tasdiqlandi"}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

AdobeView.propTypes = {
  adobe: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default AdobeView;
