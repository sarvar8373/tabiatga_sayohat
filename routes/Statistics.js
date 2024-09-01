import express from "express";
import { DB } from "../utils/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const usersCount = await getCount("users");
    const toursCount = await getCount("tours");
    const organizationCount = await getCount("organization_details");
    const notificationCount = await getCount("notifications");
    return res.json({
      Status: true,
      Result: {
        users: usersCount,
        tours: toursCount,
        organization_details: organizationCount,
        notificationCount: notificationCount,
      },
    });
  } catch (error) {
    console.error(error);
    return res.json({ Status: false, Error: "Query error" });
  }
});

async function getCount(tableName) {
  return new Promise((resolve, reject) => {
    // Ensure tableName is a valid identifier
    const validTables = [
      "users",
      "tours",
      "organization_details",
      "notifications",
    ];
    if (!validTables.includes(tableName)) {
      return reject(new Error("Invalid table name"));
    }

    const sql = `SELECT COUNT(*) AS count FROM ??`;
    DB.query(sql, [tableName], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result[0].count);
      }
    });
  });
}

export { router as Statistics };
