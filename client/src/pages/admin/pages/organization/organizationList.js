import React, { useEffect, useState } from "react";
import EditOrganization from "./organizationEdit"; // Import the EditOrganization component
import { getUsers } from "../../../../http/usersApi";
import {
  deleteOrganization,
  getOrganizations,
  putOrganization,
} from "../../../../http/organizationApi";

export default function OrganizationList() {
  const [organization, setOrganization] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

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
    getOrganizations()
      .then((result) => {
        if (result.data.Status) {
          setOrganization(result.data.Result);
          setFilteredPosts(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    deleteOrganization(id)
      .then((response) => {
        if (response.data.Status) {
          setOrganization(organization.filter((org) => org.id !== id));
          setFilteredPosts(filteredPosts.filter((org) => org.id !== id));
        }
      })
      .catch((error) => console.error("Error deleting organization:", error));
  };

  const handleEdit = (org) => {
    setSelectedOrganization(org);
    setShowEditModal(true);
  };

  const handleEditSubmit = (updatedOrganization) => {
    putOrganization(updatedOrganization.id, updatedOrganization)
      .then((result) => {
        if (result.data.Status) {
          setOrganization(
            organization.map((org) =>
              org.id === updatedOrganization.id
                ? { ...org, ...updatedOrganization }
                : org
            )
          );
          setFilteredPosts(
            filteredPosts.map((org) =>
              org.id === updatedOrganization.id
                ? { ...org, ...updatedOrganization }
                : org
            )
          );
          setShowEditModal(false);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setSelectedOrganization(null);
  };

  return (
    <div className="container-fluid px-4">
      <h2 className="mt-4">Tashkilotlar ro'yhati</h2>
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th className="text-light">ID</th>
            <th className="text-light">INN/PINFL</th>
            <th className="text-light">Tashkilot nomi</th>
            <th className="text-light">Direktor</th>
            <th className="text-light">Telefon</th>
            <th className="text-light">Manzil</th>
            <th className="text-light">Foydalanuvchi</th>
            <th className="text-light">Holati</th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts.map((c, index) => (
            <tr key={c.id}>
              <td>{index + 1}</td>
              <td>{c.inn_pinfl}</td>
              <td>{c.org_name}</td>
              <td>{c.director_name}</td>
              <td>{c.phone}</td>
              <td>{c.address}</td>
              <td>
                {authors.find((author) => author.id === c.user_id)?.full_name ||
                  "Unknown Author"}
              </td>
              <td className="d-flex justify-content-between">
                <div>
                  {c.status === "0" || c.status === 0 ? (
                    <button className="btn btn-danger" disabled>
                      Tasdiqlanmagan
                    </button>
                  ) : (
                    <button className="btn btn-success" disabled>
                      Tasdiqlangan
                    </button>
                  )}
                </div>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
