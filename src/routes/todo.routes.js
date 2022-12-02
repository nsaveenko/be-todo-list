const express = require("express");
const {
  getTodosController,
  addTodoController,
  deleteTodoController,
  updateCompletedTodoController,
  updateTodoController,
  getTodoById,
} = require("../controllers/todo/todo.controller");

const todoRouter = express.Router();

todoRouter.get("/todos", getTodosController);
todoRouter.post("/todo", addTodoController);
todoRouter.delete("/todo/:id", deleteTodoController);
todoRouter.put("/todo/completed/:id", updateCompletedTodoController);
todoRouter.put("/todo/:id", updateTodoController);
todoRouter.get("/todo/:id", getTodoById);

module.exports = todoRouter;
