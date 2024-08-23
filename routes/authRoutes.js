import express from "express";
import { verifyUser } from "../middleware/authMiddleware.js";
import {
  loginUser,
  logoutUser,
  addUser,
  getUserInfo,
  checkPhoneNumber,
  updateUser,
  getUserById,
  getAllUsers,
  deleteUser,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/add_user", addUser);
router.get("/user", verifyUser, getUserInfo);
router.post("/check-phone", checkPhoneNumber);
router.put("/user/:id", verifyUser, updateUser);
router.get("/user/:id", verifyUser, getUserById);
router.get("/users", verifyUser, getAllUsers);
router.get("/check", verifyUser, (req, res) =>
  res.json({ isAuthenticated: true })
);
router.delete("/user/:id", verifyUser, deleteUser);

export { router as authRouter };
