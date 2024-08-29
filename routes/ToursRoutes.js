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

router.post("/add_tour", upload.single("image"), (req, res) => {
  const {
    title,
    description,
    price,
    price_description,
    user_id, // Ensure this is provided in the request
    region_id,
    district_id,
    status,
    tourism_service_id,
  } = req.body;
  const image = req.file ? req.file.filename : "";

  // Updated SQL query without the extra comma
  const sql = `INSERT INTO tours (title, description, image, price, price_description, user_id, region_id, district_id, status, tourism_service_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    title,
    description,
    image,
    price,
    price_description,
    user_id, // Ensure user_id is included if required
    region_id,
    district_id,
    status,
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

// Route to delete a tour by ID
router.delete("/tour/:id", (req, res) => {
  const tourId = req.params.id;
  const sql = "DELETE FROM tours WHERE id = ?";

  DB.query(sql, [tourId], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query error" });

    if (result.affectedRows > 0) {
      return res.json({ Status: true, Message: "Tour deleted successfully" });
    } else {
      return res.json({
        Status: false,
        Error: "Tour not found or already deleted",
      });
    }
  });
});

// Route to update a tour by ID
router.put("/tour/:id", upload.single("image"), (req, res) => {
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
  const newImage = req.file ? req.file.filename : null; // Use `null` if no file is uploaded

  // Start building the SQL query
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

  // Add the image field to the SQL query and parameters if an image is provided
  if (newImage) {
    sql += ", image = ?";
    params.push(newImage);
  }

  // Finish the SQL query with the WHERE clause
  sql += " WHERE id = ?";

  // Add the tourID to the parameters
  params.push(tourID);

  DB.query(sql, params, (err, result) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.json({ Status: false, Error: "Query error" });
    }

    if (result.affectedRows > 0) {
      // Fetch the updated tour data
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
