const express = require("express");
const {
  createBook,
  getBooks,
  getBook,
  deleteBook,
  updateBook,
} = require("../controllers/bookController");

const router = express.Router();

// Get all books
router.get("/", getBooks);

// Get a single book
router.get("/:id", getBook);

// POST a new book
router.post("/", createBook);

// Delete a book
router.delete("/:id", deleteBook);

// Update a book
router.patch("/:id", updateBook);

module.exports = router;
