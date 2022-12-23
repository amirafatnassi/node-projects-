const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClientSchema = new Schema(
  {
    nom: String,
    prenom: String,
    email: { type: String, required: [true, "email is required"] },
    password: { type: String, required: [true, "password is required"] },
    role: { type: String, default: "CLIENT" }
  },
  { timestamps: true, versionKey: false }
);

const clients = mongoose.model("Client", ClientSchema);
module.exports = clients;
