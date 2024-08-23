import React, { useState } from "react";

const EditCategory = ({ category, onSubmit }) => {
  const [name, setName] = useState(category.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id: category.id, name });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="categoryName" className="form-label">
          Kategoriya nomi
        </label>
        <input
          type="text"
          id="categoryName"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Saqlash
      </button>
    </form>
  );
};

export default EditCategory;
