import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { getNotification } from "../../../http/notificationApi";

export default function Navbar() {
  const [isCollapseTwoOpen, setIsCollapseTwoOpen] = useState(false);
  const [isCollapseTwoOne, setIsCollapseTwoOne] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const { userDetails, logout } = useAuth();

  const handleLogoutClick = () => {
    logout();
  };

  const fetchNotifications = () => {
    getNotification()
      .then((notificationResult) => {
        if (notificationResult.data.Status) {
          const newNotifications =
            userDetails.role === "admin"
              ? notificationResult.data.Result
              : notificationResult.data.Result.filter(
                  (notification) => notification.user_id === userDetails.id
                );
          setNotifications(newNotifications);
          setNotificationCount(newNotifications.length);
        } else {
          console.log(notificationResult.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchNotifications();
    // Polling every 30 seconds (adjust as needed)
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleCollapseToggle = () => {
    setIsCollapseTwoOpen(!isCollapseTwoOpen);
  };

  const handleCollapseToggles = () => {
    setIsCollapseTwoOne(!isCollapseTwoOne);
  };

  const handleDropdownToggle = () => {
    setIsCollapseTwoOne(!isCollapseTwoOne);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}  ${day}.${month}.${year}`;
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
            <span
              className={`badge ${
                notificationCount > 0 ? "badge-danger" : ""
              } badge-counter`}
            >
              {notificationCount > 0 ? notificationCount : ""}
            </span>
          </a>
          <div
            className={`dropdown-list end-0 dropdown-menu dropdown-menu-right shadow animated--grow-in collapse`}
            aria-labelledby="alertsDropdown"
          >
            <h6 className="dropdown-header fs-6">Bildirishnoma</h6>
            {notifications.length === 0 ? (
              <div className="dropdown-item text-center small text-gray-500">
                Bildirishnomalar yo'q
              </div>
            ) : (
              notifications.slice(0, 3).map((notification) => (
                <Link
                  key={notification.id}
                  className="dropdown-item"
                  to="./notification"
                >
                  <div className="d-flex gap-3 justify-content-between">
                    <span className="font-weight-bold">
                      {notification.message}
                    </span>
                    <div className="small text-gray-500">
                      {formatDate(notification.created_at)}
                    </div>
                  </div>
                </Link>
              ))
            )}
            <Link
              className="dropdown-item text-center small text-gray-500"
              to="./notification"
              onClick={() => setNotificationCount(0)}
            >
              Barchasini ko'rish
            </Link>
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
            className={`dropdown-menu end-0 dropdown-menu-right shadow animated--grow-in collapse`}
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
