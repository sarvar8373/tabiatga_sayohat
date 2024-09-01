import React, { useEffect, useState } from "react";
import { getRegions, getSelectRegion } from "../../../../http/usersApi";
import { postTour } from "../../../../http/adobeApi";
import { useAuth } from "../../../../context/AuthContext";
import { getTourService } from "../../../../http/tourServices";

const Adobe = () => {
  const [tourServices, setTourServices] = useState([]);
  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tour_type: "",
    price: "",
    price_description: "",
    country: "",
    status: "0",
    tourism_service_id: "", // Use string to match select values
  });
  const [images, setImages] = useState([]); // Change to handle multiple images
  const { userDetails } = useAuth();

  useEffect(() => {
    // Fetch regions
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
    // Fetch tour services
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
    if (selectedRegion) {
      // Fetch districts based on selected region
      getSelectRegion(selectedRegion)
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
    } else {
      // Reset districts if no region is selected
      setDistricts([]);
    }
  }, [selectedRegion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setImages([...e.target.files]); // Use spread operator to handle multiple files
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    images.forEach((file) => data.append("images", file)); // Append all images
    data.append("price", formData.price);
    data.append("price_description", formData.price_description);
    data.append("tour_type", formData.tour_type);
    data.append("country", formData.country);
    data.append("region_id", selectedRegion);
    data.append("district_id", selectedDistrict);
    data.append("status", formData.status);
    data.append("user_id", userDetails.id);
    data.append("tourism_service_id", formData.tourism_service_id);

    postTour(data)
      .then((response) => {
        if (response.data.Status) {
          alert("Maskanlar qo'shildi");
          setFormData({
            title: "",
            description: "",
            price: "",
            price_description: "",
            tourism_service_id: "",
            country: "",
            status: "0",
            user_id: userDetails.id, // Reset to default value
          });
          setSelectedRegion("");
          setSelectedDistrict("");
          setImages([]); // Reset images
        } else {
          setError(response.data.Error || "Error adding tour.");
        }
      })
      .catch((error) => {
        setError("Error adding tour.");
        console.error("Error adding tour:", error);
      });
  };

  return (
    <div className="container-fluid px-4">
      <h2 className="mt-4">Maskan qo'shish</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="login-form">
        <form className="gane-form" onSubmit={handleSubmit}>
          {/* Form fields remain unchanged */}
          <div className="single-field">
            <label htmlFor="title">Sarlavha</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="single-field">
            <label htmlFor="description">Ma'lumot</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="single-field">
            <label htmlFor="tourism_service_id">Maskan turi</label>
            <select
              id="tourism_service_id"
              name="tourism_service_id"
              value={formData.tourism_service_id}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">Faoliyat turi</option>
              {tourServices.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>
          <div className="single-field">
            <label htmlFor="price">Narxi</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div className="single-field">
            <label htmlFor="price_description">Necha kishi</label>
            <input
              type="text"
              name="price_description"
              value={formData.price_description}
              onChange={handleChange}
            />
          </div>
          <div className="single-field">
            <label htmlFor="region">Viloyat</label>
            <select
              id="region"
              name="region_id"
              value={selectedRegion}
              onChange={(e) => {
                setSelectedRegion(e.target.value);
                handleChange(e);
              }}
              className="form-control"
            >
              <option value="">Viloyatni tanlang</option>
              {regions.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.name}
                </option>
              ))}
            </select>
          </div>
          <div className="single-field">
            <label htmlFor="district">Tuman</label>
            <select
              id="district"
              name="district_id"
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                handleChange(e);
              }}
              className="form-control"
              disabled={!selectedRegion}
            >
              <option value="">Tumanni tanlang</option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>
          {userDetails.role === "admin" && (
            <div className="single-field">
              <label htmlFor="status">Holati</label>
              <select
                id="status"
                name="status"
                className="form-control"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="0">Tasdiqlanmagan</option>
                <option value="1">Tasdiqlangan</option>
              </select>
            </div>
          )}
          <div className="my-3">
            <input
              className="lh-0"
              type="file"
              name="images"
              onChange={handleFileChange}
              multiple // Allow multiple file uploads
            />
          </div>
          <button className="btn btn-success px-3" type="submit">
            Yaratish
          </button>
        </form>
      </div>
    </div>
  );
};

export default Adobe;
