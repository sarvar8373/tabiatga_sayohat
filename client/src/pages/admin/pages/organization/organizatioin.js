import React, { useEffect, useState } from "react";
import {
  postOrganization,
  getOrganization,
} from "../../../../http/organizationApi";
import { getUsers } from "../../../../http/usersApi";
import { useAuth } from "../../../../context/AuthContext";

export default function Organization() {
  const { userDetails } = useAuth();
  const [authors, setAuthors] = useState([]);
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    inn_pinfl: "",
    org_name: "",
    reg_code_nds: "",
    address: "",
    phone: "",
    main_rc: "",
    mfo: "",
    region: "",
    district: "",
    oked: "",
    director_name: "",
    director_pinfl: "",
    chief_accountant: "",
    goods_issued_by: "",
    nds: "",
    excise_tax: "",
    origin_of_goods: "",
    auto_fill_cf_by_contract_id: "",
    accept_discount_offers: "",
    user_id: userDetails.id,
    status: "",
  });

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
      const response = await postOrganization(formData);
      if (response.data.Status) {
        alert("Organization added successfully!");
        setSaved(true);
      } else {
        alert("Failed to add organization: " + response.data.Error);
      }
    } catch (error) {
      console.error("Error adding organization:", error);
      alert("Error adding organization. Please try again.");
    }
  };

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
                type="text"
                name="inn_pinfl"
                placeholder="INN/PINFL *"
                value={formData.inn_pinfl || ""}
                onChange={handleChange}
                disabled={formData.status === "0" || formData.status === 0}
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
                type="text"
                name="phone"
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
              <label htmlFor="region" className="mb-2">
                Viloyat/Shahar
              </label>
              <input
                type="text"
                name="region"
                placeholder="Viloyat/Shahar"
                value={formData.region || ""}
                onChange={handleChange}
                disabled={saved}
              />
            </div>
            <div className="single-field half-field">
              <label htmlFor="district" className="mb-2">
                Tuman
              </label>
              <input
                type="text"
                name="district"
                placeholder="Tuman"
                value={formData.district || ""}
                onChange={handleChange}
                disabled={saved}
              />
            </div>
            <div className="single-field half-field-last">
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
            <div className="single-field half-field">
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
            <div className="single-field half-field-last">
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
            <div className="single-field half-field">
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
            <div className="single-field half-field-last">
              <label htmlFor="goods_issued_by" className="mb-2">
                Chiqargan tovarlar
              </label>
              <input
                type="text"
                name="goods_issued_by"
                placeholder="Chiqargan tovarlar"
                value={formData.goods_issued_by || ""}
                onChange={handleChange}
                disabled={saved}
              />
            </div>
            <div className="single-field half-field">
              <label htmlFor="nds" className="mb-2">
                NDS
              </label>
              <input
                type="text"
                name="nds"
                placeholder="NDS"
                value={formData.nds || ""}
                onChange={handleChange}
                disabled={saved}
              />
            </div>
            <div className="single-field half-field-last">
              <label htmlFor="excise_tax" className="mb-2">
                Aksiz solig'i
              </label>
              <input
                type="text"
                name="excise_tax"
                placeholder="Aksiz solig'i"
                value={formData.excise_tax || ""}
                onChange={handleChange}
                disabled={saved}
              />
            </div>
            <div className="single-field half-field">
              <label htmlFor="origin_of_goods" className="mb-2">
                Tovarlarning kelib chiqishi
              </label>
              <input
                type="text"
                name="origin_of_goods"
                placeholder="Tovarlarning kelib chiqishi"
                value={formData.origin_of_goods || ""}
                onChange={handleChange}
                disabled={saved}
              />
            </div>
            <div className="single-field half-field-last">
              <label htmlFor="auto_fill_cf_by_contract_id" className="mb-2">
                Kontrakt identifikatori bo'yicha avtomatik to'ldirish ID
              </label>
              <input
                type="text"
                name="auto_fill_cf_by_contract_id"
                placeholder="Kontrakt identifikatori bo'yicha avtomatik to'ldirish ID"
                value={formData.auto_fill_cf_by_contract_id || ""}
                onChange={handleChange}
                disabled={saved}
              />
            </div>
            <div className="single-field half-field">
              <label htmlFor="accept_discount_offers" className="mb-2">
                Chegirmali takliflarni qabul qilish
              </label>
              <input
                type="text"
                name="accept_discount_offers"
                placeholder="Chegirmali takliflarni qabul qilish"
                value={formData.accept_discount_offers || ""}
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
            <div className="single-field ">
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
