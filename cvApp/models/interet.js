const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InteretSchema = new Schema(
  {
    interet:  String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const interets = mongoose.model("Interet", InteretSchema, "interets");
module.exports = interets;
