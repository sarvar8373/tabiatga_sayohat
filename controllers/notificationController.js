import { DB } from "../utils/db.js";

export const addNotification = (req, res) => {
  const { user_id, message, type } = req.body;

  if (!user_id || !message || !type) {
    return res.status(400).json({
      Status: false,
      Error: "User ID, message, and type are required",
    });
  }

  // First, validate if user_id exists in the users table
  const validateUserSql = "SELECT id FROM users WHERE id = ?";
  DB.query(validateUserSql, [user_id], (err, results) => {
    if (err) {
      console.error("Error validating user:", err);
      return res
        .status(500)
        .json({ Status: false, Error: "Error validating user" });
    }

    if (results.length === 0) {
      return res
        .status(400)
        .json({ Status: false, Error: "User ID does not exist" });
    }

    // If user_id is valid, insert the notification
    const insertSql =
      "INSERT INTO notifications (user_id, message, type) VALUES (?, ?, ?)";
    DB.query(insertSql, [user_id, message, type], (err, result) => {
      if (err) {
        console.error("Error adding notification:", err);
        return res
          .status(500)
          .json({ Status: false, Error: "Error adding notification" });
      }
      res.json({ Status: true, Result: result.insertId });
    });
  });
};
export const editNotification = (req, res) => {
  const notificationId = req.params.id;
  const { user_id, message, type } = req.body;

  console.log("Received request body for edit:", req.body); // Log the request body for debugging

  if (!user_id || !message || !type) {
    return res.status(400).json({
      Status: false,
      Error: "User ID, message, and type are required",
    });
  }

  // Update the notification
  const updateSql =
    "UPDATE notifications SET message = ?, type = ? WHERE id = ? AND user_id = ?";
  DB.query(
    updateSql,
    [message, type, notificationId, user_id],
    (err, result) => {
      if (err) {
        console.error("Error updating notification:", err);
        return res
          .status(500)
          .json({ Status: false, Error: "Error updating notification" });
      }
      res.json({
        Status: true,
        Message: "Notification updated successfully",
      });
    }
  );
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
