const Todo = require("../../models/Todo");

const getTodos = async (request, response) => {
  try {
    const todos = await Todo.find();
    response.send(todos);
  } catch (error) {
    response.send(`Server error ${error}`);
  }
};

const addTodo = async (request, response) => {
  try {
    const todo = new Todo({
      date: request.body.date,
      description: request.body.description,
      email: request.body.email,
      completed: request.body.completed,
      title: request.body.title,
    });
    await todo.save();
    response.send(todo);
  } catch (error) {
    response.send(`Server error ${error}`);
  }
};

const deleteTodo = async (request, response) => {
  try {
    const todo = await Todo.findByIdAndDelete(request.params.id);
    response.send(todo);
  } catch (error) {
    response.send(`Server error ${error}`);
  }
};

const updateCompletedTodo = async (request, response) => {
  try {
    const todo = await Todo.findById(request.params.id);
    todo.completed = !todo.completed;
    await todo.save();
    response.send(todo);
  } catch (error) {
    response.send(`Server error ${error}`);
  }
};

const updateTodo = async (request, response) => {
  try {
    const todo = await Todo.findByIdAndUpdate(request.params.id, request.body, {new: true});
    response.send(todo);
  } catch (error) {
    response.send(`Server error ${error}`);
  }
};

const getTodoById = async (request, response) => {
  try {
    const todo = await Todo.findById(request.params.id);
    response.send(todo);
  } catch (error) {
    response.send(`Server error ${error}`);
  }
};

module.exports = {
  getTodos,
  addTodo,
  deleteTodo,
  updateCompletedTodo,
  updateTodo,
  getTodoById,
};
