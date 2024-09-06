import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { BASE_URL } from "../../../../api/host/host";
import SearchItem from "../../../../components/search-item/searchItem";
import debounce from "lodash/debounce";
import { useAuth } from "../../../../context/AuthContext";
import { getUserID, getUsers } from "../../../../http/usersApi";
import { deleteOrder, getOrder } from "../../../../http/orderApi";
import OrderView from "./orderView";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [filterOrders, setFilterOrders] = useState([]);
  const [users, setUsers] = useState({});
  const [userPhone, setUserPhone] = useState({});
  const [allUsers, setAllUsers] = useState({});
  const [tours, setTours] = useState({});
  const [tourPrice, setTourPrice] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [postsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTerm1, setSearchTerm1] = useState("");
  const [searchTerm3, setSearchTerm3] = useState("");
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filterOrders.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filterOrders.length / postsPerPage);
  const { userDetails } = useAuth();
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrder();
        if (response.data.Status) {
          const orders =
            userDetails.role === "admin"
              ? response.data.Result
              : response.data.Result.filter(
                  (orders) => orders.user_id === userDetails.id
                );
          setOrders(orders);
          setFilterOrders(orders);
          const tourPromises = orders.map((order) =>
            axios.get(`${BASE_URL}/tours/tour/${order.tour_id}`)
          );
          const tourResponses = await Promise.all(tourPromises);
          const tourMap = {};
          const tourPrice = {};
          tourResponses.forEach((res) => {
            if (res.data.Status) {
              tourMap[res.data.Result.id] = res.data.Result.title;
              tourPrice[res.data.Result.id] = res.data.Result.price;
            }
          });
          setTours(tourMap);
          setTourPrice(tourPrice);
          // Fetch user details for each order
          const userPromises = response.data.Result.map((order) =>
            getUserID(order.user_id)
          );
          const userResponses = await Promise.all(userPromises);
          const userMap = {};
          const userPhone = {};
          userResponses.forEach((res) => {
            if (res.data.Status) {
              userMap[res.data.Result.id] = res.data.Result.full_name;
              userPhone[res.data.Result.id] = res.data.Result.phone_number;
            }
          });
          setUsers(userMap);
          setUserPhone(userPhone);
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
  useEffect(() => {
    getUsers()
      .then((userResult) => {
        if (userResult.data.Status) {
          setAllUsers(userResult.data.Result);
        } else {
          alert(userResult.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const handleDelete = (ordersId) => {
    deleteOrder(ordersId)
      .then((result) => {
        if (result.data.Status) {
          setOrders(orders.filter((c) => c.id !== ordersId));
          setFilterOrders(filterOrders.filter((c) => c.id !== ordersId));
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };
  const handleSearch = useCallback(() => {
    const authorSearchTerm = searchTerm.trim().toLowerCase();
    const fioSearchTerm = searchTerm1.toLowerCase();
    const regionSearchTerm = searchTerm3.toLowerCase();

    const filtered = orders.filter((order) => {
      const author = allUsers.find((auth) => auth.id === order.user_id);
      const matchesAuthor = author
        ? author.full_name.toLowerCase().includes(authorSearchTerm)
        : true;

      // const matchesFullName = order.quantity
      //   .toLowerCase()
      //   .includes(fioSearchTerm);

      if (userDetails && userDetails.role === "region") {
        // For users with "region" role, only show "district" and "user" roles
        if (order.role === "district" || order.role === "user") {
          return matchesAuthor && order.user_id === userDetails.user_id;
        }
        return false;
      }
      if (userDetails && userDetails.role === "district") {
        if (order.role === "user") {
          return matchesAuthor && order.user_id === userDetails.user_id;
        }
        return false;
      }

      // For other roles, return all matched users
      return matchesAuthor;
    });

    setFilterOrders(filtered);
  }, [orders, allUsers, searchTerm, searchTerm1, searchTerm3]);
  // const handleSave = (updatedOrder) => {
  //   if (updatedOrder && updatedOrder.id) {
  //     setOrders((prevUser) => {
  //       const updatedOrders = prevUser.map((order) =>
  //         order.id === updatedOrder.id ? updatedOrder : order
  //       );
  //       return updatedOrders;
  //     });

  //     setFilterOrders((prevFilteredPosts) => {
  //       const updatedFilteredPosts = prevFilteredPosts.map((order) =>
  //         order.id === updatedOrder.id ? updatedOrder : order
  //       );
  //       return updatedFilteredPosts;
  //     });
  //   }
  //   setEditMode(false);
  // };
  const handleView = (order) => {
    if (order) {
      setSelectedOrder(order);
      setEditMode(true);
    }
  };
  const handleCloseEditModal = () => {
    setEditMode(false);
    setSelectedOrder(null);
  };
  useEffect(() => {
    const debouncedSearch = debounce(() => {
      handleSearch();
    }, 300);
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [handleSearch]);

  return (
    <div className="container-fluid">
      {editMode ? (
        <OrderView
          order={selectedOrder}
          users={users}
          userPhone={userPhone}
          tourPrice={tourPrice}
          tours={tours}
          onClose={handleCloseEditModal} // Use onClose here
        />
      ) : (
        <>
          <h1>Buyurtmalar</h1>
          {error && <p className="text-danger">{error}</p>}

          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>
                  {" "}
                  <SearchItem
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    handleSearch={handleSearch}
                    placeholder="Xaridor"
                    style={{ width: "50%" }}
                  />
                </th>
                <th>Telefon raqam</th>
                <th>Maskan nomi</th>
                <th>Soni</th>
                <th>Narxi</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{users[order.user_id]}</td>
                  <td>{userPhone[order.user_id]}</td>
                  <td>{tours[order.tour_id]}</td>
                  <td>{order.quantity}</td>
                  <td>{tourPrice[order.tour_id]}</td>
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
                        onClick={() => handleView(order)}
                        className="btn btn-primary mx-3"
                      >
                        <i className="fas fa-eye"></i>
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

          <div className="gane-pagination mt-30 text-center">
            <ul>
              {[...Array(totalPages)].map((_, index) => (
                <li
                  key={index + 1}
                  className={currentPage === index + 1 ? "active" : ""}
                >
                  <span onClick={() => paginate(index + 1)}>{index + 1}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
