import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUsers } from "../../../../http/usersApi";
import {
  getOrganization,
  putOrganization,
} from "../../../../http/organizationApi";
import { useAuth } from "../../../../context/AuthContext";

const OrganizationEdit = ({ organization, onSave, onCancel }) => {
  const navigate = useNavigate();
  const { userDetails } = useAuth();
  const [editOrganization, setEditOrganization] = useState(organization);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (organization) {
      setEditOrganization(organization);
    }
  }, [organization]);

  const handleUpdate = () => {
    if (!editOrganization || !editOrganization.id) {
      alert("Adobe data is missing or incorrect.");
      return;
    }

    const formData = new FormData();
    formData.append("inn_pinfl", editOrganization.inn_pinfl);
    formData.append("org_name", editOrganization.org_name); // Ensure this matches the backend
    formData.append("code_nds", editOrganization.code_nds);
    formData.append("address", editOrganization.address);
    formData.append("phone", editOrganization.phone); // Ensure this matches the backend
    formData.append("main_fc", editOrganization.main_fc);
    formData.append("mfo", editOrganization.mfo);
    formData.append("region", editOrganization.region);
    formData.append("district", editOrganization.district);
    formData.append("director_name", editOrganization.director_name);
    formData.append("chief_accountant", editOrganization.chief_accountant);
    formData.append("goods_issued_by", editOrganization.goods_issued_by);
    formData.append("nds", editOrganization.nds);
    formData.append("excise_tax", editOrganization.excise_tax);
    formData.append("origin_of_goods", editOrganization.origin_of_goods);
    formData.append(
      "auto_fill_cf_by_contract_id",
      editOrganization.auto_fill_cf_by_contract_id
    );
    formData.append("user_id", editOrganization.user_id);
    formData.append("status", editOrganization.status);

    putOrganization(editOrganization.id, formData)
      .then((result) => {
        if (result.data.Status) {
          console.log(result.data.Result);
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
      <div className="container-fluid px-4">
        <h2 className="mt-4">Tashkilotni tahrirlash</h2>
        <div className="login-form">
          <form className="gane-form">
            <div className="form-left">
              {/* Form fields remain the same */}
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
              <div className="single-field half-field">
                <input
                  type="text"
                  name="reg_code_nds"
                  placeholder="NDS kodi"
                  value={editOrganization.reg_code_nds}
                  onChange={(e) =>
                    setEditOrganization({
                      ...editOrganization,
                      reg_code_nds: e.target.value,
                    })
                  }
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
              <div className="single-field half-field-last">
                <input
                  type="text"
                  name="main_rc"
                  placeholder="Asosiy R/C"
                  value={editOrganization.main_rc}
                  onChange={(e) =>
                    setEditOrganization({
                      ...editOrganization,
                      main_rc: e.target.value,
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
                <input
                  type="text"
                  name="region"
                  placeholder="Viloyat/Shahar"
                  value={editOrganization.region}
                  onChange={(e) =>
                    setEditOrganization({
                      ...editOrganization,
                      region: e.target.value,
                    })
                  }
                />
              </div>
              <div className="single-field half-field">
                <input
                  type="text"
                  name="district"
                  placeholder="Tuman"
                  value={editOrganization.district}
                  onChange={(e) =>
                    setEditOrganization({
                      ...editOrganization,
                      district: e.target.value,
                    })
                  }
                />
              </div>
              <div className="single-field half-field-last">
                <input
                  type="text"
                  name="oked"
                  placeholder="OKED"
                  value={editOrganization.oked}
                  onChange={(e) =>
                    setEditOrganization({
                      ...editOrganization,
                      oked: e.target.value,
                    })
                  }
                />
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
                  name="director_pinfl"
                  placeholder="Direktor PINFL"
                  value={editOrganization.director_pinfl}
                  onChange={(e) =>
                    setEditOrganization({
                      ...editOrganization,
                      director_pinfl: e.target.value,
                    })
                  }
                />
              </div>
              <div className="single-field half-field">
                <input
                  type="text"
                  name="chief_accountant"
                  placeholder="Bosh xisobchi"
                  value={editOrganization.chief_accountant}
                  onChange={(e) =>
                    setEditOrganization({
                      ...editOrganization,
                      chief_accountant: e.target.value,
                    })
                  }
                />
              </div>
              <div className="single-field half-field-last">
                <input
                  type="text"
                  name="goods_issued_by"
                  placeholder="Chiqargan tovarlar"
                  value={editOrganization.goods_issued_by}
                  onChange={(e) =>
                    setEditOrganization({
                      ...editOrganization,
                      goods_issued_by: e.target.value,
                    })
                  }
                />
              </div>
              <div className="single-field half-field">
                <input
                  type="text"
                  name="nds"
                  placeholder="NDS"
                  value={editOrganization.nds}
                  onChange={(e) =>
                    setEditOrganization({
                      ...editOrganization,
                      nds: e.target.value,
                    })
                  }
                />
              </div>
              <div className="single-field half-field-last">
                <input
                  type="text"
                  name="excise_tax"
                  placeholder="Aksiz solig'i"
                  value={editOrganization.excise_tax}
                  onChange={(e) =>
                    setEditOrganization({
                      ...editOrganization,
                      excise_tax: e.target.value,
                    })
                  }
                />
              </div>
              <div className="single-field half-field">
                <input
                  type="text"
                  name="origin_of_goods"
                  placeholder="Tovarlarning kelib chiqishi"
                  value={editOrganization.origin_of_goods}
                  onChange={(e) =>
                    setEditOrganization({
                      ...editOrganization,
                      origin_of_goods: e.target.value,
                    })
                  }
                />
              </div>
              <div className="single-field half-field-last">
                <input
                  type="text"
                  name="auto_fill_cf_by_contract_id"
                  placeholder="Kontrakt identifikatori bo'yicha avtomatik to'ldirish ID"
                  value={editOrganization.auto_fill_cf_by_contract_id}
                  onChange={(e) =>
                    setEditOrganization({
                      ...editOrganization,
                      auto_fill_cf_by_contract_id: e.target.value,
                    })
                  }
                />
              </div>
              <div className="single-field half-field">
                <input
                  type="text"
                  name="accept_discount_offers"
                  placeholder="Chegirmali takliflarni qabul qilish"
                  value={editOrganization.accept_discount_offers}
                  onChange={(e) =>
                    setEditOrganization({
                      ...editOrganization,
                      accept_discount_offers: e.target.value,
                    })
                  }
                />
              </div>

              {userDetails.role === "admin" && (
                <div className="single-field half-field mx-0 ms-5">
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
    </div>
  );
};

export default OrganizationEdit;
