const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CondidatureSchema = new Schema(
  {
    cv: String ,
    offreTravail: String ,
  },
  { timestamps: true, versionKey: false }
);

const condidatures = mongoose.model("Condidature", CondidatureSchema);
module.exports = condidatures;
