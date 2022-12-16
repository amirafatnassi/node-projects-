const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MissonSchema = new Schema(
  {
    tache: {
      type: String,
      required: [true, "tache est obligatoire !"],
    },
    description: String,
    nombrePersonnes: Number,
    dateDebut: {
      type: Date,
      required: [true, "passowrd field is required !"],
    },
    dateFin: {
      type: Date,
      required: [true, "passowrd field is required !"],
    },

    equipe: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const missions = mongoose.model("Mission", MissonSchema, "Missions");
module.exports = missions;
