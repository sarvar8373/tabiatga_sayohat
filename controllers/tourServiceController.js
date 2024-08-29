import { DB } from "../utils/db.js";

export const addTourService = (req, res) => {
  const { name, region_id } = req.body;

  if (!name || !region_id) {
    return res
      .status(400)
      .json({ Status: false, Error: "Name and  are required" });
  }

  const sql = "INSERT INTO tourism_services (name) VALUES (?)";
  DB.query(sql, [name], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ Status: false, Error: "Database error" });
    }
    res.json({
      Status: true,
      Result: { id: result.insertId, name },
    });
  });
};

export const getTourServices = (req, res) => {
  const sql = "SELECT * FROM tourism_services";
  DB.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query error" });
    return res.json({ Status: true, Result: result });
  });
};

export const getTourServiceRegion = (req, res) => {
  const regionId = req.params.region_id;
  console.log(`Received region_id: ${regionId}`); // Log received regionId

  const sql = "SELECT * FROM tourism_services WHERE region_id = ?";
  DB.query(sql, [regionId], (err, result) => {
    if (err) {
      console.error("Query error:", err);
      return res.status(500).json({ Status: false, Error: "Query error" });
    }

    console.log(`Query result: ${JSON.stringify(result)}`); // Log query result
    return res.json({ Status: true, Result: result });
  });
};

export const deleteTourService = (req, res) => {
  const districtId = req.params.id;
  const sql = "DELETE FROM tourism_services WHERE id = ?";

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
};

export const updateTourService = (req, res) => {
  const districtId = req.params.id;
  const { newName, newRegionId } = req.body;

  const sql = "UPDATE tourism_services SET name = ? WHERE id = ?";

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
};
