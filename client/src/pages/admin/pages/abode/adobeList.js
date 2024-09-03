import React, { useCallback, useEffect, useState } from "react";
import { BASE_URL } from "../../../../api/host/host";
import AdobeEdit from "./adobeEdit";
import debounce from "lodash/debounce";
import SearchItem from "../../../../components/search-item/searchItem";
import { getDistricts, getRegions } from "../../../../http/usersApi";
import { deleteTours, getTours } from "../../../../http/adobeApi";
import { useAuth } from "../../../../context/AuthContext";
import { getTourService } from "../../../../http/tourServices";

export default function AdobeList() {
  const [tours, setTours] = useState([]);
  const [error, setError] = useState("");
  const [tourServices, setTourServices] = useState([]);
  const [regions, setRegions] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // For title search
  const [searchTerm1, setSearchTerm1] = useState(""); // For region search
  const [searchTerm2, setSearchTerm2] = useState(""); // For price search
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [selectedAdobe, setSelectedAdobe] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [districts, setDistricts] = useState([]);
  const { userDetails } = useAuth();
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

  useEffect(() => {
    getTourService()
      .then((response) => {
        if (response.data.Status) {
          setTourServices(response.data.Result);
        } else {
          setError(response.data.Error);
        }
      })
      .catch((err) => {
        setError("Error fetching tour services.");
        console.error(err);
      });
  }, []);

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

  useEffect(() => {
    getTours()
      .then((response) => {
        if (response.data.Status) {
          setTours(response.data.Result);
          setFilteredPosts(response.data.Result);
        } else {
          setError(response.data.Error);
        }
      })
      .catch((error) => console.error("Error fetching tours:", error));
  }, []);

  const handleDelete = (id) => {
    deleteTours(id)
      .then((response) => {
        if (response.data.Status) {
          setTours(tours.filter((tour) => tour.id !== id));
          setFilteredPosts(filteredPosts.filter((p) => p.id !== id));
        }
      })
      .catch((error) => console.error("Error deleting tour:", error));
  };

  const getRegionName = (id) => {
    const region = regions.find((r) => r.id === id);
    return region ? region.name : "";
  };

  const getDistrictName = (id) => {
    const district = districts.find((d) => d.id === id);
    return district ? district.name : "";
  };

  const handleEdit = (adobe) => {
    if (adobe) {
      setSelectedAdobe(adobe);
      setEditMode(true);
    }
  };

  const handleSearch = useCallback(() => {
    const titleSearchTerm = searchTerm.trim().toLowerCase();
    const regionSearchTerm = searchTerm1.trim().toLowerCase();
    const priceSearchTerm = searchTerm2.trim().toLowerCase();

    const filtered = tours.filter((post) => {
      const matchesTitle = post.title.toLowerCase().includes(titleSearchTerm);
      const region = regions.find((cat) => cat.id === post.region_id);
      const matchesRegion = region
        ? region.name.toLowerCase().includes(regionSearchTerm)
        : true;
      const matchesPrice = post.price.toLowerCase().includes(priceSearchTerm);

      if (userDetails) {
        if (userDetails.role === "region") {
          return (
            matchesTitle &&
            matchesRegion &&
            matchesPrice &&
            post.region_id === userDetails.region_id
          );
        }
        if (userDetails.role === "district") {
          return (
            matchesTitle &&
            matchesRegion &&
            matchesPrice &&
            post.district_id === userDetails.district_id
          );
        }
        if (userDetails.role === "user") {
          return (
            matchesTitle &&
            matchesRegion &&
            matchesPrice &&
            post.user_id === userDetails.user_id
          );
        }
      }
      return matchesTitle && matchesRegion && matchesPrice;
    });
    setFilteredPosts(filtered);
  }, [regions, tours, searchTerm, searchTerm1, searchTerm2, userDetails]);

  const handleSave = (updatedAdobe) => {
    if (updatedAdobe && updatedAdobe.id) {
      setTours((prevTours) => {
        const updatedTours = prevTours.map((tour) =>
          tour.id === updatedAdobe.id ? updatedAdobe : tour
        );
        return updatedTours;
      });

      setFilteredPosts((prevFilteredPosts) => {
        const updatedFilteredPosts = prevFilteredPosts.map((adobe) =>
          adobe.id === updatedAdobe.id ? updatedAdobe : adobe
        );
        return updatedFilteredPosts;
      });
    }
    setEditMode(false);
  };

  useEffect(() => {
    const debouncedSearch = debounce(() => {
      handleSearch();
    });
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [handleSearch]);

  return (
    <div className="container-fluid px-4">
      {editMode ? (
        <AdobeEdit
          adobe={selectedAdobe}
          tourServices={tourServices}
          regions={regions}
          districts={districts}
          onSave={handleSave}
          onCancel={() => setEditMode(false)}
        />
      ) : (
        <>
          <h2 className="mt-4">Maskanlar</h2>
          <table className="table table-striped" variant="dark">
            <thead className="table-dark">
              <tr>
                <th className="text-light">ID</th>
                <th className="text-light">
                  <SearchItem
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    handleSearch={handleSearch}
                    placeholder="Nomi"
                    style={{ width: "50%" }}
                  />
                </th>
                <th className="text-light">
                  <SearchItem
                    searchTerm={searchTerm1}
                    setSearchTerm={setSearchTerm1}
                    handleSearch={handleSearch}
                    placeholder="Viloyat"
                    style={{ width: "50%" }}
                  />
                </th>
                <th className="text-light">
                  <SearchItem
                    searchTerm={searchTerm2}
                    setSearchTerm={setSearchTerm2}
                    handleSearch={handleSearch}
                    placeholder="Narxi"
                    style={{ width: "50%" }}
                  />
                </th>
                <th className="text-light">Holati</th>
                <th className="text-light">Rasmlar</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((c, index) => (
                <tr key={c.id}>
                  <td>{index + 1}</td>
                  <td>{c.title}</td>
                  <td>{getRegionName(c.region_id)}</td>
                  <td>{c.price}</td>
                  <td>
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
                  </td>
                  <td className="d-flex justify-content-between align-items-center">
                    {c.images && c.images.split(",")[0] && (
                      <img
                        src={`${BASE_URL}/uploads/${c.images.split(",")[0]}`}
                        alt={c.title}
                        width="100"
                        className="mx-2"
                      />
                    )}
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
