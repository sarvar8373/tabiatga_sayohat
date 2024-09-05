import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function Sidebar() {
  const [isSidebarToggled, setIsSidebarToggled] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isCollapseTwoThre, setIsCollapseTwoThre] = useState(false);
  const [isCollapseTwoN, setIsCollapseTwoN] = useState(false);
  const [isCollapseTwoOpen, setIsCollapseTwoOpen] = useState(false);
  const [isCollapseTwoOne, setIsCollapseTwoOne] = useState(false);
  const [isCollapseTwoThree, setIsCollapseTwoThree] = useState(false);
  const [isCollapseTwoOw, setIsCollapseTwoOw] = useState(false);

  const { userDetails, logout } = useAuth();
  const handleCollapseToggle = () => {
    setIsCollapseTwoOpen(!isCollapseTwoOpen);
  };
  const handleCollapseToggles = () => {
    setIsCollapseTwoOne(!isCollapseTwoOne);
  };
  const handleCollapseToggled = () => {
    setIsCollapseTwoThree(!isCollapseTwoThree);
  };
  const handleSidebarTogglee = () => {
    setIsCollapseTwoThre(!isCollapseTwoThre);
  };
  // Toggle sidebar
  const handleSidebarToggle = () => {
    setIsSidebarToggled(!isSidebarToggled);
  };
  const handleSidebarToggler = () => {
    setIsCollapseTwoN(!isCollapseTwoN);
  };
  const handleSidebarToggles = () => {
    setIsCollapseTwoOw(!isCollapseTwoOw);
  };

  // Handle window resize
  const handleResize = () => {
    if (window.innerWidth < 768) {
      // Logic to hide collapse on smaller screens
    }
    if (window.innerWidth < 480 && !isSidebarToggled) {
      setIsSidebarToggled(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", () => setScrollPosition(window.scrollY));

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", () =>
        setScrollPosition(window.scrollY)
      );
    };
  }, [isSidebarToggled]);

  const handleLogoutClick = () => {
    logout();
  };

  return (
    <ul
      className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${
        isSidebarToggled ? "toggled" : ""
      }`}
      id="accordionSidebar"
    >
      <a
        className="sidebar-brand d-flex align-items-center justify-content-center"
        href="/"
      >
        <div className="sidebar-brand-text">
          <img src="/img/logo.png" alt="GENE" />
        </div>
      </a>

      <hr className="sidebar-divider my-0" />

      <li className="nav-item ">
        <Link className="nav-link" to="./">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Bosh sahifa</span>
        </Link>
      </li>
      <hr className="sidebar-divider" />
      {/* {userDetails.role === "user" && (
        <li className="nav-item ">
          <Link className="nav-link" to="./organization">
            <i className="fas fa-fw fa-building"></i>
            <span>Tashkilot</span>
          </Link>
          <hr className="sidebar-divider" />
        </li>
      )} */}

      <div className="sidebar-heading">Admin</div>
      {["admin", "region", "district", "user"].includes(userDetails.role) && (
        <li className="nav-item">
          <Link
            className="nav-link collapsed"
            data-toggle="collapse"
            data-target="#collapseUtilities"
            aria-controls="collapseUtilities"
            to="#"
            onClick={(e) => {
              e.preventDefault();
              handleSidebarToggles();
            }}
            aria-expanded={isCollapseTwoOw}
          >
            <i className="fas fa-fw fa-building"></i>
            <span>Tashkilotlar</span>
          </Link>
          <div
            className={`collapse ${isCollapseTwoOw ? "show" : ""}`}
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="bg-dark py-2 collapse-inner rounded">
              {["admin", "user"].includes(userDetails.role) && (
                <div>
                  <Link
                    className="collapse-item text-secondary"
                    to="./organization-add"
                  >
                    Tashkilotlar qo'shish
                  </Link>
                </div>
              )}
              <Link
                className="collapse-item text-secondary"
                to="./organization-list"
              >
                Tashkilotlar ro'yhati
              </Link>
            </div>
          </div>
        </li>
      )}
      {userDetails.role === "admin" && (
        <li className="nav-item">
          <Link
            className="nav-link collapsed"
            data-toggle="collapse"
            data-target="#collapseUtilities"
            aria-controls="collapseUtilities"
            to="#"
            onClick={(e) => {
              e.preventDefault();
              handleSidebarTogglee();
            }}
            aria-expanded={isCollapseTwoThre}
          >
            <i className="fas fa-fw fa-file"></i>
            <span>Postlar</span>
          </Link>
          <div
            className={`collapse ${isCollapseTwoThre ? "show" : ""}`}
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="bg-dark py-2 collapse-inner rounded">
              <Link className="collapse-item text-secondary" to="./category">
                Kategoriyalar
              </Link>
              <Link className="collapse-item text-secondary" to="./post-add">
                Post qo'shish
              </Link>
              <Link className="collapse-item text-secondary" to="./posts">
                Postlar
              </Link>
            </div>
          </div>
        </li>
      )}
      {["admin", "region", "district", "user"].includes(userDetails.role) && (
        <li className="nav-item">
          <Link
            className="nav-link collapsed"
            data-toggle="collapse"
            data-target="#collapseUtilities"
            aria-controls="collapseUtilities"
            to="#"
            onClick={(e) => {
              e.preventDefault();
              handleCollapseToggle();
            }}
            aria-expanded={isCollapseTwoOpen}
          >
            <i className="fas fa-fw fa-image"></i>
            <span>Maskanlar</span>
          </Link>
          <div
            className={`collapse ${isCollapseTwoOpen ? "show" : ""}`}
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="bg-dark py-2 collapse-inner rounded">
              <Link className="collapse-item text-secondary" to="./adobe">
                Maskanlar qo'shish
              </Link>
              <Link className="collapse-item text-secondary" to="./adobe-list">
                Maskanlar ro'yhati
              </Link>
            </div>
          </div>
        </li>
      )}

      <li className="nav-item">
        <Link
          className="nav-link collapsed"
          data-toggle="collapse"
          data-target="#collapseUtilities"
          aria-controls="collapseUtilities"
          to="#"
          onClick={(e) => {
            e.preventDefault();
            handleSidebarToggler();
          }}
          aria-expanded={isCollapseTwoN}
        >
          <i className="fal fa-shopping-basket"></i>
          <span>Buyurtmalar</span>
        </Link>
        <div
          className={`collapse ${isCollapseTwoN ? "show" : ""}`}
          aria-labelledby="headingTwo"
          data-parent="#accordionSidebar"
        >
          <div className="bg-dark py-2 collapse-inner rounded">
            <Link className="collapse-item text-secondary" to="./order">
              Buyurtmalar ro'yhati
            </Link>
          </div>
        </div>
      </li>
      {userDetails.role === "admin" && (
        <li className="nav-item">
          <Link
            className="nav-link collapsed"
            data-toggle="collapse"
            data-target="#collapsePages"
            aria-controls="collapsePages"
            to="#"
            onClick={(e) => {
              e.preventDefault();
              handleCollapseToggles();
            }}
            aria-expanded={isCollapseTwoOne}
          >
            <i className="fas fa-fw fa-bars"></i>
            <span>Menyular</span>
          </Link>
          <div
            className={`collapse ${isCollapseTwoOne ? "show" : ""}`}
            data-parent="#accordionSidebar"
            aria-labelledby="headingPages"
          >
            <div className="bg-dark py-2 collapse-inner rounded">
              <Link
                className="collapse-item text-secondary"
                to="utilities-color.html"
              >
                Ekskursiyalar
              </Link>
              <Link
                className="collapse-item text-secondary"
                to="utilities-border.html"
              >
                Maskanlar
              </Link>
              <Link
                className="collapse-item text-secondary"
                to="utilities-animation.html"
              >
                Ekosentr
              </Link>
              <Link
                className="collapse-item text-secondary"
                to="utilities-other.html"
              >
                Yo'nalishlar
              </Link>
              <Link
                className="collapse-item text-secondary"
                to="utilities-other.html"
              >
                Sayohat kompaniyari
              </Link>
            </div>
          </div>
        </li>
      )}

      <hr className="sidebar-divider" />
      {["admin", "region", "district"].includes(userDetails.role) && (
        <div className="sidebar-heading">Foydalanuvchilar</div>
      )}
      {["region", "district"].includes(userDetails.role) && (
        <li className="nav-item ">
          <Link className="nav-link" to="./users-list">
            <i className="fas fa-fw fa-building"></i>
            <span>Foydalanuvchilar ro'yhati</span>
          </Link>
          <hr className="sidebar-divider" />
        </li>
      )}
      {["admin"].includes(userDetails.role) && (
        <li className="nav-item">
          <Link
            className="nav-link collapsed"
            data-toggle="collapse"
            data-target="#collapsePages"
            aria-controls="collapsePages"
            to="#"
            onClick={(e) => {
              e.preventDefault();
              handleCollapseToggled();
            }}
            aria-expanded={isCollapseTwoThree}
          >
            <i className="fas fa-fw fa-users"></i>
            <span>Foydalanuvchilar</span>
          </Link>
          <div
            className={`collapse ${isCollapseTwoThree ? "show" : ""}`}
            data-parent="#accordionSidebar"
            aria-labelledby="headingPages"
          >
            <div className="bg-dark py-2 collapse-inner rounded">
              <Link className="collapse-item text-secondary" to="user-add">
                Foydalanuvchi qo'shish
              </Link>
              <Link className="collapse-item text-secondary" to="users-list">
                Foydalanuvchilar ro'yhati
              </Link>
            </div>
          </div>
        </li>
      )}

      <li className="nav-item">
        <Link className="nav-link" to="charts.html">
          <i className="fas fa-fw fa-wrench"></i>
          <span>Sozlamar</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link onClick={handleLogoutClick} className="nav-link">
          <i className="fas fa-sign-out-alt"></i>
          <span>Chiqish</span>
        </Link>
      </li>

      <hr className="sidebar-divider d-none d-md-block" />

      <div className="text-center d-none d-md-inline">
        <button
          className="rounded-circle border-0"
          id="sidebarToggle"
          onClick={handleSidebarToggle}
        ></button>
      </div>
    </ul>
  );
}
