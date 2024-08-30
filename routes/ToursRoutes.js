import express from "express";
import { DB } from "../utils/db.js";
import multer from "multer";
import path from "path";
import { addNotification } from "../controllers/notificationController.js";

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
    user_id,
    region_id,
    district_id,
    status,
    tourism_service_id,
  } = req.body;
  const image = req.file ? req.file.filename : "";

  const sql = `INSERT INTO tours (title, description, image, price, price_description, user_id, region_id, district_id, status, tourism_service_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    title,
    description,
    image,
    price,
    price_description,
    user_id,
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

    // Insert notification into the database
    const notificationSql =
      "INSERT INTO notifications (message, type) VALUES (?, ?)";
    const notificationMessage = `Yangi maskan qo'shildi: ${title}`;
    const notificationType = "info"; // Adjust the type if necessary

    DB.query(
      notificationSql,
      [notificationMessage, notificationType],
      (notificationErr) => {
        if (notificationErr) {
          console.error("Error adding notification:", notificationErr);
          return res.json({
            Status: false,
            Error: "Error adding notification",
          });
        }

        return res.json({ Status: true });
      }
    );
  });
});

// Route to delete a tour by ID
router.delete("/tour/:id", (req, res) => {
  const tourId = req.params.id;
  const sql = "DELETE FROM tours WHERE id = ?";

  DB.query(sql, [tourId], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query error" });

    if (result.affectedRows > 0) {
      // Insert notification into the database
      const notificationSql =
        "INSERT INTO notifications (message, type) VALUES (?, ?)";
      const notificationMessage = `Maskan o'chirildi ${tourId} deleted`;
      const notificationType = "delete"; // Adjust the type if necessary

      DB.query(
        notificationSql,
        [notificationMessage, notificationType],
        (notificationErr) => {
          if (notificationErr) {
            console.error("Error adding notification:", notificationErr);
            return res.json({
              Status: false,
              Error: "Error adding notification",
            });
          }

          return res.json({
            Status: true,
            Message: "Tour deleted successfully",
          });
        }
      );
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
  const newImage = req.file ? req.file.filename : null;

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

  if (newImage) {
    sql += ", image = ?";
    params.push(newImage);
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

        // Insert notification into the database
        const notificationSql =
          "INSERT INTO notifications (message, type) VALUES (?, ?)";
        const notificationMessage = `Maskan yangilandi: ${rows[0].title}`;
        const notificationType = "update"; // Adjust the type if necessary

        DB.query(
          notificationSql,
          [notificationMessage, notificationType],
          (notificationErr) => {
            if (notificationErr) {
              console.error("Error adding notification:", notificationErr);
              return res.json({
                Status: false,
                Error: "Error adding notification",
              });
            }

            return res.json({ Status: true, Result: rows[0] });
          }
        );
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
