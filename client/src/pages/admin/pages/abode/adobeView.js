import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form } from "react-bootstrap";
import StatusPanel from "../../../../components/status/statusPanel";
import { useAuth } from "../../../../context/AuthContext";

const AdobeView = ({ adobe, onClose, onUpdateStatus, onUpdateCause }) => {
  // Manage local state for status, cause, and form validity
  const [status, setStatus] = useState(adobe?.status);
  const [cause, setCause] = useState(adobe?.tour || "");
  const [isCauseRequired, setIsCauseRequired] = useState(false);
  const [isCauseValid, setIsCauseValid] = useState(true); // Track if the cause is valid
  const { userDetails } = useAuth();

  // Handle status update
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);

    // Call parent handler to update status
    onUpdateStatus(adobe.id, newStatus);
  };

  // Handle cause change
  const handleCauseChange = (e) => {
    const newCause = e.target.value;
    setCause(newCause);

    // Update cause validity
    setIsCauseValid(newCause.trim() !== "");
  };

  const handleUpdateCause = (newCause) => {
    onUpdateCause(adobe.id, newCause); // Call parent handler to update cause
  };

  useEffect(() => {
    // Update cause validity when cause or requirement changes
    setIsCauseValid(isCauseRequired || cause.trim() !== ``);
  }, [cause, isCauseRequired]);

  if (!adobe) return null;

  return (
    <Modal size="lg" show onHide={onClose} centered>
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
        {["admin", "user"].includes(userDetails.role) && (
          <p>
            <strong>Sababi:</strong> {adobe.tour}
          </p>
        )}
        {["admin", "region"].includes(userDetails.role) && (
          <Form.Group className="mb-3" controlId="formCause">
            <Form.Label>Sababi</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={cause}
              onChange={handleCauseChange}
              onBlur={() => handleUpdateCause(cause)}
              required
            />
          </Form.Group>
        )}
        <StatusPanel status={status} />
      </Modal.Body>
      <Modal.Footer>
        {["admin", "region"].includes(userDetails.role) && (
          <div>
            {status !== 1 && (
              <Button
                variant="outline-success"
                className="ms-2"
                onClick={() => handleStatusChange(1)}
              >
                Tasdiqlash
              </Button>
            )}
            {status !== 2 && (
              <Button
                variant="outline-info"
                className="ms-2"
                onClick={() => handleStatusChange(2)}
                disabled={!isCauseValid} // Disable if cause is required and not valid
              >
                Qayta yuborish
              </Button>
            )}
            {status !== 3 && (
              <Button
                variant="outline-danger"
                className="ms-2"
                onClick={() => handleStatusChange(3)}
                disabled={!isCauseValid} // Disable if cause is required and not valid
              >
                Bekor qilish
              </Button>
            )}
          </div>
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
  onUpdateCause: PropTypes.func.isRequired,
};

export default AdobeView;
