const produits = require("../models/produit");

exports.getProduits = async (req, res) => {
  try {
    const result = await produits.find();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message || "erreur serveur" });
  }
};

exports.getProduit = async (req, res) => {
  try {
    const produit = await produits.findById(req.params.id);
    if (produit) {
      res.status(200).send(produit);
    } else {
      res.status(401).send("produit n'existe pas !");
    }
  } catch (error) {
    res.status(500).send({ message: error.message || "erreur serveur" });
  }
};

exports.addProduit = async (req, res) => {
  try {
    const produit = await produits.create(req.body);
    res.status(200).send({message: "created successfully !" });
  } catch (error) {
    res.status(500).send({ message: error.message || "erreur serveur" });
  }
};

exports.updateProduit = async (req, res) => {
  try {
    await produits.findByIdAndUpdate(req.params.id, req.body);
    const updatedProduit = await produits.findById(req.params.id);
    res.status(200).send(updatedProduit);
  } catch (error) {
    res.status(500).send({ message: error.message || "erreur serveur" });
  }
};

exports.deleteProduit = async (req, res) => {
  try {
    const deletedProduit = await produits.findByIdAndDelete(req.params.id);
    res.status(200).send({message:"deleted successfully !"});
  } catch (error) {
    res.status(500).send({ message: error.message || "erreur serveur" });
  }
};
