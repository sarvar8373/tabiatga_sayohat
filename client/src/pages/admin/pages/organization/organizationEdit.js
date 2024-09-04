import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { putOrganization } from "../../../../http/organizationApi";
import { useAuth } from "../../../../context/AuthContext";
import { editNotification } from "../../../../http/notificationApi";

const OrganizationEdit = ({
  organization,
  regions,
  districts,
  onSave,
  onCancel,
}) => {
  const navigate = useNavigate();
  const { userDetails } = useAuth();
  const [editOrganization, setEditOrganization] = useState(organization);
  const [loading, setLoading] = useState(true);
  const [originalStatus, setOriginalStatus] = useState(editOrganization.status);
  const [filteredRegions, setFilteredRegions] = useState(regions);
  const [filteredDistricts, setFilteredDistricts] = useState(districts);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (organization) {
      setEditOrganization(organization);
      setOriginalStatus(organization.status);
    }
  }, [organization]);

  useEffect(() => {
    if (userDetails.role === "region" && userDetails.region_id) {
      setFilteredRegions(
        regions.filter((region) => region.id === userDetails.region_id)
      );
    } else if (userDetails.role === "district" && userDetails.region_id) {
      setFilteredRegions(
        regions.filter((region) => region.id === userDetails.region_id)
      );
      setFilteredDistricts(
        districts.filter((district) => district.id === userDetails.district_id)
      );
      setEditOrganization((prev) => ({
        ...prev,
        region_id: userDetails.region_id,
        district_id: userDetails.district_id,
      }));
    } else {
      setFilteredRegions(regions);
      setFilteredDistricts(districts);
    }
  }, [regions, districts, userDetails]);

  const handleUpdate = () => {
    if (!editOrganization || !editOrganization.id) {
      alert("Organization data is missing or incorrect.");
      return;
    }

    const formData = new FormData();
    formData.append("inn_pinfl", editOrganization.inn_pinfl);
    formData.append("org_name", editOrganization.org_name);
    formData.append("address", editOrganization.address);
    formData.append("phone", editOrganization.phone);
    formData.append("mfo", editOrganization.mfo);
    formData.append("region_id", editOrganization.region_id);
    formData.append("district_id", editOrganization.district_id);
    formData.append("director_name", editOrganization.director_name);
    formData.append("excise_tax", editOrganization.excise_tax);
    formData.append("status", editOrganization.status);
    formData.append("user_id", editOrganization.user_id); // Ensure user_id is included

    putOrganization(editOrganization.id, formData)
      .then((result) => {
        if (result.data.Status) {
          console.log(result.data.Result);

          // Check if the status has changed
          if (formData.get("status") !== originalStatus) {
            const notification = {
              user_id: editOrganization.user_id, // Pass the user ID if required
              message: `Tashkilot: ${editOrganization.org_name}`,
              type: editOrganization.status,
            };

            // Pass the organization ID to editNotification
            editNotification(editOrganization.notification_id, notification)
              .then((notificationResult) => {
                console.log("Notification updated:", notificationResult.data);
                onSave(result.data.Result); // Call onSave after successful update
              })
              .catch((error) => {
                console.error("Error updating notification:", error);
                alert("Error updating notification.");
              });
          } else {
            onSave(result.data.Result);
          }
        } else {
          alert(result.data.Error || "An error occurred while updating.");
        }
      })
      .catch((err) => {
        console.error("Error updating organization:", err);
        alert("An error occurred while updating.");
      });
  };

  return (
    <div className="container-fluid px-4">
      <h2 className="mt-4">Tashkilotni tahrirlash</h2>
      <div className="login-form">
        <form className="gane-form">
          <div className="form-left">
            <div className="single-field half-field">
              <input
                type="text"
                name="inn_pinfl"
                placeholder="INN/PINFL *"
                value={editOrganization.inn_pinfl}
                onChange={(e) =>
                  setEditOrganization({
                    ...editOrganization,
                    inn_pinfl: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="single-field half-field-last">
              <input
                type="text"
                name="org_name"
                placeholder="Tashkilot nomi *"
                value={editOrganization.org_name}
                onChange={(e) =>
                  setEditOrganization({
                    ...editOrganization,
                    org_name: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="single-field half-field-last">
              <input
                type="text"
                name="address"
                placeholder="Manzil"
                value={editOrganization.address}
                onChange={(e) =>
                  setEditOrganization({
                    ...editOrganization,
                    address: e.target.value,
                  })
                }
              />
            </div>
            <div className="single-field half-field">
              <input
                type="text"
                name="phone"
                placeholder="Telefon"
                value={editOrganization.phone}
                onChange={(e) =>
                  setEditOrganization({
                    ...editOrganization,
                    phone: e.target.value,
                  })
                }
              />
            </div>
            <div className="single-field half-field">
              <input
                type="text"
                name="mfo"
                placeholder="MFO"
                value={editOrganization.mfo}
                onChange={(e) =>
                  setEditOrganization({
                    ...editOrganization,
                    mfo: e.target.value,
                  })
                }
              />
            </div>
            <div className="single-field half-field-last">
              <select
                id="region_id"
                className="form-control"
                value={editOrganization.region_id}
                onChange={(e) =>
                  setEditOrganization({
                    ...editOrganization,
                    region_id: e.target.value,
                  })
                }
              >
                {filteredRegions.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="single-field half-field-last">
              <select
                id="district_id"
                className="form-control"
                value={editOrganization.district_id}
                onChange={(e) =>
                  setEditOrganization({
                    ...editOrganization,
                    district_id: e.target.value,
                  })
                }
                disabled={!editOrganization.region_id}
              >
                {filteredDistricts.map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="single-field half-field">
              <input
                type="text"
                name="director_name"
                placeholder="Direktor FIO"
                value={editOrganization.director_name}
                onChange={(e) =>
                  setEditOrganization({
                    ...editOrganization,
                    director_name: e.target.value,
                  })
                }
              />
            </div>
            <div className="single-field half-field-last">
              <input
                type="text"
                name="excise_tax"
                placeholder="Taqdim etilgan xizmatlar"
                value={editOrganization.excise_tax}
                onChange={(e) =>
                  setEditOrganization({
                    ...editOrganization,
                    excise_tax: e.target.value,
                  })
                }
              />
            </div>

            {userDetails.role === "admin" && (
              <div className="single-field half-field">
                <div className="form-group my-3">
                  <select
                    id="status"
                    className="form-control"
                    value={editOrganization.status}
                    onChange={(e) =>
                      setEditOrganization({
                        ...editOrganization,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="0">Tasdiqlanmagan</option>
                    <option value="1">Tasdiqlangan</option>
                  </select>
                </div>
              </div>
            )}
            <button
              type="button"
              className="btn btn-primary my-3 mx-3"
              onClick={handleUpdate}
            >
              Saqlash
            </button>
            <button
              type="button"
              className="btn btn-secondary ml-2 my-3"
              onClick={onCancel}
            >
              Ortga
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrganizationEdit;
