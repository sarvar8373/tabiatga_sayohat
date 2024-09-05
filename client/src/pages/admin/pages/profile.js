import React, { useEffect, useState } from "react";
import {
  getDistricts,
  getRegions,
  getUserDetails,
} from "../../../http/usersApi";
export default function Profile() {
  const [userDetails, setUserDetails] = useState("");
  const [auth, setAuth] = useState(false);
  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [error, setError] = useState("");

  // Role labels mapping
  const roleLabels = {
    customer: "Foydalanuvchi",
    admin: "Admin",
    user: "Tadbirkor",
    region: "Viloyat",
    district: "Tuman",
  };

  // Get the role label
  const roleLabel = userDetails
    ? roleLabels[userDetails.role] || "Unknown"
    : "Unknown";

  useEffect(() => {
    // Fetch user details
    getUserDetails()
      .then((result) => {
        if (result.data.Status) {
          setAuth(true);
          setUserDetails(result.data);
        } else {
          setError(result.data.Error || "Error fetching user details.");
        }
      })
      .catch((err) => {
        setError("Error fetching user details.");
        console.error(err);
      });
  }, []);

  useEffect(() => {
    getRegions()
      .then((response) => {
        if (response.data.Status) {
          setRegions(response.data.Result);
        } else {
          setError(response.data.Error || "Error fetching regions.");
        }
      })
      .catch((err) => {
        setError("Error fetching regions.");
        console.error(err);
      });
  }, []);

  useEffect(() => {
    getDistricts()
      .then((response) => {
        if (response.data.Status) {
          setDistricts(response.data.Result);
        } else {
          setError(response.data.Error || "Error fetching districts.");
        }
      })
      .catch((err) => {
        setError("Error fetching districts.");
        console.error(err);
      });
  }, []);

  // Function to get region name by ID
  const getRegionName = (id) => {
    const region = regions.find((r) => r.id === id);
    return region ? region.name : "";
  };

  // Function to get district name by ID
  const getDistrictName = (id) => {
    const district = districts.find((d) => d.id === id);
    return district ? district.name : "";
  };

  return (
    <div className="container-fluid">
      <div className="profile-card js-profile-card">
        <div className="profile-card__img">
          <img
            className="rounded-circle"
            src="/img/guide/1.png"
            alt="Profile"
            width={200}
            height={200}
          />
        </div>

        <div className="profile-card__cnt js-profile-cnt">
          <div className="profile-card__name">{userDetails.full_name}</div>
          <div className="profile-card-loc">
            <span className="profile-card-loc__icon"></span>

            <span className="profile-card-loc__txt"> {roleLabel}</span>
          </div>

          <div className="profile-card-inf">
            <div className="profile-card-inf__item">
              <div className="profile-card-inf__title">
                {userDetails.phone_number}
              </div>
              <div className="profile-card-inf__txt">Telefon raqam</div>
            </div>

            <div className="profile-card-inf__item">
              <div className="profile-card-inf__title">
                {getRegionName(userDetails.region_id)}
              </div>
              <div className="profile-card-inf__txt">Tuman</div>
            </div>

            <div className="profile-card-inf__item">
              <div className="profile-card-inf__title">
                {getDistrictName(userDetails.district_id)}
              </div>
              <div className="profile-card-inf__txt">Viloyat</div>
            </div>
          </div>

          <div className="profile-card-ctr">
            <button className="profile-card__button button--blue js-message-btn">
              Tahrirlash
            </button>
          </div>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}
