// src/components/organization/OrganizationView.js

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form } from "react-bootstrap";
import { useAuth } from "../../../../context/AuthContext";
import StatusPanel from "../../../../components/status/statusPanel";

const OrganizationView = ({
  organization,
  onClose,
  onUpdateStatus,
  onUpdateCause,
}) => {
  const [status, setStatus] = useState(organization?.status);
  const [cause, setCause] = useState(organization?.comment || "");
  const [isCauseRequired, setIsCauseRequired] = useState(false);
  const [isCauseValid, setIsCauseValid] = useState(true); // Track if the cause is valid
  const { userDetails } = useAuth();
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);

    // Call parent handler to update status
    onUpdateStatus(organization.id, newStatus);
  };

  // Handle cause change
  const handleCauseChange = (e) => {
    const newCause = e.target.value;
    setCause(newCause);

    // Update cause validity
    setIsCauseValid(newCause.trim() !== "");
  };

  const handleUpdateCause = (newCause) => {
    onUpdateCause(organization.id, newCause); // Call parent handler to update cause
  };

  useEffect(() => {
    setIsCauseValid(isCauseRequired || cause.trim() !== ``);
  }, [cause, isCauseRequired]);

  if (!organization) return null;

  return (
    <Modal show onHide={onClose} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>Tashkilot passporti</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>INN/PINFL:</strong> {organization.inn_pinfl}
        </p>
        <p>
          <strong>Organization Name:</strong> {organization.org_name}
        </p>
        <p>
          <strong>Director:</strong> {organization.director_name}
        </p>
        <p>
          <strong>Phone:</strong> {organization.phone}
        </p>
        <p>
          <strong>Address:</strong> {organization.address}
        </p>
        <p>
          <strong>User:</strong> {organization.user_id}
        </p>
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

OrganizationView.propTypes = {
  organization: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default OrganizationView;
