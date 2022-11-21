const express = require("express");
const {
  getTodosController,
  addTodoController,
  deleteTodoController,
  updateCompletedTodoController,
  updateTodoController,
} = require("../controllers/todo/todo.controller");

const todoRouter = express.Router();

todoRouter.get("/todos", getTodosController);
todoRouter.post("/todo", addTodoController);
todoRouter.delete("/todo/:id", deleteTodoController);
todoRouter.put("/todo/completed/:id", updateCompletedTodoController);
todoRouter.patch("/todo/:id", updateTodoController);

module.exports = todoRouter;
