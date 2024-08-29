import React, { useEffect, useState } from "react";
import { putTour } from "../../../../http/adobeApi";
import { useAuth } from "../../../../context/AuthContext";

export default function AdobeEdit({
  adobe,
  regions,
  tourServices,
  districts,
  onSave,
  onCancel,
}) {
  const [editadobe, setEditadobe] = useState(adobe);
  const { userDetails } = useAuth();

  useEffect(() => {
    if (adobe) {
      setEditadobe(adobe);
    }
  }, [adobe]);

  const handleUpdate = () => {
    if (!editadobe || !editadobe.id) {
      alert("Maskanlarda ma'lumotlar noto'g'ri kiritilgan.");
      return;
    }

    // Check if any required field is missing
    if (
      !editadobe.title ||
      !editadobe.description ||
      !editadobe.price ||
      !editadobe.price_description ||
      !editadobe.region_id ||
      !editadobe.district_id ||
      !editadobe.status ||
      !editadobe.tourism_service_id
    ) {
      alert("Please fill in all required fields.");
      console.log("EditAdobe state:", editadobe); // Debug: Log the editadobe state
      return;
    }

    const formData = new FormData();
    formData.append("title", editadobe.title);
    formData.append("description", editadobe.description);
    formData.append("tourism_service_id", editadobe.tourism_service_id);
    formData.append("price", editadobe.price);
    formData.append("price_description", editadobe.price_description);
    formData.append("region_id", editadobe.region_id);
    formData.append("district_id", editadobe.district_id);
    formData.append("status", editadobe.status);
    if (editadobe.image instanceof File) {
      formData.append("image", editadobe.image);
    }

    // Debug: Log FormData entries
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    putTour(editadobe.id, formData)
      .then((result) => {
        if (result.data.Status) {
          onSave(result.data.Result);
        } else {
          alert(result.data.Error || "An error occurred while updating.");
        }
      })
      .catch((err) => {
        console.error("Error updating adobe:", err);
        alert("An error occurred while updating.");
      });
  };

  return (
    <div>
      <h3>Tahrirlash</h3>
      <form>
        <div className="form-group">
          <label htmlFor="title">Sarlavha</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={editadobe.title}
            onChange={(e) =>
              setEditadobe({ ...editadobe, title: e.target.value })
            }
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="description" className="my-2">
            Ma'lumot
          </label>
          <textarea
            className="form-control"
            id="description"
            value={editadobe.description}
            onChange={(e) =>
              setEditadobe({ ...editadobe, description: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="tourism_service_id">Maskan turi</label>
          <select
            id="tourism_service_id"
            className="form-control"
            value={editadobe.tourism_service_id}
            onChange={(e) =>
              setEditadobe({ ...editadobe, tourism_service_id: e.target.value })
            }
          >
            {tourServices.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="price">Narxi</label>
          <input
            type="text"
            className="form-control"
            id="price"
            value={editadobe.price}
            onChange={(e) =>
              setEditadobe({ ...editadobe, price: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="price_description">Necha kishi</label>
          <input
            type="text"
            className="form-control"
            id="price_description"
            value={editadobe.price_description}
            onChange={(e) =>
              setEditadobe({ ...editadobe, price_description: e.target.value })
            }
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="region_id" className="my-2">
            Viloyat
          </label>
          <select
            id="region_id"
            className="form-control"
            value={editadobe.region_id}
            onChange={(e) =>
              setEditadobe({ ...editadobe, region_id: e.target.value })
            }
          >
            {regions.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group my-3">
          <label htmlFor="district_id" className="my-2">
            Tuman
          </label>
          <select
            id="district_id"
            className="form-control"
            value={editadobe.district_id}
            onChange={(e) =>
              setEditadobe({ ...editadobe, district_id: e.target.value })
            }
          >
            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
        </div>
        {userDetails.role === "admin" && (
          <div className="form-group my-3">
            <label htmlFor="status" className="my-2">
              Holati
            </label>
            <select
              id="status"
              className="form-control"
              value={editadobe.status}
              onChange={(e) =>
                setEditadobe({ ...editadobe, status: e.target.value })
              }
            >
              <option value="0">Tasdiqlanmagan</option>
              <option value="1">Tasdiqlangan</option>
            </select>
          </div>
        )}
        <div className="form-group my-3">
          <label htmlFor="image" className="my-2">
            Rasm
          </label>
          <input
            type="file"
            id="imageFile"
            className="form-control"
            onChange={(e) =>
              setEditadobe({ ...editadobe, image: e.target.files[0] })
            }
          />
        </div>
        <button
          type="button"
          className="btn btn-primary my-3 mx-3"
          onClick={handleUpdate}
        >
          Yangilash
        </button>
        <button
          type="button"
          className="btn btn-secondary ml-2 my-3"
          onClick={onCancel}
        >
          Ortga
        </button>
      </form>
    </div>
  );
}
