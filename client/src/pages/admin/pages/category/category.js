import React, { useEffect, useState } from "react";
import AddCategory from "./addCategory";
import EditCategory from "./editCategory";
import { getCategories } from "../../../../http/postsApi";
import { deleteCategory, putCategory } from "../../../../http/categryApi";

export default function Category() {
  const [category, setCategory] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editCategory, setEditCategory] = useState({ id: "", name: "" });
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false); // State for showing the edit modal

  useEffect(() => {
    getCategories()
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
          setFilteredPosts(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, [editMode]);

  const handleDelete = (categoryId) => {
    deleteCategory(categoryId)
      .then((result) => {
        if (result.data.Status) {
          setCategory(category.filter((c) => c.id !== categoryId));
          setFilteredPosts(filteredPosts.filter((c) => c.id !== categoryId));
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleCategoryAdded = (newCategory) => {
    setCategory([...category, newCategory]);
    setFilteredPosts([...filteredPosts, newCategory]);
  };

  const handleEdit = (categoryId) => {
    const selectedCategory = category.find((c) => c.id === categoryId);
    setEditCategory({ id: selectedCategory.id, name: selectedCategory.name });
    setShowEditCategoryModal(true); // Show the edit category modal
  };

  const handleEditSubmit = (updatedCategory) => {
    putCategory(updatedCategory.id, {
      newCategoryName: updatedCategory.name,
    })
      .then((result) => {
        if (result.data.Status) {
          setCategory(
            category.map((c) =>
              c.id === updatedCategory.id
                ? { ...c, name: updatedCategory.name }
                : c
            )
          );
          setFilteredPosts(
            filteredPosts.map((c) =>
              c.id === updatedCategory.id
                ? { ...c, name: updatedCategory.name }
                : c
            )
          );
          setShowEditCategoryModal(false); // Close the edit modal
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleCloseModal = () => {
    setShowEditCategoryModal(false);
    setShowAddCategoryModal(false);
    setEditMode(false);
    setEditCategory({ id: "", name: "" });
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredPosts(category);
    } else {
      const filtered = category.filter(
        (category) =>
          category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          category.id.toString().includes(searchTerm)
      );
      setFilteredPosts(filtered);
    }
  };

  return (
    <div className="container-fluid px-4">
      <h2 className="mt-4">Kategoriyalar</h2>
      <button
        type="button"
        className="btn btn-success px-3 my-3"
        onClick={() => setShowAddCategoryModal(true)}
      >
        Yaratish
      </button>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Qidiruv..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyUp={handleSearch}
      />

      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th className="text-light">ID</th>
            <th className="text-light">Nomi</th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts.map((c, index) => (
            <tr key={c.id}>
              <td>{index + 1}</td>
              <td className="d-flex justify-content-between">
                {c.name}{" "}
                <div>
                  <button
                    onClick={() => handleEdit(c.id)}
                    className="btn btn-warning mx-3"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="btn btn-danger"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddCategoryModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: "block" }}
          aria-labelledby="addCategoryModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addCategoryModalLabel">
                  Kategoriya qo'shish
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAddCategoryModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <AddCategory onCategoryAdded={handleCategoryAdded} />
              </div>
            </div>
          </div>
        </div>
      )}

      {showEditCategoryModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: "block" }}
          aria-labelledby="editCategoryModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editCategoryModalLabel">
                  Kategoriya tahrirlash
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <EditCategory
                  category={editCategory}
                  onSubmit={handleEditSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
