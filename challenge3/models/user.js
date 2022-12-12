const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "first name field is required !"],
    },
    lastName: {
      type: String,
      required: [true, "last name field is required !"],
    },
    email: {
      type: String,
      required: [true, "email field is required !"],
    },
    password: {
      type: String,
      required: [true, "passowrd field is required !"],
    },
    age: Number,

    todos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todo" }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Users = mongoose.model("User", UserSchema, "Users");
module.exports = Users;
