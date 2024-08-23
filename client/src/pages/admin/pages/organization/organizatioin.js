import React, { useEffect, useState } from "react";
import { getUserDetails } from "../../../../http/usersApi";
import { postOrganization } from "../../../../http/organizationApi";

export default function Organization() {
  const [formData, setFormData] = useState({});
  // const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user details
    getUserDetails()
      .then((result) => {
        if (result.data.Status) {
          // setUserDetails(result.data);
          const userId = result.data.id;

          // Fetch organizations based on user ID
          getUserDetails(userId)
            .then((response) => {
              if (response.data.Status) {
                const organizations = response.data.Result;
                if (organizations.length > 0) {
                  setFormData(organizations[0]); // Set formData with the first organization's details
                } else {
                  // If no organization found, create one
                  const newOrgData = {
                    user_id: userId,
                    // Add default values or prompt the user for necessary details
                    inn_pinfl: "",
                    org_name: "",
                    // ... other fields
                  };

                  postOrganization(newOrgData)
                    .then((createResponse) => {
                      if (createResponse.data.Status) {
                        setFormData(createResponse.data.Result);
                      } else {
                        setError(createResponse.data.Error);
                      }
                    })
                    .catch((err) => {
                      setError("Error creating organization.");
                      console.error(err);
                    });
                }
              } else {
                setError(response.data.Error);
              }
            })
            .catch((err) => {
              setError("Error fetching organization data.");
              console.error(err);
            });
        } else {
          console.error(result.data.Error);
          setError(result.data.Error);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching user details.");
      });
  }, []);

  return (
    <div className="container-fluid px-4">
      <h2 className="mt-4">Tashkilot Ma'lumotlari</h2>
      {formData && (formData.status === "0" || formData.status === 0) ? (
        <button className="btn btn-danger" disabled>
          Tasdiqlanmagan
        </button>
      ) : (
        <button className="btn btn-success" disabled>
          Tasdiqlangan
        </button>
      )}
      <div className="login-form">
        <form className="gane-form">
          <div className="form-left">
            <div className="single-field half-field">
              <label htmlFor="" className="mb-2">
                INN/PINFL
              </label>
              <input
                type="text"
                name="inn_pinfl"
                placeholder="INN/PINFL *"
                value={formData.inn_pinfl || ""}
                disabled
              />
            </div>
            <div className="single-field half-field-last">
              <label htmlFor="" className="mb-2">
                Tashkilot nomi
              </label>
              <input
                type="text"
                name="org_name"
                placeholder="Tashkilot nomi *"
                value={formData.org_name || ""}
                disabled
              />
            </div>
            <div className="single-field half-field">
              <label htmlFor="" className="mb-2">
                NDS kodi
              </label>
              <input
                type="text"
                name="reg_code_nds"
                placeholder="NDS kodi"
                value={formData.reg_code_nds || ""}
                disabled
              />
            </div>
            <div className="single-field half-field-last">
              <label htmlFor="" className="mb-2">
                Manzil
              </label>
              <input
                type="text"
                name="address"
                placeholder="Manzil"
                value={formData.address || ""}
                disabled
              />
            </div>
            <div className="single-field half-field">
              <label htmlFor="" className="mb-2">
                Telefon
              </label>
              <input
                type="text"
                name="phone"
                placeholder="Telefon"
                value={formData.phone || ""}
                disabled
              />
            </div>
            <div className="single-field half-field-last">
              <label htmlFor="" className="mb-2">
                Asosiy R/C
              </label>
              <input
                type="text"
                name="main_rc"
                placeholder="Asosiy R/C"
                value={formData.main_rc || ""}
                disabled
              />
            </div>
            <div className="single-field half-field">
              <label htmlFor="" className="mb-2">
                MFO
              </label>
              <input
                type="text"
                name="mfo"
                placeholder="MFO"
                value={formData.mfo || ""}
                disabled
              />
            </div>
            <div className="single-field half-field-last">
              <label htmlFor="" className="mb-2">
                Viloyat/Shahar
              </label>
              <input
                type="text"
                name="region"
                placeholder="Viloyat/Shahar"
                value={formData.region || ""}
                disabled
              />
            </div>
            <div className="single-field half-field">
              <label htmlFor="" className="mb-2">
                Tuman
              </label>
              <input
                type="text"
                name="district"
                placeholder="Tuman"
                value={formData.district || ""}
                disabled
              />
            </div>
            <div className="single-field half-field-last">
              <label htmlFor="" className="mb-2">
                OKED
              </label>
              <input
                type="text"
                name="oked"
                placeholder="OKED"
                value={formData.oked || ""}
                disabled
              />
            </div>
            <div className="single-field half-field">
              <label htmlFor="" className="mb-2">
                Direktor FIO
              </label>
              <input
                type="text"
                name="director_name"
                placeholder="Direktor FIO"
                value={formData.director_name || ""}
                disabled
              />
            </div>
            <div className="single-field half-field-last">
              <label htmlFor="" className="mb-2">
                Direktor PINFL
              </label>
              <input
                type="text"
                name="director_pinfl"
                placeholder="Direktor PINFL"
                value={formData.director_pinfl || ""}
                disabled
              />
            </div>
            <div className="single-field half-field">
              <label htmlFor="" className="mb-2">
                Bosh xisobchi
              </label>
              <input
                type="text"
                name="chief_accountant"
                placeholder="Bosh xisobchi"
                value={formData.chief_accountant || ""}
                disabled
              />
            </div>
            <div className="single-field half-field-last">
              <label htmlFor="" className="mb-2">
                Chiqargan tovarlar
              </label>
              <input
                type="text"
                name="goods_issued_by"
                placeholder="Chiqargan tovarlar"
                value={formData.goods_issued_by || ""}
                disabled
              />
            </div>
            <div className="single-field half-field">
              <label htmlFor="" className="mb-2">
                NDS
              </label>
              <input
                type="text"
                name="nds"
                placeholder="NDS"
                value={formData.nds || ""}
                disabled
              />
            </div>
            <div className="single-field half-field-last">
              <label htmlFor="" className="mb-2">
                Aksiz solig'i
              </label>
              <input
                type="text"
                name="excise_tax"
                placeholder="Aksiz solig'i"
                value={formData.excise_tax || ""}
                disabled
              />
            </div>
            <div className="single-field half-field">
              <label htmlFor="" className="mb-2">
                Tovarlarning kelib chiqishi
              </label>
              <input
                type="text"
                name="origin_of_goods"
                placeholder="Tovarlarning kelib chiqishi"
                value={formData.origin_of_goods || ""}
                disabled
              />
            </div>
            <div className="single-field half-field-last">
              <label htmlFor="" className="mb-2">
                Kontrakt identifikatori bo'yicha avtomatik to'ldirish ID
              </label>
              <input
                type="text"
                name="auto_fill_cf_by_contract_id"
                placeholder="Kontrakt identifikatori bo'yicha avtomatik to'ldirish ID"
                value={formData.auto_fill_cf_by_contract_id || ""}
                disabled
              />
            </div>
            <div className="single-field half-field">
              <label htmlFor="" className="mb-2">
                Chegirmali takliflarni qabul qilish
              </label>
              <input
                type="text"
                name="accept_discount_offers"
                placeholder="Chegirmali takliflarni qabul qilish"
                value={formData.accept_discount_offers || ""}
                disabled
              />
            </div>
            {/* Include other fields similarly */}
          </div>
        </form>
      </div>
    </div>
  );
}
