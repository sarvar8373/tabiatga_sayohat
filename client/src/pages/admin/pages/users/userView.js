import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";

const UserView = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Foydalanuvchi passporti</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>FIO:</strong> {user.full_name}
        </p>
        <p>
          <strong>Telefon raqam:</strong> {user.phone_number}
        </p>
        <p>
          <strong>Viloyat:</strong> {user.region_id}
        </p>
        <p>
          <strong>Tuman:</strong> {user.district_id}
        </p>
        <p>
          <strong>Roli:</strong> {user.role}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Yopish
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

UserView.propTypes = {
  user: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default UserView;
