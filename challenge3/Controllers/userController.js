const users = require("../models/user");

exports.getAll = async (req, res) => {
  try {
    const rep = await users.find({});
    res.send(rep);
    if (rep.length == 0) {
      res.status(400).send("no users found");
    } else {
      res.status(200).send(rep);
    }
  } catch (error) {
    res.status(500).json("error serveur");
  }
};

exports.getUser = async (req, res) => {
  try {
    const rep = await users.findById(req.params.id).populate("todos");
    if (rep) {
      res.status(200).send(rep);
    } else {
      res.status(400).send("user not found");
    }
  } catch (error) {
    res.status(500).json("erreur serveur");
  }
};

exports.addUser = async (req, res) => {
  try {
    const found = await users.findOne({ email: req.body.email });
    if (found) {
      res.status(400).send("email existant");
    } else {
      users.create(req.body);
      res.status(201).send("user created !");
    }
  } catch (error) {
    res.status(500).json("error serveur");
  }
};

exports.updateUser = async (req, res) => {
  try {
    await users.findByIdAndUpdate(req.params.id, req.body);
    const new_user = await users.findById(req.params.id);
    res.status(200).send(new_user);
  } catch (error) {
    res.status(500).json("erreur serveur");
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deleted_user = await users.findByIdAndDelete(req.params.id);
    res.status(200).send(deleted_user);
  } catch (error) {
    res.status(500).json("erreur serveur !");
  }
};

exports.affectTodoToUser = async () => {
  try {
    await users.findByIdAndUpdate(req.params.idUser, {
      $push: { todos: req.params.idTodo },
    });
    const updatedUser = await users.findById(req.params.idUser);
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).json("erreur serveur");
  }
};

exports.deleteTodoFromUser = async () => {
  try {
    await users.findByIdAndUpdate(req.params.idUser, {
      $pull: { todos: req.params.idTodo },
    });
    const updatedUser = await users.findById(req.params.idUser);
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).json("erreur serveur");
  }
};
