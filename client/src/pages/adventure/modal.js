import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../api/host/host";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure you have Bootstrap CSS imported
import { getUserDetails, postLogin } from "../../http/usersApi";
import { useAuth } from "../../context/AuthContext";

export default function AdventureModal({ adventure, showModal, handleClose }) {
  const [phone_number, setPhone_number] = useState("");
  const [full_name, setFull_name] = useState("");
  const [password, setPassword] = useState("");
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const [cls, setCls] = useState("none");
  const navigate = useNavigate();
  const { login } = useAuth();
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
        // Register new user
        await axios.post(`${BASE_URL}/auth/add_user`, {
          phone_number,
          full_name,
          password,
        });
      }
      await login(phone_number, password);
      // Login user
      const loginResponse = await postLogin({
        phone_number: phone_number,
        password: password,
      });

      if (loginResponse.data && loginResponse.data.token) {
        token = loginResponse.data.token;

        // Store the token in localStorage
        localStorage.setItem("token", token);

        // Fetch user details with the retrieved token
        const userResponse = await getUserDetails();
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
          setError("Xatolik yuz berdi. Status: " + orderResponse.status);
        }
      } else {
        setError("Tizimga kirishda telefon yoki parol xato.");
      }
    } catch (err) {
      console.error("Error details:", err);
      setError(
        "Xatolik yuz berdi. " + (err.response?.data?.Error || "Unknown error")
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
            ? "Raqamingizni kiriting"
            : isExistingUser
            ? "Login"
            : "Akkaunt ochish"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {step === 1 && (
            <Form.Group controlId="Telefon raqam">
              <Form.Control
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                pattern="[+]{1}[9]{1}[9]{1}[8]{1}[0-9]{9}"
                placeholder="+998"
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
                    placeholder="FIO *"
                    onChange={(e) => setFull_name(e.target.value)}
                    required
                  />
                </Form.Group>
              )}
              <Form.Group controlId="password">
                <Form.Control
                  type="password"
                  placeholder="Parol"
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
                  Yuklanmoqda...
                </>
              ) : step === 1 ? (
                "Keyingisi"
              ) : (
                "Bron qilish"
              )}
            </Button>
            {step === 2 && (
              <Button variant="secondary" onClick={handleClose}>
                Yopish
              </Button>
            )}
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
