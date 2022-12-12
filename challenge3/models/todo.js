const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create todo schema &model
const ToDoSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name field is required!"],
    },
    description: {
      type: String,
      required: [true, "description field is required!"],
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ToDo = mongoose.model("Todo", ToDoSchema);
module.exports = ToDo;
