const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExperienceSchema = new Schema(
  {
    poste: {
      type: String,
      required: [true, "poste est obligatoire !"],
    },
    description: String,
    dateDebut: Date,
    dateFin: Date,
    employeur: String,
    ville: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const experiences = mongoose.model("Experience", ExperienceSchema, "experiences");
module.exports = experiences;
