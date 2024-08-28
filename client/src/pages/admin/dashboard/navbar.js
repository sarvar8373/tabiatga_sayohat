import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
export default function Navbar() {
  const [isCollapseTwoOpen, setIsCollapseTwoOpen] = useState(false);
  const [isCollapseTwoOne, setIsCollapseTwoOne] = useState(false);
  const { userDetails, logout } = useAuth();
  const handleLogoutClick = () => {
    logout();
  };

  const handleCollapseToggle = () => {
    setIsCollapseTwoOpen(!isCollapseTwoOpen);
  };
  const handleCollapseToggles = () => {
    setIsCollapseTwoOne(!isCollapseTwoOne);
  };

  return (
    <nav className="navbar navbar-expand justify-content-end navbar-light bg-white topbar mb-4 static-top shadow">
      <button
        id="sidebarToggleTop"
        className="btn btn-link d-md-none rounded-circle mr-3"
      >
        <i className="fa fa-bars"></i>
      </button>

      <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
        {/* <div className="input-group">
          <input
            type="text"
            className="form-control bg-light border-0 small"
            placeholder="Search for..."
            aria-label="Search"
            aria-describedby="basic-addon2"
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="button">
              <i className="fas fa-search fa-sm"></i>
            </button>
          </div>
        </div> */}
      </form>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown no-arrow d-sm-none">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="searchDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fas fa-search fa-fw"></i>
          </a>
          <div
            className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
            aria-labelledby="searchDropdown"
          >
            <form className="form-inline mr-auto w-100 navbar-search">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control bg-light border-0 small"
                  placeholder="Search for..."
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="button">
                    <i className="fas fa-search fa-sm"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </li>

        <li className="nav-item dropdown no-arrow mx-1">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="alertsDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            onClick={(e) => {
              e.preventDefault();
              handleCollapseToggles();
            }}
            aria-expanded={isCollapseTwoOne}
          >
            <i className="fas fa-bell fa-fw"></i>
            <span className="badge badge-danger badge-counter">3+</span>
          </a>
          <div
            className={`dropdown-list end-0 dropdown-menu dropdown-menu-right shadow animated--grow-in collapse ${
              isCollapseTwoOne ? "show" : ""
            }`}
            aria-labelledby="alertsDropdown"
          >
            <h6 className="dropdown-header">Xabarnoma</h6>
            <a className="dropdown-item d-flex align-items-center" href="#">
              <div>
                <div className="small text-gray-500">Avgust 8, 2024</div>
                <span className="font-weight-bold">Foydalanuvchidan xabar</span>
              </div>
            </a>
            <a
              className="dropdown-item text-center small text-gray-500"
              href="#"
            >
              Barchasini ko'rish
            </a>
          </div>
        </li>
        <div className="topbar-divider d-none d-sm-block"></div>

        <li className="nav-item dropdown no-arrow">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="userDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            onClick={(e) => {
              e.preventDefault();
              handleCollapseToggle();
            }}
            aria-expanded={isCollapseTwoOpen}
          >
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">
              {userDetails.full_name}
            </span>
            {/* <img
              className="img-profile rounded-circle"
              src="img/undraw_profile.svg"
            /> */}
          </a>
          <div
            className={`dropdown-menu end-0 dropdown-menu-right shadow animated--grow-in collapse ${
              isCollapseTwoOpen ? "show" : ""
            }`}
            aria-labelledby="userDropdown"
          >
            <Link className="dropdown-item" to="./profile">
              <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"> </i>
              Profil
            </Link>
            <Link className="dropdown-item" to="#">
              <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"> </i>
              Sozlamalar
            </Link>

            <div className="dropdown-divider"></div>
            <Link className="dropdown-item" onClick={handleLogoutClick}>
              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400">
                {" "}
              </i>
              Chiqish
            </Link>
          </div>
        </li>
      </ul>
    </nav>
  );
}
