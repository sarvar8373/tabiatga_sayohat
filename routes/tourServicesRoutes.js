import express from "express";
import {
  addTourService,
  getTourServices,
  getTourServiceRegion,
  deleteTourService,
  updateTourService,
  getTourServiceById,
} from "../controllers/tourServiceController.js";

const router = express.Router();

router.post("/add_service", addTourService);

router.get("/tour_services", getTourServices);
router.get("/tour_services/:id", getTourServiceById);
// router.get("/districts/region/:region_id", getDistrictRegion);

router.delete("/tour_services/:id", deleteTourService);

router.put("/tour_services/:id", updateTourService);

export { router as TourServiceRouter };
