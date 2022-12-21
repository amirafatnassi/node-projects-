const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema(
  {
    nom: { type: String },
    prenom: { type: String },
    categorie: String,
    specialite: String,
    NumCnss: Number,
    age: Number,
    disponibilite: Boolean,
  },
  { timestamps: true, versionKey: false }
);

const employees = mongoose.model("Employee", EmployeeSchema);
module.exports = employees;
