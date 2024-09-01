import express from "express";
import { DB } from "../utils/db.js";
import multer from "multer";
import path from "path";

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

router.post("/add_posts", upload.array("images"), (req, res) => {
  // Check the uploaded files

  const images = req.files
    ? req.files.map((file) => file.filename).join(",") // Join filenames if there are multiple files
    : "";

  const sql = `INSERT INTO posts (title, text, images, category_id, author_id) VALUES (?, ?, ?, ?, ?)`;

  const values = [
    req.body.title,
    req.body.text,
    images, // Updated to handle multiple files
    req.body.category_id,
    req.body.author_id,
  ];

  DB.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.json({ Status: false, Error: "Query error" });
    }

    return res.json({ Status: true, Message: "Post created successfully" });
  });
});

router.delete("/post/:id", (req, res) => {
  const categoryId = req.params.id;
  const sql = "DELETE FROM posts WHERE id = ?";

  DB.query(sql, [categoryId], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query error" });

    if (result.affectedRows > 0) {
      return res.json({
        Status: true,
        Message: "Category deleted successfully",
      });
    } else {
      return res.json({
        Status: false,
        Error: "Category not found or already deleted",
      });
    }
  });
});
router.put("/post/:id", upload.array("images"), (req, res) => {
  const postID = req.params.id;
  const newPostTitle = req.body.title;
  const newPostText = req.body.text;
  const newPostCategoryID = req.body.category_id;
  const newPostAuthorID = req.body.author_id;

  // Dynamic SQL query preparation
  let sql = "UPDATE posts SET ";
  const values = [];

  if (newPostTitle) {
    sql += "title = ?, ";
    values.push(newPostTitle);
  }
  if (newPostText) {
    sql += "text = ?, ";
    values.push(newPostText);
  }

  // Handling multiple images
  if (req.files && req.files.length > 0) {
    sql += "images = ?, "; // Set to new images
    const imageFilenames = req.files.map((file) => file.filename).join(",");
    values.push(imageFilenames);
  }

  if (newPostCategoryID) {
    sql += "category_id = ?, ";
    values.push(newPostCategoryID);
  }
  if (newPostAuthorID) {
    sql += "author_id = ?, ";
    values.push(newPostAuthorID);
  }

  sql = sql.slice(0, -2); // Remove the last comma and space
  sql += " WHERE id = ?";
  values.push(postID);

  DB.query(sql, values, (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query error", Details: err });
    }

    if (result.affectedRows > 0) {
      return res.json({ Status: true, Message: "Post updated successfully" });
    } else {
      return res.json({
        Status: false,
        Error: "Post not found or no changes made",
      });
    }
  });
});

router.get("/post/:id", (req, res) => {
  const postId = req.params.id;
  const sql = "SELECT * FROM posts WHERE id = ?";

  DB.query(sql, [postId], (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query error" });
    }

    // Check if a post with the specified ID was found
    if (result.length > 0) {
      return res.json({ Status: true, Result: result[0] }); // Return the first (and only) result
    } else {
      return res.json({ Status: false, Error: "Post not found" });
    }
  });
});
router.get("/surrounding/:id", (req, res) => {
  const postId = req.params.id;

  // Query to get the current post
  const getPostSql = "SELECT * FROM posts WHERE id = ?";

  // Queries to get previous and next posts
  const getPrevPostSql =
    "SELECT * FROM posts WHERE id < ? ORDER BY id DESC LIMIT 1";
  const getNextPostSql =
    "SELECT * FROM posts WHERE id > ? ORDER BY id ASC LIMIT 1";

  DB.query(getPostSql, [postId], (err, postResult) => {
    if (err) {
      return res.json({ Status: false, Error: "Query error" });
    }

    if (postResult.length === 0) {
      return res.json({ Status: false, Error: "Post not found" });
    }

    const post = postResult[0];

    // Get previous post
    DB.query(getPrevPostSql, [postId], (err, prevResult) => {
      if (err) {
        return res.json({ Status: false, Error: "Query error" });
      }

      const prevPost = prevResult.length > 0 ? prevResult[0] : null;

      // Get next post
      DB.query(getNextPostSql, [postId], (err, nextResult) => {
        if (err) {
          return res.json({ Status: false, Error: "Query error" });
        }

        const nextPost = nextResult.length > 0 ? nextResult[0] : null;

        res.json({
          Status: true,
          Result: {
            post,
            prevPost: prevPost || null,
            nextPost: nextPost || null,
          },
        });
      });
    });
  });
});
router.get("/posts", (req, res) => {
  const { category_id } = req.query;

  // Base SQL query
  let sql = "SELECT * FROM posts";
  let queryParams = [];

  // Add category_id filter if provided
  if (category_id) {
    sql += " WHERE category_id = ?";
    queryParams.push(category_id);
  }

  DB.query(sql, queryParams, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query error" });
    return res.json({ Status: true, Result: result });
  });
});
export { router as PostsRouter };
