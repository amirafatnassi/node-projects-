const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProduitSchema = new Schema(
  {
    nom: String,
    description: String,
    quantite: { type: Number, required: [true, "quantité obligatoire"] },
    prix: Number,
  },
  { timestamps: true, versionKey: false }
);

const produits = mongoose.model("Produit", ProduitSchema);
module.exports = produits;
