import React, { useEffect, useState } from "react";
import {
  getDistricts,
  getRegions,
  getUserDetails,
} from "../../../http/usersApi";

export default function Profile() {
  const [userDetails, setUserDetails] = useState(null);
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
      <img
        className="rounded-circle"
        src="/img/guide/1.png"
        alt="Profile"
        width={200}
        height={200}
      />
      {auth ? (
        <>
          <h1>{userDetails.full_name}</h1>
          <div>
            <p>{userDetails.phone_number}</p>
            <p>{roleLabel}</p>
            <p> {getRegionName(userDetails.region_id)}</p>
            <p> {getDistrictName(userDetails.district_id)}</p>
          </div>
        </>
      ) : (
        <p>Yuklanmoqda...</p>
      )}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}
