import express from "express";
import { DB } from "../utils/db.js";

const router = express.Router();
router.post("/add_regions", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ Status: false, Error: "Category name is required" });
  }

  const sql = "INSERT INTO regions (name) VALUES (?)";
  DB.query(sql, [name], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ Status: false, Error: "Database error" });
    }
    res.json({ Status: true, Result: { id: result.insertId, name } });
  });
});
router.get("/regions", (req, res) => {
  const sql = "SELECT * FROM regions";
  DB.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query error" });
    return res.json({ Status: true, Result: result });
  });
});
router.delete("/regions/:id", (req, res) => {
  const categoryId = req.params.id;
  const sql = "DELETE FROM regions WHERE id = ?";

  DB.query(sql, [categoryId], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query error" });

    if (result.affectedRows > 0) {
      return res.json({
        Status: true,
        Message: "regions deleted successfully",
      });
    } else {
      return res.json({
        Status: false,
        Error: "regions not found or already deleted",
      });
    }
  });
});
router.put("/regions/:id", (req, res) => {
  const categoryId = req.params.id;
  const newCategoryName = req.body.newCategoryName;

  const sql = "UPDATE regions SET name = ? WHERE id = ?";

  DB.query(sql, [newCategoryName, categoryId], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query error" });

    if (result.affectedRows > 0) {
      return res.json({
        Status: true,
        Message: "regions updated successfully",
      });
    } else {
      return res.json({
        Status: false,
        Error: "regions not found or not updated",
      });
    }
  });
});
export { router as RegionsRouter };
