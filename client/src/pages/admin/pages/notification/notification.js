import React, { useEffect, useState } from "react";
import { getNotification } from "../../../../http/notificationApi";
import "bootstrap/dist/css/bootstrap.min.css";
import { getUsers } from "../../../../http/usersApi";
import { useAuth } from "../../../../context/AuthContext";

export default function Notification() {
  const [notification, setNotification] = useState([]);
  const [authors, setAuthors] = useState([]);
  const { userDetails } = useAuth();

  useEffect(() => {
    getUsers()
      .then((userResult) => {
        if (userResult.data.Status) {
          setAuthors(userResult.data.Result);
        } else {
          alert(userResult.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getNotification()
      .then((notificationResult) => {
        if (notificationResult.data.Status) {
          const notifications =
            userDetails.role === "admin"
              ? notificationResult.data.Result
              : notificationResult.data.Result.filter(
                  (notification) => notification.user_id === userDetails.id
                );
          setNotification(notifications);
        } else {
          alert(notificationResult.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, [userDetails]); // Add userDetails as a dependency

  const getBackgroundColor = (type) => {
    switch (type) {
      case "1":
        return "table-success";
      default:
        return "table-danger";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return ` ${hours}:${minutes}/${day}.${month}.${year}`;
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case "0":
        return "Tasdiqlanmagan"; // Unconfirmed
      case "1":
        return "Tasdiqlangan"; // Confirmed
      default:
        return "";
    }
  };

  return (
    <div className="container-fluid">
      <h1>Bildirishnomalar</h1>
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Xabar</th>
            <th>Holati</th>
            <th>Foydalanuvchi</th>
            <th>Sanasi</th>
          </tr>
        </thead>
        <tbody>
          {notification.map((item, index) => (
            <tr key={item.id} className={getBackgroundColor(item.type)}>
              <td>{index + 1}</td>
              <td>{item.message}</td>
              <td>{getTypeLabel(item.type)}</td>
              <td>
                {
                  authors.find((author) => author.id === item.user_id)
                    ?.full_name
                }
              </td>
              <td>{formatDate(item.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
