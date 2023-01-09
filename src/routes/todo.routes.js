const express = require("express");
const {
  getTodos,
  addTodo,
  deleteTodo,
  updateCompletedTodo,
  updateTodo,
  getTodoById,
} = require("../controllers/todo/todo.controller");

const todoRouter = express.Router();

todoRouter.get("/todo", getTodos);
todoRouter.post("/todo", addTodo);
todoRouter.delete("/todo/:id", deleteTodo);
todoRouter.put("/todo/completed/:id", updateCompletedTodo);
todoRouter.put("/todo/:id", updateTodo);
todoRouter.get("/todo/:id", getTodoById);

module.exports = todoRouter;
