// Navbar.js
import React from "react";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="navigation-area">
      <div className="container">
        <div className="row navigation-bg">
          <div className="col-lg-3 col-sm-4 col-4">
            <div className="site-logo">
              <a href="/">
                <img src="/img/logo.png" alt="GENE" />
              </a>
            </div>
          </div>
          <div className="col-lg-9 col-sm-4 col-2 order-two">
            <div className="main-menu-wrap">
              <nav className="gene-nav">
                <ul className="menu">
                  <li className="has-dropdown">
                    <a href="#">Ekskursiyalar</a>
                    <ul>
                      <li>
                        <a href="/embers">Cho'qqilar</a>
                      </li>
                      <li>
                        <a href="/waterfalls">Sharsharalar</a>
                      </li>
                      <li>
                        <a href="/lakes">Ko'llar</a>
                      </li>
                      <li>
                        <a href="/gorges">Daralar</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="/posts">Maskanlar</a>
                  </li>
                  <li>
                    <a href="/ecocenter">Ekosentr</a>
                  </li>
                  <li>
                    <a href="/directions">Yo'nalishlar</a>
                  </li>
                  <li>
                    <a href="/adventure">Sayohat kompaniyari</a>
                  </li>

                  <li className="lgn">
                    {isAuthenticated ? (
                      <a href="/dashboard">
                        <span
                          className="py-2 px-3"
                          style={{ backgroundColor: "#ff5300" }}
                        >
                          <i className="fas fa-user-shield"></i> Profil
                        </span>
                      </a>
                    ) : (
                      <a href="/login">
                        <span
                          className="py-2 px-3"
                          style={{ backgroundColor: "#ff5300" }}
                        >
                          <i className="far fa-user"></i> LOGIN
                        </span>
                      </a>
                    )}
                  </li>
                </ul>
              </nav>
            </div>
            <div className="mobile-menu-area"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
