const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OffreTravailSchema = new Schema(
  {
    jobTitle: {
      type: String,
      required: [true, "poste est obligatoire !"],
    },
    mission: String,
    email:String,
    recruteur: String,
    ville: String,
    type: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const offresTravail = mongoose.model("OffreTravail", OffreTravailSchema, "offresTravail");
module.exports = offresTravail;
