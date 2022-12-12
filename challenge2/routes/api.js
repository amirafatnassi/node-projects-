const express = require("express");
const todo = require("../models/todo");
const router = express.Router();

router.get("/todos", function (req, res, next) {
  todo.find({}).then(function (todos) {
    res.send(todos);
  });
});

router.get('/todos/:id', function(req,res, next){
    todo.findById(req.params.id).then(function(x){
        res.send(x);
    });
})

router.post("/todos", function (req, res, next) {
  todo.create(req.body).then(function (ninja) {
    res.send(ninja);
  });
});

router.put("/todos/:id", function (req, res, next) {
  todo.findByIdAndUpdate(req.params.id, req.body).then(function (x) {
    todo.findOne({ _id: req.params.id }).then(function (x) {
      res.send(x);
    });
  });
});

router.delete("/todos/:id", function (req, res, next) {
  todo.findByIdAndDelete(req.params.id).then(function (x) {
    res.send(x);
  });
});

module.exports = router;
