import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../api/host/host";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure you have Bootstrap CSS imported
import { postLogin } from "../../http/usersApi";

export default function AdventureModal({ adventure, showModal, handleClose }) {
  const [phone_number, setPhone_number] = useState("");
  const [full_name, setFull_name] = useState("");
  const [password, setPassword] = useState("");
  const [isExistingUser, setIsExistingUser] = useState(false); // Correctly initialize as boolean
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handlePhoneNumberCheck = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`${BASE_URL}/auth/check-phone`, {
        phone_number,
      });
      setIsExistingUser(response.data.exists);
      setStep(2);
    } catch (err) {
      setError("Failed to check phone number.");
    } finally {
      setLoading(false);
    }
  };

  const handleOrder = async () => {
    setLoading(true);
    setError("");
    try {
      let userId;
      let token;

      if (!isExistingUser) {
        // Create new user
        await axios.post(`${BASE_URL}/auth/add_user`, {
          phone_number,
          full_name,
          password,
        });
        // Login the user after registration
        const loginResponse = await postLogin({ phone_number, password });
        token = loginResponse.data.token;

        // Store the token in localStorage
        localStorage.setItem("token", token);
      } else {
        // Login existing user
        const loginResponse = await postLogin({ phone_number, password });
        token = loginResponse.data.token;

        // Store the token in localStorage
        localStorage.setItem("token", token);
      }

      // Retrieve token from localStorage
      const storedToken = localStorage.getItem("token");
      console.log("Stored Token:", storedToken); // Debug token here

      // Fetch user details with the retrieved token
      const userResponse = await axios.get(`${BASE_URL}/auth/user`, {
        headers: { Authorization: `Bearer ${storedToken}` }, // Ensure the token is included in the header
        withCredentials: true,
      });

      console.log("User response:", userResponse.data); // Debug user response

      userId = userResponse.data.id;

      if (!userId) {
        throw new Error("User ID is not available");
      }

      // Place order
      const orderResponse = await axios.post(`${BASE_URL}/orders/add_order`, {
        user_id: userId,
        tour_id: adventure.id,
        quantity: 1,
        total_price: adventure.price,
        status: "pending",
      });

      if (orderResponse.status === 200) {
        navigate("/dashboard");
        handleClose(); // Close the modal on successful order
      } else {
        setError("Failed to place the order. Status: " + orderResponse.status);
      }
    } catch (err) {
      console.error("Error details:", err);
      setError(
        "Failed to place the order. " +
          (err.response?.data?.Error || "Unknown error")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      handlePhoneNumberCheck();
    } else {
      handleOrder();
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {step === 1
            ? "Enter Your Phone Number"
            : isExistingUser
            ? "Login"
            : "Create Account"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {step === 1 && (
            <Form.Group controlId="phoneNumber">
              <Form.Control
                type="tel"
                placeholder="+998"
                pattern="[+]{1}[9]{1}[9]{1}[8]{1}[0-9]{9}"
                onChange={(e) => setPhone_number(e.target.value)}
                onBlur={handlePhoneNumberCheck}
                required
              />
            </Form.Group>
          )}
          {step === 2 && (
            <>
              {!isExistingUser && (
                <Form.Group controlId="fullName">
                  <Form.Control
                    type="text"
                    placeholder="Full Name"
                    onChange={(e) => setFull_name(e.target.value)}
                    required
                  />
                </Form.Group>
              )}
              <Form.Group controlId="password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
            </>
          )}
          {error && <p className="text-danger">{error}</p>}
          <Modal.Footer>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />{" "}
                  Loading...
                </>
              ) : step === 1 ? (
                "Next"
              ) : (
                "Place Order"
              )}
            </Button>
            {step === 2 && (
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            )}
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
