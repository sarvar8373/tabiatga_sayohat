import React, { useEffect, useState } from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { postLogin } from "../../http/usersApi";
import { HelmetProvider, Helmet } from "react-helmet-async";
import Alert from "../../components/alert/alert";
import { useAuth } from "../../context/AuthContext";
// Set withCredentials globally
axios.defaults.withCredentials = true;

export default function Login() {
  const { login } = useAuth();
  const [logPhone_number, setPhone_number] = useState("");
  const [logPassword, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const [cls, setCls] = useState("none");

  useEffect(() => {
    const storedUserName = localStorage.getItem("rememberedUserName");
    const storedPassword = localStorage.getItem("rememberedPassword");

    if (storedUserName && storedPassword) {
      setPhone_number(storedUserName);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(logPhone_number, logPassword);
    try {
      const result = await postLogin({
        phone_number: logPhone_number,
        password: logPassword,
      });

      if (result.data.loginStatus) {
        navigate("/dashboard");
      } else {
        setCls("flex");
        setError(result.data.Error);
      }
    } catch (err) {
      console.error(
        "Login error:",
        err.response ? err.response.data : err.message
      );
      setCls("flex");
      setError("Telefon raqam yoki parol noto'g'ri");
    }
  };

  useEffect(() => {
    if (error !== "") {
      const timeoutId = setTimeout(() => {
        setCls("none");
      }, 4000);

      return () => clearTimeout(timeoutId);
    }
  }, [error]);

  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Login</title>
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
                <h3>Login</h3>
                <ul>
                  <li>
                    <a href="/">Bosh sahifa</a>
                  </li>
                  <li>Login</li>
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
                <h2>Akkauntingizni kiriting</h2>
              </div>
              <div className="login-form">
                <form onSubmit={handleSubmit} className="gane-form">
                  <Alert error={error} cls={{ display: cls }} />

                  <div className="form-left">
                    <div className="single-field">
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        pattern="[+]{1}[9]{1}[9]{1}[8]{1}[0-9]{9}"
                        placeholder="+998"
                        onChange={(e) => setPhone_number(e.target.value)}
                        value={logPhone_number}
                        required
                      />
                    </div>
                    <div className="single-field">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        placeholder="Parol"
                        onChange={(e) => setPassword(e.target.value)}
                        value={logPassword}
                        required
                      />
                    </div>
                    <div className="password">
                      <p>
                        <input
                          type="checkbox"
                          id="rememberMe"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        Parolni eslab qoling
                      </p>
                      <p>
                        Parolingizni <a href="/">unutdingizmi?</a>
                      </p>
                    </div>
                    <div className="password">
                      <p>
                        <a href="/register">Roʻyxatdan oʻtish</a>
                      </p>
                    </div>
                    <button className="btn btn-theme" type="submit">
                      Kirish
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
          <div className="row justify-content-center">
            <div className="col-lg-10"></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
