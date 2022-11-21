const express = require("express");
const getTodosController = require("../controllers/todo/todo.controller");

const todoRouter = express.Router();

todoRouter.get("/todos", getTodosController);

module.exports = todoRouter;
