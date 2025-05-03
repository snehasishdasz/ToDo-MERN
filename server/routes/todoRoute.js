const express = require("express");
const router = express.Router();
const {
  createTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
} = require("../controllers/todo");

const { requireLogin } = require("../middlewares/auth");

// Get all Todos (Public)
router.get("/", requireLogin,getAllTodos);

// Create Todo (Protected)
router.post("/", requireLogin, createTodo);

// Update Todo (Protected)
router.put("/:todoId", requireLogin, updateTodo);

// Delete Todo (Protected)
router.delete("/:todoId", requireLogin, deleteTodo);



module.exports = router;
