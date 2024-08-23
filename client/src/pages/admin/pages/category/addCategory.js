import React, { useState } from "react";
import { postCategory } from "../../../../http/categryApi"; // Fixed typo in the import path

export default function AddCategory({ onCategoryAdded }) {
  const [categoryName, setCategoryName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    postCategory({ name: categoryName })
      .then((result) => {
        if (result.data.Status) {
          setStatus("success");
          setMessage("Kategoriya yaratildi");
          onCategoryAdded(result.data.Result);
          setCategoryName("");
        } else {
          setStatus("danger");
          setMessage(result.data.Error || "Kategoriya yaratishda xato");
        }
      })
      .catch((err) => {
        setStatus("danger");
        setMessage("Xatolik yuz berdi");
        console.error(err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      {message && (
        <div className={`alert alert-${status}`} role="alert">
          {message}
        </div>
      )}
      <div className="mb-3">
        <label className="form-label">Kategoriya nomi</label>
        <input
          type="text"
          id="categoryName"
          className="form-control"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Yaratish
      </button>
    </form>
  );
}
