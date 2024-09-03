import express from "express";
import {
  addNotification,
  getNotifications,
  editNotification,
} from "../controllers/notificationController.js";

const router = express.Router();

router.post("/add_notification", addNotification);

router.get("/notifications", getNotifications);

router.put("/edit_notification/:id", editNotification);

export { router as NotificationRouter };
