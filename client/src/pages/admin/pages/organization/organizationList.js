import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../../../http/usersApi";
import {
  deleteOrganization,
  getOrganizations,
} from "../../../../http/organizationApi";
import debounce from "lodash/debounce";
import OrganizationEdit from "./organizationEdit";
import { useAuth } from "../../../../context/AuthContext";
import SearchItem from "../../../../components/search-item/searchItem";

export default function OrganizationList() {
  const [organizations, setOrganizations] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // For title search
  const [searchTerm1, setSearchTerm1] = useState(""); // For category search
  const [searchTerm2, setSearchTerm2] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const navigate = useNavigate();
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
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
    getOrganizations()
      .then((result) => {
        if (result.data.Status) {
          setOrganizations(result.data.Result);
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
          setOrganizations(organizations.filter((org) => org.id !== id));
          setFilteredPosts(filteredPosts.filter((org) => org.id !== id));
        }
      })
      .catch((error) => console.error("Error deleting organization:", error));
  };

  const handleEdit = (organization) => {
    setSelectedOrganization(organization);
    setShowEditModal(true);
  };
  const handleSearch = useCallback(() => {
    const innSearchTerm = searchTerm.trim().toLowerCase();
    const orgSearchTerm = searchTerm1.trim().toLowerCase();
    const phoneSearchTerm = searchTerm2.trim().toLowerCase();

    const filtered = organizations.filter((post) => {
      const matchesInn = post.inn_pinfl.toLowerCase().includes(innSearchTerm);
      const matchesOrg = post.org_name.toLowerCase().includes(orgSearchTerm);
      const matchesPhone = post.phone.toLowerCase().includes(phoneSearchTerm);

      if (userDetails) {
        if (userDetails.role === "region") {
          return (
            matchesInn &&
            matchesOrg &&
            matchesPhone &&
            post.region_id === userDetails.region_id
          );
        }
        if (userDetails.role === "district") {
          return (
            matchesInn &&
            matchesOrg &&
            matchesPhone &&
            post.district_id === userDetails.district_id
          );
        }
        if (userDetails.role === "user") {
          return (
            matchesInn &&
            matchesOrg &&
            matchesPhone &&
            post.user_id === userDetails.user_id
          );
        }
      }
      return matchesInn && matchesOrg && matchesPhone;
    });
    setFilteredPosts(filtered);
  }, [organizations, searchTerm, searchTerm1, searchTerm2, userDetails]);

  const handleSave = (updatedAdobe) => {
    if (updatedAdobe && updatedAdobe.id) {
      setOrganizations((prevOrganization) => {
        const updatedOrganization = prevOrganization.map((organization) =>
          organization.id === updatedAdobe.id ? updatedAdobe : organization
        );
        return updatedOrganization;
      });

      setFilteredPosts((prevFilteredPosts) => {
        const updatedFilteredPosts = prevFilteredPosts.map((adobe) =>
          adobe.id === updatedAdobe.id ? updatedAdobe : adobe
        );
        return updatedFilteredPosts;
      });
    }
    setShowEditModal(false);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setSelectedOrganization(null);
  };

  useEffect(() => {
    const debouncedSearch = debounce(() => {
      handleSearch();
    }, 300);
    debouncedSearch();
    // Cleanup function to cancel debounce on component unmount
    return () => {
      debouncedSearch.cancel();
    };
  }, [handleSearch]);

  return (
    <div className="container-fluid px-4">
      {showEditModal ? (
        <OrganizationEdit
          organization={selectedOrganization}
          onSave={handleSave}
          onCancel={handleCloseModal}
        />
      ) : (
        <>
          <h2 className="mt-4">Tashkilotlar ro'yhati</h2>
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th className="text-light">ID</th>
                <th className="text-light">
                  <SearchItem
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    handleSearch={handleSearch}
                    placeholder="INN/PINFL"
                    style={{ width: "50%" }}
                  />
                </th>
                <th className="text-light">
                  <SearchItem
                    searchTerm={searchTerm1}
                    setSearchTerm={setSearchTerm1}
                    handleSearch={handleSearch}
                    placeholder="Tashkilot nomi"
                    style={{ width: "50%" }}
                  />
                </th>
                <th className="text-light">Direktor</th>
                <th className="text-light">
                  <SearchItem
                    searchTerm={searchTerm2}
                    setSearchTerm={setSearchTerm2}
                    handleSearch={handleSearch}
                    placeholder="Telefon"
                    style={{ width: "50%" }}
                  />
                </th>
                <th className="text-light">Manzil</th>
                <th className="text-light">Foydalanuvchi</th>
                <th className="text-light">Holati</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((c, index) => (
                <tr key={c.id}>
                  <td>{index + 1}</td>
                  <td>{c.inn_pinfl}</td>
                  <td>{c.org_name}</td>
                  <td>{c.director_name}</td>
                  <td>{c.phone}</td>
                  <td>{c.address}</td>
                  <td>
                    {authors.find((author) => author.id === c.user_id)
                      ?.full_name || "Unknown Author"}
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
