import React, { useEffect, useState } from "react";
import { putTour } from "../../../../http/adobeApi";
import { useAuth } from "../../../../context/AuthContext";
import { BASE_URL } from "../../../../api/host/host";
import { editNotification } from "../../../../http/notificationApi";

export default function AdobeEdit({
  adobe,
  regions,
  tourServices,
  districts,
  onSave,
  onCancel,
}) {
  const [editadobe, setEditadobe] = useState(adobe);
  const [filteredRegions, setFilteredRegions] = useState(regions);
  const [filteredDistricts, setFilteredDistricts] = useState(districts);
  const [imagePreviews, setImagePreviews] = useState([]);
  const { userDetails } = useAuth();
  const [notificationStatus, setNotificationStatus] = useState(
    editadobe.status
  );
  useEffect(() => {
    if (adobe) {
      setEditadobe(adobe);
      if (adobe.images) {
        const imageArray = Array.isArray(adobe.images)
          ? adobe.images
          : adobe.images.split(",");
        setImagePreviews(imageArray.map((img) => `${BASE_URL}/uploads/${img}`));
      } else {
        setImagePreviews([]);
      }
    }
  }, [adobe]);

  useEffect(() => {
    if (userDetails.role === "region" && userDetails.region_id) {
      // Filter regions for the "region" role
      setFilteredRegions(
        regions.filter((region) => region.id === userDetails.region_id)
      );
    } else if (userDetails.role === "district" && userDetails.region_id) {
      // Filter regions and districts for the "district" role
      setFilteredRegions(
        regions.filter((region) => region.id === userDetails.region_id)
      );
      setFilteredDistricts(
        districts.filter((district) => district.id === userDetails.district_id)
      );
      setEditadobe((prev) => ({
        ...prev,
        region_id: userDetails.region_id,
        district_id: userDetails.district_id,
      }));
    } else {
      // Show all regions and districts if not a specific role
      setFilteredRegions(regions);
      setFilteredDistricts(districts);
    }
  }, [regions, districts, userDetails]);

  const handleUpdate = () => {
    if (!editadobe || !editadobe.id) {
      alert("Maskanlarda ma'lumotlar noto'g'ri kiritilgan.");
      return;
    }

    const formData = new FormData();
    formData.append("title", editadobe.title);
    formData.append("description", editadobe.description);
    formData.append("price", editadobe.price);
    formData.append("price_description", editadobe.price_description);
    formData.append("region_id", editadobe.region_id);
    formData.append("district_id", editadobe.district_id);
    formData.append("status", editadobe.status);
    formData.append("tourism_service_id", editadobe.tourism_service_id);

    if (editadobe.images instanceof FileList) {
      Array.from(editadobe.images).forEach((file) => {
        formData.append("images", file); // Append all images
      });
    } else if (Array.isArray(editadobe.images)) {
      editadobe.images.forEach((file, index) => {
        formData.append(`images[${index}]`, file); // Append all images
      });
    }

    // Update tour
    putTour(editadobe.id, formData)
      .then((result) => {
        if (result.data.Status) {
          // Update notification if status has changed
          if (notificationStatus !== formData.status) {
            // Create notification object
            const notification = {
              user_id: userDetails.id, // Pass the user ID if required
              message: `Maskan o'zgartirildi ${editadobe.title}`, // Make sure to use template literals correctly
              type: editadobe.status,
            };

            // Update the notification using its ID
            editNotification(editadobe.notification_id, notification)
              .then((notificationResult) => {
                console.log("Notification updated:", notificationResult.data);
                onSave(result.data.Result); // Call onSave after successful update
              })
              .catch((error) => {
                console.error("Error updating notification:", error);
                alert("Error updating notification.");
              });
          } else {
            // If status has not changed, just save the result
            onSave(result.data.Result);
          }
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleImageChange = (e) => {
    const files = e.target.files; // FileList object
    if (files.length > 0) {
      const newImages = Array.from(files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setEditadobe({
        ...editadobe,
        images: files,
      });
      setImagePreviews(newImages.map((img) => img.preview));
    }
  };
  const handleStatusChange = (e) => {
    setEditadobe({ ...editadobe, status: e.target.value });
    setNotificationStatus(e.target.value); // Update notification status
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
            {filteredRegions.map((region) => (
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
            disabled={!editadobe.region_id}
          >
            {filteredDistricts.map((district) => (
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
              onChange={handleStatusChange}
            >
              <option value="0">Tasdiqlanmagan</option>
              <option value="1">Tasdiqlangan</option>
            </select>
          </div>
        )}
        <div className="form-group my-3">
          <label htmlFor="images" className="my-2">
            Rasm
          </label>
          <input
            type="file"
            id="images"
            className="form-control"
            multiple
            onChange={handleImageChange}
          />
          {imagePreviews.length > 0 && (
            <div className="image-previews mt-3">
              {imagePreviews.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`Preview ${index}`}
                  width="100"
                  className="mx-2"
                />
              ))}
            </div>
          )}
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
