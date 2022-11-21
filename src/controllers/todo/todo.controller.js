const Todo = require("../../models/Todo");

const getTodosController = async (request, response) => {
  try {
    const todos = await Todo.find();
    response.status(200).send(todos);
  } catch (error) {
    response.status(500).send(`Server error ${error}`)
  }
};

module.exports = getTodosController;
