import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRegister } from "../../../../http/usersApi";

export default function UserAdd() {
  const [phone_number, setPhone_number] = useState("");
  const [full_name, setFull_name] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }

    try {
      const response = await postRegister({
        phone_number,
        full_name,
        password,
        role,
      });

      if (response.data.Status) {
        navigate("/dashboard/users-list");
        console.log("User registered successfully");
      } else {
        console.error("Registration failed:", response.data.Error);
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(password === e.target.value);
  };

  return (
    <div className="container-fluid px-4">
      <h2 className="mt-4">Foydalanuvchi qo'shish</h2>
      {/* Display the message */}
      {/* {message && (
        <div className={`alert alert-${status}`} role="alert">
          {message}
        </div>
      )} */}
      <div className="login-form">
        <form className="gane-form" onSubmit={handleRegister}>
          <div className="form-left">
            <div className="single-field">
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="FIO *"
                value={full_name}
                onChange={(e) => setFull_name(e.target.value)}
                required
              />
            </div>
            <div className="single-field">
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                pattern="[+]{1}[9]{1}[9]{1}[8]{1}[0-9]{9}"
                placeholder="+998"
                value={phone_number}
                onChange={(e) => setPhone_number(e.target.value)}
                required
              />
            </div>
            <div className="single-field">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Parol *"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="single-field">
              <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                placeholder="Tasdiqlash parolni *"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
            </div>
            <div className="single-field">
              <select
                id="role"
                name="role"
                className="form-control"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="customer">Foydalanuvchi</option>
                <option value="user">Tadbirkor</option>
                <option value="region">Viloyat</option>
                <option value="district">Tuman</option>
                <option value="admin">Departament</option>
              </select>
            </div>
            {!passwordMatch && (
              <div className="error-message">Tasdiqlash paroli xato!</div>
            )}
            {/* <div className="password">
              <p className="aggri">
                <input type="checkbox" />
                Barcha qoidalariga roziman
              </p>
            </div> */}
            <button className="btn btn-theme px-3 py-2" type="submit">
              Yaratish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
