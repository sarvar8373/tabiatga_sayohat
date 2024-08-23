import express from "express";
import { DB } from "../utils/db.js";

const router = express.Router();
router.post("/add_districts", (req, res) => {
  const { name, region_id } = req.body;

  if (!name || !region_id) {
    return res
      .status(400)
      .json({ Status: false, Error: "Name and region_id are required" });
  }

  const sql = "INSERT INTO districts (name, region_id) VALUES (?, ?)";
  DB.query(sql, [name, region_id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ Status: false, Error: "Database error" });
    }
    res.json({
      Status: true,
      Result: { id: result.insertId, name, region_id },
    });
  });
});

router.get("/districts", (req, res) => {
  const sql = "SELECT * FROM districts";
  DB.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query error" });
    return res.json({ Status: true, Result: result });
  });
});
router.get("/districts/region/:region_id", (req, res) => {
  const regionId = req.params.region_id;
  console.log(`Received region_id: ${regionId}`); // Log received regionId

  const sql = "SELECT * FROM districts WHERE region_id = ?";
  DB.query(sql, [regionId], (err, result) => {
    if (err) {
      console.error("Query error:", err);
      return res.status(500).json({ Status: false, Error: "Query error" });
    }

    console.log(`Query result: ${JSON.stringify(result)}`); // Log query result
    return res.json({ Status: true, Result: result });
  });
});

router.delete("/districts/:id", (req, res) => {
  const districtId = req.params.id;
  const sql = "DELETE FROM districts WHERE id = ?";

  DB.query(sql, [districtId], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query error" });

    if (result.affectedRows > 0) {
      return res.json({
        Status: true,
        Message: "District deleted successfully",
      });
    } else {
      return res.json({
        Status: false,
        Error: "District not found or already deleted",
      });
    }
  });
});

router.put("/districts/:id", (req, res) => {
  const districtId = req.params.id;
  const { newName, newRegionId } = req.body;

  const sql = "UPDATE districts SET name = ?, region_id = ? WHERE id = ?";

  DB.query(sql, [newName, newRegionId, districtId], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query error" });

    if (result.affectedRows > 0) {
      return res.json({
        Status: true,
        Message: "District updated successfully",
      });
    } else {
      return res.json({
        Status: false,
        Error: "District not found or not updated",
      });
    }
  });
});

export { router as DistrictRouter };
