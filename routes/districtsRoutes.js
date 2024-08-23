import express from "express";
import {
  addDistrict,
  getDistrictRegion,
  updateDistrict,
  deleteDistrict,
  getDistricts,
} from "../controllers/districtController.js";

const router = express.Router();

router.post("/add_districts", addDistrict);

router.get("/districts", getDistricts);

router.get("/districts/region/:region_id", getDistrictRegion);

router.delete("/districts/:id", deleteDistrict);

router.put("/districts/:id", updateDistrict);

export { router as categoryRouter };
