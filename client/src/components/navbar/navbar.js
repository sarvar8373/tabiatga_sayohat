import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import styles from "../../style/App.module.css";
export default function Navbar() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  // Function href determine if the link is active
  const isActive = (path) => (currentPath === path ? "active-link" : "");
  const isActiveLogin = (path) => (currentPath === path ? "active-login" : "");
  return (
    <div className="navigation-area">
      <div className="container">
        <div className="row navigation-bg">
          <div className="col-lg-3 col-sm-4 col-4">
            <div className="site-logo">
              <a href="/">
                <img className="log" src="/img/logo.png" alt="GENE" />
              </a>
            </div>
          </div>
          <div className="col-lg-9 col-sm-8 col-8 order-two">
            <div className="main-menu-wrap">
              <nav className="gene-nav">
                <ul className="menu">
                  <li className="has-dropdown">
                    <a className={styles.customLink + " " + isActive("/es")}>
                      Ekskursiyalar
                    </a>
                    <ul>
                      <li>
                        <a
                          href="/embers"
                          className={
                            styles.customLink + " " + isActive("/embers")
                          }
                        >
                          Cho'qqilar
                        </a>
                      </li>
                      <li>
                        <a
                          href="/waterfalls"
                          className={
                            styles.customLink + " " + isActive("/waterfalls")
                          }
                        >
                          Sharsharalar
                        </a>
                      </li>
                      <li>
                        <a
                          href="/lakes"
                          className={
                            styles.customLink + " " + isActive("/lakes")
                          }
                        >
                          Ko'llar
                        </a>
                      </li>
                      <li>
                        <a
                          href="/gorges"
                          className={
                            styles.customLink + " " + isActive("/gorges")
                          }
                        >
                          Daralar
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a
                      href="/posts"
                      className={styles.customLink + " " + isActive("/posts")}
                    >
                      Maskanlar
                    </a>
                  </li>
                  <li>
                    <a
                      href="/ecocenter"
                      className={
                        styles.customLink + " " + isActive("/ecocenter")
                      }
                    >
                      Ekosentr
                    </a>
                  </li>
                  <li>
                    <a
                      href="/directions"
                      className={
                        styles.customLink + " " + isActive("/directions")
                      }
                    >
                      Yo'nalishlar
                    </a>
                  </li>
                  <li>
                    <a
                      href="/adventure"
                      className={
                        styles.customLink + " " + isActive("/adventure")
                      }
                    >
                      Sayohat kompaniyari
                    </a>
                  </li>

                  <li className="lgn">
                    {isAuthenticated ? (
                      <a
                        href="/dashboard"
                        className={
                          styles.customLink + " " + isActive("/dashboard")
                        }
                      >
                        <span
                          className="py-2 px-3"
                          style={{ backgroundColor: "#ff5300" }}
                        >
                          <i className="fas fa-user-shield"></i> Profil
                        </span>
                      </a>
                    ) : (
                      <a
                        href="/login"
                        className={
                          styles.customLink + " " + isActiveLogin("/login")
                        }
                      >
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
