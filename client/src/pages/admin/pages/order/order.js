import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../../../api/host/host";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState({});
  const [tours, setTours] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/orders/orders`);
        if (response.data.Status) {
          setOrders(response.data.Result);

          const tourPromises = response.data.Result.map((order) =>
            axios.get(`${BASE_URL}/tours/tour/${order.tour_id}`)
          );
          const tourResponses = await Promise.all(tourPromises);
          const tourMap = {};
          tourResponses.forEach((res) => {
            if (res.data.Status) {
              tourMap[res.data.Result.id] = res.data.Result.title;
            }
          });
          setTours(tourMap);
          // Fetch user details for each order
          const userPromises = response.data.Result.map((order) =>
            axios.get(`${BASE_URL}/auth/user/${order.user_id}`)
          );
          const userResponses = await Promise.all(userPromises);
          const userMap = {};
          userResponses.forEach((res) => {
            if (res.data.Status) {
              userMap[res.data.Result.id] = res.data.Result.full_name;
            }
          });
          setUsers(userMap);
        } else {
          setError(response.data.Error || "Failed to fetch orders.");
        }
      } catch (err) {
        setError("An error occurred while fetching orders.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = (id) => {
    // Implement delete functionality
  };

  const handleEdit = (order) => {
    // Implement edit functionality
  };

  return (
    <div className="container-fluid">
      <h1>Buyurtmalar</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Xaridor</th>
              <th>Maskan nomi</th>
              <th>Soni</th>
              <th>Narxi</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{users[order.user_id] || "Loading..."}</td>{" "}
                {/* Display user full name */}
                <td>{tours[order.tour_id] || "Loading..."}</td>
                <td>{order.quantity}</td>
                <td>{order.total_price}</td>
                <td className="d-flex justify-content-between">
                  <button className="btn btn-danger" disabled>
                    {order && order.status === "pending" ? (
                      <span>Tasdiqlanmagan</span>
                    ) : (
                      <span>Tasdiqlangan</span>
                    )}
                  </button>
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
      )}
    </div>
  );
}
