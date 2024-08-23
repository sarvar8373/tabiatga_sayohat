import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../api/host/host";

export default function Modal() {
  const [phone_number, setPhone_number] = useState("");
  const [full_name, setFull_name] = useState("");
  const [password, setPassword] = useState("");
  const [isExistingUser, setIsExistingUser] = useState(null); // null initially
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1); // Track the current step
  const navigate = useNavigate();

  const handlePhoneNumberCheck = async () => {
    setLoading(true);
    setError(""); // Clear previous errors
    try {
      const response = await axios.post(`${BASE_URL}/auth/check-phone`, {
        phone_number,
      });
      setIsExistingUser(response.data.exists);
      setStep(2); // Move to step 2
    } catch (err) {
      setError("Failed to check phone number.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors
    try {
      if (isExistingUser) {
        // Handle login
        await axios.post(`${BASE_URL}/auth/login`, {
          phone_number,
          password,
        });
        navigate("/dashboard");
        // Handle successful login, e.g., redirect to account page
      } else {
        // Handle account creation
        await axios.post(`${BASE_URL}/auth/add_user`, {
          phone_number,
          full_name,
          password,
        });
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Failed to submit form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {step === 1
                ? "Telefon raqamingizni kiriting"
                : isExistingUser
                ? "Login"
                : "Akkaunt ochish"}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="single-field">
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    pattern="[+]{1}[9]{1}[9]{1}[8]{1}[0-9]{9}"
                    placeholder="+998"
                    className="form-control"
                    onChange={(e) => setPhone_number(e.target.value)}
                    onBlur={handlePhoneNumberCheck}
                    required
                  />
                </div>
              )}

              {step === 2 && (
                <>
                  {isExistingUser === false && (
                    <div className="single-field">
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        placeholder="Full Name"
                        onChange={(e) => setFull_name(e.target.value)}
                        required
                      />
                    </div>
                  )}
                  <div className="single-field">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </>
              )}

              {error && <p className="text-danger">{error}</p>}

              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-theme"
                  disabled={loading}
                  data-bs-dismiss="modal"
                >
                  {loading
                    ? "Yuklanmoqda..."
                    : step === 1
                    ? "Keyingisi"
                    : isExistingUser
                    ? "Login"
                    : "Akkaunt ochish"}
                </button>
                {step === 2 && (
                  <button
                    type="button"
                    className="btn btn-theme"
                    style={{ background: "gray" }}
                    data-bs-dismiss="modal"
                  >
                    Yopish
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
