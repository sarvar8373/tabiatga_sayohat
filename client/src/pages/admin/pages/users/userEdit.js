import React, { useEffect, useState } from "react";
import { getSelectRegion, putUser } from "../../../../http/usersApi";
import { useAuth } from "../../../../context/AuthContext";

const EditUserForm = ({ user, regions, districts, onSave, onCancel }) => {
  const [editUser, setEditUser] = useState(user);
  const [error, setError] = useState("");
  const [role, setRole] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [filteredRegions, setFilteredRegions] = useState(regions);
  const [filteredDistricts, setFilteredDistricts] = useState(districts);
  const { userDetails } = useAuth();
  useEffect(() => {
    if (user) {
      setEditUser(user);
      setSelectedRegion(user.region_id || "");
      setSelectedDistrict(user.district_id || "");
    }
  }, [user]);
  useEffect(() => {
    if (userDetails.role === "region" && userDetails.region_id) {
      setFilteredRegions(
        regions.filter((region) => region.id === userDetails.region_id)
      );
      setSelectedRegion(userDetails.region_id);
      setFilteredDistricts([]);
    } else if (userDetails.role === "district" && userDetails.region_id) {
      setFilteredRegions(
        regions.filter((region) => region.id === userDetails.region_id)
      );

      getSelectRegion(userDetails.region_id)
        .then((response) => {
          if (response.data.Status) {
            const filteredDistricts = response.data.Result.filter(
              (district) => district.id === userDetails.district_id
            );
            setFilteredDistricts(filteredDistricts);

            setEditUser((prev) => ({
              ...prev,
              region_id: userDetails.region_id,
              district_id: userDetails.district_id,
            }));

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
    } else {
      setFilteredRegions(regions);
      setFilteredDistricts(districts);
    }
  }, [regions, districts, userDetails]);

  useEffect(() => {
    if (selectedRegion) {
      getSelectRegion(selectedRegion)
        .then((response) => {
          if (response.data.Status) {
            setFilteredDistricts(response.data.Result);
          } else {
            setError(response.data.Error);
          }
        })
        .catch((err) => {
          setError("Error fetching districts.");
          console.error(err);
        });
    } else {
      setFilteredDistricts([]);
    }
  }, [selectedRegion]);
  const handleUpdate = () => {
    if (!editUser || !editUser.id) {
      alert("Foydalanuvchi ma'lumotlari noto'g'ri kiritilgan.");
      return;
    }

    const formData = new FormData();
    formData.append("phone_number", editUser.phone_number);
    formData.append("full_name", editUser.full_name);
    if (editUser.password && editUser.password.trim()) {
      formData.append("password", editUser.password);
    }
    formData.append("role", editUser.role);
    formData.append("region_id", editUser.region_id);
    formData.append("district_id", editUser.district_id);

    putUser(editUser.id, formData)
      .then((result) => {
        if (result.data.Status) {
          console.log(result.data.Result);
          onSave(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="phone_number" className="form-label">
          Telefon raqami
        </label>
        <p>{error}</p>
        <input
          type="text"
          id="phone_number"
          className="form-control"
          value={editUser.phone_number}
          onChange={(e) =>
            setEditUser({ ...editUser, phone_number: e.target.value })
          }
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
          value={editUser.full_name}
          onChange={(e) =>
            setEditUser({ ...editUser, full_name: e.target.value })
          }
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
          value={editUser.password || ""}
          onChange={(e) =>
            setEditUser({ ...editUser, password: e.target.value })
          }
          placeholder="Yangi parol (agar o'zgartirmoqchi bo'lsangiz)"
        />
      </div>
      <div className="single-field">
        <label htmlFor="region">Viloyat</label>
        <select
          id="region_id"
          className="form-control"
          value={editUser.region_id || ""}
          onChange={(e) => {
            const selectedRegionId = e.target.value;
            setEditUser((prev) => ({
              ...prev,
              region_id: selectedRegionId,
              district_id: "",
            }));

            if (selectedRegionId) {
              getSelectRegion(selectedRegionId)
                .then((response) => {
                  if (response.data.Status) {
                    setFilteredDistricts(response.data.Result);
                  } else {
                    setFilteredDistricts([]);
                    setError(response.data.Error);
                  }
                })
                .catch((err) => {
                  setFilteredDistricts([]);
                  setError("Error fetching districts.");
                  console.error(err);
                });
            } else {
              setFilteredDistricts([]);
            }
          }}
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
          id="district_id"
          className="form-control"
          value={editUser.district_id || ""}
          onChange={(e) =>
            setEditUser((prev) => ({
              ...prev,
              district_id: e.target.value,
            }))
          }
          disabled={!editUser.region_id}
        >
          {filteredDistricts.length > 0 ? (
            filteredDistricts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))
          ) : (
            <option value="">Tumman topilmadi</option>
          )}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="role" className="form-label">
          Roli
        </label>
        <select
          id="role"
          className="form-select"
          value={editUser.role}
          onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
        >
          <option value="customer">Foydalanuvchi</option>
          <option value="admin">Departament</option>
          <option value="user">Tadbirkor</option>
          <option value="region">Viloyat</option>
          <option value="district">Tuman</option>
        </select>
      </div>
      <button type="button" className="btn btn-primary" onClick={handleUpdate}>
        Saqlash
      </button>
      <button
        type="button"
        className="btn btn-secondary mx-3"
        onClick={onCancel}
      >
        Ortga
      </button>
    </form>
  );
};

export default EditUserForm;
