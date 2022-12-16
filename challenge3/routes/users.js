const express = require("express");
const {
  getAll,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  affectTodoToUser,
  deleteTodoFromUser,
} = require("../Controllers/userController");

const router = express.Router();

router.get("/users", getAll);

router.get("/users/:id", getUser);

router.post("/users", addUser);

router.put("/users/:id", updateUser);

router.delete("/users/:id", deleteUser);

router.put("/users/affecterTodoToUser/:idUser/:idTodo", affectTodoToUser);

router.put("/users/deleteToDo/:idUser/:idTodo",deleteTodoFromUser);

module.exports = router;
