import { DB } from "../utils/db.js";

// Add Category
export const addCategory = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ Status: false, Error: "Category name is required" });
  }

  const sql = "INSERT INTO category (name) VALUES (?)";
  DB.query(sql, [name], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ Status: false, Error: "Database error" });
    }
    res.json({ Status: true, Result: { id: result.insertId, name } });
  });
};

// Get Categories
export const getCategories = (req, res) => {
  const sql = "SELECT * FROM category";
  DB.query(sql, (err, result) => {
    if (err) {
      console.error("Query error:", err);
      return res.status(500).json({ Status: false, Error: "Query error" });
    }
    return res.json({ Status: true, Result: result });
  });
};

// Delete Category
export const deleteCategory = (req, res) => {
  const categoryId = req.params.id;
  const sql = "DELETE FROM category WHERE id = ?";

  DB.query(sql, [categoryId], (err, result) => {
    if (err) {
      console.error("Query error:", err);
      return res.status(500).json({ Status: false, Error: "Query error" });
    }

    if (result.affectedRows > 0) {
      return res.json({
        Status: true,
        Message: "Category deleted successfully",
      });
    } else {
      return res.json({
        Status: false,
        Error: "Category not found or already deleted",
      });
    }
  });
};

// Update Category
export const updateCategory = (req, res) => {
  const categoryId = req.params.id;
  const { newCategoryName } = req.body;

  if (!newCategoryName) {
    return res
      .status(400)
      .json({ Status: false, Error: "New category name is required" });
  }

  const sql = "UPDATE category SET name = ? WHERE id = ?";
  DB.query(sql, [newCategoryName, categoryId], (err, result) => {
    if (err) {
      console.error("Query error:", err);
      return res.status(500).json({ Status: false, Error: "Query error" });
    }

    if (result.affectedRows > 0) {
      return res.json({
        Status: true,
        Message: "Category updated successfully",
      });
    } else {
      return res.json({
        Status: false,
        Error: "Category not found or not updated",
      });
    }
  });
};
