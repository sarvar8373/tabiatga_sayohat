import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import StatusPanel from "../../../../components/status/statusPanel";

const AdobeView = ({ adobe, onClose, onUpdateStatus }) => {
  // Manage local state for status
  const [status, setStatus] = useState(adobe?.status);

  // Handle status update
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    onUpdateStatus(adobe.id, newStatus); // Call parent handler to update status
  };

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
        <StatusPanel status={status} />
      </Modal.Body>
      <Modal.Footer>
        {status !== 1 && (
          <Button
            variant="outline-success"
            onClick={() => handleStatusChange(1)}
          >
            Tasdiqlash
          </Button>
        )}
        {status !== 2 && (
          <Button variant="outline-info" onClick={() => handleStatusChange(2)}>
            Qayta yuborish
          </Button>
        )}
        {status !== 3 && (
          <Button
            variant="outline-danger"
            onClick={() => handleStatusChange(3)}
          >
            Bekor qilish
          </Button>
        )}
        <Button variant="secondary" onClick={onClose}>
          Yopish
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

AdobeView.propTypes = {
  adobe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tourism_service_id: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    price_description: PropTypes.string.isRequired,
    region_id: PropTypes.string.isRequired,
    district_id: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdateStatus: PropTypes.func.isRequired,
};

export default AdobeView;
