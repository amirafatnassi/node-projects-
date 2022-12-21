const experiences = require("../models/experience");

exports.getExperiences = async (req, res) => {
  try {
    const result = await experiences.find();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).json("erreur serveur");
  }
};

exports.getExperience = async (req, res) => {
  try {
    const experience = await experiences.findById(req.params.id);
    if (experience) {
      res.status(200).send(experience);
    } else {
      res.status(401).send("experience not found !");
    }
  } catch (error) {
    res.status(500).json("erreur serveur");
  }
};

exports.addExperience = async (req, res) => {
  try {
    const experience = await experiences.create(req.body);
    res.status(200).send(experience);
  } catch (error) {
    res.status(500).send("erreur serveur");
  }
};

exports.updateExperience = async (req, res) => {
  try {
    await experiences.findByIdAndUpdate(req.params.id, req.body);
    const updatedExperience = await experiences.findById(req.params.id);
    res.status(200).send(updatedExperience);
  } catch (error) {
    res.status(500).send("erreur serveur");
  }
};

exports.deleteExperience = async (req, res) => {
  try {
    const deletedExperience = await experiences.findByIdAndDelete(req.params.id);
    res.status(200).send(deletedExperience);
  } catch (error) {
    res.status(500).send("erreur serveur");
  }
};
