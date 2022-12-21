const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CvSchema = new Schema(
  {
    nom: String,
    prenom: String,
    sexe: String,
    email: { type: String, required: [true, "email is required"] },
    jobTitle: String,
    tel: Number,
    adresse: String,
    codePostal: Number,
    ville: String,
    dateNaissance: Date,
    lieuNaissance: String,
    permis: Boolean,
    nationalite: String,
    etatCivil: String,
    lienSiteInternet: String,
    lienLinkedIn: String,
    lienGithub: String,
    profile:String,
    image:Buffer,
    formations:[{ type: mongoose.Schema.Types.ObjectId, ref: "Formation" }],
    experiences:[{ type: mongoose.Schema.Types.ObjectId, ref: "Experience" }],
    interets:[{ type: mongoose.Schema.Types.ObjectId, ref: "Interet" }],
    langues:[{ type: mongoose.Schema.Types.ObjectId, ref: "Langue" }],
    competences:[{ type: mongoose.Schema.Types.ObjectId, ref: "Competence" }],
  },
  { timestamps: true, versionKey: false }
);

const cvs = mongoose.model("Cv", CvSchema);
module.exports = cvs;
