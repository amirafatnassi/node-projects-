const langues = require("../models/langue");

exports.getLangues = async (req, res) => {
  try {
    const result = await langues.find();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).json("erreur serveur");
  }
};

exports.getLangue = async (req, res) => {
  try {
    const langue = await langues.findById(req.params.id);
    if (langue) {
      res.status(200).send(langue);
    } else {
      res.status(401).send("langue not found !");
    }
  } catch (error) {
    res.status(500).json("erreur serveur");
  }
};

exports.addLangue = async (req, res) => {
  try {
    const langue = await langues.create(req.body);
    res.status(200).send(langue);
  } catch (error) {
    res.status(500).send("erreur serveur");
  }
};

exports.updateLangue = async (req, res) => {
  try {
    await langues.findByIdAndUpdate(req.params.id, req.body);
    const updatedLangue = await langues.findById(req.params.id);
    res.status(200).send(updatedLangue);
  } catch (error) {
    res.status(500).send("erreur serveur");
  }
};

exports.deleteLangue = async (req, res) => {
  try {
    const deletedLangue = await langues.findByIdAndDelete(req.params.id);
    res.status(200).send(deletedLangue);
  } catch (error) {
    res.status(500).send("erreur serveur");
  }
};
