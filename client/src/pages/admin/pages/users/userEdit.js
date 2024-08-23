import React, { useEffect, useState } from "react";
import { getRegions, getSelectRegion } from "../../../../http/usersApi";

const EditUserForm = ({ user, onSubmit }) => {
  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState("");

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
    if (user) {
      setPhoneNumber(user.phone_number);
      setFullName(user.full_name);
      setPassword(""); // Clear the password field on user change
      setRole(user.role);
      setSelectedRegion(user.region_id || ""); // Update the region if provided
      setSelectedDistrict(user.district_id || ""); // Update the district if provided
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the payload
    const payload = {
      id: user.id,
      phone_number: phoneNumber,
      full_name: fullName,
      role: role,
      region_id: selectedRegion,
      district_id: selectedDistrict,
    };

    // Include password only if it's not empty
    if (password.trim() !== "") {
      payload.password = password;
    }

    // Pass the payload to the onSubmit function
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="phone_number" className="form-label">
          Telefon raqami
        </label>
        <p>{error}</p>
        <input
          type="text"
          id="phone_number"
          className="form-control"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="full_name" className="form-label">
          FIO
        </label>
        <input
          type="text"
          id="full_name"
          className="form-control"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Parol
        </label>
        <input
          type="password"
          id="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Yangi parol (agar o'zgartirmoqchi bo'lsangiz)"
        />
      </div>
      <div className="single-field">
        <label htmlFor="region">Viloyat</label>
        <select
          id="region"
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
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
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
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
      <div className="mb-3">
        <label htmlFor="role" className="form-label">
          Roli
        </label>
        <select
          id="role"
          className="form-select"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="customer">Foydalanuvchi</option>
          <option value="admin">Departament</option>
          <option value="user">Tadbirkor</option>
          <option value="region">Viloyat</option>
          <option value="district">Tuman</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        Saqlash
      </button>
    </form>
  );
};

export default EditUserForm;
