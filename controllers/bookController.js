const mongoose = require("mongoose");
const Book = require("../models/bookModel");

const getBooks = async (req, res) => {
  const books = await Book.find({}).sort({ createdAt: -1 });

  res.status(200).json(books);
};

const getBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such book" });
  }

  const book = await Book.findById(id);

  if (!book) {
    return res.status(404).json({ error: "No such book" });
  }

  res.status(200).json(book);
};

const createBook = async (req, res) => {
  const newBook = req.body;

  try {
    const book = await Book.create(newBook);
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such book" });
  }

  const book = await Book.findByIdAndUpdate(id, req.body, { new: true });

  if (!book) {
    return res.status(400).json({ error: "No such book" });
  }

  res.status(200).json(book);
};

const deleteBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such book" });
  }

  const book = await Book.findByIdAndDelete(id);

  if (!book) {
    return res.status(400).json({ error: "No such book" });
  }

  res.status(200).json({ message: "Deleted successfully" });
};

module.exports = {
  getBooks,
  getBook,
  createBook,
  deleteBook,
  updateBook,
};
