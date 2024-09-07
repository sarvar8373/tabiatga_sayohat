import React, { useEffect, useState } from "react";
import { postOrganization } from "../../../../http/organizationApi";
import {
  getRegions,
  getSelectRegion,
  getUsers,
} from "../../../../http/usersApi";
import { useAuth } from "../../../../context/AuthContext";
import { postNotification } from "../../../../http/notificationApi";
import Select from "react-select";
import { getTourService } from "../../../../http/tourServices";

export default function OrganizationAdd() {
  const [regions, setRegions] = useState([]);
  const { userDetails } = useAuth();
  const [districts, setDistricts] = useState([]);
  const [error, setError] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [filteredRegions, setFilteredRegions] = useState([]);
  const [tourServices, setTourServices] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [formData, setFormData] = useState({
    inn_pinfl: "",
    org_name: "",
    address: "",
    phone: userDetails.phone_number || "",
    mfo: "",
    region_id: userDetails.region_id || "",
    district_id: userDetails.district_id || "",
    director_name: "",
    excise_tax: [],
    notification_id: "",
    user_id: "",
    status: "0",
  });

  const [authors, setAuthors] = useState([]);

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
    if (userDetails.role === "region" && userDetails.region_id) {
      setFilteredRegions(
        regions.filter((region) => region.id === userDetails.region_id)
      );
      setSelectedRegion(userDetails.region_id);
      setSelectedDistrict("");
      setDistricts([]);
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
  const handleSelectChange = (selectedOptions) => {
    setFormData((prevData) => ({
      ...prevData,
      excise_tax: selectedOptions
        ? selectedOptions.map((option) => option.value)
        : [],
    }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const notificationResponse = await postNotification({
        user_id: formData.user_id,
        message: `Tashkilot: ${formData.org_name}`,
        type: formData.status,
      });

      const notificationId = notificationResponse.data.Result;
      console.log("Notification ID:", notificationId);

      if (!notificationId) {
        throw new Error("Failed to retrieve notification ID.");
      }

      const response = await postOrganization({
        ...formData,
        notification_id: notificationId, // Ensure this is passed correctly
      });

      if (response.data.Status) {
        alert("Tashkilot qo'shildi!");
        setFormData({
          inn_pinfl: "",
          org_name: "",
          address: "",
          phone: userDetails.phone_number || "",
          mfo: "",
          region_id: userDetails.region_id || "",
          district_id: userDetails.district_id || "",
          director_name: "",
          excise_tax: [],
          notification_id: "",
          user_id: "",
          status: "0",
        });
      } else {
        alert("Failed to add organization: " + response.data.Error);
      }
    } catch (error) {
      console.error("Error adding organization:", error);
      alert("Error adding organization. Please try again.");
    }
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
      <h2 className="mt-4">Tashkilot qo'shish</h2>
      {/* Display the message */}
      {/* {message && (
<div className={`alert alert-${status}`} role="alert">
  {message}
</div>
)} */}
      <div className="login-form">
        <form
          className="gane-form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="form-left">
            <div className="single-field half-field">
              <input
                type="text"
                name="inn_pinfl"
                placeholder="INN/PINFL *"
                value={formData.inn_pinfl}
                onChange={handleChange}
                required
              />
            </div>
            <div className="single-field half-field-last">
              <input
                type="text"
                name="org_name"
                placeholder="Tashkilot nomi *"
                value={formData.org_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="single-field half-field-last">
              <input
                type="text"
                name="address"
                placeholder="Manzil"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="single-field half-field">
              <input
                type="text"
                name="phone"
                placeholder="Telefon"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="single-field half-field">
              <input
                type="text"
                name="mfo"
                placeholder="MFO"
                value={formData.mfo}
                onChange={handleChange}
              />
            </div>
            <div className="single-field half-field-last">
              <select
                id="region"
                name="region_id"
                value={formData.region_id}
                onChange={(e) => {
                  setSelectedRegion(e.target.value);
                  handleChange(e);
                }}
                className="form-control"
                style={{ fontSize: "15px" }}
              >
                <option value="">Viloyatni tanlang</option>
                {filteredRegions.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="single-field half-field-last">
              <select
                id="district"
                name="district_id"
                value={formData.district_id}
                onChange={(e) => {
                  setSelectedDistrict(e.target.value);
                  handleChange(e);
                }}
                className="form-control my-3"
                style={{ fontSize: "15px" }}
                disabled={!selectedRegion}
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
            <div className="single-field half-field">
              <input
                type="text"
                name="director_name"
                placeholder="Direktor FIO"
                value={formData.director_name}
                onChange={handleChange}
              />
            </div>
            <div className="single-field half-field-last">
              <Select
                id="excise_tax"
                name="excise_tax"
                placeholder="Faoliyatni tanglang"
                value={options.filter((option) =>
                  formData.excise_tax.includes(option.value)
                )}
                onChange={handleSelectChange}
                options={options}
                isMulti
                className="form-control"
              />
            </div>
            {userDetails.role === "admin" && (
              <div className="single-field half-field">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Foydalanucvchi
                </label>
                <select
                  className="form-select "
                  aria-label="Default select example"
                  name="user_id" // Add name attribute here
                  onChange={handleChange}
                  value={formData.user_id} // Set value to control the selected option
                >
                  <option value="">Tadbirkorni tanlang</option>
                  {authors.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.full_name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {userDetails.role === "admin" && (
              <div className="single-field half-field-last">
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
                  <option value="1">Tasdiqlandi</option>
                </select>
              </div>
            )}
            <div className="single-field ">
              <button className="btn btn-success px-3 mt-5" type="submit">
                Yaratish
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
