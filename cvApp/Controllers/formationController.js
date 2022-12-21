const formations = require("../models/formation");

exports.getFormations = async (req, res) => {
  try {
    const result = await formations.find();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).json("erreur serveur");
  }
};

exports.getFormation = async (req, res) => {
  try {
    const formation = await formations.findById(req.params.id);
    if (formation) {
      res.status(200).send(formation);
    } else {
      res.status(401).send("formation not found !");
    }
  } catch (error) {
    res.status(500).json("erreur serveur");
  }
};

exports.addFormation = async (req, res) => {
  try {
    const formation = await formations.create(req.body);
    res.status(200).send(formation);
  } catch (error) {
    res.status(500).send("erreur serveur");
  }
};

exports.updateFormation = async (req, res) => {
  try {
    await formations.findByIdAndUpdate(req.params.id, req.body);
    const updatedFormation = await formations.findById(req.params.id);
    res.status(200).send(updatedFormation);
  } catch (error) {
    res.status(500).send("erreur serveur");
  }
};

exports.deleteFormation = async (req, res) => {
  try {
    const deletedFormation = await formations.findByIdAndDelete(req.params.id);
    res.status(200).send(deletedFormation);
  } catch (error) {
    res.status(500).send("erreur serveur");
  }
};
