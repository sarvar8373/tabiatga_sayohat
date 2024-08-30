import { DB } from "../utils/db.js";

export const addNotification = (req, res) => {
  const { message, type } = req.body;

  if (!message || !type) {
    return res
      .status(400)
      .json({ Status: false, Error: "Message and type are required" });
  }

  const sql = "INSERT INTO notifications (message, type) VALUES (?, ?)";
  DB.query(sql, [message, type], (err, result) => {
    if (err) {
      console.error("Error adding notification:", err);
      return res
        .status(500)
        .json({ Status: false, Error: "Error adding notification" });
    }
    res.json({ Status: true, Result: result.insertId });
  });
};

// Get all notifications
export const getNotifications = (req, res) => {
  const sql = "SELECT * FROM notifications ORDER BY created_at DESC";
  DB.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching notifications:", err);
      return res
        .status(500)
        .json({ Status: false, Error: "Error fetching notifications" });
    }
    res.json({ Status: true, Result: results });
  });
};
