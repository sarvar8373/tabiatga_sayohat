import express from "express";
import {
  addNotification,
  getNotifications,
} from "../controllers/notificationController.js";

const router = express.Router();

router.post("/add_notification", addNotification);

router.get("/notifications", getNotifications);

export { router as NotificationRouter };
