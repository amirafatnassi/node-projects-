const offresTravail = require("../models/offreTravail");

exports.getOffresTravail = async (req, res) => {
  try {
    const result = await offresTravail.find();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).json("erreur serveur");
  }
};

exports.getOffreTravail = async (req, res) => {
  try {
    const offreTravail = await offresTravail.findById(req.params.id);
    if (offreTravail) {
      res.status(200).send(offreTravail);
    } else {
      res.status(401).send("offreTravail not found !");
    }
  } catch (error) {
    res.status(500).json("erreur serveur");
  }
};

exports.addOffreTravail = async (req, res) => {
  try {
    const offreTravail = await offresTravail.create(req.body);
    res.status(200).send(offreTravail);
  } catch (error) {
    res.status(500).send("erreur serveur");
  }
};

exports.updateOffreTravail = async (req, res) => {
  try {
    await offresTravail.findByIdAndUpdate(req.params.id, req.body);
    const updatedOffreTravail = await offresTravail.findById(req.params.id);
    res.status(200).send(updatedOffreTravail);
  } catch (error) {
    res.status(500).send("erreur serveur");
  }
};

exports.deleteOffreTravail = async (req, res) => {
  try {
    const deletedOffreTravail = await offresTravail.findByIdAndDelete(req.params.id);
    res.status(200).send(deletedOffreTravail);
  } catch (error) {
    res.status(500).send("erreur serveur");
  }
};
