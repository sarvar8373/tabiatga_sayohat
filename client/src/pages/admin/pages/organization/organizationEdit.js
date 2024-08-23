import React, { useEffect, useState } from "react";
import { getUsers } from "../../../../http/usersApi";
import {
  getOrganization,
  putOrganization,
} from "../../../../http/organizationApi";

const OrganizationEdit = ({ match, history }) => {
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
    user_id: "", // Assuming this will be set from authentication context or other means
  });
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const { id } = match.params; // Assuming id is passed via route params
        const response = await getOrganization(id);
        if (response.data.Status) {
          setFormData(response.data.Result);
        } else {
          setError(response.data.Error);
        }
      } catch (err) {
        setError("Failed to fetch organization details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchAuthors = async () => {
      try {
        const response = await getUsers();
        if (response.data.Status) {
          setAuthors(response.data.Result);
        } else {
          alert(response.data.Error);
        }
      } catch (err) {
        console.error("Failed to fetch authors:", err);
      }
    };

    fetchOrganization();
    fetchAuthors();
  }, [match.params]);

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
      const { id } = match.params; // Assuming id is passed via route params
      const response = await putOrganization(id, formData);
      if (response.data.Status) {
        alert("Organization updated successfully!");
        history.push("/organizations"); // Redirect to the list of organizations
      } else {
        alert("Failed to update organization: " + response.data.Error);
      }
    } catch (error) {
      console.error("Error updating organization:", error);
      alert("Error updating organization. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container-fluid px-4">
      <h2 className="mt-4">Tashkilotni tahrirlash</h2>
      <div className="login-form">
        <form
          className="gane-form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="form-left">
            {/* Form fields remain the same */}
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
            <button className="btn btn-success px-3" type="submit">
              Saqlash
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrganizationEdit;
