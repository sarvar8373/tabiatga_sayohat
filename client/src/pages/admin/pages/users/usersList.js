import React, { useEffect, useState, useCallback } from "react";
import EditUserForm from "./userEdit";
import SearchItem from "../../../../components/search-item/searchItem";
import debounce from "lodash/debounce";
import {
  deleteUser,
  getDistricts,
  getRegions,
  getUsers,
  putUser,
} from "../../../../http/usersApi";
import { useAuth } from "../../../../context/AuthContext";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [error, setError] = useState("");
  const [editUser, setEditUser] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // For phone search
  const [searchTerm1, setSearchTerm1] = useState(""); // For full name search
  const [searchTerm3, setSearchTerm3] = useState(""); // For region search
  const [searchTerm4, setSearchTerm4] = useState(""); // For district search
  const { userDetails } = useAuth(); // For storing current user

  const roleLabels = {
    customer: "Foydalanuvchi",
    admin: "Departament",
    user: "Tadbirkor",
    region: "Viloyat",
    district: "Tuman",
  };

  // Fetch regions
  useEffect(() => {
    getRegions()
      .then((response) => {
        if (response.data.Status) {
          setRegions(response.data.Result);
        } else {
          setError(response.data.Error);
        }
      })
      .catch((err) => {
        setError("Error fetching regions.");
        console.error(err);
      });
  }, []);

  // Fetch districts
  useEffect(() => {
    getDistricts()
      .then((response) => {
        if (response.data.Status) {
          setDistricts(response.data.Result);
        } else {
          setError(response.data.Error);
        }
      })
      .catch((err) => {
        setError("Error fetching districts.");
        console.error(err);
      });
  }, []);

  // Fetch users
  useEffect(() => {
    getUsers()
      .then((result) => {
        if (result.data.Status) {
          setUsers(result.data.Result);
          setFilteredUsers(result.data.Result);
        } else {
          setError(result.data.Error);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching users.");
      });
  }, []);

  // Memoize handleSearch function
  const handleSearch = useCallback(() => {
    const phoneSearchTerm = searchTerm.trim().toLowerCase();
    const fioSearchTerm = searchTerm1.toLowerCase();
    const regionSearchTerm = searchTerm3.toLowerCase();
    const districtSearchTerm = searchTerm4.toLowerCase();

    const filtered = users.filter((user) => {
      const matchesPhone = user.phone_number
        .toLowerCase()
        .includes(phoneSearchTerm);

      const matchesFullName = user.full_name
        .toLowerCase()
        .includes(fioSearchTerm);

      const region = regions.find((r) => r.id === user.region_id);
      const matchesRegion = region
        ? region.name.toLowerCase().includes(regionSearchTerm)
        : true;

      const district = districts.find((d) => d.id === user.district_id);
      const matchesDistrict = district
        ? district.name.toLowerCase().includes(districtSearchTerm)
        : true;

      if (userDetails && userDetails.role === "region") {
        // For users with "region" role, only show "district" and "user" roles
        if (user.role === "district" || user.role === "user") {
          return (
            matchesPhone &&
            matchesFullName &&
            matchesRegion &&
            matchesDistrict &&
            user.region_id === userDetails.region_id
          );
        }
        return false; // Exclude users with other roles
      }
      if (userDetails && userDetails.role === "district") {
        // For users with "region" role, only show "district" and "user" roles
        if (user.role === "user") {
          return (
            matchesPhone &&
            matchesFullName &&
            matchesRegion &&
            matchesDistrict &&
            user.region_id === userDetails.region_id
          );
        }
        return false; // Exclude users with other roles
      }

      // For other roles, return all matched users
      return (
        matchesPhone && matchesFullName && matchesRegion && matchesDistrict
      );
    });

    setFilteredUsers(filtered);
  }, [
    users,
    regions,
    districts,
    searchTerm,
    searchTerm1,
    searchTerm3,
    searchTerm4,
    userDetails,
  ]);

  // Debounce search function
  useEffect(() => {
    const debouncedSearch = debounce(() => {
      handleSearch();
    }, 300);
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [handleSearch]);

  const handleDelete = (userID) => {
    deleteUser(userID)
      .then((result) => {
        if (result.data.Status) {
          setUsers(users.filter((user) => user.id !== userID));
        } else {
          setError(result.data.Error);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Error deleting user.");
      });
  };

  const handleEdit = (user) => {
    setEditUser(user);
  };

  const handleEditSubmit = (updatedUser) => {
    putUser(updatedUser.id, updatedUser)
      .then((result) => {
        if (result.data.Status) {
          setUsers(
            users.map((user) =>
              user.id === updatedUser.id ? updatedUser : user
            )
          );
          setEditUser(null);
        } else {
          setError(result.data.Error);
          alert(error);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Error updating user.");
      });
  };

  const getRegionName = (id) => {
    const region = regions.find((r) => r.id === id);
    return region ? region.name : "";
  };

  const getDistrictName = (id) => {
    const district = districts.find((d) => d.id === id);
    return district ? district.name : "";
  };

  return (
    <div className="container-fluid px-4">
      <h2 className="mt-4">Foydalanuvchilar</h2>
      <table className="table table-striped">
        <thead className="bg-dark">
          <tr>
            <th className="text-light">ID</th>
            <th className="text-light">
              {" "}
              <SearchItem
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSearch={handleSearch}
                placeholder="Telefon raqam"
                style={{ width: "50%" }}
              />
            </th>
            <th className="text-light">
              <SearchItem
                searchTerm={searchTerm1}
                setSearchTerm={setSearchTerm1}
                handleSearch={handleSearch}
                placeholder="FIO"
                style={{ width: "50%" }}
              />
            </th>
            <th className="text-light">
              <SearchItem
                searchTerm={searchTerm3}
                setSearchTerm={setSearchTerm3}
                handleSearch={handleSearch}
                placeholder="Viloyat"
                style={{ width: "50%" }}
              />
            </th>
            <th className="text-light">
              <SearchItem
                searchTerm={searchTerm4}
                setSearchTerm={setSearchTerm4}
                handleSearch={handleSearch}
                placeholder="Tuman"
                style={{ width: "50%" }}
              />
            </th>
            <th className="text-light">Roli</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((c, index) => (
            <tr key={c.id}>
              <td>{index + 1}</td>
              <td>{c.phone_number}</td>
              <td>{c.full_name}</td>
              <td>{getRegionName(c.region_id)}</td>
              <td>{getDistrictName(c.district_id)}</td>
              <td className="d-flex justify-content-between">
                {roleLabels[c.role] || "Unknown"}
                <div>
                  {c.role === "admin" ? (
                    <button
                      onClick={() => handleEdit(c)}
                      className="btn btn-warning mx-3"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                  ) : (
                    <div>
                      <button
                        onClick={() => handleEdit(c)}
                        className="btn btn-warning mx-3"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="btn btn-danger"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editUser && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: "block" }}
          aria-labelledby="editUserModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editUserModalLabel">
                  O'zgartirish
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditUser(null)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <EditUserForm user={editUser} onSubmit={handleEditSubmit} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
