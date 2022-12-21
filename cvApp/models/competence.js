const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CompetenceSchema = new Schema(
  {
    competence: {
      type: String,
      required: [true, "compétence est obligatoire !"],
    },
    niveau: Number
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const competences = mongoose.model("Competence", CompetenceSchema, "competences");
module.exports = competences;
