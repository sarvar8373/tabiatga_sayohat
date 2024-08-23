import express from "express";
import { DB } from "../utils/db.js";

const router = express.Router();

// Add organization details
router.post("/add_organization", (req, res) => {
  const {
    inn_pinfl,
    org_name,
    reg_code_nds,
    address,
    phone,
    main_rc,
    mfo,
    region,
    district,
    oked,
    director_name,
    director_pinfl,
    chief_accountant,
    goods_issued_by,
    nds,
    excise_tax,
    origin_of_goods,
    auto_fill_cf_by_contract_id,
    accept_discount_offers,
    user_id,
    status, // Assuming you have this from authentication
  } = req.body;

  if (!inn_pinfl || !org_name || !user_id) {
    return res
      .status(400)
      .json({ Status: false, Error: "Required fields are missing" });
  }

  const sql = `
    INSERT INTO organization_details 
    (
      user_id, inn_pinfl, org_name, reg_code_nds, address, phone, 
      main_rc, mfo, region, district, oked, director_name, director_pinfl, 
      chief_accountant, goods_issued_by, nds, excise_tax, origin_of_goods, 
      auto_fill_cf_by_contract_id, accept_discount_offers, status
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  DB.query(
    sql,
    [
      user_id,
      inn_pinfl,
      org_name,
      reg_code_nds,
      address,
      phone,
      main_rc,
      mfo,
      region,
      district,
      oked,
      director_name,
      director_pinfl,
      chief_accountant,
      goods_issued_by,
      nds,
      excise_tax,
      origin_of_goods,
      auto_fill_cf_by_contract_id,
      accept_discount_offers,
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
router.get("/organizations/:userId", (req, res) => {
  const { userId } = req.params;
  const sql = "SELECT * FROM organization_details WHERE user_id = ?";
  DB.query(sql, [userId], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query error" });
    return res.json({ Status: true, Result: result });
  });
});
// Update organization details
router.put("/organizations/:id", (req, res) => {
  const organizationId = req.params.id;
  const {
    inn_pinfl,
    org_name,
    reg_code_nds,
    address,
    phone,
    main_rc,
    mfo,
    region,
    district,
    oked,
    director_name,
    director_pinfl,
    chief_accountant,
    goods_issued_by,
    nds,
    excise_tax,
    origin_of_goods,
    auto_fill_cf_by_contract_id,
    accept_discount_offers,
    status,
  } = req.body;

  const sql = `
    UPDATE organization_details SET 
      inn_pinfl = ?, org_name = ?, reg_code_nds = ?, address = ?, phone = ?, 
      main_rc = ?, mfo = ?, region = ?, district = ?, oked = ?, 
      director_name = ?, director_pinfl = ?, chief_accountant = ?, 
      goods_issued_by = ?, nds = ?, excise_tax = ?, origin_of_goods = ?, 
      auto_fill_cf_by_contract_id = ?, accept_discount_offers = ?, status=? 
    WHERE id = ?
  `;

  DB.query(
    sql,
    [
      inn_pinfl,
      org_name,
      reg_code_nds,
      address,
      phone,
      main_rc,
      mfo,
      region,
      district,
      oked,
      director_name,
      director_pinfl,
      chief_accountant,
      goods_issued_by,
      nds,
      excise_tax,
      origin_of_goods,
      auto_fill_cf_by_contract_id,
      accept_discount_offers,
      organizationId,
      status,
    ],
    (err, result) => {
      if (err) return res.json({ Status: false, Error: "Query error" });

      if (result.affectedRows > 0) {
        return res.json({
          Status: true,
          Message: "Organization updated successfully",
        });
      } else {
        return res.json({
          Status: false,
          Error: "Organization not found or not updated",
        });
      }
    }
  );
});

export { router as OrganizationRouter };
