import express from "express";
import cors from "cors";
import { PostsRouter } from "./routes/PostsRoutes.js";
import { PagesRouter } from "./routes/PagesRoutes.js";
import { fileURLToPath } from "url";
import path from "path";
import cookieParser from "cookie-parser";
import { Statistics } from "./routes/Statistics.js";
import dotenv from "dotenv";
import { ToursRouter } from "./routes/ToursRoutes.js";
import { OrganizationRouter } from "./routes/OrganizationRoutes.js";
import { RegionsRouter } from "./routes/RegionRoutes.js";
import { DistrictRouter } from "./routes/DistrictRoutes.js";
import { OrdersRouter } from "./routes/OrderRoutes.js";
import { authRouter } from "./routes/authRoutes.js";
import { categoryRouter } from "./routes/categoriesRoutes.js";
import { TourServiceRouter } from "./routes/tourServicesRoutes.js";
import { NotificationRouter } from "./routes/notificationRoutes.js";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", "https://kasaba.softpro.uz"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/posts", PostsRouter);
app.use("/organization", OrganizationRouter);
app.use("/tours", ToursRouter);
app.use("/category", categoryRouter);
app.use("/region", RegionsRouter);
app.use("/district", DistrictRouter);
app.use("/orders", OrdersRouter);
app.use("/statistics", Statistics);
app.use("/pages", PagesRouter);
app.use("/services", TourServiceRouter);
app.use("/notification", NotificationRouter);
app.listen(process.env.PORT || 9000, () => {
  console.log("Server runing");
});
