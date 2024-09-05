// src/components/organization/OrganizationView.js

import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";

const OrganizationView = ({ organization, onClose }) => {
  if (!organization) return null;

  return (
    <Modal show onHide={onClose} centered>
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
        <p>
          <strong>Status:</strong>{" "}
          {organization.status === "0" || organization.status === 0
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

OrganizationView.propTypes = {
  organization: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default OrganizationView;
