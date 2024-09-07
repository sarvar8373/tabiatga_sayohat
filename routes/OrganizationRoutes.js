import express from "express";
import { DB } from "../utils/db.js";

const router = express.Router();

// Add organization details
router.post("/add_organization", (req, res) => {
  const {
    inn_pinfl,
    org_name,
    address,
    phone,
    mfo,
    region_id,
    district_id,
    director_name,
    excise_tax, // This should be an array
    user_id,
    notification_id,
    status,
  } = req.body;

  if (!inn_pinfl || !org_name || !user_id) {
    return res
      .status(400)
      .json({ Status: false, Error: "Required fields are missing" });
  }

  const excise_tax_json = JSON.stringify(excise_tax); // Convert array to JSON string

  const sql = `
  INSERT INTO organization_details 
  (
    user_id, inn_pinfl, org_name, address, phone, 
    mfo, region_id, district_id, director_name, 
    excise_tax, notification_id, status
  ) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  DB.query(
    sql,
    [
      user_id,
      inn_pinfl,
      org_name,
      address,
      phone,
      mfo,
      region_id,
      district_id,
      director_name,
      excise_tax_json, // Insert JSON string
      notification_id,
      status,
    ],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ Status: false, Error: "Database error" });
      }
      res.json({ Status: true, Result: { id: result.insertId, org_name } });
    }
  );
});

// Get all organizations
router.get("/organizations", (req, res) => {
  const sql = "SELECT * FROM organization_details";
  DB.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query error" });
    return res.json({ Status: true, Result: result });
  });
});

// Delete an organization
router.delete("/organizations/:id", (req, res) => {
  const organizationId = req.params.id;
  const sql = "DELETE FROM organization_details WHERE id = ?";

  DB.query(sql, [organizationId], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query error" });

    if (result.affectedRows > 0) {
      return res.json({
        Status: true,
        Message: "Organization deleted successfully",
      });
    } else {
      return res.json({
        Status: false,
        Error: "Organization not found or already deleted",
      });
    }
  });
});

// Get organizations by user ID
router.get("/organizations/:userId", (req, res) => {
  const { userId } = req.params;
  const sql = "SELECT * FROM organization_details WHERE user_id = ?";
  DB.query(sql, [userId], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query error" });
    return res.json({ Status: true, Result: result });
  });
});

router.put("/organization/status/:id", (req, res) => {
  const organizationId = req.params.id;
  const { status } = req.body;

  // Validate status
  if (status === undefined) {
    return res.status(400).json({ Status: false, Error: "Status is required" });
  }

  const sql = "UPDATE organization_details SET status  = ? WHERE id = ?";
  const params = [status, organizationId];

  DB.query(sql, params, (err, result) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.status(500).json({ Status: false, Error: "Query error" });
    }

    if (result.affectedRows > 0) {
      return res.json({
        Status: true,
        Message: "Tour status updated successfully",
      });
    } else {
      return res.status(404).json({
        Status: false,
        Error: "Tour not found or status not updated",
      });
    }
  });
});
router.put("/organization/cause/:id", (req, res) => {
  const organizationId = req.params.id;
  const { cause } = req.body;

  // Validate cause
  if (cause === undefined) {
    return res.status(400).json({ Status: false, Error: "Cause is required" });
  }

  const sql = "UPDATE organization_details SET comment = ? WHERE id = ?";
  const params = [cause, organizationId];

  DB.query(sql, params, (err, result) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.status(500).json({ Status: false, Error: "Query error" });
    }

    if (result.affectedRows > 0) {
      return res.json({
        Status: true,
        Message: "Tour cause updated successfully",
      });
    } else {
      return res.status(404).json({
        Status: false,
        Error: "Tour not found or cause not updated",
      });
    }
  });
});
// Update organization details
router.put("/organizations/:id", (req, res) => {
  const organizationId = req.params.id;
  const {
    inn_pinfl,
    org_name,
    address,
    phone,
    mfo,
    region_id,
    district_id,
    director_name,
    excise_tax,
    status,
  } = req.body;

  const sql = `
    UPDATE organization_details SET 
      inn_pinfl = ?, 
      org_name = ?,  
      address = ?, 
      phone = ?, 
      mfo = ?, 
      region_id = ?, 
      district_id = ?, 
      director_name = ?, 
      excise_tax = ?,
      status = ? 
    WHERE id = ?
  `;

  const params = [
    inn_pinfl,
    org_name,
    address,
    phone,
    mfo,
    region_id,
    district_id,
    director_name,
    excise_tax,
    status,
    organizationId,
  ];

  DB.query(sql, params, (err, result) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.json({ Status: false, Error: "Query error" });
    }

    if (result.affectedRows > 0) {
      DB.query(
        "SELECT * FROM organization_details WHERE id = ?",
        [organizationId],
        (err, rows) => {
          if (err) {
            console.error("SQL Error:", err);
            return res.json({ Status: false, Error: "Query error" });
          }

          return res.json({ Status: true, Result: rows[0] });
        }
      );
    } else {
      return res.json({
        Status: false,
        Error: "Organization not found or not updated",
      });
    }
  });
});

export { router as OrganizationRouter };
