const competences = require("../models/competence");

exports.getCompetences = async (req, res) => {
  try {
    const result = await competences.find();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).json("erreur serveur");
  }
};

exports.getCompetence = async (req, res) => {
  try {
    const competence = await competences.findById(req.params.id);
    if (competence) {
      res.status(200).send(competence);
    } else {
      res.status(401).send("competence not found !");
    }
  } catch (error) {
    res.status(500).json("erreur serveur");
  }
};

exports.addCompetence = async (req, res) => {
  try {
    const competence = await competences.create(req.body);
    res.status(200).send(competence);
  } catch (error) {
    res.status(500).send("erreur serveur");
  }
};

exports.updateCompetence = async (req, res) => {
  try {
    await competences.findByIdAndUpdate(req.params.id, req.body);
    const updatedCompetence = await competences.findById(req.params.id);
    res.status(200).send(updatedCompetence);
  } catch (error) {
    res.status(500).send("erreur serveur");
  }
};

exports.deleteCompetence = async (req, res) => {
  try {
    const deletedCompetence = await competences.findByIdAndDelete(req.params.id);
    res.status(200).send(deletedCompetence);
  } catch (error) {
    res.status(500).send("erreur serveur");
  }
};
