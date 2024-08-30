import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { DB } from "../utils/db.js";

const salt = 10;

// Handle user login
const loginUser = (req, res) => {
  const { phone_number, password } = req.body;
  const sql = "SELECT * FROM users WHERE phone_number = ?";
  DB.query(sql, [phone_number], (err, result) => {
    if (err)
      return res.status(500).json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (err, isMatch) => {
        if (err)
          return res
            .status(500)
            .json({ loginStatus: false, Error: "Error comparing passwords" });
        if (isMatch) {
          const { id, phone_number, full_name, role, region_id, district_id } =
            result[0];
          const token = jwt.sign(
            { id, phone_number, full_name, role, region_id, district_id },
            "jwt_secret_key",
            { expiresIn: "1d" }
          );
          res.cookie("token", token, {
            secure: true,
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000,
          });
          return res.json({ token, loginStatus: true });
        } else {
          return res.status(401).json({
            loginStatus: false,
            Error: "Wrong phone number or password",
          });
        }
      });
    } else {
      return res
        .status(401)
        .json({ loginStatus: false, Error: "Wrong phone number or password" });
    }
  });
};

// Handle user logout
const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.json({ success: true });
};

// Add a new user
const addUser = (req, res) => {
  const { phone_number, full_name, password, role = "customer" } = req.body;
  bcrypt.hash(password, salt, (err, hash) => {
    if (err)
      return res
        .status(500)
        .json({ Status: false, Error: "Error hashing password" });
    const sql =
      "INSERT INTO users (phone_number, full_name, password, role) VALUES (?, ?, ?, ?)";
    DB.query(sql, [phone_number, full_name, hash, role], (err) => {
      if (err)
        return res.status(500).json({ Status: false, Error: "Query error" });
      return res.json({ Status: true });
    });
  });
};

// Get user info
const getUserInfo = (req, res) => {
  const { phone_number, full_name, role, region_id, district_id, id } =
    req.user;
  if (!id)
    return res
      .status(404)
      .json({ Status: false, Message: "User information is not available." });
  return res.json({
    Status: true,
    phone_number,
    full_name,
    role,
    region_id,
    district_id,
    id,
  });
};

// Check if phone number exists
const checkPhoneNumber = (req, res) => {
  const { phone_number } = req.body;
  const sql = "SELECT * FROM users WHERE phone_number = ?";
  DB.query(sql, [phone_number], (err, result) => {
    if (err)
      return res.status(500).json({ Status: false, Error: "Query error" });
    return res.json({ Status: true, exists: result.length > 0 });
  });
};

// Update user details
const updateUser = (req, res) => {
  const userID = req.params.id;
  const { phone_number, full_name, password, role, region_id, district_id } =
    req.body;

  // Base SQL query and values
  let sql =
    "UPDATE users SET phone_number=?, full_name=?, role=?, region_id=?, district_id=? WHERE id=?";
  let values = [phone_number, full_name, role, region_id, district_id, userID];

  // If password is provided and not empty, hash it
  if (password && password.trim() !== "") {
    bcrypt.hash(password, salt, (hashErr, hash) => {
      if (hashErr) {
        console.error("Hash Error:", hashErr);
        return res
          .status(500)
          .json({ Status: false, Error: "Error hashing password" });
      }

      sql =
        "UPDATE users SET phone_number=?, full_name=?, password=?, role=?, region_id=?, district_id=? WHERE id=?";
      values = [
        phone_number,
        full_name,
        hash,
        role,
        region_id,
        district_id,
        userID,
      ];

      // Perform the update query with password
      DB.query(sql, values, (err, result) => {
        if (err) {
          console.error("SQL Error:", err);
          return res
            .status(500)
            .json({ Status: false, Error: "Database error" });
        }

        if (result.affectedRows > 0) {
          // Fetch and return the updated user data
          DB.query(
            "SELECT * FROM users WHERE id = ?",
            [userID],
            (fetchErr, rows) => {
              if (fetchErr) {
                console.error("SQL Error:", fetchErr);
                return res
                  .status(500)
                  .json({ Status: false, Error: "Database error" });
              }
              return res.json({ Status: true, Result: rows[0] });
            }
          );
        } else {
          return res
            .status(404)
            .json({ Status: false, Error: "User not found or not updated" });
        }
      });
    });
  } else {
    // Perform the update query without password
    DB.query(sql, values, (err, result) => {
      if (err) {
        console.error("SQL Error:", err);
        return res.status(500).json({ Status: false, Error: "Database error" });
      }

      if (result.affectedRows > 0) {
        // Fetch and return the updated user data
        DB.query(
          "SELECT * FROM users WHERE id = ?",
          [userID],
          (fetchErr, rows) => {
            if (fetchErr) {
              console.error("SQL Error:", fetchErr);
              return res
                .status(500)
                .json({ Status: false, Error: "Database error" });
            }
            return res.json({ Status: true, Result: rows[0] });
          }
        );
      } else {
        return res
          .status(404)
          .json({ Status: false, Error: "User not found or not updated" });
      }
    });
  }
};

// Retrieve user by ID
const getUserById = (req, res) => {
  const userID = req.params.id;
  const sql = "SELECT * FROM users WHERE id = ?";
  DB.query(sql, [userID], (err, result) => {
    if (err)
      return res.status(500).json({ Status: false, Error: "Query error" });
    return result.length > 0
      ? res.json({ Status: true, Result: result[0] })
      : res.status(404).json({ Status: false, Error: "User not found" });
  });
};

// Retrieve all users
const getAllUsers = (req, res) => {
  const sql = "SELECT * FROM users";
  DB.query(sql, (err, result) => {
    if (err)
      return res.status(500).json({ Status: false, Error: "Query error" });
    return res.json({ Status: true, Result: result });
  });
};

// Delete a user by ID
const deleteUser = (req, res) => {
  const userID = req.params.id;
  const sql = "DELETE FROM users WHERE id = ?";
  DB.query(sql, [userID], (err, result) => {
    if (err)
      return res.status(500).json({ Status: false, Error: "Query error" });
    return result.affectedRows > 0
      ? res.json({ Status: true, Message: "User deleted successfully" })
      : res
          .status(404)
          .json({ Status: false, Error: "User not found or already deleted" });
  });
};

// Handle SQL query results
const handleQueryResult = (res) => (err, result) => {
  if (err) return res.status(500).json({ Status: false, Error: "Query error" });
  return result.affectedRows > 0
    ? res.json({ Status: true, Message: "Operation successful" })
    : res
        .status(404)
        .json({ Status: false, Error: "User not found or not updated" });
};

export {
  loginUser,
  logoutUser,
  addUser,
  getUserInfo,
  checkPhoneNumber,
  updateUser,
  getUserById,
  getAllUsers,
  deleteUser,
};
