const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String, required: [true, "email is required"] },
  password: { type: String, required: [true, "password is required"] },
},
{ timestamps: true, versionKey: false }
);

const users = mongoose.model("User", UserSchema);
module.exports = users;
