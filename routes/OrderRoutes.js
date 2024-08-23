import express from "express";
import { DB } from "../utils/db.js";

const router = express.Router();

// Route to create a new order
router.post("/add_order", (req, res) => {
  const { user_id, tour_id, quantity, total_price, status } = req.body;

  const sql = `INSERT INTO orders (user_id, tour_id, quantity, total_price, status) VALUES (?, ?, ?, ?, ?)`;
  const values = [user_id, tour_id, quantity, total_price, status];

  DB.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.json({ Status: false, Error: "Query error" });
    }
    return res.json({ Status: true, Message: "Order created successfully" });
  });
});

// Route to get an order by ID
router.get("/order/:id", (req, res) => {
  const orderId = req.params.id;
  const sql = "SELECT * FROM orders WHERE id = ?";

  DB.query(sql, [orderId], (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query error" });
    }

    if (result.length > 0) {
      return res.json({ Status: true, Result: result[0] });
    } else {
      return res.json({ Status: false, Error: "Order not found" });
    }
  });
});

// Route to get all orders or filter by user_id
router.get("/orders", (req, res) => {
  const userId = req.query.user_id; // Assuming user_id is passed as a query parameter
  const sql = userId
    ? "SELECT * FROM orders WHERE user_id = ?"
    : "SELECT * FROM orders";

  DB.query(sql, userId ? [userId] : [], (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query error" });
    }
    return res.json({ Status: true, Result: result });
  });
});

// Route to update an order by ID
router.put("/order/:id", (req, res) => {
  const orderId = req.params.id;
  const { quantity, total_price, status } = req.body;

  const sql = `UPDATE orders SET quantity=?, total_price=?, status=? WHERE id=?`;
  const values = [quantity, total_price, status, orderId];

  DB.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.json({ Status: false, Error: "Query error" });
    }

    if (result.affectedRows > 0) {
      return res.json({ Status: true, Message: "Order updated successfully" });
    } else {
      return res.json({
        Status: false,
        Error: "Order not found or not updated",
      });
    }
  });
});

// Route to delete an order by ID
router.delete("/order/:id", (req, res) => {
  const orderId = req.params.id;
  const sql = "DELETE FROM orders WHERE id = ?";

  DB.query(sql, [orderId], (err, result) => {
    if (err) {
      console.error(err);
      return res.json({ Status: false, Error: "Query error" });
    }

    if (result.affectedRows > 0) {
      return res.json({ Status: true, Message: "Order deleted successfully" });
    } else {
      return res.json({
        Status: false,
        Error: "Order not found or already deleted",
      });
    }
  });
});

export { router as OrdersRouter };
