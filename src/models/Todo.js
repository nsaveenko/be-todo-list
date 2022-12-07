const { Schema, model } = require("mongoose");

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
  date: {
    type: String,
    required: true,
    default: Date.now(),
  },
});

const Todo = model("Todo", TodoSchema);

module.exports = Todo;
