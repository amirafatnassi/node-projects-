const express = require("express");
const { addTodo } = require("../Controllers/todoController");
const { getAllTodo } = require("../Controllers/todoController");
const { deleteTodo } = require("../Controllers/todoController");
const { updateTodo } = require("../Controllers/todoController");
const { getTodo } = require("../Controllers/todoController");
const router = express.Router();

router.get("/todos", getAllTodo);

router.get("/todos/:id", getTodo);

router.post("/todos", addTodo);

router.put("/todos/:id", updateTodo);

router.delete("/todos/:id", deleteTodo);

module.exports = router;
