import React, { useEffect, useState } from "react";
import { postOrganization } from "../../../../http/organizationApi";
import { getUsers } from "../../../../http/usersApi";
import { useAuth } from "../../../../context/AuthContext";

export default function OrganizationAdd() {
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
    user_id: "",
    status: "",
  });
  const { userDetails } = useAuth();
  const [authors, setAuthors] = useState([]);
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
      const response = await postOrganization();
      if (response.data.Status) {
        alert("Organization added successfully!");
        setFormData({
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
          user_id: "",
          status: "",
        });
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
            <div className="single-field half-field">
              <input
                type="text"
                name="reg_code_nds"
                placeholder="NDS kodi"
                value={formData.reg_code_nds}
                onChange={handleChange}
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
            <div className="single-field half-field-last">
              <input
                type="text"
                name="main_rc"
                placeholder="Asosiy R/C"
                value={formData.main_rc}
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
              <input
                type="text"
                name="region"
                placeholder="Viloyat/Shahar"
                value={formData.region}
                onChange={handleChange}
              />
            </div>
            <div className="single-field half-field">
              <input
                type="text"
                name="district"
                placeholder="Tuman"
                value={formData.district}
                onChange={handleChange}
              />
            </div>
            <div className="single-field half-field-last">
              <input
                type="text"
                name="oked"
                placeholder="OKED"
                value={formData.oked}
                onChange={handleChange}
              />
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
              <input
                type="text"
                name="director_pinfl"
                placeholder="Direktor PINFL"
                value={formData.director_pinfl}
                onChange={handleChange}
              />
            </div>
            <div className="single-field half-field">
              <input
                type="text"
                name="chief_accountant"
                placeholder="Bosh xisobchi"
                value={formData.chief_accountant}
                onChange={handleChange}
              />
            </div>
            <div className="single-field half-field-last">
              <input
                type="text"
                name="goods_issued_by"
                placeholder="Chiqargan tovarlar"
                value={formData.goods_issued_by}
                onChange={handleChange}
              />
            </div>
            <div className="single-field half-field">
              <input
                type="text"
                name="nds"
                placeholder="NDS"
                value={formData.nds}
                onChange={handleChange}
              />
            </div>
            <div className="single-field half-field-last">
              <input
                type="text"
                name="excise_tax"
                placeholder="Aksiz solig'i"
                value={formData.excise_tax}
                onChange={handleChange}
              />
            </div>
            <div className="single-field half-field">
              <input
                type="text"
                name="origin_of_goods"
                placeholder="Tovarlarning kelib chiqishi"
                value={formData.origin_of_goods}
                onChange={handleChange}
              />
            </div>
            <div className="single-field half-field-last">
              <input
                type="text"
                name="auto_fill_cf_by_contract_id"
                placeholder="Kontrakt identifikatori bo'yicha avtomatik to'ldirish ID"
                value={formData.auto_fill_cf_by_contract_id}
                onChange={handleChange}
              />
            </div>
            <div className="single-field half-field">
              <input
                type="text"
                name="accept_discount_offers"
                placeholder="Chegirmali takliflarni qabul qilish"
                value={formData.accept_discount_offers}
                onChange={handleChange}
              />
            </div>
            <div className="single-field half-field-last">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Foydalanucvchi
              </label>
              <select
                className="form-select mb-4"
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
            <div className="single-field half-field">
              {userDetails.role === "admin" && (
                <div className="form-group my-3">
                  <select
                    id="status"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.status}
                  >
                    <option value="0">Tasdiqlanmagan</option>
                    <option value="1">Tasdiqlangan</option>
                  </select>
                </div>
              )}
            </div>
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
