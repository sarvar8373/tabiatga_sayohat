import express from "express";
import { DB } from "../utils/db.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

router.post("/add_tour", upload.array("images"), (req, res) => {
  const {
    title,
    description,
    price,
    price_description,
    user_id,
    region_id,
    district_id,
    status,
    notification_id, // Ensure this ID is valid and exists in the notifications table
    tourism_service_id,
  } = req.body;

  // Validate notification_id
  if (!notification_id || notification_id === "undefined") {
    return res.json({ Status: false, Error: "Invalid notification_id" });
  }

  // Additional check to verify if notification_id exists in the database (if needed)
  const checkNotificationSql = `SELECT COUNT(*) as count FROM notifications WHERE id = ?`;

  DB.query(checkNotificationSql, [notification_id], (err, result) => {
    if (err) {
      console.error(err);
      return res.json({
        Status: false,
        Error: "Query error while checking notification_id",
      });
    }

    if (result[0].count === 0) {
      return res.json({
        Status: false,
        Error: "Notification ID does not exist",
      });
    }

    const images = req.files
      ? req.files.map((file) => file.filename).join(",")
      : "";

    const sql = `INSERT INTO tours (title, description, images, price, price_description, user_id, region_id, district_id, status, notification_id, tourism_service_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      title,
      description,
      images,
      price,
      price_description,
      user_id,
      region_id,
      district_id,
      status,
      notification_id,
      tourism_service_id,
    ];

    DB.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.json({ Status: false, Error: "Query error" });
      }

      return res.json({ Status: true });
    });
  });
});

// Route to delete a tour by ID
router.delete("/tour/:id", (req, res) => {
  const tourId = req.params.id;

  // SQL query to delete the tour
  const sql = "DELETE FROM tours WHERE id = ?";

  DB.query(sql, [tourId], (err, result) => {
    if (err) {
      console.error("Error deleting tour:", err);
      return res.json({ Status: false, Error: "Query error" });
    }

    if (result.affectedRows > 0) {
      return res.json({
        Status: true,
        Message: "Tour deleted successfully",
      });
    } else {
      return res.json({
        Status: false,
        Error: "Tour not found or already deleted",
      });
    }
  });
});

// Route to update a tour by ID
router.put("/tour/:id", upload.array("images"), (req, res) => {
  const tourID = req.params.id;
  const {
    title,
    description,
    price,
    price_description,
    region_id,
    district_id,
    status,
    tourism_service_id,
  } = req.body;
  const newImages = req.files
    ? req.files.map((file) => file.filename).join(",")
    : null;

  let sql = `
    UPDATE tours 
    SET title = ?, 
        description = ?, 
        tourism_service_id = ?, 
        price = ?, 
        price_description = ?, 
        region_id = ?, 
        district_id = ?, 
        status = ?`;

  let params = [
    title,
    description,
    tourism_service_id,
    price,
    price_description,
    region_id,
    district_id,
    status,
  ];

  if (newImages) {
    sql += ", images = ?";
    params.push(newImages);
  }

  sql += " WHERE id = ?";
  params.push(tourID);

  DB.query(sql, params, (err, result) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.json({ Status: false, Error: "Query error" });
    }

    if (result.affectedRows > 0) {
      DB.query("SELECT * FROM tours WHERE id = ?", [tourID], (err, rows) => {
        if (err) {
          console.error("SQL Error:", err);
          return res.json({ Status: false, Error: "Query error" });
        }

        return res.json({ Status: true, Result: rows[0] });
      });
    } else {
      return res.json({
        Status: false,
        Error: "Tour not found or not updated",
      });
    }
  });
});

// Route to get a tour by ID
router.get("/tour/:id", (req, res) => {
  const tourId = req.params.id;
  const sql = "SELECT * FROM tours WHERE id = ?";

  DB.query(sql, [tourId], (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query error" });
    }

    if (result.length > 0) {
      return res.json({ Status: true, Result: result[0] });
    } else {
      return res.json({ Status: false, Error: "Tour not found" });
    }
  });
});

// Route to get all tours
router.get("/", (req, res) => {
  const userId = req.query.user_id; // Assuming user_id is passed as a query parameter
  const sql = userId
    ? "SELECT * FROM tours WHERE user_id = ?"
    : "SELECT * FROM tours";

  DB.query(sql, userId ? [userId] : [], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query error" });
    return res.json({ Status: true, Result: result });
  });
});

export { router as ToursRouter };
