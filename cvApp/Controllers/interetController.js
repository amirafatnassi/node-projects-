const interets = require("../models/interet");

exports.getInterets = async (req, res) => {
  try {
    const result = await interets.find();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).json("erreur serveur");
  }
};

exports.getInteret = async (req, res) => {
  try {
    const interet = await interets.findById(req.params.id);
    if (interet) {
      res.status(200).send(interet);
    } else {
      res.status(401).send("interet not found !");
    }
  } catch (error) {
    res.status(500).json("erreur serveur");
  }
};

exports.addInteret = async (req, res) => {
  try {
    const interet = await interets.create(req.body);
    res.status(200).send(interet);
  } catch (error) {
    res.status(500).send("erreur serveur");
  }
};

exports.updateInteret = async (req, res) => {
  try {
    await interets.findByIdAndUpdate(req.params.id, req.body);
    const updatedInteret = await interets.findById(req.params.id);
    res.status(200).send(updatedInteret);
  } catch (error) {
    res.status(500).send("erreur serveur");
  }
};

exports.deleteInteret = async (req, res) => {
  try {
    const deletedInteret = await interets.findByIdAndDelete(req.params.id);
    res.status(200).send(deletedInteret);
  } catch (error) {
    res.status(500).send("erreur serveur");
  }
};
