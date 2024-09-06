import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";

const OrderView = ({ order, onClose, users, tours, userPhone, tourPrice }) => {
  if (!order) return null;

  return (
    <Modal size="lg" show onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Buyurtma Ma'lumoti</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Xaridor:</strong> {users[order.user_id] || "N/A"}
        </p>
        <p>
          <strong>Telefon raqam:</strong> {userPhone[order.user_id] || "N/A"}
        </p>
        <p>
          <strong>Tanlangan maskan:</strong> {tours[order.tour_id] || "N/A"}
        </p>
        <p>
          <strong>Narxi:</strong> {tourPrice[order.tour_id] || "N/A"}
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

OrderView.propTypes = {
  order: PropTypes.shape({
    user_id: PropTypes.number.isRequired,
    tour_id: PropTypes.number.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  users: PropTypes.objectOf(PropTypes.string).isRequired,
  tours: PropTypes.objectOf(PropTypes.string).isRequired,
  userPhone: PropTypes.objectOf(PropTypes.string).isRequired,
  tourPrice: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default OrderView;
