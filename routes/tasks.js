const express = require("express");
const {
  createTask,
  getTasks,
  getTask,
  deleteTask,
  updateTask,
} = require("../controllers/taskController");

const router = express.Router();

// Get all tasks
router.get("/", getTasks);

// Get a single task
router.get("/:id", getTask);

// POST a new task
router.post("/", createTask);

// Delete a task
router.delete("/:id", deleteTask);

// Update a task
router.patch("/:id", updateTask);

module.exports = router;
