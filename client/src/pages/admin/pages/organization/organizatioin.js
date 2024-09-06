import React, { useEffect, useState } from "react";
import {
  postOrganization,
  getOrganization,
} from "../../../../http/organizationApi";
import {
  getRegions,
  getSelectRegion,
  getUsers,
} from "../../../../http/usersApi";
import { useAuth } from "../../../../context/AuthContext";
import { postNotification } from "../../../../http/notificationApi";
import { getTourService } from "../../../../http/tourServices";
import Select from "react-select";

export default function Organization() {
  const { userDetails } = useAuth();
  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [error, setError] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [filteredRegions, setFilteredRegions] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [authors, setAuthors] = useState([]);
  const [tourServices, setTourServices] = useState([]);
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    inn_pinfl: "",
    org_name: "",
    reg_code_nds: "",
    address: "",
    phone: "",
    main_rc: "",
    mfo: "",
    region_id: "",
    district_id: "",
    oked: "",
    director_name: "",
    director_pinfl: "",
    chief_accountant: "",
    goods_issued_by: "",
    excise_tax: [],
    notification_id: "",
    user_id: userDetails.id,
    status: "0",
  });
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
  useEffect(() => {
    // Fetch users for author dropdown
    getUsers()
      .then((userResult) => {
        if (userResult.data.Status) {
          setAuthors(userResult.data.Result);
        } else {
          alert(userResult.data.Error);
        }
      })
      .catch((err) => console.log(err));

    // Fetch organization data for the user
    getOrganization(userDetails.id)
      .then((orgResult) => {
        if (orgResult.data.Status && orgResult.data.Result.length > 0) {
          setFormData((prevData) => ({
            ...prevData,
            ...orgResult.data.Result[0], // Assuming one result per user
          }));
          setSaved(true); // Set saved to true if data is loaded
        }
      })
      .catch((err) => console.log(err));
  }, [userDetails.id]);

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

      const response = await postOrganization({
        ...formData,
        notification_id: notificationId, // Ensure this is passed correctly
      });
      if (response.data.Status) {
        alert("Tashkilot qo'shildi!");
        setSaved(true);
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
      <div className="login-form">
        {formData.status === "0" || formData.status === 0 ? (
          <button className="btn btn-danger" disabled>
            Tasdiqlanmagan
          </button>
        ) : (
          <button className="btn btn-success" disabled>
            Tasdiqlangan
          </button>
        )}
        <form
          className="gane-form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="form-left">
            <div className="single-field half-field">
              <label htmlFor="inn_pinfl" className="mb-2">
                INN/PINFL
              </label>
              <input
                type="number"
                maxLength="14"
                name="inn_pinfl"
                placeholder="INN/PINFL *"
                value={formData.inn_pinfl || ""}
                onChange={handleChange}
                disabled={saved}
                required
              />
            </div>
            <div className="single-field half-field-last">
              <label htmlFor="org_name" className="mb-2">
                Tashkilot nomi
              </label>
              <input
                type="text"
                name="org_name"
                placeholder="Tashkilot nomi *"
                value={formData.org_name || ""}
                onChange={handleChange}
                disabled={saved}
                required
              />
            </div>
            <div className="single-field half-field">
              <label htmlFor="reg_code_nds" className="mb-2">
                NDS kodi
              </label>
              <input
                type="text"
                name="reg_code_nds"
                placeholder="NDS kodi"
                value={formData.reg_code_nds || ""}
                onChange={handleChange}
                disabled={saved}
              />
            </div>
            <div className="single-field half-field-last">
              <label htmlFor="address" className="mb-2">
                Manzil
              </label>
              <input
                type="text"
                name="address"
                placeholder="Manzil"
                value={formData.address || ""}
                onChange={handleChange}
                disabled={saved}
              />
            </div>
            <div className="single-field half-field">
              <label htmlFor="phone" className="mb-2">
                Telefon
              </label>
              <input
                type="tel"
                name="phone"
                pattern="[+]{1}[9]{1}[9]{1}[8]{1}[0-9]{9}"
                placeholder="Telefon"
                value={formData.phone || ""}
                onChange={handleChange}
                disabled={saved}
              />
            </div>
            <div className="single-field half-field-last">
              <label htmlFor="main_rc" className="mb-2">
                Asosiy R/C
              </label>
              <input
                type="text"
                name="main_rc"
                placeholder="Asosiy R/C"
                value={formData.main_rc || ""}
                onChange={handleChange}
                disabled={saved}
              />
            </div>
            <div className="single-field half-field">
              <label htmlFor="mfo" className="mb-2">
                MFO
              </label>
              <input
                type="text"
                name="mfo"
                placeholder="MFO"
                value={formData.mfo || ""}
                onChange={handleChange}
                disabled={saved}
              />
            </div>
            <div className="single-field half-field-last">
              <label htmlFor="region_id" className="mb-2">
                Viloyat/Shahar
              </label>
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
                disabled={saved}
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
              <label htmlFor="district_id" className="mb-2">
                Tuman
              </label>
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
                disabled={!selectedRegion + saved}
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
              <label htmlFor="oked" className="mb-2">
                OKED
              </label>
              <input
                type="text"
                name="oked"
                placeholder="OKED"
                value={formData.oked || ""}
                onChange={handleChange}
                disabled={saved}
              />
            </div>
            <div className="single-field half-field-last">
              <label htmlFor="director_name" className="mb-2">
                Direktor FIO
              </label>
              <input
                type="text"
                name="director_name"
                placeholder="Direktor FIO"
                value={formData.director_name || ""}
                onChange={handleChange}
                disabled={saved}
              />
            </div>
            <div className="single-field half-field">
              <label htmlFor="director_pinfl" className="mb-2">
                Direktor PINFL
              </label>
              <input
                type="text"
                name="director_pinfl"
                placeholder="Direktor PINFL"
                value={formData.director_pinfl || ""}
                onChange={handleChange}
                disabled={saved}
              />
            </div>
            <div className="single-field half-field-last">
              <label htmlFor="chief_accountant" className="mb-2">
                Bosh xisobchi
              </label>
              <input
                type="text"
                name="chief_accountant"
                placeholder="Bosh xisobchi"
                value={formData.chief_accountant || ""}
                onChange={handleChange}
                disabled={saved}
              />
            </div>
            <div className="single-field half-field">
              <label htmlFor="goods_issued_by" className="mb-2">
                Kontakt ma'lumotlari
              </label>
              <input
                type="text"
                name="goods_issued_by"
                placeholder="Kontakt ma'lumotlari"
                value={formData.goods_issued_by || ""}
                onChange={handleChange}
                disabled={saved}
              />
            </div>
            <div className="single-field half-field-last">
              <label htmlFor="excise_tax" className="mb-2">
                Taqdim etilgan xizmatlar
              </label>
              <Select
                id="excise_tax"
                name="excise_tax"
                placeholder="Faoliyatni tanglang"
                value={options.filter((option) =>
                  formData.excise_tax.includes(option.value)
                )}
                onChange={handleChange}
                options={options}
                isMulti
                className="form-control"
              />
              <input
                type="text"
                name="excise_tax"
                placeholder="Taqdim etilgan xizmatlar"
                value={formData.excise_tax || ""}
                onChange={handleChange}
                disabled={saved}
              />
            </div>

            {userDetails.role === "admin" && (
              <div className="single-field half-field">
                <div className="form-group my-3">
                  <select
                    id="status"
                    className="form-control"
                    name="status"
                    onChange={handleChange}
                    disabled={saved}
                    value={formData.status}
                  >
                    <option value="0">Tasdiqlanmagan</option>
                    <option value="1">Tasdiqlangan</option>
                  </select>
                </div>
              </div>
            )}
            <div className="single-field">
              <button
                className="btn btn-success px-3 mt-5"
                type="submit"
                disabled={saved} // Disable button if saved
              >
                Yaratish
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
