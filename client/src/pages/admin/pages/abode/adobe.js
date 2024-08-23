import React, { useEffect, useState } from "react";
import { getRegions, getSelectRegion } from "../../../../http/usersApi";
import { postTour } from "../../../../http/adobeApi";

const Adobe = () => {
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
    status: 0,
  });
  const [image, setImage] = useState(null);

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
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    if (image) data.append("image", image);
    data.append("price", formData.price);
    data.append("price_description", formData.price_description);
    data.append("tour_type", formData.tour_type);
    data.append("country", formData.country);
    data.append("region_id", selectedRegion); // Use selectedRegion here
    data.append("district_id", selectedDistrict); // Use selectedDistrict here
    data.append("status", formData.status);

    postTour(data)
      .then((response) => {
        if (response.data.Status) {
          alert("Tour added successfully");
          setFormData({
            title: "",
            description: "",
            price: "",
            price_description: "",
            tour_type: "",
            country: "",
            status: "",
          });
          setSelectedRegion("");
          setSelectedDistrict("");
          setImage(null);
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
      <div className="login-form">
        <form className="gane-form" onSubmit={handleSubmit}>
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
            <label htmlFor="tour_type">Maskan turi</label>
            <input
              type="text"
              name="tour_type"
              value={formData.tour_type}
              onChange={handleChange}
            />
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
          <div className="my-3">
            <input
              className="lh-0"
              type="file"
              name="image"
              onChange={handleFileChange}
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
