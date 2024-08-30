import React, { useEffect, useState } from "react";
import { getNotification } from "../../../../http/notificationApi";

export default function Notification() {
  const [notification, setnotification] = useState([]);
  const handleDelete = (id) => {};
  const handleEdit = (id) => {};
  useEffect(() => {
    getNotification()
      .then((notificationResult) => {
        if (notificationResult.data.Status) {
          setnotification(notificationResult.data.Result);
        } else {
          alert(notificationResult.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="container-fluid">
      <h1>Bildirishnomalar</h1>
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Xabar</th>
            <th>Turi</th>
          </tr>
        </thead>
        <tbody>
          {notification.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.message}</td>
              <td className="d-flex justify-content-between">
                {order.type}{" "}
                <div>
                  <button
                    onClick={() => handleEdit(order)}
                    className="btn btn-warning mx-3"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="btn btn-danger"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
