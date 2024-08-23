import express from "express";
import {
  addCategory,
  getCategories,
  deleteCategory,
  updateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/add_categories", addCategory);

router.get("/categories", getCategories);

router.delete("/categories/:id", deleteCategory);

router.put("/categories/:id", updateCategory);

export { router as categoryRouter };
