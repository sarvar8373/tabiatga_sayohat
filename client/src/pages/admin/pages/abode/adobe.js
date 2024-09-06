import React, { useEffect, useState } from "react";
import { getRegions, getSelectRegion } from "../../../../http/usersApi";
import { postTour } from "../../../../http/adobeApi";
import { useAuth } from "../../../../context/AuthContext";
import { getTourService } from "../../../../http/tourServices";
import { postNotification } from "../../../../http/notificationApi";
import Select from "react-select";
const Adobe = () => {
  const [tourServices, setTourServices] = useState([]);
  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [filteredRegions, setFilteredRegions] = useState([]);
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
    notification_id: "",
    tourism_service_id: [], // Use string to match select values
  });
  const [images, setImages] = useState([]); // Change to handle multiple images
  const { userDetails } = useAuth();

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

  // Fetch tour services
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

  // Filter regions and set districts based on user role
  useEffect(() => {
    if (userDetails.role === "region" && userDetails.region_id) {
      setFilteredRegions(
        regions.filter((region) => region.id === userDetails.region_id)
      );

      setDistricts([]);
      setSelectedRegion("");
      setSelectedDistrict("");
    } else if (
      userDetails.role === "district" &&
      userDetails.region_id &&
      userDetails.district_id
    ) {
      setFilteredRegions(
        regions.filter((region) => region.id === userDetails.region_id)
      );

      if (regions.length > 0) {
        getSelectRegion(userDetails.region_id)
          .then((response) => {
            if (response.data.Status) {
              // Filter to show only the district that matches the user's district_id
              const filteredDistricts = response.data.Result.filter(
                (district) => district.id === userDetails.district_id
              );
              setDistricts(filteredDistricts);
              setSelectedRegion(userDetails.region_id);
              setSelectedDistrict(userDetails.district_id);
            } else {
              setError(response.data.Error);
            }
          })
          .catch((err) => {
            setError("Error fetching districts.");
            console.error(err);
          });
      }
    } else {
      setFilteredRegions(regions);
      setDistricts([]);
      setSelectedRegion("");
      setSelectedDistrict("");
    }
  }, [regions, userDetails]);

  // Fetch districts based on selected region
  useEffect(() => {
    if (selectedRegion) {
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
      setDistricts([]);
    }
  }, [selectedRegion]);

  const handleChange = (e) => {
    if (e && e.target) {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSelectChange = (selectedOptions) => {
    setFormData((prevData) => ({
      ...prevData,
      tourism_service_id: selectedOptions
        ? selectedOptions.map((option) => option.value)
        : [],
    }));
  };

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const notification = {
      user_id: userDetails.id,
      message: `Maskan: ${formData.title}`,
      type: formData.status,
    };

    // Post notification and get notification_id
    postNotification(notification)
      .then((notificationResponse) => {
        const notificationId = notificationResponse.data.Result; // Adjust according to your API response
        console.log("Notification ID:", notificationId);

        // Check if notificationId is valid
        if (!notificationId) {
          throw new Error("Failed to retrieve notification ID.");
        }

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
        data.append("notification_id", notificationId); // Include notification_id

        return postTour(data);
      })
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
            notification_id: "",
            user_id: userDetails.id,
          });
          setSelectedRegion("");
          setSelectedDistrict("");
          setImages([]);
        } else {
          setError(response.data.Error || "Error adding tour.");
        }
      })
      .catch((error) => {
        setError(error.message || "Error adding tour.");
        console.error("Error:", error);
      });
  };
  const formatOptions = (services) => {
    return services.map((service) => ({
      value: service.id,
      label: service.name,
    }));
  };

  const options = formatOptions(tourServices);

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
            <label htmlFor="tourism_service_id">Faoliyat turi</label>
            <Select
              id="tourism_service_id"
              name="tourism_service_id"
              placeholder="Faoliyatni tanglang"
              value={options.filter((option) =>
                formData.tourism_service_id.includes(option.value)
              )}
              onChange={handleSelectChange}
              options={options}
              isMulti
              className="form-control"
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
              {filteredRegions.map((region) => (
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
              disabled={
                userDetails.role === "district" ? true : !selectedRegion
              }
            >
              <option value="">Tumanni tanlang</option>
              {districts.length > 0 ? (
                districts.map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.name}
                  </option>
                ))
              ) : (
                <option value="">Tumman topilmadi</option>
              )}
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
                <option value="0">Jarayonda</option>
                <option value="2">Bekor qilish</option>
                <option value="3">Qayta yuborish</option>
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
