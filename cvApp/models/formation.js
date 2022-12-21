const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FormationSchema = new Schema(
  {
    formation: {
      type: String,
      required: [true, "formation est obligatoire !"],
    },
    description: String,
    dateDebut: Date,
    dateFin: Date,
    etablissement: String,
    ville: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const formations = mongoose.model("Formation", FormationSchema, "formations");
module.exports = formations;
