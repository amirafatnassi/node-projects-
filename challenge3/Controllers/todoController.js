const todos = require("../models/todo");

exports.getAllTodo = async (req, res) => {
  try {
    const result = await todos.find();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).json("erreur serveur");
  }
};

exports.getTodo = async (req, res) => {
  try {
    const todo = await todos.findById(req.params.id);
    if (todo) {
      res.status(200).send(todo);
    } else {
      res.status(401).send("todo not found !");
    }
  } catch (error) {
    res.status(500).json("erreur serveur");
  }
};

exports.addTodo = async (req, res) => {
  try {
    const todo = await todos.create(req.body);
    res.status(200).send(todo);
  } catch (error) {
    res.status(500).send("erreur serveur");
  }
};

exports.updateTodo = async (req, res) => {
  try {
    await todos.findByIdAndUpdate(req.params.id, req.body);
    const updated_todo = await todos.findById(req.params.id);
    res.status(200).send(updated_todo);
  } catch (error) {
    res.status(500).send("erreur serveur");
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const deleted_user = await todos.findByIdAndDelete(req.params.id);
    res.status(200).send(deleted_user);
  } catch (error) {
    res.status(500).send("erreur serveur");
  }
};
