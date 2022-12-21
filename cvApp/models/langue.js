const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LangueSchema = new Schema(
  {
    langue: {
      type: String,
      required: [true, "langue est obligatoire !"],
    },
    niveau: Number
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const langues = mongoose.model("Langue", LangueSchema, "langues");
module.exports = langues;
