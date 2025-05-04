const express = require("express");
const router = express.Router();
const {
  createTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
  getTodoById,
} = require("../controllers/todo");

const { requireLogin } = require("../middlewares/auth");

// Get all Todos (Public)
router.get("/", requireLogin,getAllTodos);

// Create Todo (Protected)
router.post("/", requireLogin, createTodo);

// Update Todo (Protected)
router.put("/edit/:todoId", requireLogin, updateTodo);

// Delete Todo (Protected)
router.delete("/:todoId", requireLogin, deleteTodo);

// Get Todo by ID (Protected)
router.get("/:todoId", requireLogin, getTodoById);



module.exports = router;
