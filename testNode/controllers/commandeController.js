const commandes = require("../models/commande");
const produits = require("../models/produit");

exports.getCommandes = async (req, res) => {
  try {
    const result = await commandes.find();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message || "erreur serveur" });
  }
};

exports.getCommande = async (req, res) => {
  try {
    const commande = await commandes
      .findById(req.params.id)
      .populate("liste_produits")
      .populate("client");
    if (commande) {
      res.status(200).send(commande);
    } else {
      res.status(401).send("commande n'existe pas !");
    }
  } catch (error) {
    res.status(500).send({ message: error.message || "erreur serveur" });
  }
};

exports.addCommande = async (req, res) => {
  try {
    const commande = await commandes.create(req.body);
    res.status(200).send(commande);
  } catch (error) {
    res.status(500).send({ message: error.message || "erreur serveur" });
  }
};

exports.updateCommande = async (req, res) => {
  try {
    await commandes.findByIdAndUpdate(req.params.id, req.body);
    const updatedCommande = await commandes.findById(req.params.id);
    res.status(200).send(updatedCommande);
  } catch (error) {
    res.status(500).send({ message: error.message || "erreur serveur" });
  }
};

exports.deleteCommande = async (req, res) => {
  try {
    const deletedCommande = await commandes.findByIdAndDelete(req.params.id);
    res.status(200).send(deletedCommande);
  } catch (error) {
    res.status(500).send({ message: error.message || "erreur serveur" });
  }
};

exports.affecterClientACommande = async (req, res) => {
  try {
    await commandes.findByIdAndUpdate(req.params.commandeId, {
      $push: { client: req.params.clientId },
    });
    const updatedCommande = await commandes.findById(req.params.commandeId);
    res.status(200).send(updatedCommande);
  } catch (error) {
    res.status(500).send({ message: error.message || "erreur serveur !" });
  }
};

exports.retirerClientDeCommande = async (req, res) => {
  try {
    await commandes.findByIdAndUpdate(req.params.commandeId, {
      $pull: { client: req.params.clientId },
    });
    const updatedCommande = await commandes.findById(req.params.commandeId);
    res.status(200).send(updatedCommande);
  } catch (error) {
    res.status(500).send({ message: error.message || "erreur serveur !" });
  }
};

exports.addProduitToCart = async (req, res) => {
  try {
    const produit = await produits.findById(req.params.produitId);
    if (produit.quantite <= 0) {
      res.status(400).send({ message: "quantité insuffisante !" });
    } else {
      await commandes.findByIdAndUpdate(req.params.commandeId, {
        $push: { liste_produits: req.params.produitId },
        $inc: { prix_total_vente: produit.prix },
      });
      await produits.findByIdAndUpdate(req.params.produitId, {
        $inc: { quantite: -1 },
      });
      const updatedCommande = await commandes.findById(req.params.commandeId);
      res.status(200).send(updatedCommande);
    }
  } catch (error) {
    res.status(500).send({ message: error.message || "erreur serveur !" });
  }
};

exports.retirerProduitFromCart = async (req, res) => {
  try {
    const _commande = await commandes.findById(req.params.commandeId); 
    if ((_commande.liste_produits.length==0)) {
      res.send({ message: "liste de produits vide !" });
    } else {
      //si produit existe traitement sinon produit n'existe pas

     const liste_produits = await _commande.liste_produits;
     const result=liste_produits.findOne(req.params.produitId);
     res.send(result);


      // await commandes.findByIdAndUpdate(req.params.commandeId, {
      //   $pull: { liste_produits: req.params.produitId },
      // });
      // await produits.findByIdAndUpdate(req.params.produitId, {
      //   $inc: { quantite: 1 },
      // });
      // const updatedCommande = await commandes.findById(req.params.commandeId);
      // res.status(200).send(updatedCommande);


    }
  } catch (error) {
    res.status(500).send({ message: error.message || "erreur serveur !" });
  }
};
