const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema(
  {
    nom: String ,
    prenom: String ,
    email: { type: String, required: [true, "email is required"] },
    password: { type: String, required: [true, "password is required"] },
    categorie: String,
    departement: String,
  },
  { timestamps: true, versionKey: false }
);

const admins = mongoose.model("Admin", AdminSchema);
module.exports = admins;
