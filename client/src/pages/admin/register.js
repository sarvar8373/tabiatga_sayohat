import React, { useState } from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { useNavigate } from "react-router-dom";
import { postRegister } from "../../http/usersApi";
import { HelmetProvider, Helmet } from "react-helmet-async";
export default function Register() {
  const [phone_number, setPhone_number] = useState("");
  const [full_name, setFull_name] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true); // Track password match
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
      });

      if (response.data.Status) {
        navigate("/dashboard");
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
    // Check if passwords match whenever the confirm password changes
    setPasswordMatch(password === e.target.value);
  };

  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Roʻyxatdan o'tish</title>
        </Helmet>
      </HelmetProvider>
      <header
        id="header"
        className="header-area style-2 header-border absulate-header"
      >
        <Header />
      </header>
      <div className="bradcumb-area cart overlay-bg-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col">
              <div className="bradcumb text-center">
                <h3>Ro'yhatdan o'tish</h3>
                <ul>
                  <li>
                    <a href="/">Bosh sahifa</a>
                  </li>
                  <li>Ro'yhatdan o'tish</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="login-area pt-90">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-5 col-md-5">
              <img className="mb-5" src="img/about/2.png" alt="" />
            </div>
            <div className="col-xl-6 col-lg-7 col-md-7">
              <div className="section-title font-s30">
                <h2>Yangi akkaunt ochish</h2>
              </div>
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
                    {!passwordMatch && (
                      <div className="error-message">
                        Passwords do not match!
                      </div>
                    )}
                    <div className="password">
                      <p className="aggri">
                        <input type="checkbox" />
                        Barcha qoidalariga roziman
                      </p>
                    </div>
                    <button className="btn btn-theme" type="submit">
                      Yaratish
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="partner-area pt-85 pb-220">
        <div className="container">
          <div className="row justify-content-center"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
