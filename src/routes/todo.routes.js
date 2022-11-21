const express = require("express");
const {
  getTodosController,
  addTodoController,
  deleteTodoController,
} = require("../controllers/todo/todo.controller");

const todoRouter = express.Router();

todoRouter.get("/todos", getTodosController);
todoRouter.post("/todo", addTodoController);
todoRouter.delete("/todo/:id", deleteTodoController);

module.exports = todoRouter;
