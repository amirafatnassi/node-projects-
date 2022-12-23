const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommandeSchema = new Schema(
  {
    prix_total_vente: { type: Number, default: 0 },
    liste_produits: [{ type: mongoose.Schema.Types.ObjectId, ref: "Produit" }],
    client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
  },
  { timestamps: true, versionKey: false }
);

const commandes = mongoose.model("Commande", CommandeSchema);
module.exports = commandes;
