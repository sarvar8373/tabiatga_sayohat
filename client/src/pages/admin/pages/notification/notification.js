import React, { useEffect, useState } from "react";
import { getNotification } from "../../../../http/notificationApi";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Notification() {
  const [notification, setNotification] = useState([]);

  const handleDelete = (id) => {
    // Implement delete logic
  };

  const handleEdit = (id) => {
    // Implement edit logic
  };

  useEffect(() => {
    getNotification()
      .then((notificationResult) => {
        if (notificationResult.data.Status) {
          setNotification(notificationResult.data.Result);
        } else {
          alert(notificationResult.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

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
            <th>Sanasi</th>
          </tr>
        </thead>
        <tbody>
          {notification.map((item, index) => (
            <tr key={item.id} className={getBackgroundColor(item.type)}>
              <td>{index + 1}</td>
              <td>{item.message}</td>
              <td> {getTypeLabel(item.type)}</td>
              <td>{formatDate(item.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
