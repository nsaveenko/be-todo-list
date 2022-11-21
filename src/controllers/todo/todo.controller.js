const Todo = require("../../models/Todo");

const getTodosController = async (request, response) => {
  try {
    const todos = await Todo.find();
    response.status(200).send(todos);
  } catch (error) {
    response.status(500).send(`Server error ${error}`);
  }
};

const addTodoController = async (request, response) => {
  try {
    const todo = new Todo({
      date: request.body.date,
      description: request.body.description,
      email: request.body.email,
      completed: request.body.completed,
      title: request.body.title,
    });
    todo.save();
    response.status(200).send(todo);
  } catch (error) {
    response.status(500).send(`Server error ${error}`);
  }
};

const deleteTodoController = async (request, response) => {
  try {
    const todo = await Todo.findByIdAndDelete(request.params.id);
    response.status(200).send(todo);
  } catch (error) {
    response.status(500).send(`Server error ${error}`);
  }
};

const updateCompletedTodoController = async (request, response) => {
  try {
    const todo = await Todo.findById(request.params.id);
    todo.completed = !todo.completed;
    todo.save();
    response.status(200).send(todo);
  } catch (error) {
    response.status(500).send(`Server error ${error}`);
  }
};

const updateTodoController = async (request, response) => {
  try {
    const todo = await Todo.findByIdAndUpdate(request.params.id, request.body, {new: true});
    response.status(200).send(todo);
  } catch (error) {
    response.status(500).send(`Server error ${error}`);
  }
};

module.exports = {
  getTodosController,
  addTodoController,
  deleteTodoController,
  updateCompletedTodoController,
  updateTodoController,
};
