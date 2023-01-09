const Router = require("express");
const {
  getTodos,
  addTodo,
  deleteTodo,
  updateCompletedTodo,
  updateTodo,
  getTodoById,
} = require("../controllers/todo/todo.controller");
const verifyToken = require("../middleware/auth.middleware")

const todoRouter = Router();

todoRouter.get("/todo", verifyToken, getTodos);
todoRouter.post("/todo", verifyToken, addTodo);
todoRouter.delete("/todo/:id", verifyToken, deleteTodo);
todoRouter.put("/todo/completed/:id", verifyToken, updateCompletedTodo);
todoRouter.put("/todo/:id", verifyToken, updateTodo);
todoRouter.get("/todo/:id", verifyToken, getTodoById);

module.exports = todoRouter;
