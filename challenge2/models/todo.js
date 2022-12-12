const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create todo schema &model
const ToDoSchema = new Schema({
  name: {
    type: String,
    required: [true, "name field is required!"],
  },
  description: {
    type: String,
    required: [true, "description field is required!"],
  },
});

const ToDo=mongoose.model("todo",ToDoSchema);
module.exports=ToDo;
