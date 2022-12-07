const Router = require("express");
const {
  getTodosController,
  addTodoController,
  deleteTodoController,
  updateCompletedTodoController,
  updateTodoController,
  getTodoById,
} = require("../controllers/todo/todo.controller");
const verifyToken = require("../middleware/auth.middleware")

const todoRouter = Router();

todoRouter.get("/todos", verifyToken, getTodosController);
todoRouter.post("/todo", verifyToken, addTodoController);
todoRouter.delete("/todo/:id", verifyToken, deleteTodoController);
todoRouter.put("/todo/completed/:id", verifyToken, updateCompletedTodoController);
todoRouter.put("/todo/:id", verifyToken, updateTodoController);
todoRouter.get("/todo/:id", verifyToken, getTodoById);

module.exports = todoRouter;
